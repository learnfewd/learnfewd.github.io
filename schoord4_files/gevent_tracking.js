//// track events & links
////  _gaq.push(["_trackEvent", category, action, opt_label, opt_value (NUMBER!), opt_noninteraction (TRUE FOR NON INTERACTIONS)]);

var _gaq = _gaq || [];


///////////////////////////////////////////////////////////////////////// READY
$(document).ready(function() {

	linktracking($("BODY"));

	// Track Breadcrumbs
	$(".breadcrumbs li a").click(function(e) {
		_gaq.push(["_trackEvent", "Breadcrumbs",oneline($(this).text())]);
	});



	// TRACK EVENTS - NETWORK HEADER
	$(".nethead li a").click(function() {
		wclick = $(this).attr("href");
		if(wclick.indexOf("?") != -1) {
			wclicka= wclick.split("?");
			if (wclicka.length > 0) {
				wclick = wclicka[0];
			}
		}
		console.log("home click: " + wclick);
		//_trackEvent(category, action, opt_label, opt_value, opt_noninteraction)
		_gaq.push(['_trackEvent', 'Site', 'NetworkHeader',wclick]);
	});


	$(".hashtag a").click(function() {
		console.log("hashclick");
		_gaq.push(['_trackEvent', 'Site', 'HashTag','LowerRight']);
	});


	$("#header .logo a").click(function() {
		wclick = $(this).attr("href").toLowerCase();
		_gaq.push(['_trackEvent', 'Site', 'Brand Logo Click',wclick]);
	});

	$("#county-nav a").click(function() {
		wclick = $(this).attr("href").toLowerCase();
		_gaq.push(['_trackEvent', 'Site', 'County Click',wclick]);
	});

	$("#search").submit(function() {
		wclick = $("#searchtext").val();
		_gaq.push(['_trackEvent', 'Site', 'Site Search',wclick]);
	});

	$("#footer a").click(function() {
		wclick = $(this).attr("href").toLowerCase();
		_gaq.push(['_trackEvent', 'Site', 'Footer',wclick]);
	});

	// UL.featured is a featured footer
	$("UL.featured a").click(function() {
		wclick = $(this).attr("href").toLowerCase();
		_gaq.push(['_trackEvent', 'Site', 'Featured Footer Click',wclick]);
	});

	$(".jumplinks a").click(function() {
		wclick = $.trim($(this).text());
		wclick = oneline(wclick)	;
		_gaq.push(['_trackEvent', 'Neighborhoods - Main', '(C) Jump to a Neighborhood Grid',wclick]);
	});



	$("#footer-top a").click(function() {
		wclick = $.trim($(this).attr("title"));
		_gaq.push(['_trackEvent', 'Site', 'Pre-footer',wclick]);
	});






});


function trackfootsub() {
	_gaq.push(['_trackEvent', 'Site', 'Pre-footer',"Submit"]);
}

