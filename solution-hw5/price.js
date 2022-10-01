// Extract current roll information
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const chosenRoll = params.get('roll')

// Manipulate the name of roll on the DOM
const headerElement = document.querySelector('#roll-header-text');
headerElement.innerText = chosenRoll + ' cinnamon roll'

// Manipulate the Image on the DOM
const rollImage = document.querySelector('#roll-img');
rollImage.src = './assets/' + rolls[chosenRoll]["imageFile"];

// Manipulate the Price on the DOM
// Set defalt glazing to original and the price to 0
let glazingOption = 'Keep original';
let glazingPrice = 0; // the corresponding price for the chosen glazing
const glazingPriceList = {'Keep original': 0, 'Sugar milk': 0, 'Vanilla milk': 0.5, 'Double chocolate': 1.5};

// Set base price to corresponding price of the chosen roll
const basePrice = rolls[chosenRoll]["basePrice"];

// Set packsize to 1 as default
let packSizeOption = '1';
let packSize = 1;
const packSizeList = {'1': 1, '3': 3, '6': 5, '12': 10};


updatePrice(glazingPrice, packSize)

function updateGlazingOption(glazingOpt) {
    glazingOption=glazingOpt;
}
function updatePrice(glazing, packSize) {
    // select the price and manipulate the number
    let totalPrice = document.querySelector("#price");
    totalPrice.textContent=`\$${((basePrice + glazing) * packSize).toFixed(2).toString()}`;
}

function glazingChange(element) {
    // get value of selected glazing option
    const newGlazing = element.value;
    glazingPrice = glazingPriceList[newGlazing];

    // update the glazing option
    updateGlazingOption(newGlazing);

    // update the price
    updatePrice(glazingPrice, packSize)
}

function packSizeChange(pack) {
    // get value of selected packsize option
    const newPackSize = pack.value;
    //
    packSizeOption = newPackSize;
    packSize = packSizeList[packSizeOption];

    // update the price
    updatePrice(glazingPrice, packSize)
}

// When the user clicks on “Add to Cart,” save all of the current product information
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// Initiate the cart array
let cart = new Array();

// push the new roll to cart array
function addToCart() {
    let newRoll = new Roll(chosenRoll, glazingOption, packSizeOption, basePrice);
    cart.push(newRoll)
    console.log(cart);
}