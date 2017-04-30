var pagewidth = 0;
var pageheight = 0;
var respondwidth = 799;	// also in responsive.less
var maxphotos = 20; // for homepage
var expandready = false;
var picktimer = 500;

var availheight = 0;
var mheight = 0; // size of mobile header
var mobilefeaturedpagesize = 6;
var htimer;
var jsloadmobile = 1000;
var jsloaddesktop = 500;
var lastw = null;
var lasth = null;
var toptimeout = null;
var wasmobile = false;
var mobile = false;
var mobileisinit = false;
var nice;
var niceleft = null;
var niceright = null;
var lastphoto = -1;
var scrollparams = {cursorcolor:"#1a293f", zindex:9999999,scrollspeed:60,touchbehavior:false, autohidemode:false, overflowx:false};
//initialSlide:lastphoto,
var autoplayspeed = 6000;
var slideparams = {
				calculateHeight: false,
			    grabCursor: true,
			    paginationClickable: false,
			    loop:false,
			    speed:1000,
			    autoplay:autoplayspeed,
			    scrollbar: {
			        container : '.swiper-scrollbar',
			        draggable : true,
			        hide: false,
			        snapOnRelease: true,
					    onScrollbarDragEnd:  function(swiper){
					    	console.log("onScrollbarDragEnd");
					    	 settitles(swiper);
					      //trackevent(true,"Mobile - Slideshow Drag Bar");
					    }
			    },
			    onInit: function(swiper){
			    	console.log("onInit");
			    	 setinit(swiper);
			    },
			    onFirstInit: function(swiper){
			    	console.log("onFirstInit");
			    	 setinit(swiper);
			    	 setTimeout(function() { setinit(null);}, 100);
			    },
			    onSlideChangeStart: function(swiper){
			    	console.log("onSlideChangeStart");
			      settitles(swiper);
			    },
			    onSlideChangeEnd: function(swiper){
			    	console.log("onSlideChangeEnd");
			      settitles(swiper);
			    },
			    onTouchMove: function(swiper){
			    	console.log("onTouchMove");
			      settitles(swiper);
			    },
			    onTouchEnd:  function(swiper){
			    	console.log("onTouchEnd");
			      settitles(swiper);
			      trackevent(true,"Mobile - Slideshow Image");
			    },
			    onSliderMove:  function(swiper, event) {
				    console.log("onSliderMove");
			      settitles(swiper);
			    },
			    onTransitionEnd:  function(swiper) {
			    	console.log("onTransitionEnd");
			      settitles(swiper);
			    }
			  };

var ishome = false;
var mySwiper = null;
var isApple = false;
var isAndroid = false;
var loadcurrent = loadcurrent || "";
var loadtotal = loadtotal || "";

var is_chrome = navigator.userAgent.indexOf('Chrome') > -1 || navigator.userAgent.indexOf('CriOS') > -1;
//alert(is_chrome);
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_Opera = navigator.userAgent.indexOf("Presto") > -1;
if ((is_chrome)&&(is_safari)) {is_safari=false;}

var ajaxloaded = 0;
function fixpaginate() {
	if ($(".pagination").size() > 0) {
		ajaxloaded = totalshow;
	}
	loadcurrent = parseInt(loadcurrent,10);
	loadtotal = parseInt(loadtotal,10);

	//if (loadtotal > 1) {
    	//$(".loadmoreajax").show(); // ajax disabled
   // }
}

var nowshowing = 0;
function loadmoreajax(wbutton) {
	if ($(".ajaxload").size() > 0) { return; }
	loadcurrent = parseInt(loadcurrent,10);
	loadtotal = parseInt(loadtotal,10);
	loadcurrent++;
	//console.log(loadtotal);
	var moreurl = document.URL;
	moreurl = moreurl.replace("view-all","ajax");
	nowshowing = nowshowing + totalshowed;


	moreurl = moreurl + "P" + nowshowing + "/";
	//console.log(moreurl);
	$(wbutton).before("<div class='ajaxload'></div>");

	if (loadcurrent>=loadtotal) {
    	$(".loadmoreajax").hide();
    }
	$.get(moreurl, function(data){
	    content=data;
	    $('.pagination').before(content);
	    $(".ajaxload").remove();
	    $("ul.ajaxloaded.loading").removeClass("loading").slideDown(1500);

	});

}

function gotop() {

	var cpos = pagescrolltop();
	$("html:not(:animated),body:not(:animated)").animate({   scrollTop:
    	0   }, 1000);

	// TRACK
	_gaq.push(['_trackEvent', "Site", "Go to Top",  "Click"]);

	return true;
}

function geolink(elem) {
	//alert(add);

	if (!mobile) { return true; }
	var lat = $.trim($(elem).attr("data-lat"));
	var lng = $.trim($(elem).attr("data-lng"));
	var add =  $.trim($(elem).attr("data-add"));

	if (add !== null && add !== "") {
		window.location = "http://maps.apple.com?q="+add;
		return false;
	}
	window.location = "http://maps.apple.com?daddr="+lat+","+lng;
	return false;
}

