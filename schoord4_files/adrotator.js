		var adrotation = 5000;
		var fadetime = 1000;
		var stoponce = true;
		var allads = [];

		function PageAd(wad,cycler) {
	    this.wad = wad;
	    this.cycler = cycler;
	    this.cyclecount = 0;
	    this.divnum = cycler.find("> div").size();
	    this.timeo = null;
	    if ($.trim(this.cycler.find(".head").text()) === "")  {
	    	this.cycler.addClass("img300");
	    }
	    if (this.cycler.find('.active').size() != 1) {
	    		this.cycler.find('.active').removeClass("active");
	    		this.cycler.find('.wrap:first').addClass("active");
	    }
	    this.cycler.show();
		}
		PageAd.prototype.cycleit = function() {
			var qid = this.wad;
			var that = this;
			clearTimeout(this.timeo);
			this.timeo = setTimeout(function() {
		     		cycleImages(that);
		     }, adrotation);
		};


		function findad(wad) {
			$("iframe[id*=google_ads]").each(function() {
				//if ($(this).attr("rel") == "loaded") { return true; }
				var cdoc = $(this)[0].contentDocument;
				var bhtml = $($(cdoc)[0]);
				if (bhtml.find("#"+wad).size() == 1) {
					tcycler = bhtml.find("#cycler");
					//console.log(bhtml.find("body").attr("class"));
					//console.log(bhtml.find(".wrap").size());
					thisAd = new PageAd(wad,tcycler);
					allads.push(thisAd);
					thisAd.cycleit();
				}
			});
		}

		function getadframebyid(wid) {
			var $frame = null;
			$("iframe[id*=google_ads]").each(function() {
				var cdoc = $(this)[0].contentDocument;
				var bhtml = $($(cdoc)[0]);
				if (bhtml.find("#"+wid).size() == 1) {
					$frame = $(this);
				}
			});
			return $frame;
		}

		function adready(wad) {
			$adframe = getadframebyid(wad);
			if ($adframe != null) {
				$adframe.addClass("adready");
				if ($adframe.closest(".gptad").size() > 0) {
					$adframe.closest(".gptad").addClass("adready");
				}
			}
		}

		function cycleImages(pAd){
			var $active;
			var $cycler = pAd.cycler;
			if ($cycler.find(".wrap").size() <= 1) { return; }

 		 $active = $cycler.find('.wrap.active');

			pAd.cyclecount++;

			if (stoponce) {
				if (pAd.cyclecount >= (pAd.divnum * 2) + 1) {  return; }
			}
			//console.log($active.text());
			//console.log($active.next(".wrap").text());
			var $next = ($active.next(".wrap").length > 0) ? $active.next(".wrap") : $cycler.find('> div.wrap:first');
			$next.css('display','block');
			$next.css('z-index',2);//move the next image up the pile
			$active.fadeOut(fadetime,function(){// FADE COMPLETE: fade out the top image
			  $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
			  $next.css('z-index',3).addClass('active');//make the next image the top one
			  pAd.cycleit();
			});



		}