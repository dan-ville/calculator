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
Install a theme switcher