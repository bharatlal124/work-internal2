// 1. Arrow Function : 
const greet = (name) => {
   console.log( `HELLO  ${name}`);               // [``] These are template literal
}

// Use when:
// You want concise syntax (especially for one-liners).
// You don’t want/need this, arguments, super, or new.
// In array methods: .map(), .filter(), .reduce().
// 🧠 Tip: Never use arrow functions as object methods or constructors — this won't behave as expected.


// 2. Anonymous Function : 
setTimeout(function() {
  console.log("Hello");
}, 1000);

// Use when:
// Used as short-lived callbacks (e.g., setTimeout, addEventListener).
// Function doesn't need a name or recursion.
// 🧠 Tip: For debugging, prefer named expressions to see stack traces.


// 3. Function Expression :
var a = 10; var b = 10;
const add = function(a, b) {
  return a + b;
};

// Use when:
// You want to assign a function to a variable or pass it around.
// You need closures or want to pass functions dynamically.
// You don't need hoisting.


// 4. Function Declarations : 
var x = 5; var y = 5;
function add(x, b) {
  return a + b;
}

// Use when:
// You want to define reusable utility functions.
// You need hoisting (can call before definition).
// Code clarity matters.
// 🧠 Tip: These are hoisted — they work even if defined later in the file.



// 5. Constructor Function :
function Car(model) {
  this.model = model;
}
const myCar = new Car("Toyota");

// Use when:
// You’re creating many similar objects (older way before class).
// You need prototype-based inheritance.
// 🧠 Tip: Use ES6 class instead unless you’re in older JS environments.



// 6. Async Function : 
async function fetchData() {
  const res = await fetch("...");
}

// Use when:
// Working with Promises and await.
// You want cleaner, more readable asynchronous code.
// 🧠 Tip: Use try/catch inside for error handling.



// 💡 Tips to Decide Which Function to Use
// Situation                                 Preferred Function
// Reusable logic/tooling                    Function Declaration
// Callback in short-term                    Arrow or Anonymous Function
// Async code                                Async/Await
// Inside objects                            Object Methods
// Classes                                   Class Methods
// Dynamic or recursive logic                Function Expression (Named)
// Scoping before ES6 modules                IIFE
// Lazy iteration                            Generator Function
// Functional style                          Arrow Functions





// OBJECTS :
// What is an Object in JavaScript?
// An object is a collection of key-value pairs (also called properties). It can also include functions (called methods when inside an object).
// example : 
const user = {               // name & age is properties
  name: "Alice",
  age: 25,
  greet: function () {       //greet is a method
    console.log("Hello!");
  }
};


// Object Literal (most common)
const obj = {
  key: "value"
};


//  Using new Object()
const obj2 = new Object();
obj2.key = "value";


// Using a Constructor Function
function Person(name) {
  this.name = name;
}
const p = new Person("John");


// Using Classes (ES6)
class User {
  constructor(name) {
    this.name = name;
  }
}
const u = new User("Jane");


// Using Object.create()
const proto = { greet() { console.log("hi"); } };
const obj3 = Object.create(proto);

// ADD = car.year = 2020;
// UPDATE = car.color = "blue";
// DELETE = delete car.year;




// 📚 Common Built-in Object Methods
//       Method                                    Description
// Object.keys(obj)                          Returns an array of keys
// Object.values(obj)                        Returns an array of values
// Object.entries(obj)                       Returns an array of [key, value] pairs
// Object.assign(target, source)             Copies properties from source to target
// Object.freeze(obj)                        Makes object immutable
// Object.seal(obj)                          Prevents adding/removing properties
// hasOwnProperty(key)                       Checks if the object has the key



// Loop :

for (let i = 0; i < 5; i++) {
  console.log(i);
}

// i = 0 → start value
// i < 5 → stop condition
// i++ → increment


// while Loop :
let g = 0;
while (g < 5) {
  console.log(g);
  g++;
}


// do...while Loop : 
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);


// for...in Loop : 
const user2 = { name: "John", age: 30 };
for (let key in user2) {
  console.log(key, user2[key]);
}


// for...of Loop (ES6) :
const colors = ["red", "green", "blue"];
for (let color of colors) {
  console.log(color);
}


// Loop Control Statements : 

// break – exit the loop early - 
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i);
}


// continue – skip the current iteration -
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i); // skips 2
}




// ✅ Summary Table
// Loop                Use Case                                Works On
// for             Fixed number of iterations              Numbers, arrays
// while           Unknown iterations                      Any condition
// do...while      At least one iteration needed           Any condition
// for...in        Object keys                             Objects
// for...of        Iterable values                         Arrays, strings, sets, maps
// forEach()       Array iteration (no break/continue)     Arrays
// map(), filter() Array transformations                   Arrays
// reduce()        Accumulate to one value                 Arrays
