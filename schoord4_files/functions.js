function params(qp) { try{r=unescape(location.search.match(new RegExp(qp+"=+([^&]*)"))[1]);}catch(e){r='';} return r; }
if(typeof(console) != "object") {var console = {}; console.log = function() {};}
$D = function (str) {   if (!msie) console.log(str + '\n');}; // legacy
$log = function (str) {  if (typeof(debugpage) == "boolean") { if (debugpage) { console.log(str + '\n');  } } };    // new logger
$a = function (str) {   if (enviro == "production") { $log(str); } else { alert(str);}}; // alert replacement
if ( !String.prototype.contains ) { String.prototype.contains = function() { return String.prototype.indexOf.apply( this, arguments ) !== -1;  }; }
function msver() {  var rv =  -1;   if (navigator.appName == 'Microsoft Internet Explorer') {  rv = 0;  var ua = navigator.userAgent;    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
if (re.exec(ua) !== null)  rv = parseFloat( RegExp.$1 );  }  else if (navigator.appVersion.indexOf('Trident/') > 0) { rv = 11; }  return rv; }
var iev = msver();
var msie = iev > 0;
//if(typeof($) != "object") {var $ = {}; $.browser =  {}; $.browser.msie = msie; $.browser.mozilla = true; }
// GLOBAL END

function stopit(e) {
	if(e && e.stopPropagation) {
        e.stopPropagation();
    } else {
          e = window.event;
          if (e) {
          e.cancelBubble = true;
      	}
    }
    return false;
}

function checksearch(wform)  {

	$stext = $(wform).find(".searchtextbox");
	if ($stext.size() > 0) {
		if ($.trim($stext.val()) === "") {
			$stext.val($stext.attr("placeholder"));
		}
		var sval = $stext.val();

		sval = sval.replace(/\(/g, '').replace(/\)/g, '').replace(/&amp;/g, 'and').replace(/;/g, '').replace(/&/g, '');
		console.log(sval);

		$stext.val(sval);
		return true;
	}

	console.log("NOTICE: CANNOT LOCATE SEARCH TEXT, REVIEW checksearch() in functions.js");

	return true;

}

var loadsocalloaded = false;
function loadsocaljs() {
	if (loadsocalloaded) { return; }
	loadsocalloaded = true;

	var $ifs = $("iframe[src*='blank.html']");

	$ifs.each(function() {
		var rel = $(this).attr("rel");
		if (rel !== null && rel !== "") {
			$(this).attr("src",rel);
		}
	});

	if ($(".sharebuttons").size() > 0) {
		loadjs('plusone-jssdk',"//apis.google.com/js/plusone.js");
		loadjs('twitter-jssdk',"//platform.twitter.com/widgets.js");
	}

}

function loadjs(jsid, jsurl) {
	d= document;
	   var js, id = jsid, ref = d.getElementsByTagName('script')[0];
	   if (d.getElementById(id)) {return;}
	   js = d.createElement('script'); js.id = id; js.async = true;
	   js.src = jsurl;
	   ref.parentNode.insertBefore(js, ref);
}



// CONTACT FORM
function clearform(welem) {
	thisform = $(welem).parents("form");
	fields = thisform.find(".fieldpanel");
	success = thisform.find(".successpanel");
	success.hide();
	fields.show();
	contacthassubmitted = false;
}

var contacthassubmitted = false;
function subcontact(wform) {
    if (contacthassubmitted)  { return false;}

    thisform = $(wform);
    // BEGIN VALIDATION
    femailinput = thisform.find(".emailfield");
	femail = femailinput.val();	femail = $.trim(femail);
    if (empty(femail)) 		{	alert("Please enter your email address to continue");	femailinput.focus();    return false;    }
    if (!isEmail(femail)) 	{   femailinput.focus();     return false;    }

    fnameinput = thisform.find(".firstfield");
	fname = fnameinput.val();	fname = $.trim(fname);
    if (empty(fname) || fname.length < 2) 	{	alert("Please enter a valid first name to continue");	fnameinput.focus();	return false;   }

    lastinput = thisform.find(".lastfield");
	last = lastinput.val(); 	last = $.trim(last);
    if (empty(last) || last.length < 2) 	{	alert("Please enter a valid last name to continue");	lastinput.focus();	return false;	}

    faker = thisform.find(".fakefield");
    if (faker.val() === "") {	faker.val("EMPTY");	}

   //	console.log($("#newsletterform").attr("action"));
   	posturl = thisform.attr("action");
   	console.log("SENDING FORM TO: " + posturl);

   	var checked= "";
	$("input[name='interests']:checked").each(function(){
		if (!empty(checked)) { checked += ",";}
	    checked += $(this).val();
	});
	$("#checkinterests").val(checked);

	postdata = thisform.serialize();
	console.log(postdata);

	thisform.addClass("submitting");
	wholder = thisform.find(".contactformholder");
	wholder.height(wholder.height()); // set height

	$.ajax({
		type:'POST',
		url: posturl,
		data:postdata,
		success: function(response) {
			console.log("CONTACT FORM SUBMITTED SUCCESSFULLY, response follows: ");
			console.log(response);
			cform = $("FORM.submitting");
			cform.removeClass("submitting");
	    	cform.find(".successpanel").show();
	    	cform.find(".fieldpanel").hide();
		},
 		error: function (request, status, error) {
 			alert("An error occured submitting the form, please check your submission for accuracy and try again. You may also try to refresh the page.");
        }
	});

    contacthassubmitted = true;
    return false;

}

