var LTA = 1250000;
var male = 1;
var female = 2;
/* tab about you formula and value field */
function getYearToRetirement(ageRetire, currentAge){
	var year_to_retirement = ageRetire - currentAge;
	return parseInt(year_to_retirement);
}
function getTax_free_Percent(taxfreecash){
	var temp = taxfreecash/100;
	return parseFloat(temp);
}
/*-----------------------------------------------------------------------------------*/

/* tab savings formula and value field */
function getDefer_compound(totalDeferFund,InterestOnPot,yearToRetirement){
	var temp = totalDeferFsund*(1 + InterestOnPot/1);
	temp = Math.pow(temp,yearToRetirement);
	return parseFloat(temp);
}

function getCurrent_compound(totalCurrentFund,InterestOnPot,yearToRetirement){
	var temp = totalCurrentFund*(1 + InterestOnPot/1);
	temp = Math.pow(temp,yearToRetirement);
	return parseFloat(temp);
}

function getCash_Contribute(percentPaying,currentSalary){
	var temp = (percentPaying*currentSalary)/12;
	return parseFloat(temp);
}

function getPercent_Contribute(cashPaying,currentSalary){
	var temp = (cashPaying/currentSalary)*12;
	return parseFloat(temp);
}

function getCash_Contribute_company(percentCompany,currentSalary){
	var temp = (percentCompany*currentSalary)/12;
	return parseFloat(temp);
}
function getPercent_Contribute_company(cashCompany,currentSalary){
	var temp = (cashCompany/currentSalary)*12;
	return parseFloat(temp);
}
/*-----------------------------------------------------------------------------------*/
/* tab results formula and value field */ 
function getRisk_selection(typeofFound){
	var temp = growthRate[typeofFound];
	return parseFloat(temp);
}

function getTax_Free_Value(retirementPot,taxFreePercent,LTA){
	var temp1 = parseFloat(retirementPot*taxFreePercent);
	var temp2 = parseFloat(LTA*(25/100));
	if(temp1 > temp2){
		return temp1;
	}else{
		return temp2;
	}
}
function retirementDate(yearToRetirement){
	var d = new Date();
	var year = d.getFullYear();
	var temp = parseInt(year) + parseInt(yearToRetirement);
	return temp;
}

function getInterestOnPot(risk_selection){
	var temp = risk_selection/100;
	return parseFloat(temp);
}

function getRetirementPot(cashContributeCompany,cashContribute,interestOnPot,
		yearToRetirement,oneOffLumpsum,defer_compound,current_compound){
	var temp1 = 12*(cashContribute + cashContributeCompany);
	var temp2 = (Math.pow((interestOnPot+1),(yearToRetirement+1)) -1)/interestOnPot;
	var temp3 =  12*(cashContribute + cashContributeCompany);
	var temp = temp1 * temp2 - temp3 + oneOffLumpsum + current_compound + defer_compound;
	return temp;
}

function getPotMinus_taxFreeCash(retirementPot,taxFreeValue){
	var temp = retirementPot - taxFreeValue;
	return parseFloat(temp);
}

function getAnnuity_rate(gender,retirementAge){
	if(gender == male){
		var temp = annuityMale[retirementAge];
		return temp;
	}else if(gender == female){
		var temp = annuityFemale[retirementAge];
		return temp;
	}
}

function getAnnuity_income(annuity_rate,potMinus_taxFreeCash){
	var temp = (potMinus_taxFreeCash/100000)*annuity_rate;
	return parseFloat(temp);
}

/*-----------------------------------------------------------------------------------*/

/* tab summary formula and value field */ 
function getForecastIncome(annuity_income,salary_scheme){
	var temp = annuity_income + salary_scheme;
	return parseFloat(temp);
}

function getForecast_percent_target(forecastIncome,targetPension){
	var temp = forecastIncome/targetPension;
	return parseFloat(temp);
}

function getShortFall(forecastIncome,targetPension){
	var temp  = targetPension - forecastIncome;
	return parseFloat(temp);
}


