const glazingPriceList = {'Keep original': 0, 'Sugar milk': 0, 'Vanilla milk': 0.5, 'Double chocolate': 1.5};
const packSizeList = {'1': 1, '3': 3, '6': 5, '12': 10};

class CartItem {

    constructor(roll) {
      this.imageURL = 'assets/'+rolls[roll.type]['imageFile'];
      this.name = roll.type + ' Cinnamon Roll';
      this.glazing = roll.glazing;
      this.packSize = roll.size;
      this.price = roll.computeRollPrice();

      const template = document.querySelector('#template');
      const clone = template.content.cloneNode(true);
      this.element = clone.querySelector('.item-container');
      
      
      const btnDelete = this.element.querySelector('.delete');
      btnDelete.onclick = this.deleteItem.bind(this);

      this.removed = false;
      this.addElement();
      
    }
    getPrice() {
        return this.price;
    }
  
    // manipulate the DOM to populate the item in the cart to the DOM
    addElement() {    
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

        const container = document.querySelector('#roll-container');
        container.appendChild(this.element);

    }
  
    // after clicking the remove button, remove the corresponding entry from the DOM
    // and update the total price
    deleteItem() {
      this.element.remove();
      this.removed = true;
      
      updateTotalPrice();
    }
  
}

// Attempt to retrieve the cart from the local storage
//If no cart exists in the storage, create an empty cart array.

let cartItems = new Array();
if (JSON.parse(localStorage.getItem("cart")) != null) {
    let shoppingCart = JSON.parse(localStorage.getItem("cart"));

    // Populate the DOM with all of the items in the current cart
    // using the code from HW5.
    for (let i=0; i < shoppingCart.length; i++) {
        cartItems.push(new CartItem(new Roll(shoppingCart[i]['type'], shoppingCart[i]['glazing'], shoppingCart[i]['size'], shoppingCart[i]['basePrice'])));
    }
}

updateTotalPrice();

function updateTotalPrice() {
    console.log("updating.....");
    let totalPrice = 0;
    if (cartItems != null) {
        cartItems = deleteRemovedItem(cartItems);
        for (let i = 0; i < cartItems.length; i++) {
            totalPrice += parseFloat(cartItems[i].price);
        }
            
        const checkOutPrice = document.querySelector("#total-price");
        checkOutPrice.innerText = "$ "+totalPrice.toFixed(2).toString();
    }
    
}

// When the user clicks on the “Remove” link at any item,
// Remove the item from the cart array.

function deleteRemovedItem(items) {
    let updatedCartItems = new Array();
    let updatedRolls = new Array();

    // Convert the updated cart to JSON, save it in the local storage, and print the cart in local storage after saving.
    for (let i = 0; i < items.length; i++) {
        if (items[i].removed == false) {
            updatedCartItems.push(items[i]);
            const rollName = items[i].name.slice(0, items[i].name.length - 14);
            let roll = new Roll(rollName, items[i].glazing, items[i].packSize, rolls[rollName]['basePrice']);
            updatedRolls.push(roll);
        }
    }
    
    localStorage.setItem("cart", JSON.stringify(updatedRolls));
    console.log("current cart:")
    console.log(updatedRolls);
    return updatedCartItems;
}


