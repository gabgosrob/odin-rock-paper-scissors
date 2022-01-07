"use strict";

const CHOICES = ["rock", "paper", "scissors"];
const buttons = Array.from(document.querySelectorAll("button"));
const playerScoreField = document.getElementById("player");
const computerScoreField = document.getElementById("computer");
const resultField = document.getElementById("result");
let playerScore = 0;
let computerScore = 0;
let numberOfGames = 5;

buttons.forEach(button => {
    button.addEventListener("click", play)
});

function play(e) {
    const playerSelection = e.target.id;
    if (playerScore < 3 && computerScore < 3) {
        playRound(playerSelection)
    }
}

function playRound(playerSelection) {
    const computerSelection = computerPlay();
    const result = getRoundResult(playerSelection, computerSelection);
    const resultMessage = createResultMessage(
        result,
        playerSelection,
        computerSelection
    );
    updateScores(result);

    resultField.textContent = resultMessage;
    playerScoreField.textContent = playerScore;
    computerScoreField.textContent = computerScore;
}

function computerPlay() {
    const randomSelection = Math.floor(Math.random() * 3);

    return CHOICES[randomSelection];
}

function getRoundResult(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        return "draw";
    }

    let result;
    switch (playerSelection) {
        case "rock":
            switch (computerSelection) {
                case "paper":
                    result = "loss";
                    break;
                case "scissors":
                    result = "win";
                    break;
            }
            break;
        case "paper":
            switch (computerSelection) {
                case "rock":
                    result = "win";
                    break;
                case "scissors":
                    result = "loss";
                    break;
            }
            break;
        case "scissors":
            switch (computerSelection) {
                case "rock":
                    result = "loss";
                    break;
                case "paper":
                    result = "win";
                    break;
            }
            break;
    }

    return result;
}

function createResultMessage(result, playerSelection, computerSelection) {
    let message;

    switch (result) {
        case "win":
            message = `You win! ${capitalize(playerSelection)} beats ${computerSelection}!`;
            break;
        case "loss":
            message = `You lose! ${capitalize(computerSelection)} beats ${playerSelection}!`;
            break;
        case "draw":
            message = `You both chose ${playerSelection}, it's a draw!`;
            break;
    }

    return message;
}

function updateScores(result) {
    if (result == "win") {
        playerScore++;
    }
    else if (result == "loss") {
        computerScore++;
    }
}

function capitalize(text) {
    text = text.toLowerCase();
    const firstLetter = text.charAt(0);

    return text.replace(firstLetter, firstLetter.toUpperCase());
}
