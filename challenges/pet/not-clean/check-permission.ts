// REASON: This code is not-clean because the variable `isValid` is created, but its value is immediately overwritten on the next line, making it redundant.
export function checkPermissions(user: any) {
	let isValid = false;
	isValid = user.role === 'admin';
	return isValid;
}
