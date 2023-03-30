<script lang="ts">
	let wallFocused = '';

	let walls: Wall[] = [
		{ name: 'La dalle', points: '70,619 40,619 40,552' },
		{ name: 'La bon', points: '70,456 40,470 40,552'},
		{ name: 'La brute', points: '80,368 70,380 70,451'},
		{ name: 'Le truand', points: '82,368 110,360 100,264'},
		{ name: 'Mirage', points: '100,262 85,240 70,164'},
		{ name: 'Rafale', points: '70,164 70,110 85,61 97,61'},
		{ name: 'Toudoux', points: '184,61 100,61'},
		{ name: 'K', points: '184,61 220,71 260,71 310,92'},
		{ name: 'O', points: '312,92 380,92 380,110'},
		{ name: 'La capsule', points: '380,110 380,180 370,190'},
		{ name: 'Reta Ouest', points: '367,190 300,186'},
		{ name: 'Reta Est', points: '299,186 230,200 220,220'},
		{ name: 'La Massue', points: '220,222 220,290'},
		{ name: 'Pikachu', points: '220,290 220,302 230,310 300,310'},
		{ name: 'La forteresse', points: '302,310 320,290 370,300 410,300 430,290'},
		{ name: 'L\'entracte', points: '432,290 450,280 490,290 515,305'},
		{ name: 'Kiwi', points: '518,305 550,310 580,300 585,250 550,230'},
		{ name: 'La cachette', points: '550,230 470,200'},
		{ name: 'La taille', points: '470,200 440,190 440,140'},
		{ name: 'Le string', points: '440,140 440,92 460,92'},
		{ name: 'Bi-color', points: '460,92 500,92 550,80'},
		{ name: 'Pokeball', points: '552,81 570,92 570,120 610,140 640,130'},
		{ name: 'La voute', points: '642,130 660,90 740,110'},
		{ name: 'Le devers cache', points: '740,110 790,110 790,130'},
		{ name: 'Atlantique', points: '790,130 790,190'},
		{ name: 'Pacifique', points: '790,190 790,250'},
		{ name: 'La tornade', points: '790,250 785,280 750,290 750,305'},
		{ name: 'Zeus', points: '750,305 745,330 750,365'},
		{ name: 'La tranche', points: '750,365 750,400 790,400'},
		{ name: 'Topo', points: '595,400 550,400 540,460 545,480'},
		{ name: 'Graphie', points: '545,482 540,560'},
		{ name: 'The wave', points: '540,560 540,619 515,619'},
		{ name: 'Mtglf 1', points: '160,481 169,498 202,498'},
		{ name: 'Mtglf 4', points: '180,415 160,479'},
		{ name: 'Mtglf 3', points: '185,415 241,425 245,451'},
		{ name: 'Mtglf 2', points: '245,453 233,478 202,496'},
	];

	function handleMouseOver(e: any) {
		wallFocused = e.target.id;
	}
</script>

<div class="flex flex-col items-center md:min-w-[300px] lg:min-w-[500px]">
	<!-- viewBox="0 0 850 632" -->
	<svg class="w-full" viewBox="0 0 850 632">
		<defs>
			<marker id="zoneLimit" markerWidth="12" markerHeight="2" orient="auto" refX="0.5" refY="0.6"
				><line
					stroke-width="1"
					x1="0.5"
					y1="0"
					x2="0.5"
					y2="1.2"
					style="stroke: rgb(255, 255, 255);"
				/></marker
			>
		</defs>
		<g
			stroke-linecap="butt"
			stroke-linejoin="miter"
			fill="none"
			stroke-width="10"
			stroke="transparent"
			style="cursor: pointer;"
		>
			{#each walls as {name, points}}
				<polyline
					id={`${name}-visible`}
					marker-start="url(#zoneLimit)"
					marker-end="url(#zoneLimit)"
					points={points}
					stroke="black"
					class={name === wallFocused ? "duration-100 ease-in animate-pulse stroke-slate-400 z-20":""}
				/>
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<polyline
					id={name}
					points={points}
					stroke="transparent"
					stroke-width="50"
					on:mouseover={handleMouseOver}
					on:mouseleave={()=> wallFocused=""}
				/>
			{/each}
		</g>
	</svg>
	<p class="mt-10">{wallFocused}&nbsp;</p>
</div>
