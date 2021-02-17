class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear(); //runs the clear() function when the object is constructed, ensuring we start with an empty calculator
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  clear() {
    // initializes all these values
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  // this method runs whenever an data-operation is pressed
  chooseOperation(operation) {
    // first, this line will ensure that we can't perform operations without first having entered a number
    if (this.currentOperand === "") return;
    // if the previousOperand value is not an empty string, it means the user must have picked a number and operation symbol. Therefore, we must call the compute method.
    if (this.previousOperand !== "") {
      this.compute();
    }
    // now, create the operation property for the object to use
    this.operation = operation;
    // then, set the value of previousOperand to the currentOperand
    this.previousOperand = this.currentOperand;
    // and reset the currentOperand
    this.currentOperand = "";

    // combine with updateDisplay() logic to allow new numbers to be inputted after an operation button has been pressed
  }

  compute() {
    // establish a variable to determine what computation is occuring
    let computation;
    // turn the previousOperand and currentOperand into float integers so that we can perform calculations on them instead of concatenating them
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    // check if the variables are numbers; this makes sure that the code doesn't run if either of the numbers are missing
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      // if none of the symbols match the computation, we return because that would mean there is somehow an invalid operation happening.
      default:
        return;
    }

    this.previousOperand = "";
    this.currentOperand = computation;
    this.operation = undefined;
  }

  appendNumber(number) {
    // make sure the user cannot add multiple decimals
    if (number === "." && this.currentOperand.includes(".")) return;
    // set currentOperand to a string so that it can be concatenated with new numbers (also strings) when the data-number button event listeners fire off
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  
  getDisplayNumber(number) {
    // turn the number into a string
    const stringNumber = number.toString()
    // if the number has a decimal place, we must split it into two numbers
    // turn the integer part of the number into a float value
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    // the decimal part of the number can remain as a string
    const decimalDigits = stringNumber.split('.')[1]

    // create a variable to hold what will be displayed in the integer part
    let integerDisplay
    // check that it is a number, aka a number button has been pressed
    if (isNaN(integerDigits)) {
      // if not, set it to an empty string so that we can show just the decimal part
      integerDisplay = ''
    } else {
      // otherwise, display a comma delimited value
      // the second argument ensures there can never be any decimal places after the integerDisplay value after it has been formatted with commas
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    // now handle the case where the user is making a decimal number
    if (decimalDigits != null) {
      // concatenate the integerDisplay, which is a string in either case, with a decimal and then the value of the decimalDigits 
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  
  updateDisplay() {
    // this method draws from the previous methods to show the values that they are handling
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    // when there is an operation happening, we display a concatenation of the value of previousOperand and the operation symbol that was selected
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      // this handles the clearing of the previous operand text display after the user hits the equal sign
      this.previousOperandTextElement.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')  
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equal]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  });
})

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});