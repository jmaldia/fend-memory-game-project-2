// jQuery Variables
const box = $('.box');
const board = $('.container');
const moves = $('#moves');
const stars = $('.fa-star');
const timer = $('#timer');
const redo = $('.redo');
const gameOverModal = $('.game-over');
const exit = $('.exit');

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
let time = '';
let timePrint = '';
let sec = 0;
let starCounter = 5;
let newImagePaths = [];


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

newImagePaths = shuffle(imagePaths);

// Builds a board
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

    addClick();
    gameOverModal.addClass('hide');
    stars.show();
    stopTimer();
    sec = 0;
    timePrint = ('0' + Math.floor(sec/60)).slice(-2) + ':' + ('0' + (sec % 60)).slice(-2);
    timer.html(timePrint);
    count = 0;
    moveCounter = 0;
    moves.html(moveCounter + " Move");
}


$(document).ready(buildBoard());

// This resets the board
redo.on('click', function(){
    newImagePaths = shuffle(imagePaths);
    buildBoard();
    sec = 0;
});

// Event listener to Flip Card when the card is clicked
function addClick() {
    board.on('click', '.box', function(e) {
        e.preventDefault;
        $(this).find('.inner-box').toggleClass('flip');

        counter();

        if (count === 1) {
            openedCardsArray.push($(this).find('.back img').prop('src'));
            $(this).prop("disabled", true);
        } else {
            openedCardsArray.push($(this).find('.back img').prop('src'));
            $(this).prop("disabled", true);
            if (!isMatched()) {
                setTimeout(function() {
                    findDiv();
                    openedCardsArray.splice(openedCardsArray.length-2, 2);
                }, 700);
            }
            gameOver();
        }
    }); 
}

// Function that would turn off the event listener
// function removeClick() {
//     board.find('.box').off();
// }

// Counts total moves and moves per turn
function counter() {
    if (count === 0) {
        count += 1;
    } else {
        count += 1;
        count = 0;
        moveCounter += 1;
        (moveCounter === 1) ? moves.html(moveCounter + " Move") : moves.html(moveCounter + " Moves");
        // removeClick();
        starRating();
    }
    if (moveCounter === 0) { gameTimer(); }
}

// Checks if two open cards are matched
function isMatched() {
    if (openedCardsArray[openedCardsArray.length-1] === openedCardsArray[openedCardsArray.length-2]) {
        return true;
    } else {
        return false;
    }
}

// Enables disabled divs and flips back turn unmatched cards
// Used in conjunction with the isMatched function
function findDiv() {
    $('.container').children().each(function() {
        let image = $(this).find('.back img').attr('src');
        if ((openedCardsArray[openedCardsArray.length-2].indexOf(image) > -1 && $(this).find('.inner-box').hasClass('flip')) || (openedCardsArray[openedCardsArray.length-1].indexOf(image) > -1) && $(this).find('.inner-box').hasClass('flip')) {
            $(this).prop('disabled', false);
            $(this).find('.inner-box').toggleClass('flip');
            // removeClick();
            // setTimeout(function() {
            //     addClick();
            // }, 700);
        }
    });  
}

// Remove stars based on number of moves
function starRating() {
    if (moveCounter === 13 || moveCounter === 17|| moveCounter === 21 ||moveCounter === 25) {
        $('.fa-star:visible:last').hide();
        starCounter--;
    }
}

// Starts the timer when the user clicks the first card
function gameTimer() {
    time = setInterval(function(){
        timePrint = ('0' + Math.floor(sec/60)).slice(-2) + ':' + ('0' + (sec % 60)).slice(-2)
        timer.html(timePrint);
        sec++;
        // if (sec === 5) { 
        //     stopTimer(); 
        //     alert(sec - 2);
        // }
    }, 1000);
     
}

// Stops the Timer when the game is over
function stopTimer() {
    clearInterval(time);
}

// This function builds the modal when the game is over
function gameOver() {
    if (imagePaths.length === openedCardsArray.length) {
        stopTimer();
        gameOverModal.find('#time').html(timePrint);
        gameOverModal.find('#moves').html(moveCounter);
        for (let i = 1; i <= starCounter; i++) {
            gameOverModal.find('#stars').append('<i class="fas fa-star"></i>');
        }
        gameOverModal.removeClass('hide');
    } else if (moveCounter > 50) {
        stopTimer();
        gameOverModal.find('#time').html(timePrint);
        gameOverModal.find('#moves').html(moveCounter);
        gameOverModal.find('#message').html('You lost. Too many moves.<br>Here are your stats. ');
        for (let i = 1; i <= starCounter; i++) {
            gameOverModal.find('#stars').append('<i class="fas fa-star"></i>');
        }
        gameOverModal.removeClass('hide');
    }
}

// Listener for the exit button on the game over modal 
// if the user does not want to play again
exit.click(function() {
    gameOverModal.addClass('hide');
});