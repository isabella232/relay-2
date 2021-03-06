import uuid

import pytest
from sentry_sdk.envelope import Envelope, Item
import queue


def _create_transaction_item():
    """
    Creates an transaction item that can be added to an envelope

    :return: a tuple (transaction_item, trace_id)
    """
    trace_id = uuid.uuid4().hex
    event_id = uuid.uuid4().hex
    item = {
        "event_id": event_id,
        "type": "transaction",
        "transaction": "tr1",
        "start_timestamp": 1597976392.6542819,
        "timestamp": 1597976400.6189718,
        "contexts": {
            "trace": {
                "trace_id": trace_id,
                "span_id": "FA90FDEAD5F74052",
                "type": "trace",
            }
        },
        "spans": [],
        "extra": {"id": event_id},
    }
    return item, trace_id, event_id


def _create_event_item(environment=None, release=None):
    """
    Creates an event with the specified environment and release
    :return: a tuple (event_item, event_id)
    """
    event_id = uuid.uuid4().hex
    trace_id = uuid.uuid4().hex
    item = {
        "event_id": event_id,
        "message": "Hello, World!",
        "extra": {"id": event_id},
    }
    if environment is not None:
        item["environment"] = environment
    if release is not None:
        item["release"] = release
    return item, trace_id, event_id


def _outcomes_enabled_config():
    """
    Returns a configuration for Relay that enables outcome generation
    """
    return {
        "outcomes": {
            "emit_outcomes": True,
            "batch_size": 1,
            "batch_interval": 1,
            "source": "relay",
        }
    }


def _add_sampling_config(
    config,
    sample_rate,
    rule_type,
    releases=None,
    user_segments=None,
    environments=None,
):
    """
    Adds a sampling configuration rule to a project configuration
    """
    rules = config["config"].setdefault("dynamicSampling", {}).setdefault("rules", [])
    if rule_type is None:
        rule_type = "trace"
    conditions = []
    field_prefix = "trace." if rule_type == "trace" else "event."
    if releases is not None:
        conditions.append(
            {"op": "glob", "name": field_prefix + "release", "value": releases,}
        )
    if user_segments is not None:
        conditions.append(
            {
                "op": "eq",
                "name": field_prefix + "user",
                "value": user_segments,
                "options": {"ignoreCase": True,},
            }
        )
    if environments is not None:
        conditions.append(
            {
                "op": "eq",
                "name": field_prefix + "environment",
                "value": environments,
                "options": {"ignoreCase": True,},
            }
        )

    rule = {
        "sampleRate": sample_rate,
        "type": rule_type,
        "condition": {"op": "and", "inner": conditions},
    }
    rules.append(rule)
    return rules


def _add_trace_info(envelope, trace_id, public_key, release=None, user_segment=None):
    """
    Adds trace information to an envelope (to the envelope headers)
    """
    if envelope.headers is None:
        envelope.headers = {}

    trace_info = {"trace_id": trace_id, "public_key": public_key}
    envelope.headers["trace"] = trace_info

    if release is not None:
        trace_info["release"] = release

    if user_segment is not None:
        trace_info["user"] = user_segment


def test_it_removes_transactions(mini_sentry, relay):
    """
    Tests that when sampling is set to 0% for the trace context project the transactions are removed
    """
    project_id = 42
    relay = relay(mini_sentry, _outcomes_enabled_config())

    # create a basic project config
    config = mini_sentry.add_basic_project_config(project_id)
    # add a sampling rule to project config that removes all transactions (sample_rate=0)
    public_key = config["publicKeys"][0]["publicKey"]
    _add_sampling_config(config, sample_rate=0, rule_type="trace")

    # create an envelope with a trace context that is initiated by this project (for simplicity)
    envelope = Envelope()
    transaction, trace_id, event_id = _create_transaction_item()
    envelope.add_transaction(transaction)
    _add_trace_info(envelope, trace_id=trace_id, public_key=public_key)

    # send the event, the transaction should be removed.
    relay.send_envelope(project_id, envelope)
    # the event should be removed by Relay sampling
    with pytest.raises(queue.Empty):
        mini_sentry.captured_events.get(timeout=1)

    outcomes = mini_sentry.captured_outcomes.get(timeout=2)
    assert outcomes is not None
    outcome = outcomes["outcomes"][0]
    assert outcome.get("outcome") == 3
    assert outcome.get("reason") == "transaction_sampled"


