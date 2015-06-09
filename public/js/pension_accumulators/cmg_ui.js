var isCalculate = false;
$.fn.animatecss = function (classes, callback) {
    return this.addClass(classes).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', callback);
};
$.fn.animateRotate = function(angle, top, duration, easing, complete) {
  return this.each(function() {
    var $elem = $(this);
    var startTop = $elem.position().top;
    $({top: startTop}).animate({top: top}, {
      duration: duration,
      easing: easing,
      step: function(now) {
        var currentDeg = (1- now/top)*angle;
        $elem.css({
           transform: 'rotate(' + currentDeg + 'deg)',
           top: now
         });
      },
      complete: complete || $.noop
    });
  });
};

function setupCoin(coinBlue,coinRed){
	if(coinBlue > 0){
		var html = "<div class='coinBlue' id='coin1'></div>";
	}else{
		var html = "<div class='coinRed' id='coin1'></div>";
	}
	for(var i = 2 ; i <= totalCoin ;i++){
		if(i > coinBlue){
			html = html + "<div class='coinRed' id='coin"+i+"'></div>";
		}else{
			html = html + "<div class='coinBlue' id='coin"+i+"'></div>";
		}	
	}
	$('#coin-container').html(html);
}
function fallingCoin(index,forceCashIncome,shortFall,targetPension,coinBlue,coinRed) {
		isCalculate = true;
		var coin = "#coin"+index;
        $(coin).show();
        var heightContainer = $('#coin-container').height() - 25;
		console.log('heightContainer :' + heightContainer);
        var heightImage = $(coin).height() / 2 - 5;
        var moveToBottom = heightContainer - (heightImage * index);
        var angle = 70 * (index % 2 === 0 ? 1 : -1);
        $(coin).animateRotate(angle, moveToBottom, 300-heightImage*index, 'linear', function () {  
            if (index < totalCoin) {
                index = index + 1;
                fallingCoin(index,forceCashIncome,shortFall,targetPension,coinBlue,coinRed);
            }else{
				//set visible and height
				console.log('coin done');
				setHeightDiv(forceCashIncome,shortFall,targetPension,coinBlue,coinRed);
				eneabledTxtField();
			}
        });
}

function setHeightDiv(forceCashIncome,shortFall,targetPension,coinBlue,coinRed){
	$('.pound-income-inform').html(Number(forceCashIncome).toLocaleString('en').split('.')[0]);
	if(coinBlue > 5 & coinBlue < totalCoin & coinRed  > 5){
		var heighTotalRed = (coinRed * ($('.coinRed').height()/2 -5)) + ($('.coinRed').height()/2); 
		var heightMidInform =  heighTotalRed - $('.arrow-top').height() - $('.arrow-bot').height();
		$('.arrow-mid').css('height',0);
		var hieghtBlueDiv = ($('#coin-container').height() - 25 - heighTotalRed)/2 - $('.bot-arrow').height()/2;
		$('.bot-arrow').css('margin-top',hieghtBlueDiv);
		$('#print-div').css('margin-top',hieghtBlueDiv + 9);
		animationShortFall(heightMidInform -2,shortFall);
		animationIncomed();
		return true;
	}else if(coinBlue == totalCoin){
		$('.top-arrow').hide();
		var margin = ($('#coin-container').height() - 25)/2 - $('.bot-arrow').height()/2;
		$('.bot-arrow').css('margin-top',margin);
		$('#print-div').css('margin-top',margin + 7);
		animationIncomed();
		return true;
	}else if(coinBlue <= 5 & coinBlue > 3){
		var heighTotalRed = (coinRed * ($('.coinRed').height()/2 -5)) + ($('.coinRed').height()/2); 
		var heightMidInform =  heighTotalRed - $('.arrow-top').height() - $('.arrow-bot').height();
		$('.arrow-mid').css('height',0);
		$('.bot-arrow').css('margin-top','0');
		if(coinBlue==4){
			$('#print-div').css('margin-top',"-1px");
		}else{
			$('#print-div').css('margin-top',"19px");
		}
		animationShortFall(heightMidInform - 4,shortFall);
		animationIncomed();
		return true;
	}else if(coinBlue <= 3){
		coinRed = 21;
		var heighTotalRed = (coinRed * ($('.coinRed').height()/2 -5)) + ($('.coinRed').height()/2); 
		var heightMidInform =  heighTotalRed - $('.arrow-top').height() - $('.arrow-bot').height();
		var isXs = checkScreenXsSM();
		$('.arrow-mid').css('height',0);
		if(isXs == true){
			animationShortFall(heightMidInform,shortFall);
		}else{
			animationShortFall(heightMidInform -4,shortFall);
		}
		
		$('.bot-arrow').css('margin-top','0');
		$('#print-div').css('margin-top',"-1px");
		animationIncomed();
		return true;
	}else if(coinRed <= 5){
		console.log('height top-arrow:' + $('.top-arrow').height());
		var heighTotalRed = (2 * ($('.coinRed').height()/2 -5)) + ($('.coinRed').height()/2); 
		var heightMidInform =  heighTotalRed - $('.arrow-top').height() - $('.arrow-bot').height();
		$('.arrow-mid').css('height',60);
		var hieghtBlueDiv = ($('#coin-container').height() - 25 - $('.top-arrow').height())/2 - $('.bot-arrow').height()/2;
		$('.bot-arrow').css('margin-top',hieghtBlueDiv);
		$('#print-div').css('margin-top',hieghtBlueDiv + 7);
		animationShortFall(heightMidInform -2,shortFall);
		animationIncomed();
		return true;
	}
}

