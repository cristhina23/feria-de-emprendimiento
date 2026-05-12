<script lang="ts">
	type Props = {
		eyebrow: string;
		title: string;
		description?: string;
		center?: boolean;
	};

	let { eyebrow, title, description = '', center = true }: Props = $props();
</script>

<div class:mx-auto={center} class:max-w-3xl={center} class:text-center={center} class="mb-10">
	<p class="mb-3 text-sm font-bold tracking-[0.22em] text-[#267535] uppercase">{eyebrow}</p>
	<h2 class="font-display text-3xl font-black text-[#1F2937] sm:text-4xl">{title}</h2>
	{#if description}
		<p class="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
	{/if}
</div>
