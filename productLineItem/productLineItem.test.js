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
});