function checkbuttons() {
	$("a.button span b").each(function() {
		bheight = $(this).height();
		aclass = "singleline";
		if (bheight > 20) {
			aclass = "doubleline";
		}
		abut = $(this).closest(".button");
		abut.removeClass("singleline");
		abut.removeClass("doubleline");
		abut.addClass(aclass);
	});
}

function closetray() {

	if ($(".sharetray:animated").size() == 1) { console.log("animating"); return; }
	cdata =$(".sharetray").attr("data-bottom");
	console.log("closetray");
	console.log(cdata);
	$(".sharetray").stop().animate({ bottom: cdata }, 800, 'easeInOutQuint');
}

function sharetray() {
	if ($(".sharetray").size() === 0) {
		if ($(".divtwit iframe.twitter-share-button").size() === 0) {
			console.log("Twitter not loaded yet");
			return;
		}

		$("body").prepend('<div class="sharetray"><div class="tray"><div class="shareclose" onclick="closetray()"><i class="fa fa-times"></i></div><div class="traytitle">Share This</div><div class="content"></div></div></div>');
		setTimeout(function() {
			$(".sharetray .content").append($(".sharebuttons").clone());
		},500);

	}

	if ($(".sharetray:animated").size() == 1) { console.log("animating"); return; }

	cdata =$(".sharetray").attr("data-bottom");
	if (empty(cdata)) {
		cdata = $(".sharetray").css("bottom");
		$(".sharetray").attr("data-bottom",cdata);
	}

	$(".sharetray").stop().animate({ bottom: 0 }, 800, 'easeInOutQuint');
}


function scrollcheck() {
	//if (is_safari) { return; } // why was this disabled on safari?
	var cscroll = pagescrolltop();
	if (cscroll > 100) {

		$(".gotopholder").stop().show().fadeIn(0);
		//console.log("in");
		clearTimeout(toptimeout);
		toptimeout = setTimeout(function() {
			//console.log("out");
			if (!topholderover) {
				$(".gotopholder").stop().fadeOut(800);
			}
		}, 3500);

	}
	else {
		//console.log("in");
		$(".gotopholder").hide();
	}

	if (typeof(setmapsize) == "function") {
		setmapsize();

	}


	/*
	if (mobile) {
		if ($(".itintitle").size() > 0) {
			$(".itintitle").each(function() {
				//thispos = $(this).offset().top;
				if($(this).attr("rel") != "") {

				console.log(cscroll);
				if (cscroll + 110 >$(this).attr("rel") ) {
					$(this).addClass("fixed");
				}
				else {
					$(this).removeClass("fixed");
				}

				if (cscroll > $(".sub").offset().top) {
					$(".fixed").removeClass("fixed");
				}
			}
			});
		}
	}

	*/
/*
	$namesearch =$(".searchbyname");
	if ($namesearch.size() == 1) {
		var cscroll = pagescrolltop();
		var ctop = $(".mobspace").height() + $namesearch.height();
		if (cscroll > ctop && mobile) {
			$namesearch.css("top",$(".mobspace").height());
			$namesearch.css("position","fixed");
			$(".searchbynameblock").height($namesearch.height());
		}
		else {
			$(".searchbynameblock").height(0);
			$namesearch.css("top",0);
			$namesearch.css("position","relative");
		}
	}
	*/
}
var topholderover = false;

