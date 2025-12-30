// REASON: This function correctly checks if a JavaScript object is empty (has no own properties).
export function isObjectEmpty(obj: object) {
	return Object.keys(obj).length === 0;
}