function clipboardsetup() {
	document.addEventListener('copy', addtocopy);
}

function addtocopy(event) {
	if (typeof(isanadmin) != "undefined" && isanadmin) {
		console.log("COPIED TEXT: Additional clipboard text disabled for logged-in admins")
		return;
	}
    event.preventDefault();

    var cpage = document.location.href;
    if (typeof(bitlink) == "string") {
    	cpage = bitlink;
    }

    var pagelink = '\n\nRead more: ' + cpage + '\n';
    pagelink += 'Follow us: http://facebook.com/visitphilly  |  http://twitter.com/visitphilly';
    var copytext =  window.getSelection() + pagelink;

    _gaq.push(['_trackEvent', 'Site', 'Copy Text',document.location.href]);

    if (window.clipboardData) {
        window.clipboardData.setData('Text', copytext);
    }
    else if  (event.clipboardData) {
        event.clipboardData.setData('Text', copytext);
    }
}


function sharesetup() {
	if ($(".divtwit:visible").size() == 0) { return; }
	if ($(".divtwit span").size() == 0) { return; }
	var thispage = document.location.href;

	thispage = thispage.replace("dev","www");
	thispage = thispage.replace("stage","www");


	var durl = "";
	if ($(".twitter-share-button").size() > 0) {
		var durl = $(".twitter-share-button").attr("data-counturl");
	}
	if (!empty(durl)) {
		thispage = durl;
	}

	var twitcounturl = "http://opensharecount.com/count.json?url="+thispage;
	//console.log("GETTING TWITTER COUNT:" + twitcounturl);
	// use url from twitter button if it exists

	twitcounturl = "/feeds/getcached.php?cachetime=15&type=json&url="+escape(twitcounturl);
	//console.log(twitcounturl);
	console.log("GETTING TWITTER COUNT: http://" + document.domain + twitcounturl);
	$.ajax({
		type:'GET',
		url: twitcounturl,
		success: function(response) {


			if (typeof(response) != "object") {
				response = JSON.parse(response);
			}

			if (typeof(response) == "object") {
				if  (typeof(response.count) == "number" || typeof(response.count) == "string") {

					$(".divtwit span").text(response.count);
				}
			}
			//console.log(response);
			//console.log(response.count);
			//alert(response);
		},
 		error: function (request, status, error) {
 			console.log("ERROR GETTING TWIT COUNT FOR PAGE: "+thispage)
 			console.log(request);
 			console.log(status);
 			console.log(error);
        }
	});

}


function loadcontentgrids() {

	// EMBED GRID WITH:
	// <div class="cgload" data-id="XXX" ></div>
	// ID may be entry_id (numeric) OR url_title (non-numeric)
	// <div class="cgload" data-id="historic-philadelphia-grid"></div>
	// <div class="cgload" data-id="historic-philadelphia-grid" data-limit="3" data-title="false"></div>


	var ctargetclass = ".cgload";

	if ($(ctargetclass+":not('.loaded')").size() == 0) { return;}

	// in reality, there really only should be one per page
	$(ctargetclass+":not('.loaded')").each(function() {
		var cgid 	= $(this).data("id");
		var cgget 	= "http://"+document.domain+"/contentgrid/";



		// use url_title if it's not empty and it's not a number
		if (!empty(cgid)) {
			cgget += cgid + "/";
		}
		else {
			redlog("NOTICE: Content Grid Found, but no useable ID or URL is found");
			console.log($(this));
			return; // move to next iteration of each
		}

		var rando = Math.floor((Math.random() * 9999) + 1000);
		cgget += rando + "/";

		// set identifer as data field on html
		$(this).attr("data-ref",rando);


		// check for data-limit
		cglimit = "";
		// use data-limit, but check limit just in-case
		if (!empty($(this).attr("limit"))) {
			cglimit = $(this).attr("limit");
		}
		if (!empty($(this).attr("data-limit"))) {
			cglimit = $(this).attr("data-limit");
		}
		if (!empty(cglimit) && !isNaN(cglimit)) {
			cgget = cgget + "limit/" + cglimit + "/";
		}


		// check for data-cta
		cgcta = "";
		// use data-limit, but check limit just in-case
		if (!empty($(this).attr("cta"))) {
			cgcta = $(this).attr("cta");
		}
		if (!empty($(this).attr("data-cta"))) {
			cgcta = $(this).attr("data-cta");
		}
		if (!empty(cgcta)) {
			cgget = cgget + "no-cta/";
		}


		// check for data-title
		cgtitle = "";
		// use data-title, but check limit just in-case
		if (!empty($(this).attr("title"))) {
			cgtitle = $(this).attr("title");
		}
		if (!empty($(this).attr("data-title"))) {
			cgtitle = $(this).attr("data-title");
		}
		if (!empty(cgtitle)) {
			cgget = cgget + "no-title/";
		}

		console.log("Retrieving Content Grid From: "+cgget);
		$.ajax({
				type:'GET',
				url: cgget,
				dataType:'html',
				success: function(response) {
					var $r = $(response);

					if ($r.find(".cg-loadref").size() == 0) {
						redlog("NOTICE: Unable to identify load reference variable (.cg-loadref)");
						return;
					}
					var loadref = $r.find(".cg-loadref").data("ref");
					if (empty(loadref)) {
						redlog("NOTICE: Unable to identify loadref data attribute (.cg-loadref)");
						return;
					}

					var loadtarget = $(ctargetclass+"[data-ref='"+loadref+"']");
					if (loadtarget.size() == 0) {
						redlog("NOTICE: Unable to location ID html on page");
						return;
					}

					// PLACE HTML IN POSITION
					loadtarget.html(response);
					loadtarget.addClass("loaded");


					// check content grid for items linking to current page
					if (typeof(entry_id) != 'undefined') {
						cssid = ".cgentry"+entry_id;
						if (loadtarget.find(cssid).size() > 0) {
							bluelog("Found content grid item for current page, removing: " + entry_id);
							loadtarget.find(cssid).remove();
						}

					}

					// check for missing images
					// check for links to current page
					loadtarget.find(".cglink").each(function() {
						if ($(this).find(".cgimg img").size() == 0) {
							bluelog("Missing image found for content grid item, removing: " + $(this).data("id"));
							$(this).remove();
						}

						// if href link found in current url
						if (window.location.pathname.indexOf(justpath($(this).attr("href"))) != -1) {
							bluelog("self referencial content grid item, removing: " + $(this).data("id"));
							$(this).remove();
							/*$(this).click(function() {
								return false;
							});*/
						}


					});

					// content grid event tracking
					$("a.cglink").not(".tracking").click(function() {
						wgridtitle = $(this).closest(".cg-root").find(".cgtitle").text();
						wclick = $(this).attr("href").toLowerCase();

						_gaq.push(['_trackEvent', 'Content Grids', wgridtitle+' Click',wclick]);
					});

					$("a.cglink").addClass("tracking");
					// end content grid event tracking


				},
		 		error: function (request, status, error) {
		 			redlog("NOTICE: Error retrieving Content Grid from specified URL");
		 			console.log('error', 'request:', request, 'status:', status, 'error:', error);
		 		}
			});

	});
}

