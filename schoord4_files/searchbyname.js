var searchto = null;
var ajaxRequest = null;
RegExp.escape = function(str)
{
  var specials = /[.*+?|()\[\]{}\\$^]/g; // .*+?|()[]{}\$^
  return str.replace(specials, "\\$&");
}
function highlightWordsNoCase(line, word)
{
  var regex = new RegExp("(" + RegExp.escape(word) + ")", "gi");
  return line.replace(regex, "<em>$1</em>");
}




$(document).ready(function(){


	var $sbox = $(".searchnamebox");
	var listurl = document.URL;

	// REMOVE PAGINATION IF IT EXISTS IN URL
	// regex: slash, the capital letter P, followed by one or more digits, ending in slash
	listurl = listurl.replace(/\/P\d+\//g, '/');

	var lastsearch = null;
	rooturl = listurl.replace("view-all","letter");

	if ($sbox.size() > 0) {
		//alert($sbox);
		$sbox.keyup(function() {
			cval = $.trim($(this).val());
			if (cval != "") {
				$(".pagination").hide();

				if (lastsearch == cval ) { return; }
				clearTimeout(searchto);

			//	cval = cval.replace(/[^a-zA-Z0-9-_]/g, '');
				cval = cval.replace(/[^a-zA-Z\d\s:]/,'');
				cval = encodeURIComponent(cval);
				console.log(cval);
				searchto = setTimeout(function() {
					if (ajaxRequest) { ajaxRequest.abort(); }

					lastsearch = cval;
					listurl = rooturl + cval;
					console.log(listurl);

					$(".searchbyname").addClass("loading");
					$(".noresults").remove();
					ajaxRequest = $.get(listurl, function( data ) {

						$("UL.summary-alt").hide();
						$("UL.letterloaded").remove();
						if ($.trim(data) == "") {
							$(".searchbyname").after("<div class='noresults'>No Results, please refine your search</div>");
						}
						//console.log("RETURN");
					 	//console.log(data);
					  	$(".searchbyname").after(data);

					  	$(".letterloaded .gamma a").each(function() {
					  		$(this).html(highlightWordsNoCase($(this).html(),decodeURIComponent(cval)))
					  		//$(this).html($(this).html().replace(cval, "<em>"+cval+"</em"))
					  	});
					  	//$(".letterloaded").slideDown();
					  	$(".searchbyname").removeClass("loading");
					}).fail(function(data) {

								if (typeof(data) == "object" && data.statusText == 'abort') {
									/* not a fail, aborted */
								}
								else {
									console.log("FAIL");
    							console.log(data);
								}


    					});

				}, 100);
			}
			else {
				$(".noresults").remove();
				$("UL.ajaxloaded").remove();
				$(".pagination").show();
				$("UL.summary-alt").show();
			}

		});	// key down

	}

});	// end ready