function animationShortFall(height,shortFall){
	$('.shortfall').hide();
	setTimeout(function(){
		$('.top-arrow').show();
		$(".arrow-mid").animate({"height":height}, "slow",function(){
			$('.pound-shortfall').html(Number(shortFall).toLocaleString('en').split('.')[0]);
			$('.shortfall').fadeIn(1000);
		});
	}, 200);
}

function animationIncomed(){
	$('#print-div').hide();	
	setTimeout(function(){
		$('.bot-arrow').show();
		var left =  $(".bot-arrow").offset().left;
		$(".bot-arrow").css({left:left}).animate({"left":"10px"}, "slow",function(){
			$('.bot-arrow-pension').show();
			$('#print-div').fadeIn(2500);
		});
	}, 1000);
	
}

/*------------------------------------------------------*/
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


/*------------------------------------------------------*/
/* there are functions handle UI of tab About you */
function drawSlideRetirementAge(){
	var labelStage = ["55","60","65","70","75"];
	//$("#age-to-retirement").slider({min: 55,max: 75,step: 1,value:65}).slider("pips", {rest: "label",step: 5,
	//label: labelStage}).slider("float");
	$("#age-to-retirement").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
			min : 55,
			max : 75,
			grid_margin : true,
			grid_num : 5,
            type: 'single',
            step: 1,
            grid: true
    });
}

function drawSlidePercentTaxFreeCash(){
	var labelStage = ["0","5","10","15","20","25"];
	//$("#percent-tax-free").slider({min: 0,max: 25,step: 1}).slider("pips", {rest: "label",step: 5,
	//label: labelStage}).slider("float");
	$("#percent-tax-free").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
			min : 0,
			max : 25,
			grid_margin : true,
			grid_num : 5,
            type: 'single',
            step: 1,
            grid: true
    });
}
function drawSlideAboutYou(){
	drawSlideRetirementAge();
	drawSlidePercentTaxFreeCash();
}
/*------------------------------------------------------------------*/

/* there are functions handle UI of tab result*/
function drawSlideResult(ageRetire,percentTaxFree){
	var label = ["55","60","65","70","75"];
	//$("#age-to-retirement-result").slider({min: 55,max: 75,step: 1,value:ageRetire}).slider("pips", {rest: "label",step: 5,
	//label: label}).slider("float");
	$("#age-to-retirement-result").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
			min : 55,
			max : 75,
			grid_margin : true,
			grid_num : 5,
            type: 'single',
            step: 1,
            grid: true
    });
	
	var labelStage = ["0","5","10","15","20","25"];
	//$("#percent-tax-free-result").slider({min: 0,max: 25,step: 1,value:percentTaxFree}).slider("pips", {rest: "label",step: 5,
	//label: labelStage}).slider("float");
	$("#percent-tax-free-result").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
			min : 0,
			max : 25,
			grid_margin : true,
			grid_num : 5,
            type: 'single',
            step: 1,
            grid: true
    });
}

function drawSlideModalGrowRate(){
	var labelStage = ["0","0.5","1","1.5","2","2.5","3"];
	//$("#slider-modal-growrate").slider({min: 0,max: 3,step: 0.5,value:1.5}).slider("pips", {rest: "label",step: 0.5,
	//label: labelStage}).slider("float").on("slidechange", function(e,ui) {
		//var value = $("#slider-modal-growrate").slider().slider('value');
		//$("#slider-modal-growrate").find('.ui-slider-tip').html(value+'%');
   // });
	//$("#slider-modal-growrate").find('.ui-corner-all').mouseover(function(){
		//var value = $("#slider-modal-growrate").slider().slider('value');
		//$("#slider-modal-growrate").find('.ui-slider-tip').html(value+'%');
	//});
	$("#slider-modal-growrate").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
			min : 0,
			max : 3,
			grid_margin : true,
			grid_num : 0.5,
            type: 'single',
            step: 0.5,
            grid: true
    });

}
/*--------------------------------------------*/
function drawSlide(){
drawSlideAboutYou();
//drawSlideModalGrowRate();
}
function showWarning(content){
//will show warning.
$('#warningModal').find('.modal-body').html(content);
$('#warningModal').modal('show');
}

function showInfor(top,left,content){
//will show Information.
$('#infor').html(content);
$('#infor').css('top',top);
$('#infor').css('left',left);
$('#infor').show();
}

function hideInfor(){
$('#infor').hide();
}
function showChartRight(){
$('.right-content-draw').show();
$('.right-content-default').hide();
}

function hideChartRight(){
$('.right-content-draw').hide();
$('.right-content-default').show();
}
function checkScreenXsSM(){
	if($('#check-ui').is(":visible")){
		return false;
	}else{
		return true;
	}
}
function showRightContent(){
	$('#right-content').show();
}
function hideRightContent(){
	$('#right-content').hide();
}

function drawRightContent(){
	var checkSize = checkScreenXsSM();
	if(checkSize == true && isCalculate == false){
		hideRightContent();
	}else{
		showRightContent();
	}
}