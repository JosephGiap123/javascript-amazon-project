import {formatCurrency} from "../scripts/utils/money.js";

describe('test suite: formatCurrency', ()=>{
	it('converts cents into dollars', ()=>{
		expect(formatCurrency(2095)).toEqual('20.95'); //just checks if format currecny 2095 = 20.95 read jasmine like english
	});
	it('works with 0', ()=>{
		expect(formatCurrency(0)).toEqual('0.00'); //just checks if format currecny 2095 = 20.95 read jasmine like english
	});
	it('rounds up', ()=>{
		expect(formatCurrency(2000.5)).toEqual('20.01'); //just checks if format currecny 2095 = 20.95 read jasmine like english
	});
});