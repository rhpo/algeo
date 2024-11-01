<script>
	import 'ol/ol.css';
	import { onMount } from 'svelte';
	import Map from 'ol/Map';
	import View from 'ol/View';
	import { fromLonLat } from 'ol/proj';
	import { Vector as VectorLayer } from 'ol/layer';
	import { Vector as VectorSource } from 'ol/source';
	import { GeoJSON } from 'ol/format';
	import { Fill, Stroke, Style, Text } from 'ol/style';
	import { currentWilaya } from './stores';

	import TileLayer from 'ol/layer/Tile';
	import OSM from 'ol/source/OSM';

	export let json;
	export let regions;

	let map;
	const algeriaWilayas = json;

	function belongs(wilaya) {
		let name = wilaya.name;
		return (
			regions.find((region) => region.wilayas.includes(name)) ||
			regions.find((region) => region.name === 'Inconnu')
		);
	}

	let p = 1600000;
	let k = 30;
	const algeriaExtent = [
		-960000 - p, // minX
		1800000 - p / k, // minY
		1300000 + p, // maxX
		5000000 + p / k // maxY
	];

	let myView = new View({
		center: fromLonLat([2.6, 27.3]), // Center Algeria's coordinates (approximate)
		zoom: 4, // Initial zoom level
		minZoom: 0, // Minimum zoom to prevent zooming out too far
		maxZoom: 10, // Set a reasonable max zoom for detail
		extent: algeriaExtent // Crop to Algeria's extent
	});

	function redraw() {
		map.dispose();
		generateMap();
	}

	function generateMap() {
		const vectorSource = new VectorSource({
			features: new GeoJSON().readFeatures(algeriaWilayas, {
				dataProjection: 'EPSG:4326',
				featureProjection: 'EPSG:3857'
			})
		});

		// Create a vector layer to display the wilayas and labels
		const vectorLayer = new VectorLayer({
			source: vectorSource,
			style: (feature) => {
				const name = feature.values_;

				let region = belongs(name);
				let color = region.color;

				let myFill = new Fill({
					color: color
				});

				if (name.name === $currentWilaya.name) {
					myFill = new Fill({
						color: 'red'
					});
				}

				return new Style({
					fill: myFill,
					stroke: new Stroke({
						color: '#000',
						width: 1.5
					}),
					text: new Text({
						text: name.name,
						fill: new Fill({
							color: '#fff'
						}),
						stroke: new Stroke({
							color: '#000',
							width: 3
						}),
						offsetX: 0,
						offsetY: 0,
						scale: 1.5,
						placement: 'point', // This can be changed to 'line' or 'polygon'
						overflow: false // Prevents overflow
					})
				});
			}
		});

		// Initialize the map without a base layer
		map = new Map({
			target: 'map',
			layers: [vectorLayer],
			view: myView
		});

		function handleClick(event) {
			map.forEachFeatureAtPixel(event.pixel, (feature) => {
				const wilayaName = feature.values_;

				if (wilayaName.name === $currentWilaya.name) {
					currentWilaya.set({});
					redraw();
				} else if (wilayaName) {
					currentWilaya.set(wilayaName);
				}

				redraw();
			});
		}

		map.on('singleclick', handleClick);
	}

	onMount(() => {
		generateMap();
	});
</script>

<div class:open={$currentWilaya.name} id="map"></div>

<style>
	#map {
		height: 100vh;
		width: 100%;

		transition: all 0.4s;

		opacity: 0.8;
		background-image: radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
		background-size: 10px 10px;
	}

	#map:global(.open) {
		transform: translateX(10%);
	}
</style>
