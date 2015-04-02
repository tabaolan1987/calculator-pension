/*
----------------Information--------------------------------

1.Budget Formula JS

2.All function in this file manage the formula of budget in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/


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

function round(number) {
    var n = parseFloat(number);
    n =  Math.round(n);
	var newnumber = new Number(n).toFixed(0);
	return newnumber;
}

function calculateInputBaseOnType(data, type) {
    var output = 0;
    if (type == Weekly_Type) {
        var temp = (data * Weekly_multiplicand);
        output = round(temp);
    } else if (type == Fortnightly_Type) {
        var temp = (data * Fortnightly_multiplicand);
        output = round(temp);
    } else if (type == Monthly_Type) {
        output = Math.round(data);
    } else if (type == Yearly_Type) {
        var temp = data * Yearly_multiplicand;
        output = round(temp);
    }
    return output;
}

/*all function below calculate number for draw chart*/
var totalsArray = new Array();

function getTotalIncome() {
    var income = totalsArray['tab1'];
    return income;
}

function getTotalOutcome() {
    var totalOutcome = 0;
    for (var i = 2; i <= getSizeArray(); i++) {
        totalOutcome = totalOutcome + totalsArray['tab' + i];
    }
    return totalOutcome;
}

function getPersent(totalIncome, outcome) {
    var persent = (outcome / totalIncome) * 100;
    persent = round(persent);
	console.log(persent);
	if(persent < 1 & persent > 0){
		persent = 1;
	}
	console.log(persent);
    return persent;
}

function getSizeArray() {
    var size = $('.row-heading').size();
    return size;
}

function checkZero() {
/* check tab have a total zero then we will pop up notify*/
	var showPopUP = false;
	for(var i = 1; i <= getSizeArray(); i++){
		if(totalsArray['tab'+i] == null){
			showPopUp= true;
			return showPopUp;
		}
	}
	return showPopUP;
}

function checkTotalOutcome(){
	var totalIncome = getTotalIncome();
    var totalOutcome = getTotalOutcome();
	if(totalOutcome > totalIncome){
		$('#myModal2').modal('show');
	}
}

function drawFlotJs(){
	var data=[];
	var totalIncome = getTotalIncome();
    var totalOutcome = getTotalOutcome();

    if (totalIncome > totalOutcome) {
        var savings = totalIncome - totalOutcome;
		var tooltip = ImageArray[1] + "||" + tabName["tab1"] + ":£" + savings;
        data[0] = {
            label: tooltip,
            data: getPersent(totalIncome, savings),
            color: tabColor["tab1"]
        }
        var index_data = 1;
        for (var i = 2; i <= getSizeArray(); i++) {
			if(totalsArray["tab"+i] > 0){
				var tooltip = combineToToolTip(i);
				data[index_data] = {
                label: tooltip,
                data : getPersent(totalIncome, totalsArray["tab" + i]),
                color: tabColor["tab" + i]
				}
				index_data++;
			}
			
           
        }
		drawChart(data);
		$('.labelChart').html('<span class="total">Total monthly disposable income</span> <p>£' + savings +'</p>');
    } else if(totalIncome == totalOutcome){
        var index_data = 0;
        for (var i = 2; i <= getSizeArray(); i++) {
			if(totalsArray["tab"+i] > 0){
				var tooltip = combineToToolTip(i);
				data[index_data] = {
					label: tooltip,
					data : getPersent(totalIncome, totalsArray["tab" + i]),
					color: tabColor["tab" + i]
				}
			}
            index_data++;
        }
		drawChart(data);
		$('.labelChart').html('<span class="total">Total monthly disposable income</span> <p>£' + 0 + '</p>');
    }else if(totalIncome < totalOutcome){
		//case 1 : once of category outcome exceed income so we will draw chart for only this
		if(checkOutcomeExceedTotalIncome()){
			for (var i = 2; i <= getSizeArray(); i++) {
				var value = totalsArray['tab'+i];
				if(value >= totalIncome){
					var tooltip = combineToToolTip(i);
					data[0] = {
						label: tooltip,
						data : 100,
						color: tabColor["tab" + i]
					}
					break;
				}
			}
			drawChart(data);
			var exceed = totalOutcome - totalIncome;
			$('.labelChart').html('<span class="total">Total monthly disposable income</span> <p class="exceed">£ -' + exceed + '</p>');				
		}else{
			//case 2 : overlap
			data = getDataSpecialCase();
			var dataClock = [];
			var numberStart = data.length-1;
			for(var i = 0 ; i < data.length;i++){
				dataClock[numberStart] = data[i];
				numberStart--;
			}
			console.log(dataClock);
			drawChart(dataClock);
			var exceed = totalOutcome - totalIncome;
			$('.labelChart').html('<span class="total">Total monthly disposable income</span> <p class="exceed">£ -' + exceed + '</p>');					
		}
		
	}

}
function getDataSpecialCase(){
	var totalIncome = getTotalIncome();
	var currentPersent = 0;
	var index = 0;
	for(var i=2;i<=getSizeArray();i++){
		index = i;
		var per = getPersent(totalIncome, totalsArray["tab" + i]);
		currentPersent = currentPersent + parseInt(per);
		if(currentPersent > 100){
			break;
		}
	}
	var data =[];
	var number = 0;
	var totalPie = 100;
	for(var j=index;j > 1;j--){
		var per = parseInt(getPersent(totalIncome, totalsArray["tab" + j]));
		if(totalPie > per){
			var tooltip = combineToToolTip(j);
			data[number] = {
				label: tooltip,
				data : per,
				color : tabColor["tab" + j]
			}
			totalPie = totalPie - per;
			number++;
		}else if(totalPie == per){
			var tooltip = combineToToolTip(j);
			data[number] = {
				label: tooltip,
				data : per,
				color : tabColor["tab" + j]
			}
			return data;
		}else if(totalPie < per){
			var tooltip = combineToToolTip(j);
			data[number] = {
				label: tooltip,
				data : totalPie,
				color : tabColor["tab" + j]
			}
			return data;
		}
	}
	
}
function combineToToolTip(index){
	var tooltip = ImageArray[index] + "||" + tabName["tab"+index] + ":£" + totalsArray["tab"+index];
	return tooltip;
}
function checkOutcomeExceedTotalIncome(){
	 var totalIncome = totalsArray['tab1'];
	 for (var i = 2; i <= getSizeArray(); i++) {
		var value = totalsArray['tab'+i];
		if(value >= totalIncome){
			return true;
		}
	 }
	 return false;
	 
}
