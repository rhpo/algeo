<script>
	export let regions;
</script>

<div class="widget keys-widget">
	<div class="keys">
		{#each regions as region}
			<div class="key">
				<div class="square" style={`background-color: ${region.color}`}></div>
				<p>
					{region.name}
				</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.widget {
		position: fixed;
		bottom: 0;

		margin: 1rem;
		z-index: 10;

		border-radius: 1rem;

		margin: 0;
		border-radius: 0;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.keys-widget {
		right: 0;

		gap: 1rem;
		padding: 1rem;

		backdrop-filter: blur(10px);
		border: 1px solid rgb(207, 207, 207);
		border-radius: 0 0 0 1rem;
	}

	.key {
		display: flex;
		justify-content: left;
		align-items: center;
		gap: 0.4rem;
	}

	.keys .square {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
	}

	.keys .key p {
		margin: 0;
		padding: 0;
	}
</style>
