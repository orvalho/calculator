/* When relying upon ECMAScript 6 features, this option must be set so JSHint doesn't raise unnecessary warnings. This option tells JSHint that this code uses ECMAScript 6 specific syntax. */
/*jshint esversion: 6 */

var input = document.getElementById("input");
var clear = document.getElementById("clear");
var evaluate = document.getElementById("eval");
var keyboard = document.getElementById("keyboard");
var operators = ["-", "+", "x", "÷"];
var decimal = false;

// clear input
clear.addEventListener("click", (e) => {
  input.textContent = "";
});

// evaluate expression
evaluate.addEventListener("click", (e) => {
  // check if last character is a decimal point or an operator. If so - remove it
  if(input.textContent[input.textContent.length - 1] === "." || operators.join("").includes(input.textContent[input.textContent.length - 1])) {
    input.textContent = input.textContent.replace(/.$/, "");
  }
  // replace all instances of x and ÷ with * and / respectively
  // round result of calculation to 4 decimal places
  input.textContent = Number(eval(input.textContent.replace(/x/g, "*").replace(/÷/g, "/")).toFixed(4));
});

// keys
keyboard.addEventListener("click", (e) => {
  // check if key with class="key" or id="eval" was clicked
  // limit count of characters to fit into the screen (up to 16 numbers)
  if((e.target.matches("span.key") ||
     e.target.matches("span#eval")) &&
     input.textContent.length < 16) {

    // check if "." key was clicked
    if(e.target.textContent === ".") {
      // number can have no more than one decimal point. Flag 'decimal' is set once the decimal point is added. It will be reset when an operator key is pressed.
      if(!decimal) {
      input.textContent += ".";
      decimal = true;
      }
    }

    // an expression can not start with one of these operators ("+","*","/")
    else if (operators.slice(1, 4).join("").includes(e.target.textContent) && input.textContent.length === 0) {
      input.textContent = "";
    }

    // if first and only character of input is "-" and second click is one of these operators ("+","*","/") - clear input
    else if (operators.slice(1, 4).join("").includes(e.target.textContent) && input.textContent.length === 1 && input.textContent[0] === "-") {
      input.textContent = "";
    }

    // an expression can not have two operators in a row
    else if (operators.join("").includes(e.target.textContent) && operators.join("").includes(input.textContent[input.textContent.length - 1])) {
      // if last character of expression is an operator - replace it with the new clicked operator
      input.textContent = input.textContent.replace(/.$/, e.target.textContent);
      decimal = false;
    }

    // add operator to input screen
    else if (operators.join("").includes(e.target.textContent)) {
      input.textContent += e.target.textContent;
      decimal = false;
    }

    // add digits to input screen
    else if (e.target.matches("span.key")) {
      input.textContent += e.target.textContent;
    }
  }

// show a message when max count of characters on the screen has been reached
else {
    input.textContent = "Digit limit met";
    // after 2 secs clear the screen
    setTimeout(function () {input.textContent = "";}, 2000);
}
});
