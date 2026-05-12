import { createParticipant, hasSheetsConfig } from '$services/participants';
import { isValidWhatsapp } from '$utils/code';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const body = (await request.json()) as {
		fullName?: string;
		whatsapp?: string;
		attendance?: boolean;
	};

	if (!body.fullName?.trim() || !body.whatsapp?.trim()) {
		return json(
			{ message: 'Debe poner su nombre y número de teléfono.' },
			{ status: 400 }
		);
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
		console.error(error);
		return json(
			{ message: 'No pudimos completar el registro. Inténtelo nuevamente en unos minutos.' },
			{ status: 500 }
		);
	}
}
