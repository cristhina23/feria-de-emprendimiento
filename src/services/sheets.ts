import { env } from '$env/dynamic/private';
import type { Participant } from './participants';

const tokenUrl = 'https://oauth2.googleapis.com/token';
const scope = 'https://www.googleapis.com/auth/spreadsheets';

function cleanEnvValue(value?: string) {
	return value?.trim().replace(/^["']|["']$/g, '') ?? '';
}

function getSheetId() {
	const value = cleanEnvValue(env.GOOGLE_SHEETS_ID);
	const match = value.match(/\/spreadsheets\/d\/([^/]+)/);

	return match?.[1] ?? value;
}

function getSheetRange() {
	return cleanEnvValue(env.GOOGLE_SHEETS_RANGE) || 'Participants!A:E';
}

function base64Url(input: string | Buffer) {
	return Buffer.from(input).toString('base64url');
}

async function googleError(response: Response, action: string) {
	const detail = await response.text();
	throw new Error(`${action} failed: ${response.status}${detail ? ` - ${detail}` : ''}`);
}

async function getAccessToken() {
	const now = Math.floor(Date.now() / 1000);
	const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
	const claimSet = base64Url(
		JSON.stringify({
			iss: cleanEnvValue(env.GOOGLE_SERVICE_ACCOUNT_EMAIL),
			scope,
			aud: tokenUrl,
			exp: now + 3600,
			iat: now
		})
	);

	const { createSign } = await import('node:crypto');
	const privateKey = cleanEnvValue(env.GOOGLE_PRIVATE_KEY).replace(/\\n/g, '\n');
	const signer = createSign('RSA-SHA256');
	signer.update(`${header}.${claimSet}`);
	const signature = signer.sign(privateKey, 'base64url');
	const assertion = `${header}.${claimSet}.${signature}`;

	const response = await fetch(tokenUrl, {
		method: 'POST',
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
			assertion
		})
	});

	if (!response.ok) {
		await googleError(response, 'Google auth');
	}

	const data = (await response.json()) as { access_token: string };
	return data.access_token;
}

function mapRow(row: string[]): Participant | null {
	const [fullName, whatsapp, attendance, code, timestamp] = row;

	if (!fullName || !whatsapp || !code) {
		return null;
	}

	return {
		fullName,
		whatsapp,
		attendance: attendance === 'Sí' || attendance === 'true',
		code,
		timestamp: timestamp || new Date().toISOString()
	};
}

export async function readParticipantsFromSheet() {
	const token = await getAccessToken();
	const sheetId = getSheetId();
	const range = encodeURIComponent(getSheetRange());
	const response = await fetch(
		`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
		{ headers: { authorization: `Bearer ${token}` } }
	);

	if (!response.ok) {
		await googleError(response, 'Google Sheets read');
	}

	const data = (await response.json()) as { values?: string[][] };
	const rows = data.values ?? [];
	const [, ...participants] = rows;

	return participants
		.map(mapRow)
		.filter((participant): participant is Participant => Boolean(participant));
}

export async function appendParticipantToSheet(participant: Participant) {
	const token = await getAccessToken();
	const sheetId = getSheetId();
	const range = encodeURIComponent(getSheetRange());
	const response = await fetch(
		`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
		{
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				values: [
					[
						participant.fullName,
						participant.whatsapp,
						participant.attendance ? 'Sí' : 'No',
						participant.code,
						participant.timestamp
					]
				]
			})
		}
	);

	if (!response.ok) {
		await googleError(response, 'Google Sheets append');
	}
}
