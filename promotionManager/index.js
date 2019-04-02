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
      * Calculates the discount amount for a single ProductLineItem in the cart for promotions with 
      * the following types: markdown, buyXgetY.
      *
      * @param promotion {object} - the promotion to get the discount amount of.
      * @param quantity {number} - The quantity of the item in the cart.
      * @param productPrice {number} - The undiscounted price of the item.
      * @returns {number} the discount amount for this ProductLineItem.
      */
     getMarkdownAmount (promotion, quantity, productPrice) {
        const productsInAPromotionGroup = (promotion.buy + promotion.get),
            numberOfProductGroupsEligibleForDiscount = Math.floor(quantity / productsInAPromotionGroup),
            discountAmountPerProductGroup = (promotion.percentOff * productPrice);

        return discountAmountPerProductGroup * numberOfProductGroupsEligibleForDiscount
     }
}

module.exports = PromotionManager;