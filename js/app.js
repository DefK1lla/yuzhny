document.addEventListener('DOMContentLoaded', () => {
    // Map
    function init() {
        let place = [59.839556063290566, 30.29920068650814];
        let map = new ymaps.Map('map', {
            center: place,
            zoom: 17,
        });

        let placeMark = new ymaps.Placemark(place, {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/icons/placemark.svg',
            iconImageSize: [37, 52],
            iconImageOffset: [-20, -50],
        });

        map.geoObjects.add(placeMark)

        map.controls.remove('geolocationControl'); // удаляем геолокацию
        map.controls.remove('searchControl'); // удаляем поиск
        map.controls.remove('trafficControl'); // удаляем контроль трафика
        map.controls.remove('typeSelector'); // удаляем тип
        map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        // map.controls.remove('zoomControl'); // удаляем контрол зуммирования  
        map.controls.remove('rulerControl'); // удаляем контрол правил
        map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    }

    ymaps.ready(init);


    // AOS animation
    AOS.init({
        // Global settings:
        disable: 'phone', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 100, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 450, // values from 0 to 3000, with step 50ms
        easing: 'linear', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });


    // Menu
    let menuBtn = document.querySelector('.header__menu-btn'),
        menu = document.querySelector('.menu__list'),
        menuLine = document.querySelector('.header__menu-line');

    menuBtn.addEventListener('click', function () {
        menuLine.classList.toggle('active');
        menu.classList.toggle('active');
    });


    // Popup
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';  // Получаем размер скроллбара
    let lockPaddings = document.querySelectorAll('.lock-padding');   // Элементы с position: fixed

    let popups = document.querySelectorAll('.popup'),
        popupLinks = document.querySelectorAll('.popup-link'),
        curentPopup,
        body = document.querySelector('body');

    popupLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            if (curentPopup) {
                curentPopup.classList.remove('open');
            }

            curentPopup = document.querySelector(this.getAttribute('href'));
            curentPopup.classList.add('open');
            body.classList.add('scroll-lock');  // Отключаем скролл

            // Убираем дёргание при открытии попапа
            body.style.paddingRight = lockPaddingValue;
            lockPaddings.forEach(function (elem) {
                elem.style.paddingRight = lockPaddingValue;
            });
        });
    });


    let popupClose = document.querySelectorAll('.popup-close');

    popupClose.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content') || e.target.closest('.popup__close')) {
                popups.forEach(function (item) {
                    item.classList.remove('open');
                });

                setTimeout(() => {
                    body.classList.remove('scroll-lock');

                    // Убираем дёргание при закрытии попапа
                    body.style.paddingRight = '0px';
                    lockPaddings.forEach(function (elem) {
                        elem.style.paddingRight = '0px';
                    });
                }, 400);
            }
        });
    });


    // Date/time fields
    let dateAndTime = document.querySelectorAll(".date-time");

    dateAndTime.forEach(function (item) {
        item.addEventListener("input", function () {
            this.classList.add('has-value');
        });
    });


    // Tree
    const treeItems = document.querySelectorAll('.tree-item');

    treeItems.forEach(function (item) {
        item.addEventListener("click", function () {
            item.classList.toggle('active');
        });
    });
});

