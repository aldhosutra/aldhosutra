import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage, SKRSContext2D } from '@napi-rs/canvas';
import { GameState } from '../types';

function wrapText(ctx: SKRSContext2D, text: string, maxWidth: number) {
	const words = text.split(' ');
	const lines = [];
	let line = '';

	for (const word of words) {
		const testLine = line + word + ' ';
		const { width } = ctx.measureText(testLine);

		if (width > maxWidth && line) {
			lines.push(line);
			line = word + ' ';
		} else {
			line = testLine;
		}
	}

	lines.push(line);
	return lines;
}

function drawSpeechBubble(ctx: SKRSContext2D, x: number, y: number, w: number, h: number, radius: number) {
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + w - radius, y);
	ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
	ctx.lineTo(x + w, y + h - radius);
	ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
	ctx.lineTo(x + radius, y + h);
	ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
}

export async function buildMainScreen(stateFile = 'states/states.json', catDialoguePath = 'constants/cat-dialogue.json') {
	const raw = fs.readFileSync(stateFile, 'utf8');
	const state = JSON.parse(raw) as GameState;

	const catPath = path.join('assets', state.background === 'day' ? `cat/cat${['correct', 'incorrect'].includes(state.phase) ? `-${state.phase}` : ''}-${state.catState}.png` : `cat/cat-sleep.png`);
	const bgPath = path.join('assets', `background/background-${state.background}.png`);

	const cat = await loadImage(catPath);
	const background = await loadImage(bgPath);

	// pick a dialogue line
	let catDialogue = 'Meow.';
	try {
		const dlgText = fs.readFileSync(catDialoguePath, 'utf8');
		const dlg = JSON.parse(dlgText);

		const arr = state.background === 'day' ? (['correct', 'incorrect'].includes(state.phase) ? dlg[`${state.phase}-${state.catState}`] : dlg[state.catState]) : dlg['sleepy'];

		catDialogue = Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : String(arr);
	} catch (e) {
		// ignore
	}

	const width = background.width;
	const height = Math.round((width * 9) / 32);

	const canvas = createCanvas(width, height);
	const ctx = canvas.getContext('2d');

	// Background
	ctx.drawImage(background, 0, 0, width, height);

	// Cat
	const catSize = Math.min(height * 0.7, width * 0.25);
	const catX = width * 0.35;
	const catY = height - catSize;
	ctx.drawImage(cat, catX, catY, catSize, catSize);

	// Bubble text
	const fontSize = Math.round(catSize * 0.09);
	ctx.font = `${fontSize}px sans-serif`;
	ctx.textBaseline = 'top';

	const maxBubbleWidth = catSize * 1.2;
	const padding = fontSize * 0.8;

	const lines = wrapText(ctx, catDialogue, maxBubbleWidth);

	const bubbleWidth = Math.max(...lines.map(l => ctx.measureText(l).width)) + padding * 2;
	const bubbleHeight = lines.length * fontSize * 1.4 + padding * 2;

	const bubbleX = catX + catSize * 0.65;
	const bubbleY = catY - bubbleHeight * 0.35;

	// Bubble background
	drawSpeechBubble(ctx, bubbleX, bubbleY, bubbleWidth, bubbleHeight, 16);
	ctx.fillStyle = '#ffffff';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#000000';
	ctx.stroke();

	// Bubble text
	ctx.fillStyle = '#000000';
	lines.forEach((line, i) => ctx.fillText(line.trim(), bubbleX + padding, bubbleY + padding + i * fontSize * 1.4));

	// Output
	fs.writeFileSync('assets/mainscreen.png', canvas.toBuffer('image/png'));
	console.log('✅ PNG generated with dynamic bubble text');
}
