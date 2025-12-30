// REASON: This function correctly checks if a string is a palindrome (reads the same forwards and backwards) by reversing it and comparing.
export function isPalindrome(str: string) {
	const reversedStr = str.split('').reverse().join('');
	return str === reversedStr;
}
