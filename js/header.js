// 函数节流
var debounce = function(idle, action) {
    var last;
    return function() {
        var ctx = this,
            args = arguments
        clearTimeout(last)
        last = setTimeout(function() {
            action.apply(ctx, args)
        }, idle)
    }
}
// 重发验证码函数
var handle = function(selecter, fun, time) {
	--time;
	selecter.html(time + '秒后重发');
	if(time > 0) {
		setTimeout(function() {
			handle(selecter, fun, time)
		}, 1000);
	} else {
		fun();
	}
}
$(function() {
	var containerHeight = $('.left_main_nav_list').height();
	var $body = $('body');
	var $bodyHtml = $('body, html');
	var $leftMainNavOutBox = $('#leftMainNavOutBox');
	var $toTop = $('#toTop');
	$window = $(window);
	var clientHeight = $(window).height();
	var clientWidth = $(window).width();
	var maintWidth = $('.header').width();
	var brandBoxHeight = $('.brand_box').height(true);

	$('.main_sub_nav_hover').css('top', $('.header').outerHeight());

	if(clientWidth <= 768) {
		$('.search_outer_box').width(maintWidth - 80);
		$leftMainNavOutBox.height(clientHeight - brandBoxHeight);
	}
	
	$('body').click(function() {
		$('#mainSearchBox').removeClass('show');
		$('#countryListBox').slideUp(100);
		$('#languageListBox').slideUp(100);
	});
	$('#showSearchBtn').click(function(e) {
		e.stopPropagation();
		$('#mainSearchBox').addClass('show');
	});

	$('#searchInput').click(function(e) {
		e.stopPropagation();
	});

	$('#searchClear').click(function(e) {
		e.stopPropagation();
		$('#searchInput').val('');
	});

	var $items = $('#leftMainNavBox').find('.item');
	var itemLength = $items.length;

	$items.click(function() {
		var $currentSublist = $(this).find('.sub_list');
		var contentHeight = $('#leftMainNavBox').find('.content').height();
		var currentSublistHeight = $currentSublist.outerHeight(true);
		var scrollTop = contentHeight - containerHeight - currentSublistHeight;
		
		if($currentSublist.is(':visible')) {
			$('.left_main_nav_list').animate({scrollTop: scrollTop}, 100);
			$currentSublist.slideUp(320, function() {
				if($('#leftMainNavBox').find('.content').height() < containerHeight) {
					$('.ps-scrollbar-y-rail').hide();
				}
			}.bind(this));
			$(this).removeClass('active');
		} else {
			$currentSublist.slideDown(320, function() {
				if($('#leftMainNavBox').find('.content').height() > containerHeight) {
					$('.ps-scrollbar-y-rail').show();
				}
			});

			$(this).addClass('active');
		}
	});

	$('#leftMainNavBox').find('.sub_list').find('li').click(function() {
		$leftMainNavOutBox.removeClass('show');
		ensableScroll();
	});

	$('#navList').perfectScrollbar(null, {myHeight:32});

	$('#more').click(function() {
		disableScroll();

		$leftMainNavOutBox.addClass('show');
	});

	$('#leftMainNavBox').click(function(e) {
		e.stopPropagation();
	});
	$leftMainNavOutBox.click(function() {
		$(this).removeClass('show');
		ensableScroll();
	});
	$('#hideNav').click(function() {
		$leftMainNavOutBox.removeClass('show');
		ensableScroll();
	});

	var disableScroll = function() {
		$bodyHtml.css({
			"overflow":"hidden",
			"height": '100%'
		});
	}
	var ensableScroll = function() {
		$bodyHtml.css({
			"overflow":"auto",
			"height": 'auto'
		});
	}
	var $mainSubNavHover = $('.main_sub_nav_hover');
	$('.nav_list').delegate('li', 'mouseenter', function() {
		$(this).find('.main_sub_nav_hover').show();
		disableScroll();
	});
	$('.nav_list').delegate('li', 'mouseleave', function() {
		$(this).find('.main_sub_nav_hover').hide();
		ensableScroll();
	});
	$('.main_sub_nav_box').click(function(e) {
		e.stopPropagation();
	});
	$('.main_sub_nav_box').mouseleave(function() {
		$mainSubNavHover.hide();
		ensableScroll();
	});
	$('.main_sub_nav_box').delegate('a', 'click', function() {
		$mainSubNavHover.hide();
		ensableScroll();
	});

	$('.home_login_box').delegate('a', 'click', function() {
		$leftMainNavOutBox.removeClass('show');
		ensableScroll();
	});
	$('.collection_store_box').delegate('a', 'click', function() {
		$leftMainNavOutBox.removeClass('show');
		ensableScroll();
	});

    $window.scroll(debounce(320, function() {
        // 在ie下 document.body.scrollTop始终为 0
        // console.log(document.body.scrollTop);
        
        // var scrollTop = document.body.scrollTop == 0 ? document.body.scrollTop : $bodyHtml.scrollTop();
        var scrollTop = document.body.scrollTop || $bodyHtml.scrollTop();
        
        if (scrollTop == 0) {
            $toTop.hide();
        } else {
            $toTop.show();
        }
    }));

    $toTop.click(function() {
        $bodyHtml.animate({
            scrollTop: 0
        }, 320);
        $toTop.hide();
    });
	
})