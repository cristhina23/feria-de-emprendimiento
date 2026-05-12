# Feria de Emprendimiento, Expo y Networking

Aplicación SvelteKit para registrar asistentes a una feria de emprendimiento SUD, generar códigos de participación, evitar registros duplicados con WhatsApp y administrar el sorteo desde `/admin`.

## Desarrollo

```sh
npm install
npm run dev
```

Sin credenciales de Google Sheets, la app usa datos de demostración en memoria para que puedas probar el flujo completo.

## Variables de entorno

Copia `.env.example` a `.env` y completa:

```sh
GOOGLE_SHEETS_ID="your_spreadsheet_id"
GOOGLE_SHEETS_RANGE="Participants!A:E"
GOOGLE_SERVICE_ACCOUNT_EMAIL="sheets-service-account@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
ADMIN_PASSWORD="change-this-admin-password"
```

## Configurar Google Sheets

1. Crea una hoja de cálculo en Google Sheets.
2. Crea una pestaña llamada `Participants`.
3. Agrega estos encabezados en la fila 1: `Full name`, `WhatsApp`, `Attendance`, `Code`, `Timestamp`.
4. En Google Cloud, crea un proyecto y habilita la Google Sheets API.
5. Crea una cuenta de servicio y descarga sus credenciales JSON.
6. Comparte la hoja con el email de la cuenta de servicio como editor.
7. Copia el ID de la hoja desde la URL y úsalo como `GOOGLE_SHEETS_ID`.
8. Copia `client_email` a `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
9. Copia `private_key` a `GOOGLE_PRIVATE_KEY`, conservando los `\n`.

## Panel Admin

Visita `/admin`, ingresa la clave configurada en `ADMIN_PASSWORD` y podrás:

- Ver el total de participantes.
- Buscar por nombre, WhatsApp o código.
- Ver estadísticas.
- Elegir un ganador aleatorio con animación.

## Deploy en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Configura las variables de entorno del archivo `.env.example`.
4. Usa el comando de build `npm run build`.
5. Publica y prueba `/` y `/admin`.

## Scripts

```sh
npm run dev
npm run build
npm run preview
npm run format
```
