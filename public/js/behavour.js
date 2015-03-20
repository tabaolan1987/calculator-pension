//on document ready
$(function() { 
 
        	
	$('#cookieBtn').click(function() {
		$('#NoCookies').hide();
		return false;
	});
	
	
 	$('.footer-nav .active').parent().parent().addClass('open');
	
	
    //add class to body - mobile or large
    window.setTimeout( function() {
        whatSize();
        //run desktop or mobile scripts
        if ( $('.mobile').length ) {
            mobile();
        } else {
            desktop();        
        }
    
    }, 50);
    
    resizeVideo();
    //amend body class same on resize
    $(window).resize(function() {
 
        whatSize();
    });
    
    //mobile & desktop scripts
    
    //cookiesConsent checkboxes
    //toggle visablility when you click a checkbox
    $('#cookiesConsent input:checkbox').change(function () {
        if (this.id === "PerformanceCookiesCheckbox") {
            $('#performanceCookiesTd1 div, #performanceCookiesTd2 div').toggle();
        } else if (this.id === "FunctionalityCookiesCheckbox") {
            $('#functionalityCookiesTd1 div, #functionalityCookiesTd2 div').toggle();
        } else if (this.id === "TargetingCookiesCheckbox") {
            $('#targetCookiesTd1 div, #targetCookiesTd2 div').toggle();
        }
    });

    $('.js-toggle').change(function () {
        if ($(this).val() === "Other") {
            $(this).parent().parent().next(".js-toggle-item").slideDown();
        } else {
            $(this).parent().parent().next(".js-toggle-item").slideUp();
        }
    });   

	
    //carousel
    $(".slideshow").CarouSlide({
            animType:"fade",
            animInfinity:true,
            showSlideNav:true,
            autoAnim:true,
            showPauseButton:true,
            showBackNext:false,
            animTime:1200,
            slideTime:5000
    });
    
    $('body').removeClass('nojs').addClass('js');
    
    //Open external links in new windows
    var external = $('a[rel="external"]');


    //Take the links current title and append it with the external link message
    external.attr("title", external.attr("title") + " - Link opens in a new window..");

    external.append('<img src="/assets/MoneySkills/images/site/icons/icn-externalLink.png" alt="external link" />');

    //When an external link is clicked
    external.click(function () {

        window.open($(this).attr('href'));
        //Cancel the links default behaviour
        return false;
    });

    //Clear and reset site search
    $(".fldSiteSearch").css('color','#CCC0C0');
    
    $(".fldSiteSearch").focus(function () {
        if (this.value == this.defaultValue) {
            this.value = "";
            $(this).css('color','#333333');
        }
    }).blur(function () {
        if (!this.value.length) {
            this.value = this.defaultValue;
            $(this).css('color','#CCC0C0');
        }
    });

    //open external links in new window
    $("a[href^=http]").each(function () {
        if (this.href.indexOf(location.hostname) == -1) {
            $(this).attr({
                target: "_blank",
                title: "Opens in a new window"
            });
        }
    });
    // This function is called in build input element attributes
    window.doClear = function(thing) {};
});//end doc ready


function resizeVideo() {
       
   
    var newWidth = 450;
    
    //find iframes that contain video and update ratio and wrap in a div 
    $('iframe[src^="http://www.media.barclays.co.uk/player/"]').each(function(i,o) {
         
        
        var ratio = $(o).height() / $(o).width(); 
       

            $(o).attr('width', newWidth);
            $(o).attr('height', newWidth * ratio);

        if($(o).parent().attr('class') !== "video-embed")    
        {
            $(o).wrap('<div class="video-embed"></div>');
        }
    });
    
}


//check window width & add class to body
function whatSize() {
    var whatWidth =  $(window).width();
    var $body = $('body');
    var bodyClass;
    if(whatWidth < 550){
        bodyClass = 'mobile';
    } else if (whatWidth >= 550){
        bodyClass = 'large';
    }
    $body.removeClass('mobile large').addClass(bodyClass);
}


