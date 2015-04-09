/* this function handle the action hover the information image */
function registerHoverAction(){
	$(document).on("mouseover",".icon-tooltip",function() {
		//alert('mouseover');
		var attrName = $(this).attr('name');
		var content = InformationArray[attrName];
		console.log(content);
		//added content to popup and change the color
	}
	);

	$(document).on("mouseout",".icon-tooltip",function() {
		//hidden the popup and change the color	
		console.log('mouseout');		
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


