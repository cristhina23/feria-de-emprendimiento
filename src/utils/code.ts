export function normalizeWhatsapp(value: string) {
	const digits = value.trim().replace(/\D/g, '');

	if (digits.startsWith('0051') && digits.length === 13) {
		return digits.slice(4);
	}

	if (digits.startsWith('51') && digits.length === 11) {
		return digits.slice(2);
	}

	return digits;
}

export function isValidWhatsapp(value: string) {
	return /^9\d{8}$/.test(normalizeWhatsapp(value));
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
