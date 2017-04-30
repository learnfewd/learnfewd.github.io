
var wordsplit = 25;
function splitthis(wtxt) {
	var words = wtxt.split(" ");
	var build = "<span class='morefirst'>";
	hassplit = false;
	$.each(words, function( index, value ) {
		build += value + " ";
		if (index > wordsplit) {
			hassplit = true;
			build = $.trim(build);
			build += "</span><span class='moredots'>...</span> <span class='moreextra'>";
		}
		build += " ";
	});
	build = $.trim(build);
	if (!hassplit) {  build += "</span>" }
	return build;
}
function toggleitem(wbut) {
	var ob = $($(wbut).attr("rel"));
	obb = $("." + ob.attr("rel"));
	if (ob.hasClass("shown")) {
		ob.removeClass("shown");
		obb.removeClass("shown");
		ob.hide();

		$(wbut).removeClass("shownmenu");
	}
	else {	// if closed, open
		$(".shownmenu").trigger("click"); // close open;
		$(wbut).addClass("shownmenu");

		ob.addClass("shown");
		obb.addClass("shown");
		ob.show();
	}

}

var issmall = true;
function togglesetmapsize(e) {
	console.log("TOGGLE");
	// loadpoints();
	 issmall = !issmall;
	 setmapsize(true);
	 stopit(e);

	 if (typeof(scrolltomap) == "function") {
	 	scrolltomap(true);
	 }
}


function setmapsize(e) {

	if (typeof(istrail) != "undefined") { return;}

	if (!mobile) {

		if (empty($("#map-canvas").attr("data-width"))) {
			$("#map-canvas").width("950px");
		}
		else {
			$("#map-canvas").width($("#map-canvas").attr("data-width"));
		}
		return;

	}


	var pagewidth = $(window).width();
	var pageheight = $(window).height();
	var mheight = $(".mobheader").height() +  $(".nethead").height();

	var padding = 20;
	var hheight = 0; //.$(".mapholder").offset().top;
	var aheight = pageheight - hheight - padding * 2 - 50; // extra for foot
	var gwidth = pagewidth - padding * 2;



	var hideelems = ".townextras, #footer-top, .goback.gorel, .goback.mobile,.viewback, .heading-wrap, #footer-wrap, .maintop, .mainbot, .sub, .nhabovemap, .mapfullhide, .hidemapfull, .gotop, .mobile-highlights, .nh-page-heading";

	// district / scroll page items
	hideelems += ",.scroll-item, .shash, .anchoritem, .fixedbg, .shareplaceholder, .intro, .ipoints, .altback";


	var availheight;

	if (issmall) { // for small map


		availheight = pageheight - mheight;
		$(".loadingmap").hide();

		//$("#map-canvas").stop().animate({ height: availheight }, 400);
		if ( ($("BODY.neighborhood").size() > 0 && $("BODY.nhmappage").size() === 0 ) ||  $("BODY.district").size() > 0){ // nh page, but not nhmap page
			aheight = 180;
			$(".mapmobbuttons").hide();
			gwidth = pagewidth;
			padding = 0;
			$("#map-canvas").hide();
			$("#map-canvassmall").show();


		}
		else {
			availheight = availheight * 0.6;
			console.log("settting mapholder height1: " + availheight);
			$("#map-canvas, .mapholder").height(availheight);
		}

		$(hideelems).show();
		$(".heading-wrap").show();
		$("#map-canvas").css("position","relative");

		if ($("body.towns").size() === 0 && $("body.district").size() === 0) { // towns page works differently
			$("#map-canvas").width(gwidth);
		}

		//$("#map-canvas").stop().animate({ height: aheight }, 400);


		$(".nhlinks").hide().removeClass("shown");
		$("#map-nav-buttons").hide().removeClass("shown");

 		$(".mapholder").css("padding",padding);
 		$(".mapholder").css("paddingTop","10");
		$(".mapholder").css("paddingBottom","0");
		$(".mapholder").height("auto");
		$(".mapholder").removeClass("isbig");
		$(".mapholder").addClass("issmallish");

		if (e) {
			trackevent(e,'Mobile Map',"Shrink");
		}

	}
	else {
		if (e) {trackevent(e,'Mobile Map',"Expand"); }


		$(".mapmobbuttons").show();



		 availheight = pageheight - mheight;
		 console.log('availheight', 'pageheight:', pageheight, 'mheight:', mheight);


		$(hideelems).hide();


		$(".mapholder").show();
		$("#map-canvas").css("position","fixed");
		$("#map-canvas").width(pagewidth);

		$("#map-canvas").show();
		$("#map-canvassmall").hide();

		$(".mapholder").css("padding",0);

		console.log("settting mapholder height2: " + availheight);

		///if ($("body.district").size()>0) { availheight = availheight - 70;}
		$("#map-canvas, .mapholder").height(availheight);



		$(".mapholder").removeClass("issmallish");
		$(".mapholder").addClass("isbig");

		inittimer = setTimeout(function() {
			initmap();
		},500);


	}

}


function expandthis(elem) {
	if ($(elem).hasClass("isbig")) { return; }
	if ($(".mobsize:visible").size() == 0)  { return; }
	$(".mobsize:visible").trigger( "click" );
}