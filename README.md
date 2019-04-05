You must have both [nodeJS](https://nodejs.org/en/download/package-manager/) and [yarn](https://yarnpkg.com/lang/en/docs/install) or [npm](https://www.npmjs.com/get-npm) installed.

To install dependencies:

```
    $ yarn install
```

To run tests:

```
    $ yarn test
```

To run the code:
```
    $ yarn build
```
Then open the `./index.html` file in your browser. 

There is a simple UI for adding and removing items from your order. You can modify the products and/or the promotions as you see fit in the browser. Your changes should be automatically reflected in the cart - this will create a new instance of the cart, removing the items currently added to it.

You can also modify products and promotions in their respective JSON files found under the `./data` directory.

You can define new products with the following JSON format:

```
ID := unique product name/ID {string}
pricePerUnit := price, in dollars, per 1 "unit" of the item {number}
isDivisibleUnit := whether the item is distributed in units less than 1 whole e.g. sold by weight or volume {boolean}
```

You can define new promotions with the following JSON format:

```
type := the type of promotion. Accepted types are "markdown", "buyXgetY", "buyNgetM_weighted", are "bundle". {string}
productID := The product to which the promotion can be applied. {string}
buy := The number of products needed to buy to trigger the promotion {number} [only meaningful for "markdown", "buyXgetY", and "buyNgetM_weighted" types] [should be 0 for "markdown"]
get := The number of products to which the promotion is appied, after the buy amount is met. {number} [only meaningful for "markdown" and "buyXgetY" types]
percentOff := The discount of the product price as a decimal from 0-1 {number} [only meaningful for "markdown", "buyXgetY", and "buyNgetM_weighted" types]

quantityNeeded := The number of items which are grouped together at a new price {integer} [only meaningful for "bundle" types]
newPrice := The new price of a group of products in a bundle {number} [only meaningful for "bundle" types]

limit := The total number of products which a person can use as part of a promotion before the promotion cannot be used anymore {number} [optional, no value means the promotion is unlimited]
```