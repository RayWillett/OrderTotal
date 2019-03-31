const Cart = require('./index');

let cart;

function getMockedProductManager (getProductDefinition) {
    jest.mock('../productManager');

    const productManager = require('../productManager'),
        mockFn = jest.fn(getProductDefinition);

    productManager.mockImplementation(() => {
        return {
            getProduct: mockFn
        }
    });
    return productManager();
}

beforeEach(() => {
    const productManagerMock = getMockedProductManager(() => true);
    cart = new Cart(productManagerMock);
});

afterEach(() => {
    cart = null;
});

describe('The cart module', () => {
    test('That cart exists', () => {
        expect(cart).toBeDefined();
    });
})

describe('The cart\'s properties', () => {
    test('That cart has a a productLineItems property', () => {
        expect(cart.productLineItems).toBeDefined();
    });

    test('That the cart is empty', () => {
        expect(cart.productLineItems).toEqual({});
    });

    test('That cart has a a productManager property implementing the correct API', () => {
        expect(cart.productManager).toBeDefined();
        expect(cart.productManager.getProduct).toBeDefined();
        expect(typeof cart.productManager.getProduct).toBe('function');
    });
});

describe('The cart\'s AddItem method', () => {
    test('That addItem is a function', () => {
        expect(cart.addItem).toBeDefined();
        expect(typeof cart.addItem).toBe('function');
    });

    test('That calling addItem results in a single item being added to the cart', () => {
        const productID = 'can of soup',
            quantity = 1;

        expect(cart.productLineItems).toEqual({}); // ensure cart is empty
        cart.addItem(productID, quantity);
        expect(cart.productLineItems).toEqual({
            [productID]: {
                quantity
            }
        });
    });

    test('That adding an already existing item to the cart increases the quantity', () => {
        const productID = 'can of soup',
            quantity = 2;

        expect(cart.productLineItems).toEqual({}); // ensure cart is empty
        cart.addItem(productID, quantity);
        expect(cart.productLineItems).toEqual({
            [productID]: {
                quantity
            }
        });
        cart.addItem(productID, 1);
        expect(cart.productLineItems).toEqual({
            [productID]: {
                quantity: quantity + 1
            }
        });
    });

    test('That addItem can handle items with quantities that are not integers', () => {
        const productID = 'ground beef',
            quantity = 1.24;

        expect(cart.productLineItems).toEqual({}); // ensure cart is empty
        cart.addItem(productID, quantity);
        expect(cart.productLineItems).toEqual({
            [productID]: {
                quantity
            }
        });
    });

    test('That adding an already existing item to the cart increases the non-integer qunaity', () => {
        const productID = 'ground beef',
            quantity = 1.24;

        expect(cart.productLineItems).toEqual({}); // ensure cart is empty
        cart.addItem(productID, quantity);
        expect(cart.productLineItems).toEqual({
            [productID]: {
                quantity
            }
        });
        cart.addItem(productID, .57);
        expect(cart.productLineItems).toEqual({
            [productID]: {
                quantity: quantity + .57
            }
        });
    });

    test('That addItem will not accept a quantity less than 0', () => {
        const productID = 'can of soup',
            quantity = -1;

        expect(cart.productLineItems).toEqual({}); // ensure cart is empty
        expect(() => {
            cart.addItem(productID, quantity);
        }).toThrow();
        expect(cart.productLineItems).toEqual({}); // ensure cart is still empty
    });
});


describe('The cart\'s getPretaxTotal method', () => {
    test('That getPretaxTotal is a function', () => {
        expect(cart.getPretaxTotal).toBeDefined();
        expect(typeof cart.getPretaxTotal).toBe('function');
    });

    test('That an empty cart has a $0 total', () => {
        const pretaxTotal = cart.getPretaxTotal();
        expect(pretaxTotal).toBe(0);
    });
});