var activetab = 0;
$(document).ready(function()
{

	if (typeof(logged_in) != "undefined") {
			//console.log("\n\n¸.·´¯`·.´¯`·.¸¸.·´¯`·.¸><(((º>   \n\n");	// SWIMMING IN THE CACHE
	}

	if (typeof(staticpagecache) != "undefined") {
			if (logged_in) { $(".statusdraft,.statusDraft").show(); }
	}


	sharesetup();

	clipboardsetup();

	/// TESTING COLORBOX
	////$.colorbox({className:"newsletterbox", inline:true, width:"550",height:400, opacity:0.65, html:"<div></div>"});
  	//html: "<img src='" + img + "'/>",
			//opacity: .65

	popesetup();
	loadcontentgrids();


	$("img[data-qazy]").each(function() {
		if ($(this).parents(".cycle-slideshow").size() > 0) { // if slideshow, add class instead of wrap
			$(this).parents(".cycle-slideshow").addClass("isloading");
		}
		else {
			$(this).wrap("<div class='isloading'></div>");
		}
	})

	// CYCLE2 SLIDESHOW IMAGES
 	$("div.cycle-slideshow").each(function() {
 		$(this).prepend('<div class="controls"><a href="javascript:;" class="playing"><div class="ppause"><i class="fa fa-pause"></i>Pause</div><div class="pplay"><i class="fa fa-play"></i>Play</div></a></div>');

 		$controls = $(this).find(".controls");
		$controls.on('click', 'a', function(e) {
			$thiscycle = $(this).parents(".cycle-slideshow");
		  if ($(this).attr("class") == "playing") {
		    $thiscycle.cycle('pause');
		    $(this).addClass("paused").removeClass("playing");
//		    $("#controls").html("<a href='#' class='play'> <i class='fa fa-play'></i> Play</a>")
		  } else {
		    $thiscycle.cycle('resume');
		    $(this).addClass("playing").removeClass("paused");
//		    $("#controls").html("<a href='#' class='pause'> <i class='fa fa-pause'></i> Pause</a>")

		  }
		});
 	});



 	$("img.expand").each(function() {
 		$(this).wrap("<div class='divexpand'></div>");
 		$(this).after("<div class='expandClick'><span>Click to Expand Image</span></div>");
 	});

	$(".divexpand").click(function () {

	    var img = $(this).find("img").attr("src");
	    colormaxwidth = "90%";
	    colorwidth = "auto";
	    colorheight = "auto";
	    if (mobile) {
	    	colorwidth = pagewidth;
	    	colorheight = "100%";
	    	colormaxwidth = "auto";
	    }
	    $.colorbox({
	    	className:"standardbox",
	    	opacity:0.65,
	    	width:colorwidth,
	    	height:colorheight,
	    	maxWidth:colormaxwidth,
	    	html: "<img class='expandimg' src='" + img + "'/>",
	    	onComplete: function() {
	    		if (mobile) {
	    			$(".expandimg").height(pageheight);
	    			imgshift = (pagewidth - $(".expandimg").width())/2;
	    			$(".expandimg").css("left", imgshift);
	    			$(".expandimg").panzoom();
	    			//$(".expandimg").panzoom("zoom",.5, { silent: true });
	    		}
	    	}

	    });

	    //console.log(typeof(_gaq));
	    // TRACKING ACTION
	    _gaq = _gaq || [];
	    console.log("TRACKING CLICK TO EXPAND FOR " + img);
	    _gaq.push(['_trackEvent', 'Site', 'Click to Expand',img]);
	});



	$("UL.featured li:nth-child(n+21)").remove();

	$(".summary-alt.featureditems li").each(function() {
		var trel = $(this).attr("rel");
		if (trel !== "" && trel !== null) {
			var titem = ".datelisting ." + trel;
			if ($(titem).size() > 0) {
			//	console.log("hiding: " + titem);
				$(titem).hide();
			}
		}
	});

	$("p.caption").each(function() {
		$(this).html($(this).html().replace("for GPTMC", "<div class='nowrap inline'>for Visit Philadelphia&trade;</div>"));
		$(this).show();
	});


	if ($(".hastag").size() > 0 ) {
		$(".related-box").css("display","block");
	}

	$(".trail-body .button, .description-wrap .button, .main .button, .scroll-section .button, .textile .button").each(function() {
		if ($(this).find("span").size() === 0) {
			if ($(this).text() == "action") { // if no text get first text
				 if ($(".btn-action").size() > 0) {
				 		$(this).text($(".btn-action").first().text());
				 }
			}
			$(this).wrapInner("<b/>");
			$(this).wrapInner("<span/>");
		}
		if (!$(this).hasClass("btn-large") && !$(this).hasClass("btn-xl")) {
			console.log("..button found");
			$(this).addClass("btn-med");
			$(this).css("display","inline-block");
		}

	});

	$(".btn-flat").each(function() {
		// wrap inner with span, if not there
		if ($(this).find("span").size() === 0) {
			$(this).wrapInner("<span/>");
		}
		// remove button class, if there
		if ($(this).hasClass("button")) {
			$(this).removeClass("button");
		}
	});

	/*-------------------------------------------
  		Featured Philly
	-------------------------------------------*/
	$('div.coda').each(function()
	{
		// scope the coda
		var $coda = $(this);

		// only print controls to page if they're needed
		if($('ul.featured > li').length > 5){
			$coda.append('<div class="controls"><a class="previous" href="#">Previous</a><a class="next" href="#">Next</a></div>');
			$('a.previous').addClass('off');
		}

		// hide extras
		$coda.find('ul.featured > li:gt(4)').hide();

		// store page
		$coda.attr('page', '1');

		// make the previous work


		$coda.find('a.previous').click(function()
		{
			var page = parseInt($coda.attr('page'),10)-1;
			var pagesize = 5;
			if (mobile) {
				pagesize = mobilefeaturedpagesize;
			}
			if (page === 0) { return false; }

			$coda.attr('page', page);
			$coda.find('ul.featured > li').fadeIn();
			$coda.find('ul.featured > li:gt('+((page*pagesize)-1)+')').hide();

			$coda.find('ul.featured > li:eq('+((page*pagesize)-pagesize)+')').addClass('first');
			$coda.find('ul.featured > li:lt('+((page*pagesize)-pagesize)+')').hide();

			if (page == 1) { $('a.previous').addClass('off'); }
			$('a.next').removeClass('off');

			return false;
		});

		// make the next work
		$coda.find('a.next').click(function()
		{
			var page = parseInt($coda.attr('page'),10)+1;
			var pagesize = 5;
			if (mobile) {
				pagesize = mobilefeaturedpagesize;
			}
			var num = $coda.find('ul.featured > li').size();
			var spillover = num%pagesize;
			var maxPage = Math.floor(num/pagesize)+(spillover!==0?1:0);

			if (page > maxPage) { return false; }

			$coda.attr('page', page);
			$coda.find('ul.featured > li').fadeIn();
			$coda.find('ul.featured > li:gt('+((page*pagesize)-1)+')').hide();

			$coda.find('ul.featured > li:eq('+((page*pagesize)-pagesize)+')').addClass('first');
			$coda.find('ul.featured > li:lt('+((page*pagesize)-pagesize)+')').hide();

			if (page == maxPage) { $('a.next').addClass('off'); }
			$('a.previous').removeClass('off');

			return false;
		});
		if (typeof(trackfeatured) == "function") {
			trackfeatured();
		}
	});


	//////////////////////////////////////////////////// HERE
	/*-------------------------------------------
  		Grey Initial Values
	-------------------------------------------*/
	var filled = $('.filled');

	if(filled.size() > 0){
		for(var i = 0; i < filled.length; i++){

			$(filled[i]).addClass("empty");
			filled[i].initialValue = filled[i].value;

			filled[i].onclick = filled[i].onfocus = function(){
				$(this).removeClass("empty");
				$(this).addClass("filled");
				if(this.value == this.initialValue){
					this.value= "";
				}
			};

			filled[i].onblur = function(){
				if(this.value == this.initialValue || this.value === ""){
					$(this).addClass("empty");
					$(this).removeClass("filled");
					this.value = this.initialValue;
				}else{
					$(this).addClass("empty");
					$(this).removeClass("filled");
				}
			};
		}
	}


	/*-------------------------------------------
		Open external links in a new window
	-------------------------------------------*/
	$("a[rel='external'],a.external").click(function()
	{
		window.open($(this).attr('href'));
		return false;
	});



	$("a.arrow").each(function()
	{
		$(this).append('<i class="fa fa-angle-double-right"></i>');
	});

	/*-------------------------------------------
		Main Nav Drop Downs
	-------------------------------------------*/
	var img1 = document.createElement('img');
	img1.src = "/m/screen/bg-main-nav-drop.png";

	var img2 = document.createElement('img');
	img2.src = "/m/screen/bg-main-nav-drop-alt.png";

	var img3 = document.createElement('img');
	img3.src = "/m/widgets/circle-loader.gif";


	$(['things-to-do', 'plan-your-trip', 'philly-now']).each(function()
	{
		var tab = this;

		$('.nav-'+tab).parents('li:eq(0)').hover(

			// each time we roll over a nav item something should happen
			function ()
			{
				// hide open tabs
				$('#main-nav > li.on').mouseout();

				// set the on class for the parent li
				 $(this).addClass('on');

				// store the anchor we clicked on and the tab (if it's already in the source)
				var $anchor = $(this).find('a.nav-'+tab);
				var $tabContainer = $('.tab-'+tab);

				// if the tab is already in the source (because its been clicked already) just show it
				if ($tabContainer.size())
				{
					$tabContainer.show();

					// track show
					wone = tab;
					if (wone == "things-to-do") {
						tval = "Things To Do";
					}
					if (wone == "plan-your-trip") {
						tval = "Plan Your Trip";
					}
					if (wone == "philly-now") {
						tval = "Philly Now";
					}
				//	_gaq.push(['_trackEvent', 'Site', tval + ' Menu Show']);



				}

				// if it's not in the source go fetch it and add it in
				else
				{
					var $dropDownContainer = $('<div class="tab-container tab-'+tab+'"><img src="/m/widgets/circle-loader.gif" style="position:absolute; top:25%; left:46%;" /></div>');
					$anchor.after($dropDownContainer);
					$.get('/enhanced-includes/tab-'+tab+'/', {}, function(data)
					{
						$dropDownContainer.html(data);
						// make it work for screen readers, bad code, bad place, but it works...
						$('#main-nav > li:last-child .actions a:last').blur(function() { $('#main-nav > li.on').mouseout(); });
					//	console.log(tab);

						// track show
					});
				}
				trackdrops(tab);
			},

			// similarly, something should happen on mouseout
			function ()
			{
				if (msie) {
					$('.tab-'+tab).hide();
				}
				else
				{
					$('.tab-'+tab).fadeOut(200);
				}
				$(this).removeClass('on');
			}
		);

		// make it work for screen readers
		$('.nav-'+tab).focus(function () { $(this).parents('li:eq(0)').mouseover(); });
		$('#county-nav li:last-child a').focus(function() { $('#main-nav > li.on').mouseout(); });

		// Don't allow href follow
		$('.nav-'+tab).click(function()
		{
			return false;
		});

	});

	/*-------------------------------------------
		Carousel/Slideshow Helpers
	-------------------------------------------*/

	function getPrevious($data)
	{
		if ($data.find('li.on').prev().size())
		{
			return $data.find('li.on').prev().find('a');
		}

		if ($data.find('li:last-child').hasClass('direction'))
		{
			return $data.find('li:last-child').prev().find('a');
		}

		return $data.find('li:last-child').find('a');
	}

	function getNext($data)
	{
		if ($data.find('li.on').next().size() && !$data.find('li.on').next().hasClass('direction'))
		{
			return $data.find('li.on').next().find('a');
		}

		return $data.find('li:first-child').find('a');
	}

	function setView($data, numInView)
	{
		if (numInView == undefined)
		{
			numInView = 10;
		}

		var on = $data.find('.on').prevAll('li').size();
		var min = (Math.floor(on/numInView)*numInView);
		var max = (Math.floor(on/numInView)*numInView)+(numInView-1);

		$data.find('li').hide();
		$data.find('li:eq('+min+')').css('display', '');
		$data.find('li:gt('+min+')').css('display', '');
		$data.find('li:gt('+max+')').css('display', 'none');
		$data.find('.direction').css('display', '');
	}


	/*-------------------------------------------
		Homepage Tabset
	-------------------------------------------*/
	$('div#main').wrapInner('<div class="htab0"></div>');
	$('div#main').wrapInner('<div id="main-js-wrap"></div>');

	$('.roll li:eq(0)').addClass('on');
	$('.roll li a.navlink').each(function(i)
	{
		var $anchor = $(this);
		$anchor.click(function ()
		{

			$(this).addClass("ahtab" + i);
			$anchor.parents('ul').find('.on').removeClass('on');
			$anchor.parents('li').addClass('on');

			var $main = $('#main');
			var $main_js_wrap = $('div#main-js-wrap');

			var ctab = $('div#main-js-wrap').find(".htab" + i);

			var parent = $anchor.parents('li');
			var acontent = parent.find(".acontent");


				if (mobile) {
					if (parent.hasClass("mobopen")) {
						acontent.slideUp("1000" , function() {
							$(this).parents('li').removeClass("mobopen");
	   						 // Animation complete.
	  					});
					}
					else {
						//acontent.show();
						acontent.slideDown("2000" , function() {
							//$(this).parents('li').addClass("mobopen");
	   						 // Animation complete.
	  					});

						parent.addClass("mobopen");
					}
				}

			// already has content;
			if (acontent.size()>0) {	//this is dupped from below, could be cleaned up
				if (!mobile) {
					if (ctab.size() > 0) { // if tab already exists, show it.
						$('div#main-js-wrap').find(".htab" + activetab).fadeOut();				// hide existing tabs
						$('div#main').css({height: 'auto'});
						ctab.delay(400).fadeIn();
						activetab = i;
					}
				}
				return false;
			}


			if (activetab == i) return false;


			if (ctab.size() > 0) { // if tab already exists, show it.
				$('div#main-js-wrap').find(".htab" + activetab).fadeOut();				// hide existing tabs
				$('div#main').css({height: 'auto'});
				ctab.delay(400).fadeIn();
				activetab = i;
			}
			else {
				$('div#main').css({height: $main_js_wrap.height(), position:'relative'});
				$('div#main').append('<img id="ajax-loader" src="/m/widgets/circle-loader.gif" style="position:absolute; top:190px; left:49%;" />');

//				$('div#main-js-wrap').fadeOut();
				$('div#main-js-wrap').find(".htab" + activetab).fadeOut();				// hide existing tabs
				$('div#main-js-wrap').append("<div class='htab" + i + "'></div>");
				var atab = $('div#main-js-wrap').find(".htab" + i);
				activetab = i;
				$(this).parent().addClass("mobload");
				$(this).parent().prepend("<div class='mobile ajaxload'></div>");
				atab.load('/homepage-tabs/'+i+"?1", {}, function()
				{
					$('img#ajax-loader').remove();
					$('div#main').css({height: 'auto'});
					//$('div#main-js-wrap').fadeIn();
					trackfclicks();
					$(this).fadeIn();

					// copy for mobile
					cclass = $(this).attr("class");
					thishtml = $(this).html();

					// cleanup html
					thishtml = thishtml.replace("Click Here to View","<i class='desktop noi'>Click Here to View</i>");
					thishtml = "<div class='acontent mobile'>"+thishtml+"</div>";


					$navitem = $(".a"+cclass);
					$navitem.parent().removeClass("mobload");
					var sectiontext = oneline($navitem.parent().text());
					$navitem.after(thishtml);
					var parent = $navitem.parents('li');
					var acontent = parent.find(".acontent");

					acontent.find("a").click(function(e) {
						trackevent(e,"Mobile - Home Whats New Slider - " + sectiontext,justpath($(this).attr("href")));
					});
					acontent.hide();
					if (mobile) {
						acontent.slideDown("2000");
					}



				});

			}

			return false;
		});
	});





	/*-------------------------------------------
		Social Tabset
	-------------------------------------------*/
	var $social = $('.social');
	var $tabs = $('<ul class="tabs"></ul>');
	$social.prepend($tabs);
	$social.find('h3').each(function(i)
	{
		// hide the h3, since it's being duplicated into a list before the tabs anyway
		var $h3 = $(this);

		// create the tab link (hardcode a return false to save a jQuery selector and since this
		// will only be seen with JS on anyway)
		var $tab = $('<li><a href="#" onclick="return false;" class="'+$h3.attr('class')+'">'+$h3.html()+'</a></li>');
		$tabs.append($tab);

		// now that we have a link, hide the h3
		$h3.addClass('move');

		// add a class to locate our tab-content later
		var $tabContent = $h3.next();
		$tabContent.addClass('social-tab-container');

		// on click hide all the tabs and open only the one we clicked on
		$tab.click(function()
		{
			$('.tabs li').removeClass('on');
			$social.find('div.social-tab-container').hide();
			$tab.toggleClass('on');
			$tabContent.toggle();
		});

		// leave only the first tab selected and open
		if (i === 0) $tab.addClass('on').addClass('first');
		if (i > 0) $tabContent.toggle();
	});



	/*-------------------------------------------
		Accordian
	-------------------------------------------*/
	$('ul.accordian h3').wrapInner('<a href="#"></a>');
	$('ul.accordian h3 a').click(function()
	{
		// this is on landing page
	//	console.log("click b");
		var $anchor = $(this);
		var $li = $anchor.parents('li');

		$li.siblings().addClass('expand');
		$li.removeClass('expand');

		/*
		slidetime = 500;
		console.log($li);
		$li.siblings().find('ul:eq(0)').slideUp(slidetime);
		$li.find('ul:eq(0)').slideDown(slidetime);
		*/

		return false;
	});

	/*-------------------------------------------
		Roster
	-------------------------------------------*/

	$('ul.roster:not(.accordian) h3').wrapInner('<a href="#"></a>');
	$('ul.roster:not(.accordian) h3 a').click(function()
	{
		//console.log("click a");
		var $anchor = $(this);
		var $li = $anchor.parents('li:eq(0)');
		$ul =$li.parent(".roster");

//		console.log($li.size());
	//	console.log($ul.size());

		slidetimeitem = 35;
		slidetimeadd = 280;

		//slidetime = 700;
		if (!$li.hasClass('expand'))
		{

			$li.removeClass('collapse');
			$li.addClass('expand');


				slidetime = $li.find("li").size() * slidetimeitem + slidetimeadd;
	//			console.log("slidetime " + slidetime);
				$li.find('ul:eq(0)').slideUp(slidetime);

				//$li.find('ul:eq(0)').hide();

		}

		else
		{
			////

				slidetime = $li.find("li").size() * slidetimeitem + $ul.find(".collapse").find("li").size() * slidetimeitem + slidetimeadd;
	//			console.log("slidetime " + slidetime);
				$li.removeClass('collapse');

				$ul.find('.collapse').removeClass('collapse').addClass('expand').find('ul:eq(0)').clearQueue().stop().slideUp(slidetime);	//

			$li.removeClass('expand');
			$li.addClass('collapse');

				$li.find('ul:eq(0)').clearQueue().stop().slideDown(slidetime);

				//$li.find('ul:eq(0)').show();
			//}


		}

		return false;
	});
	$('ul.roster:not(.accordian) li.expand > ul').hide();

	//////////// THIS OPENS THE FIRST ONE // IN THE NEIGHBORHOOD UNIT PAGE
	$('ul.roster:not(.accordian) > li:first-child').removeClass('expand');
	$('ul.roster:not(.accordian) > li:first-child').addClass('collapse');
	$('ul.roster:not(.accordian) > li:first-child ul:eq(0)').show();

/*
	croster = $('ul.roster:not(.accordian)');
	if (croster.parents(".microroster").size() == 0) {		// only expand first one if not microroster
		if (croster.size() > 0) {
			croster.find(' > li:first-child').removeClass('expand');
			croster.find(' > li:first-child').addClass('collapse');
			croster.find(' > li:first-child ul:eq(0)').show();
		}
	}
	*/

	/*-------------------------------------------
		Slideshows
	-------------------------------------------*/
	$('.slideshow, .slideshow-alt').each(function()
	{
		var $slideshow = $(this);

		$slideshow.find('.slideshow-main').each(function()
		{
			$slideshowImage = $(this);

			var template = $slideshow.attr('data-type')=='landing'?'widget-slideshow-controls':'widget-slideshow-controls-unit';
			var viewSize = $slideshow.attr('data-type')=='landing'?6:4;
			var imgSize = $slideshow.attr('data-type')=='landing'?530:587;

		//	console.log('/enhanced-includes/'+template+'/'+$slideshow.attr('data-entry')+'/');

			$.get('/enhanced-includes/'+template+'/'+$slideshow.attr('data-entry')+'/', {}, function(data)
			{

				if (!data.replace(/\s/g, '')) { return false; }

				var $data = $("<div></div>").html(data); // jquery 2.0 requires a root element

				if ($data.find(".swiper-slide").size() > 0) {
						$(".slideshow,.slideshow-alt").addClass("hasslides").removeClass("noslides");
				}
				else {
					$(".slideshow,.slideshow-alt").addClass("noslides");
				}


				$data.find('li a').click(function()
				{
					var $anchor = $(this);
					var currentHeight = $('.slideshow-main').height();


					$('.slideshow-main').fadeOut('', function() {
						var slideHeight = $('.slideshow-main').height();
						if ($anchor.attr('data-video'))
						{
							$slideshow.find('.slideshow-main').replaceWith('<div class="slideshow-main" style="display:none;">'+$anchor.attr('data-video')+'</div>');

							if(currentHeight == slideHeight){
								$('.slideshow-main').fadeIn();
							}
							else
							{
								$('div.slide-wrap').animate({
									height: slideHeight
								}, 600, function() {
									$('.slideshow-main').fadeIn();
								});
							}
						}

						else
						{
							$slideshow.find('.slideshow-main').replaceWith('<img src="'+$anchor.attr('data-image')+'" alt="'+$anchor.attr('data-alt')+'" width="'+imgSize+'" class="slideshow-main" style="display:none;" />');

							var imgInterval = setInterval(function(){
								if($('.slideshow-main')[ 0 ].complete){
									clearInterval(imgInterval);
									slideHeight = $('.slideshow-main').height();

									if(currentHeight == slideHeight){
										$('.slideshow-main').fadeIn();
									}
									else
									{
										$('div.slide-wrap').animate({
											height: slideHeight
										}, 600, function() {
											$('.slideshow-main').fadeIn();
										});
									}
								}
							}, 1000);
						}

					});

					$slideshow.find('h3.zeta').html('<a href="'+$anchor.attr('href')+'">'+$anchor.attr('data-title')+'</a>');
					$slideshow.find('p.caption').html($anchor.attr('data-description')+' '+($anchor.attr('data-credit')?'<strong>Credit: '+$anchor.attr('data-credit')+'</strong>':''));

					$slideshow.find('.on').removeClass('on');
					$anchor.parents('li').addClass('on');

					setView($data, viewSize);


					return false;
				});

				setView($data, viewSize);

				$data.find('.previous').click(function()
				{
					getPrevious($data).click();
					return false;
				});

				$data.find('.next').click(function()
				{
					getNext($data).click();
					return false;
				});

				$slideshowImage.after($data);

				$slideshowImage.wrap('<div class="slide-wrap" />');

				if (typeof(trackslideshow) =="function") {
					trackslideshow();
				}

				// slideshow return
				initslides();
				respond();

			});
		});
	});

	/*-------------------------------------------
		Search Filters
	-------------------------------------------*/
	// hide everything after the nth result (0-based)
	var minToShow = 3;

	// grab each ul
	$('ul.summary-list').each(function()
	{
		var $ul = $(this);

		// grab each li
		var $lis = $ul.find('li');

		// if needing hiding hide 'em
		if ($lis.size() > minToShow+1)
		{
			// generate the more link
			var $more = $('<li class="more"><a href="#">Show More</a></li>');

			// hide the elements
			$ul.find('li:gt('+minToShow+')').hide();

			// now that things are hidden, append the more link
			$ul.append($more);

			// add a click ot the more to hide/show elements
			$ul.find('.more').click(function()
			{
				if ($ul.find('li:gt('+minToShow+'):eq(0)').css('display') == 'none')
				{
					$ul.find('li:gt('+minToShow+')').show();
					$more.html('<a href="#" class="moreless">Show Less</a>');
				}

				else
				{
					$ul.find('li:gt('+minToShow+'):not(.more)').hide();
					$more.html('<a href="#">Show More</a>');
				}
				return false;
			});
		}
	});

	/*-------------------------------------------
		Travelocity
	-------------------------------------------*/
	$('.book-online').each(function()
	{
		// store widget in scope
		var $widget = $(this);


		// find h3's to convert to tabs
		var $h3s = $widget.find('h3');
		if ($h3s.length === 0) return;

		// hide h3s
		$h3s.hide();

		// generate a ul of tabs
		var $ul = $('<ul class="travelocity-nav"></ul>');

		// loop through each h3 and add it as a tab
		$h3s.each(function(i)
		{
			var $h3 = $(this);
			var $li = $('<li class="'+$h3.attr('class')+'"><a href="#">'+$h3.text()+'</a></li>');
			$ul.append($li);

			// update the form class name
			$h3.next().attr('class', $h3.attr('class')+'-form');

			// add the click to the new tab
			$li.find('a').click(function()
			{
				var $anchor = $(this);

				$widget.find('.on').removeClass('on');
				$anchor.addClass('on');
				$widget.find('form').hide();
				$widget.find('.'+$h3.attr('class')+'-form').show();
				return false;
			});

			// mark the first one as open
			if (i === 0)
			{
				$li.find('a').addClass('on');
			}
		});

		// add the tabs
		$($h3s.get(0)).before($ul);
	});


	/*-------------------------------------------
		Share Popup
	-------------------------------------------*/
	$('.share a').click(function()
	{
		var $anchor = $(this);

		if ($anchor.next().hasClass('share-div'))
		{
			if ($anchor.next().css('display') == 'none')
			{
				$anchor.next().show();
			}

			else
			{
				$anchor.next().hide();
			}
		}

		else
		{
			$.get($anchor.attr('href'), {}, function(data)
			{
				var $data = $($(data).find('.share-div').get(0));
				var $socialblock = $data.find('.share-method.socially');
				var $emailblock = $data.find('.share-method.email');

				$emailblock.hide();
				$data.find('.share-email, .share-back').click(function()
				{
					if ($emailblock.css('display') == 'none')
					{
						$socialblock.hide();
						$emailblock.show();
					}

					else
					{
						$socialblock.show();
						$emailblock.hide();
					}

					return false;
				});

				$anchor.after($data);
			});
		}

		return false;
	});

	$('.ir-uwishunu-mini').parent().prevAll('h3.epsilon').remove();
});

