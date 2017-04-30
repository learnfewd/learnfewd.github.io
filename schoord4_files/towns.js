var infowindow = null;

$(document).ready(function(){


    if (mobile) {
      $('.mobile-towns .twboxinner').tsort('div',{order:'rand'}); // randomize box order on neighborhoods
      $('.mobile-trails .twboxinner').tsort('div',{order:'rand'}); // randomize box order on neighborhoods


       // if more than 3 boxes
      if ($(".mobile-trails .twboxinner").size() > 4) {
        $(".xbox").wrap('<div class="mobile spotholder townmoblist"></div>');
        $(".xbox").append("<div class=\"showspot\" onclick=\"showspot(this);dtrack(this,'Trail Box Expand')\"><span>SEE MORE TRAILS</span></div>");
      }


      var spotheight = 0;
      var ii = 0;
      $(".mobile-towns .twboxinner").each(function() {
          ii++;
          console.log(ii);
          if (ii <= 6) {
            spotheight += $(this).height();
            console.log(spotheight);
          }

      });
      $(".spotholder.townmoblist").height(spotheight);


    }

    if ($.cookie("lastpage") == "tw") {
      $(".fromother").hide();
    }
    else {
      $(".fromtw").hide();
    }
    $(".breadcrumbs").css("visibility","visible");


    // TRAILBOX SCROLL
    if ($("BODY#twlanding").size() > 0) { // on landing page, check for map trail scrolling
      console.log("traillist " + $(".traillist").height());
      console.log("traillistinner " + $(".traillistinner").height());
      if ($(".traillistinner").height() > $(".traillist").height()) {
           inittrscrollbox();
      }
      else {
        //$(".mapitemsholder").addClass("noscroll");
      }
    }


//  inittrscrollbox();

    maxsize = 3;
    if (mobile) { maxsize = 4; }
    // if more than 3 boxes
    if ($(".xbox a.tr").size() > maxsize) {
      $(".xbox").wrap('<div class="spotholder xspot"></div>');
      $(".xbox").append("<div class=\"showspot\" onclick=\"showspot(this);dtrack(this,'Trail Box Expand');\"><span>SEE MORE TRAILS</span></div>");
    }

    // if more than 3 boxes
    if ($(".townhighlights a.tr").size() > maxsize) {
      $(".townhighlights").wrap('<div class="spotholder hspot"></div>');
      $(".townhighlights").append("<div class=\"showspot\" onclick=\"showspot(this);dtrack(this,'Trail Box Expand');\"><span>SEE MORE HIGHLIGHTS</span></div>");
    }

    function showline(selector) {

      var path = document.querySelector(selector + ' path');
      if (getInternetExplorerVersion() > 1) {
        $(selector).hide();
        $(selector).fadeIn(800);
      }

      if ($(selector + ' path').size() >0) {
        var length = path.getTotalLength();
        var secs = length/1000 * 6;
        console.log("PATH: " + length);
        // Clear any previous transition
        path.style.transition = path.style.WebkitTransition = 'none';
        // Set up the starting positions
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        path.getBoundingClientRect();
        // Define our transition
        path.style.transition = path.style.WebkitTransition =
          'stroke-dashoffset '+secs+'s ease-in-out';     /////////////////////////// SET TIMING HERE FOR DRAWING
        // Go!

        path.style.strokeDashoffset = '0';
      }
    }



    if (!mobile) { // tooltip for dmap
      $('#dimap area').tooltipster({
          offsetY: -10,
          theme: 'tooltipster-light'
      });

      // EB:  Show tooltip on minimap of town detail page you're on
      if (typeof(towntitle) == "string") {
          showcurrent();
          $(".dholder").on("mouseleave", function () {  showcurrent();   });

      }
    }

     function showcurrent() {
      $("area[alt*='" + towntitle + "']").tooltipster('show'); // select area by alt tag using towntitle variable

      $("#dimap area").one('mouseenter mouseleave', function () {
          $("area[alt*='" + towntitle + "']").tooltipster('hide');
      }); // once map is interacted with hide forced tooltip one time
    }



    //http://jakearchibald.com/2013/animated-line-drawing-svg/
    if ($(".trailline svg").size() > 0) {
      $(".trailline svg").show();
      showline(".trailline");
    }


    $(".maptrails a").hover(function() {

      var sid = $(this).attr("rel");

      if (!empty(sid)) {
        sid = sid.substr(2);
        sid = "#s" + sid;
        $(sid).show();
        showline(sid);
      }
    }, function() {

      var sid = $(this).attr("rel");
      if (!empty(sid)) {
        sid = sid.substr(2);
        sid = "#s" + sid;
        $(sid).hide();
      }

    });

  //Get the UWISHUNU feed
  getStories();

/*
  $('.ondot').attr("title",towntitle);
  $('.ondot').tooltipster({
      offsetY: -12,
      theme: 'tooltipster-light'
  });
*/


  $(".inline").click(function(){

     var divtoload= $(this).attr("rel");
     $(this).colorbox({className:"standardbox", inline:true, width:"620px", opacity:0.65, href:divtoload});
  });

  function getmclass(classes) {
    var classList = classes.split(/\s+/);
    for (var i = 0; i < classList.length; i++) {
       if (classList[i].charAt(0) === 'm') {
         return classList[i];
       }
    }
    return "";
  }

  var myslider;
  if ($('.flexslider').size() > 0) {
      myslider = $('.flexslider').flexslider({
      slideshowSpeed: 4000,
      animationSpeed: 600,
      randomize: true,
      pauseOnHover: true,
      directionNav: false,
      keyboard: false,
      animation: "fade",  // animation: "slide","fade",
       start: function(){
            $('.mediacontrols .pause').on('click', function(e){
                $('.flexslider').flexslider("pause");
                $(".mediacontrols .box").removeClass("playing");
                trackevent(e,"Fact Rotator","pause");
            });
            $('.mediacontrols .play').on('click', function(e){
                $('.flexslider').flexslider("play");
                $(".mediacontrols .box").addClass("playing");
                trackevent(e,"Fact Rotator","play");
            });
             $('.flex-control-nav a').on('click', function(e){
                var val =  $(this).text();
                trackevent(e,"Fact Rotator","click " + val);
            });
        }
    });
  }


/*
  if ($(".mediacontrols").size() > 0 ) {

     $('.pause').click(function(){
         console.log(myslider);
         $('.flex-pause').trigger('click');

         $(".mediacontrols .box").removeClass("playing");

      });
      $('.play').click(function(){
          $('.flex-play').trigger('click');
          $(".mediacontrols .box").addClass("playing");
      });
  }
  */



  // setup more link for town details
  $more = $(".tbody .morehere").first();
  if ($more.size() == 1) {

    mparent = $more.closest("p");
    console.log("PARENT");
    console.log(mparent);
    moreloc = $more.offset().top - $(".tbody").offset().top;
    $(".towndetails.spotholder").height(moreloc + 20);
  }



  $(".switch-list").each(function() { // hide controls if only 1 item
    if ($(this).find("li").size() == 1) {
      $(this).siblings(".controls").hide();
    }
  });

  if ($("#hero-images img").size() == 1) {
    $(".hero-controls-wrap").hide();
  }

  //simple content switcher
  $(".controls a").click(function(e) { e.preventDefault(); var THAT = $(this); simpleContentReplace(THAT);});

});



