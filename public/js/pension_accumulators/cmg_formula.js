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
/* tab about you formula and value field */
function getYearToRetirement(){
	var ageRetire = $('#age-to-retirement').val();
	var currentAge = parseFloatCMG($("#txt-current-age").val());
	var year_to_retirement = ageRetire - currentAge;
	return parseFloatCMG(year_to_retirement);
}
function getTax_free_Percent(){
	//var taxFreeCash = $('#percent-tax-free').val();
	//var temp = taxFreeCash/100;
	//temp =  parseFloatCMG(temp);
	//return temp;
	return currentTaxPercent;
}
/*-----------------------------------------------------------------------------------*/

/* tab savings formula and value field */
function getDefer_compound(){
	var totalDeferFund = $('#txt-deffered-pensions').val();
	if(totalDeferFund == "" || totalDeferFund == 'underfined'){
		totalDeferFund = 0;
	}
	totalDeferFund = parseFloatCMG(totalDeferFund);
	var interRestOnPot = getInterestOnPot();
	var yearToRetirement = getYearToRetirement();
	var temp = totalDeferFund * Math.pow((1 + interRestOnPot/1),yearToRetirement);
	temp =  parseFloatCMG(temp);
	return temp.toFixed(10);
}
function getCurrent_compound(){
	var totalCurrentFund = $('#txt-current-pensions').val();
	if(totalCurrentFund == "" || typeof totalCurrentFund == "undefined"){
		totalCurrentFund = 0;
	}
	totalCurrentFund = parseFloatCMG($('#txt-current-pensions').val());
	var interRestOnPot = getInterestOnPot();
	var yearToRetirement = getYearToRetirement();
	var temp = totalCurrentFund * Math.pow((1 + interRestOnPot/1),yearToRetirement);
	temp =  parseFloatCMG(temp);
	return temp.toFixed(10);
}

function getCash_Contribute(){
	var currentSalary = parseFloatCMG($('#txt-current-salary').val());
	var percentPaying = parseFloatCMG($('#txt-you-paying-percent').val());
	var temp = ((percentPaying*currentSalary)/12)/100;
	temp =  parseFloatCMG(temp);
	return temp;
}

function getPercent_Contribute(){
	var currentSalary = parseFloatCMG($('#txt-current-salary').val());
	var cashPaying = parseFloatCMG($('#txt-you-paying').val());
	var temp = (cashPaying/currentSalary)*12;
	temp = parseFloatCMG(temp);
	return temp;
}

function getCash_Contribute_company(){
	var currentSalary = parseFloatCMG($('#txt-current-salary').val());
	var percentCompany = parseFloatCMG($('#txt-your-employer-percent').val());
	var temp = ((percentCompany*currentSalary)/12)/100;
	temp =  parseFloatCMG(temp);
	return temp;
}
function getPercent_Contribute_company(){
	var currentSalary = parseFloatCMG($('#txt-current-salary').val());
	var cashCompany = parseFloatCMG($('#txt-your-employer').val());
	var temp = (cashCompany/currentSalary)*12;
	temp =  parseFloatCMG(temp);
	return temp;
}
/*-----------------------------------------------------------------------------------*/
/* tab results formula and value field */ 
function getRisk_selection(){
	var deduct_inflation_rate = growthRate[$("input:radio[name='an-grow-percent']:checked").val()];
	var annual_charge = parseFloatCMG($('#slider-modal-growrate').val());
	var riskSelection = deduct_inflation_rate - annual_charge;
	return parseFloatCMG(riskSelection);
}

function getTax_Free_Value(){
	var retirementPot = parseFloatCMG(getRetirementPot());
	var taxFreePercent = getTax_free_Percent();
	var temp1 = parseFloatCMG(retirementPot*taxFreePercent);
	var ltaValue = parseFloatCMG(LTA['value']);
	if(temp1 < ltaValue){
		isReturnLTA = false;
		return temp1;
	}else{
		isReturnLTA = true;
		//var percentLta = getPercentLtaWithPensionFound()/100;
		//var newVlue = parseFloatCMG(retirementPot*percentLta);
		//return newVlue;
		currentTaxPercent = getPercentLtaWithPensionFound()/100;
		return ltaValue;
	}
}

function getPensionFound(){
	var retirementPot = parseFloatCMG(getRetirementPot());
	var taxFreePercent = getTax_free_Percent();
	var temp1 = parseFloatCMG(retirementPot*taxFreePercent);
	var temp2 = parseFloatCMG(retirementPot * (1 - taxFreePercent));
	var pensionFound = temp1+ temp2;
	return parseFloatCMG(pensionFound);
}

function getPercentLtaWithPensionFound(){
	var pensionFound = parseFloatCMG(getPensionFound());
	var ltaValue = parseFloatCMG(LTA['value']);
	var percent = (ltaValue/pensionFound)*100;
	if(percent < 1){
		percent = 1;
	}
	return percent;
	//return parseInt(percent);
	//return round(percent);
}

