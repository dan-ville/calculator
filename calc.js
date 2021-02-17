class Calculator {
  // Instantiates the calculator
  // It gets passed the previous and current operand html elements so that the class methods can function on them
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    // creates the previousOperand, currentOperand, and operation properties that will be manipulated by calculator functionality
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    // create the computation variable that will equal currentOperand to show the result of any given operation
    let computation;
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        break;
    }

    this.previousOperand = ''
    this.currentOperand = computation;
    this.operation = undefined
  }

  appendNumber(number) {
    // set currentOperand to the number that was pressed (see numberButtons event listener) and turn it into a string so that it may be concatenated
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// Select all the buttons
const numberButtons = document.querySelectorAll("[data-number]");

const operationButtons = document.querySelectorAll("[data-operation]");

const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);

const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const deleteButton = document.querySelector("[data-delete]");

const equalsButton = document.querySelector("[data-equal]");

const allClearButton = document.querySelector("[data-all-clear]");

// Instantiate the calculator
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// EVENT LISTENERS

// ------------------------
// appendNumber() event listeners
// When a number button is clicked, it will be displayed on the output div
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    console.log(calculator.currentOperand);
  });
});

// this adds the same functionality to the keyboard
window.addEventListener("keydown", (event) => {
  console.log(event);
  for (let button of numberButtons) {
    if (event.key === button.innerText) {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    }
  }
});

// -----------------------
// Handling operation buttons
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.innerText);
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

window.addEventListener("keydown", (event) => {
  for (let button of operationButtons) {
    if (event.key === button.innerText) {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    }
  }
});

// -----------------------
// Delete() event listeners
// Clicking delete button
deleteButton.addEventListener("click", () => {
  // a digit is removed
  calculator.delete();
  // the display reflects the changes
  calculator.updateDisplay();
});

// Key presses
window.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    calculator.delete();
    calculator.updateDisplay();
  }
});

// -----------------------
// Clear() event listeners
// gets run on page load (called in the constructor)
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();

  console.log(`Calculator was cleared`);
});

// -----------------------
// Compute() event listeners
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    calculator.compute();
    calculator.updateDisplay();
  }
});
