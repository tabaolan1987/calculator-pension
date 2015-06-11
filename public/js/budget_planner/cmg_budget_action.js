/*
----------------Information--------------------------------

1.Budget Action JS

2.All function in this file manage the action of user in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/
$.fn.hasScrollBar = function() {
    return this.get(0).scrollHeight > this.height();
}
var isCallHide = false;
/* there functions below for register function of  tab */
function registerFunctionsForTab() {
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var imgActive = $($(e.target).find('td.tenPersent:eq(1) img'));
    imgActive.attr('src', 'images/budget_planner/arrow_open.png');
    var imgInActive = $($(e.relatedTarget).find('td.tenPersent:eq(1) img'));
    imgInActive.attr('src', 'images/budget_planner/arrow_close.png');
	updateTotalZeroValueWhenCloseTab($(e.relatedTarget));
	if(chartExist){
		eneableCalculateBtn();
	}
	
});

$('button[data-target="#calculate"]').click(function() {
	var preTab = $('li.active a');
	updateTotalZeroValueWhenCloseTab(preTab);
    var warning = checkZero();
    if (warning) {
        $('#myModal').modal('show');
        return false;
    }
});

$('button[data-target="#calculate"]').on('shown.bs.tab', function(e) {
    checkTotalOutcome();
    $(e.relatedTarget).find('td.tenPersent:eq(1) img').attr('src', 'images/budget_planner/arrow_close.png');
    $("div.panel-heading").find("td.tenPersent:eq(1) img").attr('src', 'images/budget_planner/arrow_up.png');
    var idPrev = $(e.relatedTarget).attr('id');
    $('.panel-default .panel-heading #' + idPrev).closest('.panel-heading').closest('.panel-default').find('.panel-collapse').collapse('hide');
    drawFlotJs();
    $('.panel-default div#collapse-calculate').collapse('show');
	
});

}
/*--------------------------END--------------------------*/

/* there functions below for register function of  panel */
function registerFunctionsForPanel(){

$('div.panel-collapse').on('shown.bs.collapse', function() {
	//update image to active panel
    var id = $(this).attr('id');
    $("div.panel-heading").find("a[href='#" + id + "']").find("td.tenPersent:eq(1) img").attr('src', 'images/budget_planner/arrow_down.png');
	if(chartExist){
		if (fakewaffle.currentPosition == "panel" & id!='collapse-calculate') {
			var v = $('#collapse-calculate').is(':visible');
			if(v){
				$('#collapse-calculate').collapse('hide');
			}
			isCallHide = false;
			eneableCalculateBtn();
		}
		
	}
});

$('div.panel-collapse').on('hidden.bs.collapse', function() {
	//update image to inactive panel
    var id = $(this).attr('id');
	var $a = $("div.panel-heading").find("a[href='#" + id + "']");
	if(isCallHide ==false){
		updateTotalZeroValueWhenCloseTab($a);
	}
	
    $("div.panel-heading").find("a[href='#" + id + "']").find("td.tenPersent:eq(1) img").attr('src', 'images/budget_planner/arrow_up.png');
});

$('button[data-target="#calculate"]').on('show.bs.tab', function(e) {
    disableCalculateBtn();
});


$('button[data-target="#collapse-calculate"]').click(function() {
    var warning = checkZero();
	if (warning) {
		$('#myModal').modal('show');
		return false;
    }
});

$("#modal-calculate-now").click(function(){
	if (fakewaffle.currentPosition == "panel" && checkIE8()) {
		$('#modal').modal('hide');
		disableCalculateBtn();
        checkTotalOutcome();
		$('#collapse-calculate').collapse('show');
	}
});

$('#collapse-calculate').on('show.bs.collapse', function(e) {
    if (fakewaffle.currentPosition == "panel") {
        disableCalculateBtn();
        checkTotalOutcome();
    }
});

$('#collapse-calculate').on('shown.bs.collapse', function(e) {
	if (fakewaffle.currentPosition == "panel") {
		isCallHide = true;
		hideAllPanel();
		drawFlotJs();
		//isCallHide = false;
	}
});

}
/*--------------------------END--------------------------*/

/* there functions below for register function of popup */
function registerFunctionForModal(){
$('#myModal .modal-footer button').click(function() {
    $('#myModal').modal('hide');
    if (fakewaffle.currentPosition == "tabs") {
        $('button[data-target="#calculate"]').tab('show');
    } else {
		hideAllPanel();
        $('#collapse-calculate').collapse('show');
    }
    disableCalculateBtn();
});

}

/* there functions below handle the calculate of each number user input in the tab */
function updateWhenChangeType(e){
	$inputs = $(e).parents('table').find('input.dataInput');
	$.each($inputs,function(){
		calculateInput($(this));
	});
}

