<script>
	import { blur } from 'svelte/transition';

	let API = atob('QUl6YVN5QWo4WUlCVE5OTzhpWnBPc204ZVhockFUckFib184azJn');

	export let regions;
	export let belongs;

	import Fa from 'svelte-fa';

	import { faArrowLeft, faBook } from '@fortawesome/free-solid-svg-icons';
	import { currentWilaya } from '$lib/stores';

	import Slider from '$lib/components/Slider.svelte';

	$: region = belongs($currentWilaya);

	let value = new Date().getFullYear();

	let loading = false;
	let data = {};

	function job() {
		data = {};

		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		const raw = JSON.stringify({
			contents: [
				{
					parts: [
						{
							text: `Generate a JSON object as string for the Algerian wilaya of ${$currentWilaya.name} in around ${value},


if (year === current year) then give the news of that wilaya...
if (year < current year)      then give historical events (3 or 5 at minimum) about that year, if you have a lack of events (of information), then give the events around it.
if (year > current Year) then give future predictions about that year at that wilaya ONLY THAT YEAR OR NEWER...

response SHOULD BE A JSON ONLY...

json structure:

{
    name: 'wilaya's name',
    events: [
      ... {
         name: 'name of the event',
         date: 'the human understandable date, could be the year only but try to give a precise date),
         description: 'the description of that event'
       }
       ],
       description: 'Description of the wilaya, geographical positioning, wilayas around it, and if possible year of creation.
 }`
						}
					]
				}
			]
		});

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		loading = true;

		fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API}`,
			requestOptions
		)
			.then((response) => response.json()) // Fetches the JSON content directly
			.then((result) => {
				const jsonString = result.candidates[0].content.parts[0].text;
				const parsedJSON = JSON.parse(jsonString.match(/```json\n([\s\S]*?)\n```/)[1]); // Extracts and parses JSON string

				data = parsedJSON;

				loading = false;
			})
			.catch((error) => {
				loading = false;
				console.log(error);
				alert('An error has occured, please try again!');
			});
	}
</script>

{#key $currentWilaya.name}
	<div class={`widget main-widget`} class:open={!!$currentWilaya.name} transition:blur>
		{#if !loading}
			<div class="sections">
				<div class="section inline">
					<button
						class="back"
						on:click={() => {
							currentWilaya.set({});
						}}
					>
						<Fa icon={faArrowLeft} /></button
					>

					{#if currentWilaya && region}
						<h1
							style="font-weight: 300; display: flex; flex-direction: column; justify-content: center;"
						>
							<strong>{$currentWilaya.name}</strong>
							<small style="font-size: 1.2rem">{region.name}</small>
						</h1>
					{/if}
				</div>

				<div class="section">
					<h2>Informations</h2>
					<div class="informations">
						<ul>
							<li>
								<b>Name</b> &horbar; {$currentWilaya.name} - {$currentWilaya.name_ber} ({$currentWilaya.name_ar})
							</li>

							<li>
								<b>Region</b> &horbar;
								<span style="background-color: {region?.color}; padding: 3px; border-radius: 5px;"
									>{region?.name || ''}</span
								>
							</li>
						</ul>
					</div>
				</div>

				<section>
					<div class="info">
						<h2>Pick a time!</h2>
						<p>Choose a certain year to choose where to obtain the informations from.</p>
					</div>
					<Slider bind:value />
				</section>

				<section>
					<button on:click={() => job()}><Fa icon={faBook} /> Discover</button>
				</section>

				<section>
					{#if data.description}
						<div class="info">
							<h2>Description</h2>
							<p>
								{data.description}
							</p>
						</div>
					{/if}

					{#if data.events && data.events.length > 0}
						<div class="info">
							<h2>{value > new Date().getFullYear() ? 'Predictions & ' : 'Historical'} Events</h2>
							<ul>
								{#each data.events as event}
									<li>
										<b>{event.name} ({event.date.toString()})</b>: {event.description}
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</section>
			</div>
		{:else}
			<h1>Loading...</h1>{/if}
	</div>
{/key}

<style>
	:root {
		--bsize: 3rem;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.info * {
		margin: 0;
	}

	.info {
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	button {
		background-color: black;
		color: white;
		border: none;
		padding: 1rem 0.5rem;
		border-radius: 0.5rem;
		cursor: pointer;

		transition: all 0.4s;
	}

	button:active {
		transform: scale(0.8);
	}

	button:hover {
		transform: scale(1.05);
	}

	.sections {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	h2 {
		margin: 0;
		font-weight: 500;
	}

	.inline {
		display: flex;
		align-items: center;
		gap: 1rem;

		margin-bottom: 0.5rem;
	}

	.inline * {
		margin-top: 0;
		margin-bottom: 0;
	}

	.back {
		width: var(--bsize);
		height: var(--bsize);
		border-radius: 50%;
		background-color: none;
		outline: none;
		border: none;
	}

	.widget {
		position: absolute;
		top: 0;

		overflow-y: scroll;

		margin: 1rem;
		z-index: 10;

		border-radius: 1rem;

		margin: 0;
		border-radius: 0;

		display: flex;
		flex-direction: column;

		transform: translateX(-100%);
		filter: blur(15px);
		transition: all 0.4s;
	}

	.widget.open {
		filter: blur(0);
		transform: translateX(0) !important;
	}

	.main-widget {
		left: 0;
		width: min(40%, 400px);
		height: 100vh;

		display: flex;
		flex-direction: column;

		justify-content: start;

		padding: 0 1rem;
		padding-top: 1rem;

		box-shadow: 0px 0px 30px 5px rgba(69, 69, 69, 0.65);

		background: white;
	}
</style>
