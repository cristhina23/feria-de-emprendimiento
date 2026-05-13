<script lang="ts">
	import {
		BadgeCheck,
		BriefcaseBusiness,
		CalendarDays,
		Gift,
		HandHeart,
		MapPin,
		Network,
		Navigation,
		Sparkles,
		Store,
		Users,
		Utensils,
		Wrench,
		Heart
	} from '@lucide/svelte';

	import DecorativeBackdrop from '$components/DecorativeBackdrop.svelte';
	import RegistrationForm from '$components/RegistrationForm.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';

	const benefits = [
		{
			title: 'Networking con propósito',
			description: 'Conoce familias, líderes y emprendedores que desean crecer sirviendo.',
			icon: Network
		},
		{
			title: 'Talentos locales',
			description: 'Descubre productos, servicios y habilidades de nuestra comunidad.',
			icon: Sparkles
		},
		{
			title: 'Apoyo real',
			description: 'Cada compra y contacto fortalece proyectos familiares y pequeños negocios.',
			icon: HandHeart
		},
		{
			title: 'Sorteos especiales',
			description: 'Regístrate, guarda tu código y participa por premios preparados con cariño.',
			icon: Gift
		},
		{
			title: 'Conexión comunitaria',
			description: 'Una tarde edificante para compartir, aprender e invitar a más amigos.',
			icon: Users
		}
	];

	const showcases = [
		{ title: 'Comida y postres', icon: Utensils, tag: 'Sabores hechos en casa' },
		{ title: 'Artesanías', icon: Sparkles, tag: 'Detalles únicos y creativos' },
		{ title: 'Servicios', icon: Wrench, tag: 'Soluciones para familias' },
		{ title: 'Pequeños negocios', icon: Store, tag: 'Ideas con visión' },
		{ title: 'Emprendedores familiares', icon: BriefcaseBusiness, tag: 'Proyectos con propósito' }
	];

	const googleCalendarUrl =
		'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Feria%20de%20Emprendimiento%2C%20Expo%20y%20Networking&dates=20260516T220000Z/20260517T010000Z&details=Conecta%20con%20emprendedores%2C%20descubre%20talentos%20y%20participa%20por%20premios%20especiales.%20Recuerda%20llevar%20tu%20c%C3%B3digo%20de%20participaci%C3%B3n.&location=Capilla%20de%20La%20Iglesia%20de%20Jesucristo%20de%20los%20Santos%20de%20los%20%C3%9Altimos%20D%C3%ADas&ctz=America%2FLima';
</script>

