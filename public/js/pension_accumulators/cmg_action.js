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
	registerActionAboutYou();
	registerActionSavingTab();
	registerActionResultTab();
	registerActionSummaryTab();
	
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
				left: left + $(this).width()
			});
		}else{
			var left = $(this).offset().left;
			var topTool =  top - 76;
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
function isNumberKey(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode;
   if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57)){
		return false;
	}
    return true;
}


/* there are actions for tab about you*/
function registerActionAboutYou(){
	
	$('.text-about-you').on('blur', function() {
		var vl = parseFloatCMG($(this).val());
		var number = addCommas(round(vl));
		$(this).val(number);
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
		var check = checkDataAboutYou();
		if(check.length == 0){
			eneableTabSavings();
		}else{
			disableTabSavings();
		}
		
	});
	

	$('#nextAboutYou').click(function(){
		var check = checkDataAboutYou();
		if(check.length == 0){
			eneableTabSavings();
			$("#savings").trigger('click');
		}else{
			var caseWarning = check[0];
			if(caseWarning == "retireAge-smaller-than-currentAge"){
				var content = warningArray["retireAge-smaller-than-currentAge"];
				disableTabSavings();
				showWarning(content);
			}else{
				var content = warningArray["validate-field"] +" "+ check[0];
				for(var i =1; i < check.length;i++){
					content = content+", " + check[i];
				}
				disableTabSavings();
				showWarning(content+"!");
			}
			
		}
	});
	
	$('#savings').click(function(){
		var check = checkDataAboutYou();
		if(check.length > 0){
			var caseWarning = check[0];
			if(caseWarning == "retireAge-smaller-than-currentAge"){
				var content = warningArray["retireAge-smaller-than-currentAge"];
				disableTabSavings();
				showWarning(content);
			}else{
				var content = warningArray["validate-field"] +" "+ check[0];
				for(var i =1; i < check.length;i++){
					content = content+", " + check[i];
				}
				disableTabSavings();
				showWarning(content + "!");
			}
			
			return false;
		}else{
			eneableTabSavings();		

		}
	});

}

function eneableTabSavings(){
	$('#savings').attr('href','#tab2');
	$('#savings').attr('data-toggle','tab');
}

function disableTabSavings(){
	$('#savings').removeAttr('href');
	$('#savings').removeAttr('data-toggle');
}

function getGender(){
	if($("input:radio[name=optradio]").is(":checked")){
		var gender = $("input:radio[name=optradio]:checked").val();
		return gender;
	}
	return 0;

}
function checkDataAboutYou(){
	var content = new Array();
	var currentAge = $('#txt-current-age').val();
	if(currentAge == "" || typeof currentAge === 'undefined' || currentAge === null || currentAge == 0){
		content.push("current age");
	}
	var gender = getGender();
	if(gender == 0){
		content.push("gender");
	}
	var currentSalary = $('#txt-current-salary').val();
	if(currentSalary=="" || currentSalary == 0){
		content.push("current salary");
	}
	var targetPension = $('#txt-target-pensions').val();
	if( targetPension == "" || targetPension == 0){
		content.push("target income");
	}
	var ageRetire =   $("#age-to-retirement").val();
	if(parseInt(ageRetire) < parseInt(currentAge)){
		content.push("retireAge-smaller-than-currentAge");
	}
	return content;
}
/*------------------------------------------------------------------------------------*/

/* there are actions for savings tab */
function eneableTabResult(){
	$('#results').attr('href','#tab3');
	$('#results').attr('data-toggle','tab');
}

function disableTabResult(){
	$('#results').removeAttr('href');
	$('#results').removeAttr('data-toggle');
}

function checkDataSaving(){
	var deffer_pen = $('#txt-deffered-pensions').val();
	if(deffer_pen.length > 0 & parseFloatCMG(deffer_pen) > 0){
		return true;
	}
	var current_pen = $('#txt-current-pensions').val();
	if(current_pen.length > 0 & parseFloatCMG(current_pen) > 0){
		return true;
	}
	
	var seft_pay =  $('#txt-you-paying').val();
	if(seft_pay.length > 0 & parseFloatCMG(seft_pay) > 0){
		return true;
	}
	
	var company_pay = $('#txt-your-employer').val();
	if(company_pay.length > 0 & parseFloatCMG(company_pay) > 0){
		return true;
	}
	
	return false;
}