def test_it_keeps_transactions(mini_sentry, relay):
    """
    Tests that when sampling is set to 100% for the trace context project the transactions are kept
    """
    project_id = 42
    relay = relay(mini_sentry, _outcomes_enabled_config())

    # create a basic project config
    config = mini_sentry.add_basic_project_config(project_id)
    # add a sampling rule to project config that keeps all transactions (sample_rate=1)
    public_key = config["publicKeys"][0]["publicKey"]
    _add_sampling_config(config, sample_rate=1, rule_type="trace")

    # create an envelope with a trace context that is initiated by this project (for simplicity)
    envelope = Envelope()
    transaction, trace_id, event_id = _create_transaction_item()
    envelope.add_transaction(transaction)
    _add_trace_info(envelope, trace_id=trace_id, public_key=public_key)

    # send the event, the transaction should be removed.
    relay.send_envelope(project_id, envelope)
    # the event should be left alone by Relay sampling
    evt = mini_sentry.captured_events.get(timeout=1).get_transaction_event()
    assert evt is not None
    # double check that we get back our trace object (check the trace_id from the object)
    evt_trace_id = (
        evt.setdefault("contexts", {}).setdefault("trace", {}).get("trace_id")
    )
    assert evt_trace_id == trace_id

    # no outcome should be generated since we forward the event to upstream
    with pytest.raises(queue.Empty):
        mini_sentry.captured_outcomes.get(timeout=2)


def _create_event_envelope(public_key):
    envelope = Envelope()
    event, trace_id, event_id = _create_event_item()
    envelope.add_event(event)
    _add_trace_info(envelope, trace_id=trace_id, public_key=public_key)

    return envelope, trace_id, event_id


def _create_transaction_envelope(public_key):
    envelope = Envelope()
    transaction, trace_id, event_id = _create_transaction_item()
    envelope.add_transaction(transaction)
    _add_trace_info(envelope, trace_id=trace_id, public_key=public_key)
    return envelope, trace_id, event_id


@pytest.mark.parametrize(
    "rule_type, event_factory",
    [("error", _create_event_envelope), ("transaction", _create_transaction_envelope)],
)
def test_it_removes_events(mini_sentry, relay, rule_type, event_factory):
    """
    Tests that when sampling is set to 0% for the trace context project the events are removed
    """
    project_id = 42
    relay = relay(mini_sentry, _outcomes_enabled_config())

    # create a basic project config
    config = mini_sentry.add_basic_project_config(project_id)
    public_key = config["publicKeys"][0]["publicKey"]

    # add a sampling rule to project config that removes all transactions (sample_rate=0)
    _add_sampling_config(config, sample_rate=0, rule_type=rule_type)

    # create an envelope with a trace context that is initiated by this project (for simplicity)
    envelope, trace_id, event_id = event_factory(public_key)

    # send the event, the transaction should be removed.
    relay.send_envelope(project_id, envelope)
    # the event should be removed by Relay sampling
    with pytest.raises(queue.Empty):
        mini_sentry.captured_events.get(timeout=1)

    outcomes = mini_sentry.captured_outcomes.get(timeout=2)
    assert outcomes is not None
    outcome = outcomes["outcomes"][0]
    assert outcome.get("outcome") == 3
    assert outcome.get("reason") == "event_sampled"


@pytest.mark.parametrize(
    "rule_type, event_factory",
    [("error", _create_event_envelope), ("transaction", _create_transaction_envelope)],
)
def test_it_keeps_events(mini_sentry, relay, rule_type, event_factory):
    """
    Tests that when sampling is set to 100% for the trace context project the events are kept
    """
    project_id = 42
    relay = relay(mini_sentry, _outcomes_enabled_config())

    # create a basic project config
    config = mini_sentry.add_basic_project_config(project_id)
    public_key = config["publicKeys"][0]["publicKey"]

    # add a sampling rule to project config that keeps all events (sample_rate=1)
    _add_sampling_config(config, sample_rate=1, rule_type=rule_type)

    # create an envelope with a trace context that is initiated by this project (for simplicity)
    envelope, trace_id, event_id = event_factory(public_key)

    # send the event, the transaction should be removed.
    relay.send_envelope(project_id, envelope)
    # the event should be left alone by Relay sampling
    envelope = mini_sentry.captured_events.get(timeout=1)
    assert envelope is not None
    # double check that we get back our object
    # we put the id in extra since Relay overrides the initial event_id
    items = [item for item in envelope]
    assert len(items) == 1
    evt = items[0].payload.json
    evt_id = evt.setdefault("extra", {}).get("id")
    assert evt_id == event_id

    # no outcome should be generated since we forward the event to upstream
    with pytest.raises(queue.Empty):
        mini_sentry.captured_outcomes.get(timeout=2)


