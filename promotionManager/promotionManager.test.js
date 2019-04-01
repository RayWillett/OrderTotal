const PromotionManager = require('./index');
const promoData = require('./promotions.test.json');

let promotionManager;

beforeEach(() => {
    promotionManager = new PromotionManager(promoData);
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

    test('That getProductPromotion exists', () => {
        expect(promotionManager.getProductPromotion).toBeDefined();
        expect(typeof promotionManager.getProductPromotion).toBe('function');
    });
});

describe('The getProductPromotion method', () => {
    test('That an invalid product ID results in an undefined promotion', () => {
        const fakeProductID = 'fake product';
        const productPromotion = promotionManager.getProductPromotion(fakeProductID);
        expect(productPromotion).toEqual([]);
    });

    test('That a valid product ID results in a promotion', () => {
        const existingProductID = promoData[0].buy.ID;
        const productPromotion = promotionManager.getProductPromotion(existingProductID);
        expect(productPromotion).toBeDefined();
        expect(productPromotion).toEqual([promoData[0]]);
    });

    test('That a valid product ID can result in multiple promotions', () => {
        const existingProductID = promoData[1].buy.ID;
        const productPromotion = promotionManager.getProductPromotion(existingProductID);
        expect(productPromotion).toBeDefined();
        expect(productPromotion).toEqual([
            promoData[1],
            promoData[2]
        ]);
    });
});
