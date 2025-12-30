// REASON: This code is clean because the function is small, has a clear purpose, and uses destructuring to transparently access object properties.
export function formatAddress({ street, city, zipCode }: { street: string; city: string; zipCode: string }): string {
	return `${street}, ${city}, ${zipCode}`;
}