// rootselector allow for linktracking on ajax loaded content
function linktracking($rootselector) {

	// console.log("... RUNNING LINK TRACKING ON: " + $rootselector.selector);

	/* Begin JQuery link tracking */
	// allows for link tracking to include a defined prefix for any given page
	if (typeof(trackingPrefix) != "string") {trackingPrefix = "";}	else {	trackingPrefix = "/" + trackingPrefix;	}

	// find all A and AREA links to external sites, and enable onclick tacking
	var allLinks = $rootselector.find("A[href^='http'],AREA[href^='http']");	// must start with http (outgoing), but can't link back to visitphilly.com
	allLinks = allLinks.not("[class*='cboxElement']");
	allLinks = allLinks.not("[href*='://dev.visitphilly.com']");
	allLinks = allLinks.not("[href*='://stage.visitphilly.com']");
	allLinks = allLinks.not("[href*='://visitphilly.serv']");
	allLinks = allLinks.not("[href*='://visitphilly.com']");
	allLinks = allLinks.not("[href*='://www.visitphilly.com']");
	allLinks = allLinks.not("[href$='.pdf']");
	allLinks = allLinks.not("[href$='.mp3']");
	allLinks.each(function(i){
			$(this).addClass("tracking");
			$(this).click(function(e) {
				var thisHref = $(this).attr("href");
				console.log(thisHref);
				thisHref = thisHref.replace("http://", "");			// remove http
				thisHref = thisHref.replace("https://", "");			// remove http
				if (thisHref.charAt(thisHref.length - 1) == "/")	{ // trim ending slash
				  thisHref = thisHref.substr(0,thisHref.length - 1);
				}
				trackitem('/outbound/'+thisHref,this,e);



			});
			var aHref = $(this).attr("href");
			if(aHref.indexOf("youvisit.com") == -1) {
				// Open all external in new window // moved to before click
				atarget = $(this).attr("target");
				if (empty(atarget)) {
					$(this).attr("target","_blank");
				}
			}
	});


/*	$(".youvisit_container").each(function(i){
			$(this).addClass("tracking");
			$(this).click(function(e) {
				_gaq.push(['_trackEvent', 'YouVisit', 'YouVisit','YouVisit']);
			});
	});*/

	var allPdf = $rootselector.find("a[href$='.pdf'],a[href$='.mp3']");
	allPdf.each(
		function(i){
			$(this).click(function(e) {
				var thisHref = $(this).attr("href");
				thisHref = thisHref.replace("http://c0526532.cdn.cloudfiles.rackspacecloud.com/", "");
				thisHref = thisHref.replace("http://www.visitphilly.com/", "");
				trackitem('/downloads/' + thisHref,this,e);


			});

			var aHref = $(this).attr("href");
			if(aHref.indexOf("youvisit.com") == -1) {
				// Open all external in new window // moved to before click
				atarget = $(this).attr("target");
				if (empty(atarget)) {
					$(this).attr("target","_blank");
				}
			}
	});


}



function trackitem(wtrack,item,e) {
	if (item) {
		if ($(item).size() > 0 ) {
			if ($(item).hasClass("cboxElement")) {
				console.log("NOT OUTBOUND"); return;
			} // don't track outbound lightbox elements
		}
	}
	console.log("OUTBOUND: " + wtrack);
	//_gaq.push(['_trackPageview',wtrack]);
	console.log(_gaq);
	_gaq.push(['_trackEvent', 'outgoing', 'links' , wtrack]);
	console.log(_gaq);
}

// Widget Tracking
function trackWidget(src,type) {	// SRC is the widget SRC, and Type is 'hotel','car','activities'
	var googleTrack = '/widget/' + src + "/" + type;
	$D("TRACK: " + googleTrack);
	trackitem(googleTrack);
}


// custom tracking function, for DHTML to set as onclick=\"ctrack(this,'TYPE-TEXT-OR-ATTR-NAME')\"
dtrack = function(witem,etype,label) {
	var e = true;
	$obj = $(witem);

	var acheck = $obj.attr(etype);
	if (!empty(acheck)) {
			etype = justpath(acheck);
	}
	trackevent(e,etype, label);

};


extrack = function(witem) {
	var val = $(witem).find("span:hidden").text();
	val = captext(val);
	trackevent(true,"Trail Map View Toggle" ,val);

};




// custom tracking function, to set as onclick="ctrack(this)"
otrack = function(witem) {
	var e = true;
	var value = null;
	$obj = $(witem);

	// overlay click
	typetext = " - Title";

	//var label = justpath($obj.attr("href"));

	var label = $obj.parents("#cboxLoadedContent").find("h2").text();
	label = oneline(label);
	if ($obj.hasClass("button")) { typetext = " - Button";}
	if ($obj.hasClass("imglink")) { typetext = " - Image";}
	if ($obj.hasClass("highlink")) { typetext = " - Town Highlight"; label = label + " - " + oneline($obj.text());}


	trackevent(e,"Overlay Click"+typetext,label); /// 4th param (value) must be number

};




