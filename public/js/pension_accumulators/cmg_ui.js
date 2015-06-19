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
        var heightImage = $(coin).height() / 2 - 5;
        var moveToBottom = heightContainer - (heightImage * index);
        var angle = 70 * (index % 2 === 0 ? 1 : -1);
        $(coin).animateRotate(angle, moveToBottom, 300-heightImage*index, 'linear', function () {  
            if (index < totalCoin) {
                index = index + 1;
                fallingCoin(index,forceCashIncome,shortFall,targetPension,coinBlue,coinRed);
            }else{
				//set visible and height
				setHeightDiv(forceCashIncome,shortFall,targetPension,coinBlue,coinRed);
				eneabledTxtField();
			}
        });
}

function setHeightDiv(forceCashIncome,shortFall,targetPension,coinBlue,coinRed){
	$('.pound-income-inform').html(addCommas(forceCashIncome));
	if(coinBlue > 5 & coinBlue < totalCoin & coinRed  > 5){
		var heighTotalRed = (coinRed * ($('.coinRed').height()/2 -5)) + ($('.coinRed').height()/2); 
		var heightMidInform =  heighTotalRed - $('.arrow-top').height() - $('.arrow-bot').height();
		$('.arrow-mid').css('height',0);
		var hieghtBlueDiv = ($('#coin-container').height() - 25 - heighTotalRed)/2 - $('.bot-arrow').height()/2;
		$('.bot-arrow').css('margin-top',hieghtBlueDiv);
		$('#print-div').css('margin-top',hieghtBlueDiv + 10.5);
		animationShortFall(heightMidInform -2,shortFall);
		animationIncomed();
		return true;
	}else if(coinBlue == totalCoin){
		$('.top-arrow').hide();
		var margin = ($('#coin-container').height() - 25)/2 - $('.bot-arrow').height()/2;
		$('.bot-arrow').css('margin-top',margin);
		$('#print-div').css('margin-top',margin + 10);
		animationIncomed();
		return true;
	}else if(coinBlue <= 5 & coinBlue > 3){
		var heighTotalRed = (coinRed * ($('.coinRed').height()/2 -5)) + ($('.coinRed').height()/2); 
		var heightMidInform =  heighTotalRed - $('.arrow-top').height() - $('.arrow-bot').height();
		$('.arrow-mid').css('height',0);
		$('.bot-arrow').css('margin-top','0');
		if(coinBlue==4){
			$('#print-div').css('margin-top',"2px");
		}else{
			$('#print-div').css('margin-top',"22px");
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
		$('#print-div').css('margin-top',"2px");
		animationIncomed();
		return true;
	}else if(coinRed <= 5){
		var heighTotalRed = (2 * ($('.coinRed').height()/2 -5)) + ($('.coinRed').height()/2); 
		var heightMidInform =  heighTotalRed - $('.arrow-top').height() - $('.arrow-bot').height();
		$('.arrow-mid').css('height',60);
		var hieghtBlueDiv = ($('#coin-container').height() - 25 - $('.top-arrow').height())/2 - $('.bot-arrow').height()/2;
		$('.bot-arrow').css('margin-top',hieghtBlueDiv);
		$('#print-div').css('margin-top',hieghtBlueDiv + 10);
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
			$('.pound-shortfall').html(addCommas(shortFall));
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
	$("#age-to-retirement").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
			min : 55,
			from : 65,
			max : 75,
			grid_margin : true,
            type: 'single',
            step: 1,
            grid: true,
            force_edges: true
    });
    $("#age-to-retirement").val(65);
}

function drawSlidePercentTaxFreeCash(){
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
    $("#percent-tax-free").val(0);
}
function drawSlideAboutYou(){
	drawSlideRetirementAge();
	drawSlidePercentTaxFreeCash();
}
/*------------------------------------------------------------------*/

/* there are functions handle UI of tab result*/
function drawSlideResult(){
	$("#age-to-retirement-result").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
			min : 55,
			max : 75,
			grid_margin : true,
            type: 'single',
            step: 1,
            grid: true,
			onFinish: function () {
				onChangeUI();
			}
    });
	
	$("#percent-tax-free-result").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
			min : 0,
			max : 25,
			grid_margin : true,
			grid_num : 5,
            type: 'single',
            step: 1,
            grid: true,
			onFinish: function () {
				onChangeUI();
			}
    });
}

function drawSlideModalGrowRate(){
	
	$("#slider-modal-growrate").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
			min : 0,
			max : 3,
			from : 1.5,
			postfix : "%",
			grid_margin : true,
			grid_num : 6,
            type: 'single',
            step: 0.5,
            grid: true
    });
	$("#slider-modal-growrate").val(1.5);
}
/*--------------------------------------------*/
function drawSlide(){
drawSlideAboutYou();
drawSlideModalGrowRate();
drawSlideResult();
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

function showWarningLta(taxFree){
	if(taxFree == LTA['value']){
		isReturnLTA = true;
		if(LTA['show-popup'] == 'true'){
			showWarning(LTA['message']);	
		}
		return true;
	}else{
		isReturnLTA = false;
	}
	return false;
}