$(document).ready(function(){

	if ($(".vpo-img").size() > 0) {
		$("body").addClass("overnight");
	}


	if (typeof(checkMobile) != "undefined") {

		if (checkMobile.iOS()) {	 // using JS browser detecting
			$("body").addClass("ios");
		}
	}

			//	}
	// on resize
	$(window).resize(function() { pagerespond(); scrollcheck();   showlazy();});
	$(window).scroll(function() { scrollcheck(); showlazy(); matchdbounce();});
	$(window).on( "orientationchange", function(event) { pagerespond(); showlazy();	});

	pagerespond(); // init responsive
	scrollcheck();
	showlazy();

	if ($(".gotopholder").size() == 1) {
		$(".gotopholder").hover(function() {
			topholderover = true;
		},function() {
			topholderover = false;
		});
	}

	ishome = ($("body.home").size() > 0);
	fixpaginate();
	//setTimeout (function() { pagerespond(); scrollcheck(); }, 2000);


	// click passed in tab
	if (!empty(params('hometab'))) {

	  	var tab = $(".home .secondary li a.navlink:contains('" + params('hometab') + "')");
	  //	console.log(tab);
	  //	console.log(tab.size());
	    $(tab).click();

	}


	if (document.location.hash == "") {
			// no hash, ensure scrolled to top
			console.log("NO HASH, SCROLL TO TOP");
			$('html,body').animate({scrollTop: 0}, 0,function() {});
	}
});




	function fixads() {

		// fix height on ads
		// for mobile?

		$(".adfeatures iframe").each(function() {
			cdoc = $(this)[0].contentDocument;
			bhtmlsize = $($(cdoc)[0]).find("body a").size();
			if (bhtmlsize > 0) {
				aheight = $($(cdoc)[0]).find("body a").height() + 15;
			//	console.log("AD HEIGHT: " + aheight);
				if (aheight < 500) {
					$(this).height(aheight);
					$(this).parents(".gptad").height(aheight);
				}
			}
		});



		$(".gptside .gptad1 iframe").each(function() {
			cdoc = $(this)[0].contentDocument;
			bhtml = $($(cdoc)[0]).find("body a").size();
			$a = $($(cdoc)[0]).find("body a");
			$a.css("padding-left","10px");
			$a.css("padding-right","2px");
		});
		$(".gptside .gptad2 iframe").each(function() {
			cdoc = $(this)[0].contentDocument;
			bhtml = $($(cdoc)[0]).find("body a").size();
			$a = $($(cdoc)[0]).find("body a");
			$a.css("padding-left","2px");
			$a.css("padding-right","10px");
		});

	}

	function pagerespond() {

		pagewidth = $(window).width();
		pageheight = $(window).height();

		fixads();
		if (lastw == pagewidth && lasth == pageheight) { return; }

		lastw = pagewidth;
		lasth = pageheight;

		if (pagewidth === 0) { return; }
		mobile = (pagewidth < respondwidth);

		availheight = pageheight;



		//console.log(pagewidth+"x"+pageheight);

		if (mobile) {

			$(".nethead").width(pagewidth);
			$(".mobheader").width(pagewidth);

			$(".mobheader img,.mobheader div").show();

			if ($(".facebox").size()>0) {
				$(".facebox").width(pagewidth);
				$(".facebox iframe").width(pagewidth);
			}
			wasmobile = true;


			/*
			$(".itintitle:not(.fixed)").each(function() {
				thispos = $(this).offset().top;
					//	if($(this).attr("rel") == "") {
				$(this).attr("rel",thispos);
			});
			*/

			$(".btn-med").addClass("btn-mobile").removeClass("btn-med").removeClass("button");


			$('.page-itin div.step').show();

			if (pagewidth > pageheight || pagewidth > 500) {
				$("BODY").removeClass("vert");
				$("BODY").addClass("horz");
			}
			else {
				$("BODY").removeClass("horz");
				$("BODY").addClass("vert");
			}

		//	$log("MOBILE");

			$("#nhlanding .mobileboxes .nhexcerpt").width(pagewidth *0.92 - 120);



			// reposition
			//console.log("MOVING");
			$("div[rel*=mobile-],a[rel*=mobile-]").each(function(){
				if (!$(this).hasClass("desktop")) {
					var rel= $(this).attr("rel");
					var selrel = "." + rel;
				//$log(rel);
				 if (!$(selrel).hasClass("moved")) {
						if ($(selrel).size() == 1 ) { 	// must contain move
							//$(selrel).addClass("mobile").append($(this).clone());
							$(selrel).addClass("mobile").append($(this));
							$(selrel).addClass("moved");
							$(this).find(".gptad").each(function() {
								var thisadid = $(this).attr("id");
								if (googletag) {
									googletag.cmd.push(function() {
										googletag.display(thisadid);
									});
								}

							});

							//$(this).addClass("desktop");
						}
						else {
							$log("move error, no " + selrel);
						}
					}
				}
			});





			$("body").addClass("mobile");
			$("body").removeClass("fullsize");

			if (pagewidth > pageheight) {
				$("body").addClass("landscape").removeClass("portrait");
			}
			else {
				$("body").addClass("portrait").removeClass("landscape");
			}

			initmobile();
			sizemenu();
			setTimeout(function() {
				sizemenu(); // sometimes, the header image hasn't resized yet;
			},500);

		} else {	// not mobile
			$("body").removeClass("mobile");
			$("body").addClass("fullsize");

			if (mobileisinit) {
				 jQuery.sidr('close', 'sidr');
			}
			if (wasmobile) {
				location.reload();
			}

		}	// end mobile

		if (mobile) {
			setTimeout(function() { loadsocaljs(); },jsloadmobile);
		}
		else {
			setTimeout(function() { loadsocaljs(); },jsloaddesktop);
		}

		checkbuttons();


		matchdbounce();




	}	// end respond


	function clickitem(witem) {
		$(".going").removeClass("going");
		$(witem).addClass("going");
		$(witem).css("backgroundColor","#c33");
		$(witem).stop().animate({ backgroundColor: "#152333" }, 1200);

		// TRACK
		var label = oneline($(witem).text());
		if (opensidr == "sidr")  {
			_gaq.push(["_trackEvent", "Mobile Nav", "Menu Item", label]);
    }
    if (opensidr == "sidr-right")  {
			_gaq.push(["_trackEvent", "Mobile Nav - Subsection", "Menu Item", label]);
    }
    if (opensidr == "sidr-nh")  {
			_gaq.push(["_trackEvent", "Mobile Nav - Neighborhoods", "Menu Item", label]);
    }
    if (opensidr == "sidr-tw")  {
			_gaq.push(["_trackEvent", "Mobile Nav - Towns", "Menu Item", label]);
    }


	} // end clickitem


	function matchdbounce() {
		clearTimeout(htimer);
		htimer = setTimeout(function() { matchheights(); },300);
	}

	function matchheights() {
		 //data-matchheight="hnav"

		 $( "[data-matchheight]" ).each(function() {
		 		if (!$(this).hasClass("heightmatched")) {
					matchval = $(this).attr("data-matchheight");
					var maxheight = 0;
					var $matchitems = $( "[data-matchheight="+matchval+"]" );
					$matchitems.css("height","auto");
					$matchitems.each(function() {
						maxheight = Math.max($(this).height(),maxheight);
					});
					$matchitems.css("height",maxheight).addClass("heightmatched");
				}
		 });
		 $(".heightmatched").removeClass("heightmatched")
	}

	// setup side menu top
	function sizemenu() {
		//return;
		if ($(".mobheader").height() > 0) {
			mheight = $(".mobheader").height() +  $(".nethead").height();

			$(".sidr,.pagecover").css("top",mheight + "px");

			$("body").css("height", pageheight +"px");
			availheight = pageheight  - mheight;

			$("#sidr").css("height", availheight + 30);
			$("#sidr-right").css("height", availheight + 30);

		}
	}

	function initmobile() {
		if (mobileisinit) { return;}
		mobileisinit = true;
		pagewidth = $(window).width();
		pageheight = $(window).height();
		mheight = $(".mobheader").height() +  $(".nethead").height();
		availheight = pageheight  - mheight;


		// remove parralax images from district:
		$("body.district .fixedbg").remove();

		// fix featured footer
		$coda = $("div.coda");
		var page = 1;
		var pagesize = mobilefeaturedpagesize;   ///
		$coda.attr('page', page);

		$coda.find('ul.featured > li').fadeIn();
		$coda.find('ul.featured > li:gt('+((page*pagesize)-1)+')').hide();

		$coda.find('ul.featured > li:eq('+((page*pagesize)-pagesize)+')').addClass('first');
		$coda.find('ul.featured > li:lt('+((page*pagesize)-pagesize)+')').hide();
			// end fix featured footer

    if (typeof(newdatepick) == "function") {
    	newdatepick();
    }

		fullheight = pageheight  - mheight - 50;
		//$log("FULL HEIGHT: "+fullheight);
		//console.log($('.mobileboxes .nhbox'))
		// /$('.mobileboxes .nhbox').tsort('div',{order:'rand'}); // randomize box order on neighborhoods

		$("#eventscalendar").height(fullheight);
		$("#eventscalendar").attr("height",fullheight);
		//nice = $("html").niceScroll(scrollparams);

		if ($("body.find").size() > 0 ) {

			$(".secondary .roster li a").each(function() {
				$(this).attr("href",$(this).attr("href")+"#results");
			});
		}

		if (window.location.hash == "#results") {
			$('html, body').scrollTop(mheight);
		}

	    $('input').bind('focus',function() {
	        $("body:not(.keyboard)").addClass("keyboard");
	    });
	    $('input').bind('blur',function() {
	       	$("body.keyboard").removeClass("keyboard");
	    });


		$('.moblogo a').click(function(e) {
			if ($(".pagecover:visible").size() == 1) {
	      		jQuery.sidr('close', 'sidr');
	      		jQuery.sidr('close', 'sidr-right');
	      		jQuery.sidr('close', 'sidr-nh');
	      		jQuery.sidr('close', 'sidr-tw');
	      		return false;
	      	}
	      	else {
	      		return true;
	      	}
	    });
		if ($("body.home").size() > 0) {
			initmobilehome();
		}

		initslides();
		// setup datepicker
		if (typeof(setuppicker) == "function") {
			setuppicker();
		}

		// gallery
		$(".article .main iframe[src*=snapwidget]").each(function() {
			$(this).width("100%");

			// console.log($(this)[0].contentDocument);
			 //var bhtml = $($(cdoc)[0]).find("body");
			 //var bcont = $(bhtml).find(".widget-container");
			 //bcont.width("100%");

			 //console.log($(this).contentDocument);
			//$(this).height(200);

		});



		$("iframe#eventscalendar").each(function() {
			$(this).width(pagewidth);
		});


		// you tube videos
		$(".article .main iframe[src*=instagram]").each(function() {
			$(this).width("100%");
			$(this).height(pagewidth * 1.2);
		});
		$(".article .main iframe[src*=youtube]").each(function() {
			$(this).width("100%");
			$(this).height(200);
		});

		$(".article .main embed[src*=youtube]").each(function() {

			$(this).width("100%");
			$(this).height(200);
			$(this).parent().width("100%");
			$(this).parent().height(200);

		});



		$(".article .main iframe[src*=wufoo]").each(function() {
			$(this).width("100%");
		});


		// Unit Google Maps
		$(".pageunit .directions a").each(function() {

			/*
			var lat = $.trim($(this).attr("data-lat"));
			var lng = $.trim($(this).attr("data-lng"));
			var add =  $.trim($(this).attr("data-add"));
			//$(this).attr("href","javascript:geolink("+lat+","+lng+',"'+add+'");');
			//$(this).attr("href","javascript:geolink("+lat+","+lng+",'"+add+"');");
			$(this).attr("href","javascript:geolink(this);");
	*/

			//<a href="geo:124.028582,-29.201930" target="_blank">

		});

		$navul = $(".secondary .nav");
		if ($navul.size() > 0) {

			var sectitle = $(".mobtitle h1.alpha").html();
			if ($(".breadcrumbs li").size() >=3 ) {
				sectitle = $(".breadcrumbs li ").last().html();
			}

			$("#sidr-right").prepend("<div id='sidr-rcontent' class='sidrc'><UL><li class='section'>"+sectitle+"</li>"+$navul.html()+"</UL></div>");

			// SUBSECTION HAMBURGER NAVIGATION
			$('#right-menu').sidr({
		      name: 'sidr-right',
		      side: 'right' // By default
		    });
			$("#sidr-right").css("height", availheight);
		    // right scoller

			 $('#right-menu').click(function() {
		    	if (!empty(niceright)) { niceright.remove(); }
		     	niceright= $("#sidr-right").niceScroll("#sidr-rcontent",scrollparams);

		     	// TRACK
     		 (!empty(opensidr))?action="Open":action="Close";
			   _gaq.push(["_trackEvent", "Mobile Nav - Subsection", "Hamburger Icon", action]);

		    });

		}

		// neighborhoods side menu
		if ($(".nhmob").size() > 0 ) {

			// NEIGHBORHOODS HAMBURGER NAVIGATION
			$('#nh-menu').sidr({
		      name: 'sidr-nh',
		      side: 'right' // By default
		    });
			$("#sidr-nh").css("height", availheight);
		    // right scoller
			 $('#nh-menu').click(function() {
		    	if (!empty(niceright)) {niceright.remove();	}
		     	niceright= $("#sidr-nh").niceScroll("#sidr-nhcontent",scrollparams);

			  // TRACK
	     	(!empty(opensidr))?action="Open":action="Close";
				_gaq.push(["_trackEvent", "Mobile Nav - Neighborhoods", "Hamburger Icon", action]);

		    });
		}

		// towns side menu
		if ($("#tw-menu").size() > 0 ) {

			// TOWNS HAMBURGER NAVIGATION
			$('#tw-menu').sidr({
		      name: 'sidr-tw',
		      side: 'right' // By default
		    });

			$("#sidr-tw").css("height", availheight);

			$('#tw-menu').click(function() {
		   	if (!empty(niceright)) {niceright.remove();	}
		   	niceright= $("#sidr-tw").niceScroll("#sidr-twcontent",scrollparams);

		   	// TRACK
	     	(!empty(opensidr))?action="Open":action="Close";
				_gaq.push(["_trackEvent", "Mobile Nav - Towns", "Hamburger Icon", action]);

		  });
		}

		$(".sidr a").mouseup(function() {
			clickitem(this);


		});


		// MAIN HAMBURGER NAVIGATION
		if (typeof($('#simple-menu').sidr) == "function") {
			$('#simple-menu').sidr({
	      name: 'sidr',
	      side: 'left' // By default
	    });
		}
    $('#simple-menu').click(function() {

    	if (!empty(niceleft)) {	niceleft.remove();}
     	niceleft = $("#sidr").niceScroll("#sidrcontent",scrollparams);

     	loadmobilemenu();  //load menu if not loaded

  		// TRACK
     	(!empty(opensidr))?action="Open":action="Close";
			_gaq.push(["_trackEvent", "Mobile Nav", "Hamburger Icon", action]);

    });

  	$('.pagecover').click(function(e) {			/// CLOSE MENUS -  ONE FOR EACH TYPE OF MOBILE MENU
  		if (opensidr == "sidr")  {
  			_gaq.push(["_trackEvent", "Mobile Nav", "Hamburger Icon", "Close"]);
      	jQuery.sidr('close', 'sidr');
      }
      if (opensidr == "sidr-right")  {
  			_gaq.push(["_trackEvent", "Mobile Nav - Subsection", "Hamburger Icon", "Close"]);
      	jQuery.sidr('close', 'sidr-right');
      }
      if (opensidr == "sidr-nh")  {
  			_gaq.push(["_trackEvent", "Mobile Nav - Neighborhoods", "Hamburger Icon", "Close"]);
      	jQuery.sidr('close', 'sidr-nh');
      }
      if (opensidr == "sidr-tw")  {
  			_gaq.push(["_trackEvent", "Mobile Nav - Towns", "Hamburger Icon", "Close"]);
      	jQuery.sidr('close', 'sidr-tw');
      }
    });

  	loadmobilemenu();



		 (function() {
		    var e = document.createElement('script'); e.async = true;
		    e.src = 'https://apis.google.com/js/plusone.js';
		    $("body").prepend(e);
		  }());


	    $("BODY:hidden").fadeIn(1000);

	    if (typeof(nhpagename) == "string") {
	    	if (!empty($.trim(nhpagename))) {
	    		var nitem = $("#sidr-nhcontent li:contains("+nhpagename+")");
	    		//console.log(nitem);
	    		nitem.addClass("on");
	    	}
	    }





	} // end initmobile


	function initmobilehome() {

		// copy for mobile

		thishtml = $(".htab0").html();
		thishtml = "<div class='acontent mobile homespot'>"+thishtml+"<div class='showspot' onclick=\"showspot(this);dtrack(this,'Mobile - Home Listings (EXPAND)');\">EXPAND</div></div>";



		// setup home favorites
		$fav = $(".htab0").find(".node:NOT(.first)");
		//console.log($fav);
		$fav.append("<div class='showspot' onclick=\"showspot(this);dtrack(this,'Mobile - Popular Attractions (EXPAND)');\">EXPAND</div>");



		var p = 0;
		var pmax = $fav.find("li").size();
		pmax = Math.ceil(pmax/2);

		$fav.find("li").each(function() {
			if (p < pmax) {
				$(this).addClass("left");
			}
			else {
				$(this).addClass("right");
			}
			p++;
		});
		$fav.find("p.more a").addClass("button").addClass("favbutton").html("<span><b class='bopen'>Find An Attraction</b></span>");
		$fav.find("p.more a").click(function() {
			if ($(this).parents(".homefav").hasClass("open")) {
				return true;
			}
			else {
				$(this).parents(".homefav").addClass("open");
				return false;
			}

		});
		$(".secondary").after($fav.addClass("homefav").addClass("spotholder"));
		$fav.find("li a").click(function(e) {
			trackevent(e,"Mobile - Popular Attractions",oneline($(this).text()));
		});


		$(".roll .on a").first().hide(); // hide spotlight
		$(".roll").before(thishtml);

		$(".homespot ul.summary a").click(function(e) {
			trackevent(e,"Mobile - Home Listings",oneline($(this).closest("LI").find("h5").text()));
		});

		//mySwiper.fireCallback('SlideChangeStart', mySwiper);
	} // end initmobilehome

	function initphotos() {
		$log("INIT PHOTOS");
			//console.log(photos);
			$(photos).each(function(i)
		{

			var photo = this;
				//console.log(i);
				//console.log(photo);

			//if (!empty(photo.title)  && !empty(photo.image) && lastphoto < maxphotos - 1) {
			if (!empty(photo.image) && lastphoto < maxphotos - 1) {

				lastphoto++;
				//console.log("adding..");
				var div = document.createElement('div');
				$(div).attr("class","swiper-slide");

				var imageurl = photo.image;
				var iwidth = 600;
				var iheight = 332;

				$(div).attr("href",photo.url);

				imageurlstring = String(imageurl);
				if (!imageurlstring.contains("resize") && !imageurlstring.contains("thumb.php")) {
					imageurl = "/thumb.php?src="+imageurl+"&w="+iwidth+"&zc=1&h="+iheight;
				}

				if (typeof(photo.credit) != "undefined" && !empty(photo.credit)) {
					$(div).attr("data-credit",photo.credit);
				}

				//console.log(imageurl);
				$(div).css("background-image","url('"+imageurl+"')");

				if (!empty(photo.line1)) {
					var line1 = document.createElement('a');
					$(line1).attr("href",photo.url);
					$(line1).attr("class","mobline1");
					$(line1).text(photo.line1);
					$(div).append(line1);
				}

				if (!empty(photo.line2)) {
					var line2 = document.createElement('a');
					$(line2).attr("href",photo.url);
					$(line2).attr("class","mobline2");
					$(line2).text(photo.line2);
					$(div).append(line2);
				}

				if (!empty(photo.title)) {
					var title = document.createElement('a');
					$(title).attr("href",photo.url);
					$(title).attr("class","mobtitle");

					var credit = "";
					if (!empty(photo.credit)) {
						credit = photo.credit;
						credit = credit.replace("for GPTMC","for Visit Philadelphia&trade;");
 						credit = "CREDIT: "+credit+"";
 						$(div).attr("data-credit",credit);
					}
					else {
							$(div).attr("data-credit","");
					}

					$(title).html("Pictured: <em>" + rtrim(rtrim(photo.title),":")+ "</em>");

					$(div).append(title);

				}


				$(".swiper-wrapper").append(div);

				//console.log("-------------------");
				//console.log(div);
				//console.log($(".swiper-wrapper"));
			}


		});
	}

	function initslides() {


		if (typeof(photos) != "undefined") {
			initphotos();
		}
//		console.log("INIT SLIDES");

		// campaing landing
		if ($("#pageBillboard").size() == 1) {


			$("#pageBillboard").before('<div class="mobile"><div class="swiper-container"><div class="swiper-wrapper"></div></div></div>');
			$(".topScroller li").each(function() {
				var chtml = $(this).html();
				chtml = chtml.replace("bimage", "swiper-slide");
				$(".swiper-wrapper").append(chtml);
			});

		}

		if ($('.swiper-container').size() > 0) {
			//$('.swiper-container').prepend("<div class='stouch mobile'>Swipe to Advance<BR/>or Stop Slideshow</div>")
			if ($(".swiper-slide").size() > 1 && $('.swiper-container .stouch').size() === 0 ) {
				$('.swiper-container').after('<div class="stouch mobile"><b>Swipe</b> to Advance<BR/>or Stop Slideshow</div><div class="swiper-scrollbarcontainer mobile"><div class="swiper-scrollbar"></div></div>');
				$(".swiper-scrollbarcontainer").after("<div class='caption slide-caption'></div><div class='mobile spacer'></div>");
				dcredit = $(".swiper-slide").first().attr("data-credit");
				$(".slide-caption").text(dcredit);
			}
		//	alert("sw");
			mySwiper = new Swiper('.swiper-container',slideparams);
		//	alert(mySwiper);

	 	}
	 	else {
	 		if ($(".slideshow-alt").size() === 0) {
	 		// no slideshow, look for header image and move it
	 			if (typeof(hasimage) == "boolean") {
	 				var inner = "";
	 				if ($(".header-caption").size() > 0 ) {
	 					inner = $(".header-caption").html();
	 				}

	 			//	$(".mobile-share").before("<div class='mobile mobile-img'>"+inner+"</div>")
	 			}


	 		}
	 	}
	}


	showtimeout = null;
	function showspot(welem) {
		var goh = 0;
		var $hs = $(welem).parents(".homespot");

		if ($hs.size() > 0) {	// FOR HOMEPAGE EXPAND
			goh = $(".homespot .split-alt").height();
			$hs.addClass("spotopen").stop().animate({ height: goh}, 1200);
		}
		else {
			holder = $(welem).parents(".spotholder");
			var istrailshow = 	holder.hasClass("canvascradle");
			if (!holder.hasClass("spotopen")) {
				holder.attr("data-height",holder.height());

				goh = holder.find("DIV:not(.showspot)").first().height();
				if (holder.hasClass("homefav")) {
					goh = goh + 100;
				}

				var opentime = 1200;
				if (istrailshow) {

						 goh = $("#map-canvas").height();
						// console.log(goh);
						 out("#map-canvas.height(): " + goh);
						 opentime = 700;
						 if (!expandready)  {

						 	//console.log("EXPAND NOT READY");
						 	 clearTimeout(showtimeout);
						 	 var thiselem = welem;
						 	 showtimeout = setTimeout(function() {
						 	 		showspot(thiselem);
						 	 },300);
						 	 return;
						 }

						 showmapclick(welem,true);
				}


				if (holder.hasClass("xspot") || holder.hasClass("hspot")) { goh = goh + 100; opentime = 700;}
				holder.addClass("spotopen").stop().animate({ height: goh}, opentime);
			}
			else {
				if (istrailshow) { showmapclick(welem,false);}
				goh = holder.attr("data-height");
				if (goh === "" || goh === null) {
						goh = 400;
				}

				holder.removeClass("spotopen").stop().animate({ height: goh}, 1200);

			}
		}
	}

