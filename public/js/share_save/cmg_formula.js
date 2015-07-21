/*
----------------Information--------------------------------

1.Pension Accumulators formula JS

2.All function in this file manage the formula of user in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/
var currentOptionPrice = 0;
var currentEstimateShare = 0;

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

function addCommasPence(number){
	number = removeCommas(number);
	var temp = 0;
	if(parseInt(number) == number){
		temp = accounting.formatNumber(number,2,",",".");
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


function fixed2Decimal(number){
	var newnumber = new Number(number).toFixed(2);
	return newnumber;
}

function removeCommas(number){
	var temp  = accounting.unformat(number);
	return temp;
}

function getOptionPrice(){
	return currentOptionPrice;
}

function getCurrentEstimateShare(){
	return currentEstimateShare;
}

function getMonthlySaving(){
	var temp = $('#monthlySavings').val();
	return parseFloatCMG(temp);
}

function getDurationSaving(){
	var temp = $('#durationTime').val();
	return parseFloatCMG(temp);
}


function getAmountSaved(MonthlySaving, DurationSaving){
	var temp = MonthlySaving * (DurationSaving*12);
	return parseFloatCMG(temp);
}

function getNumberOption(AmountSaved,OptionPrice){
	var temp = AmountSaved/OptionPrice*100;
	return round(temp);
}

function getOptionValueIfSold(NumberOption,EstimatedShare){
	var temp = NumberOption * EstimatedShare/100;
	return parseFloatCMG(temp);
}

function getEstimateProfit(OptVlSold, AmountSaved){
	var temp = OptVlSold - AmountSaved;
	return parseFloatCMG(temp);
}

function getPercentIncrease(OptVlSold,AmountSaved){
	var temp = (OptVlSold/AmountSaved) - 1;
	temp = temp *100;
	return round(temp);
}