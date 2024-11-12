import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import formatCurrency from './utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //default export, when you wanna only export 1 thing.
import {deliveryOptions} from '../data/deliveryOptions.js'

/*hello();
const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'))
*/
let cartSummaryHTML = '';
cart.forEach((cartItem) => {
	const productId = cartItem.productId;

	let matchingItem;

	//aka deduplicating data
	products.forEach((item)=>{
		if(item.id === productId){
			matchingItem = item;
		}
	});

	const deliveryOptionId = cartItem.deliveryOptionId;

	let deliveryOption;

	deliveryOptions.forEach((option) => {
		if(option.id === deliveryOptionId){
			deliveryOption = option;
		}
	});
	const today = dayjs();
	const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

	const dateString = deliveryDate.format('dddd, MMMM D');

	cartSummaryHTML += 
		`<div class="js-cart-item-container-${matchingItem.id} cart-item-container">
			<div class="delivery-date">
				Delivery date: ${dateString}
			</div>

		<div class="cart-item-details-grid">
			<img class="product-image"
				src="${matchingItem.image}">

			<div class="cart-item-details">
				<div class="product-name">
					${matchingItem.name}
				</div>
				<div class="product-price">
					$${formatCurrency(matchingItem.priceCents)}
				</div>
				<div class="product-quantity">
					<span>
						Quantity: <span class="quantity-label">${cartItem.quantity}</span>
					</span>
					<span class="js-update-link update-quantity-link link-primary" data-product-id = "${matchingItem.id}">
						Update
					</span>
					<span class="js-delete-link delete-quantity-link link-primary" data-product-id = "${matchingItem.id}">
						Delete
					</span>
				</div>
			</div>
			<div class="delivery-options">
				<div class="delivery-options-title">
					Choose a delivery option:
				</div>
				${deliveryOptionsHTML(matchingItem, cartItem)}
			</div>
		</div>
	</div>`;

});

function deliveryOptionsHTML(matchingItem, cartItem){
	console.log(cartItem);
	let html = '';
	deliveryOptions.forEach((deliveryOption) => {
		
		const today = dayjs();
		const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

		const dateString = deliveryDate.format('dddd, MMMM D');

		//ternary operator
		const priceString = (deliveryOption.priceCents === 0)
		? 'FREE'
		: `$${formatCurrency(deliveryOption.priceCents)} -`;

		const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
		html += `
		<div class="delivery-option">
			<input type="radio" ${isChecked ? 'checked' : ''}
				class="delivery-option-input"
				name="delivery-option-${matchingItem.id}">
			<div>
				<div class="delivery-option-date">
					${dateString}
				</div>
				<div class="delivery-option-price">
					${priceString} Shipping
				</div>
			</div>
		</div>
		`;
	});
	return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


document.querySelectorAll('.js-delete-link').forEach((link)=>{
	link.addEventListener('click', ()=>{
		const productId = link.dataset.productId;
		removeFromCart(productId);

		const container = document.querySelector(`.js-cart-item-container-${productId}`);
		console.log(container);
		container.remove();

	});
});