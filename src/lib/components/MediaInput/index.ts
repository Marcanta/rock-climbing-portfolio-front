import OriginalMediaInput from './MediaInput.svelte';

const MediaInput = OriginalMediaInput as MediaInputStatic;

export default MediaInput;

export interface MediaInputStatic {
	new (...args: ConstructorParameters<typeof OriginalMediaInput>): OriginalMediaInput;
}
