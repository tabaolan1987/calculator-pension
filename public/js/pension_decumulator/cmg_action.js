/*
----------------Information--------------------------------

1.Pension Accumulators Action JS

2.All function in this file manage the action of user in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/

function registerAction(){
	registerHoverAction();
	registerActionYourDetails();
	registerActionResult();
}



/* there are functions handle UI of disclamer */
function registerLinkActionDisclamer(){
	$('#disclamer-page').find('a').removeAttr('href');
	$('#disclamer-page').find('a').click(function(){
		var text = $(this).text();
		var parentID = $(this).parent().parent().parent().attr('id');
		if(text.toLowerCase() == "important assumptions" || text.toLowerCase() == "assumptions used"){
			$('#'+parentID).hide();
			$('#assump-div-top').find('a[id="back-assump"]').attr('lastparentID',parentID);
			$('#assump-div-top').show();
		}else if(text.toLowerCase() == "important information"){
			$('#'+parentID).hide();
			$('#important-div-top').find('a[id="back-important"]').attr('lastparentID',parentID);
			$('#important-div-top').show();
		}
	});
	$("#important-text").find('a').removeAttr('href');
	$('#important-text').find('a:contains("important assumptions")').click(function(){
		  document.getElementById( 'assump-text' ).scrollIntoView();
	});
}

function backAction(e){
	var parentID = $(e).parent().parent().attr('id');
	var lastParentID = $(e).attr('lastparentID');
	$('#'+parentID).hide();
	$('#disclamer-div').show();
}


/* this function handle the action hover the information image */
function registerHoverAction(){
	$(document).on("mouseover",".icon-tooltip",function() {
		var attrName = $(this).attr('information-message');
		var content = InformationArray[attrName];
		$("#infor-tooltip").html(content);
		var height = $("#content-tooltip").height();
		var top = $(this).offset().top - $(window).scrollTop();
		var background = $("#content-tooltip").css('background-image');
		var n = background.indexOf("480");
		if(n == -1){
			var left = $(this).offset().left;
			var topTool =  top - 137;
			$("#content-tooltip").css({
				position: 'fixed',
				top: topTool,
				left: left + $(this).width()-3
			});
		}else{
			var left = $(this).offset().left;
			var topTool =  top - 75;
			$("#content-tooltip").css({
					position: 'fixed',
					top: topTool,
					left: left + $(this).width()
			});
		}
		$("#content-tooltip").show();
	});
	$("#content-tooltip").hover( 
			function() {  $("#content-tooltip").show(); 
			},
			function() { $("#content-tooltip").hide(); }
	);
	$(document).on("mouseout",".icon-tooltip",function() {
		$("#content-tooltip").hide();
	});
	
	
}
/* this function just allow user can type numberic only */
function isNumberKey(evt,e){
   var charCode = (evt.which) ? evt.which : event.keyCode;
   if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57)){
		return false;
	}else if(evt.keyCode == 46 || evt.keyCode == 8){
		return true;
	} 
	
	var vl = parseFloatCMG($(e).val()) +"";
	var maxlength = parseFloatCMG($(e).attr("length"));
	if(vl.length >= maxlength){
		return false;
	}
    return true;
}




