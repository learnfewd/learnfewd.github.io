// Make it rain!
// $('h5').hide();
$('form').hide();
$('aside').hide();

/*$('.Review').on('click', function(){
	$('.box').removeClass('crazy'); 
	$('h1').addClass('crazy');
	$('#box3').slideToggle(300);
})*/

$('.Review').on('click', function(){
    $('form').toggle(3000);
});


$('.NewReview').on('click', function(){
    $('aside').show(3000);
});

