/**
 * A Helper function which appends a product object to a catalog object.
 *
 * @param catalog {object} - an object representing valid products which can be added to the cart.
 * @param product {object} - an object representing a single valid product to be added to the catalog.
 */
const appendProductToCatalog = (catalog, product) => {
    const { ID, pricePerUnit, isDivisibleUnit } = product;
    if (catalog.hasOwnProperty(ID)) {
        throw Error(`Product with ID {ID} is defined more than once.`);
    }
    catalog[ID] = {
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

    /**
     * Returns the product price and type of unit divisibility for a given product ID.
     * If no product with the provided ID is found null is returned.
     * 
     * @param productID {string} - The product ID to search for.
     * @returns {object} - the product definition or null.
     */
    getProduct (productID) {
        let product = null;
        if (this.catalog.hasOwnProperty(productID)) {
            product = this.catalog[productID]
        }
        return product;
    }
}

module.exports = ProductManager;