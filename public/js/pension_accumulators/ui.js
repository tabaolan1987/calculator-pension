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
          //console.log(now);
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
	var html = "<div class='coinBlue' id='coin1'></div>";
	for(var i = 2 ; i <= totalCoin ;i++){
		if(i > coinBlue){
			html = html + "<div class='coinRed' id='coin"+i+"'></div>";
		}else{
			html = html + "<div class='coinBlue' id='coin"+i+"'></div>";
		}	
	}
	$('#container-coin').html(html);
}
function fallingCoin(index) {
		var coin = "#coin"+index;
        $(coin).show();
        var heightContainer = $('#container-coin').height() - 25;
        var heightImage = $(coin).height() / 2 - 5;
        var moveToBottom = heightContainer - (heightImage * index);
        var angle = 70 * (index % 2 === 0 ? 1 : -1);
        $(coin).animateRotate(angle, moveToBottom, 1000-heightImage*index, 'linear', function () {  
            if (index < totalCoin) {
                index = index + 1;
                fallingCoin(index);
            }
        });
}
/*------------------------------------------------------*/
/* there are functions handle UI of tab About you */
function drawSlideRetirementAge(){
	var labelStage = ["55","60","65","70","75"];
	$("#age-to-retirement").slider({min: 55,max: 75,step: 1,value:65}).slider("pips", {rest: "label",step: 5,
	label: labelStage}).slider("float");
}

function drawSlidePercentTaxFreeCash(){
	var labelStage = ["0","5","10","15","20","25"];
	$("#percent-tax-free").slider({min: 0,max: 25,step: 1}).slider("pips", {rest: "label",step: 5,
	label: labelStage}).slider("float");
}
function drawSlideAboutYou(){
	drawSlideRetirementAge();
	drawSlidePercentTaxFreeCash();
}
/*------------------------------------------------------------------*/

/* there are functions handle UI of tab result*/
function drawSlideResult(ageRetire,percentTaxFree){
	var label = ["55","60","65","70","75"];
	$("#age-to-retirement-result").slider({min: 55,max: 75,step: 1,value:ageRetire}).slider("pips", {rest: "label",step: 5,
	label: label}).slider("float").on("slidechange", function(e,ui) {
        var value = $("#age-to-retirement-result").slider().slider('value');
		$("#age-to-retirement").slider().slider('value',value);
    });
	
	var labelStage = ["0","5","10","15","20","25"];
	$("#percent-tax-free-result").slider({min: 0,max: 25,step: 1,value:percentTaxFree}).slider("pips", {rest: "label",step: 5,
	label: labelStage}).slider("float").on("slidechange", function(e,ui) {
		var value = $("#percent-tax-free-result").slider().slider('value');
        $("#percent-tax-free").slider().slider('value',value);
    });
}
/*--------------------------------------------*/
function drawSlide(){
drawSlideAboutYou();
drawSlideResult(65,0)
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


