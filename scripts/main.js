'use strict';

(function () {
    //点击一级目录
    $('.first-leve-div span').click(function (e) {
        e.stopPropagation();
        var thatTaget = this;
        leftNavIconChange(thatTaget);
        $(this).next('ul').slideToggle();
    });
    // 点击二级目录
    $('.second-leve-ul a').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var second_leve_ul = $(this).parent().next('ul');
        // 如果没有三级菜单
        if (second_leve_ul.length == 0) {
            //清除li的激活样式
            $('.second-leve-ul').find('li').removeClass('active');
            $(this).parent('li').addClass('active');
            //卷起点击后的导航栏
            $('.nav-sidebar').collapse('hide');
            //移动端点击菜单改变顶部标题，便于清楚知道选择了什么栏目
            var titleText = $(this).text();
            phoneChangeTitle(titleText);
        } else {
            //移动端点击菜单改变顶部标题，便于清楚知道选择了什么栏目
            var titleText = $(this).text();
            phoneChangeTitle(titleText);
            second_leve_ul.slideToggle();
        }
    });
    //点击左侧伸缩按钮
    function pullLeft() {
        $('.pull-left-target').on('click', function (e) {
            e.stopPropagation();
            //将两个推拉按钮统一起来
            var that = $(this).children().length == 0 ? $(this) : $(this).children(),
                targetMove = $('.bi-director-left'),
                cssLeftString = targetMove.css('left').split('px')[0],
                cssLeft = parseInt(cssLeftString),
                leftWidth = targetMove.outerWidth();
            if (cssLeft >= 0) {
                // 左侧菜单向左边移动
                $('.bi-director-left').animate({ left: -leftWidth + 'px' });
                that.addClass('icon-caret-right').removeClass('icon-caret-left');
                //右边内容区撑满屏幕
                // $('.sidebar').css('position','absolute');
                $('.main').removeClass('col-sm-9 col-md-9 col-lg-10');
                removeBugDiv();
            } else if (cssLeft < 0) {
                $('.bi-director-left').animate({ left: 0 });
                that.addClass('icon-caret-left').removeClass('icon-caret-right');
                $('.main').addClass('col-sm-9 col-md-9 col-lg-10');
                // $('.sidebar').css('position','relative');
                addBugDiv();
            }
        });
    }
    pullLeft();

    //动态设置左侧菜单栏高度
    function reloadChangeSize() {
        $('.my-middle-body').css('height', function () {
            if (window.innerHeight) {
                var winHeight = 0;
                winHeight = window.innerHeight;
            } else if (document.body && document.body.clientHeight) {
                winHeight = document.body.clientHeight;
            }
            return winHeight - 60;
        });
    }

    function browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase(),
            bIsIpad = sUserAgent.match(/ipad/i) == 'ipad',
            bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os',
            bIsMidp = sUserAgent.match(/midp/i) == 'midp',
            bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4',
            bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb',
            bIsAndroid = sUserAgent.match(/android/i) == 'android',
            bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce',
            bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile',
            isPhone = bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM;
        //如果不在移动端
        if (!isPhone || bIsIpad) {
            addBugDiv();
            //pc端则动态执行左侧菜单高度
            reloadChangeSize();
        } else {
            $('.nav-sidebar').addClass('in').attr('aria-expanded', true);
            return isPhone;
        }
    }
    var isPhone = browserRedirect();
    //改变顶部标题
    function phoneChangeTitle(titleText) {
        if (isPhone) {
            var phoneTitle = $('.navbar-brand');
            phoneTitle.text(titleText);
        }
    }
    if (isPhone) {
        $(".common-icon").css("width", "100%");
        $(".other-directory").css("width", "100%");
        // /默认关闭导航栏/
        $('.nav-sidebar').collapse();
        //点击右上角按钮默认回到顶部
        $('.nav-sidebar').on('show.bs.collapse', function () {
            $('.my-middle-body').animate({ scrollTop: 0 }, 300);
        });
    }
    //改变点击导航栏后右边图标方向
    function leftNavIconChange(thatTaget) {
        var _this = $(thatTaget);
        _this.find(".right-first-leve-icon").toggleClass(" icon-angle-down");
    }
    //点击右侧消息图标按钮收缩
    $("#message-alert-icon").click(function (e) {
        e.stopPropagation();
        $(".message-alert-container").slideToggle();
    });

    function removeBugDiv() {
        $(".isbugdiv").remove();
    }
    function addBugDiv() {
        var navBug = $("<div></div>").addClass("col-sm-3 col-md-3 col-lg-2 isbugdiv");
        $("#left-nav-bug").prepend(navBug);
    }
})();
//# sourceMappingURL=main.js.map
