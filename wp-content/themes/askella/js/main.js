jQuery(document).ready(function ($) {
    $(".wp-block-cover__video-background").prop('muted', true);
    //$(".wp-block-cover__video-background")[0].play();

    //initialize metismenu
    $("#metismenu").metisMenu();

    //initialize slideout
    var slideout = new Slideout({
        'panel': document.getElementById('askella-panel'),
        'menu': document.getElementById('askella-menu'),
        'padding': settings.askella_menu_width,
        'tolerance': 70
    });

    //for closing menu on page click
    function close(eve) {
        eve.preventDefault();
        slideout.close();
    }

    //make the hamburger animation correct when using touch events and add classes based on context
    slideout
        .on('beforeopen', function () {
            this.panel.classList.add('panel-open');
            $(".hamburger").toggleClass("is-active");
            $(".header-hamburger").toggleClass("fixed-open");
        })
        .on('open', function () {
            this.panel.addEventListener('click', close);
        })
        .on('beforeclose', function () {
            this.panel.classList.remove('panel-open');
            this.panel.removeEventListener('click', close);
            $(".hamburger").removeClass("is-active");
            $(".header-hamburger").removeClass("fixed-open");
        });

    //Toggle button
    $('.toggle-button').on('click', function () {
        slideout.toggle();
    });

    // if Desktop-mode is used, and the menu is
    // opened on small screen and then the window is resized over 1000px
    // the margin gets added to the panel IN ADDITION to the menu already opened
    // resulting in 640px margin-left to the panel.

    $(window).on('resize', (function () {
        if ($('#askella-panel').hasClass('panel-open')) slideout.close();
    }));
});