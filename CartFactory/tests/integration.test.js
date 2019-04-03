/**
 * Helper function for math tests
 */
function roundToCents (dollarAmount) {
    return Math.round(dollarAmount * 100) / 100;
}

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

    test('That the cart total is updated after an item is added', () => {
        let product = products[1],
            expectedTotal = 0;

        expect(cart.getPretaxTotal()).toBe(0);
        
        cart.addItem(product.ID, 1);
        expectedTotal += product.pricePerUnit;
        expect(cart.getPretaxTotal()).toBe(roundToCents(expectedTotal));

        product = products[3];
        cart.addItem(product.ID, 1);
        expectedTotal += product.pricePerUnit;
        expect(cart.getPretaxTotal()).toBe(roundToCents(expectedTotal));
    });
});

describe('Removing items from the cart', () => {
    test('That the cart has the correct number of unique items in it when removing items', () => {
        let productID = products[1].ID;

        expect(Object.keys(cart.productLineItems).length).toBe(0);
        
        cart.addItem(productID, 1);
        expect(Object.keys(cart.productLineItems).length).toBe(1);
        
        cart.addItem(productID, 1);
        expect(Object.keys(cart.productLineItems).length).toBe(1);
        cart.removeItem(productID, 1);
        expect(Object.keys(cart.productLineItems).length).toBe(1);

        productID = products[3].ID;
        cart.addItem(productID, 1);
        expect(Object.keys(cart.productLineItems).length).toBe(2);

        cart.removeItem(productID);
        expect(Object.keys(cart.productLineItems).length).toBe(1);
    });

    test('That the cart total is updated after an item is added then removed', () => {
        let product = products[1],
            expectedTotal = 0;

        expect(cart.getPretaxTotal()).toBe(0);
        
        cart.addItem(product.ID, 1);
        expectedTotal += product.pricePerUnit;
        expect(cart.getPretaxTotal()).toBe(roundToCents(expectedTotal));

        product = products[3];
        cart.addItem(product.ID, 1);
        expectedTotal += product.pricePerUnit;
        expect(cart.getPretaxTotal()).toBe(roundToCents(expectedTotal));

        cart.removeItem(product.ID, 1);
        expectedTotal -= product.pricePerUnit;
        expect(cart.getPretaxTotal()).toBe(roundToCents(expectedTotal));

        product = products[1];
        cart.removeItem(product.ID, 1);
        expectedTotal -= product.pricePerUnit;
        expect(cart.getPretaxTotal()).toBe(roundToCents(expectedTotal));
    });
});