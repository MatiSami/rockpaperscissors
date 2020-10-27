import { aiChoice, userMove } from "./functions.js"

window.addEventListener('DOMContentLoaded', (event) => {

    let select = document.getElementsByClassName("select")
    var userChoice = null;
    let compChoice = aiChoice()

    Array.from(select).forEach(element => {
        element.addEventListener("click", function () {
            userChoice = this.getAttribute("data-choice")
        })
    });

    console.log(userChoice);
    console.log(compChoice);
});