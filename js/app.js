const box = $('.box');
const board = $('.container');
let imagePaths = [
    'img/01-car-sml.png',
    'img/02-car-sml.png',
    'img/03-car-sml.png',
    'img/04-car-sml.png',
    'img/05-car-sml.png',
    'img/06-car-sml.png',
    'img/07-car-sml.png',
    'img/08-car-sml.png'
];

$(document).ready(function() {
    for (let image = 0; image < imagePaths.length; image++) {
        let boxHTML = `
            <div class="box">
            <div class="inner-box">
                <div class="card front">
                    <i class="far fa-gem"></i>
                </div>
                <div class="card back">
                    <img src="${imagePaths[image]}">
                </div>
            </div>
            </div>
        `
        board.append(boxHTML);
        board.append(boxHTML);

        console.log(boxHTML);
    }
});

// Flip Card on click
board.on('click', '.box', function(e) {
    e.preventDefault;
    $(this).find('.inner-box').toggleClass('flip');
    // $(this).find('.back').addClass('grow').delay(3000).removeClass('grow');
}); 
