var locations= [];
var markers= [];  // all markers
var typemark = [];
var cnepoint = null;
var cswpoint = null;
var latspread;
//var shiftdenom = 2.5;
var boundcount = 0;
var vmarkers= []; // visible markers
var titles = [];
var startitem = 0;
var map = null;
var maploaded = false;
var clickshowtimeout = null;
var maxbubwords = 70;
var maxmapheight = 850;
var shiftdown = 0;
var totalpoints = 0;

var pantime;

var latarray = [];
var lonarray = [];
var boundschangecount = 1;
var shiftadjustment = 0;

var panmap = true;

var useexpand = true;


var lngmin = -75.331923;
var lngmax = -74.871871;
var latmin = 39.871027;
var latmax = 40.104088;
var fullbounds;


var markersoutsideregion = false;
var allmarkersoutsideregion = true;

var setlat, setlon, setzoom,setvalid;
var notyetfit = true;
function validatesetting(coords) {
  if (empty(coords)) { return false;}
  coords = coords.replace("(","");
  coords = coords.replace(")","");
  carray = coords.split(",");
  if (carray.length != 3) { return false; }
  setlat =  $.trim(carray[0]);
  setlon =  $.trim(carray[1]);
  setzoom = parseInt(carray[2],10);
  if (isNaN(setzoom)) { return false;}

  return true;
}

function bublist(val) {
  var thisstop = $(".trailstop[data-index="+val+"]");
 // vgoto = thisstop.find(".desc").offset().top - $(".map-buttons").height() - 30;
  vgoto = thisstop.offset().top - $(".map-buttons").height();
  var timego = 500;
   $("html:not(:animated),body:not(:animated)").animate({   scrollTop:
    vgoto   }, timego);
}
function getshift(mb,expand) { // takes in bounds
    //if (map.getZoom() > 11) { console.log("ZOOM GREATER THAN 11"); return 0;}
    if (!useexpand) { return 0;}
    if (expand) {
     //console.log("ADDDDDDDD");
      shiftadjustment = 0.12;
      fullspread = shiftdown; // - shiftadjustment; // shift down to accomodate overlay
      return fullspread;
    }
    //alert(mb.getNorthEast().lat());
    if (mb.getNorthEast().lat() < 39.9500)  {
      fullspread = 39.9500 - mb.getNorthEast().lat(); // philly at top of region
    } else {
      fullspread = mb.getNorthEast().lat() - 39.9500; // philly at top of region
    }
    mapsize = mb.getNorthEast().lat() - mb.getSouthWest().lat();

    cheight = $(".canvascradle").attr("data-height");
    if (empty(cheight)) {
      cheight = $(".canvascradle").height();
    }

    spreadsmall =  mapsize * cheight / $("#map-canvas").height();
    midspread = spreadsmall/3;
    fullspread  -= midspread;
    //fullspread  += shiftadjustment;
   // latspread = fullspread;
    shiftdown = fullspread;
    return fullspread;
}

function  typemarkers(c) {
 if (empty(typemark[c])) {
    typemark[c] = [];
 }
 return typemark[c];
}

