// REASON: This function correctly returns the last element of an array, or undefined if the array is empty.
export function getLastElement(arr: any[]) {
	return arr.length > 0 ? arr[arr.length - 1] : undefined;
}
