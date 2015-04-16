/*
----------------Information--------------------------------

1.Budget UI JS

2.All function in this file manage the UI in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/
var tabColor = new Array();
var tabName = new Array();
var totalsArray = new Array();
var ImageArray = new Array();
var chartExist = false;
function drawUI() {
    var index = 0
    $.ajax({
        type: "GET",
        url: "xml/budget_planner/budget_planner.xml",
        dataType: "xml",
        success: function(xml) {
            var size = $(xml).find('category').length;
            $(xml).find('category').each(function() {
                index++;
                var name = $(this).find('name').text();
                var colorCategory = $(this).find('color-category').text();
				var secondColorCategory = $(this).find('second-color-category').text();
				var colorText = $(this).find('color-text-category').text();
                var tabTitle = $(this).find('title-tab').text();
                var colorTab = $(this).find('color-tab').text();
                var items = $(this).find('item');
                var imagePath = $(this).find('image-category').text();
                drawCategory(name, colorCategory, index, imagePath, secondColorCategory, colorText);
                var isLast = false;
                if (index == size) {
                    isLast = true;
                }
                drawTab(index, colorTab, tabTitle, items, isLast);
                totalsArray["tab" + index] = null;
                tabColor["tab" + index] = colorCategory;
                tabName["tab" + index] = name;
                ImageArray[index] = imagePath;
            });
            drawCalculateButton();
            drawCalculateTab();
            setActive();
            fakewaffle.responsiveTabs(['xs', 'sm']);
			setHeightTabPane();
            disableCalculateBtn();
            console.log("function ready!");
			registerFunctionsForTab();
			registerFunctionsForPanel();
			registerFunctionForModal();
			 tooltip();
        },
        error: function() {
            alert("An error occurred while processing XML file.");
        }
    });
}

function loadWarning() {
    $.ajax({
        type: "GET",
        url: "xml/budget_planner/budget_warning_message.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('popup').each(function() {
                var type = parseInt($(this).find('type').text());
				var message = $(this).find('message').text();
				var color = $(this).find('color-message').text();
                if (type == 1) {
                    $('#myModal').find('.modal-body').html(message);
                    $('#myModal').find('.modal-body').css('color', color);
                } else if (type == 2) {
                    $('#myModal2').find('.modal-body').html(message);
                    $('#myModal2').find('.modal-body').css('color', color);
                }
            });
            console.log("modal already!");
        },
        error: function() {
            alert("An error occurred while processing XML file Modal.");
        }
    });

}

function drawCategory(name, colorCategory, index, imagePath, secondColorCategory, colorText) {
	var temp = "";
	if(name.length > 15){
		temp = name.substring(0, 9) + "..";
	}else{
		temp = name;
	}
    var html = "<li style='background-color :" + colorCategory + "'>";
    html = html + "<a id='a" + index + "' data-target='#tab" + index + "' href='#tab" + index + "' role='tab' data-toggle='tab'>";
    html = html + "<div>";
    html = html + "<table class='table-responsive'>";
    html = html + "<tr>";
    html = html + "<td class='fifyPersent'>";
    html = html + "<img class='img-responsive' src='images/budget_planner/" + imagePath + "'/>";
    html = html + "</td>";
    html = html + "<td class='forty'>";
    html = html + "<div class='col-md-12 col-xs-12 col-sm-12 inform' style='background-color:" + secondColorCategory + "'>";
    html = html + "<table class='table table-nonborder'>";
    html = html + "<tr>";
    html = html + "<td style='color:"+colorText+"'><span title='"+name+"'>" + temp + "</span></td>";
    html = html + "<td style='text-align:right;color:"+colorText+"'><span></span></td>";
    html = html + "</tr>";
    html = html + "</table>";
    html = html + "</div>";
    html = html + "</td>";
    html = html + "<td class='tenPersent'>";
    html = html + "<img class='img-responsive pull-right validate hidden' src='images/budget_planner/validate.png' />";
    html = html + "</td>";
    html = html + "<td class='tenPersent arrow'>";
    html = html + "<img class='img-responsive pull-right' src = 'images/budget_planner/arrow_close.png'/>";
    html = html + "</td>";
    html = html + "</tr>";
    html = html + "</table>";
    html = html + "</div>";
    html = html + "</a>";
    html = html + "</li>";
    $('#myTab').append(html);
}


function drawTab(index, colorTab, titleTab, items, isLast) {
    var idTab = "tab" + index;
    var html = "<div class='tab-pane' id='" + idTab + "'>";
    html = html + "<div class='row row-heading' style='background-color:" + colorTab + "'>";
    html = html + "<div class='col-md-12'>";
    html = html + "<span>" + titleTab + "</span>";
    html = html + "</div>";
    html = html + "</div>";
    html = html + "<div class='row row-containTblInput'>";
    html = html + "<div>";
    html = html + "<table class='table containInput'>";
    html = html + "<tr>";
    html = html + "<td class='first'></td>";
    html = html + "<td class='second'>";
    html = html + "<select onchange='updateWhenChangeType(this);' style='font-weight:bold;width:100%'>";
    html = html + "<option value='1'>Weekly</option><option value='2'>Fortnightly</option><option selected value='3'>Monthly</option><option value='4'>Yearly</option>";
    html = html + "</select>";
    html = html + "</td>";
    html = html + "<td class='three'></td>";
    html = html + "<td><span style='font-weight : bold'>Monthly</span></td>";
    html = html + "</tr>";
    $.each(items, function() {
        html = html + "<tr>";
        html = html + "<td class='first' style='padding-left:18px'><div>" + $(this).text() + "</div></td>";
        html = html + "<td class='second'><input placeholder='0.00' type='text' class='dataInput' oninput='calculateInput(this)' onkeypress='return isNumberKey(event)' style='width:100%'></td>";
        html = html + "<td><span>£</span><input type='hidden' class='inputHidden'></td>";
        html = html + "<td class='tdMonthly'><span class='monthly'>0</span></td>";
        html = html + "</tr>";
    });
    html = html + "</table>";
    html = html + "</div>";
    html = html + "</div>";
    $('#containerTab').append(html);
    drawLastElementInTab(idTab, index, colorTab, isLast);
}

function drawLastElementInTab(idTab, index, colorTab, isLast) {
    var html = "<div class='row' style='margin:10px 0px 0px 0px;background-color : white;border-top: 1px dashed #ddd'>";
    html = html + "<div>";
    html = html + "<table class='table totalCal'>";
    html = html + "<tr>";
    html = html + "<td class='one'></td>";
    html = html + "<td class='two'><span style='font-weight:bold'>Total</span></td>";
    html = html + "<td class='money'><span style='font-weight:bold'>£</span></td>";
    html = html + "<td class='moneyTotal'><span class='totalMonthly' style='font-weight:bold'>0</span></td>";
    html = html + "</tr>";
    html = html + "</table>";
    html = html + "<table class='table next'>";
    html = html + "<tr>";
    if (isLast) {
        html = html + "<td colspan='2'>Select your 'Calculate' to see your results or click on any section to change the value</td>";
        html = html + "<td class=''><button id='lastBtn' style='font-weight:bold;background-color:" + colorTab + "' onclick='nextTab(" + index + ");' class='btn btn-default'>Calculate</button></td>";
    } else {
        html = html + "<td colspan='3' class='money'><button style='font-weight:bold;background-color:" + colorTab + "' onclick='nextTab(" + index + ");' class='btn btn-default'>Next</button></td>";
    }
    html = html + "</tr>";
    html = html + "</table>";
    html = html + "</div>";
    html = html + "</div>";
    $('#' + idTab).append(html);
}

function drawCalculateButton() {
    var html = "<li style='text-align:center'>";
    html = html + "<button data-toggle='tab' data-target='#calculate' role='tab' id='btnCalculate' class='btn calculate'>Calculate</button>";
    html = html + "</li>";
    $('#myTab').append(html);
}

function drawCalculateTab() {
    var html = "<div class='tab-pane' style='border-top-color:#ddd !important;border-top:1px solid' id='calculate'>";
    html = html + "<div class='row' style='margin:15px 0px 0px 0px;'>";
    html = html + "<div class='col-md-12 col-sm-12 col-xs-12' style='text-align:center;color:#06038d'>";
    html = html + "<h4 style='font-weight:bolder'>How are you spending your money?</h4>";
    html = html + "</div>";
    html = html + "<div class='col-md-12 col-sm-12 col-xs-12' style='text-align:center;'>";
    html = html + "<div id='holder-canvas' style='min-height:360px;padding-top : 30px'>";
    html = html + '<div id="placeholder" class="demo-placeholder"></div>';
    html = html + '<div class="labelChart">Total monthly disposable income</div>';
	html = html + '<div class="labelTop"></div>';
    html = html + "</div>";
    html = html + "</div>";
    html = html + "</div>";
    html = html + "</div>";
    $('#containerTab').append(html);
}

function setActive() {
    $('#myTab a').first().tab('show');
    $('#myTab').find('li:eq(0)').attr('class', 'active');
    var imgActive = $($("#a1").find('td.tenPersent:eq(1) img'));
    imgActive.attr('src', 'images/budget_planner/arrow_open.png');
}

function setHeightTabPane() {
    var sizeTabs = getSizeArray();
    if (sizeTabs >= 8 & fakewaffle.currentPosition != "panel"){
        var numberAdded = sizeTabs - 8;
        var heightTabCurrent = $('.tab-pane.active').height();
        var heightLiCurrent = $('li.active').height();
		var isChrome = checkChromeBrowser();
		var heightTabAdded = 0;
		if(isChrome)
		{
			heightTabAdded = $('#myTab').height() -( $('li:last-child').height());
		}else{
			heightTabAdded = $('#myTab').height() -( $('li:last-child').height());
		}
        var heigtTableAdded = $('.tab-pane.active .row-containTblInput').height() + (numberAdded * 50);
        $('.tab-pane').css('height',  (heightTabAdded -10) + "px");
        $('.tab-pane .row-containTblInput').css('height', heigtTableAdded + "px");
    }
}

/* all functions below for create a chart*/
function drawChart(data) {
	var startDraw = parseFloat(0.5 - parseFloat((data[0].data)/100));
	chartExist = true;
    var placeholder = $("#placeholder");
	 placeholder.empty();
    var index = 1;
    //placeholder.unbind();
    var plot = $.plot(placeholder, data, {
        series: {
            pie: {
				radius: 0.95,
                innerRadius: 0.55,
                show: true,
                startAngle: startDraw,
                label: {
                    show: true,
                    radius: 0.74,
                    formatter: labelFormatter,
                    background: {
                        opacity: 0
                    }
                }
            }
        },
        legend: {
            show: false
        },
        grid: {
            hoverable: true
        },
        gradient: {
            radial: true
        }
    });

    function labelFormatter(label, series) {
        if (series.percent > 7) {
            var width = 45;
            var path = label.split("||")[0];
            var src = 'images/budget_planner/' + path;
            return '<img label="'+label+'" class="img_chart" width="' + width + '" height="'+width+'" src="' + src + '" />';
        } else{
            return '';
		}
    }
	placeholder.append("<div id='tooltip' style='display:none'></div>");
    tooltip();
}

