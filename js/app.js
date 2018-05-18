// Flip Card on click
let box = $('.box');

box.click(function(e) {
    e.preventDefault;

    $(this).find('.inner-box').toggleClass('flip');
}); 