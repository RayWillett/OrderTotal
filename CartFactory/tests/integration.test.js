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


describe('Adding products to the cart', () => {
    test('That the cart has the correct number of unique items in it', () => {
        let productID = products[1].ID;

        expect(Object.keys(cart.productLineItems).length).toBe(0);
        
        cart.addItem(productID, 1);
        expect(Object.keys(cart.productLineItems).length).toBe(1);
        
        cart.addItem(productID, 1);
        cart.addItem(productID, 2);
        expect(Object.keys(cart.productLineItems).length).toBe(1);

        productID = products[3].ID;
        cart.addItem(productID, 1);
        expect(Object.keys(cart.productLineItems).length).toBe(2);
    });
});