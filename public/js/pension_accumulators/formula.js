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
	var totalDeferFund = parseFloat($('#txt-deffered-pensions').val());
	var interRestOnPot = getInterestOnPot();
	var yearToRetirement = getYearToRetirement();
	var temp = totalDeferFund * Math.pow((1 + interRestOnPot/1),yearToRetirement);
	temp =  parseFloat(temp);
	return round(temp);
}
function getCurrent_compound(){
	var totalCurrentFund = parseFloat($('#txt-current-pensions').val());
	console.log(totalCurrentFund);
	var interRestOnPot = getInterestOnPot();
	var yearToRetirement = getYearToRetirement();
	var temp = totalCurrentFund * Math.pow((1 + interRestOnPot/1),yearToRetirement);
	temp =  parseFloat(temp);
	return round(temp);
}

function getCash_Contribute(){
	var currentSalary = parseFloat($('#txt-current-salary').val());
	console.log("currentSalary " + currentSalary);
	var percentPaying = parseFloat($('#txt-you-paying-percent').val());
	console.log("percentPaying " + percentPaying);
	var temp = ((percentPaying*currentSalary)/12)/100;
	console.log("cash  " + temp);
	temp =  parseFloat(temp);
	return round(temp);
}

function getPercent_Contribute(){
	var currentSalary = parseFloat($('#txt-current-salary').val());
	var cashPaying = parseFloat($('#txt-you-paying').val());
	var temp = (cashPaying/currentSalary)*12;
	temp = parseFloat(temp);
	return temp;
}

function getCash_Contribute_company(){
	var currentSalary = parseFloat($('#txt-current-salary').val());
	var percentCompany = parseFloat($('#txt-your-employer-percent').val());
	var temp = ((percentCompany*currentSalary)/12)/100;
	temp =  parseFloat(temp);
	return round(temp);
}
function getPercent_Contribute_company(){
	var currentSalary = parseFloat($('#txt-current-salary').val());
	var cashCompany = parseFloat($('#txt-your-employer').val());
	var temp = (cashCompany/currentSalary)*12;
	temp =  parseFloat(temp);
	return temp;
}
/*-----------------------------------------------------------------------------------*/
/* tab results formula and value field */ 
function getRisk_selection(){
	var temp = growthRate[$("input:radio[name='an-grow-percent']:checked").val()];
	return parseFloat(temp);
}

function getTax_Free_Value(){
	var retirementPot = parseFloat(getRetirementPot());
	var taxFreePercent = getTax_free_Percent();
	var temp1 = parseFloat(retirementPot*taxFreePercent);
	var temp2 = parseFloat(LTA*(25/100));
	console.log("temp1 : " + temp1 + " temp2 :"  + temp2)
	if(temp1 <= temp2){
		console.log("temp1 :" + temp1)
		return round(temp1);
	}else{
		console.log("temp2 :"  + temp2)
		return round(temp2);
	}
}
function yourRetirementDate(){
	var yearToRetirement = getYearToRetirement();
	var d = new Date();
	var year = d.getFullYear();
	var temp = parseInt(year) + parseInt(yearToRetirement);
	temp = parseFloat(temp);
	return round(temp);
}

function getInterestOnPot(){
	var temp = getRisk_selection()/100;
	temp = parseFloat(temp);
	return temp;
}

function getRetirementPot(){
	console.log("---------------------------");
	var defer_compound = getDefer_compound();
	console.log("defer_compound " +defer_compound);
	var current_compound = getCurrent_compound();
	console.log("current_compound " + current_compound);
	var cashContribute = getCash_Contribute();
	console.log("cashContribute " + cashContribute);
	var cashContributeCompany = getCash_Contribute_company();
	console.log("cashContributeCompany  : " + cashContributeCompany);
	var yearToRetirement = getYearToRetirement();
	console.log("yearToRetirement : " + yearToRetirement);
	var interestOnPot = getInterestOnPot();
	console.log("interestOnPot : " + interestOnPot);
	var oneOffLumpsum = parseFloat($('#oneOffLumpSum').val());
	console.log("oneOffLumpsum : " + oneOffLumpsum);
	var f1 = (parseFloat(cashContribute) + parseFloat(cashContributeCompany))*12;
	console.log("f1 : " + parseFloat(f1));
	var m1 =  parseFloat(interestOnPot)+1;
	var m2 = parseInt(yearToRetirement+1);
	var f2 = Math.pow(m1,m2);
	f2 = (f2 - 1)/parseFloat(interestOnPot);
	var finalFormula = f1 * f2 - f1 + oneOffLumpsum + parseFloat(current_compound) + parseFloat(defer_compound);
	finalFormula = parseFloat(finalFormula);
	console.log("getRetirementPot " + round(finalFormula));
	return round(finalFormula);
}

function getPotMinus_taxFreeCash(){
	var retirementPot = parseFloat(getRetirementPot());
	var taxFreeValue = parseFloat(getTax_Free_Value());
	var f1 = retirementPot - taxFreeValue;
	f1 = parseFloat(f1);
	return round(f1);
}

function getAnnuity_rate(){
	var gender = getGender();
	var retirementAge = $('#age-to-retirement').slider().slider('value');
	if(gender == male){
		var temp = annuityMale[retirementAge];
		temp = parseFloat(temp);
		return round(temp);
	}else if(gender == female){
		var temp = annuityFemale[retirementAge];
		temp =  parseFloat(temp);
		return round(temp);
	}
}

function getAnnuity_income(){
	var potMinus_taxFreeCash = getPotMinus_taxFreeCash();
	var annuity_rate = getAnnuity_rate();
	var temp = (potMinus_taxFreeCash/100000) * annuity_rate;
	temp = parseFloat(temp);
	return round(temp);
}
function getFinalSalaryScheme(){
	var temp = parseFloat($('#txt-income-payable').val());
	temp = round(temp);
	return parseFloat(temp);
}

function getForecastIncome(){
	var annuity_income =  parseFloat(getAnnuity_income());
	var salary_scheme = getFinalSalaryScheme();
	var temp = annuity_income + salary_scheme;
	temp = parseFloat(temp);
	console.log('getForecastIncome : ' + temp);
	return round(temp);
}

function getForecast_percent_target(){
	var forecastIncome = getForecastIncome();
	var incomeYouWantTolive  = parseFloat($('#txt-target-pensions-result').val());
	var temp = forecastIncome/incomeYouWantTolive;
	return parseFloat(temp);
}

function getShortFall(){
	var forecastIncome = getForecastIncome();
	var incomeYouWantTolive  = parseFloat($('#txt-target-pensions-result').val());
	var temp  = incomeYouWantTolive - forecastIncome;
	return parseFloat(temp);
}

/*-----------------------------------------------------------------------------------*/

/* tab summary formula and value field */ 


function getCoinBlue(forecastIncome,targetPension){
	var percent = (forecastIncome/targetPension)*100;
	console.log(percent);
	var coin = round(percent);
	coin = coin/coinPercent;
	console.log(coin);
	return round(coin);
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

