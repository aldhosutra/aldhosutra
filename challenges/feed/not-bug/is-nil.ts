// REASON: This function correctly checks if a value is null or undefined, which is a common and useful utility.
export function isNil(value: any) {
	return value === null || value === undefined;
}
