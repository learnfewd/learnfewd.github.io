if(typeof(console)!="object"){var console={};console.log=function(){};}
var inittimer;var ident=Math.floor((Math.random()*100000)+1);function init(){if(typeof(window.top.findad)=="undefined"||typeof(window.top.$)=="undefined"){inittimer=setTimeout(function(){init();},500);return;}
window.top.findad(ident);}
inittimer=setTimeout(function(){init();},100);window.onload=function(){var iwidth=window.innerWidth;var adsizes=[170,300,345,710];var admatch=false;if(typeof(adsizes.indexOf)=="function"){if(adsizes.indexOf(iwidth)>-1){admatch=true;}}
if(!admatch){var addistance=[];for(var i=0;i<adsizes.length;i++){var diff=Math.abs(adsizes[i]-iwidth);addistance.push(diff);}
var smallindex=0;var smallest=addistance[smallindex];for(var j=1;j<addistance.length;j++){if(addistance[j]<smallest){smallindex=j;smallest=addistance[j];}}
iwidth=adsizes[smallindex];}
var adclass="ad"+iwidth;document.body.className=adclass;if(typeof(window.top.adready)!="undefined"){window.top.adready(ident);}
if(typeof(window.top.$)!="undefined"&&typeof(window.top.gtrackad)=="function"){var iframeBody=document.getElementsByTagName("body")[0];var jQuery=function(selector){return window.top.jQuery(selector,iframeBody);};var $=jQuery;var adtype=iwidth;$("a").click(function(){whref=$(this).attr("href");window.top.gtrackad(adtype,whref);});}};