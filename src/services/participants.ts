import { env } from '$env/dynamic/private';
import { generateParticipationCode, normalizeWhatsapp } from '$utils/code';
import { appendParticipantToSheet, readParticipantsFromSheet } from './sheets';

export type Participant = {
	fullName: string;
	whatsapp: string;
	attendance: boolean;
	code: string;
	timestamp: string;
};

type CreateParticipantInput = {
	fullName: string;
	whatsapp: string;
	attendance: boolean;
};

const demoStore: Participant[] = [
	{
		fullName: 'María Fernanda Torres',
		whatsapp: '+51999111222',
		attendance: true,
		code: 'SUD-18426',
		timestamp: new Date().toISOString()
	},
	{
		fullName: 'Carlos Mendoza',
		whatsapp: '+51988777666',
		attendance: true,
		code: 'SUD-29517',
		timestamp: new Date().toISOString()
	}
];

export function hasSheetsConfig() {
	return Boolean(
		env.GOOGLE_SHEETS_ID &&
		env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
		env.GOOGLE_PRIVATE_KEY &&
		env.GOOGLE_SHEETS_RANGE
	);
}

export async function getParticipants(): Promise<Participant[]> {
	if (!hasSheetsConfig()) {
		return demoStore;
	}

	return readParticipantsFromSheet();
}

export async function participantExists(whatsapp: string) {
	const normalized = normalizeWhatsapp(whatsapp);
	const participants = await getParticipants();

	return participants.find((participant) => normalizeWhatsapp(participant.whatsapp) === normalized);
}

export async function createParticipant(input: CreateParticipantInput) {
	const existing = await participantExists(input.whatsapp);

	if (existing) {
		return { participant: existing, alreadyRegistered: true };
	}

	const participants = await getParticipants();
	const existingCodes = new Set(participants.map((participant) => participant.code));
	const participant: Participant = {
		fullName: input.fullName.trim(),
		whatsapp: normalizeWhatsapp(input.whatsapp),
		attendance: input.attendance,
		code: generateParticipationCode(existingCodes),
		timestamp: new Date().toISOString()
	};

	if (hasSheetsConfig()) {
		await appendParticipantToSheet(participant);
	} else {
		demoStore.push(participant);
	}

	return { participant, alreadyRegistered: false };
}
