import { addToCart,cart, loadFromStorage } from "../../data/cart.js";

localStorage.clear();

describe('test suite: addToCart',()=>{
	it('adds an existing product to the cart', ()=>{
		spyOn(localStorage, 'setItem');
		spyOn(localStorage, 'getItem').and.callFake(()=>{
			return JSON.stringify([{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 1,
				deliveryOptionId: '1'
			}]);
		});
		loadFromStorage();

		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		//expect(localStorage.setItem).toHaveBeenCalledTimes(1); //expect returns an object
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(2);

	});
	it('adds a new product to the cart', ()=>{
		spyOn(localStorage, 'setItem');
		spyOn(localStorage, 'getItem').and.callFake(()=>{
			return JSON.stringify([]);
		}); //spyOn(object, method), makes a fake version to not affect data

		loadFromStorage();

		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		//expect(localStorage.setItem).toHaveBeenCalledTimes(1); //expect returns an object
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(1);
	});

	/*it('adds a new product to the cart', ()=>{

	});*/
});

//it(testname, function)