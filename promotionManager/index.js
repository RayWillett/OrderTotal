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
     * Returns a list of promotions which can/will be applied to the cart.
     *
     *@param listOfProducts {array} - the list of products which may have an available promotion in the cart.
     *@returns {array} - The list of promotions which are applicable to the cart in its current state.
     */
     getApplicablePromotions (listOfProducts) {
        return [];
     }

     /**
      * Returns an available promotion for the given product ID or and empty array if none are found.
      *
      * @param productID {string} - the product ID to search promotions for.
      * @returns {array} - the product's promotions or an empty array.
      */
     getProductPromotion (productID) {
        return this.availablePromotions.filter( promotion => promotion.buy.ID == productID );
     }
}

module.exports = PromotionManager;