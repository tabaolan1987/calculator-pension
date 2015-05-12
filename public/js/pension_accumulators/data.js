/*
----------------Information--------------------------------

1.Pension Accumulators Data JS

2.All function in this file manage the data in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/
var InformationArray = new Array();
var warningArray = new Array();
var annuityMale = new Array();
var annuityFemale = new Array();
var growthRate = new Array();
var LTA;
var male = 1;
var female = 2;
var totalCoin = 25;
var coinPercent = 4;
var current_forcecash_income = 0;
var current_target = 0;
function setupDisclammerPage(){
	loadPrintInfor();
}

function accept(){
hideDisclamer();
setupData();
registerAction();
drawSlide();
drawRightContent();
$( window ).resize(function() {drawRightContent();});
}
function hideDisclamer(){
$(".disclamer-page").hide();
$("#content").show();
$("#important-text").show();
$("#assump-text").show();
}
function setupData(){
	loaddAllAnnuity();
	loadAllInformation();
	loadAllWarning();
	loadGrowthRate();
	loadLTA();
}

function loadPrintInfor(){
 $.ajax({
        type: "GET",
        url: "xml/pension_accumulators/print/print-title.xml",
        dataType: "xml",
        success: function(xml) {
            var disclammerInfor = $(xml).find('disclamer-infor').text();
			$('#disclamer-infor').html(disclammerInfor);
			var disclammerLink = $(xml).find('disclamer-link').text();
			$('#disclamer-link').html(disclammerLink);
			
			var importantText = $(xml).find('important').text();
			$("#important-text").hide();
			$("#important-text").html(importantText);
			
			var assumption = $(xml).find('assump').text();
			$("#assump-text").hide();
			$("#assump-text").html(assumption);
			
            console.log("load xml  : print already!");
        },
        error: function() {
            alert("An error occurred while processing XML file print.");
        }
    });
}
function loadInformation(xml){
 $.ajax({
        type: "GET",
        url: "xml/pension_accumulators/infor/" + xml,
        dataType: "xml",
        success: function(xml) {
            $(xml).find('infor').each(function() {
                var message = $(this).find('message').text();
				var name = $(this).find('name').text();
				var idEl = $(this).find('id-element').text();
				$('#'+idEl).attr('information-message',name);
				InformationArray[name] = message;
            });
            console.log("load xml  : "  +  xml +" already!");
        },
        error: function() {
            alert("An error occurred while processing XML file Information.");
        }
    });
}

function loadWarning(xml){
 $.ajax({
        type: "GET",
        url: "xml/pension_accumulators/warning/" + xml,
        dataType: "xml",
        success: function(xml) {
            $(xml).find('warning-simple').each(function() {
                var message = $(this).find('message').text();
				var name = $(this).find('name').text();
				warningArray[name] = message;
            });
			$(xml).find('warning-special').each(function() {
                var message = $(this).find('message').text();
				var name = $(this).find('name').text();
				warningArray[name] = message;
            });
            console.log("load xml: "  +  xml +" already! ");
        },
        error: function() {
            alert("An error occurred while processing XML file warning.");
        }
    });
}


function loadAnnuityMale(){
$.ajax({
        type: "GET",
        url: "xml/pension_accumulators/annuity/MaleAnnuity.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('annuity').each(function() {
               var age = $(this).attr('age');
			   var income = $(this).attr('income');
			   annuityMale[age] = income;
            });
            console.log("load xml: "  +  xml +" already! ");
        },
        error: function() {
            alert("An error occurred while processing XML  male file annuity.");
        }
    });
}
function loadAnnuityFemale(){
$.ajax({
        type: "GET",
        url: "xml/pension_accumulators/annuity/FemaleAnnuity.xml",
        dataType: "xml",
        success: function(xml) {
           $(xml).find('annuity').each(function() {
               var age = $(this).attr('age');
			   var income = $(this).attr('income');
			   annuityFemale[age] = income;
            });
            console.log("load xml: "  +  xml +" already! ");
        },
        error: function() {
            alert("An error occurred while processing XML female file annuity.");
        }
    });
}
function drawGrowRate(xml){
	 var index = 0;
	 var html ="";
	 $(xml).find('rate').each(function() {
		index++;
		var value = $(this).attr('value');
		if(index == 1){
			html = "<div class='col-xs-2 modal-value'><span class='label-percent'>"+value+"%</span></div>";
		}else{
			html = html + "<div class='col-xs-2'><span class='label-percent'>"+value+"%</span></div>";
		}
	 });
	 html = html + "<div class='clearfix'></div>";
	 index = 0;
	 $(xml).find('rate').each(function() {
		index++;
		var value = $(this).attr('value');
		var checked = $(this).attr('default');
		if(index == 1){
			html = html + "<div class='col-xs-2 modal-value'><input type='radio' value='"+value+"' id='"+value+"-percent' "+checked+" name='an-grow-percent'><label for='"+value+"-percent'></label></div>";
		}else{
			html = html + "<div class='col-xs-2'><input type='radio' value='"+value+"' id='"+value+"-percent' "+checked+" name='an-grow-percent'><label for='"+value+"-percent'></label></div>";
		}
	 });
	 
	 $('#modal-grow').append(html);
	 
	 
}
function loadGrowthRate(){
$.ajax({
        type: "GET",
        url: "xml/pension_accumulators/growthRate/growthrate.xml",
        dataType: "xml",
        success: function(xml) {
           $(xml).find('rate').each(function() {
				var value = $(this).attr('value');
				var inflation_rate = $(this).attr('inflation_rate');
				var df = $(this).attr('default');
				var deduct_inflation_rate = ((parseFloat(value)*100)/100) - parseFloat(inflation_rate);
				growthRate[value] = deduct_inflation_rate;
            });
			drawGrowRate(xml);
            console.log("load xml: "  +  xml +" already! ");
        },
        error: function() {
            alert("An error occurred while processing XML file growth.");
        }
    });
}

function loadLTA(){
$.ajax({
        type: "GET",
        url: "xml/pension_accumulators/lta/lta.xml",
        dataType: "xml",
        success: function(xml) {
           $(xml).find('information').each(function() {
				var active = $(this).find('active').text();
				if(active == "true"){
					LTA = $(this).find('value').text();
					LTA = parseInt(LTA);
				}
            });
            console.log("load xml: "  +  LTA +" already! ");
        },
        error: function() {
            alert("An error occurred while processing XML file lta.");
        }
    });
}
function loadAllWarning(){
	loadWarning('about_you.xml');
	loadWarning('savings.xml');
}

function loadAllInformation(){
	loadInformation('about_you.xml');
	loadInformation('savings.xml');
	loadInformation('result.xml');
}

function loaddAllAnnuity(){
	loadAnnuityMale();
	loadAnnuityFemale();
}