function tracktownexpand(witem) {
	var tracktext = "Town Body Text (EXPAND)";
	//if (mobile) {
	//	tracktext = "Mobile " + tracktext;
	//}
	dtrack(this,tracktext);
}


function trackslideshow() {
	//console.log("slideshow now");
}

function trackdrops(wone) {

		if (wone == "things-to-do") {
			tval = "Things To Do";
		}
		if (wone == "plan-your-trip") {
			tval = "Plan Your Trip";
		}
		if (wone == "philly-now") {
			tval = "Philly Now";
		}

	/// DISABLE MENU SHOW
	///_gaq.push(['_trackEvent', 'Site', tval + ' Menu Show']);
	console.log("TRACKING DROPS");
	console.log($("#main-nav .tab-container a").not(".tracking"));

	$("#main-nav .tab-container a").not(".tracking").click(function() {
		wclick = $(this).attr("href").toLowerCase();
		pMenu = $(this).closest(".tab-container");
		wMenu = "";
		if (pMenu.hasClass("tab-things-to-do")) {
			wMenu = "Things To Do";
		}
		if (pMenu.hasClass("tab-plan-your-trip")) {
			wMenu = "Plan Your Trip";
		}
		if (pMenu.hasClass("tab-philly-now")) {
			wMenu = "Philly Now";
		}
		_gaq.push(['_trackEvent', 'Site', wMenu + ' Menu Click',wclick]);
	});

	$("#main-nav .tab-container a").addClass("tracking");
}


function trackbillboard() {
	//console.log("Billboard TRACKING");
	trackingelms = $(".header-caption a").not('.tracking');

	trackingelms.click(function() {
		wclick = $(this).attr("href").toLowerCase();
		console.log("Billboard Story Click: " + wclick);
		_gaq.push(['_trackEvent', 'Homepage', 'Billboard Story Click',wclick]);
	});
	trackingelms.addClass("tracking");
}

function billboardnavclick(baction) {
	console.log("Billboard Nav Click: " + baction);
	_gaq.push(['_trackEvent', 'Homepage', 'Billboard Nav Click',baction]);
	///////////_trackEvent,   category, action, opt_label, opt_value<number, opt_noninteraction)
}

function trackfeatured() {
	//console.log("featured now");
}


/// TRACK BOOK DIRECT
//var analyticsset = false;
numchecks = 0;
checktimeout = 100;
if (typeof checkto != 'undefined') { clearTimeout(checkto); }
checkto = null;
function trackbd() {
 // console.log("trackbd called " + checktimeout);

  if (!settracking()) {
    //  console.log("cant set");
      numchecks++;
      checktimeout = checktimeout * 2;
      if (numchecks < 5) {
          clearTimeout(checkto);
          checkto = setTimeout(function() { trackbd(); },checktimeout);
      }  // set timeout ad increasing interval
  }
}


function settracking() {		// added in mobile picker
//    console.log("settracking called ");
  if (typeof jQuery == 'undefined') { console.log("no jq"); return false; }
  if (typeof analyticsset != 'undefined') { console.log("already set");  return false; }
  if (jQuery("#widget_booking_form #jrs_arrival_input").size() === 0) {
  	//console.log("no bd form");
   return false;}

  jQuery("#widget_booking_form").submit(function() {
     clicktemplate = "not set";
     if (typeof eepagetemplate != 'undefined') { clicktemplate = eepagetemplate; }

     clickurl = document.URL;
     clickurl = clickurl.replace("http://","");
       console.log("track submit" + clicktemplate + "--" +  clickurl);
     _gaq.push(['_trackEvent', 'Book Direct Widget', 'Widget Submit - ' + clicktemplate,clickurl]);
  });


  analyticsset = true;
  return true;

}

trackbd();



// GENERAL EVENT TRACKING FUNCTION

