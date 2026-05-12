<script lang="ts">
	let { active = true }: { active?: boolean } = $props();
	const pieces = Array.from({ length: 38 }, (_, index) => ({
		left: `${(index * 23) % 100}%`,
		delay: `${(index % 9) * 0.12}s`,
		color: ['#F4C542', '#339444', '#6BCB77', '#FFD966', '#E0A800'][index % 5]
	}));
</script>

{#if active}
	<div class="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
		{#each pieces as piece}
			<span
				class="confetti"
				style:left={piece.left}
				style:--delay={piece.delay}
				style:--color={piece.color}
			></span>
		{/each}
	</div>
{/if}

<style>
	.confetti {
		position: absolute;
		top: -14px;
		width: 9px;
		height: 16px;
		border-radius: 3px;
		background: var(--color);
		animation: confettiDrop 2.8s ease-in forwards;
		animation-delay: var(--delay);
	}

	@keyframes confettiDrop {
		100% {
			transform: translateY(105vh) rotate(720deg);
			opacity: 0;
		}
	}
</style>
