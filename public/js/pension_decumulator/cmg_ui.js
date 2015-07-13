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

function setupCoinBlue(coinblue){
	$("#coin-title-right").hide();
	var html ="start";
	for(var i = 0 ; i < coinblue;i++){
		html = html + "<div class='coinBlue' id='coinBlue"+i+"'></div>";
	}
	html = html.replace("start","");
	
	$('#coin-container-right').html(html);
	
}

function setupCoinGrey(coingrey){
	$("#coin-title-left").hide();
	var html ="start";
	for(var i = 0 ; i < coingrey;i++){
		html = html + "<div class='coingrey' id='coingrey"+i+"'></div>";
	}
	html = html.replace("start","");
	$('#coin-container-left').html(html);
}


function fallingCoinGrey(index,year){
	isCalculate = true;
	var coingrey = $('.coingrey').length;
	if(index == coingrey){
		updateFundNeedToLast(year);
		return;
	}
	var coin = "#coingrey"+index;
	$(coin).show();
	var heightContainer = $('#coin-container-left').height() -50;
	var heightImage = $(coin).height() / 2 - 5;
	var moveToBottom = heightContainer - (heightImage * index);
	var angle = 70 * (index % 2 === 0 ? 1 : -1);
	$(coin).animateRotate(angle, moveToBottom, 300-heightImage*index, 'linear', function () {
        if (index < coingrey) {
            index = index + 1;
            fallingCoinGrey(index,year);
        }
    });
}


function fallingCoinBlue(index,year,yearOfShortFall){
	$('.top-arrow').hide();
	isCalculate = true;
	var coinblue = $('.coinBlue').length;
	if(index == coinblue){
		updateFundMayToLast(year,yearOfShortFall);
		return;
	}
	var coin = "#coinBlue"+index;
	$(coin).show();
	var heightContainer = $('#coin-container-right').height() - 50;
	var heightImage = $(coin).height() / 2 - 5;
	var moveToBottom = heightContainer - (heightImage * index);
	var angle = 70 * (index % 2 === 0 ? 1 : -1);
	$(coin).animateRotate(angle, moveToBottom, 400-heightImage*index, 'linear', function () {
        if (index < coinblue) {
                index = index + 1;
                fallingCoinBlue(index,year,yearOfShortFall);
        }
    });
}

function animationShortFall(height,shortFall){
	$('.shortfall').hide();
	setTimeout(function(){
		$('.top-arrow').show();
		//$(".arrow-mid").css("height",0);
		$(".arrow-mid").css("padding-top","0px");
		$(".arrow-mid").animate({"height":height}, "slow",function(){
			$('.pound-shortfall').html(getStringYear(shortFall));
			$('.shortfall').fadeIn(1000);
			$(".arrow-mid").css("padding-top",(height/2-22)+"px");
			eneableButton();
		});
	}, 1000);
}


function updateFundNeedToLast(year){
	$("#year-need-last").html(year);
	var coingrey = $('.coingrey').length;
	var last = coingrey -1;
	var top = ($("#coingrey"+last).position().top + 15) - $("#coin-title-left").height() ;
	var paddingTop = $("#coin-title-left").css("padding-top");
	var numberAdded = accounting.unformat(paddingTop);
	$("#coin-title-left").css("top",(top - numberAdded)+"px");
	$("#coin-title-left").css("position","relative");
	$("#coin-title-left").fadeIn();
	
	$("#coin-title-right").css("top",(top - numberAdded)+"px");
	$(".top-arrow").css("top",(top - numberAdded)+"px");
	$(".top-arrow").css("position","relative");
}

function updateFundMayToLast(year,yearOfShortFall){
	$("#year-may-last").html(getStringYear(year));
	var coinBlue = $('.coinBlue').length;
	if(coinBlue == totalCoin){
		$("#coin-title-right").css("top","6px");
		$(".top-arrow").css("top","6px");
		$("#coin-title-right").fadeIn();
	}else if(coinBlue < totalCoin){
		var coinForShortFall = totalCoin - coinBlue;
		if(coinForShortFall > 5){
			var numberDecimal = 5;
			if($('.coinBlue').height() == 49){
				numberDecimal = 4;
			}
			var heighAdded = (coinForShortFall*($('.coinBlue').height() / 2 - numberDecimal))-($(".arrow-top").height()*2) ;
			$("#coin-title-right").fadeIn(function(){
				animationShortFall(heighAdded,yearOfShortFall);
			});
		}else{
			$("#coin-title-right").fadeIn(function(){
				animationShortFall(42,yearOfShortFall);
			});
		}
		
	}
	
}


/*------------------------------------------------------*/

function drawCalendar(){

	/*Calendar.setup({
        inputField     :    "txt-birthday",     // id of the input field
        ifFormat       :    "%b %e, %Y",      // format of the input field
        button         :    "image-calendar-trigger",  // trigger for the calendar (button ID)
        align          :    "Bl",           // alignment (defaults to "Bl") Tl
        singleClick    :    true,
		onUpdate : function (){
			isUpdate = true;
		}
    });*/

    var cal = Calendar.setup({
	    inputField : "txt-birthday",
	    trigger    : "image-calendar-trigger",
		dateFormat : "%e %b %Y",
	    onSelect   : function() { this.hide() ;isUpdate=true;}
		
	});
	
	//cal.manageFields("image-calendar-trigger", "txt-birthday", "%b %e, %Y");
	
	//fix vertical-align mid for ie8
	/*$("#image-calendar-trigger").click(function(){
	    $("#txt-birthday").focus();
	});*/

}

/*------------------------------------------------------*/
/* there are functions handle UI of tab About you */
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
            grid: true,
			onFinish: function () {
				isUpdate = true;
				currentTaxPercent = $("#percent-tax-free").val();
			}
    });
}

/*------------------------------------------------------------------*/

function drawSlideModalGrowRate(){
	$("#slider-modal-growrate").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
			min : 0,
			max : 3,
			from :1.5,
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
$('.draw-chart').show();
$('.right-content-default').hide();
}

function hideChartRight(){
$('.right-content-draw').hide();
$('.draw-chart').hide();
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