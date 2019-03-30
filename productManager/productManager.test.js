const ProductManager = require('./index');

let inventory;

beforeEach(() => {
    inventory = new ProductManager([]);
});

afterEach(() => {
    inventory = null;
});

describe('The ProductManager module', () => {
    test('That inventory exists', () => {
        expect(inventory).toBeDefined();
    });

    test('That inventory\'s catalog is empty', () => {
        expect(inventory.catalog).toBeDefined();
        expect(inventory.catalog).toEqual({});
    });

    test('That inventory\'s simple catalog is constructed', () => {
        const ID = 'can of soup',
            pricePerUnit = 1.99,
            isDivisibleUnit = false,
            product = {
                ID,
                pricePerUnit,
                isDivisibleUnit
            },
            _inventory = new ProductManager([product]);

        expect(_inventory.catalog).toEqual({
            [ID]: {
                pricePerUnit,
                isDivisibleUnit
            }
        });
    });
});