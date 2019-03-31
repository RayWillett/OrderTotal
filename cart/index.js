const message = require('../util/message.json');

class Cart {
    /**
     * Represents the  cart object.
     * 
     * @constructor
     * @param ProductManager {Object} - Object used to interact with the product catalog.
     * @param productLineItemClass {Class} - Class to be used to wrap products in the cart.
     */
    constructor (productManager, productLineItemClass) {
        this.productLineItems = {};
        this.productManager = productManager;
        this.productLineItemClass = productLineItemClass;
    }

    /**
     * Allows an item to be added to the cart at a given quantity.
     * @param {string} productID - The ID of the product being added to the cart.
     * @param {number} quantity = The quantity of the product to be added to the cart.
     */
    addItem (productID, quantity) {
        this.validateItem(productID);
        // If the productID isn't already in the cart, create a new line item wrapper for it.
        if (!this.productLineItems.hasOwnProperty(productID)) {
            let product = this.productManager.getProduct(productID);
            this.productLineItems[productID] = new this.productLineItemClass(product, quantity);
        } else {
            // Increase line item quantity
            this.productLineItems[productID].addQuantity(quantity);
        }
    }

    /**
     * Validate the product ID and quantity before allowing it to be added to the cart.
     *
     * @param productID {string} - The product ID being added to the cart.
     */
    validateItem (productID) {
        if (!this.productManager.getProduct(productID)) {
            throw Error(message.error.invalidID.replace('{ID}', productID));
        }
    }

    /**
     * @returns {number} - The pretax total of the items in the cart.
     */
    getPretaxTotal () {
        return 0;
    }
}

module.exports = Cart;