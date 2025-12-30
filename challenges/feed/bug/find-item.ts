// REASON: The function should return the item if found, but it returns the entire array, making the function's output misleading.
export function findItem(items: string[], target: string) {
	const found = items.includes(target);
	if (found) {
		return items;
	}
	return null;
}
