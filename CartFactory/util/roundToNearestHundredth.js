/**
* 
*
* @param dollarAmount {number} - The fractional dollar amount to be rounded.
* @returns {number} - the dollar amount rounded to two decimal places.
*/
module.exports = function (dollarAmount) {
    const centAmount = dollarAmount * 100;
    return Math.round(centAmount) / 100;
};