function registerActionYourDetails(){
	
	$('#txt-birthday').on('focus', function() {
		$('#txt-birthday').inputmask('dd/mm/yyyy');
		$('#txt-birthday').val($('#txt-birthday').attr('d'));
	});
	
	$('#txt-birthday').on('blur', function() {
		var isValid = inputmask.isValid($(this).val(),{alias:"dd/mm/yyyy"});
		if(isValid == true){
			$('#txt-birthday').attr('d',$(this).val());
			var currentVl = $(this).val();
			var numbers = currentVl.match(/\d+/g); 
			var date = new Date(numbers[2], numbers[1]-1, numbers[0]);
			$('#txt-birthday').inputmask('remove');	
			var test = Calendar.printDate(date, "%e %b %Y");
			$(this).val(test);
		}else{
			$('#txt-birthday').inputmask('remove');
			$('#txt-birthday').val('dd/mm/yyyy');
			$('#txt-birthday').attr('d','');
		}
		isUpdate = true;
		
	});
	
	$('#txt-current-salary').on('blur', function() {
		currentSalary = parseFloatCMG($(this).val());
		var number = parseFloatCMG($(this).val());
		number = addCommas(round(number));
		if(number == 0){
			$(this).val("");
		}else{
			$(this).val(number);
		}
		isUpdate = true;
	});
	
	$('#txt-target-pensions').on('blur', function() {
		currentIncome = parseFloatCMG($(this).val());
		var number = parseFloatCMG($(this).val());
		number = addCommas(round(number));
		if(number == 0){
			$(this).val("");
		}else{
			$(this).val(number);
		}
		isUpdate = true;
	});
	$(".radio-gender").click(function(){
		$(".radio-gender").each(function(e){
			$(this).removeClass("selected");
			var idCheck = $(this).attr("for");
			$("#"+idCheck).removeAttr("checked");
		});
		var idCheck = $(this).attr("for");
		$("#"+idCheck).attr("checked","checked");
		$(this).addClass("selected");
		var check = checkDataYourDetail();
		if(check.length == 0){
			eneableTabResult();
		}else{
			disableTabResult();
		}
		isUpdate = true;
	});
	
	$('#nextAboutYou').click(function(){
		getRetirementAge();
		var check = checkDataYourDetail();
		if(check.length == 0){
			var fundValue = getFundValue();	
			var taxfreePercent = getTaxFreePercent();
			var taxfreeCash = getTaxFreeCash(taxfreePercent,fundValue);
			eneableTabResult();
			if(isReturnLTA == true){
				if(LTA['show-popup'] == 'true'){
					showWarning(LTA['message']);
				}
				var percentChange = getPercentLTAwithPensionFound(fundValue);
				percentChange = round(percentChange);
				$("#percent-tax-free").val(percentChange);
				$('#percent-tax-free').data("ionRangeSlider").update({
					from: percentChange
				});
			}else{
				$("#results").trigger('click');
			}
		}else{
			var caseWarning = check[0];
			if(caseWarning == "current-age-equal-zero"){
				showWarning(warningArray["current-age-equal-zero"]);
			}else if(caseWarning == "current-age-bigger-than-100"){
				showWarning(warningArray["current-age-bigger-than-100"]);
			}else if(caseWarning == "retirement-age-higher-than-current-age"){
				showWarning(warningArray["retirement-age-higher-than-current-age"]);
			}else{
				var content = warningArray["validate-field"] +" "+ check[0];
				for(var i =1; i < check.length;i++){
					content = content+", " + check[i];
				}
				showWarning(content+"!");
			}
			disableTabResult();
			return false;
		}
	});
	
	$('#results').click(function(){
		var check = checkDataYourDetail();
		if(check.length == 0){
			var fundValue = getFundValue();	
			var taxfreePercent = getTaxFreePercent();
			var taxfreeCash = getTaxFreeCash(taxfreePercent,fundValue);
			if(isReturnLTA == true){
				if(LTA['show-popup'] == 'true'){
					showWarning(LTA['message']);
				}
				var percentChange = getPercentLTAwithPensionFound(fundValue);
				percentChange = round(percentChange);
				$("#percent-tax-free").val(percentChange);
				$('#percent-tax-free').data("ionRangeSlider").update({
					from: percentChange
				});
				return false;
			}else{
				eneableTabResult();
			}
		}else{
			var caseWarning = check[0];
			if(caseWarning == "current-age-equal-zero"){
				showWarning(warningArray["current-age-equal-zero"]);
			}else if(caseWarning == "current-age-bigger-than-100"){
				showWarning(warningArray["current-age-bigger-than-100"]);
			}else{
				var content = warningArray["validate-field"] +" "+ check[0];
				for(var i =1; i < check.length;i++){
					content = content+", " + check[i];
				}
				showWarning(content+"!");
			}
			disableTabResult();
			return false;
		}
	});
	
	
}

function checkDataYourDetail(){
	var content = new Array();
	var currentAge = getCurrentAge();
	if(currentAge == 0 || currentAge < 0){
		content.push('current-age-equal-zero');
		return content;
	}
	if(currentAge > 100){
		content.push('current-age-bigger-than-100');
		return content;
	}
	if(getRetirementAge() < getAgeFromDOB()){
		content.push('retirement-age-higher-than-current-age');
		return content;
	}
	var dob = $('#txt-birthday').val();
	if(dob == "" || typeof dob === 'undefined' || dob === null || dob === "dd/mm/yyyy"){
		content.push($('#txt-birthday').attr("alert-message"));
	}
	var gender = getGender();
	if(gender == 0){
		content.push($("#male").attr("alert-message"));
	}
	var currentSalary = $('#txt-current-salary').val();
	if(currentSalary=="" || currentSalary == 0){
		content.push($('#txt-current-salary').attr("alert-message"));
	}
	var targetPension = $('#txt-target-pensions').val();
	if( targetPension == "" & targetPension == 0){
		content.push($('#txt-target-pensions').attr("alert-message"));
	}
	return content;

}

function eneableTabResult(){
	$('#results').attr('href','#tab2');
	$('#results').attr('data-toggle','tab');
}

function disableTabResult(){
	$('#results').removeAttr('href');
	$('#results').removeAttr('data-toggle');
}

function eneableTabDetail(){
	$('#about-you').attr('href','#tab1');
	$('#about-you').attr('data-toggle','tab');
}

function disableTabDetail(){
	$('#about-you').removeAttr('href');
	$('#about-you').removeAttr('data-toggle');
}