function trackevent(e,wType,wLab,wVal,nonint,cleantext) { // assumes interaction, unless specficy as not  // VALUE CAN ONLY BE NUMBER

	if (typeof(eventpagename) == "undefined") {
		console.log("no event page name");
		return;
	}
	if (empty(eventpagename)) {
		console.log("no event page name");
		return;
	}
	wSection = eventpagename;

	if (typeof(e) != "boolean") {
		if ( e.originalEvent === undefined ) {
			console.log("NHEVENT PCLICK");
			return; // programatic click, no tracking
		}
	}
	if (!nonint) { nonint = false; }
//	wVal =  nhclean(wVal);

	wType = oneline(wType);

	if (empty(wLab)) { wLab = ""; } else { wLab = justpath(wLab); } // strip down if url
	if (empty(wVal)) { wVal = "0"; }  else { wVal = justpath(wVal); }
	console.log(">>>>>>>>>>>> TRACKEVENT: "+ " " +wSection+ " " + wType + " " + wVal);
	wVal = parseInt(wVal,10);

	///////////_trackEvent,   category, action, opt_label, opt_value<number, opt_noninteraction)
	_gaq.push(['_trackEvent', wSection, wType,  wLab     ,   wVal       ,nonint]);
}




/////////// NH

function setnhpagetitle() {
	var cpagetitle = $("head title").text();
	cpagetitle = oneline(cpagetitle);
	cpagetitle = cpagetitle.replace("Philadelphia — visitphilly.com","Philadelphia Neighborhoods — visitphilly.com");
	cpagetitle = cpagetitle.replace("Philadelphia &mdash; visitphilly.com","Philadelphia Neighborhoods &mdash; visitphilly.com");
	if (msie && iev > 9) {
		$("head title").text(cpagetitle);
	}
}




function nhevent(e,wType,wVal,nonint) { // assumes interaction, unless specficy as not

	if (!eventpagename) {
		console.log("no event page name");
	}
	wSection = eventpagename;

	if (typeof(e) != "boolean") {
		if ( e.originalEvent === undefined ) {
			console.log("NHEVENT PCLICK");
			return; // programatic click, no tracking
		}
	}
	if (!nonint) { nonint = false; }
	wVal =  nhclean(wVal);
	console.log("NHEVENT: "+ " " +wSection+ " " + wType + " " + wVal);
	_gaq.push(['_trackEvent', wSection, wType, wVal,0,nonint]);
}
function nhclean(rstring) {
	rstring = rstring.replace("-","");
	rstring = rstring.replace("/","");
	rstring = rstring.replace(" ","");
	rstring = rstring.toLowerCase();
	rstring = $.trim(rstring);
	return rstring;
}

function getnharea(wpage) {
	var rstring = "";
	if (typeof(nhpage) == "string") {
		rstring = nhpage;
	}
	else {
		if ($(".nhcat").size() > 0) {
			rstring = $(".nhcat").first().text();
			rstring = oneline(rstring);
		}
	}
	rstring =  nhclean(rstring);

	if (rstring === "" || rstring == "philadelphianeighborhoods") {
		if (typeof(wpage) != "undefined") { rstring = wpage; } // if no page, return what's passed in
		else {
			rstring = "all";
		}
	}

	return rstring;
}



function gtrackad(atype, aurl) {
  	// atype in [170, 300, 345, 710];
  	adaction = "";
	switch(atype) {
	    case 170:
	        adaction = "Formatted Banner Click";
	        break;
	    case 300:
	        adaction = "Formatted Rectangle Click";
	        break;
	    case 345:
	        adaction = "Formatted Banner Click";
	        break;
	    case 710:
	        adaction = "Sponsored Listing Click";
	        break;
	    default:
	    	adaction = "Undefined: "+atype;
	        break;
	}

	var str = aurl;
	var re = /adurl\%253D?http(s?)\:\/\/(.*)/igm;
	var found = str.match(re);

	if (found.length > 0) {
		aurl = found[0];
		aurl = aurl.replace("adurl%253D","");
	}
	aurl = aurl.split("?")[0]; // remove query string if it exists

	///////////_trackEvent,   category, action, opt_label, opt_value<number, opt_noninteraction)
	_gaq.push(['_trackEvent', "Advertising", adaction, aurl ]);
}
