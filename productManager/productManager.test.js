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
});

describe('The catalog construction', () => {
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

    test('That inventory\'s complex catalog is constructed', () => {
        let testProducts = require('./catalog.test.json').valid,
            productIDs = new Set(testProducts.map( product => product.ID ));
        
        let _inventory = new ProductManager(testProducts),
            productsInCatalog = new Set(Object.keys(_inventory.catalog));

        // Test that the product IDs match
        expect(productsInCatalog).toEqual(productIDs);

        // Test that each product matches
        testProducts.forEach((product) => {
            const { ID, pricePerUnit, isDivisibleUnit } = product,
                catalogRecord = _inventory.catalog[ID];

            expect(catalogRecord).toEqual({
                pricePerUnit,
                isDivisibleUnit
            });
        });
    });
});