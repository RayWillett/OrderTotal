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
    let testCatalogData = require('./catalog.test.json');

    test('That inventory\'s simple catalog is constructed', () => {
        const product = testCatalogData.valid[0], // Get a single product
            { ID, pricePerUnit, isDivisibleUnit } = product,
            _inventory = new ProductManager([product]);

        expect(_inventory.catalog).toEqual({
            [ID]: {
                ID,
                pricePerUnit,
                isDivisibleUnit
            }
        });
    });

    test('That inventory\'s complex catalog is constructed', () => {
        let testProducts = testCatalogData.valid,
            productIDs = new Set(testProducts.map( product => product.ID ));
        
        let _inventory = new ProductManager(testProducts),
            productsInCatalog = new Set(Object.keys(_inventory.catalog));

        // Test that the product IDs in the catalog match the expected product IDs
        expect(productsInCatalog).toEqual(productIDs);

        // Test that each product in the catalog matches the definition
        testProducts.forEach((product) => {
            const { ID, pricePerUnit, isDivisibleUnit } = product,
                catalogRecord = _inventory.catalog[ID];

            expect(catalogRecord).toEqual({
                ID,
                pricePerUnit,
                isDivisibleUnit
            });
        });
    });

    test('That an error will be thrown when a duplicate product ID is defined.', () => {
        let testProducts = testCatalogData.duplicated;

        expect(() => {
            let _inventory = new ProductManager(testProducts);
        }).toThrow();
    });
});

describe('Product retrieval from the productManager', () => {
    let inventory,
        testCatalogData = require('./catalog.test.json');

    beforeEach(() => {
        inventory = new ProductManager(testCatalogData.valid);
    });

    afterEach(() => {
        inventory = null;
    });

    test('That ProductManager.getProduct exists', () => {
        expect(inventory.getProduct).toBeDefined();
        expect(typeof inventory.getProduct).toBe('function');
    });

    test('That a product will be returned from the ProductManager if it exists in the catalog.', () => {
        const { ID, isDivisibleUnit, pricePerUnit } = testCatalogData.valid[0],
            product = inventory.getProduct(ID);

        expect(product).not.toBeNull();
        expect(product).toEqual({
            ID,
            isDivisibleUnit,
            pricePerUnit
        });
    });

    test('That null will be returned from the ProductManager if no product exists in the catalog matching the provided ID.', () => {
        const product = inventory.getProduct('some invalid product ID');

        expect(product).toBeNull();
    });
})