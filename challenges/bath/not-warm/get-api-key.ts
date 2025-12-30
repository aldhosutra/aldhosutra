// REASON: This function is not-warm because it relies on an 'external' environment variable for the API key, which has not been set, so it cannot run.
export function getApiKey() {
	const apiKey = process.env.CAT_API_KEY;
	if (!apiKey) {
		return 'API_KEY_IS_MISSING';
	}
	return apiKey;
}
