/* tab about you formula and value field */
function getYearToRetirement(){
	var ageRitire = $('#age-to-retirement').slider().slider('value');
	var currentAge = $("#txt-current-age").val();
	var year_to_retirement = ageRetire - currentAge;
	return parseInt(year_to_retirement);
}
function getTax_free_Percent(){
	var taxFreeCash = $('#percent-tax-free').slider().slider('value');
	var temp = taxfreecash/100;
	return parseFloat(temp);
}
/*-----------------------------------------------------------------------------------*/

/* tab savings formula and value field */
function getDefer_compound(){
	var totalDeferFund = parseFloat($('#txt-deffered-pensions').val());
	var interRestOnPot = getInterestOnPot();
	var yearToRitirement = getYearToRetirement();
	var temp = totalDeferFund*(1 + interRestOnPot/1);
	temp = Math.pow(temp,yearToRetirement);
	return parseFloat(temp);
}

function getCurrent_compound(){
	var totalCurrentFund = parseFloat($('#txt-current-pensions').val());
	var interRestOnPot = getInterestOnPot();
	var yearToRitirement = getYearToRetirement();
	var temp = totalCurrentFund*(1 + InterestOnPot/1);
	temp = Math.pow(temp,yearToRetirement);
	return parseFloat(temp);
}

function getCash_Contribute(){
	var currentSalary = parseFloat($('#txt-current-salary').val());
	var percentPaying = parseFloat($('#txt-you-paying-percent').val());
	var temp = (percentPaying*currentSalary)/12;
	return parseFloat(temp);
}

function getPercent_Contribute(){
	var currentSalary = parseFloat($('#txt-current-salary').val());
	var cashPaying = parseFloat($('#txt-you-paying').val());
	var temp = (cashPaying/currentSalary)*12;
	return parseFloat(temp);
}

function getCash_Contribute_company(){
	var currentSalary = parseFloat($('#txt-current-salary').val());
	var percentCompany = parseFloat($('#txt-your-employer-percent').val());
	var temp = (percentCompany*currentSalary)/12;
	return parseFloat(temp);
}
function getPercent_Contribute_company(cashCompany,currentSalary){
	var currentSalary = parseFloat($('#txt-current-salary').val());
	var cashCompany = parseFloat($('#txt-your-employer').val());
	var temp = (cashCompany/currentSalary)*12;
	return parseFloat(temp);
}
/*-----------------------------------------------------------------------------------*/
/* tab results formula and value field */ 
function getRisk_selection(){
	var typeOfFound = $("input:radio[name=]:checked").val();
	var temp = growthRate[typeofFound];
	return parseFloat(temp);
}

function getTax_Free_Value(){
	var retirementPot = getRetirementPot();
	var taxFreePercent = getTax_free_Percent();
	var temp1 = parseFloat(retirementPot*taxFreePercent);
	var temp2 = parseFloat(LTA*(25/100));
	if(temp1 > temp2){
		return temp1;
	}else{
		return temp2;
	}
}
function yourRetirementDate(){
	var yearToRetirement = getYearToRetirement();
	var d = new Date();
	var year = d.getFullYear();
	var temp = parseInt(year) + parseInt(yearToRetirement);
	return temp;
}

function getInterestOnPot(){
	var temp = getRisk_selection()/100;
	return parseFloat(temp);
}

function getRetirementPot(){
	var defer_compound = getDefer_compound();
	var current_compound = getCurrent_compound();
	var cashContribute = getCash_Contribute();
	var cashContributeCompany = getCash_Contribute_company();
	var yearToRetirement = getYearToRetirement();
	var interestOnPot = getInterestOnPot();
	var oneOffLumpsum = $('#oneOffLumpSum').val();
	var f1 = 12*(cashContribute + cashContributeCompany);
	var f2 = (Math.pow((interestOnPot+1),(yearToRetirement+1)) -1)/interestOnPot;
	var f3 =  12*(cashContribute + cashContributeCompany);
	var finalFormula = f1 * f2 - f3 + oneOffLumpsum + current_compound + defer_compound;
	return finalFormula;
}

function getPotMinus_taxFreeCash(){
	var retirementPot = getRetirementPot();
	var taxFreeValue = getTax_Free_Value();
	var f1 = retirementPot - taxFreeValue;
	return parseFloat(f1);
}

function getAnnuity_rate(){
	var gender = getGender();
	var retirementAge = $('#age-to-retirement').slider().slider('value');
	if(gender == male){
		var temp = annuityMale[retirementAge];
		return temp;
	}else if(gender == female){
		var temp = annuityFemale[retirementAge];
		return temp;
	}
}

function getAnnuity_income(){
	var potMinus_taxFreeCash = getPotMinus_taxFreeCash();
	annuity_rate = getAnnuity_rate();
	var temp = (potMinus_taxFreeCash/100000) * annuity_rate;
	return parseFloat(temp);
}
function getFinalSalaryScheme(){
	var temp = parseFloat($('#txt-income-payable').val());
	return temp;
}

function getForecastIncome(){
	var annuity_income =  getAnnuity_income();
	var salary_scheme = getFinalSalaryScheme();
	var temp = annuity_income + salary_scheme;
	return parseFloat(temp);
}

function getForecast_percent_target(){
	var forecastIncome = getForecastIncome();
	var incomeYouWantTolive  = parseFloat($('#income-you-want').val());
	var temp = forecastIncome/targetPension;
	return parseFloat(temp);
}

function getShortFall(){
	var forecastIncome = getForecastIncome();
	var incomeYouWantTolive  = parseFloat($('#income-you-want').val());
	var temp  = incomeYouWantTolive - forecastIncome;
	return parseFloat(temp);
}

/*-----------------------------------------------------------------------------------*/

/* tab summary formula and value field */ 


function getCoinBlue(forecastIncome,targetPension){
	var percent = (forecastIncome/targetPension)*100;
	var coin = round(percent);
	coin = coin/coinPercent;
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

