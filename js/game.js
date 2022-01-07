"use strict";

const choiceButtons = Array.from(document.querySelectorAll("button:not(#reset)"));
const resetButton = document.querySelector("#reset")
const body = document.querySelector("body");
const playerScoreField = document.querySelector("#player");
const computerScoreField = document.querySelector("#computer");
const roundResultField = document.querySelector("#round");
const gameResultField = document.querySelector("#game");

const CHOICES = ["rock", "paper", "scissors"];
const SCORE_TO_WIN = 5;
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

choiceButtons.forEach(button => {
    button.addEventListener("click", play);
});
resetButton.addEventListener("click", reset);

function play(e) {
    const playerSelection = e.target.id;
    if (!gameOver) {
        playRound(playerSelection)
    }
}

function reset(e) {
    gameOver = false;
    playerScore = 0;
    computerScore = 0;
    
    playerScoreField.textContent = playerScore;
    computerScoreField.textContent = computerScore;
    roundResultField.textContent = "No result to show.";
    gameResultField.textContent = "Game in progress.";
}

function playRound(playerSelection) {
    const computerSelection = computerPlay();
    const result = getRoundResult(playerSelection, computerSelection);

    updateScores(result);
    updateRoundResult(result, playerSelection, computerSelection);

    if (playerScore == SCORE_TO_WIN || computerScore == SCORE_TO_WIN) {
        gameOver = true;
        updateGameResult(result);
    }

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

function updateScores(result) {
    if (result == "win") {
        playerScore++;
    }
    else if (result == "loss") {
        computerScore++;
    }

    updateScoreFields();
}

function updateScoreFields() {
    playerScoreField.textContent = playerScore;
    computerScoreField.textContent = computerScore;
}

function updateRoundResult(result, playerSelection, computerSelection) {
    const resultMessage = createRoundResultMessage(
        result,
        playerSelection,
        computerSelection
    );

    roundResultField.textContent = resultMessage;
}

function createRoundResultMessage(result, playerSelection, computerSelection) {
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

function updateGameResult(result) {
    const winnerText = createGameResultMessage(result);
    gameResultField.textContent = winnerText;
}

function createGameResultMessage(result) {
    let winnerText;
    if (result == "win"){
        winnerText = "You won! Congratulations!"
    }
    else {
        winnerText = "You lost! Better luck next time!"
    }

    return winnerText;
}

function capitalize(text) {
    text = text.toLowerCase();
    const firstLetter = text.charAt(0);

    return text.replace(firstLetter, firstLetter.toUpperCase());
}
