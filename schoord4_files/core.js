function params(qp) { try{r=unescape(location.search.match(new RegExp(qp+"=+([^&]*)"))[1]);}catch(e){r='';} return r; }
if(typeof(console) != "object") {var console = {}; console.log = function() {};}
$D = function (str) {   if (!msie) console.log(str + '\n');}; // legacy
$log = function (str) {  if (typeof(debugpage) == "boolean") { if (debugpage) { console.log(str + '\n');  } } };    // new logger
$a = function (str) {   if (enviro == "production") { $log(str); } else { alert(str);}}; // alert replacement
if (!String.prototype.contains) { String.prototype.contains = function() { return String.prototype.indexOf.apply( this, arguments ) !== -1;  }; }
if (!String.prototype.trim) { String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');}; }
Array.prototype.contains = function ( needle ) {  var j=0; for (var i in this) { if (this[i] == needle) return j; j++;} return false; };
function oneline(val) { val = String(val); val = val.replace(/(\r\n|\n|\r)/gm," "); val = val.trim(); return val;}
function captext(val) {  val = String(val); val = val.toLowerCase(); val = val.charAt(0).toUpperCase() + val.slice(1); return val; }
function xwords(sentence,max,append) {  var result = sentence; var resultArray = result.split(" "); if(resultArray.length > max){ resultArray = resultArray.slice(0, max); result = resultArray.join(" ") + append; } return result;}
function wordcount(str) { return str.split(/\s+/).length; }

if (!Array.prototype.remove) {Array.prototype.remove = function(val, all) {var i, removedItems = []; if (all) {for(i = this.length; i--;){if (this[i] === val) removedItems.push(this.splice(i, 1)); } } else {  i = this.indexOf(val); if(i>-1) removedItems = this.splice(i, 1); } return removedItems; }; }
// OBJECT WATCH
Object.prototype.watch||Object.defineProperty(Object.prototype,"watch",{enumerable:!1,configurable:!0,writable:!1,value:function(a,b){var c=this[a],d=c,e=function(){return d},f=function(e){c=d;return d=b.call(this,a,c,e)};delete this[a]&&Object.defineProperty(this,a,{get:e,set:f,enumerable:!0,configurable:!0})}});Object.prototype.unwatch||Object.defineProperty(Object.prototype,"unwatch",{enumerable:!1,configurable:!0,writable:!1,value:function(a){var b=this[a];delete this[a];this[a]=b}});


/*************** PHPJS BEGIN */
// functions from PHPJS
// https://github.com/kvz/phpjs/tree/master/
// http://phpjs.org/

/* INCUDED HERE
echo()
empty(mixed_var)
function_exists(func_name)
isset()
ltrim(str, charlist)
print_r(array, return_val)
rtrim(str, charlist)
stristr(haystack, needle, bool)
strip_tags(input, allowed)
trim(str, charlist)
var_dump()
var_export(mixed_expression, bool_return)
*/

function isset(){var a=arguments,c=a.length,d=0;if(0===c)throw Error("Empty isset");for(;d!==c;){if(void 0===a[d]||null===a[d])return!1;d++}return!0}
function trim(a,c){var d,b=0,f=0;a+="";d=c?(c+"").replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,"$1"):" \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";b=a.length;for(f=0;f<b;f++)if(-1===d.indexOf(a.charAt(f))){a=a.substring(f);break}b=a.length;for(f=b-1;0<=f;f--)if(-1===d.indexOf(a.charAt(f))){a=a.substring(0,f+1);break}return-1===d.indexOf(a.charAt(0))?a:""}
function var_export(a,c,d){var b="",b="",f,b=0,n=[],e=0;f=[];var m=d||2,l="";d="";_makeIndent=function(e){return Array(e+1).join(" ")};__getType=function(e){var a=0,f,c=typeof e;if(a="object"===c&&e&&e.constructor)a=(a=/\W*function\s+([\w\$]+)\s*\(/.exec(e.constructor))?a[1]:"(Anonymous)",a="PHPJS_Resource"===a;if(a)return"resource";if("function"===c)return"function";if("object"===c&&!e)return"null";if("object"===c){if(!e.constructor)return"object";e=e.constructor.toString();(a=e.match(/(\w+)\(/))&&
(e=a[1].toLowerCase());f=["boolean","number","string","array"];for(a=0;a<f.length;a++)if(e===f[a]){c=f[a];break}}return c};type=__getType(a);if(null===type)b="NULL";else if("array"===type||"object"===type){d=_makeIndent(m-2);l=_makeIndent(m);for(e in a)f=this.var_export(a[e],1,m+2),f="string"===typeof f?f.replace(/</g,"&lt;").replace(/>/g,"&gt;"):f,n[b++]=l+e+" => "+("array"===__getType(a[e])?"\n":"")+f;b=n.join(",\n");b=d+"array (\n"+b+"\n"+d+")"}else"function"===type?(f=a.toString().match(/function .*?\((.*?)\) \{([\s\S]*)\}/),
b="create_function ('"+f[1]+"', '"+f[2].replace(RegExp("'","g"),"\\'")+"')"):b="resource"===type?"NULL":"string"!==typeof a?a:"'"+a.replace(/(["'])/g,"\\$1").replace(/\0/g,"\\0")+"'";return c?b:(this.echo(b),null)}function ltrim(a,c){c=c?(c+"").replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,"$1"):" \\s\u00a0";return(a+"").replace(new RegExp("^["+c+"]+","g"),"")}
function rtrim(a,c){c=c?(c+"").replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,"\\$1"):" \\s\u00a0";return(a+"").replace(new RegExp("["+c+"]+$","g"),"")}function strip_tags(a,c){c=(((c||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g)||[]).join("");return a.replace(/\x3c!--[\s\S]*?--\x3e|<\?(?:php)?[\s\S]*?\?>/gi,"").replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,function(a,b){return-1<c.indexOf("<"+b.toLowerCase()+">")?a:""})}
function stristr(a,c,d){var b=0;a+="";b=a.toLowerCase().indexOf((c+"").toLowerCase());return-1==b?!1:d?a.substr(0,b):a.slice(b)}function empty(a){var c,d,b,f=[void 0,null,!1,0,"","0"];d=0;for(b=f.length;d<b;d++)if(a===f[d])return!0;if("object"===typeof a){for(c in a)return!1;return!0}return!1}
function print_r(a,c){var d="",b=this.window.document;repeat_char=function(a,c){for(var e="",b=0;b<a;b++)e+=c;return e};formatArray=function(a,c,e,b){0<c&&c++;var l=repeat_char(e*c,b),d=repeat_char(e*(c+1),b),g="",k;if(k="object"===typeof a&&null!==a&&a.constructor)k=(k=/\W*function\s+([\w\$]+)\s*\(/.exec(a.constructor))?k[1]:"(Anonymous)",k="PHPJS_Resource"!==k;if(k){var g=g+("Array\n"+l+"(\n"),h;for(h in a)g="[object Array]"===Object.prototype.toString.call(a[h])?g+(d+"["+h+"] => "+formatArray(a[h],
c+1,e,b)):g+(d+"["+h+"] => "+a[h]+"\n");g+=l+")\n"}else g=null===a||void 0===a?"":a.toString();return g};d=formatArray(a,0,4," ");if(!0!==c){if(b.body)this.echo(d);else try{b=XULDocument,this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">'+d+"</pre>")}catch(f){this.echo(d)}return!0}return d}
function var_dump(){for(var a="",c=0,d=0,b=function(a,c){for(var b="",d=0;d<a;d++)b+=c;return b},f=function(a,c){var b="";if(null===a)b="NULL";else if("boolean"===typeof a)b="bool("+a+")";else if("string"===typeof a)b="string("+a.length+') "'+a+'"';else if("number"===typeof a)b=parseFloat(a)==parseInt(a,10)?"int("+a+")":"float("+a+")";else if("undefined"===typeof a)b="undefined";else if("function"===typeof a)for(var d=a.toString().split("\n"),b="",f=0,k=d.length;f<k;f++)b+=(0!==f?"\n"+c:"")+d[f];
else if(a instanceof Date)b="Date("+a+")";else if(a instanceof RegExp)b="RegExp("+a+")";else if(a.nodeName)switch(a.nodeType){case 1:b="undefined"===typeof a.namespaceURI||"http://www.w3.org/1999/xhtml"===a.namespaceURI?'HTMLElement("'+a.nodeName+'")':'XML Element("'+a.nodeName+'")';break;case 2:b="ATTRIBUTE_NODE("+a.nodeName+")";break;case 3:b="TEXT_NODE("+a.nodeValue+")";break;case 4:b="CDATA_SECTION_NODE("+a.nodeValue+")";break;case 5:b="ENTITY_REFERENCE_NODE";break;case 6:b="ENTITY_NODE";break;
case 7:b="PROCESSING_INSTRUCTION_NODE("+a.nodeName+":"+a.nodeValue+")";break;case 8:b="COMMENT_NODE("+a.nodeValue+")";break;case 9:b="DOCUMENT_NODE";break;case 10:b="DOCUMENT_TYPE_NODE";break;case 11:b="DOCUMENT_FRAGMENT_NODE";break;case 12:b="NOTATION_NODE"}return b},n=function(a,d,l,r){var g="";0<d&&d++;var k=b(l*(d-1),r),h=b(l*(d+1),r),p="",q="";if("object"===typeof a&&null!==a){if(q=a.constructor)q=(q=/\W*function\s+([\w\$]+)\s*\(/.exec(a.constructor))?q[1]:"(Anonymous)",q="PHPJS_Resource"===
q;if(q)return a.var_dump();c=0;for(g in a)c++;var p=p+("array("+c+") {\n"),t;for(t in a)g=a[t],"object"!==typeof g||null===g||g instanceof Date||g instanceof RegExp||g.nodeName?(q=f(g,h),p+=h+"["+t+"] =>\n"+h+q+"\n"):p+=h+"["+t+"] =>\n"+h+n(g,d+1,l,r);p+=k+"}\n"}else p=f(a,h);return p},a=n(arguments[0],0,4," "),d=1;d<arguments.length;d++)a+="\n"+n(arguments[d],0,4," ");this.echo(a)}function function_exists(a){"string"===typeof a&&(a=this.window[a]);return"function"===typeof a}
function echo(){if("undefined"!==typeof module&&module.exports&&"undefined"!==typeof global&&"[object global]"=={}.toString.call(global)){var a=Array.prototype.slice.call(arguments);return console.log(a.join(" "))}for(var c="",a=arguments.length,d=arguments,b=0,f,n=this.window,e=n.document,m=function(a,b,c,d){var g="";"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"===c&&(g=' xmlns:html="http://www.w3.org/1999/xhtml"');var g="<"+d+' xmlns="'+c+'"'+g+">"+a+"</"+d+">",h=n.DOMImplementationLS,
k=n.DOMParser,l=n.ActiveXObject;if(h&&h.createLSInput&&h.createLSParser)return a=h.createLSInput(),a.stringData=g,h.createLSParser(1,null).parse(a).firstChild;if(k)try{var m=(new k).parseFromString(g,"text/xml");if(m&&m.documentElement&&"parsererror"!==m.documentElement.localName&&"http://www.mozilla.org/newlayout/xml/parsererror.xml"!==m.documentElement.namespaceURI)return m.documentElement.firstChild}catch(r){}else if(l)return b=new l("MSXML2.DOMDocument"),b.loadXML(a),b.documentElement;f=e.createElementNS&&
(e.documentElement.namespaceURI||"html"!==e.documentElement.nodeName.toLowerCase()||e.contentType&&"text/html"!==e.contentType)?e.createElementNS(c,d):e.createElement(d);for(f.innerHTML=a;f.firstChild;)b.appendChild(f.firstChild);return!1},l=function(a){if(1===a.nodeType){var b=e.createElement(a.nodeName),c,d;if(a.attributes&&0<a.attributes.length)for(c=0,d=a.attributes.length;c<d;c++)b.setAttribute(a.attributes[c].nodeName,a.getAttribute(a.attributes[c].nodeName));if(a.childNodes&&0<a.childNodes.length)for(c=
0,d=a.childNodes.length;c<d;c++)b.appendChild(l(a.childNodes[c]));return b}return e.createTextNode(a.nodeValue)},r=function(a,b,c){return"\\"!==b?b+eval(c):a},g=this.php_js=this.php_js||{},k=g.ini,h=g.obs,b=0;b<a;b++)c=d[b],k&&k["phpjs.echo_embedded_vars"]&&(c=c.replace(/(.?)\{?\$(\w*?\}|\w*)/g,r)),!g.flushing&&h&&h.length?h[h.length-1].buffer+=c:e.appendChild?e.body?"Microsoft Internet Explorer"===n.navigator.appName?e.body.appendChild(m(l(c))):(c=m(c,e.body,"http://www.w3.org/1999/xhtml","div").cloneNode(!0))&&
e.body.appendChild(c):e.documentElement.appendChild(m(c,e.documentElement,"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul","description")):e.write?e.write(c):console.log(c)};

/*************** PHPJS END  */
function msver() {  var rv =  -1;   if (navigator.appName == 'Microsoft Internet Explorer') {  rv = 0;  var ua = navigator.userAgent;    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})"); // jshint ignore:line
if (re.exec(ua) !== null)  rv = parseFloat( RegExp.$1 );  }  else if (navigator.appVersion.indexOf('Trident/') > 0) { rv = 11; }  return rv; }
var iev = msver();
var msie = iev > 0;
if(typeof($) != "object") {var $ = {}; $.browser =  {}; $.browser.msie = msie; $.browser.mozilla = true; }



// Returns the version of Internet Explorer or a -1 // (indicating the use of another browser).
function getInternetExplorerVersion() {
  var rv = -1; // Return value assumes current.
  if (navigator.appName == 'Microsoft Internet Explorer') {
    rv = 1;
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) !== null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appVersion.indexOf('Trident/') > 0) {
    rv = 11;
  }

  return rv;
}

// returns the text within an element, excluding any text within the children of the element
function getelementtext($el) {

  eltext = $el
      .clone()    //clone the element
      .children() //select all the children
      .remove()   //remove all the children
      .end()  //again go back to selected element
      .text();
  eltext = $.trim(eltext);
  return eltext;

}

// Track basic JavaScript errors
/*
window.addEventListener('error', function(e) {
    _gaq.push([
        '_trackEvent',
        'JavaScript Error',
        e.message,
        e.filename + ':  ' + e.lineno,
        true
    ]);
});

// Track AJAX errors (jQuery API)
$(document).ajaxError(function(e, request, settings) {
    _gaq.push([
        '_trackEvent',
        'Ajax error',
        settings.url,
        e.result,
        true
    ]);
});

*/
// GLOBAL END

  window.onerror = function(e, url, line,col,eobj)  {    // capture live site js errors
    var data = '\n\nJS ERROR: ' + e + '\nline: ' + line + '\nuri: ' + url;
    var note = "";
    if (empty(line) && empty(url)) {
      note += "NOTE: check general javascript syntax for unmatched brackets or parenthesis";
    }

    console.log("%c"+data, 'background: #FF0000; color: #fff');

    url = new String(url);
    var hasj =  typeof(jQuery) != 'undefined';

    // don't send these errors
    if (url.contains("platform.twitter.com")) { return true; }
    if (url.contains("mshtml.dll")) { return true; }
    if (url.contains("apilinkswiftco")) { return true; }
    if (url.contains("doubleclick.net")) { return true; }
    if (url.contains("googletagservices.com")) { return true; }
    if (url.contains("plusone.js")) { return true; }
    if (url.contains("intranet.us.estee.com")) { return true; }
    if (url.contains("blockpage.cgi")) { return true; }
    if (url.contains("amadorcoe")) { return true; }
    if (url.contains("/access/web?id=")) { return true; }
    if (url.contains("quantserve")) { return true; }

    if (enviro == "development" || !empty(params("debug"))) {
      setTimeout(function() {
        allTagsInBody = document.body.setAttribute("class", "jserror");
        if (hasj && $(".echeck:visible").size() > 0) {
            $(".echeck").html(data + " &nbsp; &nbsp; " + note);
        }
      },500);

    }
    return true;
  };

function sendrollbar(e) {
  return;
}
// END ROLLBAR

function redlog(data) {
    console.log("%c"+data, 'background: #FF0000; color: #fff');
}

function bluelog(data) {
    console.log("%c"+data, 'background: #0000ff; color: #fff');
}


// script stubs
function respond() {  $log("respond not loaded"); }
function initmap() {  $log("initmap not loaded");   }
function geolink(elem) { return false;}
//function trackfeatured()  {  $log("trackfeatured not loaded"); }
//function trackslideshow()  {  $log("trackslideshow not loaded"); }
//function trackbillboard()  {  $log("trackbillboard not loaded"); }
//function trackdrops()  {  $log("trackdrops not loaded"); }
function atomicFindClose()   {  $log("atomicFindClose not loaded"); }
function otrack(item) { $log("tracking not loaded"); return true;}
function dtrack(item) { $log("tracking not loaded"); return true;}
function extrack(item) { $log("tracking not loaded"); return true;}



var dataKeys = null;
var sCapGloRef = null;
var MMJS = null;
var SogouMse = null;

// stop propigation
function stopit(e) { if(e && e.stopPropagation) { e.stopPropagation(); } else { e = window.event; if (e) { e.cancelBubble = true; } } return false;}

// IE 11 Fix  the "attachEvent" method is obsolete in IE11.  It should be replaced with "addEventListener";
if (msver() >= 11) {
  // doesn't seem to be needed anymore??
  /*
  if (typeof(Element) != "undefined") {
    if (typeof(Element.prototype) != "undefined") {
      if (typeof(Element.prototype.attachEvent) == "undefined") {
        alert("here");
          Element.prototype.attachEvent = Element.prototype.addEventListener;
      }
    }
  }*/

}


function pagescrolltop() {
  return  Math.max($("body").scrollTop(),$("html").scrollTop());
}



// needed on in-page functions
function cleanstring(wstr) {
  //wstr = $.trim(wstr);
  wstr = wstr.replace("<br>"," ");
  wstr = wstr.replace("<br/>"," ");
  wstr = wstr.replace("<br />"," ");
  wstr = wstr.replace("<BR>"," ");
  wstr = wstr.replace("<BR/>"," ");
  wstr = wstr.replace("<BR />"," ");
  wstr = escape(wstr);
  return wstr;

}
hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

function justpath(val) {
  if (val == "undefined" || val === "" || val === null) { return "";}
  val = new String(val);

  val = val.replace("http://www.visitphilly.com","");
  val = val.replace("http://visitphilly.com","");
  val = val.replace("http://dev.visitphilly.com","");
  val = val.replace("http://stage.visitphilly.com","");

  return val;
}

function adminnotice(errname, errnote, errclass) {
  if (typeof(errclass) == 'undefined') {
    errclass = "defaultnotice";
  }
  console.log(errname);
  console.log(errnote);
  console.log("----------------");
 if (isanadmin) {
   console.log("IS AN ADMIN");
  if ($(".adminnoticeholder").size() === 0) { // add holder if it needs it
    $("body").prepend("<div class='adminnoticeholder'><div class='adminnoticetext'>ADMIN NOTICE:</div><div class='adminnoticecontent'></div></div>");
  }
  if (empty(errnote)) { errnote = ""; }
  else { errnote = "<span>"+errnote+"</span>";  }
  note = "<div class='adminnotice "+errclass+"'>"+errname+errnote+"</div>";
  $(".adminnoticecontent").prepend(note);
 }

}

function mobiledebug(val) {
  return;
}



// GOOGLE ANALICS INCLUDE
var analyticsfired = false;
var analyticsfiredlive = false;
var _gaq = _gaq || [];

var gatrackingscript;
console.log("Initializing Google Analytics");
(function() {
  gatrackingscript = document.createElement('script'); gatrackingscript.type = 'text/javascript'; gatrackingscript.async = true;
  //ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  //NEW DEMO CODE
  gatrackingscript.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gatrackingscript, s);
  })();


// REMOVE HASH ON REFRESH CAUSED BY TRACKING PIXEL
var docpagehash = window.location.hash;
if (docpagehash.indexOf("sm.") >= 0 ) {
   // window.location.hash = ""; // remove it

   // DISABLE
   //  window.location.href = window.location.href.split('#')[0]
}


// duplicate php plugin function mu_fix:http
// relative URLs will probably cause problems with this function
function fixhttp(str,encodeval) {
    if (empty(str)) {
      return "";
    }
    if (typeof(encodeval) != "boolean") {
        encodeval = false;
    }
    var ostr = str;
    if (str.substring(0, 1) == "/") {
        // might be absolute link
    }
    else {
      str = ltrim(str, "http");
       // if str changed, than it had some https

        if (str.substring(0, 1) == "s") {
            if (ostr != str) {
              str = ltrim(str, "https://");
              str = "https://" + str;
            }
        }
        else {
            str = ltrim(str, "://");
            str = "http://" + str;
        }

    }
    if (encodeval) {
      //http://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent
      // encodeURI()
      str = encodeURIComponent(str);
    }

   return str;

}



// duplicate php plugin function mu_fix:img
function rimg(src,w,h,typestr,fullurl) {
  if (typeof(fullurl) != "boolean") {
      fullurl = true;
  }

  // used to differentiate and for seo
  if (typeof(typestr) != "string") {
      typestr = "img";
  }

  src = fixhttp(src);

  src = src.replace("://", "/");
  src = encodeURI(src);
  dims = w+"x"+h;

  str = "/resize/"+w+"x"+h+"/"+typestr+"/r/"+src;
  if (fullurl) {
    str = "http://"+document.domain+str;
  }
  return str;
}
