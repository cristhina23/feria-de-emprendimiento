import { createParticipant } from '$services/participants';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const body = (await request.json()) as {
		fullName?: string;
		whatsapp?: string;
		attendance?: boolean;
	};

	if (!body.fullName?.trim() || !body.whatsapp?.trim() || !body.attendance) {
		return json(
			{ message: 'Por favor complete su nombre, WhatsApp y confirme su asistencia.' },
			{ status: 400 }
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
