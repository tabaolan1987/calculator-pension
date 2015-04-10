function registerAction(){
	registerHoverAction();
	registerActionAboutYou();
}
/* this function handle the action hover the information image */
function registerHoverAction(){
	$(document).on("mouseover",".icon-tooltip",function() {
		//alert('mouseover');
		var attrName = $(this).attr('information-message');
		var content = InformationArray[attrName];
		$("#content-tooltip").html(content);
		var height = $("#content-tooltip").height();
		console.log(height);
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
		return $("#gender-radio").attr('validate-message');
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
	var deffer_pen = $('#').val();
	if(deffer_pen.length > 0){
		return true;
	}
	var current_pen = $('#').val();
	if(current_pen.length > 0){
		return true;
	}
	
	var seft_pay =  $('#').val();
	if(seft_pay.length > 0){
		return true;
	}
	
	var company_pay = $('#').val();
	if(company_pay.length > 0){
		return true;
	}
	
	return false;
}

function registerActionSavingTab(){
	
	$('#savings').click(function(){
		var check = checkDataSaving();
		if(check != true){
			var nameWarning = $('#').attr('validate-message');
			var content = warningArray[nameWarning];
			showWarning(content);
		}
	});
	$("input:radio[name=]").change(function(){
		var val = $(this).val();
		if(val == "Yes"){
			$('.').show();
		}else{
			$('.').hide();
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
		if(isSav1Visible()){
			var check = checkDataSaving();
			if(check == true){
				eneableTabResult();
				hiddenSav1();
			}else{
				disableTabResult();
				var nameWarning = $('#').attr('validate-message');
				var content = warningArray[nameWarning];
				showWarning(content);
			}
		}else if(isSav2Visible()){
			$('#results').trigger('click');
		}
	});
	
	$('#backSavings').click(function(){
		if(isSav1Visible()){
			$('#about-you').trigger('click');
		}else if(isSav2Visible()){
			hiddenSav2();
		}
	});
	
	
	

}

function hiddenBox1(){
	$('.box1').hide();
	$('.box2').show();
}

function hiddenBox2(){
	$('.box1').show();
	$('.box2').hide();
}
function isBox1Visible(){
	if($('.box1').is(":visible")){
		return true;
	}else{
		return false;
	}
}

function isBox2Visible(){
	if($('.box2').is(":visible")){
		return true;
	}else{
		return false;
	}
}

