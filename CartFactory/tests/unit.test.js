const CartFactory = require('../index'),
    Cart = require('../cart');

let cart;

beforeEach(() => {
    cart = new Cart([], []);
});

afterEach(() => {
    cart = null;
})

describe('The cart factory constructor', () => {
    test('That cart exists', () => {
        expect(cart).toBeDefined();
        expect(cart).toBeInstanceOf(Cart);
    });
});