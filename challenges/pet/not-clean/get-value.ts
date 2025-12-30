// REASON: This code is not-clean. The function is misleadingly named `getValue` but it also has a hidden side effect of incrementing a global counter.
let globalCounter = 0;
export function getValue(obj: { value: number }) {
	globalCounter++;
	return obj.value;
}
