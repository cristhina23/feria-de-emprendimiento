<script lang="ts">
	import { enhance } from '$app/forms';
	import Confetti from '$components/Confetti.svelte';
	import { formatDateTime } from '$utils/code';
	import { Gift, LogOut, Search, Trophy, Users } from '@lucide/svelte';

	type Participant = {
		fullName: string;
		whatsapp: string;
		attendance: boolean;
		code: string;
		timestamp: string;
	};

	type Props = {
		data: {
			isConfigured: boolean;
			isAdmin: boolean;
			participants: Participant[];
		};
		form?: { message?: string };
	};

	let { data, form }: Props = $props();
	let query = $state('');
	let winner = $state<Participant | null>(null);
	let celebrating = $state(false);

	const filteredParticipants = $derived(
		data.participants.filter((participant) => {
			const text =
				`${participant.fullName} ${participant.whatsapp} ${participant.code}`.toLowerCase();
			return text.includes(query.toLowerCase());
		})
	);

	const total = $derived(data.participants.length);
	const today = $derived(
		data.participants.filter((participant) => {
			const date = new Date(participant.timestamp);
			const now = new Date();
			return date.toDateString() === now.toDateString();
		}).length
	);

	function chooseWinner() {
		if (!data.participants.length) return;
		winner = data.participants[Math.floor(Math.random() * data.participants.length)];
		celebrating = true;
		window.setTimeout(() => (celebrating = false), 3200);
	}
</script>

<svelte:head>
	<title>Admin | Feria de Emprendimiento SUD</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="min-h-screen bg-[#FFF9F0] py-8">
	{#if celebrating}
		<Confetti />
	{/if}

	<div class="container">
		{#if !data.isConfigured}
			<section
				class="mx-auto max-w-xl rounded-[2rem] bg-[#FEFEFB] p-8 shadow-2xl shadow-green-900/10"
			>
				<h1 class="text-3xl font-black text-[#267535]">Configura el panel admin</h1>
				<p class="mt-4 leading-7 text-slate-600">
					Agrega <code>ADMIN_PASSWORD</code> en tu archivo <code>.env</code> o en Vercel para proteger
					esta ruta.
				</p>
			</section>
		{:else if !data.isAdmin}
			<section
				class="mx-auto max-w-md rounded-[2rem] bg-[#FEFEFB] p-8 shadow-2xl shadow-green-900/10"
			>
				<p class="mb-3 text-sm font-bold tracking-[0.2em] text-[#E0A800] uppercase">
					Acceso privado
				</p>
				<h1 class="text-3xl font-black text-[#267535]">Panel de organizadores</h1>
				<form class="mt-7" method="POST" action="?/login" use:enhance>
					<label class="field-label" for="password">Clave de administrador</label>
					<input id="password" name="password" type="password" class="field-input" required />
					{#if form?.message}
						<p class="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
							{form.message}
						</p>
					{/if}
					<button class="cta-button mt-6 w-full">Ingresar</button>
				</form>
			</section>
		{:else}
			<header class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p class="text-sm font-bold tracking-[0.22em] text-[#267535] uppercase">Dashboard</p>
					<h1 class="text-4xl font-black text-[#1F2937]">Participantes registrados</h1>
				</div>
				<form method="POST" action="?/logout">
					<button
						class="inline-flex items-center gap-2 rounded-full bg-[#FEFEFB] px-5 py-3 font-black text-[#267535] shadow-lg"
					>
						<LogOut size={18} /> Salir
					</button>
				</form>
			</header>

			<div class="mb-6 grid gap-4 sm:grid-cols-3">
				<div class="story-panel">
					<Users class="text-[#339444]" size={30} />
					<p class="mt-5 text-3xl font-black text-[#267535]">{total}</p>
					<p class="font-semibold text-slate-500">Total participantes</p>
				</div>
				<div class="story-panel">
					<Gift class="text-[#E0A800]" size={30} />
					<p class="mt-5 text-3xl font-black text-[#267535]">{today}</p>
					<p class="font-semibold text-slate-500">Registros de hoy</p>
				</div>
				<div class="story-panel">
					<Trophy class="text-[#F4C542]" size={30} />
					<button class="cta-button mt-5 w-full" onclick={chooseWinner}>Elegir Ganador</button>
				</div>
			</div>

			<section
				class="rounded-[2rem] bg-[#FEFEFB]/90 p-4 shadow-2xl shadow-green-900/10 backdrop-blur"
			>
				<div class="mb-4 flex items-center gap-3 rounded-2xl bg-[#FFF9F0] px-4 py-3">
					<Search class="text-[#339444]" size={20} />
					<input
						class="w-full border-0 bg-transparent p-0 font-semibold text-slate-700 placeholder:text-slate-400 focus:ring-0"
						bind:value={query}
						placeholder="Buscar por nombre, WhatsApp o código"
					/>
				</div>

				<div class="overflow-x-auto">
					<table class="w-full min-w-[720px] text-left">
						<thead>
							<tr class="border-b border-[#6BCB77]/20 text-sm text-[#267535]">
								<th class="px-4 py-3">Nombre</th>
								<th class="px-4 py-3">WhatsApp</th>
								<th class="px-4 py-3">Código</th>
								<th class="px-4 py-3">Asiste</th>
								<th class="px-4 py-3">Fecha</th>
							</tr>
						</thead>
						<tbody>
							{#each filteredParticipants as participant}
								<tr class="border-b border-[#6BCB77]/10 text-sm font-semibold text-slate-700">
									<td class="px-4 py-4">{participant.fullName}</td>
									<td class="px-4 py-4">{participant.whatsapp}</td>
									<td class="px-4 py-4 font-black text-[#267535]">{participant.code}</td>
									<td class="px-4 py-4">{participant.attendance ? 'Sí' : 'No'}</td>
									<td class="px-4 py-4">{formatDateTime(participant.timestamp)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</section>
		{/if}
	</div>

	{#if winner}
		<div class="fixed inset-0 z-40 grid place-items-center bg-[#1F2937]/55 p-4 backdrop-blur-sm">
			<div class="success-card max-w-lg">
				<Trophy class="mx-auto text-[#E0A800]" size={58} />
				<p class="mt-4 text-sm font-bold tracking-[0.2em] text-[#267535] uppercase">Ganador</p>
				<h2 class="mt-2 text-3xl font-black text-[#1F2937]">{winner.fullName}</h2>
				<p class="mt-3 text-lg font-bold text-slate-600">{winner.whatsapp}</p>
				<div
					class="my-6 rounded-[2rem] bg-[#FFF9F0] p-5 text-4xl font-black tracking-[0.16em] text-[#267535]"
				>
					{winner.code}
				</div>
				<button class="cta-button w-full" onclick={() => (winner = null)}>Cerrar</button>
			</div>
		</div>
	{/if}
</main>
