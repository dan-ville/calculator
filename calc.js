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
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  
  // this is for choosing the operation symbols
  chooseOperation(operation) {
    // If the user hasn't inserted any numbers, the operation buttons should not trigger anything. This checks for that situation.
    if (this.currentOperand === "") return;

    // This allows for computations consecutively without the user always needing to hit the equals button. Computations will automatically occur if the user performs multiple operations, and the result will be set to the previousOperand and will be displayed.
    if (this.previousOperand !== '') {
        this.compute();
    }

    // In all other cases, create update these properties
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

    // check if they are both valid integers
    if (isNaN(prev) || isNaN(current)) return;

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

  // This is a helper function that can will take in the numbers to be used in the display and show them properly formatted with comma separation
  formatNumber (number) {
    // turn it into a string so it can be split and formatted with toLocaleString
    const stringNumber = number.toString()
    // the number must be split into two pieces; integer values (before the period) and decimal values (after the period)  
    // integers can be turned back into a number
    const integers = parseFloat(stringNumber.split('.')[0]);
    // decimals can stay as a string because decimal places do not needed comma separated formatting
    const decimals = stringNumber.split('.')[1];
    
    // create a variable to hold the transformation of the integers variable
    let integerDisplay
    // if integers is not a number, it's likely because the user wanted to start with a decimal, in which case we want to display an empty string for the integer part
    if (isNaN(integers)) {
        integerDisplay = ''
    } else {
        // in all other cases, format the integer with commas
        integerDisplay = integers.toLocaleString("en", {
          maximumFractionDigits: 0,
        }); 
    }
    // if the decimal places exist, let integerDisplay be concatenated with it and return the string
    if (decimals != null) {
        return `${integerDisplay}.${decimals}`
    } else {
        // otherwise, the user didn't want any decimals in the number, so we only need to display integers
        return integerDisplay
    }
  }

  
  
  updateDisplay() {
    // set the inner text of the html element to the value of the currentOperand property to reflect the number the user wants
    this.currentOperandTextElement.innerText = this.formatNumber(this.currentOperand);

    // check if an operation button has been pressed
    if (this.operation != null) {
      // the previous operand display will show a concatenation of previousOperand and the operation symbol
      this.previousOperandTextElement.innerText = `${this.formatNumber(this.previousOperand)} ${this.operation}`;
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
