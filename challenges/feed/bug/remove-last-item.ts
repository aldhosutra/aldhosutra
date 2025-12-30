// REASON: The function is supposed to remove the last element from the array, but it uses ``array.shift`()`, which removes the first element instead.
export function removeLastItem(items: string[]) {
	if (items.length === 0) {
		return [];
	}
	items.shift();
	return items;
}
