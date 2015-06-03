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

function getDOB(){
	var dob = $("#txt-birthday").val();
	return dob;
}
function getGender(){
	if($("input:radio[name=optradio]").is(":checked")){
		var gender = $("input:radio[name=optradio]:checked").val();
		return gender;
	}
	return 0;
}

function getFundValue(){
	var fundValue = $("#txt-current-salary").val();
	return fundValue;
}

function getTaxFreeCashPercent(){
	var tax = $("#percent-tax-free").slider().slider("value");
	return tax;
}

function getAnnualIncome(){
	var annIn = $("#txt-target-pensions").val();
	return annIn;
}

function getGrowthRate(){
	if($("input:radio[name=an-grow-percent]").is(":checked")){
		var growRate = $("input:radio[name=an-grow-percent]:checked").val();
		return growRate;
	}
	return 0;
}
function getManagementCharge(){
	var mnCharge = $("#slider-modal-growrate").slider().slider("value");
	return mnCharge;
}

function getInflationAdjust(growthRate){
	var inFlat = growthRate[growthRate];
	return inFlat;
}


function getCurrentAge(dob){
	var currentAge = new Date().getFullYear() - new Date(dob).getFullYear;
	return currentAge;
}

function getFundPot(fundValue,taxFreeCash){
	var fundPot = parseFloatCMG(fundValue) * ((100-parseFloatCMG(taxFreeCash))/100);
	return fundPot;
}

function getTaxFreeCash(taxFreeCashPercent, fundValue){
	var temp = parseFloatCMG(fundValue) * (parseFloatCMG(taxFreeCashPercent)/100);
	if(parseFloatCMG(temp) < LTA['value']){
		isReturnLTA = false;
		return temp;
	}else{
		isReturnLTA = true;
		return LTA['value'];
	}
}

function getTotalRate(inflattion, manageCharge){
	var totalRate = (parseFloatCMG(inflattion) - parseFloatCMG(manageCharge))/100;
	return totalRate;
}


function decumulatorYears(fundPot, totalRate, annualIncome){
	var deYear = 0;
	for (var i = 1 ; i < 76;i++){
		fundPot = (fundPot + (fundPot*totalRate)) - annualIncome;
		deYear = deYear+1;
		if(fundPot < annualIncome){
			return deYear;
		}
	}
	return deYear;
}

function getLifeExpectancy(currentAge,gender){
	if(currentAge < 55){
		currentAge = 55;
	}
	if(gender == male){
		return onsMale[currentAge]
	}else if(gender == female){
		return onsFemale[currentAge]
	}
	return 0;
}









