const basePrice = 2.49;
let glazingPrice = 0;
let packSize = 1;
const glazingPriceList = [0, 0, 0.5, 1.5]


function updatePrice(glazing, packSize) {
    // select the price and manipulate the number
    let totalPrice = document.querySelector("#price");
    totalPrice.textContent=`\$${((basePrice + glazing) * packSize).toFixed(2).toString()}`;
}

function glazingChange(element) {
    // get value of selected glazing option
    const newGlazing = element.value;
    glazingPrice = glazingPriceList[newGlazing];

    // update the price
    updatePrice(glazingPrice, packSize)
}

function packSizeChange(pack) {
    // get value of selected packsize option
    const newPackSize = pack.value;
    console.log(newPackSize);
    packSize = newPackSize;

    // update the price
    updatePrice(glazingPrice, packSize)
}