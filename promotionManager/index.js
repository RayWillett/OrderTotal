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
      * @param appliedTo {number} - The number of the item in the cart for which the discount can be applied.
      * @param productPrice {number} - The undiscounted price of the item.
      * @returns {number} the discount amount for this ProductLineItem.
      */
     _getMarkdownDiscountAmount (promotion, appliedTo, productPrice) {
        const productsInAPromotionGroup = (promotion.buy + promotion.get),
            numberOfProductGroupsEligibleForDiscount = Math.floor(appliedTo / productsInAPromotionGroup),
            discountAmountPerProductGroup = (promotion.percentOff * productPrice);

        return (discountAmountPerProductGroup * numberOfProductGroupsEligibleForDiscount);
     }


    /**
     * Calculates the discount amount for a single ProductLineItem in the cart for promotions with 
     * the following types: bundle.
     *
     * @param promotion {object} - the promotion to get the discount amount of.
     * @param appliedTo {number} - The number of the item in the cart for which the discount can be applied.
     * @param productPrice {number} - The undiscounted price of the item.
     * @returns {number} the discount amount for this ProductLineItem.
     */
     _getBundleDiscountAmount (promotion, appliedTo, productPrice) {
        const fullPrice = (appliedTo * productPrice), 
            numberOfBundles = Math.floor(appliedTo / promotion.quantityNeeded),
            numberOfFullPriceItems = (appliedTo % promotion.quantityNeeded),
            { newPrice } = promotion,
            productLineItemPrice = (productPrice * numberOfFullPriceItems) + (newPrice * numberOfBundles);

            return (fullPrice - productLineItemPrice);
     }

    /**
     * Calculates the discount amount for a single ProductLineItem in the cart for promotions with 
     * the following types: bundle.
     *
     * @param promotion {object} - the promotion to get the discount amount of.
     * @param appliedTo {number} - The number of the item in the cart for which the discount can be applied.
     * @param unitPrice {number} - The undiscounted price of the item.
     * @returns {number} the discount amount for this ProductLineItem.
     */
     _getWeightedDiscountAmount (promotion, appliedTo, unitPrice) {
        return 0;
     }

    /**
      * Calculates the discount amount for a single ProductLineItem in the cart for promotions with 
      * the following types: buyNgeM_weighted.
      *
      * @param promotion {object} - the promotion to get the discount amount of.
      * @param quantity {number} - The quantity of the item in the cart.
      * @param productPrice {number} - The undiscounted price of the item.
      * @returns {number} the discount amount for this ProductLineItem.
      */
     getDiscountAmount(promotion, quantity, productPrice) {
        const limit = (promotion.limit || Infinity);
        const appliedTo = Math.min(quantity, limit);
        switch (promotion.type) {
            case "markdown":
            case "buyXgetY":
                return this._getMarkdownDiscountAmount(promotion, appliedTo, productPrice);
            case "bundle":
                return this._getBundleDiscountAmount(promotion, appliedTo, productPrice);
            case "buyNgeM_weighted":
                return this._getWeightedDiscountAmount(promotion, quantity, productPrice);
            default:
                return 0;
        }
     }
}

module.exports = PromotionManager;