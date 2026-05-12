<script lang="ts">
	import { Sparkles } from '@lucide/svelte';
	import SuccessCard from './SuccessCard.svelte';

	type Participant = {
		fullName: string;
		whatsapp: string;
		attendance: boolean;
		code: string;
		timestamp: string;
	};

	let fullName = $state('');
	let whatsapp = $state('');
	let attendance = $state(true);
	let loading = $state(false);
	let error = $state('');
	let success = $state<{ participant: Participant; alreadyRegistered: boolean } | null>(null);

	async function submitRegistration() {
		error = '';

		if (!fullName.trim() || !whatsapp.trim() || !attendance) {
			error = 'Complete sus datos y marque la confirmación de asistencia.';
			return;
		}

		loading = true;

		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ fullName, whatsapp, attendance })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.message ?? 'No pudimos completar el registro.';
				return;
			}

			success = data;
		} catch {
			error = 'Revise su conexión e inténtelo nuevamente.';
		} finally {
			loading = false;
		}
	}
</script>

{#if success}
	<SuccessCard
		code={success.participant.code}
		name={success.participant.fullName}
		alreadyRegistered={success.alreadyRegistered}
	/>
{:else}
	<form
		class="registration-card"
		onsubmit={(event) => (event.preventDefault(), submitRegistration())}
	>
		<div class="mb-6 flex items-center gap-3">
			<div
				class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4C542] text-[#267535] shadow-lg shadow-[#F4C542]/30"
			>
				<Sparkles size={24} />
			</div>
			<div>
				<p class="text-sm font-bold tracking-[0.18em] text-[#267535] uppercase">Registro</p>
				<h3 class="text-2xl font-black text-[#1F2937]">Confirma tu asistencia</h3>
			</div>
		</div>

		<label class="field-label" for="fullName">Nombre completo</label>
		<input
			id="fullName"
			class="field-input"
			bind:value={fullName}
			placeholder="Ej. Ana Lucía Pérez"
			autocomplete="name"
		/>

		<label class="field-label mt-5" for="whatsapp">Número de WhatsApp</label>
		<input
			id="whatsapp"
			class="field-input"
			bind:value={whatsapp}
			placeholder="+51 999 999 999"
			inputmode="tel"
			autocomplete="tel"
		/>

		<label
			class="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#6BCB77]/30 bg-[#FFF9F0]/75 p-4 text-sm font-semibold text-slate-700"
		>
			<input
				type="checkbox"
				class="mt-1 rounded border-[#339444] text-[#339444] focus:ring-[#F4C542]"
				bind:checked={attendance}
			/>
			<span>Sí, asistiré al evento</span>
		</label>

		{#if error}
			<p class="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>
		{/if}

		<button class="cta-button mt-6 w-full" disabled={loading}>
			{loading ? 'Confirmando...' : 'Confirmar Participación'}
		</button>
	</form>
{/if}
