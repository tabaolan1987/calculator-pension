/*
----------------Information--------------------------------

1.Pension Accumulators UI JS

2.All function in this file manage the UI in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/


function drawMonthly(){
	var range = "5.00";
	for(var i = 2 ;i < 101;i++){
		var temp = i*5;
		temp = fixed2Decimal(temp);
		range = range +";" + temp;
	}
	range  = String(range);
	$('#monthlySavings').attr('selectBoxOptions',range);
	createEditableSelect(document.getElementById("monthlySavings"));
}

function drawSaving(){
	createEditableSelect(document.getElementById("durationTime"));
}


function showWarning(content){
//will show warning.
$('#warningModal').find('.modal-body').html(content);
$('#warningModal').modal('show');
}