//all desktop stuff
function desktop(){

	
    
    $('.frmRating div').raty({
            path: "/assets/MoneySkills/images/site/jquery.raty/"
    });

	if($('table.summary').length > 0) {
		
    	// DOESN'T APPEAR TO BE IN USE AND BREAKNG JS 
		//$('table.summary').visualize({type: 'pie', width: '294px', height: '260px', colors: ['#00adef','#dc630a','#46dc0b','#e7ab19','#067aa9','#b4b4b4']});
	}

	
    //$("select").uniform();
    // Below we are targetting specific selectboxes for uniformification rather than all, everywhere.
    $("#champions-activity-record select, #pane7 select").uniform();

    if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        }
    }

    // JargonBuster tooltip
    // - can be done 2 different ways in cms resulting in either:
    // 1. A link
    // 1. A span containing link
    $('.JargonBuster, .jargonbuster').each(function() {
        //get the href of the link
        if($(this).is('a')){
            var JBurl = $(this).prop('href');
        }else{
            var JBurl = $(this).find('a').prop('href');
        }
        //get the term
        var JBterm = encodeURIComponent($(this).text());
        //load the JargonBuster info
        $(this).load(JBurl+'?term='+JBterm);
    });
    
    $('.JargonBuster, .jargonbuster').hover(
        function () {
            $('.jargon-wrap').hide();
            $(this).find('.jargon-wrap').stop().show().css('opacity','1');
        },
        function () {
            $(this).find('.jargon-wrap').delay(800).fadeOut(500);
        }
    );
        
    $(".JargonBuster, .jargonbuster").delegate(".jargon-wrap", "mouseenter", function(){
            $(this).stop().css('opacity','1').show();
    });

    //Datepicker (Champions activity record form)
    if ($.pikaday != undefined) {
        $('.datepicker').pikaday({ firstDay: 1 });
    }
    
    if ($('#champions-activity-record').length>0) {
        $('.pika-single').addClass('pika-champions-activity-record');
    }    

    //print page
    $('.print').click(function () {
        window.print();
        return false;
    })

    /* -- Budget calculator -- */

    $('.noJScalc').hide();
    $('.calculator').show();

    $('.introduction a.btn').click(function () {

        pane = "1";

        $('.tabs #0').removeClass("active");
        $('.tabs #1').addClass("active");

        $('.paneHeader').removeClass('hidden');
        $('.totalsWrapper').removeClass('throwOff');
        $('.calculatorNavigation').removeClass('throwOff');

        $('.pane0').addClass("throwOff");
        $('.pane1').removeClass("throwOff");

        return false;

    })

    $('.calculatorNavigation li a').click(function () {

        pane = parseInt(pane);

        if ($(this).parent('li').attr('class') == "next") {
            pane++;
        } else {
            pane--;
        }

        $('ul.tabs li').removeClass('active');
        $('li#' + pane).addClass('active');

        $('.panes div.pane').addClass("throwOff");
        $('.panes div.pane' + pane).removeClass("throwOff");

        if (pane == 7) {
            $('.calculatorNavigation').addClass('throwOff');
        }
        
        var paneid = '#pane' + pane;
        //$(paneid + ' select, ' + paneid + ' input').eq(0).focus();
        window.scrollTo(0, $('.calculatorWrapper').position().top);
        return false;
    })

    var totalsArray = new Array();
    totalsArray["pane1"] = 0;
    totalsArray["pane2"] = 0;
    totalsArray["pane3"] = 0;
    totalsArray["pane4"] = 0;
    totalsArray["pane5"] = 0;
    totalsArray["pane6"] = 0;
    totalsArray["pane7"] = 0;

    function updateTotals(thePane) {
        
        var allMonths = 0;

        $('#' + thePane).find('.monthly').each(function () {

            if (parseInt($(this).children('span').children('input').val()) >= 0.00) {
                allMonths = allMonths + parseFloat($(this).children('span').children('input').val());
            }
        });

        $('#' + thePane).find('.totals p strong').html("&pound;" + parseFloat(allMonths.toFixed(2)));


        totalsArray["pane" + pane] = allMonths;

        // Grab the total income from the correct pane
        var totalIncome = totalsArray["pane1"];
        $('.summaryList li:nth-child(1)').children('span').text(totalIncome.toFixed(2));

        // Add all the outgoing costs together and update all tabs
        var totalOutgoings = totalsArray["pane2"] + totalsArray["pane3"] + totalsArray["pane4"] + totalsArray["pane5"] + totalsArray["pane6"] + totalsArray["pane7"];
        $('.summaryList li:nth-child(2)').children('span').text(totalOutgoings.toFixed(2));

        // Calculate the disposable income
        var disposable = totalIncome - totalOutgoings;
        $('.summaryList li:nth-child(3)').children('span').text(disposable.toFixed(2));

        // Update the totals on the final tab
        $('fieldset.summary input').each(function (i) {
            i++;
            $(this).val(totalsArray["pane" + i])
        })

        $('table.summary.throwOff tbody td').each(function (i) {
            i++;

            // Need to skip the first value in the totalsArray (which is income)
            var valuesIndex = i + 1;

            // Bug in IE where 0 values cause problems, need to add a value of at least 2
            // multiple all other values by 1000 so that the 2 values do not show
            var value = totalsArray["pane" + valuesIndex];
            var correctedValue = value < 2 ? 2 : value * 1000;

            $(this).text(correctedValue);
        })

        $('table.summary.displayValues tbody td').each(function (i) {
            i++;

            // Need to skip the first value in the totalsArray (which is income)
            var valuesIndex = i + 1;

            $(this).text(totalsArray["pane" + valuesIndex]);
        })

        // Update the pie chart
        drawChart(totalsArray);
    }

    function checkNumeric(checkThis) {
        return checkThis >= 0 && !isNaN(parseFloat(checkThis)) && isFinite(checkThis);
    }

    $('.frmBudgetCalc table tbody tr').each(function () {
        $(this).children('td:nth-child(2)').addClass('weekly');
        $(this).children('td:nth-child(3)').addClass('fortnightly');
        $(this).children('td:nth-child(4)').addClass('monthly');
    })

    $('.frmBudgetCalc td.weekly input').blur(function () {
        if (checkNumeric($(this).val())) {
            $(this).css('color', '#000000');
            var weeklyVal = parseFloat($(this).val());
            var fortnightlyVal = weeklyVal * 2;
            var monthlyVal = weeklyVal * 52 / 12;
            $(this).val(weeklyVal.toFixed(2));
            $(this).parents('span').parents('td').siblings('.fortnightly').find('input').val(fortnightlyVal.toFixed(2));
            $(this).parents('span').parents('td').siblings('.monthly').find('input').val(monthlyVal.toFixed(2));
            updateTotals($(this).closest('.pane').attr('id'));
        } else if ($(this).val().trim() != '') {
            $(this).css('color', '#ff0000');
        } else {
            $(this).css('color', '#000000');
            $(this).val('');
            $(this).parents('span').parents('td').siblings('.fortnightly').find('input').val('');
            $(this).parents('span').parents('td').siblings('.monthly').find('input').val('');
            updateTotals($(this).closest('.pane').attr('id'));
        }
    })

    $('.frmBudgetCalc td.fortnightly input').blur(function () {
        if (checkNumeric($(this).val())) {
            $(this).css('color', '#000000');
            var fortnightlyVal = parseFloat($(this).val());
            var weeklyVal = fortnightlyVal / 2;
            var monthlyVal = fortnightlyVal * 26 / 12;
            $(this).val(fortnightlyVal.toFixed(2));
            $(this).parents('span').parents('td').siblings('.weekly').find('input').val(weeklyVal.toFixed(2));
            $(this).parents('span').parents('td').siblings('.monthly').find('input').val(monthlyVal.toFixed(2));
            updateTotals($(this).closest('.pane').attr('id'));
        } else if ($(this).val().trim() != '') {
            $(this).css('color', '#ff0000');
        } else {
            $(this).css('color', '#000000');
            $(this).val('');
            $(this).parents('span').parents('td').siblings('.weekly').find('input').val('');
            $(this).parents('span').parents('td').siblings('.monthly').find('input').val('');
            updateTotals($(this).closest('.pane').attr('id'));
        }
    })

    $('.frmBudgetCalc td.monthly input').blur(function () {
        if (checkNumeric($(this).val())) {
            $(this).css('color', '#000000');
            var monthlyVal = parseFloat($(this).val());
            var weeklyVal = monthlyVal * 12 / 52;
            var fortnightlyVal = monthlyVal * 12 / 26;
            $(this).val(monthlyVal.toFixed(2));
            $(this).parents('span').parents('td').siblings('.weekly').find('input').val(weeklyVal.toFixed(2));
            $(this).parents('span').parents('td').siblings('.fortnightly').find('input').val(fortnightlyVal.toFixed(2));
            updateTotals($(this).closest('.pane').attr('id'));
        } else if ($(this).val().trim() != '') {
            $(this).css('color', '#ff0000');
        } else {
            $(this).css('color', '#000000');
            $(this).val('');
            $(this).parents('span').parents('td').siblings('.weekly').find('input').val('');
            $(this).parents('span').parents('td').siblings('.fortnightly').find('input').val('');
            updateTotals($(this).closest('.pane').attr('id'));
        }
    })

    // Suppress return key if the calculator is present, but not for the seach field
    function stopRKey(evt) {

        var evt = (evt) ? evt : ((event) ? event : null);
        var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);

        if (typeof (node) !== 'undefined') {
            if ($(node).closest('.search-box input:text').length == 0) {
                if ((evt.keyCode == 13) && (node.type == "text")) {
                    return false;
                }
            }
        }
    }
    document.onkeypress = stopRKey;
    
    // Add new item
    
    $('.frmBudgetCalc .editable input').keydown(function(e) {
        
        if (e.which != 8 && e.which != 9) {
            $(this).parents('.editable').next().removeClass('hidden');
        }
    });
    
    $('.frmBudgetCalc .fieldWrapper input').click(function() {
        this.select();
    });

    // Budget calculator pane 2 size adjustments

    $(".tabs #1 a").click(function () {

        $(".paneHeader").addClass("alt");
    });

    $(".tabs #1").siblings().children().click(function () {

        $(".paneHeader").removeClass("alt");
    });
	
	$("#getStarted").click(function () {

        $(".paneHeader").addClass("alt");
	});
	
	$("ul.calculatorNavigation .next a").click(function () {

        $(".paneHeader").removeClass("alt");
        $('.pane:not(.throwOff) input, .pane:not(.throwOff) select').eq(0).focus();
	});
	
	$("ul.calculatorNavigation .prev a").click(function () {

		if ($('#pane2').hasClass('throwOff')) {
			// nothing
		}
		else {
			$(".paneHeader").addClass("alt");
		}
		
	});
	
	$("ul.calculatorNavigation .prev a").click(function () {

		if ($('#pane1').hasClass('throwOff')) {
			// nothing
		}
		else {
			$(".paneHeader").addClass("alt");
		}
		
	});
    
    // To enhance keyboard accessibility
    $('.tab-trap').focus(function() {
        $('.calculatorNavigation .prev a').focus();
    });
    $('#trap-warp').focus(function() {
        //$('.pane:not(.throwOff) input, .pane:not(.throwOff) select').eq(0).focus();
    });


    //Pie chart ===========

    $('div.rangeChanger select').change(function () {

        rangeChanger = this;

        if ($(rangeChanger).val() == "weekly") {
        
            $('.summary input').each(function (i) {
                i++;
                var totalIncome = ((totalsArray["pane" + i] * 12) / 52).toFixed(2);
                $(this).val(totalIncome);
            })

        } else if ($(rangeChanger).val() == "fortnightly") {
        
            $('.summary input').each(function (i) {
                i++;
                $(this).val(((totalsArray["pane" + i] * 12) / 26).toFixed(2));
            })

        } else if ($(rangeChanger).val() == "monthly") {

            $('.summary input').each(function (i) {
                i++;
                $(this).val(totalsArray["pane" + i]);
            })
        }
    })

    if (typeof (inPageEditor) == "undefined") {

        var pane = "0";

        if ('.tabbedContent') {

            $('.tabbedContent').not('.home .tabbedContent').addClass('panes');

            var totalPane = 0;

            $('.paneHeader').addClass('hidden');
            $('.totalsWrapper').addClass('throwOff');
            $('.calculatorNavigation').addClass('throwOff');

            if ($('.tabWrapper').length == 0) {
                $('.panes').before("<div class='tabWrapper'><ul class='tabs'></ul></div>");
                $('.panes div.pane').each(function (i) {
                    if ($(this).find('.panelHeading').text()) {
                        $('ul.tabs').append("<li id='" + i + "'><a href='#'><span><span>" + $(this).find('.panelHeading').text() + "</span></span></a></li>");
                    }
                });
            }

            $('.panes div.pane').each(function (i) {
                totalPane++;
                $(this).addClass('pane' + i);
                $(this).find('.panelHeading').addClass("throwOff");
            });

            $('ul.tabs li#0').addClass('active');

            $('.panes div.pane').addClass("throwOff");
            $('.panes div.pane0').removeClass("throwOff");

            $('ul.tabs a').click(function () {

                $('ul.tabs li').removeClass('active');
                $(this).parent('li').addClass('active');

                pane = $(this).parent('li').attr('id');

                $('.panes div.pane').addClass("throwOff");
                $('.panes div.pane' + pane).removeClass("throwOff");

                if (pane == 0) {
                    $('.paneHeader').addClass('hidden');
                    $('.totalsWrapper').addClass('throwOff');
                    $('.calculatorNavigation').addClass('throwOff');
                } else {
                    $('.paneHeader').removeClass('hidden');
                    $('.totalsWrapper').removeClass('throwOff');
                    $('.calculatorNavigation').removeClass('throwOff');
                }

                if (pane == 7) {
                    $('.calculatorNavigation').addClass('throwOff');
                }

                $('.step').text("Step " + (parseInt(pane) + 1) + " of " + totalPane + ":");

                return false;
            });
        }
    }
	
	// weeks registration form
	// (for prototype only)
	if (window.location["host"].split('.')[0] == "prototype") {
		$('#collegeDropDownRow select').change(function() {
			if ($('#collegeDropDownRow select').val()=="Other") {
				$('#otherCollegeRow').css('visibility','visible').slideDown('fast');
			} else {
				$('#otherCollegeRow').slideUp('fast');
			}
		});
	}
	
	// Help tool tip
    var timeThing = "";
	var showToolTip = function(e) {
        window.clearTimeout(timeThing);
		var target = $(this).attr('href');
		$('.toolTip').addClass('hidden');
		$(target).removeClass('hidden').css('top', ($('.helpTip').position().top + 10) + 'px');
		e.preventDefault();
	};
    var waitHideTip = function(id) {
        timeThing = window.setTimeout(function() {
            $(id).addClass('hidden');
        }, 1000);
    };
	$('.helpTip').click(showToolTip);
	$('.helpTip').hover(showToolTip, function() {
        waitHideTip($(this).attr('href'));
    });
    /* $('.toolTip').hover(function() {
        window.clearTimeout(timeThing);
    }, function() {
        waitHideTip('#' + $(this).attr('id'));
    }); */
	$('html').click(function() {
		$('.toolTip').addClass('hidden');
	});
	$('.toolTip, .helpTip').click(function(e) {
		e.stopPropagation();
	});

    $('#printableFormBtn').click(function(e) {
        window.open('print.php', 'printable', "height=700,width=700,scrollbars=yes,menubar=yes");
        e.preventDefault();
    });

    //ie6-8 fade fix
    if (!$.support.opacity) {
        var newHeight = $('body').height();
        $('#fade').height(newHeight);
    }

}//end desktop stuff

