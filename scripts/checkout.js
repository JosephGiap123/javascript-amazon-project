import { renderOrderSummary } from "./checkout/orderSummary.js";

import { renderPaymentSummary } from "./checkout/paymentSummary.js";

import { loadProducts, loadProductsFetch } from "../data/products.js";

import { loadCart } from "../data/cart.js";

//import '../data/backend-practice.js';

//import '../data/cart-classes.js';

Promise.all([
	loadProductsFetch(),
	new Promise((resolve)=>{
		loadCart(()=>{
				resolve('value2');
			});
		})
]).then((values)=>{
	console.log(values);
	renderOrderSummary();
	renderPaymentSummary();
});


/*
new Promise((resolve)=>{
	loadProducts(()=>{
		resolve('value1');
	});
}).then((value)=>{ //values can be saved between steps using resolve.
return new Promise((resolve)=>{
	loadCart(()=>{
			console.log(value);
			resolve();
		});
	});
}).then(()=>{
	renderOrderSummary();
	renderPaymentSummary();
});*/


//promise = built in class given a function. runs IMMEDIATELY. resolve function controls when to go into next step! promises create a new thread, allowing for multiple things to happen at once! the next step after resolve is .then().

/*
loadProducts(()=>{
	loadCart(()=>{
		renderOrderSummary();
		renderPaymentSummary();
	});
});*/

//using callbacks causes a lot of nesting. promises better.