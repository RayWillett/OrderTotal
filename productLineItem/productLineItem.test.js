const ProductLineItem = require('./index.js');

let productLineItem;

beforeEach(() => {
    let product = require('./product.test.json')[0];
    productLineItem = new ProductLineItem(product, 1);
});

afterEach(() => {
    productLineItem = null;
});

describe('The productLineItem module', () => {
    test('That productLineItem exists', () => {
        expect(productLineItem).toBeDefined();
    });

    test('That productLineItem has a product property', () => {
        expect(productLineItem.product).toBeDefined();
        expect(typeof productLineItem.product).toBe('object');
    });

    test('That productLineItem has a quantity property', () => {
        expect(productLineItem.quantity).toBeDefined();
        expect(typeof productLineItem.quantity).toBe('number');
    });
});