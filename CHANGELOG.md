# Changelog
## Version 0.1
### Features
Calculator operations are functional.
Keyboard and mouse clicking both work to trigger the calculator buttons.

### Bugs
Bug 0.1: 
Does not format numbers correctly

Bug 0.2:  
When a user computes and then clears with Shift+Backspace, this error message occurs:

```
calc.js:19 Uncaught TypeError: this.currentOperand.slice is not a function
    at Calculator.delete (calc.js:19)
    at calc.js:169
delete @ calc.js:19
(anonymous) @ calc.js:169
```

*This does not occur when you clear by clicking the AC button.*

### Todo
Fix number formatting

## Version 0.2
### Fixes
Bug 0.1 fixed by implementing the formatNumber() method.

Bug 0.2 fixed by modifying delete() method so that it converts value to string first. 
Changed from:
```js
delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
}
```
To:
```js
delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
```
No clue why this worked though.

### Todo
Install a theme switcher with a toggle button.

## Verison 0.3
Added sidebar.

### TODO
Add themes
Make calculator grid and sidebar responsive (media queries). 