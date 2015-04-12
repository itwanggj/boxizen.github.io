$(function(){
	$(window).scroll(function(){
		if($(window).scrollTop()>="350"){
			$('.back-to-top').fadeIn(1);
		}
		else{
			$('.back-to-top').fadeOut(1);
		}
	});
	$('.nav-bar-toggle').click(function(){
		if($(this).hasClass('active')){
			$('.menu').fadeOut(300);
			$(this).removeClass('active');
		}
		else{
			$('.menu').fadeIn(300);
			$(this).addClass('active');
		}
		return false;
	});
	$(".back-to-down").click(function(){
		$("html,body").animate({
			scrollTop:350
		},200)
		return false;
	});
	$('.back-to-top').click(function(){
		$("html,body").animate({
			scrollTop:0
		},300);
		return false;
	});
	$('.wechat-btn').click(function(){
		$('#shadow').fadeIn();
		$('.wechat').fadeIn();
		return false;
	});
	var hideShadow = function(){
		$('#shadow').fadeOut();
		$('.wechat').fadeOut();
	};
	$('#shadow').click(hideShadow);
	$('.wechat').click(hideShadow);
});