function registerActionResult(){
	$('a[id="results"]').on('shown.bs.tab', function (e) {
		if(isUpdate == true){
			drawChart();
		}
		
	});	
	$('#estimated-annual-modal').on("shown.bs.modal",function(e){
		$(".growrate-label").on('click',function(){
			$(".growrate-label").each(function(){
				$(this).removeClass("selected");
				var idCheck = $(this).attr("for");
				$("#"+idCheck).removeAttr("checked");
			});
			var idCheck = $(this).attr("for");
			$("#"+idCheck).attr("checked","checked");
			$(this).addClass("selected");
		});
	});
	$('#estimated-annual-modal').on("hidden.bs.modal",function(e){
		drawChart();
	});
	
	$('.display-result-link').click(function(){
		$('#about-you').trigger('click');
		var id = $(this).attr('focus-to');
		$('#'+id).focus();
	});
}

function disableButton(){
	$('#print-data').attr('disabled','disabled');
	$('#btn-advanced').attr('disabled','disabled');
	disableTabDetail();
}

function eneableButton(){
	$('#print-data').removeAttr('disabled');
	$('#btn-advanced').removeAttr('disabled');
}

function drawChart(){
	disableButton();
	showRightContent();
	showChartRight();
	var fundPot = getFundPot();
	var totalRate = getTotalRate();
	var annualIncome = getAnnualIncome();
	var yearNeedLast = getLifeExpectancy();
	var yearMayLast = decumulatorYears(fundPot,totalRate,annualIncome);
	var shortFallYear = getShortFallYear(yearMayLast,yearNeedLast);
	
	var coinBlue = getCoinBlue(yearMayLast,yearNeedLast);
	var coinGrey = getCoinGrey(yearMayLast,yearNeedLast);
	setupCoinGrey(coinGrey);
	setupCoinBlue(coinBlue);
	fallingCoinGrey(0,yearNeedLast);
	fallingCoinBlue(0,yearMayLast,shortFallYear);
	updateMessage(yearNeedLast,yearMayLast,shortFallYear);
	isUpdate = false;
}

function PrintElement(element){
	Popup($(element).html(),'Helvetica Neue');
}

function updateMessage(yearNeedLast,yearMayLast,shortFallYear){
	var fundValue = getFundValue();
	var annualIncome = getAnnualIncome();
	var taxPercen = getTaxFreePercent();
	var taxfreeCash = getTaxFreeCash(fundValue,taxPercen);
	var currentAge = getCurrentAge();
	if(currentAge < 55 || currentAge == 0){
		currentAge = 55;
	}
	var grow_rate = getGrowthRate();
	//results div
	$('.result-year-retirement').html(addCommas(currentAge));
	$(".expectancy-year").html(getStringYear(yearNeedLast));
	$('.result-growrate-percent').html(grow_rate);
	$(".funds-year").html(getStringYear(yearMayLast));
	$('.pound-annual-income').html(addCommas(annualIncome));
	$('.display-result-pound-fund').html(addCommas(fundValue));
	$('.display-result-pound-annual').html(addCommas(annualIncome));
	$('.display-result-pound-amount').html(addCommas(round(taxfreeCash)));
	$('.display-result-percent-amount').html(addCommas(fixed(taxPercen)));
	
	//print div
	var importantText = $("#important-text").html();
	var assumptionText = $("#assump-text").html();
	var disclamerText = $("#disclamer-infor").html();
	$("#disclamer-print").html(disclamerText);
	$("#important-print").html(importantText);
	$("#assump-print").html(assumptionText);
	$('.print-fund-value').html(addCommas(fundValue));
	$('.print-grow-rate').html(grow_rate);
	$('.print-annual-income').html(addCommas(annualIncome));
	$('.print-tax-free-cash').html(addCommas(round(taxfreeCash)));
	$('.print-tax-free-percent').html(addCommas(fixed(taxPercen)));
	$('.print-retirement-age').html(addCommas(currentAge));
	$(".print-years-need-last").html(getStringYear(yearNeedLast));
	$(".print-years-may-last").html(getStringYear(yearMayLast));
	
	//check shortfall
	if(shortFallYear > 0){
		$('.print-shortfall-year').html(getStringYear(shortFallYear));
		$(".have-shortfall").show();
		$(".no-shortfall").hide();
		$(".funds-year").css("color","#da291c");
		$(".result-based-current").css("color","#777777");
		$(".print-show-shortfall-inform").show();
	}else{
		$(".result-based-current").css("color","#06038d");
		$(".funds-year").css("color","#06038d");
		$(".print-show-shortfall-inform").hide();
		$(".have-shortfall").hide();
		$(".no-shortfall").show();
	}
}

function Popup(data,font) {
	var mywindow = window.open('', 'CloseBrothers');
	mywindow.document.write('<html><head><title>Pension Decumulator</title>');
	mywindow.document.write('<style type="text/css">@media print{div{font-family: "'+font+'" !important;}}</style>');
	mywindow.document.write('<style type="text/css">@media screen{div{font-family:"'+font+'" !important;}}</style>');
	mywindow.document.write('<style>a {text-decoration : none !important;color : black;}</style>');
	mywindow.document.write('</head><body>');
	mywindow.document.write(data);
	mywindow.document.write('</body></html>');
	mywindow.document.close();
	mywindow.focus(); 
	mywindow.print();
	mywindow.close();
	return true;
}