const ProductLineItem = require('./index.js');

let productLineItem, productDefinition;

beforeEach(() => {
    productDefinition = require('./product.test.json')[0];
    productLineItem = new ProductLineItem(productDefinition, 1);
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

    test('That productLineItem has a getPrice method', () => {
        expect(productLineItem.getPrice).toBeDefined();
        expect(typeof productLineItem.getPrice).toBe('function');
    });

    test('That productLineItem has an addQuantity method', () => {
        expect(productLineItem.addQuantity).toBeDefined();
        expect(typeof productLineItem.addQuantity).toBe('function');
    });
});

describe('The productLineItem getPrice method', () => {
    test('That a productLineItem with 1 quantity has a price equal to the product definition\'s price', () => {
        expect(productLineItem.getPrice()).toEqual(productDefinition.pricePerUnit);
    });

    test('That a productLineItem with 0 quantity has a price of $0', () => {
        productLineItem = new ProductLineItem(productDefinition, 0);
        expect(productLineItem.getPrice()).toEqual(0);
    });
});
