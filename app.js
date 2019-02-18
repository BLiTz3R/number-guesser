/* 
GAME FUNCTION:
- Player must guess a number between a mind and a max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if he loses
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate input
    if (guess >= min && guess <= max) {

        // Check if won
        if (guess === winningNum) {
            gameOver(true, `${winningNum} is correct, YOU WIN!`);
        } else {
            // Wrong number
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                // Game over
                gameOver(false, `GAME OVER! The correct number was ${winningNum}`);
            } else {
                // Game continues - answer wrong

                // Change border color
                guessInput.style.borderColor = 'red';
                // Clear input
                guessInput.value = '';
                // Set message - wrong number
                setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`);
            }

        }
        
    } else {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
})

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Change border and text color
    guessInput.style.borderColor = color;
    message.style.color = color;
    // Set message
    setMessage(msg);

}


// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}