function calculateInput(e){
	var input = parseFloat($(e).val());
	var image = $(e).css('background-image');
	var type = $(e).parents('table').find("tr:eq(0) select").val();
	if(checkNumeric(input)){
		$(e).removeAttr('title');
		$(e).css('color','');
		input = calculateInputBaseOnType(input,parseInt(type));
		$(e).closest('tr').find('.monthly').html(Number(input).toLocaleString('en').split('.')[0]);
		$(e).closest('tr').find('.inputHidden').val(input);
		$(e).addClass('dataInputBlack');
		//$(e).css('background-image', image.replace('grey','black'));
	}else if ($(e).val() != '') {
		$(e).attr('title','Please enter a number');
        $(e).css('color', '#ff0000');
		$(e).closest('tr').find('.monthly').html(0);
		$(e).closest('tr').find('.inputHidden').val(0);
		$(e).removeClass('dataInputBlack');
		//$(e).css('background-image', image.replace('black','grey'));
    } else {
		$(e).attr('title','Please enter a number');
        $(e).css('color', '#000000');
        $(e).closest('tr').find('.monthly').html(0);
		$(e).closest('tr').find('.inputHidden').val(0);
		$(e).removeClass('dataInputBlack');
		//$(e).css('background-image', image.replace('black','grey'));
    }
	updateTotal(e);
}

function updateTotal(e){
	var total = getTotalInput($(e).closest('table'));
	//if(total > 0){
		if(fakewaffle.currentPosition == "tabs"){
			//update for tabs
			$('ul#myTab li.active').find('table.table-nonborder td:eq(1) span').html('£'+Number(total).toLocaleString('en').split('.')[0]);
			$('ul#myTab li.active').find('.table-responsive').find('tr:eq(0)').find('td.tenPersent img.validate').removeClass('hidden');
			$(e).parents().find('.tab-pane.active .table.totalCal span.totalMonthly').html(Number(total).toLocaleString('en').split('.')[0]);
			var idArray = $(e).parents().find('.tab-pane.active').attr('id');
			updateNumberToArray(idArray,total);
		}else{
			//update for panel
			$(e).parents().find('div.active.panel-body').find('.table.totalCal span.totalMonthly').html(Number(total).toLocaleString('en').split('.')[0]);
			var idArray = $(e).parents().find('div.panel-default div.active.panel-body').attr('id');
			$(e).parents().find("a[href='#collapse-"+idArray+"']").find('table.table-nonborder td:eq(1) span').html('£'+Number(total).toLocaleString('en').split('.')[0]);
			$(e).parents().find("a[href='#collapse-"+idArray+"']").find('.table-responsive').find('tr:eq(0)').find('td.tenPersent img.validate').removeClass('hidden');
			updateNumberToArray(idArray,total);
		}
		eneableCalculateBtn();
	
}

function updateTotalZeroValueWhenCloseTab(e){
	try{
		var tabID = $(e).attr('href').replace("#","");
		if (fakewaffle.currentPosition == "panel"){
			tabID = tabID.split('-')[1];
		}
		var number = totalsArray[tabID];
		if(number == null){
			totalsArray[tabID] = 0;
			$(e).find('td.tenPersent:eq(0) img').removeClass('hidden');
			$(e).find('table.table-nonborder td:eq(1) span').html('£0');
		}
	}catch(ex){}
}

function getTotalInput(table){
	var total = 0;
	$(table).find('.inputHidden').each(function(){
		var temp = $(this).val();
		if(temp!=""){
			total = total + parseFloat(temp);
		}
	});
	return total;
}
function checkNumeric(checkThis) {
    return checkThis >= 0 && !isNaN(parseFloat(checkThis)) && isFinite(checkThis);
}
function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode;
   if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57))
        return false;

    return true;
}


function updateNumberToArray(name, total){
	totalsArray[name] = total;
}

function nextTab(n){
	if(fakewaffle.currentPosition == "tabs"){
		if(n < getSizeArray()){
			var tmp = n +1;
			$('ul li #a'+tmp).trigger('click');
		}else{
			$('ul li button#btnCalculate').trigger('click');
		}
	}else{
		if(n < getSizeArray()){
			var tmp = n+1;
			$('.panel-default .panel-heading #a'+tmp).trigger('click');
		}else{
			$('.panel-default .panel-heading #a'+n).trigger('click');
			$('.panel-default .panel-heading button#btnCalculate').trigger('click');
		}
	}
	
}

function disableCalculateBtn(){
	$('li #btnCalculate').prop('disabled', true);
	$('.panel-default #btnCalculate').prop('disabled', true);
	$('#lastBtn').prop('disabled',true);
}

function eneableCalculateBtn(){
	if(chartExist){
		$('li #btnCalculate').prop('disabled', false);
		$('.panel-default #btnCalculate').prop('disabled', false);
		$('#lastBtn').prop('disabled',false);
	}else{
		var totalIncome = getTotalIncome();
		var totalOutcome = getTotalOutcome();
		if(totalIncome > 0 & totalOutcome > 0){
			$('li #btnCalculate').prop('disabled', false);
			$('.panel-default #btnCalculate').prop('disabled', false);
			$('#lastBtn').prop('disabled',false);
		}else{
			disableCalculateBtn();
		}
	}
	
}
/*----------------------------------------------------------END----------------------------------------*/

 function checkChromeBrowser() { 
     if(navigator.userAgent.indexOf("Chrome") != -1 ) 
    {
        return true;
    }
		return false;
}