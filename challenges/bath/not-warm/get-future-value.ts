// REASON: This function is not-warm. It returns a 'future' object whose value is set later, meaning the data is not immediately available.
export function getFutureValue() {
	const future = { value: null, isReady: false };
	setTimeout(() => {
		future.value = 42;
		future.isReady = true;
	}, 1500);
	return future;
}
