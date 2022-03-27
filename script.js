//DOM variables
let screen = document.querySelector("#screen");
let screenContent = screen.querySelector("span");

//Sets up the calculator buttons
let allButtons = document.querySelectorAll(".calc-btn");
allButtons.forEach((button) => {
  switch (button.textContent) {
    case "=":
      //put stuff here later
      break;
    case "CLEAR":
      button.addEventListener("click", () => {
        screenContent.textContent = "";
      });
      break;
    case "DELETE":
      button.addEventListener("click", () => {
        screenContent.textContent = screenContent.textContent.slice(0, -1);
      });

      break;
    default:
      button.addEventListener("click", () => {
        console.log(button.textContent);
        if (screenContent.textContent == "0")
          screenContent.textContent = button.textContent;
        else screenContent.textContent += button.textContent;
      });
  }
});

//Operator functions
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function modulo(num1, num2) {
  return num1 % num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
      break;
    case "-":
      return subtract(num1, num2);
      break;
    case "*":
      return multiply(num1, num2);
      break;
    case "/":
      return divide(num1, num2);
      break;
    case "%":
      return modulo(num1, num2);
      break;
  }
}
