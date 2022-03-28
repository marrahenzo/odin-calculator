//DOM variables
const screen = document.querySelector("#screen");
const screenTop = screen.querySelector("#top-value");
const screenBottom = screen.querySelector("#bottom-value");
screenBottom.textContent = 0;
const buttonPoint = document.querySelector("#btn-point");
const divByZeroMessage = "Someone didn't go to math class...";

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
        if (screenBottom.textContent != 0)
          screenBottom.textContent = screenBottom.textContent.slice(0, -1);
      });
      break;
    case "btn-equals":
      button.addEventListener("click", () => {
        if (
          screenTop.textContent != "" &&
          screenTop.textContent != divByZeroMessage
        ) {
          buttonPoint.disabled = false;
          updateScreen();
        } else if (screenTop.textContent == divByZeroMessage) {
          buttonPoint.disabled = false;
          screenTop.textContent = "";
        }
      });
      break;
    case "btn-sum":
      button.addEventListener("click", () => {
        callGenericOperation();
        operator = "+";
      });
      break;
    case "btn-subtract":
      button.addEventListener("click", () => {
        callGenericOperation();
        operator = "-";
      });
      break;
    case "btn-multiply":
      button.addEventListener("click", () => {
        callGenericOperation();
        operator = "*";
      });
      break;
    case "btn-divide":
      button.addEventListener("click", () => {
        callGenericOperation();
        operator = "/";
      });
      break;
    case "btn-modulo":
      button.addEventListener("click", () => {
        callGenericOperation();
        operator = "%";
      });
      break;
    case "btn-point":
      button.addEventListener("click", () => {
        if (!buttonPoint.disabled && screenBottom.textContent.length < 15)
          screenBottom.textContent += button.textContent;
        buttonPoint.disabled = true;
      });
      break;
    default:
      button.addEventListener("click", () => {
        if (screenTop.textContent == divByZeroMessage) {
          screenTop.textContent = "";
        }
        if (screenBottom.textContent == "0")
          screenBottom.textContent = button.textContent;
        else if (screenBottom.textContent.length < 15)
          screenBottom.textContent += button.textContent;
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
  if (num2 == 0) {
    screenTop.textContent = divByZeroMessage;
    result = 0;
  } else result = num1 / num2;
  return result;
}

function modulo(num1, num2) {
  return num1 % num2;
}

function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
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

//Call operate() and update the calculator screen
function updateScreen() {
  avoidNan();
  let result = operate(
    operator,
    screenTop.textContent,
    screenBottom.textContent
  );
  if (String(result).length > 15) result = String(result).slice(0, 15);
  screenBottom.textContent = result;
  if (screenTop.textContent != divByZeroMessage) {
    screenTop.textContent = "";
  }
  operator = "";
}

//Replaces minus, when left alone, by 0 to avoid errors
function avoidNan() {
  if (screenBottom.textContent == "-") {
    screenBottom.textContent = 0;
  }
  if (screenTop.textContent == "-") {
    screenTop.textContent = 0;
  }
}

//Repeated code in button event listeners
function callGenericOperation() {
  buttonPoint.disabled = false;
  if (screenTop.textContent != 0 && screenBottom.textContent != 0) {
    updateScreen();
  }
  screenTop.textContent = screenBottom.textContent;
  screenBottom.textContent = 0;
}