//all mobile stuff
function mobile() {
	

	
    var $primeNav = $('.primaryNavigation');
    $primeNav.click(function(e) {
        var $target = $(e.target);
        //if ($target.is('a, span') { return; }
        if ($target.is('li')) {
            $target.toggleClass('open');
        }
        if ($target.is('.openBtn')) {
            $target.parent().toggleClass('open');
        }
    });
    var $footerNav = $('.footer-nav');
    $footerNav.click(function(e) {
        var $target = $(e.target);
        if ($target.is('li')) {
            $target.toggleClass('open');
        }
    });
    
    $('#header-buttons .menu').click(function(e) {
        e.preventDefault();
        $primeNav.toggleClass('primaryNavigation--open');
        $(this).toggleClass('pressed');
    });
    $('#header-buttons .search').click(function(e) {
        e.preventDefault();
        $('.frmSiteSearch').toggleClass('frmSiteSearch--open');
        $(this).toggleClass('pressed');
        $('.frmSiteSearch--open input[type="text"]').focus();
    });
    $primeNav.children().add($primeNav.find('.parent')).each(function(i, e) {
        //enhancement: place <buttons> in openable list items, so they would be keyboard-accessible (phone keyboard?)
    });
    /*
    $('.videoEmbedWrapper').each(function(i,e) {
        $(e)
        //.append('<a class="watchVideo" href="' + $(e).children('iframe').attr('src').split("&")[0] + '">watch this video</a>')
        .find('iframe').css('height', ($(e).width() * (340/604)) + 'px');
    });
    */
    
    // Jargon buster page
    if ($('.jargonBuster').length > 0) {
        var $atoz = $('.aToz');
        var azList = [];

        $atoz.children().each(function(i, e) {
            azList.push({
                title : $(e).text(),
                link : $(e).find('a').attr('href')
            });
        });
        var $azSelect = $('<select/>', {
            change: function() {
                var target = $(this).find(':selected').attr('data-target');
                if (target !== "undefined") {
                    $('html, body').animate({scrollTop : $(target).offset().top});
                    console.log($(target).offset().top);
                }
            },
            id: "azSelect"
            //using 'class' here makes IE fail - reserved word
        });
        $azSelect.addClass('azSelect');
        for (var i = 0; i < azList.length; i += 1) {
            //$azSelect.append('<option data-target="' + azList[i].link + '">' + azList[i].title + '</option>');
            if (azList[i].link !== undefined) {
                var $opt = $('<option data-target="' + azList[i].link + '">' + azList[i].title + '</option>');
                $opt.appendTo($azSelect);
            }
        }
        $azSelect.insertBefore($atoz).wrap('<div class="azSelectWrapper"/>');
    }
    
    // Jargon Buster modals
    $('.JargonBuster, .jargonbuster').each(function(i, e) {
        //get the href of the link
        var $me = $(this);
        var jbIdentifier = "jb-" + i;
        if($(this).is('a')){
            var JBurl = $(this).prop('href');
        } else {
            var JBurl = $(this).find('a').prop('href');
        }
        //load the JargonBuster info
        $.get(JBurl, function(data) {
            $(data).attr('id', jbIdentifier)
                .click(function(e) {
                    var $target = $(e.target);
                    if ($target.is('.close')) {
                        e.preventDefault();
                        $(this).removeClass('jb--open');
                    }            
                })
                .insertAfter($me)
                .find('.head').append('<button class="close">\u00D7<span class="visually-hidden">close</span></button>');
        });
        $(e).data('jqPanel', jbIdentifier)
            .click(function(e) {
            e.preventDefault();
                $('.jargon-term').removeClass('jb--open');
                $('#' + $(this).data('jqPanel')).addClass('jb--open');
                console.log('#' + $(this).data('jqPanel'));
        });
    });
    
    //footer info links
    $('.footer-topic:contains("Also see")').text('More Info');
    //$('.footer-topic + ul').hide();
    $('.footer-topic').click(function(e) {
        $(this).toggleClass('open').next('ul').toggle();
        e.preventDefault();
    });
    

	
} //end mobile stuff

