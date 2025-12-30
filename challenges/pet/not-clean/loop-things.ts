// REASON: This code is not-clean because it uses `var`, which has function-scoping rules that can be confusing, instead of modern `let` or `const`.
export function loopThings(count: number) {
	for (var i = 0; i < count; i++) {
		// ...
	}
	// The variable 'i' is still accessible here, which can be unintuitive.
	console.log(i);
}
