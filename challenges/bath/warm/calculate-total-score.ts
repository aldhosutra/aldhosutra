// REASON: This function is warm because it performs a simple, synchronous calculation on the data passed directly to it, with no waiting or external dependencies.
export function calculateTotalScore(scores: number[]) {
	if (scores.length === 0) {
		return 0;
	}
	return scores.reduce((sum, current) => sum + current, 0);
}
