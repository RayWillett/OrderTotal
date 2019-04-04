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

describe('The cart promotions without limits', () => {
    beforeEach(() => {
        const promotions = promotionData.limitless;
        cart = CartFactory(products, promotions);
    });

    test('That the markdown cart promotions take affect', () => {
        const product = products[1];
        expect(cart.getPretaxTotal()).toBe(0);
        cart.addItem(product.ID, 1);
        expect(cart.getPretaxTotal()).toBe(0.49);
    });

    test('That the Buy M Get N of equal or lesser value cart promotions take affect', () => {
        const product = products[2];
        expect(cart.getPretaxTotal()).toBe(0);
        cart.addItem(product.ID, 2);
        expect(cart.getPretaxTotal()).toBe(13.09);
    });

    test('That the Buy X Get Y cart promotions take affect', () => {
        const product = products[3];
        expect(cart.getPretaxTotal()).toBe(0);
        cart.addItem(product.ID, 2);
        expect(cart.getPretaxTotal()).toBe(19.48);
    });

    test('That the bundle cart promotions take affect', () => {
        const product = products[4];
        expect(cart.getPretaxTotal()).toBe(0);
        cart.addItem(product.ID, 2);
        expect(cart.getPretaxTotal()).toBe(11.98);
        cart.addItem(product.ID, 1);
        expect(cart.getPretaxTotal()).toBe(15.00);
        cart.addItem(product.ID, 1);
        expect(cart.getPretaxTotal()).toBe(20.99);
    });
});

describe('The cart promotions with limits', () => {
    beforeEach(() => {
        const promotions = promotionData.limited;
        cart = CartFactory(products, promotions);
    });

    test('That the markdown cart promotions take affect', () => {
        const product = products[1];
        expect(cart.getPretaxTotal()).toBe(0);
        cart.addItem(product.ID, 1);
        expect(cart.getPretaxTotal()).toBe(0.49);
        cart.addItem(product.ID, 1);
        expect(cart.getPretaxTotal()).toBe(1.47);
    });

    test('That the Buy M Get N of equal or lesser value cart promotions take affect', () => {
        const product = products[2];
        expect(cart.getPretaxTotal()).toBe(0);
        cart.addItem(product.ID, 2);
        expect(cart.getPretaxTotal()).toBe(13.09);
        cart.addItem(product.ID, 0.5);
        expect(cart.getPretaxTotal()).toBe(15.70);
    });

    test('That the Buy X Get Y cart promotions take affect', () => {
        const product = products[3];
        expect(cart.getPretaxTotal()).toBe(0);
        cart.addItem(product.ID, 2);
        expect(cart.getPretaxTotal()).toBe(19.48);
        cart.addItem(product.ID, 1);
        expect(cart.getPretaxTotal()).toBe(32.47);
        cart.addItem(product.ID, 1);
        expect(cart.getPretaxTotal()).toBe(38.97);
    });

    test('That the bundle cart promotions take affect', () => {
        const product = products[4];
        expect(cart.getPretaxTotal()).toBe(0);
        cart.addItem(product.ID, 2);
        expect(cart.getPretaxTotal()).toBe(11.98);
        cart.addItem(product.ID, 1);
        expect(cart.getPretaxTotal()).toBe(15.00);
        cart.addItem(product.ID, 3);
        expect(cart.getPretaxTotal()).toBe(32.97);
    });
});