const Cart = require('../index');

let cart;

function getMockedProductManager (getProductDefinition) {
    jest.mock('../../productManager');

    const productManager = require('../../productManager'),
        mockFn = jest.fn(getProductDefinition);

    productManager.mockImplementation(() => {
        return {
            getProduct: mockFn
        }
    });
    return productManager();
}

function getMockedPromotionManager (promotions, getPrice, getPromotion) {
    jest.mock('../../promotionManager');

    const promotionManager = require('../../promotionManager');

    promotionManager.mockImplementation(() => {
        return {
            getDiscountAmount: jest.fn(getPrice),
            getApplicablePromotions: jest.fn(getPromotion)
        }
    });
    return promotionManager();
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
    jest.mock('../../productLineItem');
    
    let productLineItemMockImpl = require('../../productLineItem'),
        constructorMock = jest.fn(),
        mockGetProductFn = jest.fn(),
        mockAddQuantityFn = jest.fn();

    productLineItemMockImpl.mockImplementation(() => {
        return {
            constructor: constructorMock,
            getPrice: mockGetProductFn,
            addQuantity: mockAddQuantityFn
        }
    });

    beforeEach(() => {
        const productManagerMock = getMockedProductManager(() => true);

        productLineItemMockImpl.mockClear();
        constructorMock.mockClear();
        mockGetProductFn.mockClear();
        mockAddQuantityFn.mockClear();

        cart = new Cart(productManagerMock, productLineItemMockImpl);
    });

    test('That addItem is a function', () => {
        expect(cart.addItem).toBeDefined();
        expect(typeof cart.addItem).toBe('function');
    });

    test('That calling addItem results in a single item being added to the cart', () => {
        const productID = 'can of soup',
            quantity = 1;

        expect(cart.productLineItems).toEqual({}); // ensure cart is empty
        cart.addItem(productID, quantity);
        expect(productLineItemMockImpl.mock.calls.length).toEqual(1);
    });

    test('That adding an already existing item to the cart increases the quantity', () => {
        const productID = 'can of soup',
            quantity = 2;

        expect(cart.productLineItems).toEqual({}); // ensure cart is empty
        cart.addItem(productID, quantity);
        cart.addItem(productID, 1);
        expect(mockAddQuantityFn.mock.calls.length).toEqual(1);
    });

    test('That addItem can handle items with quantities that are not integers', () => {
        const productID = 'ground beef',
            quantity = 1.24;

        expect(cart.productLineItems).toEqual({}); // ensure cart is empty
        cart.addItem(productID, quantity);
        expect(productLineItemMockImpl.mock.calls.length).toEqual(1);
    });

    test('That adding an already existing item to the cart increases the non-integer quantity', () => {
        const productID = 'ground beef',
            quantity = 1.24;

        expect(cart.productLineItems).toEqual({}); // ensure cart is empty
        cart.addItem(productID, quantity);
        cart.addItem(productID, 1);
        expect(mockAddQuantityFn.mock.calls.length).toEqual(1);
    });

    test('That addItem will not accept a product which is not defined in the catalog', () => {
        const productID = 'can of soup',
            quantity = 1;

        const mockedGetProduct = getMockedProductManager((productID => {
            return ['beef stew', 'toilet paper', 'marshmallows'].indexOf(productID) > -1;
        }));

        const _cart = new Cart(mockedGetProduct);

        expect(_cart.productLineItems).toEqual({}); // ensure cart is empty
        expect(() => {
            _cart.addItem(productID, quantity);
        }).toThrow();
        expect(_cart.productLineItems).toEqual({}); // ensure cart is still empty
    });

    test('That addItem will only add a product which is defined in the catalog', () => {
        const productID = 'marshmallows',
            quantity = 1;

        const mockedGetProduct = getMockedProductManager((productID => {
            return ['beef stew', 'toilet paper', 'marshmallows'].indexOf(productID) > -1;
        }));

        const _cart = new Cart(mockedGetProduct, productLineItemMockImpl);

        expect(_cart.productLineItems).toEqual({}); // ensure cart is empty
        expect(() => {
            _cart.addItem(productID, quantity);
        }).not.toThrow();
        expect(mockAddQuantityFn.mock.calls.length).toEqual(0);
    });
});

