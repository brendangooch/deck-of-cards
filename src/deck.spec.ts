/**
 * 
 */

import PlayingCard from "@brendangooch/playing-card";
import Deck from "./deck.js";

describe('Deck', () => {
    testAll();
});

function testAll(): void {
    testDealsAll52CardsEachTime();
    testNeverRunsOutOfCards();
    testIncludesCorrectNumberOfJokers();
    testResetShufflesTheDeck();
    testDeals1000UniqueDeals();
}

// deal a full set of cards
function deal(numJokers: number = 0): PlayingCard[] {
    const deck = new Deck(numJokers);
    const deal: PlayingCard[] = [];
    for (let i = 0; i < 52 + numJokers; i++) {
        deal.push(deck.deal());
    }
    return deal;
}

// converts playing card array into array of numbers representing the card type
function cardsToTypes(deal: PlayingCard[]): number[] {
    return deal.map(card => card.type);
}

// deals all 52 playingCards once each time
function testDealsAll52CardsEachTime(): void {
    test('deals all 52 playingCards once each time', () => {
        const numTests = 1000;
        for (let i = 0; i < numTests; i++) {
            const fullDeal = cardsToTypes(deal());
            fullDeal.forEach((t) => {
                expect(fullDeal.filter((type) => type === t).length).toBe(1);
            });
        }
    });
}

// never runs out of cards
function testNeverRunsOutOfCards(): void {
    test('never runs out of cards (deals 10,000 cards without error)', () => {
        const numDeals = 10000;
        const deck = new Deck();
        for (let i = 0; i < numDeals; i++) {
            expect(deck.deal()).toBeInstanceOf(PlayingCard);
        }
    });
}

// includes correct number of jokers
function testIncludesCorrectNumberOfJokers(): void {
    test('includes correct number of jokers', () => {
        for (let numJokers = 0; numJokers < 4; numJokers++) {
            const fullDeal = cardsToTypes(deal(numJokers));
            fullDeal.forEach((t) => {
                if (t === 0) expect(fullDeal.filter((type) => type === t).length).toBe(numJokers);
                else expect(fullDeal.filter((type) => type === t).length).toBe(1);
            });
        }
    });
}

// reset shuffles the deck
function testResetShufflesTheDeck(): void {
    test('reset shuffles the deck', () => {

        const deck = new Deck();

        const dealA: PlayingCard[] = [];
        for (let i = 0; i < 52; i++) {
            dealA.push(deck.deal());
        }

        deck.reset();

        const dealB: PlayingCard[] = [];
        for (let i = 0; i < 52; i++) {
            dealB.push(deck.deal());
        }

        const dealAAsString: string = cardsToTypes(dealA).join();
        const dealBAsString: string = cardsToTypes(dealB).join();

        expect(dealAAsString).not.toBe(dealBAsString);

    });
}

// deals 1000 unique complete deals
function testDeals1000UniqueDeals(): void {
    test('deals 1000 unique complete deals', () => {

        const numDeals = 1000;
        const numJokers = 2;
        const deals: string[] = [];
        const deck = new Deck(numJokers);

        for (let i = 0; i < numDeals; i++) {
            deals.push(cardsToTypes(deal(numJokers)).join());
        }

        deals.forEach((deal) => {
            expect(deals.filter((d) => d === deal).length).toBe(1);
        });

    });
}