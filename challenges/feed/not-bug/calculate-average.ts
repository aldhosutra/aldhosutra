// REASON: This function correctly calculates the average of a list of numbers, and correctly handles the case of an empty array to avoid division by zero.
export function calculateAverage(numbers: number[]) {
	if (numbers.length === 0) {
		return 0;
	}
	const sum = numbers.reduce((total, num) => total + num, 0);
	return sum / numbers.length;
}
