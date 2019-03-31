const message = require('../util/message.json');

class Cart {
    /**
     * Represents the  cart object.
     * 
     * @constructor
     * @param ProductManager {Object} - Object used to interact with the product catalog.
     */
    constructor (productManager) {
        this.productLineItems = {};
        this.productManager = productManager;
    }

    /**
     * Allows an item to be added to the cart at a given quantity.
     * @param {string} productID - The ID of the product being added to the cart.
     * @param {number} quantity = The quantity of the product to be added to the cart.
     */
    addItem (productID, quantity) {
        this.validateItem(productID, quantity);
        // If the productID isn't already in the cart, create a new line item wrapper for it.
        if (!this.productLineItems.hasOwnProperty(productID)) {
            this.productLineItems[productID] = {
                quantity: 0
            };
        }
        // Increase line item quantity
        this.productLineItems[productID].quantity += quantity;
    }

    /**
     * Validate the product ID and quantity before allowing it to be added to the cart.
     *
     * @param productID {string} - The product ID being added to the cart.
     * @param quantit {number} - The quantity being added to the cart.
     */
    validateItem (productID, quantity) {
        if (!this.productManager.getProduct(productID)) {
            throw Error(message.error.invalidID.replace('{ID}', productID));
        }
        if (isNaN(quantity) || 0 >= quantity) {
            throw Error(message.error.invalidQuantity.replace('{ID}', productID).replace('{quantity}', quantity));
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