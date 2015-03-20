
function drawUI(){
	var index = 0
	$.ajax({
        type: "GET",
        url: "xml/budget_planner/budget_planner.xml",
        dataType: "xml",
        success: function(xml){
			$(xml).find('category').each(function(){
				index++;
				var name = $(this).find('name').text();
				var colorCategory = $(this).find('color-category').text();
				var tabTitle = $(this).find('title-tab').text();
				var colorTab = $(this).find('color-tab').text();
				var items = $(this).find('item');
				var imagePath = $(this).find('image-category').text();
				drawCategory(name,colorCategory,index,imagePath,colorTab);
				drawTab(index,colorTab,tabTitle,items);
			});
			drawCalculateButton();
			drawCalculateTab();
			fakewaffle.responsiveTabs(['xs','sm']);
        },
        error: function() {
          alert("An error occurred while processing XML file.");
        }
    });
	
}

function drawCategory(name, colorCategory,index,imagePath,colorTab){
	
	var html="<li style='background-color :"+colorCategory+"'>";
	html=html+"<a id='a"+index+"' data-target='#tab"+index+"' href='#tab"+index+"' role='tab' data-toggle='tab'>";
	html=html+"<div>";
	html=html+"<table class='table-responsive'>";
	html=html+"<tr>";
	html=html+"<td class='aquarter'>";
	html=html+"<img class='img-responsive' src='images/"+imagePath+"'/>";
	html=html+"</td>";
	html=html+"<td class='forty'>";
	html=html+"<div class='col-md-12 col-xs-12 col-sm-12 inform' style='background-color:"+colorTab+"'>";
	html=html+"<table class='table table-nonborder'>";
	html=html+"<tr>";
	html=html+"<td><span>"+name+"</span></td>";
	html=html+"<td><span style='float:right'></span></td>";
	html=html+"</tr>";
	html=html+"</table>";
	html=html+"</div>";
	html=html+"</td>";
	html=html+"<td class='aquarter_hidden'>";
	html=html+"<img class='img-responsive pull-right hidden' src='images/arrow_open.png'>";
	html=html+"</td>";
	html=html+"<td class='aquarter'>";
	html=html+"<img class='img-responsive pull-right' src='images/arrow_open.png' />";
	html=html+"</td>";
	html=html+"</tr>";
	html=html+"</table>";
	html=html+"</div>";
	html=html+"</a>";
	html=html+"</li>";
	$('#myTab').append(html);
}

function drawCalculateButton(){
	var html="<li>";
	html=html+"<a id='aCalculate' data-target='#calculate' href='#calculate' role='tab' data-toggle='tab'>";
	html=html+"<div>";
	html=html+"<table class='table-responsive'>";
	html=html+"<tr>";
	html=html+"<td style='text-align:center'>";
	html=html+"<button class='btn' style='width:40%;background-color:#94b7bb;border-radius:15px;color:black;font-weight:bolder'>Calculate</button>";
	html=html+"</td>";
	html=html+"</tr>";
	html=html+"</table>";
	html=html+"</div>";
	html=html+"</a>";
	html=html+"</li>";
	$('#myTab').append(html);
}

function drawTab(index,colorTab,titleTab,items){
	var idTab = "tab"+index;
	var html="<div class='tab-pane' id='"+idTab+"'>";
	html=html+"<div class='row row-heading' style='background-color:"+colorTab+"'>";
	html=html+"<div class='col-md-12'>";
	html=html+"<span>"+titleTab+"</span>";
	html=html+"</div>";
	html=html+"</div>";
	html=html+"<div class='row row-containTblInput'>";
	html=html+"<div>";
	html=html+"<table class='table containInput'>";
	html=html+"<tr>";
	html=html+"<td style='width:50%'></td>";
	html=html+"<td style='width:35%'>";
	html=html+"<select style='font-weight:bold;width:100%'>";
	html=html+"<option>Weekly</option><option>Fortnightly</option><option>Monthly</option> <option>Yearly</option>";
	html=html+"</select>";
	html=html+"</td>";
	html=html+"<td style='width:9%'></td>";
	html=html+"<td><span style='font-weight : bold'>Monthly</span></td>";
	html=html+"</tr>";
	$.each(items,function(){
		html=html+"<tr>";
		html=html+"<td><span style='padding-left:10px'>"+$(this).text()+"</span></td>";
		html=html+"<td><input type='text' class='dataInput' style='width:100%'></td>";
		html=html+"<td><span>£</span></td>";
		html=html+"<td><span class='monthly'></span></td>";
		html=html+"</tr>";
	});
	html=html+"</table>";
	html=html+"</div>";
	html=html+"</div>";
	$('#containerTab').append(html);
	drawLastElementInTab(idTab);
}

function drawLastElementInTab(idTab){
	var html="<div class='row' style='margin:10px 0px 0px 0px;background-color : white'>";
	html=html+"<div>";
	html=html+"<table class='table totalCal'>";
	html=html+"<tr>";
	html=html+"<td style='width:50%'></td>";
	html=html+"<td style='width:24%'><span>Total</span></td>";
	html=html+"<td style='width:8%'><span>£</span></td>";
	html=html+"<td><span class='totalMonthly' style='font-weight:bold'></span></td>";
	html=html+"</tr>";
	html=html+"</table>";
	html=html+"<table class='table totalCal'>";
	html=html+"<tr>";
	html=html+"<td style='width:50%'></td>";
	html=html+"<td style='width:24%'></td>";
	html=html+"<td style='width:8%'><button class='btn btn-default'>Next</button></td>";
	html=html+"<td></td>";
	html=html+"</tr>";
	html=html+"</table>";
	html=html+"</div>";
	html=html+"</div>";
	$('#'+idTab).append(html);
}

function drawCalculateTab(){
	var html="<div class='tab-pane' style='border-top-color:#ddd;' id='calculate'>";
	html=html+"<div class='row' style='margin:15px 0px 0px 0px;'>";
	html=html+"<div class='col-md-12 col-sm-12 col-xs-12' style='text-align:center;color:#06038d'>";
	html=html+"<h4 style='font-weight:bolder'>How are you spending your money?</h4>";
	html=html+"</div>";
	html=html+"</div>";
	html=html+"<div class='row' style='margin:15px 0px 0px 0px'>";
	html=html+"<div class='col-md-12 col-sm-12 col-xs-12' style='text-align:center;'>";
	html=html+"<div style='min-height:360px'>";	
	html=html+"<canvas id='chart-area' ></canvas>";	
	html=html+"</div>";	
	html=html+"</div>";	
	html=html+"</div>";		
	html=html+"</div>";
	$('#containerTab').append(html);
}
