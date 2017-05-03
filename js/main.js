// hide a form
$('li').hide();
$('form').hide();
$('aside').hide();
$('.NewReview').hide();
$('h4').hide();

// reveal form once button is clicked
$('.review').on('click', function(){
    $('.contact').toggle(300);
	$('.NewReview').toggle(300);
});

$('.NewReview').on('click', function(){
    $('aside').toggle(300);
});


$('.chew1').on('click', function(){
    $('li').toggle(300);
});

$('.chew2').on('click', function(){
    $('.time').toggle(300);
});

// sticky nav

$('nav').addClass('original').clone().insertAfter('nav').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();

scrollIntervalID = setInterval(stickIt, 10);

function stickIt() {

  var orgElementPos = $('.original').offset();
  orgElementTop = orgElementPos.top;               

  if ($(window).scrollTop() >= (orgElementTop)) {
        
    orgElement = $('.original');
    coordsOrgElement = orgElement.offset();
    leftOrgElement = coordsOrgElement.left;  
    widthOrgElement = orgElement.css('width');
    $('.cloned').css('left',leftOrgElement+'px').css('top',0).css('width',widthOrgElement).show();
    $('.original').css('visibility','hidden');
  } else {
    
    $('.cloned').hide();
    $('.original').css('visibility','visible');
  }
}