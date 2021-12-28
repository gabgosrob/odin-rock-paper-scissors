"use strict";

function game() {
    console.log("Let's play 5 rounds!")
    for (let i = 0; i < 5; i++) {
        let computerSelection = computerPlay();
        let playerSelection;
        while (!["Rock", "Paper", "Scissors"].includes(playerSelection)) {
            playerSelection = capitalize(prompt("Enter your choice: "));
        }

        let result = playRound(playerSelection, computerSelection);
        let resultMessage = createResultMessage(result, playerSelection, computerSelection);

        console.log(resultMessage);
    }
}

function computerPlay() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomSelection = Math.floor(Math.random() * 3);

    return choices[randomSelection];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        return "draw";
    }

    let result;
    switch (playerSelection) {
        case "Rock":
            switch (computerSelection) {
                case "Paper":
                    result = "loss";
                    break;
                case "Scissors":
                    result = "win";
                    break;
            }
            break;
        case "Paper":
            switch (computerSelection) {
                case "Rock":
                    result = "win";
                    break;
                case "Scissors":
                    result = "loss";
                    break;
            }
            break;
        case "Scissors":
            switch (computerSelection) {
                case "Rock":
                    result = "loss";
                    break;
                case "Paper":
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
            message = `You win! ${playerSelection} beats ${computerSelection}!`;
            break;
        case "loss":
            message = `You lose! ${computerSelection} beats ${playerSelection}!`;
            break;
        case "draw":
            message = `Draw!`;
            break;
    }

    return message;
}

function capitalize(text) {
    text = text.toLowerCase();
    let firstLetter = text.charAt(0);

    return text.replace(firstLetter, firstLetter.toUpperCase());
}
