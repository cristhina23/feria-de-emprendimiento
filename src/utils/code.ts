export function normalizeWhatsapp(value: string) {
	return value
		.replace(/[^\d+]/g, '')
		.replace(/^00/, '+')
		.trim();
}

export function generateParticipationCode(existingCodes = new Set<string>()) {
	let code = '';

	do {
		const number = Math.floor(10000 + Math.random() * 90000);
		code = `SUD-${number}`;
	} while (existingCodes.has(code));

	return code;
}

export function formatDateTime(value: string) {
	return new Intl.DateTimeFormat('es-PE', {
		dateStyle: 'medium',
		timeStyle: 'short',
		timeZone: 'America/Lima'
	}).format(new Date(value));
}
