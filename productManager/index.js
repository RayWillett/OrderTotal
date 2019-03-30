/**
 * A Helper function which appends a product object to a catalog object.
 *
 * @param catalog {object} - an object representing valid products which can be added to the cart.
 * @param product {object} - an object representing a single valid product to be added to the catalog.
 */
const appendProductToCatalog = (catalog, product) => {
    const { ID, pricePerUnit, isDivisibleUnit } = product;
    if (catalog.hasOwnProperty(productID)) {
        throw Error(`Product with ID {productID} is defined more than once.`);
    }
    catalog[productID] = {
        pricePerUnit,
        isDivisibleUnit
    }
    return catalog;
};

class ProductManager {
    /**
     * Manages the stores inventory of products and prices.
     *
     * @param products {array} - list of definitions for products which can be added to the cart.
     * @constructor
     */
    constructor (products) {
        this.catalog = this._constructProductCatalog(products);
    }

    /**
     * Creates a product map representing the catalog based on a list of products.
     *
     * @param products {array} - a list of objects representing products with keys ID, pricePerUnit, isDivisibleUnit
     */
    _constructProductCatalog (products) {
        return products.reduce(appendProductToCatalog, {});
    }
}

module.exports = ProductManager;