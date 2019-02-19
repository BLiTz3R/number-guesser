// UI elements
(function () { 
    const game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');

    // Game values
    let min = 1,
        max = 20,
        winningNum = getRandomNum(min, max),
        attemptsLeft = 3;

    // Assign UI min and max
    minNum.textContent = min;
    maxNum.textContent = max;

    // Play again event listener
    game.addEventListener('mousedown', function(e) {
        if (e.target.className === 'play-again') {
            window.location.reload();
        }
    });

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
                attemptsLeft -= 1;

                if (attemptsLeft === 0) {
                    // Game over
                    gameOver(false, `GAME OVER! The correct number was ${winningNum}.`);
                } else {
                    // Game continues - answer wrong

                    // Change border color
                    guessInput.style.borderColor = 'red';
                    // Clear input
                    guessInput.value = '';
                    if (guess > winningNum) {
                        // Set message - lower number
                        setMessage(`${guess} is wrong, the correct number is LOWER. ${attemptsLeft} attempts left.`);
                    } else {
                        // Set message - higher number
                        setMessage(`${guess} is wrong, the correct number is HIGHER. ${attemptsLeft} attempts left.`);
                    }
                }

            }
            
        } else {
            setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
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

        // Play again
        guessBtn.value = 'Play Again';
        guessBtn.className += 'play-again';

    }

    // Get random winning number
    function getRandomNum(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    // Set message
    function setMessage(msg, color) {
        message.style.color = color;
        message.textContent = msg;
    }
})();