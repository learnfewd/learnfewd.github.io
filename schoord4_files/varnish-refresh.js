var cacherefresh = false;

var globalpagereset = window.location.href.split('?')[0];

//var cachelocs = [thisdomain];
//var cachelocs = ['192.237.179.26','162.209.90.158','162.209.90.238'];
var cachelocs = ['192.237.179.26'];
var cachereset = [];
for (var i = 0; i < cachelocs.length; i++) { cachereset.push(false); }


function varnishcacheclearbyurl(q, varnurl) {
	gourl = "http://" + cachelocs[q] + varnurl;
	console.log("clearing on: "+ gourl);


	$.ajax({
			  type: 'GET',
			  url: gourl,
			  indexValue: q,
			  dataType: 'text',
			  success: function(data) {
			  		if (data.indexOf("CONNECTED") > -1) {
			  			console.log("CLEAR OK" + data);
			  			cachereset[this.indexValue] = true;
			  			$(".sresponse").after(data + "<br/>VARNISH CACHE CLEARED ON SERVER: " + cachelocs[this.indexValue] + "<br/><br/>");
			  			if (isreset()) {
			  				$(".sresponse").after("all reset");
			  			}
			  		}
			  		else {
			  			$(".sresponse").after(data + "<br/>ERROR IN RESPONSE.");
			  		}
			    },
			     error: function (request, status, error) {
			     	$(".sresponse").after("ERROR CLEARNG CACHE" + error);
		             console.log("ERROR CLEARNG CACHE");
		             console.log(request);
		             console.log(status);
		             console.log(error);
		            // resetlast();
		         }

			});

}



function varnishcacheclear() {
	if ($(".clearvarnishurl").size() === 0) { return;}

	var varnurl = $(".clearvarnishurl").text();
	console.log("GETTING VARNISH URL: " + varnurl);


	for (var p = 0; p < cachelocs.length; p++) {
		varnishcacheclearbyurl(p,varnurl);
	}


}

function isreset() {
	var allreset = true;
	for (var i = 0; i < cachereset.length; i++) {
		allreset = allreset && cachereset[i];
	}
	return allreset;
}




function checkreset(isadminpage) {
	var allreset = isreset();
	if (allreset) {
		console.log("ALL CACHES RESET");
		if (isadminpage) {
			resetlast();
		}
		else {
			setTimeout(function() {
				location.href = globalpagereset; // GO THERE
			},800);
		}
	}
	return allreset;
}
var globalpagereset;
function resetvarnish(i,isadminpage) {

	var rando = Math.floor((Math.random() * 10000) + 1);
	var reseturl = "http://" + cachelocs[i] + "/utils/purge.php?url="+escape(globalpagereset) + "&" + rando;
	console.log("RESETTING ON URL " + reseturl);
	var cachenum = i;
	$.ajax({
			  type: 'GET',
			  url: reseturl,
			  dataType: 'text',
			  success: function(data) {
		  		console.log("PURGE #"+ cachenum +" OK " + data);
		  		cachereset[cachenum] = true;
		  		checkreset(isadminpage);
			  },
	     error: function (request, status, error) {
             console.log("PURGE ERROR "+cachenum);
             console.log(request);
             console.log(status);
             console.log(error);
         }

	});
}

function resetlast() {
	$.cookie("lasturl","");
}


function bustcache(pagetoclear,isadminpage) {

	if (cacherefresh) { return;}
	cacherefresh = true;

	if (typeof(pagetoclear) !== "undefined") {
		globalpagereset = pagetoclear;
	}

	if (typeof(isadminpage) == "undefined") {
		isadminpage = false;
	}
	else {
		console.log("CLEAR FROM ADMIN");
	}



	//var purl = "http://" + document.domain + "/utils/purge.php?url="+ escape(gourl) + "&" + rando;

	// current configuration sets www.visitphilly.com to resolve to localhost
	// this prevents the varnish purging for some reason, it seems to target the webserver beneath the cache
	// using an external target fixes this
	//var purl1 = "http://www.uwishunu.com/utils/purge.php?url="+ escape(gourl) + "&" + rando;
	//var purl2 = "";
	//achetwo = true;
	//var purl2 = "http://162.209.10.251/utils/purge.php?url="+ escape(gourl) + "&" + rando;

	console.log("UPDATE : PURGING URL ACROSS CACHES.... " + cachelocs.length + " CACHES");

	for (var j = 0; j < cachelocs.length; j++) {
		resetvarnish(j,isadminpage);
	}

}