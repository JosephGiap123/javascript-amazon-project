import {cart as myCart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = '';

products.forEach((productObject)=> {
		const html = `
		<div class="product-container">
			<div class="product-image-container">
				<img class="product-image" src = "${productObject.image}">
			</div>

			<div class="product-name limit-text-to-2-lines">
				${productObject.name}
			</div>

			<div class="product-rating-container">
				<img class="product-rating-stars"
					src=${productObject.getStarsURL()}>
				<div class="product-rating-count link-primary">
					${productObject.rating.count}
				</div>
			</div>

			<div class="product-price">
				${productObject.getPrice()}
			</div>

			<div class="product-quantity-container">
				<select class = "js-select-${productObject.id}-value">
					<option selected value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
			</div>

			${productObject.extraInfoHTML()}

			<div class="product-spacer"></div>

			<div class="added-to-cart">
				<img src="images/icons/checkmark.png">
				Added
			</div>

			<button class="js-add-to-cart add-to-cart-button button-primary" data-product-id = "${productObject.id}">
				Add to Cart
			</button>
	</div>`;
	productsHTML += html;
});

document.querySelector('.products-grid').innerHTML = productsHTML;

function updateCartQuantity(){
	let cartQuantity = 0;
	myCart.forEach((item)=> {
		cartQuantity += item.quantity;
	});
	document.querySelector('.js-cart-quantity').textContent = cartQuantity;
};




document.querySelectorAll('.js-add-to-cart').forEach((buttonElement)=> {
	buttonElement.addEventListener('click', ()=>{
		//name converted from product-name to productName
		//console.log(buttonElement.dataset.productName);

		const productId = buttonElement.dataset.productId;

		addToCart(productId);
		updateCartQuantity();
	
	});
});


