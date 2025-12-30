// REASON: This function correctly truncates a string to a specified maximum length, adding an ellipsis (...) if truncation occurs.
export function truncateString(str: string, maxLength: number) {
	if (str.length <= maxLength) {
		return str;
	}
	return str.slice(0, maxLength) + '...';
}
