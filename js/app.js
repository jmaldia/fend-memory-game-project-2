// jQuery Variables
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
    'img/08-car-sml.png',
    'img/01-car-sml.png',
    'img/02-car-sml.png',
    'img/03-car-sml.png',
    'img/04-car-sml.png',
    'img/05-car-sml.png',
    'img/06-car-sml.png',
    'img/07-car-sml.png',
    'img/08-car-sml.png'
];
let moveCounter = 0;
let count = 0;

// Randomize imagePaths array
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let newImagePaths = shuffle(imagePaths);

// Build board on page load
$(document).ready(function() {
    for (let index = 0; index < newImagePaths.length; index++) {
        let boxHTML = `
            <div class="box">
            <div class="inner-box">
                <div class="card front">
                    <i class="far fa-gem"></i>
                </div>
                <div class="card back" data-image-index="${index}">
                    <img src="${imagePaths[index]}">
                </div>
            </div>
            </div>
        `;

        board.append(boxHTML);
    }
});

// Flip Card on click
board.on('click', '.box', function(e) {
    e.preventDefault;
    $(this).find('.inner-box').toggleClass('flip');
    // $(this).find('.back').addClass('grow').delay(3000).removeClass('grow');
    counter();
}); 


// Counts total moves and moves per turn
function counter() {
    if (count === 0) {
        count += 1;
    } else {
        count += 1;
        // isMatched();
        count = 0;
        moveCounter += 1;
    }
    console.log(`${count} & ${moveCounter}`);
}

