// Активный класс у меню и плавная прокрутка для ХЕДЕРА
'use strict';
const headerHeight = document.querySelector('.header').offsetHeight;

function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - headerHeight + 80;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

class NavigationMenu {
    constructor(root) {
        this.root = root;
        this.links = null;
        this.cacheNodes();
        this.bindEvents();
    }

    cacheNodes() {
        this.links = this.root.querySelectorAll('.js-page-scroll');
    }

    bindEvents() {
        document.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('js-page-scroll')) {
                event.preventDefault();
                const id = target.hash;

                smoothScroll(id, 1000);
            }
        });

        window.addEventListener("scroll", event => {
            let fromTop = window.scrollY + headerHeight;

            this.links.forEach(link => {
                let section = document.querySelector(link.hash);

                if (
                    section.offsetTop <= fromTop &&
                    section.offsetTop + section.offsetHeight > fromTop
                ) {
                    link.classList.add("menu__link_active");
                } else {
                    link.classList.remove("menu__link_active");
                }
            });
        });
    }
}

const menuNode = document.querySelector('.js-nav-menu');
const Menu = new NavigationMenu(menuNode);
//Плавная прокрутка и подсветка активного пункта меню
$("body").on('click', '[href*="#"]', function (e) {
    var fixed_offset = 0;
    $('html,body').stop().animate({
        scrollTop: $(this.hash).offset().top - fixed_offset
    }, 1000);
    e.preventDefault();
});
// Затемнение хедера при скролле
if (document.documentElement.clientWidth > 768) {
    window.onscroll = function showHeader() {

        var header = document.querySelector('.header');

        if (window.pageYOffset > 1) {
            header.classList.add('active')
        } else {
            header.classList.remove('active')
        }

    }
}
// Слайдер(Main)
var swiper1 = new Swiper('.main-swiper', {
    slidesPerView: 1,
    spaceBetween: 35,
    loop: true,
    navigation: {
        nextEl: '.arrow__next',
        prevEl: '.arrow__prev',
    },
    effect: "fade",
    simulateTouch: false
});
// Слайдер(Staging)
var swiper1 = new Swiper('.staging-swiper', {
    slidesPerView: 2,
    breakpoints: {
        1199: {
            slidesPerView: 4,
        },
    },
    grabCursor: true,
    loop: true,
});
// Маска на поле ввода номера телефона
$("#form__phone").mask("+7(999)999-99-99");
// Меню и бургер для телефонов
$(document).ready(function () {
    $(".header__burger").click(function (e) {
        $(".header__burger, .menu").toggleClass("active");
        $("body").toggleClass('lock');
    });
    $(".menu__item").click(function (e) {
        $(".header__burger").removeClass("active");
        $(".menu").removeClass("active");
        $("body").removeClass("lock");
    });
});