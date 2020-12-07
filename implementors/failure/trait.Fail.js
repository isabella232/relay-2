(function() {var implementors = {};
implementors["relay_auth"] = [{"text":"impl Fail for ParseRelayVersionError","synthetic":false,"types":[]},{"text":"impl Fail for KeyParseError","synthetic":false,"types":[]},{"text":"impl Fail for UnpackError","synthetic":false,"types":[]}];
implementors["relay_config"] = [{"text":"impl Fail for ConfigError","synthetic":false,"types":[]},{"text":"impl Fail for ConfigErrorKind","synthetic":false,"types":[]},{"text":"impl Fail for UpstreamError","synthetic":false,"types":[]},{"text":"impl Fail for UpstreamParseError","synthetic":false,"types":[]}];
implementors["relay_general"] = [{"text":"impl Fail for ScrubMinidumpError","synthetic":false,"types":[]},{"text":"impl Fail for UnknownValueTypeError","synthetic":false,"types":[]},{"text":"impl Fail for ParseSessionStatusError","synthetic":false,"types":[]},{"text":"impl Fail for InvalidRegVal","synthetic":false,"types":[]},{"text":"impl Fail for ParseLevelError","synthetic":false,"types":[]},{"text":"impl Fail for ProcessingAction","synthetic":false,"types":[]}];
implementors["relay_quotas"] = [{"text":"impl Fail for RateLimitingError","synthetic":false,"types":[]}];
implementors["relay_redis"] = [{"text":"impl Fail for RedisError","synthetic":false,"types":[]}];
implementors["relay_server"] = [{"text":"impl Fail for ServerError","synthetic":false,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()