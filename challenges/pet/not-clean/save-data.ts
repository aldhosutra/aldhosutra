// REASON: This code is not-clean because it uses inconsistent naming conventions for variables (camelCase, PascalCase, and snake_case all in one function).
export function saveData(data: any) {
	const UserData = data.user;
	const user_email = UserData.email;
	let itemsInCart = data.items;
	// ... save logic
}