function getStories() {
  var uwishunuurl = "/feeds/getcached.php"; //

  if ($("#stories-switch-list").size() == 0) {return;} // skip on pages that don't need it

  if (typeof(nhwish) == "string") {
    uwishunuurl = uwishunuurl + "?type=xml&url=" + escape(nhwish);
  }
  else {
    uwishunuurl = uwishunuurl + "?type=xml&url=" + escape("http://www.uwishunu.com/tag/towns,manayunk,chestnut-hill,mt-airy/feed/image/");
  }
  //var uwishunuurl = "//uwishunu.xml"; //

  console.log ("uwish: " + uwishunuurl);
  $.getFeed({
    url: uwishunuurl,
    success: function(feed) {
      //alert("here");
      console.log("got wish feed");
      var   html = '',
          splitLimit = 5,
          splits = Math.ceil(feed.items.length/splitLimit),
          switchList = document.createElement("li");
      for ( var i = 0; i < feed.items.length; i++ ) {
        var item = feed.items[i];
        var d = new Date(item.updated);
        d = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        //var imgSrc = item.description;
        //var blankSrc = document.createElement("div");

        //.preg_match_all(,, $result);

        imghtml =item.description;
        var regex = /<img.*?src="(.*?)"/mi;
        var resultsrc = regex.exec(imghtml);
        var resultstr = resultsrc[0]
        resultstr = resultstr.replace('<img src="',"");
        resultstr = resultstr.replace('"',"");
        newImg = resultstr;
        var sizedimg = rimg(resultstr,161,161,"towns");
        var imgString = newImg ? '<a class="story-img-link" href="'+item.link+'" target="_blank"><img src="'+sizedimg+'" /></a>' : '';
        var t = item.title;
        if (t.length > 65) t = t.substring(0,62)+"&hellip;";
        var clss = i < 5 ? "current" : "hidden";
        var itemString = '<li class="switcher switcher-'+clss+'">'
        + imgString
        + '<p class="story-date">'+d+'</p>'
        + '<p><a href="'+item.link+'">'+t+'</a></p>'
        + '</li>'
        $("#stories-switch-list").append(itemString)
        //$(blankSrc).remove();

      }
      $(".stories-slider .story-list a").click(function(e) {
         ////////// TRACK CLICK
         trackevent(e, $(this).parents(".stories-slider-holder").find("h2").text(),$(this).parents("li.switcher").find("p a").text());
      });
      linktracking($("#stories-switch-list"));

    }
  });
}

