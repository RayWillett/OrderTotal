const roundToNearestCent = require('./roundToNearestHundredth');

describe('The roundToNearestCent method', () => {
    test('that a whole number of cents is not changed', () => {
        const dollarAmounts = [0.25, 0.10, 1.0, 2, 5, 5.8, 1.92, 1111111111.22];

        dollarAmounts.forEach(dollarAmount => {
            const roundedAmount = roundToNearestCent(dollarAmount);
            expect(roundedAmount).toBe(dollarAmount)
        });
    });

    test('that a partial number of cents is changed', () => {
        const dollarAmounts = [
            {
                preRoundedAmount: 0.255,
                postRoundAmount: 0.26
            },
            {
                preRoundedAmount: 0.866666,
                postRoundAmount: 0.87
            },
            {
                preRoundedAmount: 0.00001,
                postRoundAmount: 0
            },
            {
                preRoundedAmount:  9.553,
                postRoundAmount: 9.55
            },
            {
                preRoundedAmount: 111111112222.3338838484848499999,
                postRoundAmount: 111111112222.33
            },
            {
                preRoundedAmount: 9.999,
                postRoundAmount: 10.00
            },
            {
                preRoundedAmount: (0.1 * 0.2), // floating point error
                postRoundAmount: 0.02
            }
        ];

        dollarAmounts.forEach(({ preRoundedAmount, postRoundAmount}) => {
            const roundedAmount = roundToNearestCent(preRoundedAmount);
            expect(roundedAmount).toBe(postRoundAmount)
        });
    });
});