function settitles(swiper) {
	var $a = $(swiper.activeSlide()).find(".slideshow-thumb");
	var $cslide = $(swiper.activeSlide());

	// FOR UNITS
 	if ($a.size() > 0) {
 		var chtml = "";
 		var credit = $a.attr("data-credit").replace("for GPTMC","for Visit Philadelphia&trade;");
 		//if ($(".slideshow-alt h3.zeta a").size() > 0)
 		$(".slideshow-alt h3.zeta a").text($a.attr("data-title"));
 		$(".slideshow-alt h3.zeta a").attr("href",$a.attr("href"));
 		$("p.caption").html($a.attr("data-description") + "<strong>CREDIT:"+credit+"</strong>");
 	}

 	// FOR TRAILS AND OTHER
 	$ccredit = $cslide.attr("data-credit");
 	if ($(".slide-caption").size() > 0) {
 		$(".slide-caption").text($ccredit);
 	}
}


var swipeinit = false;
function setinit(swiper) {
	//alert("INIT!");
	if (swipeinit) {return;}
	swipeinit = false;

	var iwidth = 587; // 1400;
	var iheight = 391; // 550;
	//homepage
	if (ishome) {
		iwidth = 600; // 1400;
		iheight = 332; // 550;
	}
	//homepage
	islanding = $("body#campaignland").size() == 1;
	if (islanding) {
		iwidth = 600; // 950;
		iheight = 297; // 470;
	}


	//homepage
	isnh = $("body.neighborhood").size() == 1;
	if (isnh) {
		iwidth = 600; // 950;
		iheight = 332; // 470;
	}

	var newheight = Math.floor(pagewidth * iheight / iwidth);
	//alert(newheight);
	$(".swiper-slide, .swiper-wrapper, .swiper-container").css("height",newheight);
}


