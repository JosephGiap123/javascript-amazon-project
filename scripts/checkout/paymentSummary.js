import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
	let itemPriceCents = 0;
	let shippingCostCents = 0;
	cart.forEach((cartItem)=> {
		const item = getProduct(cartItem.productId);
		itemPriceCents += item.priceCents * cartItem.quantity;

		const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

		shippingCostCents += deliveryOption.priceCents;
	});
	
	const totalBeforeTaxCents = itemPriceCents + shippingCostCents;

	const taxCents = totalBeforeTaxCents * 0.1;

	const totalCents = totalBeforeTaxCents + taxCents;

	const paymentSummaryHTML = 
	`
	<div class="payment-summary-title">
		Order Summary
	</div>
	<div class="payment-summary-row">
		<div>Items (3):</div>
		<div class="payment-summary-money">$${formatCurrency(itemPriceCents)}
		</div>
	</div>

	<div class="payment-summary-row">
		<div>Shipping &amp; handling:</div>
		<div class="payment-summary-money">$4.99</div>
	</div>

	<div class="payment-summary-row subtotal-row">
		<div>Total before tax:</div>
		<div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}
		</div>
	</div>

	<div class="payment-summary-row">
		<div>Estimated tax (10%):</div>
		<div class="payment-summary-money">$${formatCurrency(taxCents)}
		</div>
	</div>

	<div class="payment-summary-row total-row">
		<div>Order total:</div>
		<div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
	</div>

	<button class="js-place-order-button place-order-button button-primary">
		Place your order
	</button>
	`
	document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

	document.querySelector('.js-place-order-button').addEventListener('click', async ()=>{
		try {
			const response = await fetch('https://supersimplebackend.dev/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					cart: cart
				})
			});
			const order = await response.json();
			console.log(order);
			addOrder(order);
		} catch (error) {
			console.log('error!!');
		}

		window.location.href = 'orders.html' //lets us change what the url is!

	});
}

//4 TYPES OF REQUESTS
/*
GET = get something from backend
	dont let us send data back to the backend. just receive.
POST = create something
	used to send data to backend!
PUT = update something
DELETE = delete something
*/

/*
fetch(URL, OBJECT)
->
OBJECT HAS:
method: ONE OF 4 REQUEST TYPES
HEADER OBJECT: content type
BODY OBJECT: actual data to send.
*/