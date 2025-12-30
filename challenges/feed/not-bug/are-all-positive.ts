// REASON: This function correctly checks if all numbers in an array are positive by using the `every` method.
export function areAllPositive(numbers: number[]) {
	return numbers.every(num => num > 0);
}
