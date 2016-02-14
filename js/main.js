$(function() {

    /* 滚动距离 */
    var screenTop = 350;

    /* 滚动事件 */
    $(window).scroll(function() {
        if ($(window).scrollTop() >= screenTop) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    /* 点击折叠菜单 */
    $('.nav-bar-toggle').bind('click', function(e) {
        if ($(this).hasClass('active')) {
            $('.menu').fadeOut(300);
            $(this).removeClass('active');
        } else {
            $('.menu').fadeIn(300);
            $(this).addClass('active');
        }
        //e.stopPropagation();
        return false;
    });

    /* 点击文档隐藏菜单 */
    $(document).on('click', function(e) {
        if($('.nav-bar-toggle').hasClass('active')) {
            $('.menu').fadeOut(300);
            $('.nav-bar-toggle').removeClass('active');
        }
    });

    /* 点击返回正文按钮 */
    $(".back-to-down").bind('click', function() {
        $("html,body").animate({
            scrollTop: screenTop
        }, 200)
        return false;
    });

    /* 点击返回顶部按钮 */
    $('.back-to-top').bind('click', function() {
        $("html,body").animate({
            scrollTop: 0
        }, 300);
        return false;
    });

    /* 点击微信按钮 */
    $('.wechat-btn').bind('click', function() {
        $('#shadow').fadeIn();
        $('.wechat').fadeIn();
        return false;
    });

    /* 隐藏微信信息 */
    var hideShadow = function() {
        $('#shadow').fadeOut();
        $('.wechat').fadeOut();
    };
    $('#shadow').bind('click touchstart', hideShadow);
    $('.wechat').bind('click touchstart', hideShadow);
});