function yourRetirementDate(){
	var yearToRetirement = getYearToRetirement();
	var d = new Date();
	var year = d.getFullYear();
	var temp = parseFloatCMG(year) + parseFloatCMG(yearToRetirement);
	temp = parseFloatCMG(temp);
	return round(temp);
}

function getInterestOnPot(){
	var temp = getRisk_selection()/100;
	temp = parseFloatCMG(temp);
	return temp;
}

function getRetirementPot(){
	////console.log("---------------------------");
	var defer_compound = getDefer_compound();
	////console.log("defer_compound " +defer_compound);
	var current_compound = getCurrent_compound();
	////console.log("current_compound " + current_compound);
	var cashContribute = getCash_Contribute();
	////console.log("cashContribute " + cashContribute);
	var cashContributeCompany = getCash_Contribute_company();
	////console.log("cashContributeCompany  : " + cashContributeCompany);
	var yearToRetirement = getYearToRetirement();
	////console.log("yearToRetirement : " + yearToRetirement);
	var interestOnPot = getInterestOnPot();
	////console.log("interestOnPot : " + interestOnPot);
	var oneOffLumpsum = parseFloatCMG($('#oneOffLumpSum').val());
	////console.log("oneOffLumpsum : " + oneOffLumpsum);
	var finalFormula;
	if(interestOnPot == 0){
		finalFormula = parseFloatCMG(defer_compound) + parseFloatCMG(current_compound)
		+ ((yearToRetirement*12)*parseFloatCMG(cashContribute)) 
		+ ((yearToRetirement*12)*parseFloatCMG(cashContributeCompany)) 
		+ parseFloatCMG(oneOffLumpsum);
	}else{
		var f1 = (parseFloatCMG(cashContribute) + parseFloatCMG(cashContributeCompany))*12;
		//////console.log("f1 : " + parseFloat(f1));
		var m1 =  parseFloatCMG(interestOnPot)+1;
		var m2 = parseInt(yearToRetirement+1);
		var f2 = Math.pow(m1,m2);
		f2 = (f2 - 1)/parseFloatCMG(interestOnPot);
		f2 = f2.toFixed(10);
		var f3 = f1*f2;
		f3 = f3.toFixed(10);
		finalFormula = f3 - f1 + oneOffLumpsum + parseFloatCMG(current_compound) + parseFloatCMG(defer_compound);;
		finalFormula = parseFloatCMG(finalFormula);
		////console.log("getRetirementPot " + round(finalFormula));
	}
	return finalFormula;
	
}

function getPotMinus_taxFreeCash(taxFree){
	var retirementPot = parseFloatCMG(getRetirementPot());
	//var taxFreeValue = parseFloatCMG(getTax_Free_Value());
	var f1 = retirementPot - taxFree;
	f1 = parseFloatCMG(f1);
	return f1;
}

function getAnnuity_rate(){
	var gender = getGender();
	var retirementAge = $('#age-to-retirement').val();
	if(gender == male){
		var temp = annuityMale[retirementAge];
		temp = parseFloatCMG(temp);
		return temp;
	}else if(gender == female){
		var temp = annuityFemale[retirementAge];
		temp =  parseFloatCMG(temp);
		return temp;
	}
}

function getAnnuity_income(taxFree){
	var potMinus_taxFreeCash = getPotMinus_taxFreeCash(taxFree);
	var annuity_rate = getAnnuity_rate();
	var temp = (potMinus_taxFreeCash/10000) * annuity_rate;
	temp = parseFloatCMG(temp);
	return temp;
}
function getFinalSalaryScheme(){
	var temp = parseFloatCMG($('#txt-income-payable').val());
	temp = round(temp);
	return parseFloatCMG(temp);
}

function getForecastIncome(taxFree){
	var annuity_income =  parseFloatCMG(getAnnuity_income(taxFree));
	var salary_scheme = getFinalSalaryScheme();
	var temp = annuity_income + salary_scheme;
	temp = parseFloatCMG(temp);
	return round(temp);
}

function getForecast_percent_target(forecastIncome){
	var incomeYouWantTolive  = parseFloatCMG($('#txt-target-pensions-result').val());
	var temp = forecastIncome/incomeYouWantTolive;
	return parseFloatCMG(temp);
}

function getShortFall(forecastIncome){
	//var forecastIncome = parseFloatCMG(getForecastIncome());
	var incomeYouWantTolive  = parseFloatCMG($('#txt-target-pensions').val());
	var temp  = incomeYouWantTolive - forecastIncome;
	return parseFloatCMG(temp);
}

/*-----------------------------------------------------------------------------------*/

/* tab summary formula and value field */ 


function getCoinBlue(forecastIncome,targetPension){
	
	if(parseFloatCMG(forecastIncome) >= parseFloatCMG(targetPension) ){
		coin = totalCoin;
	}else{
		var percent = (forecastIncome/targetPension)*100;
		var coin = round(percent);
		coin = coin/coinPercent;
	}
	coin = parseInt(coin);
	if(coin == 0){
		coin = 1;
	}
	
	return coin;
}

function getCoinRed(coinBlue){
	if(coinBlue >= totalCoin){
		return 0;
	}
	var coinRed = totalCoin - coinBlue;
	return coinRed;
	
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
