const products = require('./product.test.json'),
    promotionData = require('./promotion.test.json'),
    CartFactory = require('../index.js');

let cart;

beforeEach(() => {
    const promotions = promotionData.none;
    cart = CartFactory(products, promotions);
})

describe('Creating a Cart instance', () => {
    test('That a Cart instance is created', () => {
        expect(cart).toBeDefined();
    });
});