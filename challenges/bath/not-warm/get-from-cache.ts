// REASON: This code is not-warm because the cache is empty. The data needs to be fetched and stored before it can be retrieved quickly.
export function getFromCache() {
	const cache = new Map();
	function getValue(key: string) {
		if (!cache.has(key)) {
			return 'Cache miss: value not found.';
		}
		return cache.get(key);
	}
	return getValue('cat_toy');
}