var mobilemenuloaded = false;
function loadmobilemenu() {

	if (mobilemenuloaded) { return;}
	// load mobile menu : optimized

		menupath = "/enhanced-includes/mobile-menu/" + hashCode(window.location.pathname) + "/"; // add path name to address caching issues.
		console.log(menupath);
	  	$("#mobile-menu").load(menupath, function() {
	  		$log("MOBILE MENU LOADED");
	  		mobilemenuloaded = true;
  			$(".sidr a").mouseup(function() {
				clickitem(this);
			});
			pagerespond();
			trackmenu();
			if (!empty(niceleft)) {
				niceleft.remove();
			}
			if (typeof($("#sidr").niceScroll) == "function") {
				niceleft = $("#sidr").niceScroll("#sidrcontent",scrollparams);
			}

		});
}




	function trackmenu() {
		$("#mobile-menu a").not(".tracking").click(function() {
			wclick = $(this).attr("href").toLowerCase();
			pMenu = $(this).parent().prevAll(".section").first();
			//console.log(pMenu);
			//console.log($(this).parent().prevAll(".section"));
			//console.log(pMenu);
			//console.log(pMenu.attr("class"));
			wMenu = "";
			if (pMenu.hasClass("mm-things-to-do")) {
				wMenu = "Things To Do";
			}
			if (pMenu.hasClass("mm-plan-your-trip")) {
				wMenu = "Plan Your Trip";
			}
			if (pMenu.hasClass("mm-philly-now")) {
				wMenu = "Philly Now";
			}
			//console.log(wMenu);
			_gaq.push(['_trackEvent', 'Site', wMenu + ' Menu Click',wclick]);
		});

		$("#mobile-menu a").addClass("tracking");
	}




