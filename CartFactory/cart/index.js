const message = require('../util/message.json');

class Cart {
    /**
     * Represents the  cart object.
     * 
     * @constructor
     * @param productManager {Object} - Object used to interact with the product catalog.
     * @param productLineItemClass {Class} - Class to be used to wrap products in the cart.
     * @param promotionManager {PromotionManager} - the promotion manager that the cart will use to determine discounted prices items.
     */
    constructor (productManager, productLineItemClass, promotionManager) {
        this.productLineItems = {};
        this.productManager = productManager;
        this.productLineItemClass = productLineItemClass;
        this.promotionManager = promotionManager;
    }

    /**
     * Adjust the quantity of a productLineItem in the cart.
     *
     * @param productID {string} - The productID to remove
     * @param quantity {number} - Optional. the number of products to remove. If null, all items matching productID are removed.
     */
    removeItem(productID, quantity) {
        let productLineItem = this.productLineItems[productID];
        if (productLineItem) {
            // Set quantity to be all of the products if it is not a number.
            quantity = isNaN(quantity) ? productLineItem.quantity : quantity;
            productLineItem.removeQuantity(quantity);
            if (0 == productLineItem.quantity) {
                delete this.productLineItems[productID];
            }
        }
    }

    /**
     * Allows an item to be added to the cart at a given quantity.
     *
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
     * Get the pretax total cost of all items in the cart, after applying discounts.
     *
     * @returns {number} - The pretax total of the items in the cart.
     */
    getPretaxTotal () {
        return Object.keys(this.productLineItems).reduce((totalPrice, productID) => {
            const productLineItem = this.productLineItems[productID],
                productLineItemPrice = productLineItem.getPrice(),
                
                productPromotion = this.promotionManager.getApplicablePromotions(productID);

            let discountAmount = 0;
            if (productPromotion) {
                discountAmount = this.promotionManager.getDiscountAmount(productPromotion, productLineItem.quantity, productLineItem.product.pricePerUnit);
            }

            return (totalPrice + (productLineItemPrice - discountAmount));
        }, 0);
    }
}

module.exports = Cart;