// REASON: This code is not-clean because it modifies the input array (`items`) directly (a side effect), which can be unexpected and lead to bugs elsewhere.
export function sortData(items: number[]) {
	// This sorts the original array, not a copy.
	return items.sort();
}