function newdatepick() {

	if ($("#jrs_calendar_form").size() === 0) { return; }

    /// ADD NEW MOBILE DATE PICKER
    if (typeof(mobile) =="boolean") {
    	if (!mobile) { return; }
    	if (mobile) {
    		modetype = "scroller";
    	}
    	else {
    		modetype = "midex";
    	}
	 	if ($('.date-pick:not(.picked)').size() === 0) {
	        picktimeout = setTimeout(function() {
	            setuppicker();
	        },picktimer);
	    }
	    //https://mobiscroll.com/

	    $('.date-pick').attr("onclick","").addClass("picked").mobiscroll().date({
	        theme: 'ios7',
	        display: 'modal',
	        animate: 'fade',
	        mode: modetype,
	        dateOrder: 'Mddyy',
	        minDate:new Date(),
	         onShow: function (a,b,inst) {

		        $(this).addClass("modal");
		    },
		     onClose: function (a,b,inst) {
		        $(this).removeClass("modal");

		    },
		    onSelect: function (a,b,inst) {
		    	var $sel = $(this);

		        if ($sel.attr("id") == "start-date") {
		        	var dp = Date.parse($sel.val());
		        	var d = new Date(dp);
		        	var f = new Date();
		        	f.setDate(d.getDate()+2);
		        	$("#end-date").val(addzero(f.getMonth() + 1) + "/" + addzero(f.getDate()) + "/" + f.getFullYear());
		        	$("#end-date").css("backgroundColor","#49c3f6");
		        	$("#end-date").stop().animate({ backgroundColor: "#FFF"}, 1200);

		        }

		    }
	    });
	    $('.ui-datepicker-trigger').attr("onclick","$(this).siblings('.date-pick').trigger('click')");
	    //console.log("MOBILE DATE PICKER");
	}

}







