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