/*
----------------Information--------------------------------

1.Budget UI JS

2.All function in this file manage the UI in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/
var tabColor=new Array();var tabName=new Array();var totalsArray=new Array();var ImageArray=new Array();var chartExist=false;function drawUI(){var a=0;$.ajax({type:"GET",url:"xml/budget_planner/budget_planner.xml",dataType:"xml",success:function(b){var c=$(b).find("category").length;$(b).find("category").each(function(){a++;var e=$(this).find("name").text();var i=$(this).find("color-category").text();var d=$(this).find("second-color-category").text();var l=$(this).find("color-text-category").text();var f=$(this).find("title-tab").text();var g=$(this).find("color-tab").text();var k=$(this).find("item");var j=$(this).find("image-category").text();drawCategory(e,i,a,j,d,l);var h=false;if(a==c){h=true}drawTab(a,g,f,k,h);totalsArray["tab"+a]=null;tabColor["tab"+a]=i;tabName["tab"+a]=e;ImageArray[a]=j});drawCalculateButton();drawCalculateTab();setActive();fakewaffle.responsiveTabs(["xs","sm"]);setHeightTabPane();disableCalculateBtn();console.log("function ready!");registerFunctionsForTab();registerFunctionsForPanel();registerFunctionForModal();tooltip()},error:function(){alert("An error occurred while processing XML file.")}})}function loadWarning(){$.ajax({type:"GET",url:"xml/budget_planner/budget_warning_message.xml",dataType:"xml",success:function(a){$(a).find("popup").each(function(){var c=parseInt($(this).find("type").text());var d=$(this).find("message").text();var b=$(this).find("color-message").text();if(c==1){$("#myModal").find(".modal-body").html(d);$("#myModal").find(".modal-body").css("color",b)}else{if(c==2){$("#myModal2").find(".modal-body").html(d);$("#myModal2").find(".modal-body").css("color",b)}}});console.log("modal already!")},error:function(){alert("An error occurred while processing XML file Modal.")}})}function drawCategory(e,g,d,a,c,h){var b="";if(e.length>15){b=e.substring(0,9)+".."}else{b=e}var f="<li style='background-color :"+g+"'>";f=f+"<a id='a"+d+"' data-target='#tab"+d+"' href='#tab"+d+"' role='tab' data-toggle='tab'>";f=f+"<div>";f=f+"<table class='table-responsive'>";f=f+"<tr>";f=f+"<td class='fifyPersent'>";f=f+"<img class='img-responsive' src='images/budget_planner/"+a+"'/>";f=f+"</td>";f=f+"<td class='forty'>";f=f+"<div class='col-md-12 col-xs-12 col-sm-12 inform' style='background-color:"+c+"'>";f=f+"<table class='table table-nonborder'>";f=f+"<tr>";f=f+"<td style='color:"+h+"'><span title='"+e+"'>"+b+"</span></td>";f=f+"<td style='text-align:right;color:"+h+"'><span></span></td>";f=f+"</tr>";f=f+"</table>";f=f+"</div>";f=f+"</td>";f=f+"<td class='tenPersent'>";f=f+"<img class='img-responsive pull-right validate hidden' src='images/budget_planner/validate.png' />";f=f+"</td>";f=f+"<td class='tenPersent arrow'>";f=f+"<img class='img-responsive pull-right' src = 'images/budget_planner/arrow_close.png'/>";f=f+"</td>";f=f+"</tr>";f=f+"</table>";f=f+"</div>";f=f+"</a>";f=f+"</li>";$("#myTab").append(f)}function drawTab(e,a,d,c,g){var b="tab"+e;var f="<div class='tab-pane' id='"+b+"'>";f=f+"<div class='row row-heading' style='background-color:"+a+"'>";f=f+"<div class='col-md-12'>";f=f+"<span>"+d+"</span>";f=f+"</div>";f=f+"</div>";f=f+"<div class='row row-containTblInput'>";f=f+"<div>";f=f+"<table class='table containInput'>";f=f+"<tr>";f=f+"<td class='first'></td>";f=f+"<td class='second'>";f=f+"<select onchange='updateWhenChangeType(this);' style='font-weight:bold;width:100%'>";f=f+"<option value='1'>Weekly</option><option value='2'>Fortnightly</option><option selected value='3'>Monthly</option><option value='4'>Yearly</option>";f=f+"</select>";f=f+"</td>";f=f+"<td class='three'></td>";f=f+"<td><span style='font-weight : bold'>Monthly</span></td>";f=f+"</tr>";$.each(c,function(){f=f+"<tr>";f=f+"<td class='first' style='padding-left:18px'><div>"+$(this).text()+"</div></td>";f=f+"<td class='second'><input placeholder='0.00' type='text' class='dataInput' oninput='calculateInput(this)' onkeypress='return isNumberKey(event)' style='width:100%'></td>";f=f+"<td><span>£</span><input type='hidden' class='inputHidden'></td>";f=f+"<td class='tdMonthly'><span class='monthly'>0</span></td>";f=f+"</tr>"});f=f+"</table>";f=f+"</div>";f=f+"</div>";$("#containerTab").append(f);drawLastElementInTab(b,e,a,g)}function drawLastElementInTab(b,c,a,e){var d="<div class='row' style='margin:10px 0px 0px 0px;background-color : white;border-top: 1px dashed #ddd'>";d=d+"<div>";d=d+"<table class='table totalCal'>";d=d+"<tr>";d=d+"<td class='one'></td>";d=d+"<td class='two'><span style='font-weight:bold'>Total</span></td>";d=d+"<td class='money'><span style='font-weight:bold'>£</span></td>";d=d+"<td class='moneyTotal'><span class='totalMonthly' style='font-weight:bold'>0</span></td>";d=d+"</tr>";d=d+"</table>";d=d+"<table class='table next'>";d=d+"<tr>";if(e){d=d+"<td colspan='2'>Select 'Calculate' to see your results or click on any section to change the value</td>";d=d+"<td style='padding-top:16px'><button id='lastBtn' style='font-weight:bold;background-color:"+a+"' onclick='nextTab("+c+");' class='btn btn-default'>Calculate</button></td>"}else{d=d+"<td colspan='3' class='money'><button style='font-weight:bold;background-color:"+a+"' onclick='nextTab("+c+");' class='btn btn-default'>Next</button></td>"}d=d+"</tr>";d=d+"</table>";d=d+"</div>";d=d+"</div>";$("#"+b).append(d)}function drawCalculateButton(){var a="<li style='text-align:center'>";a=a+"<button data-toggle='tab' data-target='#calculate' role='tab' id='btnCalculate' class='btn calculate'>Calculate</button>";a=a+"</li>";$("#myTab").append(a)}function drawCalculateTab(){var a="<div class='tab-pane' style='border-top-color:#ddd !important;border-top:1px solid' id='calculate'>";a=a+"<div class='row' style='margin:15px 0px 0px 0px;'>";a=a+"<div class='col-md-12 col-sm-12 col-xs-12' style='text-align:center;color:#06038d'>";a=a+"<h4 style='font-weight:bolder'>How are you spending your money?</h4>";a=a+"</div>";a=a+"<div class='col-md-12 col-sm-12 col-xs-12' style='text-align:center;'>";a=a+"<div id='holder-canvas' style='min-height:300px;padding-top : 0px'>";a=a+'<div id="placeholder" class="demo-placeholder"></div>';a=a+'<div class="labelChart">Total monthly disposable income</div>';a=a+'<div class="labelTop"></div>';a=a+"</div>";a=a+"</div>";a=a+"</div>";a=a+"</div>";$("#containerTab").append(a)}function setActive(){$("#myTab a").first().tab("show");$("#myTab").find("li:eq(0)").attr("class","active");var a=$($("#a1").find("td.tenPersent:eq(1) img"));a.attr("src","images/budget_planner/arrow_open.png")}function setHeightTabPane(){var c=getSizeArray();if(c>=8&fakewaffle.currentPosition!="panel"){var f=c-8;var a=$(".tab-pane.active").height();var e=$("li.active").height();var g=checkChromeBrowser();var d=0;var b=0;if(g){d=$("#myTab").height()-($("li:last-child").height());b=$(".tab-pane.active .row-containTblInput").height()+(f*50)-2}else{d=$("#myTab").height()-($("li:last-child").height());b=$(".tab-pane.active .row-containTblInput").height()+(f*50)+5}$(".tab-pane").css("height",(d-10)+"px");$(".tab-pane .row-containTblInput").css("height",b+25)}}function drawChart(c){var e=parseFloat(0.5-parseFloat((c[0].data)/100));chartExist=true;var f=$("#placeholder");f.empty();var a=1;var d=$.plot(f,c,{series:{pie:{radius:0.95,innerRadius:0.55,show:true,startAngle:e,label:{show:true,radius:0.74,formatter:b,background:{opacity:0}}}},legend:{show:false},grid:{hoverable:true},gradient:{radial:true}});function b(g,h){if(h.percent>7){var i=45;var j=g.split("||")[0];var k="images/budget_planner/"+j;return'<img label="'+g+'" class="img_chart" width="'+i+'" height="'+i+'" src="'+k+'" />'}else{return""}}f.append("<div id='tooltip' style='display:none'><div id='tooltip-infor'></div></div>");tooltip()}function tooltip(){$("#placeholder").bind("plothover",function(b,c,a){if(a){showTooltip(c.pageX-$("#placeholder").offset().left,c.pageY-$("#placeholder").offset().top,a.series.label)}else{$("#tooltip").hide()}});$(document).on("mouseover",".img_chart",function(){var a=$(this).attr("label");var b=$(this).width()/2;showTooltip($(this).offset().left-($("#placeholder").offset().left-b),$(this).offset().top-$("#placeholder").offset().top,a)})}function showTooltip(a,h,f){var e=f.split("||")[1];var c=e.split(":")[0];var g=e.split(":")[1];g=g.replace("£","");g=parseFloat(g);var b="";if(c.length>23){b=c.substring(0,22)+".."}else{b=c}var d=$("<table style='margin-bottom:15px;overflow:hidden;height:100%;width:100%'><tbody><tr><td align='center'>"+b+"<br>£"+Number(g).toLocaleString("en").split(".")[0]+"</td></tr></tbody></table>");$("#tooltip").html(d);$("#tooltip").css({position:"absolute",top:h-65,left:a-95/2,"z-index":"100",padding:"0 7px 10px 7px"});$("#tooltip").show()}function hideAllPanel(){for(var a=1;a<=getSizeArray();a++){$("#collapse-tab"+a).collapse("hide");$("li #a"+a).find("td.tenPersent:eq(1) img").attr("src","images/budget_planner/arrow_close.png")}};