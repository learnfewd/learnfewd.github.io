var _gaq = _gaq || [];
var usesecondtracker = false;
$(document).ready(function() {


	var previewpage = location.search == "?preview";

	// BEGIN CORE ANALYICS INIT
	if (previewpage) {
		console.log("PREVIEW PAGE, DISABLE TRACKING");
	}
	else {
		if (document.domain == "www.visitphilly.com" || document.domain == "visitphilly.com") {
			_gaq.push(['_setAccount', 'UA-12417933-1']); 		// Set VisitPhilly as main tracker
			_gaq.push(['_setSiteSpeedSampleRate', 100]);
			_gaq.push(['b._setAccount', 'UA-19760271-1']); 		// Set Grant Code as tracker b.
			usesecondtracker = true;
			analyticsfired = true;
			analyticsfiredlive = true;
			console.log(". . . TRACKING GA Live");
		}
		else if (document.domain == "stage.visitphilly.com") {
			_gaq.push(['_setAccount', 'UA-12417933-5']); 		// Set VisitPhilly as main tracker
			analyticsfired = true;
			console.log(". . . TRACKING GA stage");
		}
		else {
			console.log(". . . TRACKING GA Disabled | stage");
			analyticsfired = true;
		}

		if (typeof(silentTrack) == "boolean") {
			$D(". . . Silence tracker");
		}
		else {
			if (typeof(customReferrer) == "string") {
				$D("CUSTOM REFERRER: " + customReferrer);
				_gaq.push(['_setReferrerOverride', customReferrer]);
			}
			_gaq.push(['_trackPageview']);					// Track VisitPhilly code
			//_gaq.push(['_trackPageLoadTime']);		// DEPRECATED
			if (usesecondtracker) {
				_gaq.push(['b._trackPageview']);				// Track Grant code
			}
			//$D("Tracked New");
		}
	}

	//if(typeof(pagemil) != "undefined")  {
		//console.log(document.URL + " " + pagemil);
	//	_gaq.push(['_trackEvent', 'Benchmarking', 'LoadTimeMillisecs', document.URL, pagemil,true]);
	//}


	// END CORE ANALYICS INIT
});



