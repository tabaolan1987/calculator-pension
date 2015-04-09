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

function setupData(){
	loaddAllAnnuity();
	loadAllInformation();
	loadAllWarning();
	loadGrowthRate();
	loadLTA();
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
				var idEl = $(this).find('idelement').text();
				$('#'+idEl).addClass('information-message',name);
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
				var idEl = $(this).find('idelement').text();
				$('#'+idEl).addClass('validate-message',name);
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
