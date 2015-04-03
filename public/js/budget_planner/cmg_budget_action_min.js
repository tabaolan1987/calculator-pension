/*
----------------Information--------------------------------

1.Budget Action JS

2.All functions in this file manage the action of user in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/

function registerFunctionsForTab(){$('a[data-toggle="tab"]').on("shown.bs.tab",function(b){var a=$($(b.target).find("td.tenPersent:eq(1) img"));a.attr("src","images/budget_planner/arrow_open.png");var c=$($(b.relatedTarget).find("td.tenPersent:eq(1) img"));c.attr("src","images/budget_planner/arrow_close.png");updateTotalZeroValueWhenCloseTab($(b.relatedTarget));if(chartExist){eneableCalculateBtn()}});$('button[data-target="#calculate"]').click(function(){var b=$("li.active a");updateTotalZeroValueWhenCloseTab(b);var a=checkZero();if(a){$("#myModal").modal("show");return false}});$('button[data-target="#calculate"]').on("shown.bs.tab",function(b){checkTotalOutcome();$(b.relatedTarget).find("td.tenPersent:eq(1) img").attr("src","images/budget_planner/arrow_close.png");$("div.panel-heading").find("td.tenPersent:eq(1) img").attr("src","images/budget_planner/arrow_up.png");var a=$(b.relatedTarget).attr("id");$(".panel-default .panel-heading #"+a).closest(".panel-heading").closest(".panel-default").find(".panel-collapse").collapse("hide");drawFlotJs();$(".panel-default div#collapse-calculate").collapse("show")})}function registerFunctionsForPanel(){$("div.panel-collapse").on("shown.bs.collapse",function(){var b=$(this).attr("id");$("div.panel-heading").find("a[href='#"+b+"']").find("td.tenPersent:eq(1) img").attr("src","images/budget_planner/arrow_down.png");if(chartExist){if(fakewaffle.currentPosition=="panel"&b!="collapse-calculate"){var a=$("#collapse-calculate").is(":visible");if(a){$("#collapse-calculate").collapse("hide")}eneableCalculateBtn()}}});$("div.panel-collapse").on("hidden.bs.collapse",function(){var b=$(this).attr("id");var a=$("div.panel-heading").find("a[href='#"+b+"']");updateTotalZeroValueWhenCloseTab(a);$("div.panel-heading").find("a[href='#"+b+"']").find("td.tenPersent:eq(1) img").attr("src","images/budget_planner/arrow_up.png")});$('button[data-target="#calculate"]').on("show.bs.tab",function(a){disableCalculateBtn()});$('button[data-target="#collapse-calculate"]').click(function(){var a=checkZero();if(a){$("#myModal").modal("show");return false}});$("#collapse-calculate").on("show.bs.collapse",function(a){if(fakewaffle.currentPosition=="panel"){disableCalculateBtn();checkTotalOutcome()}});$("#collapse-calculate").on("shown.bs.collapse",function(a){if(fakewaffle.currentPosition=="panel"){hideAllPanel();drawFlotJs()}})}function registerFunctionForModal(){$("#myModal .modal-footer button").click(function(){$("#myModal").modal("hide");if(fakewaffle.currentPosition=="tabs"){$('button[data-target="#calculate"]').tab("show")}else{hideAllPanel();$("#collapse-calculate").collapse("show")}disableCalculateBtn()})}function updateWhenChangeType(a){$inputs=$(a).parents("table").find("input.dataInput");$.each($inputs,function(){calculateInput($(this))})}function calculateInput(c){var a=parseFloat($(c).val());var b=$(c).parents("table").find("tr:eq(0) select").val();if(checkNumeric(a)){$(c).removeAttr("title");$(c).css("color","");a=calculateInputBaseOnType(a,parseInt(b));$(c).closest("tr").find(".monthly").html(Number(a).toLocaleString("en").split(".")[0]);$(c).closest("tr").find(".inputHidden").val(a)}else{if($(c).val().trim()!=""){$(c).attr("title","Please enter a number");$(c).css("color","#ff0000");$(c).closest("tr").find(".monthly").html(0);$(c).closest("tr").find(".inputHidden").val(0)}else{$(c).attr("title","Please enter a number");$(c).css("color","#000000");$(c).closest("tr").find(".monthly").html(0);$(c).closest("tr").find(".inputHidden").val(0)}}updateTotal(c)}function updateTotal(c){var b=getTotalInput($(c).closest("table"));if(fakewaffle.currentPosition=="tabs"){$("ul#myTab li.active").find("table.table-nonborder td:eq(1) span").html("£"+Number(b).toLocaleString("en").split(".")[0]);$("ul#myTab li.active").find(".table-responsive").find("tr:eq(0)").find("td.tenPersent img.validate").removeClass("hidden");$(c).parents().find(".tab-pane.active .table.totalCal span.totalMonthly").html(Number(b).toLocaleString("en").split(".")[0]);var a=$(c).parents().find(".tab-pane.active").attr("id");updateNumberToArray(a,b)}else{$(c).parents().find("div.active.panel-body").find(".table.totalCal span.totalMonthly").html(Number(b).toLocaleString("en").split(".")[0]);var a=$(c).parents().find("div.panel-default div.active.panel-body").attr("id");$(c).parents().find("a[href='#collapse-"+a+"']").find("table.table-nonborder td:eq(1) span").html("£"+Number(b).toLocaleString("en").split(".")[0]);$(c).parents().find("a[href='#collapse-"+a+"']").find(".table-responsive").find("tr:eq(0)").find("td.tenPersent img.validate").removeClass("hidden");updateNumberToArray(a,b)}eneableCalculateBtn()}function updateTotalZeroValueWhenCloseTab(d){try{var a=$(d).attr("href").replace("#","");if(fakewaffle.currentPosition=="panel"){a=a.split("-")[1]}var c=totalsArray[a];if(c==null){totalsArray[a]=0;$(d).find("td.tenPersent:eq(0) img").removeClass("hidden");$(d).find("table.table-nonborder td:eq(1) span").html("£0")}}catch(b){}}function getTotalInput(b){var a=0;$(b).find(".inputHidden").each(function(){var c=$(this).val();if(c!=""){a=a+parseFloat(c)}});return a}function checkNumeric(a){return a>=0&&!isNaN(parseFloat(a))&&isFinite(a)}function isNumberKey(b){var a=(b.which)?b.which:event.keyCode;if(a!=46&&a>31&&(a<48||a>57)){return false}return true}function updateNumberToArray(a,b){totalsArray[a]=b}function nextTab(b){if(fakewaffle.currentPosition=="tabs"){if(b<getSizeArray()){var a=b+1;$("ul li #a"+a).trigger("click")}else{$("ul li button#btnCalculate").trigger("click")}}else{if(b<getSizeArray()){var a=b+1;$(".panel-default .panel-heading #a"+a).trigger("click")}else{$(".panel-default .panel-heading #a"+b).trigger("click");$(".panel-default .panel-heading button#btnCalculate").trigger("click")}}}function disableCalculateBtn(){$("li #btnCalculate").prop("disabled",true);$(".panel-default #btnCalculate").prop("disabled",true);$("#lastBtn").prop("disabled",true)}function eneableCalculateBtn(){if(chartExist){$("li #btnCalculate").prop("disabled",false);$(".panel-default #btnCalculate").prop("disabled",false);$("#lastBtn").prop("disabled",false)}else{var b=getTotalIncome();var a=getTotalOutcome();if(b>0&a>0){$("li #btnCalculate").prop("disabled",false);$(".panel-default #btnCalculate").prop("disabled",false);$("#lastBtn").prop("disabled",false)}else{disableCalculateBtn()}}}function checkChromeBrowser(){if(navigator.userAgent.indexOf("Chrome")!=-1){return true}return false};