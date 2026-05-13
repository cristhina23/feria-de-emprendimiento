import { createParticipant, hasSheetsConfig } from '$services/participants';
import { isValidWhatsapp } from '$utils/code';
import { json } from '@sveltejs/kit';

function getRegistrationErrorMessage(error: unknown) {
	const message = error instanceof Error ? error.message : '';

	if (
		message.includes('PERMISSION_DENIED') ||
		message.includes('The caller does not have permission')
	) {
		return 'Google Sheets no permite escribir en la hoja. Comparta la hoja con el correo del service account como editor.';
	}

	if (message.includes('Unable to parse range') || message.includes('badRequest')) {
		return 'El rango de Google Sheets no es válido. Revise que GOOGLE_SHEETS_RANGE sea algo como Participants!A:E y que la pestaña exista.';
	}

	if (message.includes('Requested entity was not found') || message.includes('notFound')) {
		return 'No encontramos esa hoja de Google Sheets. Revise GOOGLE_SHEETS_ID en las variables del despliegue.';
	}

	if (message.includes('invalid_grant') || message.includes('Google auth')) {
		return 'No pudimos autenticar con Google. Revise el correo del service account y la clave privada en las variables del despliegue.';
	}

	return 'No pudimos completar el registro. Inténtelo nuevamente en unos minutos.';
}

export async function POST({ request }) {
	const body = (await request.json()) as {
		fullName?: string;
		whatsapp?: string;
		attendance?: boolean;
	};

	if (!body.fullName?.trim() || !body.whatsapp?.trim()) {
		return json({ message: 'Debe poner su nombre y número de teléfono.' }, { status: 400 });
	}

	if (!isValidWhatsapp(body.whatsapp)) {
		return json(
			{ message: 'Ingrese su número de teléfono con 9 dígitos, por ejemplo 949807845.' },
			{ status: 400 }
		);
	}

	if (!body.attendance) {
		return json({ message: 'Por favor confirme su asistencia.' }, { status: 400 });
	}

	if (!hasSheetsConfig()) {
		return json(
			{ message: 'El registro no está conectado a Google Sheets. Avise a un organizador.' },
			{ status: 500 }
		);
	}

	try {
		const result = await createParticipant({
			fullName: body.fullName,
			whatsapp: body.whatsapp,
			attendance: body.attendance
		});

		return json(result);
	} catch (error) {
		console.error('Registration failed', error);
		return json({ message: getRegistrationErrorMessage(error) }, { status: 500 });
	}
}