function tooltip() {
    $("#placeholder").bind("plothover", function(event, pos, item) {
        if (item) {
           showTooltip(pos.pageX - $("#placeholder").offset().left, pos.pageY - $("#placeholder").offset().top, item.series.label);
        } else {
			$("#tooltip").hide();
        }
    });

	$(document).on("mouseover",".img_chart",
		function() {
			var label = $(this).attr('label');
			console.log($(this).offset().left + "=" + $(this).offset().top);
			var width = $(this).width()/2;
			showTooltip($(this).offset().left -($("#placeholder").offset().left - width),$(this).offset().top - $("#placeholder").offset().top,label);
		}
	);
	
}

function showTooltip(x, y, contents) {
	console.log('after tru : ' + x +"-" +y);
    var content = contents.split('||')[1];
    var name = content.split(':')[0];
    var value = content.split(':')[1];
	value = value.replace("£","");
	value = parseFloat(value);
    var html = "<p style='font-size:12px;text-align:center;color:blue;margin-bottom:2px'>" + name + "</p><p style='font-size:12px;text-align:center;color:blue'>£" + Number(value).toLocaleString('en').split('.')[0] + "</p>";
    $('#tooltip').html(html);
     $('#tooltip').css({
        position: 'absolute',
        top: y - 65,
        left: x - 95 / 2,
        'padding-top': '3px',
		'z-index':'100'
    });
    $('#tooltip').show();
	
    
}

function hideAllPanel() {
    for (var i = 1; i <= getSizeArray(); i++) {
        $('#collapse-tab' + i).collapse('hide');
        $('li #a' + i).find('td.tenPersent:eq(1) img').attr('src', 'images/budget_planner/arrow_close.png');
    }
}