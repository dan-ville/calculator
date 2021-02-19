class Calculator {
  // Instantiates the calculator
  // It gets passed the previous and current operand html elements so that the class methods can function on them
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  // clears the calculation properties, previousOperand and currentOperand, and the operation property, and thus clears the display as well
  clear() {
    // creates the previousOperand, currentOperand, and operation properties that will be manipulated by calculator functionality
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }
  
  // this is for choosing the operation symbols
  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // handles all computations done by the calculator  
  compute() {
    // create the computation variable that will equal currentOperand to show the result of any given operation
    let computation;
    // parse the previousOperand and currentOperand and turn them into floats because they are handled as strings until the equals button is pressed
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);

    // switch statement works off the innerText value of the operation button the user pressed, then sets the value of the local computation variable depending on the current values of previousOperand and currentOperand
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

    this.previousOperand = "";
    this.currentOperand = computation;
    this.operation = undefined;
  }

  // allows the user to insert numbers in current operand
  appendNumber(number) {
    // if the user is trying to append a period and the currentOperand already includes one, returns so that they cannot add multiple periods in the number
    if (number === '.' && this.currentOperand.includes('.')) return

    // set currentOperand to the number that was pressed (see numberButtons event listener) and turn it into a string so that it may be concatenated
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // formats the number so that it will properly
  formatNumber () {
    this.currentOperand = this.currentOperand.toLocaleString('en')
  }

  updateDisplay() {
    // set the inner text of the html element to the value of the currentOperand property to reflect the number the user wants
    this.currentOperandTextElement.innerText = this.currentOperand;

    // check if an operation button has been pressed
    if (this.operation != null) {
      // the previous operand display will show a concatenation of previousOperand and the operation symbol
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      // If `this.operation` is null, it means an operation button has not been pressed. Therefore, display an empty string. This should only be the case after the user hits the equal sign. Without it, the user would hit equals and the display would show 'undefined'.
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// Select all the buttons
// numbers (1-9)
const numberButtons = document.querySelectorAll("[data-number]");
// operation symbols ( + , - , * , / )
const operationButtons = document.querySelectorAll("[data-operation]");
// display previous
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
// display current
const currentOperandTextElement = document.querySelector("[data-current-operand]");
// delete (DEL)
const deleteButton = document.querySelector("[data-delete]");
// equals (=)
const equalsButton = document.querySelector("[data-equal]");
// all clear (AC)
const allClearButton = document.querySelector("[data-all-clear]");

// INSTANTIATE THE CALCULATOR
// This won't work unless previousOperandTextElement and currentOperandTextElement are defined above, since they need to first be selected to then be passed into the constructor here
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// THE FOLLOWING SECTION SETS THE PAGE'S EVENT LISTENERS

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

// run clear() when user presses shift+backspace combination
window.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.key === "Backspace") {
    calculator.clear();
    calculator.updateDisplay();
  }
});

// -----------------------
// Compute() event listeners
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    calculator.compute();
    calculator.updateDisplay();
  }
});
