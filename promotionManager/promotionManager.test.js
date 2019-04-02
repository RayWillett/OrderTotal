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
                    bundleProducts = Math.floor(quantity / promotion.quantityNeeded),
                    remainingProducts = (quantity % promotion.quantityNeeded),
                    expectedDiscountAmount = (productPrice * quantity) - ((promotion.newPrice * bundleProducts) + (remainingProducts * productPrice));

                expect(markdownAmount).toBe(expectedDiscountAmount);
            });
    });
});