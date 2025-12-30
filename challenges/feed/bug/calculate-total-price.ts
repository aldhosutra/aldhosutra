// REASON: This function is supposed to calculate the total price including tax, but it incorrectly subtracts the tax amount from the base price.
export function calculateTotalPrice(price: number, taxRate: number) {
	const taxAmount = price * taxRate;
	return price - taxAmount;
}
