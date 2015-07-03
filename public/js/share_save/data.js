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
var CGT;
var isUpdateField = false;

function setupDisclammerPage(){
	loadPrintInfor();
}

function accept(){
hideDisclamer();
setupData();
drawMonthly();
drawSaving();
registerAction();
}
function hideDisclamer(){
$(".disclamer-page").hide();
$("#content").show();
$("#important-text").show();
$("#assump-text").show();
}
function setupData(){
	loadAllInformation();
	loadAllWarning();
}

function loadPrintInfor(){
 $.ajax({
        type: "GET",
        url: "xml/share_save/print/print-title.xml",
        dataType: "xml",
        success: function(xml) {
            var disclammerInfor = $(xml).find('disclamer-infor').text();
			$('#disclamer-infor').html(disclammerInfor);
			var disclammerLink = $(xml).find('disclamer-link').text();
			$('#disclamer-link').html(disclammerLink);
			
			var importantText = $(xml).find('important').text();
			$("#important-text").hide();
			$("#important-div-top").hide();
			$("#important-text").html(importantText);
			$("#important-top").html(importantText);
			
			var assumption = $(xml).find('assump').text();
			$("#assump-div-top").hide();
			$("#assump-text").hide();
			$("#assump-text").html(assumption);
			$("#assump-top").html(assumption);
			registerLinkActionDisclamer();
        },
        error: function() {
            alert("An error occurred while processing XML file print.");
        }
    });
}
function loadInformation(xml){
 $.ajax({
        type: "GET",
        url: "xml/share_save/infor/" + xml,
        dataType: "xml",
        success: function(xml) {
            $(xml).find('infor').each(function() {
                var message = $(this).find('message').text();
				var name = $(this).find('name').text();
				var idEl = $(this).find('id-element').text();
				$('#'+idEl).attr('information-message',name);
				InformationArray[name] = message;
            });
        },
        error: function() {
            alert("An error occurred while processing XML file Information.");
        }
    });
}

function loadWarning(xml){
 $.ajax({
        type: "GET",
        url: "xml/share_save/warning/" + xml,
        dataType: "xml",
        success: function(xml) {
            $(xml).find('warning-simple').each(function() {
                var message = $(this).find('message').text();
				var name = $(this).find('name').text();
				warningArray[name] = message;
            });
        },
        error: function() {
            alert("An error occurred while processing XML file warning.");
        }
    });
}

function loadCGT(){
$.ajax({
        type: "GET",
        url: "xml/share_save/cgt/cgt.xml",
        dataType: "xml",
        success: function(xml) {
           $(xml).find('information').each(function() {
				CGT = $(this).find('message-alert').text();
            });
        },
        error: function() {
            alert("An error occurred while processing XML file lta.");
        }
    });
}
function loadAllWarning(){
	loadWarning('share_detail.xml');
}

function loadAllInformation(){
	loadInformation('share_detail.xml');
}

