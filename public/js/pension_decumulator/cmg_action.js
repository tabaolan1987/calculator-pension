/*
----------------Information--------------------------------

1.Pension Accumulators Action JS

2.All function in this file manage the action of user in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/

function registerAction(){
	registerHoverAction();
	//registerActionAboutYou();
	//registerActionSavingTab();
	//registerActionResultTab();
	//registerActionSummaryTab();
	
}

/* this function handle the action hover the information image */
function registerHoverAction(){
	$(document).on("mouseover",".icon-tooltip",function() {
		var attrName = $(this).attr('information-message');
		var content = InformationArray[attrName];
		$("#infor-tooltip").html(content);
		var height = $("#content-tooltip").height();
		var top = $(this).offset().top - $(window).scrollTop();
		var background = $("#content-tooltip").css('background-image');
		var n = background.indexOf("480");
		if(n == -1){
			var left = $(this).offset().left;
			var topTool =  top - 157;
			$("#content-tooltip").css({
				position: 'fixed',
				top: topTool,
				left: left + $(this).width()
			});
		}else{
			var left = $(this).offset().left;
			var topTool =  top - 83;
			$("#content-tooltip").css({
					position: 'fixed',
					top: topTool,
					left: left + $(this).width()
			});
		}
		$("#content-tooltip").show();
	});
	$("#content-tooltip").hover( 
			function() {  $("#content-tooltip").show(); 
			},
			function() { $("#content-tooltip").hide(); }
	);
	$(document).on("mouseout",".icon-tooltip",function() {
		$("#content-tooltip").hide();
	});
	
	
}
/* this function just allow user can type numberic only */
function isNumberKey(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode;
   if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57)){
		return false;
	}
    return true;
}


/*function print*/
function updateDataPrint(){
	
}

function PrintElement(element){
	updateDataPrint();
	Popup($(element).html());
}

function Popup(data) {
	var mywindow = window.open('', 'Close Brothers');
	mywindow.document.write('<html><head><title>Pension Accumulators</title>');
	mywindow.document.write('<style>a {text-decoration : none !important;color : black;}</style>');
	mywindow.document.write('</head><body >');
	mywindow.document.write(data);
	mywindow.document.write('</body></html>');
	mywindow.document.close();
	mywindow.focus(); 
	mywindow.print();
	mywindow.close();
	return true;
}