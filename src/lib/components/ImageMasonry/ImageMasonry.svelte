<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import createLayout from '../../common/justified-layout';
	import elementResizeEvent, { unbind } from 'element-resize-event';
	import LazyImage from './LazyImage.svelte';
	import { debounce } from '../../common/utils';
	import type { ScaledImage } from '$lib/common/justified-layout';

	type makeStyleParams = {
		scaledWidth: number;
		scaledHeight: number;
		isLastInRow: boolean;
		isLastRow: boolean;
	};

	function makeStyle({
		scaledWidth,
		scaledHeight,
		isLastInRow,
		isLastRow
	}: makeStyleParams): string {
		let mr = padding + 'px';
		const mb = isLastRow ? '0' : mr;
		let flex = `0 0 ${scaledWidth}px`;
		if (isLastInRow) {
			mr = '0';
			flex = `1 1 ${scaledWidth - 4}px`;
		}
		return `height:${scaledHeight}px; flex: ${flex}; margin-right:${mr}; margin-bottom: ${mb}`;
	}

	function onClick(index: any) {
		dispatch('image-click', {
			image: images[index],
			index
		});
	}

	const dispatch = createEventDispatcher();

	// props
	export let images: Image[] = [];
	export let targetRowHeight = 220;
	export let padding = 4;

	// state
	let element: Element;
	let scaledImages: ScaledImage[] = [];
	let width: number;
	let isResizing = false;

	// reactive statement
	$: if (width) {
		scaledImages = createLayout({
			images,
			containerWidth: width,
			targetHeight: targetRowHeight,
			padding
		});
	}

	onMount(() => {
		width = element.getBoundingClientRect().width;
		const resizedFinished = debounce(() => {
			isResizing = false;
		}, 100);
		elementResizeEvent(element, () => {
			if (Math.round(width) !== Math.round(element.getBoundingClientRect().width)) {
				isResizing = true;
				width = element.getBoundingClientRect().width;
				resizedFinished();
			}
		});
		return () => unbind(element);
	});
</script>

<div class="image-masonry {isResizing ? 'is-resizing' : ''}">
	<div data-resizer bind:this={element} />
	<div class="image-masonry-container" style="width: {width}px">
		{#each scaledImages as image (image.src)}
			<div class="masonry-item" style={makeStyle(image)} on:click={() => onClick(image.index)}>
				<LazyImage {...image} />
				<slot {image} />
			</div>
		{/each}
	</div>
</div>

<style>
	/* Image Masonry */
	.image-masonry {
		max-width: 100%;
		width: 100%;
	}
	.image-masonry.is-resizing {
		overflow: hidden;
	}

	/* Image Masonry Container */
	.image-masonry-container {
		display: flex;
		flex-wrap: wrap;
	}

	/* Masonry Item */
	.masonry-item {
		position: relative;
		background: rgba(255, 255, 255, 0.1);
	}
</style>
