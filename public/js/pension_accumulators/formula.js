function parseFloatCMG(number){
	if(number == "" || typeof number == 'underfined'){
		return 0;
	}else{
		return parseFloat(number);
	}
}

/* tab about you formula and value field */
function getYearToRetirement(){
	var ageRetire = $('#age-to-retirement').slider().slider('value');
	var currentAge = $("#txt-current-age").val();
	var year_to_retirement = ageRetire - currentAge;
	return parseInt(year_to_retirement);
}
function getTax_free_Percent(){
	var taxFreeCash = $('#percent-tax-free').slider().slider('value');
	var temp = taxFreeCash/100;
	temp =  parseFloat(temp);
	return temp;
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
	temp =  parseFloat(temp);
	return round(temp);
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
	return round(temp);
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
	var temp = growthRate[$("input:radio[name='an-grow-percent']:checked").val()];
	return parseFloatCMG(temp);
}

function getTax_Free_Value(){
	var retirementPot = parseFloatCMG(getRetirementPot());
	var taxFreePercent = getTax_free_Percent();
	var temp1 = parseFloatCMG(retirementPot*taxFreePercent);
	var temp2 = parseFloatCMG(LTA*(25/100));
	if(temp1 <= temp2){
		//console.log("temp1 :" + temp1)
		return round(temp1);
	}else{
		//console.log("temp2 :"  + temp2)
		return round(temp2);
	}
}
function yourRetirementDate(){
	var yearToRetirement = getYearToRetirement();
	var d = new Date();
	var year = d.getFullYear();
	var temp = parseInt(year) + parseInt(yearToRetirement);
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
	var f1 = (parseFloatCMG(cashContribute) + parseFloatCMG(cashContributeCompany))*12;
	//////console.log("f1 : " + parseFloat(f1));
	var m1 =  parseFloatCMG(interestOnPot)+1;
	var m2 = parseInt(yearToRetirement+1);
	var f2 = Math.pow(m1,m2);
	f2 = (f2 - 1)/parseFloatCMG(interestOnPot);
	var finalFormula = f1 * f2 - f1 + oneOffLumpsum + parseFloatCMG(current_compound) + parseFloatCMG(defer_compound);
	finalFormula = parseFloatCMG(finalFormula);
	////console.log("getRetirementPot " + round(finalFormula));
	return round(finalFormula);
}

function getPotMinus_taxFreeCash(){
	var retirementPot = parseFloatCMG(getRetirementPot());
	var taxFreeValue = parseFloatCMG(getTax_Free_Value());
	var f1 = retirementPot - taxFreeValue;
	f1 = parseFloatCMG(f1);
	return round(f1);
}

function getAnnuity_rate(){
	var gender = getGender();
	var retirementAge = $('#age-to-retirement').slider().slider('value');
	if(gender == male){
		var temp = annuityMale[retirementAge];
		temp = parseFloatCMG(temp);
		return round(temp);
	}else if(gender == female){
		var temp = annuityFemale[retirementAge];
		temp =  parseFloatCMG(temp);
		return round(temp);
	}
}

function getAnnuity_income(){
	var potMinus_taxFreeCash = getPotMinus_taxFreeCash();
	var annuity_rate = getAnnuity_rate();
	var temp = (potMinus_taxFreeCash/100000) * annuity_rate;
	temp = parseFloatCMG(temp);
	return round(temp);
}
function getFinalSalaryScheme(){
	var temp = parseFloatCMG($('#txt-income-payable').val());
	temp = round(temp);
	return parseFloatCMG(temp);
}

function getForecastIncome(){
	var annuity_income =  parseFloatCMG(getAnnuity_income());
	var salary_scheme = getFinalSalaryScheme();
	var temp = annuity_income + salary_scheme;
	temp = parseFloatCMG(temp);
	return round(temp);
}

function getForecast_percent_target(){
	var forecastIncome = getForecastIncome();
	var incomeYouWantTolive  = parseFloatCMG($('#txt-target-pensions-result').val());
	var temp = forecastIncome/incomeYouWantTolive;
	return parseFloatCMG(temp);
}

function getShortFall(){
	var forecastIncome = getForecastIncome();
	var incomeYouWantTolive  = parseFloatCMG($('#txt-target-pensions-result').val());
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
	console.log("coin blue " + coin);
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
