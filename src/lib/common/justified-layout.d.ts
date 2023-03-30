declare namespace JustifiedLayout {
	interface JustifiedLayoutOptions {
		images: object[];
		containerWidth: number;
		targetHeight: number;
		padding?: number;
	}
}

export interface ScaledImage extends Image {
	scaledWidth: number;
	scaledHeight: number;
	scaledWidthPc: number;
	isLastInRow: boolean;
	isLastRow: boolean;
	index: number;
}

declare function JustifiedLayout(options: JustifiedLayout.JustifiedLayoutOptions): ScaledImage[];

export = JustifiedLayout;
