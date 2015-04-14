function registerAction(){
	registerHoverAction();
	registerActionAboutYou();
	registerActionSavingTab();
	registerActionResultTab();
	
}
/* this function handle the action hover the information image */
function registerHoverAction(){
	$(document).on("mouseover",".icon-tooltip",function() {
		var attrName = $(this).attr('information-message');
		var content = InformationArray[attrName];
		$("#content-tooltip").html(content);
		var height = $("#content-tooltip").height();
		var top = $(this).offset().top;
		var left = $(this).offset().left;
		$("#content-tooltip").css({
			position: 'absolute',
			top: (top - height) + 35,
			left: left - 5
		});
		$("#content-tooltip").show();
	}
	);

	$(document).on("mouseout",".icon-tooltip",function() {
		$("#content-tooltip").hide();		
	}
	);
}
/* this function just allow user can type numberic only */
function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode;
   if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57))
        return false;

    return true;
}


/* there are actions for tab about you*/
function registerActionAboutYou(){
	
	$('.text-about-you').on('input', function() {
		var check = checkDataAboutYou();
		if(check == true){
			eneableTabSavings();
		}else{
			disableTabSavings();
		}
	});
	$("input:radio[name=optradio]").change(function(){
		var check = checkDataAboutYou();
		if(check == true){
			eneableTabSavings();
		}else{
			disableTabSavings();
		}
	});
	

	$('#nextAboutYou').click(function(){
		//handle when user click next button in tab about you.
		var check = checkDataAboutYou();
		if(check == true){
			eneableTabSavings();
			$("#savings").trigger('click');
		}else{
			var content = warningArray[check];
			console.log(content + check);
			disableTabSavings();
			showWarning(content);
		}
	});
	
	$('#savings').click(function(){
		var check = checkDataAboutYou();
		if(check != true){
			var content = warningArray[check];
			console.log(content + check);
			disableTabSavings();
			showWarning(content);
			return false;
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
	var currentAge = $('#txt-current-age').val();
	if(currentAge == "" || typeof currentAge === 'undefined' || currentAge === null){
		var name = $('#txt-current-age').attr('validate-message');
		console.log("name" + name);
		return name;
	}
	var gender = getGender();
	if(gender == 0){
		return $("#male").attr('validate-message');
	}
	var currentSalary = $('#txt-current-salary').val();
	if(currentSalary=="" || currentSalary == 0){
		return $('#txt-current-salary').attr('validate-message');
	}
	var targetPension = $('#txt-target-pensions').val();
	if( targetPension == "" & targetPension == 0){
		return $('#txt-target-pensions').attr('validate-message');
	}
	var ageRetire = $('.retirementAge').slider().slider('value');
	if(parseInt(ageRetire) < parseInt(currentAge)){
		return "retireAge-smaller-than-currentAge";
	}
	return true;
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
	if(deffer_pen.length > 0){
		return true;
	}
	var current_pen = $('#txt-current-pensions').val();
	if(current_pen.length > 0){
		return true;
	}
	
	var seft_pay =  $('#txt-you-paying').val();
	if(seft_pay.length > 0){
		return true;
	}
	
	var company_pay = $('#txt-your-employer').val();
	if(company_pay.length > 0){
		return true;
	}
	
	return false;
}

function registerActionSavingTab(){
	
	$('#results').click(function(){
		var check = checkDataSaving();
		if(check != true){
			var nameWarning = $('#txt-deffered-pensions').attr('validate-message');
			var content = warningArray[nameWarning];
			showWarning(content);
			return false;
		}
	});
	$("input:radio[name=company-pension]").change(function(){
		var val = $(this).attr("id");
		if(val == "yes"){
			$('.final-salary').show();
		}else{
			$('.final-salary').hide();
		}
	});
	
	$('.text-savings').on('input', function() {
		var check = checkDataSaving();
		if(check == true){
			eneableTabResult();
		}else{
			disableTabResult();
		}
	});
	
	$('#nextSavings').click(function(){
		if(isBox1Visible()){
			var check = checkDataSaving();
			if(check == true){
				eneableTabResult();
				hiddenBox1();
			}else{
				disableTabResult();
				var nameWarning = $('#txt-deffered-pensions').attr('validate-message');
				var content = warningArray[nameWarning];
				showWarning(content);
			}
		}else if(isBox2Visible()){
			$('#results').trigger('click');
		}
	});
	
	$('#backSavings').click(function(){
		if(isBox1Visible()){
			$('#about-you').trigger('click');
		}else if(isBox2Visible()){
			hiddenBox2();
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

function calculatePersonalPay(){
	$('#txt-you-paying').on('input',function(){
		var percent = $('#txt-you-paying-percent').val();
		//if(percent == '' || typeof percent === 'undefined' || percent === null){
			percent = getPercent_Contribute();
			percent = percent*100;
			$('#txt-you-paying-percent').val(percent);
		//}
	});
	$('#txt-you-paying-percent').on('input',function(){
		var cash = $('#txt-you-paying').val();
		//if(cash == '' || typeof cash === 'undefined' || cash === null){
			cash = getCash_Contribute();
			cash = cash*100;
			$('#txt-you-paying').val(cash);
		//}
	});
}

function calculateCompanyPay(){
	$('#txt-your-employer').on('input',function(){
		var percent = $('#txt-your-employer-percent').val();
		//if(percent == '' || typeof percent === 'undefined' || percent === null){
			percent = getPercent_Contribute_company();
			percent = percent*100;
			$('#txt-your-employer-percent').val(percent);
		//}
	});
	$('#txt-your-employer-percent').on('input',function(){
		var cash = $('#txt-your-employer').val();
		//if(cash == '' || typeof cash === 'undefined' || cash === null){
			cash = getCash_Contribute_company();
			cash = cash*100;
			$('#txt-your-employer').val(cash);
		//}
	});
}
/*-----------------------------------------------------------------*/


/* this is action for tab results */
function registerActionResultTab(){
	$('a[id="results"]').on('shown.bs.tab', function (e) {
		setupMessage();
		eneabledSummary()
		setTextToTextField();
		drawChart();
		setupSlide();
		onChange();
	});
	
	$('#nextResult').on('click',function(){
		$('#summary').trigger('click');
	});
	
	$('#backResult').on('click',function(){
		$('#savings').trigger('click');
	});
}

function eneabledSummary(){
	$('#summary').attr('href','#tab4');
	$('#summary').attr('data-toggle','tab');
}
function setupMessage(){
	var yRD = yourRetirementDate();
	$('#year-retire').html(yRD);
	var rA = $('#age-to-retirement').slider().slider('value');
	$('#age-retire').html(rA);
	var forceCash = getForecastIncome();
	forceCash = Number(forceCash).toLocaleString('en').split('.')[0];
	$('#pound-per-year').html(forceCash);
}


function setupSlide(){
	var rA = $('#age-to-retirement').slider().slider('value');
	$("#age-to-retirement-result").slider().slider('value',rA);
	var cFP = $('#percent-tax-free').slider().slider('value');
	$('#percent-tax-free-result').slider().slider('value',cFP);
}
function setTextToTextField(){
	var cashContribute = getCash_Contribute();
	var ContributePercent = getPercent_Contribute();
	$('#txt-you-paying-result').val(cashContribute);
	$('#txt-you-paying-percent-result').val(ContributePercent*100);
	
	var cashContriCompany = getCash_Contribute_company();
	var percentContriConpany = getPercent_Contribute_company();
	$('#txt-your-employer-result').val(cashContriCompany);
	$('#txt-your-employer-percent-result').val(percentContriConpany*100);
	
	var targetPension = $('#txt-target-pensions').val();
	$('#txt-target-pensions-result').val(targetPension);
	
	//$('#oneOffLumpSum').val(0);
}

function disableTxtField(){
	$('#txt-your-employer-percent-result').attr("disabled","disabled");
	$('#txt-your-employer-result').attr("disabled","disabled");
	$('#txt-you-paying-percent-result').attr("disabled","disabled");
	$('#txt-you-paying-result').attr("disabled","disabled");
	$('#txt-target-pensions-result').attr("disabled","disabled");
	$('#oneOffLumpSum').attr("disabled","disabled");
}
function eneabledTxtField(){
	$('#txt-your-employer-percent-result').removeAttr("disabled");
	$('#txt-your-employer-result').removeAttr("disabled");
	$('#txt-you-paying-percent-result').removeAttr("disabled");
	$('#txt-you-paying-result').removeAttr("disabled");
	$('#txt-target-pensions-result').removeAttr("disabled");
	$('#oneOffLumpSum').removeAttr("disabled");
}
function onChange(){
	$('#txt-your-employer-percent-result').on('change',function(){
		$('#txt-your-employer-percent').val($(this).val());
		var cash = $('#txt-your-employer-result').val();
		//if(cash == '' || typeof cash === 'undefined' || cash === null){
			cash = getCash_Contribute_company();
			percent = percent*100;
			$('#txt-your-employer').val(cash);
			$('#txt-your-employer-result').val(cash);
		//}
		drawChart();	
	});
	$('#txt-your-employer-result').on('change',function(){
		$('#txt-your-employer').val($(this).val());
		var percent = $('#txt-your-employer-percent-result').val();
		//if(percent == '' || typeof percent === 'undefined' || percent === null){
			percent = getPercent_Contribute_company();
			percent = percent*100;
			$('#txt-your-employer-percent-result').val(percent);
			$('#txt-your-employer-percent').val(percent);
		//}
		drawChart();
	
	});
	$('#txt-you-paying-percent-result').on('change',function(){
		$('#txt-you-paying-percent-result').val($(this).val());
		var cash = $('#txt-you-paying-result').val();
		//if(cash == '' || typeof cash === 'undefined' || cash === null){
			cash = getCash_Contribute();
			cash = cash*100;
			$('#txt-you-paying').val(cash);
			$('#txt-you-paying-result').val(cash);
		//}
		drawChart();
	});
	$('#txt-you-paying-result').on('change',function(){
		$('#txt-you-paying').val($(this).val());
		var percent = $('#txt-you-paying-percent-result').val();
		//if(percent == '' || typeof percent === 'undefined' || percent === null){
			percent = getPercent_Contribute();
			percent = percent*100;
			$('#txt-you-paying-percent').val(percent);
			$('#txt-you-paying-percent-result').val(percent);
		//}		
		drawChart();
	});
	$('#txt-target-pensions-result').on('change',function(){
		$('#txt-target-pensions').val($(this).val());
		drawChart();
	});
	$('#oneOffLumpSum').on('change',function(){
		drawChart();
	});
	
	$("input:radio[name='an-grow-percent']").on('change',function(){
		drawChart();
		$('#estimated-annual-modal').modal('hide');
	});
}

function drawChart(){
	disableTxtField();
	$('.top-arrow').hide();
	$('.bot-arrow').hide();
	setupMessage();
	var forceCashIncome = getForecastIncome();
	var shortFall = getShortFall();
	var targetPension = $('#txt-target-pensions').val();
	var coinBlue = getCoinBlue(forceCashIncome,targetPension);
	console.log(coinBlue);
	var coinRed = getCoinRed(coinBlue);
	console.log("targetPension " + Number(targetPension).toLocaleString('en').split('.')[0]);
	$('.pound-annual-income').html(Number(targetPension).toLocaleString('en').split('.')[0]);
	//prepare for setup coin
	setupCoin(coinBlue,coinRed);
	fallingCoin(1);
}
/*------------------------------------------------------------------*/
