// for internal links (within visitphilly.com), you must include 'this' on second parameter,   eg: <a onclick="return onclick="return smConvert(731510, this);" href=....
// for external links, only first parameter 'id' is required, 'this' is an optional parameter, eg: <a onclick="return onclick="return smConvert(731510);" href=....

// NOTE: internal links are setup to open in "target='_blank'" automatically from other JS on this site

$(document).ready(function()
{
    $smload = $("[data-smload]");
    if ($smload.size() > 0) {
        $smload.each(function() {
            var smval = $( this ).attr("data-smload");
            var smint = parseInt(smval);
            if (isNaN(smint)) {
                console.log("ERROR TRIGGERING SMLOAD ON: "+smval);
                return;
            }
            console.log("SMLOAD CONVERT ON: "+smval);
            smConvert(smval);
        });
    }

    $smclick = $("[data-smclick]");
    if ($smclick.size() > 0) {
        $smclick.each(function() {
            var smval = $( this ).attr("data-smclick");
            var smint = parseInt(smval);
            if (isNaN(smint)) {
                console.log("ERROR TRIGGERING SMLOAD ON: "+smval);
                return;
            }

            if (!$(this).hasClass("smtrackonclick")) {
                console.log("smConvertbyDATA-ATTR: "+smval);
                $(this).addClass("smtrackonclick");
                $(this).click(function() {

                    console.log("smConvertOnData-Attr: "+smval);
                    return smConvert(smval, this);
                });
            }
        });
    }

});


function smConvertlink(id,ahref) {  // id = sizmek id number, aelem = jquery selector $(alem)
    aselect = "a[href*='"+ahref+"']";
    console.log("smConvertbyurl: "+ahref+" : "+ $(aselect).size());

    $(aselect).each(function() {
        if (!$(this).hasClass("smtrackonclick")) {
            $(this).addClass("smtrackonclick");
            $(this).click(function() {
                console.log("smConvertOnClick: "+id);
                return smConvert(id, this);
            });
        }
        else {
            console.log("skipping 1 link, due to onload data-smclick");
        }
    });


}


function smConvert(id,aelem) {  // id = sizmek id number, aelem = jquery selector $(alem)
    return sizmekConversion(id,aelem);
}

function sizmekConversion(id,aelem) { // second option is optional on external links, required on internal links, ie: 'http://www.visitphilly'
    var redirectfromhref = (typeof(aelem) != "undefined");
    var gohref;

    var protocol = ('https:' == document.location.protocol) ? 'https://' : 'http://';   // Protocol (secure or insecure)
    var ebRand = Math.round(Math.random() * 1000000);   // Cache Buster
    var scriptpath = protocol + "bs.serving-sys.com/BurstingPipe/ActivityServer.bs?cn=as&ActivityID="+id+"&rnd="+ebRand;

    //PREVIOUS URL      "https://bs.serving-sys.com/Serving/" + "ActivityServer.bs?cn=as&ActivityID=648856&rnd=" + ebRand;
    sizmekMSG();
    console.log("_____TRY: SIZMEK CONVERSION FOR ID: " + id);

    if (redirectfromhref && ($(aelem).size() > 0)) {
        gohref = $(aelem).attr("href");
    }

    // Validate Redirect HREF of passed aelem
    if (redirectfromhref && (typeof(gohref) == "undefined" || empty(gohref)))  {  // if no redirect url, cancel redirect
        console.log("_____!!: sizmekConversion: href of aelem is undefined");
        console.log(aelem);
        redirectfromhref = false;
    }
    if (redirectfromhref && gohref.indexOf("http") === 0 && gohref.indexOf("visitphilly.com/") == -1) { // if link is external, cancel redirect
        console.log("_____NOTE: sizmekConversion: href of aelem is external");
        console.log(aelem);
        redirectfromhref = false;
    }


    try {
        $.getScript(scriptpath).done(function() {
            console.log("_____OK: SIZMEK CONVERSION TRACKED");
            redirectAfterConvert(redirectfromhref,gohref);
        }).fail(function() {
            console.log("_____!!: conversion script failed to load: getscript");
            redirectAfterConvert(redirectfromhref,gohref);
        });
    }
    catch (e) {
    	// Log output, remove this
    	console.log("_____!!: conversion script error:");
    	console.log(e);

        return true;
    }

    return !redirectfromhref;   // only return true if not redirecting

}

function redirectAfterConvert(redirectfromhref,gohref) {
    if (!redirectfromhref) { return; }
    console.log("_____OK: redirecting now to: "+gohref);
    window.location = gohref;
    return;
}

function sizmekMSG() {
    console.log("_____DEBUG SIZMEK HERE: http://bs.serving-sys.com/Serving/adServer.bs?cn=at");
}

