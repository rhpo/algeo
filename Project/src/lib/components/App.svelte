<script>
	import Keys from '$lib/components/Keys.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '$lib/global.css';

	import Map from '$lib/Map.svelte';
	import json from '$lib/wils.json';

	let regions = [
		// {
		// 	name: 'Inconnu',
		// 	wilayas: []
		// },
		{
			name: 'Kabylie Region',
			wilayas: ['Tizi Ouzou', 'Béjaïa', 'Bouira', 'Boumerdès'],
			color: 'rgba(0, 153, 76, 1)' // Light Blue
		},
		{
			name: 'Aurès Region (Chaoui)',
			wilayas: ['Batna', 'Khenchela', 'Oum El Bouaghi', 'Tébessa', 'Souk Ahras'],
			color: '#858fed' // Fresh Green
		},
		{
			name: 'Algiers and Mitidja Region',
			wilayas: ['Algiers', 'Blida', 'Tipaza', 'Boumerdès', 'Aïn Defla', 'Médéa', 'Chlef'],
			color: '#63aff2' // Soft Red-Orange
		},
		{
			name: 'Oranie Region',
			wilayas: [
				'Oran',
				'Tlemcen',
				'Aïn Témouchent',
				'Sidi Bel Abbès',
				'Mostaganem',
				'Mascara',
				'Relizane',
				'Saïda'
			],
			color: '#4289e3' // Warm Orange
		},
		{
			name: 'Constantinois Region',
			wilayas: ['Constantine', 'Skikda', 'Jijel', 'Mila', 'Guelma', 'Annaba', 'El Tarf'],
			color: '#3692e3' // Soft Purple
		},
		{
			name: 'Sahara Region',
			wilayas: [
				'Tamanrasset',
				'Illizi',
				'Adrar',
				'Tindouf',
				'Ghardaïa',
				'In Salah',
				'In Guezzam',
				'Bordj Badji Mokhtar',
				'Timimoune',
				'Djanet',
				'Béni Abbès',
				'El Menia'
			],
			color: '#c6cbf7' // Light Coral
		},
		{
			name: 'High Plateaus Region',
			wilayas: [
				'Sétif',
				'Bordj Bou Arreridj',
				"M'Sila",
				'Tiaret',
				'Djelfa',
				'Tissemsilt',
				'El Bayadh',
				'Laghouat',
				'Ghardaia'
			],
			color: 'rgba(174, 201, 235, 1)' // Gold
		},
		{
			name: 'Southeast Region',
			wilayas: ['Biskra', 'El Oued', 'Ouargla', 'Touggourt', "El M'Ghair", 'Ouled Djellal'],
			color: '#a2aaf5' // Medium Turquoise
		},
		{
			name: 'Saoura Region',
			wilayas: ['Béchar', 'Naâma'],
			color: '#6fa5e8' // Chocolate
		}
	];

	function belongs(wilaya) {
		let name = wilaya.name;
		return (
			regions.find((region) => region.wilayas.includes(name)) ||
			regions.find((region) => region.name === 'Inconnu')
		);
	}
</script>

<main>
	<Sidebar {regions} {belongs} />
	<Keys {regions} />

	<h1>Choose a wilaya.</h1>

	<Map {regions} {json} />
</main>

<style>
	main {
		width: 100%;
		height: calc(100% - var(--navheight));

		position: relative;
	}

	h1 {
		font-family: 'Inter', sans-serif;
		position: fixed;
		right: 0;
		top: 4.5rem;

		z-index: 11;
		margin: 0;

		margin: 1rem;
	}
</style>