//other stuff
function addLegend() {

    $($('span.visualize-key-color')[0]).append('<img src="/assets/MoneySkills/images/site/bullets/leg_household_bills.gif"></img>');
    $($('span.visualize-key-color')[1]).append('<img src="/assets/MoneySkills/images/site/bullets/leg_living_costs.gif  "></img>');
    $($('span.visualize-key-color')[2]).append('<img src="/assets/MoneySkills/images/site/bullets/leg_travel.gif"></img>');
    $($('span.visualize-key-color')[3]).append('<img src="/assets/MoneySkills/images/site/bullets/leg_financial_products.gif"></img>');
    $($('span.visualize-key-color')[4]).append('<img src="/assets/MoneySkills/images/site/bullets/leg_savings.gif"></img>');

    return false;
}

function drawChart(totalsArray) {
    if (
        (totalsArray["pane2"] == null || totalsArray["pane2"] == 0) &&
        (totalsArray["pane3"] == null || totalsArray["pane3"] == 0) &&
        (totalsArray["pane4"] == null || totalsArray["pane4"] == 0) &&
        (totalsArray["pane5"] == null || totalsArray["pane5"] == 0) &&
        (totalsArray["pane6"] == null || totalsArray["pane6"] == 0))
         {
        totalsArray["pane2"] = 1;
        totalsArray["pane3"] = 1;
        totalsArray["pane4"] = 1;
        totalsArray["pane5"] = 1;
        totalsArray["pane6"] = 1;
    }

    var data = google.visualization.arrayToDataTable([
          ['Task', 'Money'],
          ['Household bills', totalsArray["pane2"]],
          ['Living costs', totalsArray["pane3"]],
          ['Travel', totalsArray["pane4"]],
          ['Repayments', totalsArray["pane5"]],
          ['Savings', totalsArray["pane6"]]
        ]);

    var options = {
        legend: { position: 'none' },
        sliceVisibilityThreshold: 0,
        colors: ['#00adef', '#dc630a', '#46dc0b', '#e7ab19', '#067aa9', '#b4b4b4'],
        pieSliceBorderColor: 'black',
        pieSliceText: 'percentage',
        pieSliceTextStyle: { color: 'black', fontSize: 13, bold: true },
        chartArea: { left: 40, top: 40, width: 220, height: 220 },
        tooltip: { trigger: 'none' }
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);

    if(
        totalsArray["pane2"] == 1 &&
        totalsArray["pane3"] == 1 &&
        totalsArray["pane4"] == 1 &&
        totalsArray["pane5"] == 1 &&
        totalsArray["pane6"] == 1
    )
    {
        totalsArray["pane2"] = null;
        totalsArray["pane3"] = null;
        totalsArray["pane4"] = null;
        totalsArray["pane5"] = null;
        totalsArray["pane6"] = null;
    }
    //addLegend();
}
/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT / GPLv2 License.*/(function(a){function m(){d.setAttribute("content",g),h=!0}function n(){d.setAttribute("content",f),h=!1}function o(b){l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),k=Math.abs(l.z),(!a.orientation||a.orientation===180)&&(i>7||(k>6&&j<8||k<8&&j>6)&&i>5)?h&&n():h||m()}var b=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf("AppleWebKit")>-1))return;var c=a.document;if(!c.querySelector)return;var d=c.querySelector("meta[name=viewport]"),e=d&&d.getAttribute("content"),f=e+",maximum-scale=1",g=e+",maximum-scale=10",h=!0,i,j,k,l;if(!d)return;a.addEventListener("orientationchange",m,!1),a.addEventListener("devicemotion",o,!1)})(this); 