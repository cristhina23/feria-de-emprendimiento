<script lang="ts">
	import Confetti from './Confetti.svelte';

	type Props = {
		code: string;
		alreadyRegistered?: boolean;
		name?: string;
	};

	let { code, alreadyRegistered = false, name = '' }: Props = $props();
</script>

<Confetti />

<div class="success-card">
	<div
		class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF9F0] text-3xl shadow-inner"
	>
		✦
	</div>
	{#if alreadyRegistered}
		<p class="text-lg font-bold text-[#267535]">Usted ya se ha registrado anteriormente.</p>
		<p class="mt-2 text-slate-600">Muchas gracias hermano(a).</p>
	{:else}
		<p class="text-lg font-bold text-[#267535]">
			Gracias por confirmar tu asistencia{name ? `, ${name}` : ''}.
		</p>
		<p class="mt-2 text-slate-600">Tu código para el sorteo es:</p>
	{/if}

	<div
		class="my-6 rounded-[2rem] border border-[#FFD966]/70 bg-gradient-to-br from-[#FEFEFB] to-[#FFF9F0] p-6 shadow-[0_24px_70px_rgba(38,117,53,0.18)]"
	>
		<p class="text-4xl font-black tracking-[0.18em] text-[#267535] sm:text-5xl">{code}</p>
	</div>

	<p class="mx-auto max-w-md text-sm leading-7 text-slate-600">
		Tome una captura de pantalla de este código para reclamar su participación en el sorteo. Por
		favor preséntela el día del evento.
	</p>
	{#if !alreadyRegistered}
		<p class="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600">
			Te invitamos a apoyar a nuestros emprendedores y compartir esta actividad con familiares y
			amigos.
		</p>
	{/if}
</div>
