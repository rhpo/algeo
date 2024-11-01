<script>
	import Nav from '$lib/components/Nav.svelte';
	import App from '$lib/components/App.svelte';
</script>

<main>
	<Nav />
	<App />
</main>

<style>
	main {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: stretch;
	}
</style>