function registerActionSavingTab(){
	
	$('#results').click(function(){
		var check = checkDataSaving();
		if(check != true){
			var content = warningArray["enter-at-least-once-field"];
			showWarning(content);
			return false;
		}
	});
	$(".income-payable").click(function(){
		$(".income-payable").each(function(){
			$(this).removeClass("selected");
			var idCheck = $(this).attr("for");
			$("#"+idCheck).removeAttr("checked");
		});
		$(this).addClass("selected");
		var idCheck = $(this).attr("for");
		$("#"+idCheck).attr("checked","checked");
		var val = $(this).attr("for");
		if(val == "yes"){
			$('.final-salary').show();
		}else{
			$('#txt-income-payable').val(0);
			$('.final-salary').hide();
		}
	});
	
	$('.text-savings').on('blur', function() {
		var vl = parseFloatCMG($(this).val());
		var number = addCommas(round(vl));
		$(this).val(number);
	});
	
	
	$('#nextSavings').click(function(){
		if(isBox1Visible()){
			var check = checkDataSaving();
			if(check == true){
				hiddenBox1();
			}else{
				disableTabResult();
				var content = warningArray["enter-at-least-once-field"];
				showWarning(content);
			}
		}else if(isBox2Visible()){
			if(isIncomeVisible()){
				var vl = $('#txt-income-payable').val();
				if(vl == "" || typeof vl === 'undefined' || vl === null || vl == 0){
					var content = warningArray["income-able"];
					showWarning(content);
				}else{
					$('#results').trigger('click');
				}
			}else{
				$('#results').trigger('click');
			}
			
		}
	});
	
	$('#backSavings').click(function(){
		if(isBox1Visible()){
			$('#about-you').trigger('click');
		}else if(isBox2Visible()){
			hiddenBox2();
		}
	});
	$('#results').click(function(){
		if(isBox1Visible()){
			var check = checkDataSaving();
			if(check == true){
			}else{
				disableTabResult();
				var content = warningArray["enter-at-least-once-field"];
				showWarning(content);
			}
		}else if(isBox2Visible()){
			if(isIncomeVisible()){
				var vl = $('#txt-income-payable').val();
				if(vl == "" || typeof vl === 'undefined' || vl === null || vl == 0){
					disableTabResult();
					var content = warningArray["income-able"];
					showWarning(content);
					
				}else{
					eneableTabResult();
				
				}
			}else{
				eneableTabResult();
			
			}
		}
	});
	
	calculatePersonalPay();
	calculateCompanyPay();
}


function hiddenBox1(){
	$('.box-monney-purchase').hide();
	$('.box-defined-benefits').show();
}

function hiddenBox2(){
	$('.box-monney-purchase').show();
	$('.box-defined-benefits').hide();
}
function isBox1Visible(){
	if($('.box-monney-purchase').is(":visible")){
		return true;
	}else{
		return false;
	}
}

function isBox2Visible(){
	if($('.box-defined-benefits').is(":visible")){
		return true;
	}else{
		return false;
	}
}

function isIncomeVisible(){
	if($('#txt-income-payable').is(':visible')){
		return true;
	}else{
		return false;
	}
}

function calculatePersonalPay(){
	$('#txt-you-paying').on('change',function(){
		var percent =  getPercent_Contribute();
		percent = percent*100;
		$('#txt-you-paying-percent').val(addCommas(fixed(percent)));
		var vl = fixed(parseFloatCMG($(this).val()));
		$(this).val(addCommas(vl));
	});
	$('#txt-you-paying-percent').on('change',function(){
		var cash = round(getCash_Contribute());
		cash = addCommas(cash);
		$('#txt-you-paying').val(cash);
		var vl = fixed(parseFloatCMG($(this).val()));
		$(this).val(addCommas(vl));
	});
}

