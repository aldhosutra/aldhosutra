// REASON: This function correctly extracts a "page" of items from an array based on the page number and size.
export function paginate(items: any[], pageNumber: number, pageSize: number) {
	const startIndex = (pageNumber - 1) * pageSize;
	return items.slice(startIndex, startIndex + pageSize);
}