<svelte:head>
	<title>Feria de Emprendimiento, Expo y Networking SUD</title>
	<meta
		name="description"
		content="Confirma tu asistencia a la Feria de Emprendimiento, Expo y Networking SUD. Conecta con emprendedores, descubre talentos y participa por premios especiales."
	/>
	<meta name="theme-color" content="#339444" />
	<meta property="og:title" content="Feria de Emprendimiento, Expo y Networking" />
	<meta
		property="og:description"
		content="Conecta con emprendedores, descubre talentos y participa por premios especiales."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/og-feria.svg" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<main class="overflow-hidden bg-[#FFF9F0] text-[#1F2937]">
	<section class="relative pt-4 pb-12 sm:pt-10 sm:pb-16 lg:min-h-screen">
		<DecorativeBackdrop />
		<div class="relative z-10 container">
			<nav class="glass-panel flex items-center justify-between rounded-full px-4 py-3">
				<div class="flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-[#339444] text-[#F4C542] shadow-lg shadow-[#339444]/25"
					>
						<BadgeCheck size={22} />
					</div>
					<div>
						<p class="text-sm leading-tight font-black text-[#267535]">Feria SUD</p>
						<p class="text-xs font-semibold text-slate-500">Emprendimiento y comunidad</p>
					</div>
				</div>
				<a
					class="hidden rounded-full bg-[#F4C542] px-5 py-3 text-sm font-black text-[#267535] shadow-lg shadow-[#F4C542]/25 sm:inline-flex"
					href="#registro"
				>
					Confirmar
				</a>
			</nav>

			<div
				class="grid items-center gap-8 py-8 sm:py-10 lg:min-h-[calc(100vh-96px)] lg:grid-cols-[1.05fr_0.95fr]"
			>
				<div class="animate-rise">
					<p
						class="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[#F4C542]/50 bg-[#FEFEFB]/75 px-3 py-2 text-xs font-bold text-[#267535] shadow-sm backdrop-blur sm:mb-5 sm:px-4 sm:text-sm"
					>
						<Sparkles size={16} /> Sábado 16 de Mayo - 5:00 PM
					</p>
					<h1
						class="max-w-4xl font-display text-4xl leading-[1.04] font-black text-[#1F2937] sm:text-6xl lg:text-7xl"
					>
						Feria de Emprendimiento, Expo y Networking
					</h1>
					<p
						class="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:mt-6 sm:text-xl sm:leading-8"
					>
						Conecta con emprendedores, descubre talentos y participa por premios especiales.
					</p>

					<div class="mt-7 grid gap-3 text-sm font-bold text-slate-700 sm:max-w-xl sm:grid-cols-2">
						<div class="glass-panel flex min-w-0 items-center gap-3 rounded-3xl p-4">
							<CalendarDays class="shrink-0 text-[#339444]" size={22} />
							<span>Sábado 16 de Mayo - 5:00 PM</span>
						</div>
						<div class="glass-panel flex min-w-0 items-center gap-3 rounded-3xl p-4">
							<MapPin class="shrink-0 text-[#E0A800]" size={22} />
							<span>Capilla de La Iglesia de Jesucristo de los Santos de los Últimos Días</span>
						</div>
					</div>
					<div class="mt-6 flex flex-col gap-3 sm:flex-row">
						<a class="cta-button inline-flex w-full justify-center sm:w-auto" href="#registro">
							Confirmar Asistencia
						</a>

						<a
							class="calendar-button inline-flex w-full justify-center sm:w-auto"
							href={googleCalendarUrl}
							target="_blank"
							rel="noreferrer"
							aria-label="Abrir evento en Google Calendar"
						>
							<Sparkles size={18} />
							Google Calendar
						</a>
					</div>
				</div>

				<div class="animate-float relative">
					<div class="hero-card">
						<div
							class="absolute top-3 right-3 rounded-3xl bg-[#F4C542] p-3 text-[#267535] shadow-2xl shadow-[#F4C542]/30 sm:-top-5 sm:-right-5 sm:p-4"
						>
							<Gift size={32} />
						</div>
						<div class="grid grid-cols-2 gap-3">
							<div
								class="feature-tile col-span-2 min-h-36 bg-gradient-to-br from-[#339444] to-[#267535] text-[#FEFEFB]"
							>
								<Users size={34} />
								<p class="mt-4 pr-14 text-xl font-black sm:pr-0 sm:text-2xl">
									Una comunidad que impulsa talentos
								</p>
							</div>
							<div class="feature-tile">
								<Store class="text-[#339444]" size={30} />
								<p>Expo</p>
							</div>
							<div class="feature-tile">
								<Network class="text-[#E0A800]" size={30} />
								<p>Networking</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section-band">
		<div class="container">
			<SectionHeader
				eyebrow="Una tarde edificante"
				title="Emprender también puede ser una forma de servir"
				description="Este encuentro reúne a miembros, familias y amigos en un ambiente espiritual, familiar y optimista. Celebramos el esfuerzo de quienes crean, venden, enseñan, preparan alimentos, ofrecen servicios y sueñan con crecer junto a la comunidad."
			/>
			<div class="grid gap-5 md:grid-cols-3">
				<div class="story-panel md:col-span-2">
					<h3 class="text-2xl font-black text-[#267535]">Conexiones que abren puertas</h3>
					<p class="mt-4 leading-8 text-slate-600">
						La feria está pensada para conversar, recomendar, comprar, compartir contactos y
						descubrir emprendedores SUD en un entorno alegre y familiar. Es una oportunidad para
						fortalecer la autosuficiencia, animar nuevos proyectos y reconocer talentos que bendicen
						hogares.
					</p>
				</div>
				<div class="story-panel support-panel overflow-hidden text-[#FEFEFB]">
					<img
						class="mx-auto mb-5 w-full max-w-[210px]"
						src="/supporting-people.svg"
						alt="Dos personas apoyándose en comunidad"
						loading="lazy"
					/>
					<HandHeart size={38} />
					<p class="mt-5 text-2xl font-black">Apoyar a uno fortalece a muchos.</p>
				</div>
			</div>
			<div class="mt-8 grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
				<div class="image-card">
					<img
						src="/community-networking.svg"
						alt="Personas conversando y apoyando emprendimientos en la feria"
						loading="lazy"
					/>
				</div>
				<div class="story-panel">
					<p class="mb-3 text-sm font-bold tracking-[0.2em] text-[#E0A800] uppercase">
						Más que una expo
					</p>
					<h3 class="text-3xl font-black text-[#267535]">
						Un espacio para reconocer historias, esfuerzo y fe.
					</h3>
					<p class="mt-4 leading-8 text-slate-600">
						Cada mesa representa una familia, una meta y muchas horas de trabajo. Queremos que los
						visitantes se sientan parte de algo cercano: comprar, recomendar y conversar también son
						formas sencillas de levantar a otros.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="section-band bg-[#FEFEFB]">
		<div class="container">
			<SectionHeader
				eyebrow="Beneficios"
				title="Lo que vivirás en la feria"
				description="Un espacio cálido para conectar, descubrir, apoyar y celebrar el talento local."
			/>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
				{#each benefits as benefit}
					{@const Icon = benefit.icon}
					<div class="benefit-card">
						<Icon size={30} class="text-[#E0A800]" />
						<h3 class="mt-5 text-lg font-black text-[#267535]">{benefit.title}</h3>
						<p class="mt-3 text-sm leading-7 text-slate-600">{benefit.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="section-band">
		<div class="container">
			<SectionHeader
				eyebrow="Emprendedores"
				title="Una muestra de talentos para descubrir"
				description="Encontrarás emprendimientos familiares, productos hechos con dedicación y servicios útiles para el día a día."
			/>
			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
				{#each showcases as showcase, index}
					{@const Icon = showcase.icon}
					<div class="showcase-card" style:--delay={`${index * 90}ms`}>
						<div
							class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF9F0] text-[#339444] shadow-inner"
						>
							<Icon size={30} />
						</div>
						<h3 class="text-xl font-black text-[#1F2937]">{showcase.title}</h3>
						<p class="mt-2 text-sm font-semibold text-[#267535]">{showcase.tag}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="section-band bg-[#FEFEFB]">
		<div class="container">
			<div class="grid items-center gap-8 lg:grid-cols-[0.88fr_1.12fr]">
				<div>
					<SectionHeader
						eyebrow="Ubicación"
						title="Nos reunimos en la capilla"
						description="Guarda la dirección, agenda el evento y llega con tiempo para saludar, recorrer los stands y registrar tu participación."
						center={false}
					/>
					<div class="image-card mb-6">
						<img
							src="/chapel-welcome.svg"
							alt="Capilla con luz cálida y personas llegando al evento"
							loading="lazy"
						/>
					</div>
					<div class="flex flex-col gap-3 sm:flex-row">
						<a
							class="calendar-button mt-8 inline-flex w-full justify-center sm:w-auto"
							href={googleCalendarUrl}
							target="_blank"
							rel="noreferrer"
							aria-label="Abrir evento en Google Calendar"
						>
							<Sparkles size={18} />
							Google Calendar
						</a>
						<a
							class="calendar-button mt-8 inline-flex w-full justify-center sm:w-auto"
							href="https://www.google.com/maps/search/?api=1&query=The%20Church%20of%20Jesus%20Christ%20of%20Latter-day%20Saints%20-12.234311499897702,-76.96175910422663"
							target="_blank"
							rel="noreferrer"
						>
							<Navigation size={18} />
							Abrir ruta
						</a>
					</div>
				</div>
				<div class="map-card">
					<iframe
						title="Mapa de la capilla de La Iglesia de Jesucristo de los Santos de los Últimos Días"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31193.64979701274!2d-76.96175910422663!3d-12.234311499897702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105bbfa13cede1b%3A0xd3d2fd0d8acaa5a2!2sThe%20Church%20of%20Jesus%20Christ%20of%20Latter-day%20Saints!5e0!3m2!1sen!2spe!4v1778613862163!5m2!1sen!2spe"
						allowfullscreen
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</div>
		</div>
	</section>

	<section
		id="registro"
		class="section-band relative bg-gradient-to-br from-[#267535] via-[#339444] to-[#6BCB77]"
	>
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,217,102,0.45),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(255,249,240,0.25),transparent_32%)]"
		></div>
		<div class="relative z-10 container grid items-center gap-10 lg:grid-cols-[0.85fr_1fr]">
			<div class="text-[#FEFEFB]">
				<p class="mb-3 text-sm font-bold tracking-[0.22em] text-[#FFD966] uppercase">Registro</p>
				<h2 class="font-display text-4xl leading-tight font-black sm:text-5xl">
					Confirma tu participación y guarda tu código.
				</h2>
				<p class="mt-5 text-lg leading-8 text-green-50">
					Al registrarte recibirás un código único para participar en el sorteo. Presenta tu captura
					el día del evento y acompáñanos a celebrar a nuestros emprendedores.
				</p>
			</div>
			<RegistrationForm />
		</div>
	</section>
	<footer class="border-t border-white/10 bg-[#14532d] px-6 py-5">
	<div
		class="flex flex-wrap items-center justify-center gap-2 text-center text-sm font-medium text-white/85"
	>
		<span>
			© {new Date().getFullYear()} Feria de Emprendimiento SUD
		</span>

		<span class="text-white/40">•</span>

		<span class="text-emerald-200">
			Hecho con mucho
		</span>

		<Heart
			class="h-5 w-5 animate-pulse fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]"
		/>

		

		<span class="text-white/70">
			por
		</span>

		<a
			href="https://cctechsolutions.dev"
			target="_blank"
			rel="noopener noreferrer"
			class="font-bold text-yellow-400 transition hover:text-white"
		>
			CC Tech Solutions
		</a>
	</div>
</footer>
</main>
