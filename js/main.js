$(document).ready(function () {
    var $body, options, content;
    var speed;

    var controller = new ScrollMagic.Controller();

    function isMobile() {
        if ($('.is-mobile').css('display') === 'block') {
            return true;
        } else {
            return false;
        }
    }

    controller.scrollTo(function (target) {
        TweenMax.to(window, 0.7, {
            scrollTo: {
                y: target,
                autoKill: true
            },
            ease: Power2.easeOut
        });
    });

    //fullpage and body scroll

    speed = 900;
    var fullpageOptions = ({
        licenseKey: 'B80EC24D-66D9477B-B16E7559-B4301A50',
        scrollingSpeed: speed,
        scrollHorizontally: false,
        scrollOverflow: false, //
        autoScrolling: false,
        fitToSection: false,
        // fitToSectionDelay: 50000,
        fixedElements: '.header',
        css3: true,
        scrollBar: true,
        verticalCentered: false,
        lockAnchors: true,
        animateAnchor: false
    });

    $('#fullpage').fullpage(fullpageOptions);

    function handleFullPage() {
        if (isMobile()) {
            $.fn.fullpage.setResponsive(true);
            // $.fn.fullpage.setAutoScrolling(false);
        } else {
            $.fn.fullpage.setResponsive(false);
            $.fn.fullpage.setAutoScrolling(true);
        }
    }

    //reseting header

    function headerReset() {
        $('.page-menu').removeClass('is-active');
        $('.hamburger').removeClass('is-active');
        $('body, html').removeClass('no-scroll-initial');
    }

    function handlePageMenu() {
        $('.header__menu-link').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.page-menu').toggleClass('is-active');
            $('.hamburger').toggleClass('is-active');
        });
    }

    function handlePageMenuLink() {
        $('.page-menu__list-link').on('click', function (e) {
            var href = $(this).attr('href');
            headerReset();
            $.fn.fullpage.setScrollingSpeed(0);
            $.fn.fullpage.moveTo(href);
            $.fn.fullpage.setScrollingSpeed(speed);

            location.href = href;
        });
    }

    function menuClosing() {
        $(document).on('click', function (e) {
            if (!e) e = window.event;
            if ($('.page-menu').hasClass('is-active')) {
                if (!$(e.target).closest('.page-menu.is-active').length) {
                    headerReset();
                }
            }
        });
    }

    function stockSliderInit() {
        $('.header-stock__slider').slick({
            autoplay: true,
            infinite: true,
            dots: false,
            arrows: false,
            autoplaySpeed: 0,
            speed: 3500,
            pauseOnHover: false,
            pauseOnFocus: false,
            cssEase: 'linear',
            swipe: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            variableWidth: true,
            centerMode: false
        });
    }

    function printTime() {
        /* timezone info: https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json */

        var now = moment().format("hh:mm"); // Your Current Time.

        var target = $('.header-stock__item-time');

        target.each(function (i, el) {
            var $this = $(this),
                tz = $(this).attr('data-timezone');

            $this.text(moment().tz(tz).format('HH:mm'));
        });
    }

    setInterval(printTime, 1000);

    //modal
    function handleModal() {
        $('.modal__open-link').on('click', function (e) {
            e.preventDefault();

            var $this = $(this),
                href = $this.attr('href');

            $('body').find('.modal__wrap' + href).addClass('is-active');
        });

        $('.modal__close-btn').on('click', function (e) {
            $('.modal__wrap').removeClass('is-active');
        });
    }

    //modal success msg
    function handleModalSuccess() {
        $('.modal-interest').on('submit', function (e) {
            e.preventDefault();

            setTimeout(function () {
                $('.modal-success').addClass('is-active');
            }, 600);
            $(this).removeClass('is-active');
            $('.form-interest input').val('');
        });
    }

    //scroll btn
    function handleScroll() {
        $('.page-scroll__btn').on('click', function (e) {
            e.preventDefault();

            var $this = $(this),
                href = $this.attr('href');

            controller.scrollTo(href);
        });
    }

    //mail form subscribe
    function submitMailForm() {
        $('.page-mail__form').on('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();

            $('.modal-success').addClass('is-active');
            $('.page-mail__form').get(0).reset();
        });
    }

    //contact page
    function membershipFormSubmit() {
        $('.membership-form').on('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();

            $('.modal-success').addClass('is-active');
            $('.membership-form').get(0).reset();
            $('.membership-form').get(0).blur();
        });
    }

    //Smooth page transitions
    //https://www.javascripting.com/view/smoothstate-js#built-with-smoothstatejs

    $body = $('html, body');
    options = {
        debug: true,
        anchors: '.page-transition__link',
        repeatDelay: 0,
        blacklist: '.no-smoothState',
        onStart: {
            duration: 400,
            render: function ($container) {
                $container.toggleClass('is-exiting').addClass('scene__element--fadein');
                $('.page-wrapper').addClass('scene__element--fadein');
                $('.main-scene').addClass('is-loading');
            }
        },
        onProgress: {
            duration: 0,
            render: function ($container) {
                // console.log('on progress')
            }
        },
        onReady: {
            duration: 0,
            render: function ($container, $newContent) {
                // Remove your CSS animation reversing class
                // $container.removeClass('is-exiting scene__element--fadein');

                location.reload();
                $('.page-wrapper').addClass('scene__element--fadein');

                // Inject the new content
                $container.html($newContent);
            }
        },
        onAfter: function ($container, $newContent) {
            $container.removeClass('is-loading').addClass('has-loaded');

            setTimeout(function () {
                $('.page-wrapper').removeClass('scene__element--fadein')
            },100);

            headerReset();
            // handleFullPage();
            handlePageMenu();
            handlePageMenuLink();
            menuClosing();
            handleScroll();
            printTime();
            setInterval(printTime, 1000);
        }
    };

    content = $('#main__scene').smoothState(options).data('smoothState');

    handlePageMenu();
    printTime();
    handleFullPage();
    handlePageMenuLink();
    menuClosing();
    handleModal();
    handleModalSuccess();
    handleScroll();
    submitMailForm();
    membershipFormSubmit();
    stockSliderInit();

    $(window).resize(function () {
        headerReset();
        handleFullPage();
    });

    $(window).on('scroll', function (e) {

    });

    $(window).on('orientationchange', function () {
        headerReset();
    });

});

$(window).on('load', function () {
    $('.page-wrapper').removeClass('scene__element--fadein')
});