function resetZ() {
  $.each(vmarkers, function( i, marker ) {
      if (marker.getZIndex() > 1000) {
        marker.setZIndex(marker.getZIndex() - 1000);
      }
  });

}
  function getletter(n){
     var s = "";
      while(n >= 0) {
          s = String.fromCharCode(n % 26 + 97) + s;
          n = Math.floor(n / 26) - 1;
      }
      return s;
  }
  var mshow = null;
  function showmarker(wmarker,wdelay) {
    //_gaq.push(['_trackEvent', 'New Format Itinerary', 'Tab Click','Map View']);
    //console.log(wmarker);
    clearTimeout(mshow);
    mshow = setTimeout(function() {new google.maps.event.trigger( wmarker, 'click' ); },wdelay);

  }

  function findvisiblemarkerindex(wnum) {
    //console.log(wnum);
    var mz = markers[wnum].getZIndex();
    var vi = 1;
    $.each(vmarkers, function( i, val ) {
       if (mz ==  val.getZIndex()) {
          vi = i;
       }
    });
    return vi;
  }


 function showthis(wnum) {
    //_gaq.push(['_trackEvent', 'New Format Itinerary', 'Tab Click','Map View']);
   //console.log(wnum);
    wnum = findvisiblemarkerindex(wnum);

   // _gaq.push(['_trackEvent', 'Town Trail', 'Show Next',titles[wnum]]);
    showmarker(vmarkers[wnum],200);
  }

  function shownext(wnum) {
    //_gaq.push(['_trackEvent', 'New Format Itinerary', 'Tab Click','Map View']);
    //console.log(wnum);
    wnum = findvisiblemarkerindex(wnum);
    wnum = wnum + 1;
    if (wnum >= vmarkers.length) {
      wnum = 0;
    }
    _gaq.push(['_trackEvent', 'Town Trail', 'Show Next',titles[wnum]]);
    showmarker(vmarkers[wnum],200);
  }

  function showprev(wnum) {
   // console.log(wnum);
    wnum = findvisiblemarkerindex(wnum);
    wnum = wnum - 1;
    if (wnum < 0) {
      wnum = vmarkers.length - 1;
    }
    _gaq.push(['_trackEvent', 'Town Trail', 'Show Prev',titles[wnum]]);
    showmarker(vmarkers[wnum],200);
  }

  function focusmap() {
     // scroll to Map when expanding
      var timego = 600;
      var targetPostion = $(".map-holder").offset().top;
     // console.log(targetPostion);
      if (mobile)  { targetPostion = targetPostion - mheight;}
      $("html:not(:animated),body:not(:animated)").animate({   scrollTop:targetPostion   }, timego);
  }

  function openmap() {
    console.log("OPENMAP");
    out("OPENMAP");


    if (!$(".canvascradle").hasClass("spotopen")) {
      console.log("CLICK");
      $(".showspot").trigger("click");
    }
    else {
      console.log("NO CLICK");
    }
    focusmap();
  }

  function gettag(witem) {
     cval = $(witem).text().toLowerCase();
     return "." + cval;
  }

  // Sets the map on all markers in the array.
  function setAllMap(marray, map) {
    //console.log(marray);  ////////////////////////////////////////////////////////////////////
    //return;
    for (var i = 0; i < marray.length; i++) {
      marray[i].setMap(map);
      if (map !== null) {
        vmarkers.push(marray[i]);
      }
    }
  }

  function updatefilters() {
    if (map === null) { console.log ("NO MAP"); return;}
    var alloff = true;


    if ($(".map-buttons a.off").size() > 0) {
      if (!$("BODY").hasClass("isfiltered")) {
        $("BODY").addClass("isfiltered");
      }
    }
    else {
      $("BODY").removeClass("isfiltered");
    }
    vmarkers= [];   // empty visible markers array
    var visiblebounds = new google.maps.LatLngBounds();   // reset bounds

    $(".map-buttons a").each(function() {
      if ($(this).hasClass("disabled")) {$(this).removeClass("off"); return; }
      var ctype = $(this).attr("rel");
      var carray = typemarkers(ctype);
      var thistag = gettag(this);

      if ($(this).hasClass("off")) {
         alloff = alloff && true;
          $(thistag).hide();
          // also remove from markers somehow

          //$(".show" + ctype).hide();
          $(".show" + ctype).slideUp(600);

          if (typeof(carray) == "object") {
              setAllMap(carray,null);
          }

      }
      else {
         alloff = alloff && false;
           $(thistag).show();
          // also show from markers & items somehow
          //showb

          //$(".show" + ctype).show();
          $(".show" + ctype).slideDown(800);

          if (typeof(carray) == "object") {
              setAllMap(carray,map);
          }
      }

    }); // end each  $(".map-buttons a")

    if (alloff) {
      $(".noitems").show();
      //$(".canvascradle").hide();  // causes issues with bound?
    }
    else {


     // console.log(vmarkers);
      $.each(vmarkers, function( i, val ) {
        //console.log(val.getPosition());
        visiblebounds.extend(val.getPosition());
      });
      //console.log(map);
      map.fitBounds(visiblebounds);
     // console.log("adjusting");

      $(".noitems").hide();
      //$(".canvascradle").show();
    }
  }

  function filtermap(witem) {
    if (!maploaded) { return false; }


    if ($(".map-buttons .off").size() === 0) {
        $(".map-buttons a").addClass("off");
        $(witem).removeClass("off");
        updatefilters();
        trackevent(true,"County Buttons Click" , captext($(witem).find("span").text()) + " on");
        return false;
    }

    if ($(witem).hasClass("off")) {
      $(witem).removeClass("off");
      trackevent(true,"County Buttons Click" , captext($(witem).find("span").text()) + " on");

    }
    else {
      $(witem).addClass("off");
      trackevent(true,"County Buttons Click" , captext($(witem).find("span").text() + " off"));

    }
    updatefilters();
    return false;

  }

  function getCounty(txt) {
    txt = txt.toLowerCase();
    if (txt.indexOf("bucks county") > -1) {
      return "b";
    }
    if (txt.indexOf("delaware county") > -1) {
      return "d";
    }
    if (txt.indexOf("montgomery county") > -1) {
      return "m";
    }
    if (txt.indexOf("chester county") > -1) {
      return "c";
    }
    return "p";
  }

  function fixupmap() {

      if (mobile) return;
      var cpos = pagescrolltop();

      var $fixitem = $(".map-buttons");

      if ($fixitem.size() === 0) { return; }


      var itemtop = $fixitem.attr("data-value");
      var itemwidth = $fixitem.attr("data-width");


      // item loses offset and width once fixed, but set to object for future reference
      if (empty(itemtop)) {
        /// console.log("SET");
        itemtop =  $fixitem.offset().top;
        itemwidth =  $fixitem.width();
        $fixitem.attr("data-value",itemtop);
        $fixitem.attr("data-width",itemwidth);
      }


      console.log(cpos + " " + itemtop + " " + (cpos >= itemtop));
      if (cpos >= itemtop) {
         $fixitem.addClass("fixed");
         $fixitem.width(itemwidth);
         $(".canvascradle ").css("margin-top", $fixitem.height());
      }
      else {
         $fixitem.removeClass("fixed");
          $(".canvascradle ").css("margin-top",0);
      }

  }

  function showonmap(witem) {
     console.log("showonmap");
     if (!expandready)  {
        console.log("EXPAND NOT READY");
         clearTimeout(clickshowtimeout);
         var thiselem = witem;
         clickshowtimeout = setTimeout(function() {
            showonmap(thiselem);
         },300);
         return;
       }
    openmap();

    tstop = $(witem).parents('.trailstop');
    titem = tstop.attr("data-index");

    var goitem = parseInt(titem,10);
    showthis(goitem);
    _gaq.push(['_trackEvent', 'Town Trail', 'View on Map',titles[startitem]]);
   // $( ".stopmap" ).first().trigger( "click" );
    //cval = $(witem).closest('.tourstop').find(".itemnum");
    //shownext(parseInt(cval)-1);
  }

  var isinit= false;
 $(document).ready(function(){
  // BEGIN DOCUMENT READY



  $(".zipcar").click(function(e){
   stopit(e);
  });



  $(window).resize(function() { fixupmap(); });
  var scrolltimeout;
  $(window).scroll(function() {

      fixupmap();
      clearTimeout(scrolltimeout);
      scrolltimeout = setTimeout(function() { // add one last scroll check
          fixupmap();
      },100);
    });
    // END GEN FUCTIONS - CONTINUE DOCUMENT READY


    //
    if ($(".sqimage img").size() > 0) {
        $(".sqimage").each(function() {
          var simg  = $(this).find("img");
          if (simg.size() == 1) {
            if (simg.attr("src") !== "") {
              if ($(this).parents(".stophasgram") === 0) { // don't show if there are instagrams
                $(this).show();
              }
            }
          }
        });
    }



    $(".stopitemslist .step").each(function() {
        var county = getCounty($.trim($(this).find(".township").text()));
        $(this).addClass("show" + county);
    });





    $(".readmore").each(function() {
    var href = $(this).attr("href");
     if(href === "") {
        $(this).hide();
      }
     if(href.contains("http") && !href.contains("visitphilly.com/")) {
        $(this).addClass("outlink");
        $(this).attr("target","_blank");
     }
    });

    var hasb = false;
    var hasc = false;
    var hasd = false;
    var hasm = false;
    var hasp = false;
    var tothas = 0;
    var icount = 0;
    $.each($(".trailstop"), function( index, value ) {

      var lat = $.trim($(this).find(".lat").text());
      var lon = $.trim($(this).find(".lon").text());

      var title = striphtml( $(this).find("h3.gamma").html()); // use html here, due to admin adding of <BR> in title with no spaces


      if (empty(lat) || empty(lon)) {
        adminnotice("ITEM HAS NO LAT AND/OR LNG", icount + ") " + title);

        $(this).find(".viewmap").hide();
        $(this).addClass("nolatlng");
      }
      else { // has lat/lng
        // build locations
        $(this).attr("data-index",icount);
        icount++;

        var subhead = $.trim($(this).find(".subhead").text());
        var desc = $.trim($(this).find(".desc").html());
        var address = $.trim($(this).find(".address").html());
        var href = $.trim($(this).find(".readmore").attr("href"));

        var image;
        if ($(this).hasClass("featured")) {
           image  = $.trim($(this).find(".featimage img").attr("src"));
        }
        else {
           image  = $.trim($(this).find(".sqimage img").attr("src"));
        }

        var countyinitial = getCounty($.trim($(this).find(".township").text()));

        if (countyinitial == "b") { hasb = true; }
        if (countyinitial == "c") { hasc = true; }
        if (countyinitial == "d") { hasd = true; }
        if (countyinitial == "m") { hasm = true; }
        if (countyinitial == "p") { hasp = true; }

        $(this).addClass(countyinitial + "step");

        var township = $.trim($(this).find(".township").text());
        iconimg = $(this).find(".icon img");
       // console.log(lat);
       // console.log(lon);
        locations.push([title,subhead,desc,address,href,image,lat,lon,countyinitial,township,index,null]);

      } // end else


    }); // END LOOP

    if (hasb) { tothas++; } else { $(".mb").addClass("disabled").attr("title","No points in Bucks County"); }
    if (hasc) { tothas++; } else { $(".mc").addClass("disabled").attr("title","No points in Chester County"); }
    if (hasd) { tothas++; } else { $(".md").addClass("disabled").attr("title","No points in Delaware County"); }
    if (hasm) { tothas++; } else { $(".mm").addClass("disabled").attr("title","No points in Montgomery County"); }
    if (hasp) { tothas++; } else { $(".mp").addClass("disabled").attr("title","No points in Philadelphia County"); }

    if (tothas <= 1 ) { $(".map-buttons").hide(); }


    // set map to height of browser

  //  var mapheight = availheight - $(".map-buttons").height() - 100;

    var mapheight = availheight - $(".map-buttons").height() - 10; // ten is from extra space somewhere?
    mapheight = Math.min(mapheight, maxmapheight);


    console.log("MAPHEIGHT: " + mapheight + ", min of availheight - extras: " + mapheight + " and maxmapheight: " +  maxmapheight);
    $("#map-canvas").height(mapheight);

     customapicheck();



   });   // END DOCUMENT READY
      function mapinit() {


        if (isinit) return;
        isinit = true;

        if (typeof(google) != "object") { return; }

       //   $log(locations);
       totalpoints = locations.length;
          if (locations.length > 0) { // loc array
              map = new google.maps.Map(document.getElementById('map-canvas'), {
                  zoom: 13,
                  scrollwheel: false,
                  center: new google.maps.LatLng(locations[0][6], locations[0][7]),
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
				  zoomControlOptions: {
              		position: google.maps.ControlPosition.RIGHT_TOP
          		}
              });

              google.maps.event.addListener(map, 'idle', function(){
                showmapcoords();
              });

              infowindow = new google.maps.InfoWindow();
              var marker, i;
              fullbounds = new google.maps.LatLngBounds();


          //                0     1      2      3       4   5      6    7       8           9         10        s11
         // locations.push([title,subhead,desc,address,href,image,lat,lon, county initial, township,itemnum, letterpushback]);
          //locations.push([htitle,hsub,hdesc,hadd,hhref,himage, {unit-latitude},{unit-longitude}, {entry_id},'{unit-template-type}']);

              for (i = 0; i < locations.length; i++) {


                  pointlat = parseFloat(locations[i][6]);
                  pointlng = parseFloat(locations[i][7]);

                  if (pointlat > latmin && pointlat < latmax && pointlng > lngmin && pointlng < lngmax) {
                    markersoutsideregion = true;
                  }
                  else {
                    allmarkersoutsideregion = true;
                  }
                  fullbounds.extend(new google.maps.LatLng(pointlat,pointlng));



                  var ctype = locations[i][8];

                  var iconi = 0;  // used to set icon letters

                   // console.log("DIFF");
                     //console.log(locations[i][6]);
                    latarray.push(locations[i][6]);
                    lonarray.push(locations[i][7]);
                    iconi = i + 1;


                  locations[i][11]= iconi-1;

                 // if (trtrailtype.contains("Article")) { // use numbers instead
                 //   ctype = "n";
                 // }
                 // ctype = "n" + ctype; // numbers
                  var iconBase = "/m/towns/n" + ctype + "/";

                  var sel = ".trailstop[data-index="+i+"]";
                  $sel = $(sel);


                  if ($sel.size() == 1) {


                      var $icon =  $sel.find(".icon");
                      var $iconimg =  $sel.find(".icon img");
                       //     $log(iconBase + iconi + '.png');
                      $iconimg.attr("src",iconBase + iconi + '.png');
                      $icon.attr("onclick","showonmap(this);");
                      $icon.show();

                  }
                  else {
                    console.log("ERROR: ICON NOT FOUND");
                    console.log("ctype: " + ctype);
                  }

                 // console.log(iconi);

                  marker = new google.maps.Marker({
                      position: new google.maps.LatLng(locations[i][6], locations[i][7]),
                      map: map,
                      icon: iconBase + iconi + '.png',
                      zIndex: i
                  });
                  markers.push(marker);
                  carray = typemarkers(ctype);
                  if (typeof(carray) == "object") {
                      //console.log("ADDING TO: " + ctype + "markers");
                      carray.push(marker);
                  }
                  vmarkers.push(marker);   // fill visible markers array

                  // push onto county marker array
                  google.maps.event.addListener(marker, 'click', (function (marker, i) {
                      return function () {

                            openmap();


                            var html = '';
                            var classtype = "trtrail";
                            if (trtrailtype.contains("Article")) {
                              classtype = "articletrail";
                            }
                            html += '<div class="trbubble mapbubble ' + classtype + " " + locations[i][8] + 'bub">';
                            //html += '<span class="letter tletter"><b>' + getletter(locations[i][11]) + '</b></span>';
                            html += '<span class="letter tnumber"><b>' + (locations[i][11] + 1) + '</b></span>';
                            html += '<div class="bubtop">';
                            html += '<h3 class="gamma">' + locations[i][0] + '</h3>';
                            html += '<div class="township">' + locations[i][9] + '</div>';
                            html += '<p class="subhead">' + locations[i][1] + '</p>';
                            html += '</div>'; // bubtop close

                            resetZ();
                            marker.setZIndex(marker.getZIndex() + 1000);

                            var imgtext = $.trim(locations[i][5]);


                            if (!empty(imgtext)) {
                               //imgtext = imgtext.replace(/(^\s+|\s+$)/g,'');
                               //imgtext = imgtext.replace("w=900","w=300");
                               //imgtext = imgtext.replace("w=900","w=250");
                               //imgtext = imgtext.replace("900x","300x");
                               imgtext =  imgtext.replace("http://","/resize/300x300/map/r/http/");


                               html +=   '<img class="bubimg" src="'+imgtext+'" />'; //image
                               html += '<div class="steptextindent">'; // indent text with image
                               $log("HAS IMAGE" + imgtext);
                            }
                            else {
                                html = html.replace("mapbubble","mapbubble noimage");
                                html+= '<div class="steptext">';
                                $log("NO IMAGE" + imgtext);
                            }

                            var tcontent = locations[i][2];
                            tcontent = xwords(tcontent,maxbubwords,"... <a class='bublist' href='javascript:bublist(" + i +")'>READ MORE &raquo;</a>");


                            html+= '<div class="steptextcontent">' + tcontent+ '</div>';  // desc

                            html+= '<div class="address">'  + locations[i][3];

                            html+= "<a onclick=\"dtrack(this,'F) Bubble Links','Directions');\"  href=\"https://maps.google.com/maps?daddr=" + cleanstring(locations[i][3]) + " \" target=\"_blank\" class=\"getdirections\">Get Directions</a>";
                            html+= '</div>';   // address

                            html+= "</div>";  //setptext
                            html+= "<div class='bubbuttons'>";
                            html+= "<a href=\"javascript:;\" onclick=\"showprev(" + (i) + ");dtrack(this,'Bubble Links','Prev');\" class=\"btn aleft showprev\" title=\"Previous Stop\"><span><B>Prev</B></span></a>";
                            html+= "<a href=\"javascript:;\" onclick=\"shownext(" + (i) + ");dtrack(this,'Bubble Links','Next');\" class=\"btn shownext\" title=\"Next Stop\"><span><B>Next</B></span></a>";

                            var href = locations[i][4];
                            var addin = "";
                            if(href.contains("http") && !href.contains("visitphilly.com/")) {
                              addin = ' outlink" target="_blank';
                            }

                            html+= "<a onclick=\"dtrack(this,'Bubble Links','More Info');\"  href=\"" + href + "\" class=\"btn moreinfo " + addin + "\"><span><B>More info</B></span></a>";
                            html+= "</div>";      //bubbuttons
                            html+= "</div>";      // mapbubble;
                           // expandthis($(".mapholder"));  //// expand map to full screen

                            infowindow.setContent(html);

                            infowindow.open(map, marker);
                            //console.log(marker.position)
                            //console.log();
                            trackevent(true,"Trail Map Bubble Open" ,locations[i][0]);



                      };
                  })(marker, i));  //jshint ignore:line
              }


              if (locations.length > 1) {
                setvalid = validatesetting(trmappos);
                if (setvalid) {
                  map.panTo(new google.maps.LatLng(setlat, setlon));
                  map.setZoom(setzoom);
                }
                else {
                  map.fitBounds(fullbounds); // bounds change 1
                }

                if (setvalid) {
                   expandready = true;
                }
                else {
                    google.maps.event.addListenerOnce(map, 'idle', function(){
                   // console.log('IDLE1');
                        addmapshift(); // skipping map expansion

                      });
                   // console.log("adjusting");
                    expandreadytimeout = 5000;
                    setTimeout(function() {
                      if (!expandready) {
                        expandready = true;
                       // console.log("NOTICE: EXPAND FORCED AFTER:" + expandreadytimeout);
                      }
                      else {
                      //   console.log("Expand is ready");
                      }

                    },expandreadytimeout);
                }
              }
              maploaded = true;
              console.log("MAP LOADED");

          }
          else {
             console.log("no locations");
          }


        }



        function addmapshift() {
        //  console.log("addmapshift");
          //out("addmapshift"); ////////////////


          var mb =  map.getBounds();
       //   console.log(mb);

          latspread = getshift(mb);
     //     console.log("LATSPREAD: " + latspread);
        //  console.log("MAP CENTER: " + map.getCenter().lat());

          // don't use expand



          if (totalpoints < 6 && (!markersoutsideregion||allmarkersoutsideregion)) { // if (latspread < xxx || number points < 5)
            // no shift, just show points
            shiftdown = 0;
            expandready = true;
            useexpand = false;

          }
          else {
            // shift map towards center city
            map.panTo(new google.maps.LatLng(map.getCenter().lat() - latspread, map.getCenter().lng()));
          }


          google.maps.event.addListenerOnce(map, 'idle', function(){
              console.log('EXPAND READY');
              out("EXPAND READY"); ////////////////
              expandready = true;
          });



        }



        $("#map-canvas").click(function() {
            //openmap();
        });






function out(oval) {
  var outtext = oval + "<BR/>" + $("#pagedebug").html();
 // console.log("OUT: " + oval);
  $("#pagedebug").html(outtext);
}


function striphtml(html) {
   var regex = /<br\s*[\/]?>/gi;
   html = html.replace(regex, " "); // replace <BR> to space;

   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";

}

function showmapcoords() {

  if ($("#mapcoords").size() === 0) {
    if (isanadmin) {
      adminnotice("Current Map Position","<span class='mapcoords'><form><input id='mapcoords' class='admincoords' value='' onclick='select()'/></form></span>");
    }
  }

  coval = "(" + map.getCenter().lat()  + "," +  map.getCenter().lng() + "," + map.getZoom() + ")";
  $("#mapcoords").val(coval);



}

