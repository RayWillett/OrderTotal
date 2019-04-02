class PromotionManager {

    /**
     * Promotion Manger class handles promotions and markdowns for products in the cart.
     *
     * @param availablePromotions {array} - list of possible/available promtions.
     */
    constructor (availablePromotions) {
        this.availablePromotions = availablePromotions;
    }

     /**
      * Returns an available promotion for the given product ID or and empty array if none are found.
      *
      * @param productID {string} - the product ID to search promotions for.
      * @returns {object} - the product's promotion or undefined.
      */
     getApplicablePromotions (productID) {
        return this.availablePromotions.filter( promotion => promotion.productID == productID ).pop();
     }

     /**
      * Calculates the discount amount for a single ProductLineItem in the cart.
      *
      * @param promotion {object} - the promotion to get the discount amount of.
      * @param quantity {number} - The quantity of the item in the cart.
      * @param productPrice {number} - The undiscounted price of the item.
      * @returns {number} the discount amount for this ProductLineItem.
      */
     getMarkdownAmount (promotion, quantity, productPrice) {
        let totalMarkdownAmount = 0,
            _quantity = quantity,
            _bought, _gotten;

         //TODO: This calculation should be pulled off into it's own function
        const markdownAmount = (productPrice * promotion.percentOff),
            shouldCheckBoughtAmount = (promotion.buy > 0);

        // While there are still items that may qualify for a discount
        while (_quantity > 0) {
            //reset counters before the loop starts
            _bought = 0;
            _gotten = 0;

            // Remove items which may trigger the discount
            while (shouldCheckBoughtAmount && (_bought <= promotion.buy) && (_quantity > 0)) {
                _quantity--;
                _bought++;
                totalMarkdownAmount += 0; // These items are not discounted. Adding 0 to help document intent.
            }

            while ((_quantity > 0) && (_gotten <= promotion.get)) {
                _quantity--;
                _gotten++;
                totalMarkdownAmount += markdownAmount;
            }
        }
        return totalMarkdownAmount;
     }
}

module.exports = PromotionManager;