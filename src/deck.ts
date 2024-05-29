/**
 * represents a deck of 52 PlayingCard objects
 * stores 'cards' as integers representing all 52 types of card + 0 for optional jokers
 * NEVER runs out of cards, simply resets the deck and starts again if client deals more than 52 cards
 */

import PlayingCard from "@brendangooch/playing-card";
import { shuffle } from '@brendangooch/utils';

export default class Deck {

    private static NUM_CARDS: number = 52;

    private numJokers: number;
    private types: number[] = [];

    public constructor(numJokers: number = 0) {
        this.numJokers = numJokers;
        this.reset(numJokers);
    }

    // optionally change the number of jokers in the deck
    public reset(numJokers: number = 0): void {
        this.numJokers = numJokers;
        this.clearTypes();
        this.addTypes();
        this.addJokers();
        this.shuffleTypes();
    }

    public deal(): PlayingCard {
        if (this.types.length === 0) this.reset();
        const type = this.types.shift();
        // after rest the types array has 52 types + jokers
        return new PlayingCard(<number>type);
    }

    private clearTypes(): void {
        this.types.length = 0;
    }

    private addTypes(): void {
        for (let type = 1; type <= Deck.NUM_CARDS; type++) {
            this.types.push(type);
        }
    }

    private addJokers(): void {
        for (let i = 0; i < this.numJokers; i++) {
            this.types.push(0);
        }
    }

    private shuffleTypes(): void {
        shuffle<number>(this.types);
    }

}