class ProductLineItem {
    /**
     * A wrapper class representing products in the cart.
     *
     * @constructor
     * @param product {object} - the product being added to the cart.
     * @param quantity {number} - the quantity being added to the cart.
     */
     constructor (product, quantity) {
        this.product = product;
        this.quantity = quantity;
     }
}

module.exports = ProductLineItem;