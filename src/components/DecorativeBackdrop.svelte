<script lang="ts">
	const particles = Array.from({ length: 18 }, (_, index) => ({
		left: `${(index * 17) % 100}%`,
		delay: `${(index % 6) * 0.55}s`,
		size: `${7 + (index % 5) * 3}px`
	}));
</script>

<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
	<div class="glow glow-one"></div>
	<div class="glow glow-two"></div>
	<div class="hanging top-0 left-[8%]"></div>
	<div class="hanging top-0 left-[82%] delay-700"></div>
	<div class="leaf leaf-one"></div>
	<div class="leaf leaf-two"></div>
	{#each particles as particle}
		<span
			class="particle"
			style:--left={particle.left}
			style:--delay={particle.delay}
			style:--size={particle.size}
		></span>
	{/each}
</div>

<style>
	.glow {
		position: absolute;
		border-radius: 999px;
		filter: blur(8px);
		opacity: 0.7;
		animation: pulseGlow 6s ease-in-out infinite;
	}

	.glow-one {
		width: 260px;
		height: 260px;
		right: -80px;
		top: 90px;
		background: radial-gradient(circle, rgba(244, 197, 66, 0.48), transparent 68%);
	}

	.glow-two {
		width: 300px;
		height: 300px;
		left: -120px;
		bottom: 120px;
		background: radial-gradient(circle, rgba(107, 203, 119, 0.42), transparent 68%);
	}

	.hanging {
		position: absolute;
		width: 2px;
		height: 86px;
		background: linear-gradient(#f4c542, transparent);
	}

	.hanging::after {
		content: '';
		position: absolute;
		bottom: -12px;
		left: -8px;
		width: 18px;
		height: 18px;
		border-radius: 999px;
		background: #ffd966;
		box-shadow: 0 0 28px rgba(244, 197, 66, 0.75);
	}

	.leaf {
		position: absolute;
		width: 84px;
		height: 42px;
		border-radius: 100% 0 100% 0;
		background: linear-gradient(135deg, rgba(51, 148, 68, 0.28), rgba(107, 203, 119, 0.08));
		transform: rotate(-22deg);
	}

	.leaf-one {
		left: 5%;
		top: 32%;
		animation: floatLeaf 9s ease-in-out infinite;
	}

	.leaf-two {
		right: 7%;
		bottom: 16%;
		transform: rotate(35deg);
		animation: floatLeaf 11s ease-in-out infinite reverse;
	}

	.particle {
		position: absolute;
		left: var(--left);
		top: -24px;
		width: var(--size);
		height: var(--size);
		border-radius: 999px;
		background: linear-gradient(135deg, #f4c542, #6bcb77);
		opacity: 0.55;
		animation: fall 9s linear infinite;
		animation-delay: var(--delay);
	}

	@keyframes fall {
		to {
			transform: translateY(110vh) rotate(260deg);
		}
	}

	@keyframes pulseGlow {
		50% {
			transform: scale(1.12);
			opacity: 0.95;
		}
	}

	@keyframes floatLeaf {
		50% {
			transform: translate3d(8px, -18px, 0) rotate(-10deg);
		}
	}
</style>
