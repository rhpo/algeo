<script>
	export let minYear = 600; // Minimum year
	export let maxYear = 2080; // Maximum year
	export let value = 0; // Default selected year

	// Format the year to show "BC" for negative values
	const formatYear = (year) => (year < 0 ? `${Math.abs(year)} BC` : year);
</script>

<div class="range-container">
	<span class="range-label">{formatYear(minYear)}</span>
	<div class="slider-container">
		<!-- Single range input for selecting the year -->
		<input type="range" bind:value min={minYear} max={maxYear} step="1" />
	</div>
	<span class="year-display">{formatYear(value)}</span>
	<span class="range-label">{formatYear(maxYear)}</span>
</div>

<style>
	.range-container {
		display: flex;
		align-items: center;
		width: 100%;
		gap: 10px;
	}

	.range-label {
		font-size: 14px;
		color: #555;
		min-width: 50px;
	}

	.slider-container {
		flex: 1;
		position: relative;
	}

	/* Range input styling */
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 8px;
		background-color: #ddd;
		border-radius: 5px;
		outline: none;
	}

	/* Track styling */
	input[type='range']::-webkit-slider-runnable-track {
		height: 8px;
		background: linear-gradient(to right, #4caf50, #81c784);
		border-radius: 5px;
	}

	/* Thumb styling */
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		background-color: #ffffff;
		border: 2px solid #4caf50;
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
	}

	/* Active thumb styling */
	input[type='range']:active::-webkit-slider-thumb {
		transform: scale(1.2);
	}

	/* Selected year display */
	.year-display {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		min-width: 60px;
	}
</style>
