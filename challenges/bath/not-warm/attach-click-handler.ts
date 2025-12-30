// REASON: This code is not-warm because it describes an action that depends on a DOM element that may not exist yet in the document.
export function attachClickHandler() {
	const button = document.getElementById('feed-button');
	if (button) {
		button.onclick = () => console.log('Cat fed!');
	}
	// If the button isn't in the DOM yet, this does nothing.
}
