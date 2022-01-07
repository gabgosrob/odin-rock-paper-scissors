"use strict";

const CHOICES = ["rock", "paper", "scissors"];
const buttons = Array.from(document.querySelectorAll("button"));
const resultField = document.querySelector(".result")

buttons.forEach(button => {
    button.addEventListener("click", play)
});

function play(e) {
    const playerSelection = e.target.id;
    const computerSelection = computerPlay();
    const result = playRound(playerSelection, computerSelection);
    const resultMessage = createResultMessage(
        result,
        playerSelection,
        computerSelection
    );

    resultField.innerText = resultMessage;
}

function computerPlay() {
    const randomSelection = Math.floor(Math.random() * 3);

    return CHOICES[randomSelection];
}

function playRound(playerSelection, computerSelection) {
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

function capitalize(text) {
    text = text.toLowerCase();
    const firstLetter = text.charAt(0);

    return text.replace(firstLetter, firstLetter.toUpperCase());
}
