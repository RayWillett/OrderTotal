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
    test('That it returns 0 if the quantity is 0', () => {
        const quantity = 0,
            productPrice = 5.00,
            promotion = promoData.promotions[0],
            markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice);

        expect(markdownAmount).toBe(0);
    });

    test('That it returns half of the productLineItem\'s total price if the promotion is a markdown of 50%', () => {
        const productPrice = 5.00,
            promotion = promoData.promotions[0],
            quantitiesToTest = [1,2,3,4,5,6,7,9,10];

        quantitiesToTest.forEach(quantity => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice),
                expectedDiscountAmount = (promotion.percentOff * productPrice * quantity);

            expect(markdownAmount).toBe(expectedDiscountAmount);
        });
    });

    test('That it returns the correct discount to the products\'s price if the promotion is a "Buy One Get One for 50% off"', () => {
        const productPrice = 5.00,
            promotion = promoData.promotions[1],
            quantitiesToTest = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        quantitiesToTest.forEach(quantity => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice),
                expectedDiscountAmount = (promotion.percentOff * productPrice * Math.floor(quantity / (promotion.buy + promotion.get)));

            expect(markdownAmount).toBe(expectedDiscountAmount);
        });
    });

    test('That it returns the correct discount to the products\'s price if the promotion is a "3 for $5" type', () => {
        const productPrice = 8.00,
            promotion = promoData.promotions[2],
            quantitiesToTest = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        quantitiesToTest.forEach(quantity => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice),
                bundledProducts = Math.floor(quantity / promotion.quantityNeeded),
                remainingProducts = (quantity % promotion.quantityNeeded),
                expectedDiscountAmount = (productPrice * quantity) - ((promotion.newPrice * bundledProducts) + (remainingProducts * productPrice));

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
        const productPrice = 5.00,
            promotion = promoData.limitedPromotions[0],
            quantitiesToTest = [1,2,3,4,5,6,7,9,10];

        quantitiesToTest.forEach(quantity => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice),
                expectedDiscountAmount = (promotion.percentOff * productPrice * Math.min(quantity, promotion.limit));

            expect(markdownAmount).toBe(expectedDiscountAmount);
        });
    });

    test('That it returns the correct discount to the products\'s price if the promotion is a "Buy One Get One for 50% off limit X"', () => {
        const productPrice = 5.00,
            promotion = promoData.limitedPromotions[1],
            quantitiesToTest = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        quantitiesToTest.forEach(quantity => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice),
                applyTo = Math.min(quantity, promotion.limit);
                expectedDiscountAmount = (promotion.percentOff * productPrice * Math.floor(applyTo / (promotion.buy + promotion.get)));

            expect(markdownAmount).toBe(expectedDiscountAmount);
        });
    });

    test('That it returns the correct discount to the products\'s price if the promotion is a "3 for $5 limit X" type', () => {
        const productPrice = 8.00,
            promotion = promoData.limitedPromotions[2],
            quantitiesToTest = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        quantitiesToTest.forEach(quantity => {
            const markdownAmount = promotionManager.getDiscountAmount(promotion, quantity, productPrice),
                appliedTo = Math.min(quantity, promotion.limit),
                bundledProducts = Math.floor(appliedTo / promotion.quantityNeeded),
                remainingProducts = (appliedTo % promotion.quantityNeeded) + (quantity - appliedTo),
                expectedDiscountAmount = (productPrice * quantity) - ((promotion.newPrice * bundledProducts) + (remainingProducts * productPrice));

            expect(markdownAmount).toBe(expectedDiscountAmount);
        });
    });
});

describe('The roundToNearestCent method', () => {
    test('that a whole number of cents is not changed', () => {
        const dollarAmounts = [0.25, 0.10, 1.0, 2, 5, 5.8, 1.92, 1111111111.22];

        dollarAmounts.forEach(dollarAmount => {
            const roundedAmount = promotionManager.roundToNearestCent(dollarAmount);
            expect(dollarAmount).toBe(roundedAmount)
        });
    });
});