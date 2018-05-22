// jQuery Variables
const box = $('.box');
const board = $('.container');
const moves = $('#moves');
const stars = $('.left-options');
const timer = $('#timer');
const redo = $('#redo');

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
let cardOne = '';
let cardTwo = '';
let sec = 0;

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

// Build board
function buildBoard() {
    board.empty();
    for (let index = 0; index < newImagePaths.length; index++) {
        let boxHTML = `
            <div class="box clicked">
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
}

$(document).ready(buildBoard());

redo.on('click', function(){
    buildBoard();
    clearInterval(gameTimer);
    sec = 0;
});

// Flip Card on click
board.on('click', '.clicked', function(e) {
    e.preventDefault;
    $(this).find('.inner-box').toggleClass('flip');

    counter();

    // NOTES: 
    // I'm trying to check if flipped cards are matching
    // I want to disable cards if they are matched
    console.log(count);
    if (count === 1) {
        cardOne = $(this).find('.back img').prop('src');
    } else {
        cardTwo = $(this).find('.back img').prop('src');
        // console.log($(this));
        if (isMatched()){
            console.log(isMatched());
            box.toggleClass('clicked');
        }
    }
}); 

// Counts total moves and moves per turn
function counter() {
    if (count === 0) {
        count += 1;
    } else {
        count += 1;
        isMatched();
        count = 0;
        moveCounter += 1;
        (moveCounter === 1) ? moves.html(moveCounter + " Move") : moves.html(moveCounter + " Moves");
        starRating();
    }
    if (moveCounter === 0) { gameTimer(); }
}

// Check if Matched
function isMatched() {
    if (cardOne === cardTwo) {
        return true;
    } else {
        return false;
    }
}

// Star rating  - not yet working
function starRating() {
    if (moveCounter === 13 || moveCounter === 17|| moveCounter === 21 ||moveCounter === 25) {
        stars.find('.fa-star:last').remove();
    }
}

// Game Timer
function gameTimer() {
    setInterval(function(){
        timer.html(('0' + Math.floor(sec/60)).slice(-2) + ':' + ('0' + (sec % 60)).slice(-2) );
        sec++;
    }, 1000);
}