@pytest.mark.parametrize("should_remove", [True, False])
@pytest.mark.parametrize(
    "rule_type, event_factory",
    [
        ("error", _create_event_envelope),
        ("transaction", _create_transaction_envelope),
        ("trace", _create_transaction_envelope),
    ],
)
def test_bad_dynamic_rules_in_processing_relays(
    mini_sentry,
    relay_with_processing,
    events_consumer,
    transactions_consumer,
    should_remove,
    rule_type,
    event_factory,
):
    """
    Configurations that contain bad (unrecognized) rules should be handled by
    removing the offending rules and sampling using the correct rules
    """

    sample_rate = 0 if should_remove else 1

    relay = relay_with_processing()
    project_id = 42
    config = mini_sentry.add_full_project_config(project_id)
    public_key = config["publicKeys"][0]["publicKey"]

    if rule_type == "error":
        consumer = events_consumer()
    else:
        consumer = transactions_consumer()

    # add a bad condition (with the opposite sample rate to make it evident it is not applied)
    rules = _add_sampling_config(
        config, sample_rate=1 - sample_rate, rule_type=rule_type
    )
    last_rule = rules[-1]
    last_rule["condition"]["inner"].append(
        {"op": "BadOperator", "name": "foo", "value": "bar",}
    )
    _add_sampling_config(config, sample_rate=sample_rate, rule_type=rule_type)
    envelope, trace_id, event_id = event_factory(public_key)
    relay.send_envelope(project_id, envelope)

    if should_remove:
        consumer.assert_empty()
    else:
        consumer.get_event()


@pytest.mark.parametrize(
    "rule_type, event_factory",
    [
        ("error", _create_event_envelope),
        ("transaction", _create_transaction_envelope),
        ("trace", _create_transaction_envelope),
    ],
)
def test_bad_dynamic_rules_in_non_processing_relays(
    mini_sentry, relay, rule_type, event_factory
):
    """
    Configurations that contain bad (unrecognized) rules should effectively disable
    any sampling (everything passes through)
    """
    project_id = 42
    relay = relay(mini_sentry, _outcomes_enabled_config())

    # create a basic project config
    config = mini_sentry.add_basic_project_config(project_id)
    public_key = config["publicKeys"][0]["publicKey"]

    rules = _add_sampling_config(config, sample_rate=0, rule_type=rule_type)
    last_rule = rules[-1]
    last_rule["condition"]["inner"].append(
        {"op": "BadOperator", "name": "foo", "value": "bar",}
    )
    # add a sampling rule to project config that drops all events (sample_rate=0), it should be ignored
    # because there is an invalid rule in the configuration
    _add_sampling_config(config, sample_rate=0, rule_type=rule_type)

    # create an envelope with a trace context that is initiated by this project (for simplicity)
    envelope, trace_id, event_id = event_factory(public_key)

    # send the event, the transaction should be removed.
    relay.send_envelope(project_id, envelope)
    # the event should be left alone by Relay sampling
    envelope = mini_sentry.captured_events.get(timeout=1)
    assert envelope is not None
    # double check that we get back our object
    # we put the id in extra since Relay overrides the initial event_id
    items = [item for item in envelope]
    assert len(items) == 1
    evt = items[0].payload.json
    evt_id = evt.setdefault("extra", {}).get("id")
    assert evt_id == event_id

    # no outcome should be generated since we forward the event to upstream
    with pytest.raises(queue.Empty):
        mini_sentry.captured_outcomes.get(timeout=2)