function calculateCompanyPay(){
	$('#txt-your-employer').on('blur',function(){
		var percent = getPercent_Contribute_company();
		percent = percent*100;
		$('#txt-your-employer-percent').val(addCommas(fixed(percent)));
		var vl = fixed(parseFloatCMG($(this).val()));
		$(this).val(addCommas(vl));
	});
	$('#txt-your-employer-percent').on('blur',function(){
		var cash = round(getCash_Contribute_company());
		cash = addCommas(cash);
		$('#txt-your-employer').val(cash);
		var vl = fixed(parseFloatCMG($(this).val()));
		$(this).val(addCommas(vl));
	});
}
/*-----------------------------------------------------------------*/
/* this is action for tab results */
var registerChange = false;
function registerActionResultTab(){
	$('a[id="results"]').on('shown.bs.tab', function (e) {
		var forceCashIncome = parseFloatCMG(getForecastIncome());
		var targetPension = parseFloatCMG($('#txt-target-pensions').val());
		var shortFall = getShortFall();
		var taxFree = getTax_Free_Value();
		var checkLta = showWarningLta(taxFree);
		setupSlide(checkLta);
		setTextToTextField();
		if(parseFloatCMG(current_forcecash_income) !== forceCashIncome || parseFloatCMG(current_target) !== targetPension){
			drawChart(forceCashIncome,shortFall,targetPension,taxFree);
			eneabledSummary();
			if(registerChange == false){
				onChange();
			}
			registerChange = true;
		}
	});

	$('#nextResult').on('click',function(){
		$('#summary').trigger('click');
	});
	
	$('#backResult').on('click',function(){
		$('#savings').trigger('click');
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
		onChangeUI();
		setupMessageSummary();
	});
	
}

function eneabledSummary(){
	$('#summary').attr('href','#tab4');
	$('#summary').attr('data-toggle','tab');
}
function setupMessage(forceCashIncome,targetPension){
	var yRD = yourRetirementDate();
	$('#year-retire').html(yRD);
	var rA = $('#age-to-retirement').val();
	$('#age-retire').html(rA);
	var forceCash = addCommas(forceCashIncome);
	$('#pound-per-year').html(forceCash);
	$('.pound-annual-income').html(addCommas(targetPension));
}


function setupSlide(checkLta){
	var rA = $('#age-to-retirement').val();
	var cFP = $('#percent-tax-free').val();
	if(checkLta == true){
		cFP = getPercentLtaWithPensionFound();
	}
	$('#percent-tax-free-result').data("ionRangeSlider").update({
			from: cFP
	});
	$('#percent-tax-free-result').val(cFP);
	$('#percent-tax-free').data("ionRangeSlider").update({
			from: cFP
	});
	$('#percent-tax-free').val(cFP);
	$('#age-to-retirement-result').data("ionRangeSlider").update({
			from: rA
	});
	
}
function setTextToTextField(){
	var cashContribute = $('#txt-you-paying').val();
	var ContributePercent = $('#txt-you-paying-percent').val();
	$('#txt-you-paying-result').val(cashContribute);
	$('#txt-you-paying-percent-result').val(ContributePercent);
	
	var cashContriCompany = $('#txt-your-employer').val();
	var percentContriConpany = $('#txt-your-employer-percent').val();
	$('#txt-your-employer-result').val(cashContriCompany);
	$('#txt-your-employer-percent-result').val(percentContriConpany);
	
	var targetPension = $('#txt-target-pensions').val();
	$('#txt-target-pensions-result').val(targetPension);
}

