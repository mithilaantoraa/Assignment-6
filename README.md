<!-- question 01 -->
#### 1) What is the difference between var, let, and const?
=var → old way, function-scoped, can re-declare & update.

let → block-scoped, can update but not re-declare.

const → block-scoped, cannot re-declare or update (but arrays/objects values can change).

<!-- question 02 -->
#### 2) What is the difference between map(), forEach(), and filter()?\
map() → makes a new array, changes each element.

forEach() → just loops, does not make new array.

filter() → makes a new array but only with items that pass a condition.

<!-- question 03 -->
#### 3) What are arrow functions in ES6?
Arrow functions in ES6

Shorter syntax for writing functions.

Do not have their own this (they inherit this from their surrounding scope).

Cannot be used as constructors (no new keyword).

Example:

// Normal function
function add(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

<!-- question-4 -->
#### 4) How does destructuring assignment work in ES6?
It’s a shortcut to unpack values from arrays or objects into separate variables.
<!-- example -->
const numbers = [10, 20, 30];

// Normal way
const a = numbers[0];
const b = numbers[1];

// Destructuring way
const [x, y, z] = numbers;

console.log(x, y, z); // 10 20 30

<!-- question no-5 -->
#### 5) Explain template literals in ES6. How are they different from string concatenation?
Ans:A modern way to work with strings.

Written with backticks ( ` ) instead of quotes.

Allow variables and expressions inside ${ }.

Support multiline strings easily.
<!-- example -->
const name = "Antora";
const age = 22;

// ✅ Template Literal
const msg = `My name is ${name} and I am ${age} years old.`;

// ❌ Old Concatenation
const msg2 = "My name is " + name + " and I am " + age + " years old.";

console.log(msg);
