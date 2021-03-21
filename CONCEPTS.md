# JavaScript Concepts

## Scope
In JavaScript is the same as the current _"context of execution"_.
Because of the single thread nature of JavaScript language,
**only function declarations create a new scope or _"execution context"_**.

## Closure
Is a technique in which a language stores a function together with its
environment. The environment is a mapping associating each free variable of
the function with the value or reference to which the name was bound when the
closure was created.

This is a way to pass a function forward to be executed at a later time and
commonly used by first-class functions languages such as JavaScript, Python,
and others.

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


## `this` keyword
In JavaScript `this` is normally determined by how a function is called (runtime binding).

Unbound function set `this` to:
* undefined in strict mode
* window object in browser
* global object in Node.js

```javascript
function ordinaryFunc() { // Creates a new scope (execution context)
    console.log(this);
}
ordinaryFunc(); // undefined, window {...} (or the global object)
```

Unbound inner function:
```javascript
function func() { // Creates a new scope (execution context)
    const innerFunc = function() { // Creates a new scope (execution context)
        console.log(this);
    }
    innerFunc();
}
const obj = { x: 'bar', y: 'foo' };
innerFunc.call(obj); // undefined, window {...} (or the global object)
```
Object bound function:
```javascript
const obj = { // Does not create a new scope (execution context)
    ordinaryFunc() { console.log(this); }
}
obj.ordinayFunc(); // obj {...}
```

## `this` keyword in arrow function
Arrow functions establish `this` based on the current "execution context" (scope)
they are defined within.

Unbound arrow function:
```javascript
const arrowFunc = () => console.log(this);
arrowFunc(); // undefined, window {...} (or the global object)
```

Unbound inner arrow function:
```javascript
function func() { // Creates a new scope (execution context)
    const arrowFunc = () => console.log(this);
    arrowFunc();
}
const obj = { x: 'bar', y: 'foo' };
innerFunc.call(obj); // { x: 'bar', y: 'foo' }
```

Object bound arrow function:
```javascript
let obj = { // Does not create a new scope (execution context)
    arrowFunc: () => console.log(this),
}
obj.arrowFunc(); // undefined, window {...} (or the global object)
```
