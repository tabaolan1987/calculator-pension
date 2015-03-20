var tabColor = new Array();
var tabName = new Array();
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
				totalsArray["tab"+index] = 0;
				tabColor["tab"+index] = colorCategory;
				tabName["tab"+index] = name;
			});
			drawCalculateButton();
			drawCalculateTab();
			setActive();
			fakewaffle.responsiveTabs(['xs','sm']);
			console.log( "function ready!" );
			$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				var imgActive = $($(e.target).find('td.tenPersent:eq(1) img'));
				imgActive.attr('src','images/budget_planner/arrow_open.png');
				var imgActive = $($(e.relatedTarget).find('td.tenPersent:eq(1) img'));
				imgActive.attr('src','images/budget_planner/arrow_close.png');
			});
			
			$('div.panel-collapse').on('shown.bs.collapse', function () {
				var id = $(this).attr('id');
				$("div.panel-heading").find("a[href='#"+id+"']").find("td.tenPersent:eq(1) img").attr('src','images/budget_planner/arrow_down.png');
			});
			
			$('div.panel-collapse').on('hidden.bs.collapse', function () {
				var id = $(this).attr('id');
				$("div.panel-heading").find("a[href='#"+id+"']").find("td.tenPersent:eq(1) img").attr('src','images/budget_planner/arrow_up.png');
			});
			
			$('button[data-target="#calculate"]').on('show.bs.tab', function (e) {
					//validate
			});
			
			$('button[data-target="#calculate"]').on('shown.bs.tab', function (e) {
				$(e.relatedTarget).find('td.tenPersent:eq(1) img').attr('src','images/budget_planner/arrow_close.png');
				$("div.panel-heading").find("td.tenPersent:eq(1) img").attr('src','images/budget_planner/arrow_up.png');
				var idPrev = $(e.relatedTarget).attr('id');
				$('.panel-default .panel-heading #'+idPrev).closest('.panel-heading').closest('.panel-default').find('.panel-collapse').collapse('hide');
				$('div#collapse-calculate').collapse('show');
			});
			console.log( "attact ready!" );
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
	html=html+"<td class='fifyPersent'>";
	html=html+"<img class='img-responsive' src='images/budget_planner/"+imagePath+"'/>";
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
	html=html+"<td class='tenPersent'>";
	html=html+"<img class='img-responsive pull-right validate hidden' src='images/budget_planner/validate.png' />";
	html=html+"</td>";
	html=html+"<td class='tenPersent'>";
	html=html+"<img class='img-responsive pull-right' src = 'images/budget_planner/arrow_close.png'/>";
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
	html=html+"<select onchange='updateWhenChangeType(this);' style='font-weight:bold;width:100%'>";
	html=html+"<option value='1'>Weekly</option><option value='2'>Fortnightly</option><option selected value='3'>Monthly</option><option value='4'>Yearly</option>";
	html=html+"</select>";
	html=html+"</td>";
	html=html+"<td style='width:9%'></td>";
	html=html+"<td><span style='font-weight : bold'>Monthly</span></td>";
	html=html+"</tr>";
	$.each(items,function(){
		html=html+"<tr>";
		html=html+"<td><span style='padding-left:10px'>"+$(this).text()+"</span></td>";
		html=html+"<td><input placeholder='£ 0.00' type='text' class='dataInput' onblur='calculateInput(this);' style='width:100%'></td>";
		html=html+"<td><span>£</span></td>";
		html=html+"<td><span class='monthly'>0</span></td>";
		html=html+"</tr>";
	});
	html=html+"</table>";
	html=html+"</div>";
	html=html+"</div>";
	$('#containerTab').append(html);
	drawLastElementInTab(idTab,index);
}

function drawLastElementInTab(idTab,index){
	var html="<div class='row' style='margin:10px 0px 0px 0px;background-color : white'>";
	html=html+"<div>";
	html=html+"<table class='table totalCal'>";
	html=html+"<tr>";
	html=html+"<td style='width:50%'></td>";
	html=html+"<td style='width:24%'><span>Total</span></td>";
	html=html+"<td style='width:8%'><span>£</span></td>";
	html=html+"<td><span class='totalMonthly' style='font-weight:bold'>0</span></td>";
	html=html+"</tr>";
	html=html+"</table>";
	html=html+"<table class='table totalCal'>";
	html=html+"<tr>";
	html=html+"<td style='width:50%'></td>";
	html=html+"<td style='width:24%'></td>";
	html=html+"<td style='width:8%'><button onclick='nextTab("+index+");' class='btn btn-default'>Next</button></td>";
	html=html+"<td></td>";
	html=html+"</tr>";
	html=html+"</table>";
	html=html+"</div>";
	html=html+"</div>";
	$('#'+idTab).append(html);
}



function drawCalculateButton(){
	var html="<li style='text-align:center'>";
	html=html+"<button data-toggle='tab' data-target='#calculate' role='tab' id='btnCalculate' class='btn calculate'>Calculate</button>";
	html=html+"</li>";
	$('#myTab').append(html);
}

function drawCalculateTab(){
	var html="<div class='tab-pane' style='border-top-color:#ddd !important;border-top:1px solid' id='calculate'>";
	html=html+"<div class='row' style='margin:15px 0px 0px 0px;'>";
	html=html+"<div class='col-md-12 col-sm-12 col-xs-12' style='text-align:center;color:#06038d'>";
	html=html+"<h4 style='font-weight:bolder'>How are you spending your money?</h4>";
	html=html+"</div>";
	html=html+"</div>";
	html=html+"<div class='row' style='margin:15px 0px 0px 0px'>";
	html=html+"<div class='col-md-12 col-sm-12 col-xs-12' style='text-align:center;'>";
	html=html+"<div id='holder-canvas' style='min-height:360px'>";	
	html=html+"</div>";	
	html=html+"</div>";	
	html=html+"</div>";		
	html=html+"</div>";
	$('#containerTab').append(html);
}
function setActive(){
	$('#myTab a').first().tab('show');
	$('#myTab').find('li:eq(0)').attr('class','active');
	var imgActive = $($("#a1").find('td.tenPersent:eq(1) img'));
	imgActive.attr('src','images/budget_planner/arrow_open.png');
}