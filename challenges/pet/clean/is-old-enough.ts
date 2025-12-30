// REASON: This code is clean because it directly returns the result of the boolean comparison, avoiding a more verbose and unnecessary if-then-else structure.
export function isOldEnough(age: number, requiredAge: number): boolean {
	return age >= requiredAge;
}
