# JavaScript Concepts
## Closure
Is a technique in which a language stores a function together with its
environment. The environment is a mapping associating each free variable of
the function with the value or reference to which the name was bound when the
closure was created.

This is a way to pass a function forward to be executed at a later time and
commonly used by first-class functions languages such as JavaScript, Python,
and others.

**Functions serve as closures in JavaScript and thus always creates a new scope.**

## `var` vs `let`
* `var` is function scoped.
* `let` is enclosing block `{...}` scoped.

```javascript
function run() {
    if (true) {
        var x = 'bar';
        let y = 'foo';
    }
}
console.log(x); // bar
console.log(y); // ReferenceError: y is not defined
```


## `this` in functions
Ordinary functions normally establish `this` by how the function is called (runtime binding).
`this` is defined depending on its _execution context_ (dynamic scope).

Unbound function set `this` to:
* undefined in strict mode
* window object in browser
* global object in Node.js

```javascript
// Lexical context
const myObj = { // Does not create a new scope
    name: 'myObj',
    myFunc() { // Does create a new scope
      console.log(this);
    }
};
const myFunc = myObj.myFunc;

// Execution context and bound 'this'
myFunc(); // undefined, window {...} (or the global object)
myObj.myFunc(); // { name: 'myObj', ... }
```

Inner function:
```javascript
// Lexical context
const myObj = { // Does not create a new scope
  name: 'myObj',
  myFunc() { // Creates a new scope
    function innerFunc() { // Creates a new scope
      console.log(this);
    }
    // Execution context and bound 'this'
    innerFunc();
  }
};
const myFunc = myObj.myFunc;

// Execution context
myFunc(); // undefined, window {...} (or the global object)
myObj.myFunc(); // undefined, window {...} (or the global object)
```

## `this` in arrow functions
Arrow functions establish `this` based on its enclosing _lexical context_
(lexical scope or static scope).

Arrow function bound `this` during its creation and do not change:
```javascript
// Lexical context
const myObj = { // Does not create a new scope
  name: 'myObj',
  arrowFunc: () => console.log(this) // Creates arrow function and bound 'this' 
};
const arrowFunc = myObj.arrowFunc;

// Execution context
arrowFunc(); // undefined, window {...} (or the global object)
myObj.arrowFunc(); // undefined, window {...} (or the global object)
```

Inner arrow function:
```javascript
// Lexical context
const myObj = { // Does not create a new scope
  name: 'myObj',
  myFunc() { // Does create a new scope
    return () => console.log(this);
  }
};
const myFunc = myObj.myFunc;

// Creates arrow function and bound 'this' 
myObj.globalArrowFunc = myFunc();
myObj.objectArrowFunc = myObj.myFunc();

// Execution context
myObj.globalArrowFunc(); // undefined, window {...} (or the global object)
myObj.objectArrowFunc(); // {name: 'myObj', ...}
```

## References
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
* https://en.wikipedia.org/wiki/Scope_(computer_science)
