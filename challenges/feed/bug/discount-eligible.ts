// REASON: The logic `age < 18 && age > 65` will never be true, so no one will ever qualify for the discount. It should be `age < 18 || age > 65`.
export function isEligibleForDiscount(age: number) {
	if (age < 18 && age > 65) {
		return true;
	}
	return false;
}
