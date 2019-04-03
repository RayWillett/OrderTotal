const message = require('../util/message.json');

const validateQuantity = (product, quantity) => {
    const isFractionalQuantity = !Number.isInteger(quantity);
    if (isNaN(quantity) || 0 >= quantity || (isFractionalQuantity && !product.isDivisibleUnit)) {
        throw Error(message.error.invalidQuantity.replace('{ID}', product.ID).replace('{quantity}', quantity));
    }
};

class ProductLineItem {
    /**
     * A wrapper class representing products in the cart.
     *
     * @constructor
     * @param product {object} - the product being added to the cart.
     * @param quantity {number} - the quantity being added to the cart.
     */
     constructor (product, quantity) {
        validateQuantity(product, quantity);
        this.product = product;
        this.quantity = quantity;
     }

     /**
      * Returns the price of the productLineItem.
      *
      * @returns {number}
      */
      getPrice () {
        return this.product.pricePerUnit * this.quantity;
      }

      /**
       * Increases the quantity of the product by a given amount.
       *
       * @param increaseBy {number} the amount to increase the quantity by
       */
      addQuantity (increaseBy) {
        validateQuantity(this.product, increaseBy);
        this.quantity += increaseBy;
      }

      /**
       * Decreasees the quantity of the product by a given amount.
       *
       * @param decreaseBy {number} the amount to decrease the quantity by
       */
      removeQuantity (decreaseBy) {
        validateQuantity(this.product, decreaseBy);
        this.quantity -= decreaseBy;
        if (this.quantity < 0) {
          this.quantity = 0;
        }
      }
}

module.exports = ProductLineItem;