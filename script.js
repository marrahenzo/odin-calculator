//DOM variables
const screen = document.querySelector("#screen-value");
screen.textContent = 0;
const buttonPoint = document.querySelector("#btn-point");
const divByZeroMessage = "Somebody didn't go to math class...";
const MAX_CHARS_ON_SCREEN = 18;

//Calculation variables
let previousNum = "";
let operator = "";
let justOperated = false;

//Sets up the calculator buttons
const allButtons = document.querySelectorAll(".calc-btn");
allButtons.forEach((button) => {
  switch (button.id) {
    case "btn-clear":
      button.addEventListener("click", () => {
        screen.textContent = 0;
        previousNum = "";
        operator = "";
      });
      break;
    case "btn-delete":
      button.addEventListener("click", () => {
        if (screen.textContent != 0)
          screen.textContent = removeNum(screen.textContent);
        if (screen.textContent == "") screen.textContent = 0;
      });
      break;
    case "btn-equals":
      button.addEventListener("click", () => {
        if (operator != "") {
          screen.textContent = operate(
            operator,
            previousNum,
            screen.textContent
          );
          justOperated = true;
          previousNum = "";
          operator = "";
          trimScreen();
        }
      });
      break;
    case "btn-sum":
    case "btn-subtract":
    case "btn-multiply":
    case "btn-divide":
    case "btn-modulo":
      button.addEventListener("click", () => {
        buttonPoint.disabled = false;
        turnMinusToZero();
        trimScreen();

        if (operator == "") {
          previousNum = screen.textContent;
          operator = convertOperator(button.textContent);
          screen.textContent = 0;
        } else {
          screen.textContent = operate(
            operator,
            previousNum,
            screen.textContent
          );
          justOperated = true;
          previousNum = screen.textContent;
          operator = convertOperator(button.textContent);
        }
      });
      break;
    case "btn-point":
      button.addEventListener("click", () => {
        if (
          !buttonPoint.disabled &&
          screen.textContent.length < MAX_CHARS_ON_SCREEN - 1
        ) {
          screen.textContent += button.textContent;
        }
        buttonPoint.disabled = true;
      });
      break;
    default:
      button.addEventListener("click", () => {
        if (screen.textContent == "0") screen.textContent = button.textContent;
        else if (screen.textContent.length < MAX_CHARS_ON_SCREEN) {
          if (justOperated) {
            screen.textContent = button.textContent;
            justOperated = false;
          } else screen.textContent += button.textContent;
        }
      });
  }
});

//Alternate code for keyboard input
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "Delete":
      screen.textContent = 0;
      previousNum = "";
      operator = "";
      break;
    case "Backspace":
      if (screen.textContent != 0)
        screen.textContent = removeNum(screen.textContent);
      if (screen.textContent == "") screen.textContent = 0;
      break;
    case "Enter":
      if (operator != "") {
        screen.textContent = operate(operator, previousNum, screen.textContent);
        justOperated = true;
        previousNum = "";
        operator = "";
        trimScreen();
      }
      break;
    case "+":
    case "-":
    case "*":
    case "/":
    case "%":
      buttonPoint.disabled = false;
      turnMinusToZero();
      trimScreen();

      if (operator == "") {
        previousNum = screen.textContent;
        operator = event.key;
        screen.textContent = 0;
      } else {
        screen.textContent = operate(operator, previousNum, screen.textContent);
        justOperated = true;
        previousNum = screen.textContent;
        operator = event.key;
      }
      break;
    case ".":
      if (
        !buttonPoint.disabled &&
        screen.textContent.length < MAX_CHARS_ON_SCREEN - 1
      ) {
        screen.textContent += event.key;
      }
      buttonPoint.disabled = true;
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      if (screen.textContent == "0") screen.textContent = event.key;
      else if (screen.textContent.length < MAX_CHARS_ON_SCREEN) {
        if (justOperated) {
          screen.textContent = event.key;
          justOperated = false;
        } else screen.textContent += event.key;
      }
      break;
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
    alert("Somebody didn't go to math class...");
    return num1;
  } else return num1 / num2;
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

//Replaces minus, when left alone, by 0 to avoid errors
function turnMinusToZero() {
  if (screen.textContent == "-") {
    screen.textContent = 0;
  }
}

function removeNum(string) {
  return string.slice(0, -1);
}

function trimScreen() {
  if (screen.textContent.length > MAX_CHARS_ON_SCREEN)
    screen.textContent = screen.textContent.slice(0, MAX_CHARS_ON_SCREEN);
}

function convertOperator(operator) {
  switch (operator) {
    case "+":
      return "+";
      break;
    case "−":
      return "-";
      break;
    case "×":
      return "*";
      break;
    case "÷":
      return "/";
      break;
    case "%":
      return "%";
      break;
  }
}
