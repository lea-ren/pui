// When the user clicks on “Add to Cart,” save all of the current product information
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
    computeRollPrice() {
        let size = packSizeList[this.size];
        let glazing = glazingPriceList[this.glazing];
        return ((this.basePrice + glazing) * size).toFixed(2)
    }
}