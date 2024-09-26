//prompt package to get the user input.
const prompt = require('prompt');

prompt.start();

prompt.get(['userSelection'], function (err, result) {
    if (err) {
        console.log(err);
        return;
    }

    let userSelection = result.userSelection.toUpperCase();

    // To make sure that the input is correct.
    const validChoices = ['ROCK', 'PAPER', 'SCISSORS'];
    if (!validChoices.includes(userSelection)) {
        console.log("Invalid choice. Please select ROCK, PAPER, or SCISSORS.");
        return;
    }

    // Math.random() function to generate a number as computerSelection
    let computerSelection;
    let randomNum = Math.random();

    if (randomNum < 0.34) {
        computerSelection = 'PAPER';
    } else if (randomNum < 0.67) {
        computerSelection = 'SCISSORS';
    } else {
        computerSelection = 'ROCK';
    }

    console.log(`User Selection: ${userSelection}`);
    console.log(`Computer Selection: ${computerSelection}`);

    // Decision structures to decide the winner
    if (userSelection === computerSelection) {
        console.log("It's a tie");
    } else if ((userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
               (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
               (userSelection === 'SCISSORS' && computerSelection === 'PAPER')) {
        console.log("User Wins");
    } else {
        console.log("Computer Wins");
    }
});
