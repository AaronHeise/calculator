// Commit the code to an online publicly accessible Git repository (such as Github)
// Handle binary operations, e.g. 5 ­- 6, 8 * 4
// The calculator should be able to handle a full arithmetic expression at once, for example:, e.g. 1 + 1 ­- 4 * 4
// The library must take Order of Operations into account
// No need to handle parentheses, e.g. ( 1 + 1 - ­ 4 ) * 4
// Must be extendable​ so that it accepts user-­defined operands
// Complete it in your language of choice (JavaScript, PHP, Java…)

/*
Instantiate caculator class
accept and cleans input of invalid chars
split cleaned-up input into an array (don't worry about negatives to start)

Add Methods to class:

evaluateExpression(expression)
  create Order of Operations tiers. Tier 1: multiplication & division. Tier 2: addition & subtraction
  Iterate through the pairs
    while either operator is still present in the expression, evaluate with priority from left to right
    locate highest priority operator
    split expression at operator location
    take last element from left array and first element from right array
    Feed these operands into doMath() with the appropriate operator

assignOrderOperations(expression, operatorPair)
  determine if only one of the operators is present, if so, select other one;
  if both present, assign operator as first one in expression

doMath

*/


function Calculator(userInput) {
  this.cleanedInput = userInput.replace(/[^0-9\+\-\*\/]/g, '');
  console.log(this.cleanedInput);
  this.expressionArray = this.cleanedInput.split(/([^\d])/);
  console.log(this.expressionArray);
}

Calculator.prototype.resolveExpression = function(expression) {

}

Calculator.prototype.assignOrderOperations = function(expression, operatorPair) {
  var operator;
  if (expression.indexOf(operatorPair[0]) === -1) {
    operator = operatorPair[1];
  }
  else if (expression.indexOf(operatorPair[1]) === -1) {
    operator = operatorPair[0];
  }
  else if (expression.indexOf(operatorPair[0]) < expression.indexOf(operatorPair[1])) {
    operator = operatorPair[0];
  } else {
    operator = operatorPair[1];
  }
  return operator;
}

Calculator.prototype.doMath = function(num1, num2, operator) {
  switch (operator) {
    case '*':
      return num1 * num2;
      break;
    case '/':
      if (num2 !== 0) {
        return num1/num2;
      } else {
        return NaN;
      }
      break;
    case '+':
      return num1 + num2;
      break;
    case '-':
      return num1 - num2;
      break;
  }
}

var test = new Calculator('2*abc 2 + 6 / 2 * 15 / 8 * 3 - 11cv');

console.log(test.doMath(2, 3, '*'));
console.log(test.doMath(2, 3, '/'));
console.log(test.doMath(2, 3, '+'));
console.log(test.doMath(2, 3, '-'));
console.log(test.doMath(2, 0, '/'));
console.log(test.assignOrderOperations('1+3/2*4', ['*', '/']));

var test2 = new Calculator('1+2*3/2*4');
console.log(test2.assignOrderOperations(test2.expressionArray, ['*', '/']));

var test3 = new Calculator('1+3/2*4');
console.log(test3.assignOrderOperations(test3.expressionArray, ['*', '/']));

var test4 = new Calculator('1+3/4');
console.log(test4.assignOrderOperations(test4.expressionArray, ['*', '/']));
