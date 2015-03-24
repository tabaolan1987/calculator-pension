/* there functions below handle the calculate of each number user input in the tab */

function updateWhenChangeType(e){
	$inputs = $(e).parents('table').find('input.dataInput');
	$.each($inputs,function(){
		calculateInput($(this));
	});
}

function calculateInput(e){
	var input = $(e).val();
	var type = $(e).parents('table').find("tr:eq(0) select").val();
	if(checkNumeric(input)){
		$(e).removeAttr('title');
		$(e).css('color','');
		input = calculateInputBaseOnType(input,parseInt(type));
		$(e).closest('tr').find('.monthly').html(input);
	}else if ($(e).val().trim() != '') {
		$(e).attr('title','Please enter a number');
        $(e).css('color', '#ff0000');
		$(e).closest('tr').find('.monthly').html(0);
    } else {
		$(e).attr('title','Please enter a number');
        $(e).css('color', '#000000');
        $(e).closest('tr').find('.monthly').html(0);
    }
	updateTotal(e);
}

function updateTotal(e){
	var total = getTotalInput($(e).closest('table'));
	if(total > 0){
		if(fakewaffle.currentPosition == "tabs"){
			//update for tabs
			$('ul#myTab li.active').find('table.table-nonborder td:eq(1) span').html('£'+total);
			$('ul#myTab li.active').find('.table-responsive').find('tr:eq(0)').find('td.tenPersent img.validate').removeClass('hidden');
			$(e).parents().find('.tab-pane.active .table.totalCal span.totalMonthly').html(total);
			var idArray = $(e).parents().find('.tab-pane.active').attr('id');
			updateNumberToArray(idArray,total);
		}else{
			//update for panel
			$(e).parents().find('div.active.panel-body').find('.table.totalCal span.totalMonthly').html(total);
			var idArray = $(e).parents().find('div.panel-default div.active.panel-body').attr('id');
			$(e).parents().find("a[href='#collapse-"+idArray+"']").find('table.table-nonborder td:eq(1) span').html('£'+total);
			$(e).parents().find("a[href='#collapse-"+idArray+"']").find('.table-responsive').find('tr:eq(0)').find('td.tenPersent img.validate').removeClass('hidden');
			updateNumberToArray(idArray,total);
		}
	}else{
		if(fakewaffle.currentPosition == "tabs"){
			//update for tab
			$(e).parents().find('.tab-pane.active .table.totalCal span.totalMonthly').html('0');
			$('ul#myTab li.active').find('table.table-nonborder td:eq(1) span').html('');
			$('ul#myTab li.active').find('.table-responsive').find('tr:eq(0)').find('td.tenPersent img.validate').addClass('hidden');
			var idArray = $(e).parents().find('.tab-pane.active').attr('id');
			updateNumberToArray(idArray,total);
		}else{
			//update for panel
			$(e).parents().find('div.active.panel-body').find('span.totalMonthly').html(total);
			var idArray = $(e).parents().find('div.panel-default div.active.panel-body').attr('id');
			var idArray = $(e).parents().find('div.panel-default div.active.panel-body').attr('id');
			$(e).parents().find("a[href='#collapse-"+idArray+"']").find('table.table-nonborder td:eq(1) span').html('');
			$(e).parents().find("a[href='#collapse-"+idArray+"']").find('.table-responsive').find('tr:eq(0)').find('td.tenPersent img.validate').addClass('hidden');
			updateNumberToArray(idArray,total);
		}
	}
		eneableCalculateBtn();
	
}

function getTotalInput(table){
	var total = 0;
	$(table).find('.monthly').each(function(){
		var temp = $(this).text();
		if(temp!=""){
			total = total + parseFloat(temp);
		}
	});
	return total;
}
function checkNumeric(checkThis) {
    return checkThis >= 0 && !isNaN(parseFloat(checkThis)) && isFinite(checkThis);
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
	var totalIncome = getTotalIncome();
    var totalOutcome = getTotalOutcome();
	alert(totalIncome + '-' + totalOutcome);
	if(totalIncome > 0 & totalOutcome > 0){
		$('li #btnCalculate').prop('disabled', false);
		$('.panel-default #btnCalculate').prop('disabled', false);
		$('#lastBtn').prop('disabled',false);
	}else{
		disableCalculateBtn();
	}
}
/*----------------------------------------------------------END----------------------------------------*/

