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
        //TODO: Add validation here.
        this.quantity += increaseBy;
      }
}

module.exports = ProductLineItem;