var firstexpand = true;
function showmapclick(wobj,expandthis) {   // click when map is expanded

  console.log("showmapclick");
  out("showmapclick");
  var ttext = "Collapse";
  var isexpanding = false;

  if (expandthis) {
    ttext = "Expand";
    isexpanding = true;
  }

  var mb =  map.getBounds();
  if (isexpanding) {

    if (setvalid && notyetfit) {
       notyetfit = false;

       map.panTo(fullbounds.getCenter());
       map.setZoom(map.getZoom()-1);
       //map.fitBounds(fullbounds);
    }

    if (latspread) {
      console.log("EXPAND");
      out("EXPAND");
      //$(".map-buttons")
      //$("html:not(:animated),body:not(:animated)").animate({   scrollTop:  0   }, 1000);     // scroll top map automatically


      map.panTo(new google.maps.LatLng(map.getCenter().lat() + getshift(mb,true), map.getCenter().lng()));



     focusmap();

    }
  }
  else {
    console.log("SHRINK");
    out("SHRINK");


    if (typeof(infowindow) != "undefined") {
      if (!empty(infowindow)) {
        console.log("CLOSE infowindow");
        infowindow.close();
      }
    }
    if (latspread) {
      map.panTo(new google.maps.LatLng(map.getCenter().lat() - getshift(mb), map.getCenter().lng()));
    }

  }

  console.log("map coords:")
  console.log(map.getCenter().lat() + "," + map.getCenter().lng() + "," + map.getZoom())
  trackevent(true,'Mobile Map',ttext);
}


// from neighborhoods.js
function simpleContentReplace(THAT) {
  var   mods = $.makeArray(THAT.parent().siblings(".switch-list").children()),
      visMods = [],
      curr;
  for (var i = 0; i < mods.length; i++) {
    if ($(mods[i]).hasClass("switcher-current")) { visMods.push(i); }
  }
  var   firstMod = visMods[0],
      lastMod = visMods[visMods.length - 1],
      nextMod = lastMod + 1,
      prevMod = firstMod - 1;

  if (THAT.hasClass("next")) {
    if (nextMod < mods.length) {
      $(mods[firstMod]).hide().removeClass("switcher-current").addClass("switcher-hidden");
      $(mods[nextMod]).show().addClass("switcher-current").removeClass("switcher-hidden");
    }
    if ( nextMod == (mods.length - 1) ) { THAT.addClass("off") }
    if ( firstMod > -1 ) { THAT.siblings(".previous").removeClass("off") }
  }
  if (THAT.hasClass("previous")) {
    if (prevMod > -1) {
      $(mods[lastMod]).hide().removeClass("switcher-current").addClass("switcher-hidden");
      $(mods[prevMod]).show().addClass("switcher-current").removeClass("switcher-hidden");
    }
    if ( prevMod == 0 ) { THAT.addClass("off") }
    if ( nextMod == mods.length) { THAT.siblings(".next").removeClass("off") }
  }
  return false;
}

