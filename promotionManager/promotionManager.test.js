const PromotionManager = require('./index');
const promoData = require('./promotions.test.json');

let promotionManager;

beforeEach(() => {
    promotionManager = new PromotionManager(promoData.promotions);
});

afterEach(() => {
    promotionManager = null;
});

describe('The PromotionManager class', () => {
    test('That promotionManager is defined', () => {
        expect(promotionManager).toBeDefined();
        expect(promotionManager).toBeInstanceOf(Object);
    });

    test('That the availablePromotions exists', () => {
        expect(promotionManager.availablePromotions).toBeDefined();
        expect(promotionManager.availablePromotions).toBeInstanceOf(Array);
    });

    test('That getApplicablePromotions exists', () => {
        expect(promotionManager.getApplicablePromotions).toBeDefined();
        expect(promotionManager.getApplicablePromotions).toBeInstanceOf(Function);
    });

    test('That getDiscountAmount exists', () => {
        expect(promotionManager.getDiscountAmount).toBeDefined();
        expect(promotionManager.getDiscountAmount).toBeInstanceOf(Function);
    });
});

describe('The getApplicablePromotions method', () => {
    test('That it returns a promotion object that can be applied to a given product', () => {
        const promotion = promoData.promotions[0],
            availablePromotion = promotionManager.getApplicablePromotions(promotion.productID);

        expect(availablePromotion).toBeDefined();
        expect(availablePromotion).toBeInstanceOf(Object);
        expect(availablePromotion).toEqual(promotion);
    });

    test('That it returns undefined when passed a productID matching no promotions', () => {
        const availablePromotion = promotionManager.getApplicablePromotions('fake product');
        expect(availablePromotion).not.toBeDefined();
    });
});


describe('The getDiscountAmount method', () => {
    test('That it returns half of the productLineItem\'s total price if the promotion is a markdown of 50%', () => {
        const promotion = promoData.promotions[0],
            { data, productPrice } = promotion.test;

        data.forEach(({ quantity, expectedDiscountAmount }) => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice);

            expect(markdownAmount).toBe(expectedDiscountAmount);
        });
    });

    test('That it returns the correct discount to the products\'s price if the promotion is a "Buy One Get One for 50% off"', () => {
        const promotion = promoData.promotions[1],
            { data, productPrice } = promotion.test;

        data.forEach(({ quantity, expectedDiscountAmount }) => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice);

            expect(markdownAmount).toBe(expectedDiscountAmount);
        });
    });

    test('That it returns the correct discount to the products\'s price if the promotion is a "3 for $5" type', () => {
        const promotion = promoData.promotions[2],
            { data, productPrice } = promotion.test;

        data.forEach(({ quantity, expectedDiscountAmount }) => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice);

            expect(markdownAmount).toBe(expectedDiscountAmount);
        });
    });

    test('That it returns the correct discount to the products\'s price if the promotion is a "Buy M get N for %X off" type', () => {
        const promotion = promoData.promotions[3],
            { data, productPrice } = promotion.test;

        data.forEach(({ quantity, expectedDiscountAmount }) => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice);

            expect(markdownAmount).toBe(expectedDiscountAmount);
        });
    });
});

describe('The limit property of a promotion', () => {
    test('That it returns half of the productLineItem\'s total price (up to X) if the promotion is a markdown of 50% limit X', () => {
        const promotion = promoData.limitedPromotions[0],
            { data, productPrice } = promotion.test;

        data.forEach(({ quantity, expectedDiscountAmount }) => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice);

            expect(markdownAmount).toBe(expectedDiscountAmount);
        });
    });

    test('That it returns the correct discount to the products\'s price if the promotion is a "Buy One Get One for 50% off limit X"', () => {
        const promotion = promoData.limitedPromotions[1],
            { data, productPrice } = promotion.test;

        data.forEach(({ quantity, expectedDiscountAmount }) => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice);

            expect(markdownAmount).toBe(expectedDiscountAmount);
        });
    });

    test('That it returns the correct discount to the products\'s price if the promotion is a "3 for $5 limit X" type', () => {
        const promotion = promoData.limitedPromotions[2],
            { data, productPrice } = promotion.test;

        data.forEach(({ quantity, expectedDiscountAmount }) => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice)

            expect(markdownAmount).toBe(expectedDiscountAmount);
        });
    });
});

describe('The roundToNearestCent method', () => {
    test('that a whole number of cents is not changed', () => {
        const dollarAmounts = [0.25, 0.10, 1.0, 2, 5, 5.8, 1.92, 1111111111.22];

        dollarAmounts.forEach(dollarAmount => {
            const roundedAmount = promotionManager.roundToNearestCent(dollarAmount);
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
            const roundedAmount = promotionManager.roundToNearestCent(preRoundedAmount);
            expect(roundedAmount).toBe(postRoundAmount)
        });
    });
});