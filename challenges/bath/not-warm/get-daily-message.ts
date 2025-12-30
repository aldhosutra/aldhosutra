// REASON: This async function is not-warm because it explicitly pauses its execution for 1 second, delaying the availability of its result.
export async function getDailyMessage() {
	await new Promise(resolve => setTimeout(resolve, 1000));
	return 'The cat is happy today.';
}