function disableTxtField(){
	$('#txt-your-employer-percent-result').attr("disabled","disabled");
	$('#txt-your-employer-result').attr("disabled","disabled");
	$('#txt-you-paying-percent-result').attr("disabled","disabled");
	$('#txt-you-paying-result').attr("disabled","disabled");
	$('#txt-target-pensions-result').attr("disabled","disabled");
	$('#oneOffLumpSum').attr("disabled","disabled");
	$('#print-data').attr("disabled","disabled");
	$('#nextResult').attr("disabled","disabled");
	$('#backResult').attr("disabled","disabled");
	$('#btn-advanced').attr("disabled","disabled");
	$('#percent-tax-free-result').data("ionRangeSlider").update({
			disable: true
	});
	$('#age-to-retirement-result').data("ionRangeSlider").update({
			disable: true
	});
}
function eneabledTxtField(){
	$('#txt-your-employer-percent-result').removeAttr("disabled");
	$('#txt-your-employer-result').removeAttr("disabled");
	$('#txt-you-paying-percent-result').removeAttr("disabled");
	$('#txt-you-paying-result').removeAttr("disabled");
	$('#txt-target-pensions-result').removeAttr("disabled");
	$('#oneOffLumpSum').removeAttr("disabled");
	$('#print-data').removeAttr("disabled");
	$('#nextResult').removeAttr("disabled");
	$('#backResult').removeAttr("disabled");
	$('#btn-advanced').removeAttr("disabled");
	$('#percent-tax-free-result').data("ionRangeSlider").update({
			disable: false
	});
	$('#age-to-retirement-result').data("ionRangeSlider").update({
			disable: false
	});
}
function onChange(){
	$('#txt-your-employer-percent-result').on('change',function(){
		var vl = fixed(parseFloatCMG($(this).val()));
		$('#txt-your-employer-percent').val(vl);
		var cash = round(getCash_Contribute_company());
		cash = addCommas(cash);
		$('#txt-your-employer').val(cash);
		$('#txt-your-employer-result').val(cash);
		$(this).val(addCommas(vl));
		onChangeUI();	
	});
	
	$('#txt-your-employer-result').on('change',function(){
		var vl = fixed(parseFloatCMG($(this).val()));
		$('#txt-your-employer').val(vl);
		var percent = getPercent_Contribute_company();
		percent = percent*100;
		$('#txt-your-employer-percent-result').val(fixed(percent));
		$('#txt-your-employer-percent').val(fixed(percent));
		$(this).val(addCommas(vl));
		onChangeUI();
	
	});
	
	$('#txt-you-paying-percent-result').on('change',function(){
		var vl = fixed(parseFloatCMG($(this).val()));
		$('#txt-you-paying-percent').val(vl);
		var cash = $('#txt-you-paying-result').val();
		cash = round(getCash_Contribute());
		cash = addCommas(cash);
		$('#txt-you-paying').val(cash);
		$('#txt-you-paying-result').val(cash);
		$(this).val(addCommas(vl));
		onChangeUI();
	});
	
	$('#txt-you-paying-result').on('change',function(){
		var vl = fixed(parseFloatCMG($(this).val()));
		$('#txt-you-paying').val(vl);
		var percent = getPercent_Contribute();
		percent = percent*100;
		$('#txt-you-paying-percent').val(fixed(percent));
		$('#txt-you-paying-percent-result').val(fixed(percent));
		$(this).val(addCommas(vl));
		onChangeUI();
	});
	
	


	$('#txt-target-pensions-result').on('change',function(){
		var target = parseFloatCMG($(this).val());
		target = addCommas(target);
		$('#txt-target-pensions').val(target);
		$(this).val(target);
		onChangeUI();
	});
	$('#oneOffLumpSum').on('change',function(){
		var target = parseFloatCMG($(this).val());
		target = addCommas(target);
		$(this).val(target);
		onChangeUI();
	});

}
function onChangeUI(){
	var ageRetire = $("#age-to-retirement-result").val();
	$('#age-to-retirement').data("ionRangeSlider").update({
			from: ageRetire
	});
	$('#age-to-retirement').val(ageRetire);
	var percent = $('#percent-tax-free-result').val();
	$('#percent-tax-free').data("ionRangeSlider").update({
			from: percent
	});
	$('#percent-tax-free').val(percent);
	var forceCashIncome = parseFloatCMG(getForecastIncome());
	var targetPension = parseFloatCMG($('#txt-target-pensions').val());
	var shortFall = getShortFall();
	var taxFree = getTax_Free_Value();
	var checkLta = showWarningLta(taxFree);
	if(checkLta == true){
		var percentLTA = getPercentLtaWithPensionFound();
		$('#percent-tax-free-result').data("ionRangeSlider").update({
			from: percentLTA
		});
		$('#percent-tax-free-result').val(percentLTA);
		$('#percent-tax-free').data("ionRangeSlider").update({
			from: percentLTA
		});
		$('#percent-tax-free').val(percentLTA);
	}
	drawChart(forceCashIncome,shortFall,targetPension,taxFree);
}

