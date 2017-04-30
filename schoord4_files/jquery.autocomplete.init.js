var autoset = false;
var autourl = '/enhanced-includes/autocomplete/';


$('#searchtext').click(function() {
      var cval = $.trim($("#searchtext").val());
        var dval = $("#searchtext").prop("defaultValue");

        if (cval == dval) {
            $("#searchtext").val("");
            $("#searchtext").attr("placeholder","");
            return false;
        }

});

$('#searchtext, #searchtext2').autocomplete({
    width:308,
    lookupLimit:50,
    tabDisabled: false,
    autoSelectFirst: false,
    minChars:1,
    triggerSelectOnValidInput: false,

    serviceUrl: autourl,
    lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
        console.log("AC: LOOKUP" + suggestion + " | " + originalQuery+ " | " + queryLowerCase);

        var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
        var sv = suggestion.value;
        sv = sv.replace(/[^a-z0-9\s]/gi, '');
        return re.test(sv);
    },
    onSelect: function(suggestion) {
        console.log("AC: SELECT START" + suggestion);  // obj
     //   console.log(suggestion);
        var cval = $.trim($(this).val());
        var dval = $(this).prop("defaultValue");
        console.log(suggestion.data);

        if (cval == dval) {
            $(this).val("");
            $(this).attr("placeholder","");
            console.log("CLEARING");
            return suggestion;
        }

        if (cval  != '' && suggestion.value != "") {

            if (suggestion.data != "" && suggestion.data != null) {
                window.location = suggestion.data;
            }
            else {

               $(this).parents("form").submit();
               return;
            }

        }
    },
    onSearchStart: function (query) {
        console.log("AC: SEARCH START: " + query);
    },
    onHint: function (hint) {
          console.log("AC: HINT" + hint);
    },
    onInvalidateSelection: function() {
         console.log("AC: INVALID");
    }
});