function getscrolltop() {
	ct = $('body').scrollTop();
	ch = $('html').scrollTop();

	if (ct != ch) {
		if (ct > ch) {
			return ct;
		}
		else {
			return ch;
		}
	}
	return ct;
}

function showlazyimg($wimg) {
	$log("SHOW" + $wimg)
	if ($wimg.hasClass("lazyvisible")) { return; }
	var nsrc = $wimg.attr("lazy-data");
	$wimg.attr("lazy-src",$wimg.attr("src"));	//save original
	//$wimg.attr("src",nsrc).stop(true, true).fadeOut(0).fadeIn(500);

	if ($wimg.hasClass("bg")) {
		$wimg.css("backgroundImage","url('"+nsrc+"')");

		//$wimg.hide();
		//$wimg.fadeIn(500);	// hide/fade change height of page
		$wimg.css("opacity",0);
		$wimg.animate({opacity: 1.0}, 500);
	}
	else {
		$wimg.attr("src",nsrc);

//		$wimg.hide();
//		$wimg.fadeIn(500);
		$wimg.css("opacity",0);
		$wimg.animate({opacity: 1.0}, 500);
	}
	$wimg.addClass("lazyvisible");

	if (!mobile) {
		if (typeof(skr) != "undefined") {
			if (typeof(skr.refresh) == "function") {
				skr.refresh(); // refresh skrollr, on about page
			}
		}
	}
}

