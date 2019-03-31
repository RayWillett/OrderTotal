const ProductLineItem = require('./index.js'),
    productDefinitions = require('./product.test.json');

let productLineItem, productDefinition, fractionalProductLineItem;

beforeEach(() => {
    productDefinition = productDefinitions[0];
    fractionalProductLineItem = productDefinitions[1];
    productLineItem = new ProductLineItem(productDefinition, 1);
});

afterEach(() => {
    productLineItem = null;
});

describe('The productLineItem module', () => {
    test('That productLineItem exists', () => {
        expect(productLineItem).toBeDefined();
    });

    test('That ProductLineItem constructor does not accept an non-number quantity.', () => {
        expect(() => {
            productLineItem = new ProductLineItem(productLineItem, "asdf");
        }).toThrow();
    });

    test('That ProductLineItem constructor does not accept an negative number quantity.', () => {
        expect(() => {
            productLineItem = new ProductLineItem(productLineItem, -1);
        }).toThrow();
    });
    
    test('That ProductLineItem constructor does not accept an fractional quantity for a non-divisible product type.', () => {
        expect(() => {
            productLineItem = new ProductLineItem(fractionalProductLineItem, 1.4);
        }).toThrow();
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
});


describe('The productLineItem addMethod method', () => {
    test('That addQuantity increases the quantity of a product.', () => {
        expect(productLineItem.quantity).toEqual(1);
        productLineItem.addQuantity(1);
        expect(productLineItem.quantity).toEqual(2);
    });
});