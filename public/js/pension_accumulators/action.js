function registerAction(){
	registerHoverAction();
	registerActionAboutYou();
	registerActionSavingTab();
	
}
/* this function handle the action hover the information image */
function registerHoverAction(){
	$(document).on("mouseover",".icon-tooltip",function() {
		//alert('mouseover');
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
	
	calculatePersonalPay("txt-you-paying","txt-you-paying-percent");
	calculateCompanyPay("txt-your-employer","txt-your-employer-percent");
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

function calculatePersonalPay(idCash,idPercent){
	$('#'+idCash).on('blur',function(){
		var percent = $('#'+idPercent).val();
		if(percent == '' || typeof percent === 'undefined' || percent === null){
			var currentSalary = parseFloat($('#txt-current-salary').val());
			var valueCash = parseFloat($(this).val());
			percent = getPercent_Contribute(valueCash,currentSalary);
			percent = percent*100;
			$('#'+idPercent).val(percent);
		}
	});
	$('#'+idPercent).on('blur',function(){
		var cash = $('#'+idCash).val();
		if(cash == '' || typeof cash === 'undefined' || cash === null){
			var currentSalary = parseFloat($('#txt-current-salary').val());
			var percent = parseFloat($(this).val());
			cash = getCash_Contribute(percent,currentSalary);
			cash = cash*100;
			$('#'+idCash).val(cash);
		}
	});
}

function calculateCompanyPay(idCash,idPercent){
	$('#'+idCash).on('blur',function(){
		var percent = $('#'+idPercent).val();
		if(percent == '' || typeof percent === 'undefined' || percent === null){
			var currentSalary = parseFloat($('#txt-current-salary').val());
			var valueCash = parseFloat($(this).val());
			percent = getPercent_Contribute(valueCash,currentSalary);
			percent = percent*100;
			$('#'+idPercent).val(percent);
		}
	});
	$('#'+idPercent).on('blur',function(){
		var cash = $('#'+idCash).val();
		if(cash == '' || typeof cash === 'undefined' || cash === null){
			var currentSalary = parseFloat($('#txt-current-salary').val());
			var percent = parseFloat($(this).val());
			cash = getCash_Contribute(percent,currentSalary);
			percent = percent*100;
			$('#'+idCash).val(cash);
		}
	});
}
/*-----------------------------------------------------------------*/


/* this is action for tab results */
function registerActionResultTab(){
	$('a[href="#tab3"]').on('shown.bs.tab', function (e) {
		setupMessage();
		setupForecastIncomeMessage();
	});
}


function setupMessage(){
	var yourRetirementDate = yourRetirementDate();
	$('#').html(yourRetirementDate);
	var retirementAge = $('#age-to-retirement').slider().slider('value');
	$('#').html(retirementAge);
}
function setupForecastIncomeMessage(){
	var forceCash = getForecastIncome();
	$('#').html(forceCash);
	
}


function setTextToTextField(){
	var cashContribute = getCash_Contribute();
	var ContributePercent = getPercent_Contribute();
	$('#').val(cashContribute);
	$('#').val(cashContributePercent);
	
	var cashContriCompany = getCash_Contribute_company();
	var percentContriConpany = getPercent_Contribute_company();
	$('#').val(cashContriCompany);
	$('#').val(percentContriConpany);
}

function setAutoUpdateTextField(){

}


