$(function(){
	/*监听滚动条*/
	$(document).scroll(function(){
		if($(document).scrollTop()>400){
			$('.backToTop').css("display","block");
		}
		else{
			$('.backToTop').css("display","none");
		}
	})
	/*折叠左侧面板*/	
	var foldFunction = function(){
		if($(this).hasClass('foldOut')){
			$(this).removeClass('foldOut');
			$('.left-col').addClass('hides');
			$('#foldBtn i').removeClass('glyphicon-chevron-left');
			$('#foldBtn i').addClass('glyphicon-chevron-right');
			$('.right-col').addClass('foldOut');
		}
		else{
			$(this).addClass('foldOut');
			$('.left-col').removeClass('hides');
			$('#foldBtn i').removeClass('glyphicon-chevron-right');
			$('#foldBtn i').addClass('glyphicon-chevron-left');
			$('.right-col').removeClass('foldOut');
		}
	}
	$('#foldBtn').click(foldFunction);
	
});