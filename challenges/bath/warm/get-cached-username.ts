// REASON: This code is warm because it returns a promise that is already resolved with a value, so any code using it can execute immediately without waiting.
export function getCachedUsername() {
	return Promise.resolve('Mittens');
}
