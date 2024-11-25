/* creating a module:
1. create a file
2. don't load it with script
*/

/*getting variable out of file
1. add type = "module" lets files get vars out of other files
2. export
3. import */
export let cart;
loadFromStorage();

export function addToCart(productId){
	//const quantityAdd = Number(document.querySelector(`.js-select-${productId}-value`).value);
	let matchingItem;
	cart.forEach((cartItem)=>{
			if(productId === cartItem.productId){
				matchingItem = cartItem;
			}
		}
	);

	if(matchingItem){
		//matchingItem.quantity += quantityAdd;
		matchingItem.quantity += 1;
	}
	else{
		cart.push({
			productId: productId,
			//quantity: quantityAdd,
			quantity: 1,
			deliveryOptionId: '1'
		});
	}
	saveToStorage(cart);
};

export function loadFromStorage(){
	cart = JSON.parse(localStorage.getItem('cart')) || []; 

}

function saveToStorage(){
	localStorage.setItem('cart', JSON.stringify(cart)); //2 parameter, name, data wanted to save, can only save strings.
}

export function removeFromCart(productId){
	const newCart = [];
	cart.forEach((cartItem) => {
		if(cartItem.productId !== productId){
			newCart.push(cartItem);
		}
	});
	cart = newCart;
	saveToStorage(cart);
}

export function updateDeliveryOption(productId, deliveryOptionId){
	let matchingItem;
	cart.forEach((cartItem)=>{
			if(productId === cartItem.productId){
				matchingItem = cartItem;
			}
		}
	);
	matchingItem.deliveryOptionId = deliveryOptionId;
	saveToStorage();
}