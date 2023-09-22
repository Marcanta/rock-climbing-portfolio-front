<script lang="ts">
	import Card from '$lib/components/Card';
	import ImageMasonry from '$lib/components/ImageMasonry';
	import Map from '$lib/components/Map.svelte';
	import MediaInput from '$lib/components/MediaInput/MediaInput.svelte';

	const images: Image[] = [
		{src: "https://picsum.photos/320/240", width: 320, height:240},
		{src: "https://picsum.photos/400/240", width: 400, height:240},
		{src: "https://picsum.photos/300/400", width: 300, height:400},
		{src: "https://picsum.photos/150/100", width: 150, height:100},
		{src: "https://picsum.photos/300/300", width: 300, height:300},
		{src: "https://picsum.photos/400/300", width: 400, height:300},
		{src: "https://picsum.photos/200/240", width: 200, height:240},
		{src: "https://picsum.photos/500/300", width: 500, height:300},
		{src: "https://picsum.photos/400/700", width: 400, height:700},
		{src: "https://picsum.photos/301/301", width: 301, height:301},
		{src: "https://picsum.photos/230/310", width: 230, height:310},
		{src: "https://picsum.photos/260/310", width: 260, height:310},
		{src: "https://picsum.photos/503/410", width: 503, height:410},
		{src: "https://picsum.photos/260/450", width: 260, height:450},
		{src: "https://picsum.photos/100/310", width: 100, height:310},
	];
</script>

<div class="flex flex-col md:flex-row max-w-full">
	<div>
		<div class="flex flex-col h-full sm:h-min flex-2 bg-white m-5 p-4 shadow-lg">
			<Map />
		</div>
		<div class="flex flex-col h-full sm:h-min flex-2 bg-white m-5 p-4 shadow-lg">
			<MediaInput/>
		</div>
	</div>
	<!-- <div class="flex flex-wrap overflow-y-scroll md:mt-5 w-full">
    
	</div> -->
	<div class="p-10 mt-5 mr-5 w-full h-fit bg-slate-200 bg-opacity-70 shadow-lg">
		<ImageMasonry images={images} />
	</div>
</div> 