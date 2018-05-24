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
let openedCardsArray = [];
// let cardOne = '';
// let cardTwo = '';
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
}

$(document).ready(buildBoard());

redo.on('click', function(){
    buildBoard();
    clearInterval(gameTimer);
    sec = 0;
});

// Flip Card on click
board.on('click', '.box', function(e) {
    e.preventDefault;
    $(this).find('.inner-box').toggleClass('flip').delay(2000);

    counter();

    if (count === 1) {
        openedCardsArray.push($(this).find('.back img').prop('src'));
        $(this).prop("disabled", true);
    } else {
        openedCardsArray.push($(this).find('.back img').prop('src'));
        $(this).prop("disabled", true);

        isMatched();

        if (imagePaths.length === openedCardsArray.length) {
            console.log('game over');
        }
    }
}); 

// Counts total moves and moves per turn
function counter() {
    if (count === 0) {
        count += 1;
    } else {
        count += 1;
        count = 0;
        moveCounter += 1;
        (moveCounter === 1) ? moves.html(moveCounter + " Move") : moves.html(moveCounter + " Moves");
        starRating();
    }
    if (moveCounter === 0) { gameTimer(); }
}

// Check if Matched
function isMatched() {
    if (openedCardsArray[openedCardsArray.length-1] === openedCardsArray[openedCardsArray.length-2]) {
        return true;
    } else {
        setTimeout(function() {
            findDiv();
            openedCardsArray.splice(openedCardsArray.length-2, 2);
            return false;
        }, 1000);
    }
}

function findDiv() {
    $('.container').children().each(function() {
        let image = $(this).find('.back img').attr('src');
        if ((openedCardsArray[openedCardsArray.length-2].indexOf(image) > -1 && $(this).find('.inner-box').hasClass('flip')) || (openedCardsArray[openedCardsArray.length-1].indexOf(image) > -1) && $(this).find('.inner-box').hasClass('flip')) {
            $(this).prop('disabled', false);
            $(this).find('.inner-box').toggleClass('flip');
        }
    });  
}

// Star rating  - not yet working
function starRating() {
    if (moveCounter === 13 || moveCounter === 17|| moveCounter === 21 ||moveCounter === 25) {
        stars.find('.fa-star:last').remove();
    }
}

// Game Timer
function gameTimer() {
    let time = setInterval(function(){
        timer.html(('0' + Math.floor(sec/60)).slice(-2) + ':' + ('0' + (sec % 60)).slice(-2) );
        sec++;
    }, 1000);
}

function stopTimer() {
    clearInterval(time);
}