function splitDate(input, output)
{
	$('#'+input).each(function()
	{
		var date = $(this).val();
		var pieces = date.split('/');
		var outputs = ['mm', 'dd', 'yy'];

		for(i=0;i<len; i++)
		{
			$('#'+output+'_'+outputs[i]).val(pieces[i]);
		}
	});
}


function addzero(wnum) {
	wnum = parseInt(wnum,10);
	if (wnum < 10) {
		return "0" + wnum;
	}
	return wnum;
}



function isEmail(emailStr) {
  var emailPat=/^(.+)@(.+)$/;
  var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
  var validChars="\[^\\s" + specialChars + "\]";
  var quotedUser="(\"[^\"]*\")";
  var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
  var atom=validChars + '+';
  var word="(" + atom + "|" + quotedUser + ")";
  var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
  var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");

  var matchArray=emailStr.match(emailPat);
  if (matchArray===null) {
    alert("This Email address seems incorrect (check @ and .'s)");
    return false;
  }
  var user=matchArray[1];
  var domain=matchArray[2];

  if (user.match(userPat)===null) {
    alert("This E-Mail address doesn't seem to be valid.");
    return false;
  }

  var IPArray=domain.match(ipDomainPat);
  if (IPArray!==null) {
      for (var i=1;i<=4;i++) {
      if (IPArray[i]>255) {
        alert("Destination IP address is invalid!");
      return false;
      }
    }
    return true;
  }

  var domainArray=domain.match(domainPat);
  if (domainArray===null) {
    alert("This E-Mail address domain name doesn't seem to be valid.");
    return false;
  }

  var atomPat=new RegExp(atom,"g");
  var domArr=domain.match(atomPat);
  var len=domArr.length;
  if (domArr[domArr.length-1].length<2 ||
    domArr[domArr.length-1].length>3) {
     alert("This E-Mail address must end in a three-letter domain, or two letter country.");
     return false;
  }

  if (len<2) {
     var errStr="This E-Mail address is missing a hostname.";
     alert(errStr);
     return false;
  }

  return true;
}

