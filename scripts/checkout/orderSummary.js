import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //default export, when you wanna only export 1 thing.
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary(){
	let cartSummaryHTML = '';
	cart.forEach((cartItem) => {
		const productId = cartItem.productId;


		/*let matchingItem;
		//aka deduplicating data
		products.forEach((item)=>{
			if(item.id === productId){
				matchingItem = item;
			}
		});*/

		const matchingItem = getProduct(productId);

		const deliveryOptionId = cartItem.deliveryOptionId;

		const deliveryOption = getDeliveryOption(deliveryOptionId);

		const today = dayjs();
		const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

		const dateString = deliveryDate.format('dddd, MMMM D');

		cartSummaryHTML += 
			`<div class="js-cart-item-container-${matchingItem.id} js-cart-item-container cart-item-container">
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
						${matchingItem.getPrice()}
					</div>
					<div class="js-product-quantity-${matchingItem.id} product-quantity">
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
			<div class="js-delivery-option delivery-option" data-product-id = "${matchingItem.id}" data-delivery-option-id = "${deliveryOption.id}">
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

			/*const container = document.querySelector(`.js-cart-item-container-${productId}`);
			console.log(container);
			container.remove();*/
			renderOrderSummary();
			renderPaymentSummary();
		});
	});

	document.querySelectorAll('.js-delivery-option').forEach((element)=> {
		element.addEventListener('click', ()=>{
			const {productId, deliveryOptionId} = element.dataset; //shorthand.
			updateDeliveryOption(productId, deliveryOptionId);
			renderOrderSummary(); //reload page essentially
			renderPaymentSummary();
		})
	});

	
}


/*MVC = Model View Control
Known as a design pattern.

JS Frameworks are based on MVCs

Model = all the code in the data photo (html)

View = takes data and displays it on the page, the renderOrderSummary()

Controller = runs code when interacting with page (event listeners)

*/