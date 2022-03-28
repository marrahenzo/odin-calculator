//DOM variables
const screen = document.querySelector("#screen");
const screenTop = screen.querySelector("#top-value");
const screenBottom = screen.querySelector("#bottom-value");
screenBottom.textContent = 0;

//Calculation variables
let currentValue = 0;
let operator = "";

//Sets up the calculator buttons
const allButtons = document.querySelectorAll(".calc-btn");
allButtons.forEach((button) => {
  switch (button.id) {
    case "btn-clear":
      button.addEventListener("click", () => {
        screenBottom.textContent = 0;
        screenTop.textContent = "";
        currentValue = 0;
      });
      break;
    case "btn-delete":
      button.addEventListener("click", () => {
        screenBottom.textContent = screenBottom.textContent.slice(0, -1);
      });
      break;
    case "btn-equals":
      button.addEventListener("click", () => {
        callOperation();
      });
      break;
    case "btn-sum":
      button.addEventListener("click", () => {
        if (screenTop.textContent != 0 && screenBottom.textContent != 0) {
          callOperation();
        }
        operator = "+";
        screenTop.textContent = screenBottom.textContent;
        screenBottom.textContent = 0;
      });
      break;
    case "btn-subtract":
      if (screenTop.textContent != 0 && screenBottom.textContent != 0) {
        callOperation();
      }
      button.addEventListener("click", () => {
        operator = "-";
        screenTop.textContent = screenBottom.textContent;
        screenBottom.textContent = 0;
      });
      break;
    case "btn-multiply":
      if (screenTop.textContent != 0 && screenBottom.textContent != 0) {
        callOperation();
      }
      button.addEventListener("click", () => {
        operator = "*";
        screenTop.textContent = screenBottom.textContent;
        screenBottom.textContent = 0;
      });
      break;
    case "btn-divide":
      button.addEventListener("click", () => {
        operator = "/";
        screenTop.textContent = screenBottom.textContent;
        screenBottom.textContent = 0;
      });
      break;
    default:
      switch (button.textContent) {
      }
      button.addEventListener("click", () => {
        console.log(button.textContent);
        if (screenBottom.textContent == "0")
          screenBottom.textContent = button.textContent;
        else if (screenBottom.textContent.length < 18)
          screenBottom.textContent += button.textContent;
      });
  }
});

//Operator functions
function add(num1, num2) {
  return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
  return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
  return Number(num1) * Number(num2);
}

function divide(num1, num2) {
  return Number(num1) / Number(num2);
}

function modulo(num1, num2) {
  return Number(num1) % Number(num2);
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

function callOperation() {
  screenTop.textContent = operate(
    operator,
    screenTop.textContent,
    screenBottom.textContent
  );
  screenBottom.textContent = screenTop.textContent;
  operator = "";
}
