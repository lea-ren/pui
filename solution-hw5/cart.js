const glazingPriceList = {'Keep original': 0, 'Sugar milk': 0, 'Vanilla milk': 0.5, 'Double chocolate': 1.5};
const packSizeList = {'1': 1, '3': 3, '6': 5, '12': 10};

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

class CartItem {

    constructor(roll, elementID) {
      this.imageURL = 'assets/'+rolls[roll.type]['imageFile'];
      this.name = roll.type + ' Cinnamon Roll';
      this.glazing = roll.glazing;
      this.packSize = roll.size;
      this.price = roll.computeRollPrice();
      
  
      this.element = document.querySelector(elementID);
      const btnDelete = this.element.querySelector('.delete');
      btnDelete.onclick = this.deleteItem.bind(this);

      this.removed = false;
  
      this.updateElement();
    }
    getPrice() {
        return this.price;
    }
  
    updateElement() {    
        console.log("update Element");
        console.log(this);
        const rollImage = this.element.querySelector('.cart-info');
        const rollName = this.element.querySelector('.item-name');
        const rollGlazing = this.element.querySelector('.item-glazing');
        const rollPackSize = this.element.querySelector('.item-pack-size');
        const rollPrice = this.element.querySelector('.item-price');
        rollImage.src = this.imageURL;
        rollName.innerText = this.name;
        rollGlazing.innerText = `Glazing: ${this.glazing}`;
        rollPackSize.innerText = `Pack Size: ${this.packSize}`;
        rollPrice.innerText = `$ ${this.price}`;
    }
  
    deleteItem() {
      this.element.remove();
      this.removed = true;
      updateTotalPrice();
    }
  
}

let shoppingCart = new Array();
shoppingCart.push(new Roll('Original', 'Sugar milk', '1', rolls['Original']['basePrice']));
shoppingCart.push(new Roll('Walnut', 'Vanilla milk', '12', rolls['Walnut']['basePrice']));
shoppingCart.push(new Roll('Raisin', 'Sugar milk', '3', rolls['Raisin']['basePrice']));
shoppingCart.push(new Roll('Apple', 'Keep original', '3', rolls['Apple']['basePrice']));

// const rollOne = new CartItem(shoppingCart[0], "#roll-1");
// const rollTwo = new CartItem(shoppingCart[1], "#roll-2");
// const rollThree = new CartItem(shoppingCart[2], "#roll-3");
// const rollFour = new CartItem(shoppingCart[3], "#roll-4");
let cartItems = new Array();
for (let i=0; i < 4; i++){
    cartItems.push(new CartItem(shoppingCart[i],"#roll-"+(i).toString()))
}
updateTotalPrice();

function updateTotalPrice() {
    let totalPrice = 0;
    console.log(cartItems[0].price)
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].removed == false) {
            totalPrice += parseFloat(cartItems[i].price);
            console.log("total price: ", totalPrice, " i ", i, "i.price", parseFloat(cartItems[i].price));
        }
    }
        
    const checkOutPrice = document.querySelector("#total-price");
    checkOutPrice.innerText = "$ "+totalPrice.toString();
}


// console.log(shoppingCart[0]);
// console.log(shoppingCart[0].computeRollPrice());
// console.log(shoppingCart[1]);
// console.log(shoppingCart[1].computeRollPrice());
// console.log(shoppingCart[2]);
// console.log(shoppingCart[2].computeRollPrice());
// console.log(shoppingCart[3]);
// console.log(shoppingCart[3].computeRollPrice());

