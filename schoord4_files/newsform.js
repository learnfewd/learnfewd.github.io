var uemail, formtarget;



$(document).ready(function()
{
    // TRIGGER FROM QUERY STRING
    if (params("signup") == "1") {
      if (typeof(issignup) == "undefined") {
        //$("#signup").val("m@uffa.co");  /////////////////// TEST
        newsform("forced");
      }
    }

});


// SUBMIT FOOTER FORM WITH ONLY EMAIL
function newsform(wform) {
  if (mobile) { return true;} // IF MOBILE, SUBMIT TO NORMAL PAGE

  if (wform == "forced") {
    uemail = "";
  }
  else {
    emailfield =  $(wform).find("input[name='email']");
    uemail = $(wform).find("input[name='email']").val();

    uemail = $.trim(uemail);
    if (empty(uemail) || uemail == emailfield.prop('defaultValue')) {
      alert("Please enter your email address to continue");
      return false;
    }
  }

  // TRACKING
  if (typeof(trackfootsub) == "function") {
    trackfootsub();
  }

  var toload = "/newsletter/sign-up/popup/";
  $.colorbox({className:"newsletterbox",fastIframe:false, iframe:true, width:"870px",  height:"620px", opacity:0.65, href:toload, onComplete:newslaunch,close: ""});
  return false;

}


function closebox() {
   console.log("CLOSE COLOR BOX");
   $.colorbox.close();
}



function newslaunch() {
    console.log("NEWSLETTER OPEN CALLBACK");
//    formtarget = $(".cboxIframe").attr("name");
    //console.log("formtarget: " + formtarget);
}



