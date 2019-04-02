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
        expect(typeof promotionManager).toBe('object');
    });

    test('That the availablePromotions exists', () => {
        expect(promotionManager.availablePromotions).toBeDefined();
        expect(promotionManager.availablePromotions).toBeInstanceOf(Array);
    });

    test('That getApplicablePromotions exists', () => {
        expect(promotionManager.getApplicablePromotions).toBeDefined();
        expect(typeof promotionManager.getApplicablePromotions).toBe('function');
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


describe('The getMarkdownAmount method', () => {
    test('That it returns 0 if the quantity is 0', () => {
        const quantity = 0,
            productPrice = 5.00,
            promotion = promoData.promotions[0],
            markdownAmount = promotionManager.getMarkdownAmount(promotion, quantity, productPrice);

        expect(markdownAmount).toBe(0);
    });

    test('That it returns half of the product\'s price if the promotion is a markdown of 50%', () => {
        const quantity = 1,
            productPrice = 5.00,
            promotion = promoData.promotions[0],
            markdownAmount = promotionManager.getMarkdownAmount(promotion, quantity, productPrice);

        expect(markdownAmount).toBe(promotion.percentOff * productPrice);
    });
});