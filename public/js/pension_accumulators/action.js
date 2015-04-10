function registerAction(){
	registerHoverAction();
	registerNextButton();
	registerBackButton();
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
/* this function will register all functions of next button */
function registerNextButton(){

	$('.nextAboutYou').click(function(){
		//handle when user click next button in tab about you.
	});

	$('.nextSavings').click(function(){
		//handle when user click next button in tab savings.
	});

	$('.nextResult').click(function(){
		//handle when user click next button in tab result.
	});

}
/* this function will register all functions of back button */
function registerBackButton(){

	$('.backSavings').click(function(){
		//handle when user click back button in tab savings.
	});

	$('.backResult').click(function(){
		//handle when user click back button in tab Result.
	});

}
function getGender(){
	if($("input:radio[name=optradio]").is(":checked")){
		var gender = $("input:radio[name=optradio]:checked").val();
		return gender;
	}
	return 0;

}
function checkDataAboutYou(){
	var currentAge = $('#current_age').val();
	if(currentAge == ""){
		return $('#current_age').attr('validate-message');
	}
	var gender = getGender();
	if(gender == 0){
		return $("input:radio[name=optradio]").attr('validate-message');
	}
	var currentSalary = $('#current_salary').val();
	if(currentSalary=="" & currentSalary == 0){
		return $('#current_salary').attr('validate-message');
	}
	var targetPension = $('#targetPension').val();
	if( targetPension == "" & targetPension == 0){
		return $('#targetPension').attr('validate-message');
	}
	var ageRetire = $('#ageRetire').val();
	if(parseInt(ageRetire) < parseInt(currentAge)){
		return "retireAge-smaller-than-currentAge";
	}
	return true;
}


function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode;
   if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57))
        return false;

    return true;
}


