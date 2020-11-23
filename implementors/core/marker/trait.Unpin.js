(function() {var implementors = {};
implementors["document_metrics"] = [{"text":"impl Unpin for ParseSchemaFormatError","synthetic":true,"types":[]},{"text":"impl Unpin for MetricPath","synthetic":true,"types":[]},{"text":"impl Unpin for Metric","synthetic":true,"types":[]},{"text":"impl Unpin for Cli","synthetic":true,"types":[]},{"text":"impl Unpin for SchemaFormat","synthetic":true,"types":[]},{"text":"impl Unpin for MetricType","synthetic":true,"types":[]}];
implementors["generate_schema"] = [{"text":"impl Unpin for ParseSchemaFormatError","synthetic":true,"types":[]},{"text":"impl Unpin for Cli","synthetic":true,"types":[]},{"text":"impl Unpin for SchemaFormat","synthetic":true,"types":[]}];
implementors["process_event"] = [{"text":"impl Unpin for Cli","synthetic":true,"types":[]}];
implementors["relay"] = [{"text":"impl Unpin for THEME","synthetic":true,"types":[]}];
implementors["relay_auth"] = [{"text":"impl Unpin for RelayVersion","synthetic":true,"types":[]},{"text":"impl Unpin for ParseRelayVersionError","synthetic":true,"types":[]},{"text":"impl Unpin for SignatureHeader","synthetic":true,"types":[]},{"text":"impl Unpin for PublicKey","synthetic":true,"types":[]},{"text":"impl Unpin for SecretKey","synthetic":true,"types":[]},{"text":"impl Unpin for Registration","synthetic":true,"types":[]},{"text":"impl Unpin for SignedRegisterState","synthetic":true,"types":[]},{"text":"impl Unpin for RegisterState","synthetic":true,"types":[]},{"text":"impl Unpin for RegisterRequest","synthetic":true,"types":[]},{"text":"impl Unpin for RegisterChallenge","synthetic":true,"types":[]},{"text":"impl Unpin for RegisterResponse","synthetic":true,"types":[]},{"text":"impl Unpin for KeyParseError","synthetic":true,"types":[]},{"text":"impl Unpin for UnpackError","synthetic":true,"types":[]}];
implementors["relay_cabi"] = [{"text":"impl Unpin for RelayPublicKey","synthetic":true,"types":[]},{"text":"impl Unpin for RelaySecretKey","synthetic":true,"types":[]},{"text":"impl Unpin for RelayKeyPair","synthetic":true,"types":[]},{"text":"impl Unpin for RelayRegisterRequest","synthetic":true,"types":[]},{"text":"impl Unpin for RelayStr","synthetic":true,"types":[]},{"text":"impl Unpin for RelayUuid","synthetic":true,"types":[]},{"text":"impl Unpin for RelayBuf","synthetic":true,"types":[]},{"text":"impl Unpin for RelayGeoIpLookup","synthetic":true,"types":[]},{"text":"impl Unpin for RelayStoreNormalizer","synthetic":true,"types":[]},{"text":"impl Unpin for RelayErrorCode","synthetic":true,"types":[]},{"text":"impl Unpin for GlobFlags","synthetic":true,"types":[]}];
implementors["relay_common"] = [{"text":"impl&lt;T&gt; Unpin for UpsertingLazyCell&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for ParseEventTypeError","synthetic":true,"types":[]},{"text":"impl Unpin for ParseSpanStatusError","synthetic":true,"types":[]},{"text":"impl Unpin for GlobOptions","synthetic":true,"types":[]},{"text":"impl&lt;'a, E:&nbsp;?Sized&gt; Unpin for LogError&lt;'a, E&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for ParseProjectKeyError","synthetic":true,"types":[]},{"text":"impl Unpin for ProjectKey","synthetic":true,"types":[]},{"text":"impl Unpin for RetryBackoff","synthetic":true,"types":[]},{"text":"impl Unpin for UnixTimestamp","synthetic":true,"types":[]},{"text":"impl Unpin for Glob","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for GlobMatcher&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'a, T&gt; Unpin for LazyCellRef&lt;'a, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for EventType","synthetic":true,"types":[]},{"text":"impl Unpin for DataCategory","synthetic":true,"types":[]},{"text":"impl Unpin for SpanStatus","synthetic":true,"types":[]},{"text":"impl Unpin for MetricsClient","synthetic":true,"types":[]}];
implementors["relay_config"] = [{"text":"impl Unpin for ByteSize","synthetic":true,"types":[]},{"text":"impl Unpin for ConfigError","synthetic":true,"types":[]},{"text":"impl Unpin for OverridableConfig","synthetic":true,"types":[]},{"text":"impl Unpin for Credentials","synthetic":true,"types":[]},{"text":"impl Unpin for Relay","synthetic":true,"types":[]},{"text":"impl Unpin for TopicNames","synthetic":true,"types":[]},{"text":"impl Unpin for KafkaConfigParam","synthetic":true,"types":[]},{"text":"impl Unpin for Processing","synthetic":true,"types":[]},{"text":"impl Unpin for Outcomes","synthetic":true,"types":[]},{"text":"impl Unpin for MinimalConfig","synthetic":true,"types":[]},{"text":"impl Unpin for Config","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for UpstreamDescriptor&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for ConfigErrorKind","synthetic":true,"types":[]},{"text":"impl Unpin for RelayMode","synthetic":true,"types":[]},{"text":"impl Unpin for LogFormat","synthetic":true,"types":[]},{"text":"impl Unpin for HttpEncoding","synthetic":true,"types":[]},{"text":"impl Unpin for KafkaTopic","synthetic":true,"types":[]},{"text":"impl Unpin for UpstreamError","synthetic":true,"types":[]},{"text":"impl Unpin for UpstreamParseError","synthetic":true,"types":[]}];
implementors["relay_ffi"] = [{"text":"impl Unpin for Panic","synthetic":true,"types":[]}];
implementors["relay_filter"] = [{"text":"impl Unpin for GlobPatterns","synthetic":true,"types":[]},{"text":"impl Unpin for FilterConfig","synthetic":true,"types":[]},{"text":"impl Unpin for ClientIpsFilterConfig","synthetic":true,"types":[]},{"text":"impl Unpin for CspFilterConfig","synthetic":true,"types":[]},{"text":"impl Unpin for ErrorMessagesFilterConfig","synthetic":true,"types":[]},{"text":"impl Unpin for ReleasesFilterConfig","synthetic":true,"types":[]},{"text":"impl Unpin for LegacyBrowsersFilterConfig","synthetic":true,"types":[]},{"text":"impl Unpin for FiltersConfig","synthetic":true,"types":[]},{"text":"impl Unpin for FilterStatKey","synthetic":true,"types":[]},{"text":"impl Unpin for LegacyBrowser","synthetic":true,"types":[]}];
implementors["relay_general"] = [{"text":"impl&lt;'a&gt; Unpin for PiiAttachmentsProcessor&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for CompiledPiiConfig","synthetic":true,"types":[]},{"text":"impl Unpin for AliasRule","synthetic":true,"types":[]},{"text":"impl Unpin for MultipleRule","synthetic":true,"types":[]},{"text":"impl Unpin for Pattern","synthetic":true,"types":[]},{"text":"impl Unpin for PatternRule","synthetic":true,"types":[]},{"text":"impl Unpin for PiiConfig","synthetic":true,"types":[]},{"text":"impl Unpin for RedactPairRule","synthetic":true,"types":[]},{"text":"impl Unpin for RuleSpec","synthetic":true,"types":[]},{"text":"impl Unpin for Vars","synthetic":true,"types":[]},{"text":"impl Unpin for DataScrubbingConfig","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for PiiProcessor&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for ReplaceRedaction","synthetic":true,"types":[]},{"text":"impl Unpin for ScrubEncodings","synthetic":true,"types":[]},{"text":"impl Unpin for RuleType","synthetic":true,"types":[]},{"text":"impl Unpin for ScrubMinidumpError","synthetic":true,"types":[]},{"text":"impl Unpin for Redaction","synthetic":true,"types":[]},{"text":"impl Unpin for CharacterSet","synthetic":true,"types":[]},{"text":"impl Unpin for FieldAttrs","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for Path&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ProcessingState&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for UnknownValueTypeError","synthetic":true,"types":[]},{"text":"impl Unpin for BagSize","synthetic":true,"types":[]},{"text":"impl Unpin for MaxChars","synthetic":true,"types":[]},{"text":"impl Unpin for Pii","synthetic":true,"types":[]},{"text":"impl Unpin for ValueType","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for Chunk&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for SelectorPathItem","synthetic":true,"types":[]},{"text":"impl Unpin for SelectorSpec","synthetic":true,"types":[]},{"text":"impl Unpin for Breadcrumb","synthetic":true,"types":[]},{"text":"impl Unpin for ClientSdkInfo","synthetic":true,"types":[]},{"text":"impl Unpin for ClientSdkPackage","synthetic":true,"types":[]},{"text":"impl Unpin for AppContext","synthetic":true,"types":[]},{"text":"impl Unpin for BrowserContext","synthetic":true,"types":[]},{"text":"impl Unpin for ContextInner","synthetic":true,"types":[]},{"text":"impl Unpin for Contexts","synthetic":true,"types":[]},{"text":"impl Unpin for DeviceContext","synthetic":true,"types":[]},{"text":"impl Unpin for GpuContext","synthetic":true,"types":[]},{"text":"impl Unpin for OsContext","synthetic":true,"types":[]},{"text":"impl Unpin for RuntimeContext","synthetic":true,"types":[]},{"text":"impl Unpin for SpanId","synthetic":true,"types":[]},{"text":"impl Unpin for TraceContext","synthetic":true,"types":[]},{"text":"impl Unpin for TraceId","synthetic":true,"types":[]},{"text":"impl Unpin for AppleDebugImage","synthetic":true,"types":[]},{"text":"impl Unpin for CodeId","synthetic":true,"types":[]},{"text":"impl Unpin for DebugId","synthetic":true,"types":[]},{"text":"impl Unpin for DebugMeta","synthetic":true,"types":[]},{"text":"impl Unpin for NativeDebugImage","synthetic":true,"types":[]},{"text":"impl Unpin for NativeImagePath","synthetic":true,"types":[]},{"text":"impl Unpin for SystemSdkInfo","synthetic":true,"types":[]},{"text":"impl Unpin for Event","synthetic":true,"types":[]},{"text":"impl Unpin for EventId","synthetic":true,"types":[]},{"text":"impl Unpin for EventProcessingError","synthetic":true,"types":[]},{"text":"impl Unpin for ExtraValue","synthetic":true,"types":[]},{"text":"impl Unpin for GroupingConfig","synthetic":true,"types":[]},{"text":"impl Unpin for Exception","synthetic":true,"types":[]},{"text":"impl Unpin for Fingerprint","synthetic":true,"types":[]},{"text":"impl Unpin for LogEntry","synthetic":true,"types":[]},{"text":"impl Unpin for Message","synthetic":true,"types":[]},{"text":"impl Unpin for Measurements","synthetic":true,"types":[]},{"text":"impl Unpin for CError","synthetic":true,"types":[]},{"text":"impl Unpin for MachException","synthetic":true,"types":[]},{"text":"impl Unpin for Mechanism","synthetic":true,"types":[]},{"text":"impl Unpin for MechanismMeta","synthetic":true,"types":[]},{"text":"impl Unpin for PosixSignal","synthetic":true,"types":[]},{"text":"impl Unpin for Metrics","synthetic":true,"types":[]},{"text":"impl Unpin for Cookies","synthetic":true,"types":[]},{"text":"impl Unpin for HeaderName","synthetic":true,"types":[]},{"text":"impl Unpin for HeaderValue","synthetic":true,"types":[]},{"text":"impl Unpin for Headers","synthetic":true,"types":[]},{"text":"impl Unpin for Query","synthetic":true,"types":[]},{"text":"impl Unpin for Request","synthetic":true,"types":[]},{"text":"impl Unpin for Csp","synthetic":true,"types":[]},{"text":"impl Unpin for ExpectCt","synthetic":true,"types":[]},{"text":"impl Unpin for ExpectStaple","synthetic":true,"types":[]},{"text":"impl Unpin for Hpkp","synthetic":true,"types":[]},{"text":"impl Unpin for ParseSessionStatusError","synthetic":true,"types":[]},{"text":"impl Unpin for SessionAggregateItem","synthetic":true,"types":[]},{"text":"impl Unpin for SessionAggregates","synthetic":true,"types":[]},{"text":"impl Unpin for SessionAttributes","synthetic":true,"types":[]},{"text":"impl Unpin for SessionUpdate","synthetic":true,"types":[]},{"text":"impl Unpin for Span","synthetic":true,"types":[]},{"text":"impl Unpin for Frame","synthetic":true,"types":[]},{"text":"impl Unpin for FrameData","synthetic":true,"types":[]},{"text":"impl Unpin for FrameVars","synthetic":true,"types":[]},{"text":"impl Unpin for RawStacktrace","synthetic":true,"types":[]},{"text":"impl Unpin for Stacktrace","synthetic":true,"types":[]},{"text":"impl Unpin for TagEntry","synthetic":true,"types":[]},{"text":"impl Unpin for Tags","synthetic":true,"types":[]},{"text":"impl Unpin for TemplateInfo","synthetic":true,"types":[]},{"text":"impl Unpin for Thread","synthetic":true,"types":[]},{"text":"impl Unpin for Addr","synthetic":true,"types":[]},{"text":"impl Unpin for InvalidRegVal","synthetic":true,"types":[]},{"text":"impl Unpin for IpAddr","synthetic":true,"types":[]},{"text":"impl Unpin for JsonLenientString","synthetic":true,"types":[]},{"text":"impl Unpin for LenientString","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for PairList&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for ParseLevelError","synthetic":true,"types":[]},{"text":"impl Unpin for RegVal","synthetic":true,"types":[]},{"text":"impl Unpin for Timestamp","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for Values&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Geo","synthetic":true,"types":[]},{"text":"impl Unpin for User","synthetic":true,"types":[]},{"text":"impl Unpin for UserReport","synthetic":true,"types":[]},{"text":"impl Unpin for Context","synthetic":true,"types":[]},{"text":"impl Unpin for DebugImage","synthetic":true,"types":[]},{"text":"impl Unpin for SecurityReportType","synthetic":true,"types":[]},{"text":"impl Unpin for SessionStatus","synthetic":true,"types":[]},{"text":"impl Unpin for ThreadId","synthetic":true,"types":[]},{"text":"impl Unpin for Level","synthetic":true,"types":[]},{"text":"impl Unpin for ClockDriftProcessor","synthetic":true,"types":[]},{"text":"impl Unpin for GeoIpLookup","synthetic":true,"types":[]},{"text":"impl Unpin for StoreConfig","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for StoreProcessor&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for Annotated&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for MetaTree","synthetic":true,"types":[]},{"text":"impl&lt;'a, T&gt; Unpin for SerializableAnnotated&lt;'a, T&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl Unpin for Meta","synthetic":true,"types":[]},{"text":"impl Unpin for Remark","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ValueDescription&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for ProcessingAction","synthetic":true,"types":[]},{"text":"impl Unpin for ErrorKind","synthetic":true,"types":[]},{"text":"impl Unpin for RemarkType","synthetic":true,"types":[]},{"text":"impl Unpin for SkipSerialization","synthetic":true,"types":[]},{"text":"impl Unpin for Value","synthetic":true,"types":[]}];
implementors["relay_quotas"] = [{"text":"impl Unpin for Scoping","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ItemScoping&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for ReasonCode","synthetic":true,"types":[]},{"text":"impl Unpin for Quota","synthetic":true,"types":[]},{"text":"impl Unpin for RetryAfter","synthetic":true,"types":[]},{"text":"impl Unpin for RateLimit","synthetic":true,"types":[]},{"text":"impl Unpin for RateLimits","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for RateLimitsIter&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for RateLimitsIntoIter","synthetic":true,"types":[]},{"text":"impl Unpin for RedisRateLimiter","synthetic":true,"types":[]},{"text":"impl Unpin for QuotaScope","synthetic":true,"types":[]},{"text":"impl Unpin for InvalidRetryAfter","synthetic":true,"types":[]},{"text":"impl Unpin for RateLimitScope","synthetic":true,"types":[]},{"text":"impl Unpin for RateLimitingError","synthetic":true,"types":[]}];
implementors["relay_redis"] = [{"text":"impl&lt;'a&gt; Unpin for Connection&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for PooledClient","synthetic":true,"types":[]},{"text":"impl Unpin for RedisPool","synthetic":true,"types":[]},{"text":"impl Unpin for RedisConfig","synthetic":true,"types":[]},{"text":"impl Unpin for RedisError","synthetic":true,"types":[]}];
implementors["relay_server"] = [{"text":"impl Unpin for ServerError","synthetic":true,"types":[]}];
implementors["scrub_minidump"] = [{"text":"impl Unpin for Cli","synthetic":true,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()