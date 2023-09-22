import OriginalImageMasonry from './ImageMasonry.svelte';

const ImageMasonry = OriginalImageMasonry as ImageMasonryStatic;

export default ImageMasonry;

export interface ImageMasonryStatic {
	new (...args: ConstructorParameters<typeof OriginalImageMasonry>): OriginalImageMasonry;
}