function inittrscrollbox() {

  if ($(".maptrails").hasClass("scrolltrails")) { return; }
     $(".maptrails").addClass("scrolltrails");
     $(".maptrails LI").first().addClass("firsttrail");
     $(".maptrails LI").last().addClass("lasttrail");
    //var scrolldistance = $(".traillistinner").height() - $(".traillist").height() + 10;

/*
  linear: false,  // Scroll method
startDelay: 2,  // Start delay (in seconds)
delay: 3,   // Delay after each scroll event (in seconds)
step: 5,// Distance of each single step (in pixels)
speed: 32,  // Delay after each single step (in milliseconds)
switchItems: 1, // Items to switch after each scroll event
direction: 'vertical',
distance: 'auto',
autoPlay: true,
onMouseOverPause: true,
paused: false,
queue: null
*/
/*

  var q = 0;

  $(".traillistinner li").each(function() {
    q++;
    console.log(q);
    console.log(this);
    $(".traillistinner").append($(this));
  });
  */

  $('#trailscroll').trailbox({
    startDelay: 0,
    delay: 0,
    distance: 'auto',
    direction: 'vertical',
    switchItems: 1,
    autoPlay: false,
    onMouseOverPause: true,
    paused: false
  });
  $('.tup').click(function () {
    $('#trailscroll').trigger('backward');

  });
  $('.tdown').click(function () {
   $('#trailscroll').trigger('forward');
  });


}

/*
$('#demo5-backward').click(function () {
  $('#demo5').trigger('backward');
});
$('#demo5-forward').click(function () {
  $('#demo5').trigger('forward');
});
}

*/
/*
function initscroller() {
     var scrollHandle = 0,
        scrollStep = 5,
        scrollcontent = $(".traillistinner");  // parent

     if ($(".maptrails").hasClass("scrolltrails")) { return; }
     $(".maptrails").addClass("scrolltrails");

    //Start the scrolling process
    $(".trailarrow").on("mouseenter", function () {
        var direction = 1;

        if ($(this).hasClass("tdown")) {
          direction = -1;
        }

        $(this).addClass('active');
        startScrolling(direction, scrollStep);
    });

    //Kill the scrolling
    $(".trailarrow").on("mouseleave", function () {
        stopScrolling();
        $(this).removeClass('active');
    });

    var scrolldistance = $(".traillistinner").height() - $(".traillist").height() + 10;
    var speed = 0;

    //Actual handling of the scrolling
    function startScrolling(modifier, step) {
        if (scrollHandle === 0) {
            scrollHandle = setInterval(function () {
                var ctop = scrollcontent.css("top");

                ctop = ctop.replace("px","");
                ctop = $.trim(ctop);

                if (empty(ctop) || isNaN(ctop)) {  console.log("reset"); ctop = 0; }
                ctop = parseInt(ctop,10);

                var goffset = ctop + (scrollStep * modifier);

                //check bounds, offset should be less than zero, and greater than negative scrolldistance
                console.log(goffset);
                $(".tdown,.tup").removeClass("stopit");

                if (goffset <= scrolldistance * -1) {
                  goffset =  scrolldistance * -1;
                 // $(".tdown").addClass("stopit");
                }

                if (goffset >= 0) {
                  goffset = 0;
                 // $(".tup").addClass("stopit");
                }
              //  else {
              //     $(".tup").css("visibility","visible");
              //  }
                scrollcontent.css("top",goffset);
            }, 10);
        }
    }

    function stopScrolling() {
        clearInterval(scrollHandle);
        scrollHandle = 0;
    }
}

*/