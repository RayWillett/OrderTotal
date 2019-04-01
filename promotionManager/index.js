class PromotionManager {

    /**
     * Promotion Manger class handles promotions and markdowns for products in the cart.
     *
     * @param availablePromotions {array} - list of possible/available promtions.
     */
    constructor (availablePromotions) {
        this.availablePromotions = availablePromotions;
    }
}

module.exports = PromotionManager;