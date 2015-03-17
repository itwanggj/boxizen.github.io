$(window).load(function(){
	/*$(".portrait").fadeIn(1500,function(){
			$(".portrait img").addClass("spin");
			$(".showOff").fadeIn(500);
		});*/
	$('.hiddenMenu').click(function(){
		if($(this).hasClass('toggled')){
			$(this).removeClass('toggled');
			$('.hiddenMenuList').addClass('hidden');
		}
		else{
			$(this).addClass('toggled');
			$('.hiddenMenuList').removeClass('hidden');
		}
	})
});