function drawChart(forceCashIncome,shortFall,targetPension,taxFree){
	showRightContent();
	showChartRight();
	disableTxtField();
	$('.top-arrow').hide();
	$('.bot-arrow').hide();
	setupMessage(forceCashIncome,targetPension);
	var coinBlue = getCoinBlue(forceCashIncome,targetPension);
	var coinRed = getCoinRed(coinBlue);
	
	setupCoin(coinBlue,coinRed);
	fallingCoin(1,forceCashIncome,shortFall,targetPension,coinBlue,coinRed);
	current_forcecash_income = forceCashIncome;
	current_target = targetPension;
	setupMessageSummary(forceCashIncome,shortFall,targetPension,taxFree);
	updateDataPrint(forceCashIncome,shortFall,targetPension,taxFree)
}
/*------------------------------------------------------------------*/
function registerActionSummaryTab(){
	$('a[id="summary"]').on('shown.bs.tab', function (e) {
		//setupMessageSummary();
		setActionLink();
	});
	$('#backSummary').on('click',function(e){
		$('#results').trigger('click');
	});
	
}
function setActionLink(){
	$('.summary-link').on('click',function(e){
		$('#results').trigger('click');
		var id = $(this).attr("id");
		if(id == "focus-income"){
			$("#txt-target-pensions-result").focus();
		}else if(id == "focus-contribution"){
			$("#txt-you-paying-percent-result").focus();
		}else if(id == "focus-retireAge"){
			//$('#container-age-to-retirement-result').find(".ui-corner-all").mouseenter();
		}else if(id== "focus-tax"){
			 //$('#container-percent-tax-free').find(".irs-slider").mouseover();
		}
	});
}
function setupMessageSummary(forceCashIncome,shorFall,targetPension,tax_free_value){
	var percent_income = getForecast_percent_target(forceCashIncome);
	percent_income = round(parseFloatCMG(percent_income)*100);
	var tax_free_percent  = $('#percent-tax-free-result').val();
	var retire_age =  $("#age-to-retirement-result").val();
	if(parseFloatCMG(forceCashIncome) < parseFloatCMG(targetPension)){
		$('.summary-pound-shortfall').html(addCommas(shorFall));
		showNormal();
	}else{
		var excess = forceCashIncome - targetPension;
		$('.summary-pound-excess').html(addCommas(excess));
		showExcess();
	}
	$('.summary-pound-pension').each(function(){
		$(this).html(addCommas(targetPension));
	});
	$('.summary-pound-income').each(function(){
		$(this).html(addCommas(forceCashIncome));
	})
	$('.summary-percent').html(addCommas(percent_income));
	$('.summary-percent-amount').html(tax_free_percent);
	$('.summary-retire-age').each(function(){
		$(this).html(retire_age);
	});
	tax_free_value = round(tax_free_value);
	$('.summary-pound-amount').html(addCommas(tax_free_value));
		
}

function showNormal(){
	$('.summary-excess-title').each(function(){
		$(this).hide();
	});
	$('.summary-normal-title').each(function(){
		$(this).show();
	});
}

function showExcess(){
	$('.summary-excess-title').each(function(){
		$(this).show();
	});
	$('.summary-normal-title').each(function(){
		$(this).hide();
	});
}

/*function print*/
function updateDataPrint(forceCashIncome,shorFall,targetPension,tax_free_value){
	var tax_free_percent  = $('#percent-tax-free-result').val();
	var retire_age = $("#age-to-retirement-result").val();
	
	$('.print-pound-pension').html(addCommas(targetPension));
	$('.print-retire-age').each(function(){
		$(this).html(retire_age);
	});
	tax_free_value = round(tax_free_value);
	$('.print-percent-amount').html(tax_free_percent);
	$('.print-pound-amount').html(addCommas(tax_free_value));
	$('.print-pound-income').html(addCommas(forceCashIncome));
	if(shorFall >0){
		$('.print-pound-shortfall').html(addCommas(shorFall));
		$('#shortfall-print').show();
	}else{
		$('#shortfall-print').hide();
	}
	
	
	var importantText = $("#important-text").html();
	var assumptionText = $("#assump-text").html();
	var disclamerText = $("#disclamer-infor").html();
	$("#disclamer-print").html(disclamerText);
	$("#important-print").html(importantText);
	$("#assump-print").html(assumptionText);
}

function PrintElement(element){
	Popup($(element).html());
}

function Popup(data) 
{
	var mywindow = window.open('', 'CloseBrothers');
	mywindow.document.write('<html><head><title>Pension Accumulators</title>');
	mywindow.document.write('<style>a {text-decoration : none !important;color : black;}</style>');
	mywindow.document.write('</head><body >');
	mywindow.document.write(data);
	mywindow.document.write('</body></html>');
	mywindow.document.close();
	mywindow.focus(); 
	mywindow.print();
	mywindow.close();
	return true;
}