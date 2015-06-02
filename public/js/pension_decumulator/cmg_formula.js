function parseFloatCMG(number){
	if(number == "" || typeof number == 'underfined'){
		return 0;
	}else{
		return removeCommas(number);
	}
}

function addCommas(number){
	number = removeCommas(number);
	var temp = 0;
	if(parseInt(number) == number){
		temp = accounting.formatNumber(number);
	}else{
		var length = decimalPlaces(number);
		temp = accounting.formatNumber(number,length,",",".");
	}
	
	return temp;
}

function decimalPlaces(num) {
  var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
}

function removeCommas(number){
	var temp  = accounting.unformat(number);
	return temp;
}

function round(number) {
    var n = parseFloat(number);
    n =  Math.round(n);
	var newnumber = new Number(n).toFixed(0);
	return newnumber;
}
function fixed(number){
	var newnumber = new Number(number).toFixed(1);
	return newnumber;
}

function fixed3Decimal(number){
	var newnumber = new Number(number).toFixed(3);
	return newnumber;
}
