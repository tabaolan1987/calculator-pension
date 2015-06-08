/*
----------------Information--------------------------------

1.Budget Responsive tabs JS

2.All function in this file manage the responsive of tabs in page.

3.Version 1.0.0

4.Company - Claybourne McGregor Consulting Ltd 

5.Author - Lan.Ta 

6.Date - 30-03-2015

*/

var fakewaffle = ( function ( $, fakewaffle ) {
	'use strict';

	fakewaffle.responsiveTabs = function ( collapseDisplayed ) {

		fakewaffle.currentPosition = 'tabs';

		var tabGroups = $( '.nav-tabs.responsive' );
		var hidden    = '';
		var visible   = '';
		var activeTab = '';

		if ( collapseDisplayed === undefined ) {
			collapseDisplayed = ['xs'];
		}
		$.each( collapseDisplayed, function () {
			hidden  += ' hidden-' + this;
			visible += ' visible-' + this;
		} );

		$.each( tabGroups, function () {
			var $tabGroup   = $( this );
			var tabs        = $tabGroup.find( 'li a' );
			var btn  		= $tabGroup.find( 'li button' ); 
			var collapseDiv = $( '<div></div>', {
				'class' : 'panel-group responsive' + visible,
				'id'    : 'collapse-' + $tabGroup.attr( 'id' )
			} );

			$.each( tabs, function () {
				var $this          = $( this );
				var idA = $this.attr('id');
				var oldLinkClass   = $this.attr( 'class' ) === undefined ? '' : $this.attr( 'class' );
				var newLinkClass   = 'accordion-toggle';
				var oldParentClass = $this.parent().attr( 'class' ) === undefined ? '' : $this.parent().attr( 'class' );
				var oldStyleParent = $this.parent().attr('style') === undefined ? '' : $this.parent().attr('style');
				var newParentClass = 'panel-default';
				var newHash        = $this.get( 0 ).hash.replace( '#', 'collapse-' );

				if ( oldLinkClass.length > 0 ) {
					newLinkClass += ' ' + oldLinkClass;
				}

				if ( oldParentClass.length > 0 ) {
					oldParentClass = oldParentClass.replace( /\bactive\b/g, '' );
					newParentClass += ' ' + oldParentClass;
					newParentClass = newParentClass.replace( /\s{2,}/g, ' ' );
					newParentClass = newParentClass.replace( /^\s+|\s+$/g, '' );
				}

				if ( $this.parent().hasClass( 'active' ) ) {
					activeTab = '#' + newHash;
				}
				var oldSrcImage = $this.find('td.tenPersent:eq(1) img').attr('src');
				$this.find('td.tenPersent:eq(1) img').attr('src','images/budget_planner/arrow_up.png');
				collapseDiv.append(
					$( '<div>' ).attr( 'class', newParentClass ).html(
						$( '<div>' ).attr( 'class', 'panel-heading' ).attr('style',oldStyleParent).html(
							$( '<h4>' ).attr( 'class', 'panel-title' ).html(
								$( '<a>', {
									'id'          :idA,
									'class'       : newLinkClass,
									'data-toggle' : 'collapse',
									'data-parent' : '#collapse-' + $tabGroup.attr( 'id' ),
									'href'        : '#' + newHash,
									'html'        : $this.html()
								} )
							)
						)
					).append(
						$( '<div>', {
							'id'    : newHash,
							'class' : 'panel-collapse collapse'
						} )
					)
				);
				$this.find('td.tenPersent:eq(1) img').attr('src',oldSrcImage);
			} );
			$.each( btn, function () {
				var $this          = $( this );
				var idA = $this.attr('id');
				var oldLinkClass   = $this.attr( 'class' ) === undefined ? '' : $this.attr( 'class' );
				var newLinkClass   = 'accordion-toggle';
				var oldParentClass = $this.parent().attr( 'class' ) === undefined ? '' : $this.parent().attr( 'class' );
				var oldStyleParent = $this.parent().attr('style') === undefined ? '' : $this.parent().attr('style');
				var newParentClass = 'panel-default';
				var newHash        = 'collapse-calculate';

				if ( oldLinkClass.length > 0 ) {
					newLinkClass += ' ' + oldLinkClass;
				}

				if ( oldParentClass.length > 0 ) {
					oldParentClass = oldParentClass.replace( /\bactive\b/g, '' );
					newParentClass += ' ' + oldParentClass;
					newParentClass = newParentClass.replace( /\s{2,}/g, ' ' );
					newParentClass = newParentClass.replace( /^\s+|\s+$/g, '' );
				}

				if ( $this.parent().hasClass( 'active' ) ) {
					activeTab = '#' + newHash;
				}
				collapseDiv.append(
					$( '<div>' ).attr( 'class', newParentClass ).html(
						$( '<div>' ).attr( 'class', 'panel-heading' ).attr('style',oldStyleParent).html(
							$( '<h4>' ).attr( 'class', 'panel-title' ).html(
								$( '<button>', {
									'id'          :idA,
									'class'       : newLinkClass,
									'data-toggle' : 'collapse',
									'data-target' : '#collapse-calculate',
									'data-parent' : '#collapse-' + $tabGroup.attr( 'id' ),
									'html'        : $this.html()
								} )
							)
						)
					).append(
						$( '<div>', {
							'id'    : newHash,
							'class' : 'panel-collapse collapse'
						} )
					)
				);
			} );
			$tabGroup.after( collapseDiv );
			$tabGroup.addClass( hidden );
			$( '.tab-content.responsive' ).addClass( hidden );
		} );


		fakewaffle.checkResize();
		fakewaffle.bindTabToCollapse();

		if ( activeTab ) {
			$( activeTab ).collapse( 'show' );
		}
	};

	fakewaffle.checkResize = function () {

		if ( $( '.panel-group.responsive' ).is( ':visible' ) === true && fakewaffle.currentPosition === 'tabs' ) {
			fakewaffle.tabToPanel();
			fakewaffle.currentPosition = 'panel';
		} else if ( $( '.panel-group.responsive' ).is( ':visible' ) === false && fakewaffle.currentPosition === 'panel' ) {
			fakewaffle.panelToTab();
			fakewaffle.currentPosition = 'tabs';
			setHeightTabPane();
		}

	};

	fakewaffle.tabToPanel = function () {

		var tabGroups = $( '.nav-tabs.responsive' );

		$.each( tabGroups, function ( index, tabGroup ) {
			// Find the tab
			var tabContents = $( tabGroup ).parent().parent().find( '.tab-content' ).find( '.tab-pane' );
			var index=0;
			$.each( tabContents, function ( index, tabContent ) {
				// Find the id to move the element to
				var destinationId = $( tabContent ).attr( 'id' ).replace ( /^/, '#collapse-' );
				var $table = $(tabContent).find('table.containInput');
				var total = getTotalInput($table);
				// Convert tab to panel and move to destination
				$( tabContent )
					.removeClass( 'tab-pane' )
					.addClass( 'panel-body' )
					.appendTo( $( destinationId ) );
				//update total for panel	
				if(total > 0){
					$( destinationId ).parents().find("div.panel-default:eq("+index+") table.table-nonborder td:eq(1) span").html('£'+total);
					$( destinationId ).parents().find("div.panel-default:eq("+index+")").find('.table-responsive').find('tr:eq(0)').find('td.tenPersent img.validate').removeClass('hidden');
				}else{
					$( destinationId ).parents().find("div.panel-default:eq("+index+") table.table-nonborder td:eq(1) span").html('');
					$( destinationId ).parents().find("div.panel-default:eq("+index+")").find('.table-responsive').find('tr:eq(0)').find('td.tenPersent img.validate').addClass('hidden');
				}
				index++;
			} );

		} );

	};

	fakewaffle.panelToTab = function () {

		var panelGroups = $( '.panel-group.responsive' );

		$.each( panelGroups, function ( index, panelGroup ) {
			var destinationId = $( panelGroup ).attr( 'id' ).replace( 'collapse-', '#' );
			var destination   = $( destinationId ).parent().parent().find( '.tab-content' )[ 0 ];

			// Find the panel contents
			var panelContents = $( panelGroup ).find( '.panel-body' );
			$.each(panelContents,function(){
				var idPanel = $(this).attr('id');
			    var $table = $(this).find('table.containInput');
				var total = getTotalInput($table);
				if(total > 0 && idPanel!=='calculate'){
					$("ul#myTab a[data-target='#"+idPanel+"']").find('table.table-nonborder td:eq(1) span').html('£'+total);
					$("ul#myTab a[data-target='#"+idPanel+"']").find('.table-responsive').find('tr:eq(0)').find('td.tenPersent img.validate').removeClass('hidden');
				}else{
					$("ul#myTab a[data-target='#"+idPanel+"']").find('table.table-nonborder td:eq(1) span').html('');
					$("ul#myTab a[data-target='#"+idPanel+"']").find('.table-responsive').find('tr:eq(0)').find('td.tenPersent img.validate').addClass('hidden');	
				}
				
			});
			// Convert to tab and move to destination
			panelContents
				.removeClass( 'panel-body' )
				.addClass( 'tab-pane' )
				.appendTo( $( destination ) );
		} );
		setHeightTabPane();
	};

	fakewaffle.bindTabToCollapse = function () {

		var tabs     = $( '.nav-tabs.responsive' ).find( 'li a' );
		var collapse = $( '.panel-group.responsive' ).find( '.panel-collapse' );
		// Toggle the panels when the associated tab is toggled
		tabs.on('shown.bs.tab', function ( e ) {
			var $current  = $( e.currentTarget.hash.replace( /#/, '#collapse-' ) );
			$current.collapse( 'show' );
			$current.closest('div.panel-default').find('a').removeClass('collapsed');
			if ( e.relatedTarget ) {
				var $previous = $( e.relatedTarget.hash.replace( /#/, '#collapse-' ) );
				$previous.collapse( 'hide' );
				$previous.closest('div.panel-default').find('a').addClass('collapsed');
				
			}
		} );
		// Toggle the tab when the associated panel is toggled
		collapse.on('shown.bs.collapse', function ( e ) {
			// Activate current tabs
			var current = $( e.target ).context.id.replace( /collapse-/g, '#' );
			$( 'a[href="' + current + '"]' ).tab( 'show' );
			// Update the content with active
			var panelGroup = $( e.currentTarget ).closest( '.panel-group.responsive' );
			$( panelGroup ).find( '.panel-body' ).removeClass( 'active' );
			$( e.currentTarget ).find( '.panel-body' ).addClass( 'active' );
		} );
		
		
		
	};

	$( window ).resize( function () {
		fakewaffle.checkResize();
	} );

	return fakewaffle;
}( window.jQuery, fakewaffle || { } ) );
