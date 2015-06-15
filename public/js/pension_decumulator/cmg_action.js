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
			var topTool =  top - 157;
			$("#content-tooltip").css({
				position: 'fixed',
				top: topTool,
				left: left + $(this).width()
			});
		}else{
			var left = $(this).offset().left;
			var topTool =  top - 83;
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




function registerActionYourDetails(){

	$('.text-about-you').on('input', function() {
		var check = checkDataYourDetail();
		if(check.length == 0){
			eneableTabResult();
		}else{
			disableTabResult();
		}
	});
	
	$('.text-about-you').on('blur', function() {
		var number = addCommas($(this).val());
		if(number == 0){
			$(this).val("");
		}else{
			$(this).val(number);
		}
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
	});
	
	$('#nextAboutYou').click(function(){
		var check = checkDataYourDetail();
		if(check.length == 0){
			var fundValue = getFundValue();	
			var taxfreePercent = getTaxFreePercent();
			var taxfreeCash = getTaxFreeCash(fundValue,taxfreePercent);
			eneableTabResult();
			if(isReturnLTA == true){
				showWarning(LTA['message']);
				var percentChange = getPercentLTAwithPensionFound(fundValue);
				$("#percent-tax-free").val(percentChange);
				$('#percent-tax-free').data("ionRangeSlider").update({
					from: percentChange
				});
			}else{
				$("#results").trigger('click');
			}
		}else{
			var caseWarning = check[0];
			var content = warningArray["validate-field"] +" "+ check[0];
			for(var i =1; i < check.length;i++){
				content = content+", " + check[i];
			}
			disableTabResult();
			showWarning(content+"!");
		}
	});
	
	$('#results').click(function(){
		var check = checkDataYourDetail();
		if(check.length == 0){
			var fundValue = getFundValue();	
			var taxfreePercent = getTaxFreePercent();
			var taxfreeCash = getTaxFreeCash(fundValue,taxfreePercent);
			if(isReturnLTA == true){
				showWarning(LTA['message']);
				var percentChange = getPercentLTAwithPensionFound(fundValue);
				$("#percent-tax-free").val(percentChange);
				$('#percent-tax-free').data("ionRangeSlider").update({
					from: percentChange
				});
			}
			eneableTabResult();
		}else{
			var caseWarning = check[0];
			var content = warningArray["validate-field"] +" "+ check[0];
			for(var i =1; i < check.length;i++){
				content = content+", " + check[i];
			}
			disableTabResult();
			showWarning(content+"!");
			return false;
		}
	});
	
	
}

function checkDataYourDetail(){
	var content = new Array();
	var dob = $('#txt-birthday').val();
	if(dob == "" || typeof dob === 'undefined' || dob === null){
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






function registerActionResult(){
	$('a[id="results"]').on('shown.bs.tab', function (e) {
		drawChart();
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
}

function updateMessage(yearNeedLast,yearMayLast){
	var fundValue = getFundValue();
	var annualIncome = getAnnualIncome();
	var taxPercen = getTaxFreePercent();
	var taxfreeCash = getTaxFreeCash(fundValue,taxPercen);
	$(".expectancy-year").html(yearNeedLast + " years");
	$(".funds-year").html(yearMayLast + " years");
	$('.display-result-pound-fund').html(addCommas(fundValue));
	$('.display-result-pound-annual').html(addCommas(annualIncome));
	$('.display-result-pound-amount').html(addCommas(taxfreeCash));
	$('.display-result-percent-amount').html(addCommas(taxPercen));
}

function drawChart(){
	showChartRight();
	var fundPot = getFundPot();
	var totalRate = getTotalRate();
	var annualIncome = getAnnualIncome();
	var yearNeedLast = getLifeExpectancy();
	var yearMayLast = decumulatorYears(fundPot,totalRate,annualIncome);
	var shortFallYear = getShortFallYear(yearMayLast,yearNeedLast);
	updateMessage(yearNeedLast,yearMayLast);
	var coinBlue = getCoinBlue(yearMayLast,yearNeedLast);
	var coinGrey = getCoinGrey(yearMayLast,yearNeedLast);
	setupCoinGrey(coinGrey);
	fallingCoinGrey(0,yearNeedLast);
	setupCoinBlue(coinBlue);
	fallingCoinBlue(0,yearMayLast,shortFallYear);
}


function PrintElement(element){
	updateDataPrint();
	Popup($(element).html());
}

function Popup(data) {
	var mywindow = window.open('', 'Close Brothers');
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