describe('The cart\s removeItem method', () => {
    const removeFunction = jest.fn();
    function productLineItemMockImplFunction (product, quantity) {
        this.removeQuantity = removeFunction;
        this.quantity = 0;
    }

    afterEach(() => {
        removeFunction.mockClear();
    });

    test('That the cart calls the productLineItem removeQuantity function', () => {
        const productID = 'marshmallows',
            quantity = 2;

        const mockedGetProduct = getMockedProductManager((productID => {
            return ['beef stew', 'toilet paper', 'marshmallows'].indexOf(productID) > -1;
        }));

        const _cart = new Cart(mockedGetProduct, productLineItemMockImplFunction);

        let result;
        
        _cart.addItem(productID, quantity);
        result = _cart.removeItem(productID, 1);

        expect(removeFunction.mock.calls.length).toEqual(1);
    });

    test('That the cart does not contain any productLineItems with 0 quantity', () => {
        const productID = 'marshmallows',
            quantity = 2;

        const mockedGetProduct = getMockedProductManager((productID => {
            return ['beef stew', 'toilet paper', 'marshmallows'].indexOf(productID) > -1;
        }));

        const _cart = new Cart(mockedGetProduct, productLineItemMockImplFunction);

        let result;
        
        _cart.addItem(productID, quantity);
        result = _cart.removeItem(productID, quantity);
        expect(_cart.productLineItems).toEqual({});
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

    test('That the cart pretax total will match the sum of product price times it\'s quantity', () => {
        const catalogData = require('./catalog.test.json'),
            mockedGetProduct = getMockedProductManager((productID => {
                return catalogData[productID];
            })),
            mockPromotionManager = getMockedPromotionManager();
        
        function productLineItemMockImpl(product, quantity) {
            this.getPrice = () => {
                return catalogData[product.ID].pricePerUnit * catalogData[product.ID].quantity;
            }
        }

        const _cart = new Cart(mockedGetProduct, productLineItemMockImpl, mockPromotionManager);

        let expectedTotal = 0;

        Object.keys(catalogData).forEach(productID => {
            _cart.addItem(productID, catalogData[productID].quantity);

            const pretaxTotal = _cart.getPretaxTotal();
            expectedTotal += (catalogData[productID].pricePerUnit * catalogData[productID].quantity);

            expect(pretaxTotal).toBe(expectedTotal);
        });
    });

    test('That getting the cart pretax total will call promotionManager.getApplicablePromotions once per item', () => {
        jest.mock('../../productLineItem');

        const catalogData = require('./catalog.test.json'),
            mockedGetProduct = getMockedProductManager((productID => {
                return catalogData[productID];
            })),
            mockPromotionManager = getMockedPromotionManager();

        function productLineItemMockImpl(product, quantity) {
            this.getPrice = () => {
                return catalogData[product.ID].pricePerUnit * catalogData[product.ID].quantity;
            }
        }

        const _cart = new Cart(mockedGetProduct, productLineItemMockImpl, mockPromotionManager);
        
        Object.keys(catalogData).forEach(productID => {
            _cart.addItem(productID, catalogData[productID].quantity);
        });

        const pretaxTotal = _cart.getPretaxTotal();
        expect(mockPromotionManager.getApplicablePromotions.mock.calls.length).toBe(Object.keys(catalogData).length);
    });

    test('That getting the cart pretax total will call promotionManager.getDiscountAmount once per item', () => {
        jest.mock('../../productLineItem');

        const catalogData = require('./catalog.test.json'),
            mockedGetProduct = getMockedProductManager((productID => {
                return catalogData[productID];
            })),
            mockPromotionManager = getMockedPromotionManager([], () => 0, () => true);

        function productLineItemMockImpl(product, quantity) {
            this.getPrice = () => {
                return catalogData[product.ID].pricePerUnit * catalogData[product.ID].quantity;
            }
            this.product = {
                price: 1,
                quantity: 1
            }
        }

        const _cart = new Cart(mockedGetProduct, productLineItemMockImpl, mockPromotionManager);
        
        Object.keys(catalogData).forEach(productID => {
            _cart.addItem(productID, catalogData[productID].quantity);
        });

        const pretaxTotal = _cart.getPretaxTotal();
        expect(mockPromotionManager.getDiscountAmount.mock.calls.length).toBe(Object.keys(catalogData).length);
    });
});