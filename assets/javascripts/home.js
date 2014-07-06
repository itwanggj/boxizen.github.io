$(function(){
	$('img').onload(function(){
		$(".portrait").fadeIn(1500,function(){
			$(".portrait img").addClass("spin");
			$(".showOff").fadeIn(500);
		});
	});
});