const eventStart = '20260516T170000';
const eventEnd = '20260516T200000';

function escapeIcsText(value: string) {
	return value
		.replace(/\\/g, '\\\\')
		.replace(/,/g, '\\,')
		.replace(/;/g, '\\;')
		.replace(/\n/g, '\\n');
}

export function GET() {
	const title = 'Feria de Emprendimiento, Expo y Networking';
	const location = 'Capilla de La Iglesia de Jesucristo de los Santos de los Últimos Días';
	const description =
		'Conecta con emprendedores, descubre talentos y participa por premios especiales. Recuerda llevar tu código de participación.';

	const ics = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Feria SUD//Registro de evento//ES',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		'UID:feria-sud-emprendimiento-20260516@cctechsolutions',
		`DTSTAMP:${new Date()
			.toISOString()
			.replace(/[-:]/g, '')
			.replace(/\.\d{3}Z$/, 'Z')}`,
		`DTSTART;TZID=America/Lima:${eventStart}`,
		`DTEND;TZID=America/Lima:${eventEnd}`,
		`SUMMARY:${escapeIcsText(title)}`,
		`LOCATION:${escapeIcsText(location)}`,
		`DESCRIPTION:${escapeIcsText(description)}`,
		'BEGIN:VALARM',
		'TRIGGER:-PT30M',
		'ACTION:DISPLAY',
		`DESCRIPTION:${escapeIcsText('La feria empieza en 30 minutos.')}`,
		'END:VALARM',
		'END:VEVENT',
		'END:VCALENDAR'
	].join('\r\n');

	return new Response(ics, {
		headers: {
			'content-type': 'text/calendar; charset=utf-8',
			'content-disposition': 'attachment; filename="feria-sud-emprendimiento.ics"'
		}
	});
}
