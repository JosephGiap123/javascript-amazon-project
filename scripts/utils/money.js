export function formatCurrency(priceCents){
	return (Math.round(priceCents)/100).toFixed(2);
}

//toFixed will not round numbers properly sometimes. use math.round to stop fixed having to round.

export default formatCurrency;