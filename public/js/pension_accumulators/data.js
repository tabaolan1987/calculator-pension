var InformationArray = new Array();
var warningArray = new Array();
var annuityMale = new Array();
var annuityFemale = new Array();
var growthRate = new Array();


function setupData(){
	loaddAllAnnuity();
	loadAllInformation();
	loadAllWarning();
	loadGrowthRate();
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
            $(xml).find('warning').each(function() {
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
				var default = $(this).attr('default');
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
