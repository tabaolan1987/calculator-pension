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
    n =  Math.round(n * 100) / 100;
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
        output = data;
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
    return persent;
}

function getSizeArray() {
    var size = $('.row-heading').size();
    return size;
}

function checkZero() {
/* check tab have a total zero then we will popup notifi*/
	var showPopUP = false;
	for(var i = 1; i <= getSizeArray(); i++){
		if(totalsArray['tab'+i]==0){
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
		var tooltip = tabName["tab1"] + ":" +totalsArray["tab1"];
        data[0] = {
            label: ImageArray[1],
            data: getPersent(totalIncome, savings),
            color: tabColor["tab1"],
			name : tooltip
        }
        var index_data = 1;
        for (var i = 2; i <= getSizeArray(); i++) {
			var tooltip = tabName["tab"+i] + ":" + totalsArray["tab"+i];
            data[index_data] = {
                label: ImageArray[i],
                data : getPersent(totalIncome, totalsArray["tab" + i]),
                color: tabColor["tab" + i],
				name : tooltip
            }
            index_data++;
        }
		drawChart(data);
		$('.labelChart').html('<span class="total">Total monthly disposable income</span> <p>£' + savings +'</p>');
    } else if(totalIncome == totalOutcome){
        var index_data = 0;
        for (var i = 2; i <= getSizeArray(); i++) {
			var tooltip = tabName["tab"+i] + ":" + totalsArray["tab"+i];
            data[index_data] = {
                label: ImageArray[i],
                data : getPersent(totalIncome, totalsArray["tab" + i]),
                color: tabColor["tab" + i],
				name : tooltip
            }
            index_data++;
        }
		drawChart(data);
		$('.labelChart').html('Total monthly disposable income <p>£' + 0 + '</p>');
    }else{
	
	}

}

