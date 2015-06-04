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

	$("input:radio[name=optradio]").change(function(){
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
				$("#percent-tax-free").slider().slider("value",percentChange);
			}else{
				$("#results").trigger('click');
			}
		}else{
			var caseWarning = check[0];
			content = warningArray["validate-field"] +" "+ check[0];
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
			eneableTabResult();
			if(isReturnLTA == true){
				showWarning(LTA['message']);
				var percentChange = getPercentLTAwithPensionFound(fundValue);
				$("#percent-tax-free").slider().slider("value",percentChange);
			}
		}else{
			var caseWarning = check[0];
			content = warningArray["validate-field"] +" "+ check[0];
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
		var yearNeedLast = getLifeExpectancy();
		var yearMayLast = 
		 
	});
}


function updateFundNeedToLast(year){
	$("#year-need-last").html(year);
	var coingrey = $('.coingrey').length;
	var last = coingrey -1;
	var top = ($("#coingrey"+last).position().top + 15) - $("#coin-title-left").height() ;
	$("#coin-title-left").css("top",top+"px");
	$("#coin-title-left").css("position","absolute");
	$("#coin-title-left").fadeIn();
}

function updateFundMayToLast(year,yearOfShortFall){
	$("#year-may-last").html(year);
	var coinBlue = $('.coinBlue').length;
	if(coinBlue == totalCoin){
		$("#coin-title-right").fadeIn();
	}else if(coinBlue < totalCoin){
		var coinForShortFall = totalCoin - coinBlue;
		if(coinForShortFall > 5){
			var heighAdded = coinForShortFall * ($('.coinBlue').height() / 2 - 5) - 54;
			$("#coin-title-right").fadeIn(function(){
				$(".top-arrow").css("top",100);
				$(".top-arrow").css("position","relative");
				animationShortFall(heighAdded,yearOfShortFall);
			});
		}else{
			$("#coin-title-right").fadeIn(function(){
				$(".top-arrow").css("top",100);
				$(".top-arrow").css("position","relative");
				animationShortFall(42,yearOfShortFall);
			});
		}
		
	}
	
}



function test(){
	setupCoinGrey(20);
	fallingCoinGrey(0,33);
	
	setupCoinBlue(25);
	fallingCoinBlue(0,33);
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