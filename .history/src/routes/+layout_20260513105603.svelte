<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<title>Feria de Emprendimiento, Expo y Networking SUD</title>

	<meta
		name="description"
		content="Conecta con emprendedores, descubre talentos y participa por premios especiales."
	/>

	<meta
		name="keywords"
		content="feria de emprendimiento, networking, emprendedores, expo SUD, negocios, feria empresarial"
	/>

	<meta name="author" content="Cristhina Chacon |CC Tech Solutions" />
	<meta name="robots" content="index, follow" />

	<!-- Open Graph -->
	<meta property="og:title" content="Feria de Emprendimiento, Expo y Networking SUD" />

	<meta
		property="og:description"
		content="Conecta con emprendedores, descubre talentos y participa por premios especiales."
	/>

	<meta
		property="og:image"
		content="https://feria-de-emprendimiento.vercel.app/redes.png"
	/>

	<meta
		property="og:image:secure_url"
		content="https://feria-de-emprendimiento.vercel.app/redes.png"
	/>

	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta property="og:url" content="https://feria-de-emprendimiento.vercel.app" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Expo y Networking SUD" />
	<meta property="og:locale" content="es_PE" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />

	<meta
		name="twitter:title"
		content="Feria de Emprendimiento, Expo y Networking SUD"
	/>

	<meta
		name="twitter:description"
		content="Conecta con emprendedores, descubre talentos y participa por premios especiales."
	/>

	<meta
		name="twitter:image"
		content="https://feria-de-emprendimiento.vercel.app/redes.png"
	/>

	<meta name="theme-color" content="#15803d" />
</svelte:head>

{@render children()}