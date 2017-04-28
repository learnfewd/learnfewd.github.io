// Make it rain!
$('li').hide();
$('form').hide();
$('aside').hide();
$('.NewReview').hide();

/*$('.Review').on('click', function(){
	$('.box').removeClass('crazy'); 
	$('h1').addClass('crazy');
	$('#box3').slideToggle(300);
})*/

$('.Review').on('click', function(){
    $('form').toggle(3000);
	$('.NewReview').toggle(3000);
});

$('.NewReview').on('click', function(){
    $('aside').toggle(3000);
});


$('.Chew1').on('click', function(){
    $('.Menu').toggle(3000);
});

$('.Chew2').on('click', function(){
    $('.Time').toggle(3000);
});

/*$('.NewReview').on('click', function(){
    $('aside').toggle(3000);
});*/