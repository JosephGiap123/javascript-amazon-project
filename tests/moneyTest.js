import {formatCurrency} from "../scripts/utils/money.js";

console.log('test suite: formatCurrency');
//all tests together = test suite
console.log('converts cents into dollars');
if(formatCurrency(2095) === '20.95'){
	console.log('passed');
}
else{
	console.log('failed');
}

console.log('works with 0');
if(formatCurrency(0) === '0.00'){
	console.log('passed')
}
else{
	console.log('failed');
}

console.log('works with rounding up');
if(formatCurrency(2000.5) === '20.01'){
	console.log('passed')
}
else{
	console.log('test 2 failed');
}

console.log('works with rounding down');
if(formatCurrency(2000.3) === '20.00'){
	console.log('passed')
}
else{
	console.log('failed');
}