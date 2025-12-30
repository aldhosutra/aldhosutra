// REASON: This function is not-warm because it returns a Promise that will not resolve for 2 seconds, forcing any dependent code to wait.
export function fetchCatBehavior() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('napping');
		}, 2000);
	});
}
