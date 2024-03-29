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
    console.log(x); // bar
    console.log(y); // ReferenceError: y is not defined
}
```

## `this` in functions
Ordinary functions normally establish `this` by how the function is called (runtime binding).

`this` is bound during function execution and it's defined depending of its _execution context_ (dynamic scope).

Unbound function bound `this` to:
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

// Execution context
// Bind 'this'
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
    // Inner execution context
    // Bind 'this'
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

`this` is bound during arrow function creation and retains its value:
```javascript
// Lexical context
const myObj = { // Does not create a new scope
  name: 'myObj',
  arrowFunc: () => console.log(this) // Create the arrow function and bind 'this'
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
    return () => console.log(this); // Creates the arrow and bind 'this' (only when this statement is executed)
  }
};
const myFunc = myObj.myFunc;

// Creates arrow function and bind 'this' 
myObj.globalArrowFunc = myFunc();
myObj.objectArrowFunc = myObj.myFunc();

// Execution context
myObj.globalArrowFunc(); // undefined, window {...} (or the global object)
myObj.objectArrowFunc(); // {name: 'myObj', ...}
```

## `null` data type
In JavaScript the data types can be broken down into 2 major groups, *primitive* and *reference*

The primitive data types are *immutable* and includes:
* string
* number
* bigint
* boolean
* undefined
* symbol
* `null`

The reference data types includes:
* objects (arrays are objects in JavaScript)
* methods

Note that, although in most languages
a `null` value represents a reference that
points to a nonexistent or invalid object
or address, in JavaScript `null` *is a primitive
value* even though `typeof null`, incorrectly
returns the value `'object'` (_bug from the
first version of JavaScript_).

## References
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
* https://en.wikipedia.org/wiki/Scope_(computer_science)
* https://developer.mozilla.org/en-US/docs/Glossary/Primitive
* https://developer.mozilla.org/en-US/docs/Glossary/Null
* https://2ality.com/2013/10/typeof-null.html
