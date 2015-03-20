/*Type of each calculate user input*/
var Weekly_Type = 1;
var Fortnightly_Type = 2;
var Monthly_Type = 3;
var Yearly_Type = 4;
/*-----end-------------------------------*/

/* number multiplicand base on type */
var Weekly_multiplicand = 4.333333333;
var Fortnightly_multiplicand = 2.166666667;
var Monthly_multiplicand = 1;
var Yearly_multiplicand = 0.08333333333;
/*-----end-------------------------------*/

function round(number){
	var n = parseFloat(number); 
	return Math.round(n * 100)/100; 
}

function calculateInputBaseOnType(data,type){
	var output = 0;
	if(type == Weekly_Type){
		var temp = (data * Weekly_multiplicand);
		output = round(temp);
	}else if(type == Fortnightly_Type){
		var temp = (data * Fortnightly_multiplicand);
		output = round(temp);
	}else if(type == Monthly_Type){
		output = data;
	}else if(type == Yearly_Type){
		var temp = data*Yearly_multiplicand;
		output = round(temp);
	}
	return output;
}

/*all function below calculate number for draw chart*/
 var totalsArray = new Array();
 
 function getTotalIncome(){
	var income = totalsArray['tab1'];
	return income;
 }
 
 function getTotalOutcome(){
	var totalOutcome = 0;
	for(var i = 2;i <= getSizeArray(); i++){
		totalOutcome = totalOutcome + totalsArray['tab'+i];
	}
	return totalOutcome;
 }
 
 function getPersent(totalIncome,outcome){
	var persent = (outcome/totalIncome)*100;
	persent = round(persent);
	return persent;
 }
function getSizeArray(){
	var size = $('.row-heading').size();
	return size;
}