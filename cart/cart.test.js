const Cart = require('./index');

let cart;

beforeEach(() => {
    cart = new Cart();
});

afterEach(() => {
    cart = null;
});

describe('The cart module', () => {
    test('That cart exists', () => {
        expect(cart).toBeDefined();
    });
})

describe('The cart\'s product line items', () => {
    test('That cart has a a productLineItems property', () => {
        expect(cart.productLineItems).toBeDefined();
    });

    test('That the cart is empty', () => {
        expect(cart.productLineItems).toEqual({});
    });
});

describe('The cart\'s AddItem method', () => {
    test('That addItem is a function', () => {
        expect(cart.addItem).toBeDefined();
        expect(typeof cart.addItem).toBe('function');
    });
});