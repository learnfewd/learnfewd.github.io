///console.log("!!!!!!!!!!!!!!!!!! >>>>>> USING 2016 GMAP API LOADER WITH API KEY");

var gmapapiready = false;
var gmapscriptready = false;
var gmapcustomready = false;

function gmapapicallback() {
  gmapapiready = true;
  gmapruninit();
}

function gmapscriptcallback() {
  gmapscriptready = true;

  gmapruninit();
}
function customapicheck() {
  gmapcustomready = true;
  gmapruninit();
}
// ensures api is loaded and jquery is ready before map initiation commands
function gmapruninit() {
  if (!gmapapiready || (!gmapscriptready && usejquerycheck)) { return; }
  if (typeof(usecustomcheck) == "boolean" && usecustomcheck) {
    if (!gmapcustomready) { return; }
  }
  gmapallisgo();
}


$(document).ready(function(){
      // follow line should be placed within JQuery Ready to ensure readiness of both map api and jquery before map initialization
      if (usejquerycheck) {
        gmapscriptcallback();  // replaces standard callback with checks to ensure readiness
      }
});

