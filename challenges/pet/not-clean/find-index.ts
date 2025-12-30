// REASON: This code is not-clean because it returns a cryptic number (-1) to indicate an error, which is less clear than throwing an exception or returning null.
export function findIndex(arr: any[], val: any) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return i;
		}
	}
	return -1; // Error case
}
