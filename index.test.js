const cart = require('./index.js');

describe('shopping cart', () => {
    test('That the cart exists', () => {
        expect(typeof cart).toBe("object");
    });
});