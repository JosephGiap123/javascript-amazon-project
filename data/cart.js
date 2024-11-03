/* creating a module:
1. create a file
2. don't load it with script
*/

/*getting variable out of file
1. add type = "module" lets files get vars out of other files
2. export
3. import */
export const cart = [];

export function addToCart(productId){
	const quantityAdd = Number(document.querySelector(`.js-select-${productId}-value`).value);
	let matchingItem;
	cart.forEach((cartItem)=>{
			if(productId === cartItem.productId){
				matchingItem = cartItem;
			}
		}
	);

	if(matchingItem){
		matchingItem.quantity += quantityAdd;
	}
	else{
		cart.push({
			productId: productId,
			quantity: quantityAdd
		});
	}
};
