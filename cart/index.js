class Cart {
    constructor () {
        this.productLineItems = {};
    }
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