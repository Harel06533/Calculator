"use strict";

//DOM
const numbers = document.querySelectorAll(".numbers");
const funcOperators = document.querySelectorAll(".calc-operators");
const operations = document.querySelectorAll(".operations");
const displayNumber = document.querySelector("span");
const equalsButton = document.getElementById("equals");
const resetButton = document.getElementById("ac-button");
const signedButton = document.getElementById("negpos-button");
const percentButton = document.getElementById("percent-button");

//Variables
let currentValue = "";
let lastValue = "";
let operationId = "";
let isFirstNumber = true;

//Functions & Objects
const addition = (a, b) => a + b;
const times = (a, b) => a * b;
const division = (a, b) => a / b;
const minus = (a, b) => a - b;

const arithmetics = {
  "div-button": division,
  "times-button": times,
  "plus-button": addition,
  "minus-button": minus,
};

const initialSettings = function () {
  currentValue = "";
  lastValue = "";
  isFirstNumber = true;
  displayNumber.textContent = 0;
};

//Events
initialSettings();

/*
 * Number Events:
 * 1. Evaluates the text content as a number for easier manipulation
 * 2. Checks if the value of firstNumber is true (avoiding 0 as first number)
 * 3. If true, then evaluates that the first number is not 0, only then it changes its value and can concat the numbers
 * 4. If not true then the string value will concat with the next value
 * 5. Display will show all this process
 */
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function () {
    let currNumber = Number(numbers[i].textContent);
    if (isFirstNumber) {
      currNumber !== 0 ? (isFirstNumber = false) : (isFirstNumber = true);
      currentValue = numbers[i].textContent;
    } else {
      currentValue += numbers[i].textContent;
    }
    displayNumber.textContent = currentValue;
  });
}

/*
 * Operation Events:
 * 1. Stores the current value to another variable for later use
 * 2. Resets current value to an empty string for new data
 * 3. Resets first number bool so it can't be 0 again
 * 4. Stores the id of the operation for locating which value should return
 */
for (let i = 0; i < operations.length; i++) {
  operations[i].addEventListener("click", function () {
    lastValue = currentValue;
    currentValue = "";
    isFirstNumber = true;
    operationId = operations[i].id;
  });
}

/**
 * 1. Sets the current value to an arithmetic operation performed after the selected operation
 * 2. Last value is returned to empty string
 * 3. Displays the number
 */
equalsButton.addEventListener("click", function () {
  currentValue = arithmetics[operationId](
    Number(lastValue),
    Number(currentValue)
  );
  lastValue = "";
  displayNumber.textContent = currentValue;
});

/**
 * Other small events:
 * 1. AC -> resets everyting to its initial value
 * 2. Sign -> makes current value negative or positive
 * 3. Percent -> makes current value a percentage value over 100
 */

resetButton.addEventListener("click", function () {
  initialSettings();
});

signedButton.addEventListener("click", function () {
  currentValue = Number(currentValue) * -1;
  displayNumber.textContent = currentValue;
});

percentButton.addEventListener("click", function () {
  currentValue = Number(currentValue) / 100;
  displayNumber.textContent = currentValue;
});
