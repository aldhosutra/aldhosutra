#!/usr/bin/env node
import { buildMainScreen } from '../src/generators/mainscreen-builder.js';

async function main() {
	buildMainScreen();
}

main().catch(err => {
	console.error(err);
	process.exit(1);
});