// open and closed attractions table for papal visit

function popesetup() {

	if ($("#openforwmof tbody").size() == 0) { return; }

	if (enviro == "development") { return;}
    var wmofspreadsheetID = "1Qso2JOQKZo9GbaTIGrJJpEtAwNqHPSZmyAABpfCx7mM";
    var wmofurl = "https://spreadsheets.google.com/feeds/list/" + wmofspreadsheetID + "/od6/public/values?alt=json";

    $.getJSON(wmofurl, function (wmofdata) {

        var entry = wmofdata.feed.entry;

        $(entry).each(function () {

            var attr = this.gsx$attraction.$t;
            var fri = this.gsx$_cokwr.$t;
            var sat = this.gsx$_cpzh4.$t;
            var sun = this.gsx$_cre1l.$t;
            var mon = this.gsx$_chk2m.$t;


            var $tr = $('<tr>').append(
	            $('<td class="attr" data-th="Attraction">').text(attr),
	            $('<td data-th="Friday 9/25">').addClass('wmof-' + fri.toLowerCase()),
	            $('<td data-th="Saturday 9/26">').addClass('wmof-' + sat.toLowerCase()),
	            $('<td  data-th="Sunday 9/27">').addClass('wmof-' + sun.toLowerCase())).appendTo('#openforwmof tbody');

			// $('<td  data-th="Monday 9/28">').addClass('wmof-'+mon.toLowerCase() )

        });

    });


}
