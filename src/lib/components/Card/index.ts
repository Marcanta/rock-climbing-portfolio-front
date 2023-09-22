import OriginalCard from './Card.svelte';

const Card = OriginalCard as CardStatic;

export default Card;

export interface CardStatic {
	new (...args: ConstructorParameters<typeof OriginalCard>): OriginalCard;
}