def test_uses_trace_public_key(mini_sentry, relay):
    """
    Tests that the public_key from the trace context is used

    The project configuration corresponding to the project pointed to
    by the context public_key DSN is used (not the dsn of the request)

    Create a trace context for projectA and send an event from projectB
    using projectA's trace.

    Configure project1 to sample out all events (sample_rate=0)
    Configure project2 to sample in all events (sample_rate=1)
    First:
        Send event to project2 with trace from project1
        It should be removed (sampled out)
    Second:
        Send event to project1 with trace from project2
        It should pass through

    """
    relay = relay(mini_sentry, _outcomes_enabled_config())

    # create basic project configs
    project_id1 = 42
    config1 = mini_sentry.add_basic_project_config(project_id1)
    public_key1 = config1["publicKeys"][0]["publicKey"]
    _add_sampling_config(config1, sample_rate=0, rule_type="trace")

    project_id2 = 43
    config2 = mini_sentry.add_basic_project_config(project_id2)
    public_key2 = config2["publicKeys"][0]["publicKey"]
    _add_sampling_config(config2, sample_rate=1, rule_type="trace")

    # First
    # send trace with project_id1 context (should be removed)
    envelope = Envelope()
    transaction, trace_id, event_id = _create_transaction_item()
    envelope.add_transaction(transaction)
    _add_trace_info(envelope, trace_id=trace_id, public_key=public_key1)

    # send the event, the transaction should be removed.
    relay.send_envelope(project_id2, envelope)
    # the event should be removed by Relay sampling
    with pytest.raises(queue.Empty):
        mini_sentry.captured_events.get(timeout=1)

    # and it should create an outcome
    outcomes = mini_sentry.captured_outcomes.get(timeout=2)
    assert outcomes is not None

    # Second
    # send trace with project_id2 context (should go through)
    envelope = Envelope()
    transaction, trace_id, event_id = _create_transaction_item()
    envelope.add_transaction(transaction)
    _add_trace_info(envelope, trace_id=trace_id, public_key=public_key2)

    # send the event.
    relay.send_envelope(project_id1, envelope)

    # the event should be passed along to upstream (with the transaction unchanged)
    evt = mini_sentry.captured_events.get(timeout=1).get_transaction_event()
    assert evt is not None

    # no outcome should be generated (since the event is passed along to the upstream)
    with pytest.raises(queue.Empty):
        mini_sentry.captured_outcomes.get(timeout=2)


def test_fast_path(mini_sentry, relay):
    """
    Tests that the fast path works.

    When the project config is already fetched and the envelope only
    contains a transaction a fast evaluation path is used.

    While this is an implementation detail of Relay that is not visible
    here we test that Relay behaves normally for the conditions that we
    know are going to trigger a fast-path evaluation
    """
    project_id = 42
    relay = relay(mini_sentry, _outcomes_enabled_config())

    # create a basic project config
    config = mini_sentry.add_basic_project_config(project_id)
    # add a sampling rule to project config that removes all transactions (sample_rate=0)
    public_key = config["publicKeys"][0]["publicKey"]
    _add_sampling_config(config, sample_rate=0, rule_type="trace")

    for i in range(2):
        # create an envelope with a trace context that is initiated by this project (for simplicity)
        envelope = Envelope()
        transaction, trace_id, event_id = _create_transaction_item()
        envelope.add_transaction(transaction)
        _add_trace_info(envelope, trace_id=trace_id, public_key=public_key)

        # send the event, the transaction should be removed.
        relay.send_envelope(project_id, envelope)
        # the event should be removed by Relay sampling
        with pytest.raises(queue.Empty):
            mini_sentry.captured_events.get(timeout=1)

        outcomes = mini_sentry.captured_outcomes.get(timeout=2)
        assert outcomes is not None


def test_multi_item_envelope(mini_sentry, relay):
    """
    Test that multi item envelopes are handled correctly.

    Pass an envelope containing of a transaction that will be sampled and an event and
    test


    """
    project_id = 42
    relay = relay(mini_sentry, _outcomes_enabled_config())

    # create a basic project config
    config = mini_sentry.add_basic_project_config(project_id)
    # add a sampling rule to project config that removes all transactions (sample_rate=0)
    public_key = config["publicKeys"][0]["publicKey"]
    _add_sampling_config(config, sample_rate=0, rule_type="trace")

    # we'll run the test twice to make sure that the fast path works as well
    for i in range(2):
        # create an envelope with a trace context that is initiated by this project (for simplicity)
        envelope = Envelope()
        transaction, trace_id, event_id = _create_transaction_item()
        envelope.add_transaction(transaction)
        envelope.add_event({"message": "Hello"})
        _add_trace_info(envelope, trace_id=trace_id, public_key=public_key)

        # send the event, the transaction should be removed.
        relay.send_envelope(project_id, envelope)

        msg = mini_sentry.captured_events.get(timeout=1)
        assert msg is not None
        transaction = msg.get_transaction_event()
        event = msg.get_event()

        # check that the transaction was removed during the transaction sampling process
        assert transaction is None
        # but the event was kept
        assert event is not None
        assert event.setdefault("logentry", {}).get("formatted") == "Hello"

        # no outcome should be generated since we forward the event to upstream
        # NOTE this might change in the future so we might get outcomes here in the future
        with pytest.raises(queue.Empty):
            mini_sentry.captured_outcomes.get(timeout=2)
