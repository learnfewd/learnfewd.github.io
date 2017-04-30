var omloaded = false;
function loadoptinmonster() {
	if (omloaded) {return;}
	omloaded = true;
	if (ismobileclient || istabletclient) {
		console.log("LOAD OPTINMONSTER :: MOBILE");
		var cojjvaf2qtwe6ft3,cojjvaf2qtwe6ft3_poll=function(){var r=0;return function(n,l){clearInterval(r),r=setInterval(n,l)}}();!function(e,t,n){if(e.getElementById(n)){cojjvaf2qtwe6ft3_poll(function(){if(window["om_loaded"]){if(!cojjvaf2qtwe6ft3){cojjvaf2qtwe6ft3=new OptinMonsterApp();return cojjvaf2qtwe6ft3.init({u:"9699.192866",staging:0,dev:0});}}},25);return;}var d=false,o=e.createElement(t);o.id=n,o.src="//a.optinmonster.com/app/js/api.min.js",o.onload=o.onreadystatechange=function(){if(!d){if(!this.readyState||this.readyState==="loaded"||this.readyState==="complete"){try{d=om_loaded=true;cojjvaf2qtwe6ft3=new OptinMonsterApp();cojjvaf2qtwe6ft3.init({u:"9699.192866",staging:0,dev:0});o.onload=o.onreadystatechange=null;}catch(t){}}}};(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(o)}(document,"script","omapi-script");
	}
	else {
		console.log("LOAD OPTINMONSTER :: DESKTOP");
		var j3ifb4bxwjerivr2,j3ifb4bxwjerivr2_poll=function(){var r=0;return function(n,l){clearInterval(r),r=setInterval(n,l)}}();!function(e,t,n){if(e.getElementById(n)){j3ifb4bxwjerivr2_poll(function(){if(window["om_loaded"]){if(!j3ifb4bxwjerivr2){j3ifb4bxwjerivr2=new OptinMonsterApp();return j3ifb4bxwjerivr2.init({u:"9699.200044",staging:0,dev:0});}}},25);return;}var d=false,o=e.createElement(t);o.id=n,o.src="//a.optinmonster.com/app/js/api.min.js",o.onload=o.onreadystatechange=function(){if(!d){if(!this.readyState||this.readyState==="loaded"||this.readyState==="complete"){try{d=om_loaded=true;j3ifb4bxwjerivr2=new OptinMonsterApp();j3ifb4bxwjerivr2.init({u:"9699.200044",staging:0,dev:0});o.onload=o.onreadystatechange=null;}catch(t){}}}};(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(o)}(document,"script","omapi-script");
	}
}
loadoptinmonster();
