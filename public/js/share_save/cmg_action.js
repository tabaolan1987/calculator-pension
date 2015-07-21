/*
----------------Information--------------------------------

1.Pension Accumulators Action JS

2.All function in this file manage the action of user in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/

/* this function just allow user can type numberic only */
function isNumberKey(evt,e){
	var charCode = (evt.which) ? evt.which : event.keyCode;
   if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57)){
		return false;
	}else  if(evt.keyCode == 46 || evt.keyCode == 8){
		return true;
	}
	var vl = parseFloatCMG($(e).val()) + "";
	var maxlength = parseFloatCMG($(e).attr("length"));
	if(vl.length >= maxlength){
		return false;
	}
	
    return true;
}

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

function registerAction(){
	registerHoverAction();
	registerActionShareDetail();
	registerActionResult();
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
			var topTool =  top - 135;
			$("#content-tooltip").css({
				position: 'fixed',
				top: topTool,
				left: left + $(this).width()
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


function registerActionShareDetail(){
	
	
	$('#txt-option-price').on('blur', function() {
		currentOptionPrice = parseFloatCMG($(this).val());
		var vl = parseFloatCMG($(this).val());
		var number = addCommasPence(fixed2Decimal(vl));
		$(this).val(number);
		checkDataDetail();
		isUpdateField = true;
	});
	
	$('#txt-estimated-share').on('blur', function() {
		currentEstimateShare = parseFloatCMG($(this).val());
		var vl = parseFloatCMG($(this).val());
		var number = addCommasPence(fixed2Decimal(vl));
		$(this).val(number);
		checkDataDetail();
		isUpdateField = true;
	});
	
	$('#Calculate').click(function(){
		var check = checkDataDetail();
		if(check.length == 0){
			eneableTabResult();
			$("#results").trigger('click');
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
		var check = checkDataDetail();
		if(check.length > 0){
			var content = warningArray["validate-field"] +" "+ check[0];
			for(var i =1; i < check.length;i++){
				content = content+", " + check[i];
			}
			disableTabResult();
			showWarning(content + "!");
			return false;
		}else{
			eneableTabResult();		
		}
	});
	
	
}

function eneableTabResult(){
	$('#results').attr('href','#tab2');
	$('#results').attr('data-toggle','tab');
}

function disableTabResult(){
	$('#results').removeAttr('href');
	$('#results').removeAttr('data-toggle');
}

function checkDataDetail(){
	var content = new Array();
	var opPrice = $('#txt-option-price').val();
	if(opPrice == "" || typeof opPrice === 'undefined' || opPrice === null){
		content.push("option price");
	}
	var esShare = $('#txt-estimated-share').val();
	if(esShare=="" || typeof esShare === 'undefined' || esShare === null ){
		content.push("share price");
	}
	if(content.length > 0){
		disableTabResult();
	}
	return content;
}


function registerActionResult(){
	$('a[id="results"]').on('shown.bs.tab', function (e) {
		if(isUpdateField == true){
			var monthlySave = getMonthlySaving();
			var durationSave = getDurationSaving();
			var opPrice = getOptionPrice();
			var estimatedShare = getCurrentEstimateShare();
			var amountSaved = getAmountSaved(monthlySave,durationSave);
			var numOption = getNumberOption(amountSaved,opPrice);
			var optValueSold= getOptionValueIfSold(numOption,estimatedShare);
			var estimateProfit  = getEstimateProfit(optValueSold,amountSaved);
			var percentIncrease = getPercentIncrease(optValueSold,amountSaved);
			if(optValueSold > amountSaved){
				showWarning(CGT);
				$('.estimated-return1').show();
				$('.estimated-return2').hide();
				updateMessage(durationSave,amountSaved,numOption,optValueSold,estimateProfit,percentIncrease);
			}else{
				//show the zero value
				$('.estimated-return1').hide();
				$('.estimated-return2').show();
				$('#special-duration-time').html(durationSave);
				$('#special-amount-saved').html(addCommas(round(amountSaved)));
			}
			isUpdateField = false;
		}
	});
	
	$('#BackResults').on('click',function(){
		$("#share-details").trigger('click');
	});
	
}

function updateMessage(durationSave,amountSaved,numOption,optValueSold,estimateProfit,percentIncrease){
	//update Message for result.
	$('.chart-title-estimated').find('span').html(addCommas(fixed2Decimal(optValueSold)));
	$('.chart-title-percentage').find('span').html(addCommas(percentIncrease));
	$('#result-duration-time').html(durationSave);
	$('#span-result-amount-save').html(addCommas(amountSaved));
	$('#result-numOpt').html(addCommas(round(numOption)));
	$('#result-estimate-profit').find('span').html(addCommas(fixed2Decimal(estimateProfit)));
	$('#result-percent-increase').find('span').html(addCommas(percentIncrease));
	//update Message for print.
	
	$('.print-estimate').html(addCommas(fixed2Decimal(optValueSold)));
	$('.print-duration-save').html(durationSave);
	$('.print-amount-saved').html(addCommas(amountSaved));
	$('.print-estimated-profit').html(addCommas(fixed2Decimal(estimateProfit)));
	$('.print-percent-increase').html(addCommas(percentIncrease));
	$('.print-number-option').html(addCommas(round(numOption)));
	var importantText = $("#important-text").html();
	var assumptionText = $("#assump-text").html();
	var disclamerText = $("#disclamer-infor").html();
	$("#disclamer-print").html(disclamerText);
	$("#important-print").html(importantText);
	$("#assump-print").html(assumptionText);
}


function PrintElement(element){
	Popup($(element).html(),"Helvetica Neue"); 
}

function Popup(data,font) 
{
	var mywindow = window.open('', 'CloseBrothers');
	mywindow.document.write('<html><head><title>Sharesave</title>');
	mywindow.document.write('<style type="text/css">@media print{div{font-family: "'+font+'" !important;}}</style>');
	mywindow.document.write('<style type="text/css">@media screen{div{font-family:"'+font+'" !important;}}</style>');
	mywindow.document.write('<style>a{text-decoration : none !important;color : black;}</style>');
	mywindow.document.write('</head><body>');
	mywindow.document.write(data);
	mywindow.document.write('</body></html>');
	mywindow.document.close();
	mywindow.focus(); 
	mywindow.print();
	mywindow.close();
	return true;
}