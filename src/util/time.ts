export const AUTHOR_TIMEZONE = process.env.AUTHOR_TIMEZONE || 'Asia/Jakarta';

export function isNight(dateInput?: string | Date, tz = AUTHOR_TIMEZONE) {
	const d = dateInput ? new Date(dateInput) : new Date();
	// Use Intl to get the hour in target timezone
	const parts = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		hour12: false,
		timeZone: tz,
	}).formatToParts(d);
	const hourPart = parts.find(p => p.type === 'hour');
	const hour = hourPart ? parseInt(hourPart.value, 10) : d.getUTCHours();
	return hour < 6 || hour >= 18;
}

export function isCorrectBackground(background: string, dateInput?: string | Date, tz = AUTHOR_TIMEZONE) {
	const night = isNight(dateInput, tz);
	if (night) {
		return background.toLowerCase().includes('night');
	} else {
		return background.toLowerCase().includes('day');
	}
}
