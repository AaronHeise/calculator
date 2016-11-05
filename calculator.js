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

splitExpression(expression, operator)
  given the highest priority operator, break apart the expression to be reduced w/ the operator

doMath(num1, num2, operator)
  actually carry out the mathematical operation
*/

// Evaluator provides an interface for users to simply input an expression and get the result back.
function Evaluator(input) {
  var toEvaluate = new Calculator(input);
  var result = toEvaluate.resolveExpression(toEvaluate.expressionArray);
  console.log(result);
  return result;
}

function Calculator(userInput) {
  this.cleanedInput = userInput.replace(/[^0-9\+\-\*\/]/g, '');
  // this does not handle negative numbers right now, need to update to properly handle
  this.expressionArray = this.cleanedInput.split(/([^\d])/);
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

Calculator.prototype.splitExpression = function(expression, operator) {
  var splitLocation = expression.indexOf(operator);
  var leftExp = expression.slice(0, splitLocation);
  var rightExp = expression.slice(splitLocation+1);
  var leftOperand = +leftExp.pop();
  var rightOperand = +rightExp.shift();
  if (isNaN(leftOperand) || isNaN(rightOperand)) {
    console.log('Bad Inputs');
    return null;
  }
  return {
    leftExp : leftExp,
    rightExp : rightExp,
    leftOperand : leftOperand,
    rightOperand : rightOperand
  }
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

Calculator.prototype.resolveExpression = function(expression) {
  var operatorPairs = [['*', '/'], ['+', '-']];
  for (var i = 0; i < operatorPairs.length; i++) {
    while (expression.indexOf(operatorPairs[i][0]) > -1 || expression.indexOf(operatorPairs[i][1]) > -1) {
      var operator = this.assignOrderOperations(expression, operatorPairs[i]);
      var inputs = this.splitExpression(expression, operator);
      var resolvedVal = this.doMath(inputs.leftOperand, inputs.rightOperand, operator);
      inputs.leftExp.push(resolvedVal);
      expression = inputs.leftExp.concat(inputs.rightExp);
    }
  }
  return expression[0];
}

// var test = new Calculator('2*abc 2 + 6 / 2 * 15 / 8 * 3 - 11cv');
// test.resolveExpression(test.expressionArray);

// console.log(test.doMath(2, 3, '*'));
// console.log(test.doMath(2, 3, '/'));
// console.log(test.doMath(2, 3, '+'));
// console.log(test.doMath(2, 3, '-'));
// console.log(test.doMath(2, 0, '/'));
// console.log(test.assignOrderOperations('1+3/2*4', ['*', '/']));
//
// var test2 = new Calculator('1+2*3/2*4');
// console.log(test2.assignOrderOperations(test2.expressionArray, ['*', '/']));
//
// var test3 = new Calculator('1+3/2*4');
// console.log(test3.assignOrderOperations(test3.expressionArray, ['*', '/']));
//
// var test4 = new Calculator('1+3/4');
// console.log(test4.assignOrderOperations(test4.expressionArray, ['*', '/']));
// test4.resolveExpression(test4.expressionArray, '*');

// var test5 = new Calculator('1+3/2*4');
// test5.resolveExpression(test5.expressionArray);
Evaluator('2 * 2 + 6 / 2 * 15 / 8 * 3 - 11');
Evaluator('2*abc 2 + 6 / 2 * 15 / 8 * 3 - 11cv');