var haslazy = true;
var lazyinit = false;

function initlazyload() {

	// ADD LAZYLOAD TO ALL IMGS ON ARTICLES
	//$("body.article #content .main img").addClass('lazyload');

	lazyinit = true;
}


function showlazy() {  // works both directions, top and bottom
	//$log("showlazy");
	if (!haslazy)  	{ return;}
	if (!lazyinit)  { initlazyload();}

	// SETUP LAZY LOAD ON IMAGES, must have height > 0
	$("img.lazyload").each(function() {

		if ($(this).height() > 0) {
			$(this).css("height",$(this).height() + "px");	// set height of image
			$(this).attr("lazy-data",$(this).attr("src"));
			$(this).removeClass("lazyload");
			$(this).addClass("lazy");

			$(this).attr("src","/m/spacer.gif");

		}
	});


	if ($("IMG[lazy-data],DIV[lazy-data],.lazyload").size() === 0) {
		haslazy = false;
	}

	cscrolltop = getscrolltop();

	visibleheight = $(window).height(); /// used to be $j('body').height()
	cvisible =  cscrolltop + visibleheight; // visible region

	cscrolltop = cscrolltop -200; // allows image to become visible 100 above browser
	cvisible = cvisible + 10;  // +10 = 10 pixels below the page

	$("IMG[lazy-data],DIV[lazy-data]").each(function() {
		if ($(this).attr("lazy-data") != "") {

			var attr = $(this).attr('lazy-data');		// assign position to image, so it doesn't change;
			pxfromdoctop = $(this).offset().top;

			if (!$(this).hasClass("lazyvisible")) { // if not visible
				if (pxfromdoctop < cvisible &&  pxfromdoctop >= cscrolltop) { // check if within region
					showlazyimg($(this));
				}
			}

		}


 });

}



