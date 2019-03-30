class Cart {
    /**
     * Represents the  cart object.
     * @constructor
     */
    constructor () {
        this.productLineItems = {};
    }

    /**
     * Allows an item to be added to the cart at a given quantity.
     * @param {string} productID - The ID of the product being added to the cart.
     * @param {number} quantity = The quantity of the product to be added to the cart.
     */
    addItem (productID, quantity) {
        // If the productID isn't already in the cart, create a new line item wrapper for it.
        if (!this.productLineItems.hasOwnProperty(productID)) {
            this.productLineItems[productID] = {
                quantity: 0
            };
        }
        // Increase line item quantity
        this.productLineItems[productID].quantity += quantity;
    }


}

module.exports = Cart;