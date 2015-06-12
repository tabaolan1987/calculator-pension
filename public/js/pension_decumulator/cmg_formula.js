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
function roundup(number){
	number = removeCommas(number);
	var temp = 0;
	if(parseInt(number) == number){
		temp = number;
	}else{
		temp =  parseInt(new Number(number).toFixed(0)) + 1;
	}
	
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
	return parseFloatCMG(fundValue);
}

function getTaxFreePercent(){
	var tax = $("#percent-tax-free").val();
	return tax;
}

function getAnnualIncome(){
	var annIn = $("#txt-target-pensions").val();
	return parseFloatCMG(annIn);
}

function getGrowthRate(){
	if($("input:radio[name=an-grow-percent]").is(":checked")){
		var growRate = $("input:radio[name=an-grow-percent]:checked").val();
		return growRate;
	}
	return 0;
}
function getManagementCharge(){
	var mnCharge = $("#slider-modal-growrate").val();
	return mnCharge;
}

function getInflationAdjust(){
	var gr = parseFloatCMG(getGrowthRate());
	var inFlat = growthRate[gr];
	return inFlat;
}


function getCurrentAge(){
	var dob = getDOB();
	var currentAge = new Date().getFullYear() - new Date(dob).getFullYear();
	return currentAge;
}

function getFundPot(){
	var fundValue = getFundValue();
	var taxFreePercent = getTaxFreePercent();
	var fundPot = parseFloatCMG(fundValue) * ((100-parseFloatCMG(taxFreePercent))/100);
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

function getPercentLTAwithPensionFound(fundValue){
	var temp = (LTA['value']/parseFloatCMG(fundValue))*100;
	return round(temp);
}

function getTotalRate(){
	var manageCharge = getManagementCharge();
	var inflattion = getInflationAdjust();
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

function getLifeExpectancy(){
	var currentAge = getCurrentAge();
	var gender = getGender();
	if(currentAge < 55){
		currentAge = 55;
	}
	if(gender == male){
		return roundup(onsMale[currentAge]);
	}else if(gender == female){
		return roundup(onsFemale[currentAge]);
	}
	return 0;
}


function getCoinBlue(yearMayLast,yearNeedLast){
	if(yearMayLast == yearNeedLast){
		return 25;
	}else if(yearMayLast > yearNeedLast){
		return 25;
	}else if(yearMayLast < yearNeedLast){
		var percent = (yearMayLast/yearNeedLast)*100;
		var shortFall = 100 - percent;
		if( shortFall < 21){
			return 20;
		}
		var coin = new Number(percent/4).toFixed(0);
		return coin;
	}
}

function getCoinGrey(yearMayLast,yearNeedLast){
	if(yearMayLast == yearNeedLast){
		return 25;
	}else if(yearNeedLast > yearMayLast){
		return 25;
	}else if(yearNeedLast < yearMayLast){
		var percent = (yearNeedLast/yearMayLast)*100;
		var different = 100 - percent;
		if( different < 4){
			return 24;
		}
		var coin = new Number(percent/4).toFixed(0);
		return coin;
	}
}

function getShortFallYear(yearMayLast,yearNeedLast){
	if(yearMayLast < yearNeedLast){
		var shortFallYear = yearNeedLast - yearMayLast;
		return shortFallYear;
	}
	return 0;
}






