// REASON: This function correctly calculates the factorial of a non-negative integer using an iterative approach.
export function calculateFactorial(n: number) {
	if (n < 0) {
		return NaN; // Factorial is not defined for negative numbers
	}
	let result = 1;
	for (let i = 2; i <= n; i++) {
		result *= i;
	}
	return result;
}
