const Cart = require('./index');

let cart;

beforeEach(() => {
    cart = new Cart();
});

afterEach(() => {
    cart = null;
});

test('That cart exists', () => {
    expect(cart).toBeDefined();
});

test('That cart has a a productLineItems property', () => {
    expect(cart.productLineItems).toBeDefined();
});
