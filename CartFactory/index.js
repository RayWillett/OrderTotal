const Cart = require('./cart'),
    ProductLineItem = require('./productLineItem'),
    PromotionManager = require('./promotionManager'),
    ProductManager = require('./ProductManager');

module.exports = function (products, promotions) {
    const productManager = new ProductManager(products),
        promotionManager = new PromotionManager(promotions);
    return new Cart(productManager, ProductLineItem, promotionManager);
};