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
	var html ="start";
	for(var i = 0 ; i < coinblue;i++){
		html = html + "<div class='coinBlue' id='coinBlue"+i+"'></div>";
	}
	html = html.replace("start","");
	$('#coin-container-right').html(html);
}

function setupCoinGrey(coingrey){
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
	$(coin).animateRotate(angle, moveToBottom, 300-heightImage*index, 'linear', function () {
        if (index < coinblue) {
                index = index + 1;
                fallingCoinBlue(index,year);
        }
    });
}

function animationShortFall(height,shortFall){
	$('.shortfall').hide();
	setTimeout(function(){
		$('.top-arrow').show();
		$(".arrow-mid").animate({"height":height}, "slow",function(){
			$('.pound-shortfall').html(Number(shortFall).toLocaleString('en').split('.')[0] + " years");
			$('.shortfall').fadeIn(1000);
		});
	}, 200);
}


/*------------------------------------------------------*/

function drawCalendar(){
	Calendar.setup({
        inputField     :    "txt-birthday",     // id of the input field
        ifFormat       :    "%b %e, %Y",      // format of the input field
        button         :    "image-calendar-trigger",  // trigger for the calendar (button ID)
        align          :    "Bl",           // alignment (defaults to "Bl") Tl
        singleClick    :    true
    });
	

}

/*------------------------------------------------------*/
/* there are functions handle UI of tab About you */
function drawSlidePercentTaxFreeCash(){
	var labelStage = ["0","5","10","15","20","25"];
	$("#percent-tax-free").slider({min: 0,max: 25,step: 1}).slider("pips", {rest: "label",step: 5,
	label: labelStage}).slider("float");
}

/*------------------------------------------------------------------*/

function drawSlideModalGrowRate(){
	var labelStage = ["0","0.5","1","1.5","2","2.5","3"];
	$("#slider-modal-growrate").slider({min: 0,max: 3,step: 0.5,value:1.5}).slider("pips", {rest: "label",step: 0.5,
	label: labelStage}).slider("float").on("slidechange", function(e,ui) {
		var value = $("#slider-modal-growrate").slider().slider('value');
		$("#slider-modal-growrate").find('.ui-slider-tip').html(value+'%');
    });
	$("#slider-modal-growrate").find('.ui-corner-all').mouseover(function(){
		var value = $("#slider-modal-growrate").slider().slider('value');
		$("#slider-modal-growrate").find('.ui-slider-tip').html(value+'%');
	});

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