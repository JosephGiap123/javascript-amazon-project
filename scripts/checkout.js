import { renderOrderSummary } from "./checkout/orderSummary.js";

import { renderPaymentSummary } from "./checkout/paymentSummary.js";

import { loadProducts } from "../data/products.js";

//import '../data/backend-practice.js';

//import '../data/cart-classes.js';

loadProducts(()=>{
	renderOrderSummary();
	renderPaymentSummary();
});