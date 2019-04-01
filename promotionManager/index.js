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
}

module.exports = PromotionManager;