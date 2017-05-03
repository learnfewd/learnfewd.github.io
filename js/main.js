// Make it rain!
$('li').hide();
$('form').hide();
$('aside').hide();
$('.NewReview').hide();
$('h4').hide();

/*$('.Review').on('click', function(){
	$('.box').removeClass('crazy'); 
	$('h1').addClass('crazy');
	$('#box3').slideToggle(300);
})*/

$('.Review').on('click', function(){
    $('.contact').toggle(300);
	$('.NewReview').toggle(300);
});

$('.NewReview').on('click', function(){
    $('aside').toggle(300);
});


$('.Chew1').on('click', function(){
    $('li').toggle(300);
});

$('.Chew2').on('click', function(){
    $('.Time').toggle(300);
});

/*$('.NewReview').on('click', function(){
    $('aside').toggle(3000);
});*/

/*if (.contact && textarea = "") {
    disable .NewReview
}

else if (.contact && textarea = "text"){
enable .NewReview
}

if (.Reach out = "email")
$('.Connect').on('click', function(){
    $('h5').toggle(300);
});*/