// REASON: This function correctly finds and returns the largest number from an array of numbers. It handles an empty array by returning negative infinity.
export function findMaxValue(numbers: number[]) {
	if (numbers.length === 0) {
		return -Infinity;
	}
	return Math.max(...numbers);
}
