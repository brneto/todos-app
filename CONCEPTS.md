# JavaScript Concepts

## Scope
In JavaScript is the same as the current _"context of execution"_.
Because of the single thread nature of JavaScript language,
**only function declarations create a new scope** or _"execution context"_.

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
In JavaScript this is normally determined by how a function is called
(runtime binding).

Unbounded function set this to:
* undefined in strict mode
* window object in browser
* global object in Node.js

```javascript
function ordinaryFunc() {
    console.log(this);
}
ordinaryFunc(); // undefined, window {...} (or the global object)
```


Object bounded function:
```javascript
let obj = { // Does not create a new scope
    ordinaryFunc() {
        console.log(this);
    }
}
obj.ordinayFunc(); // obj {...}
```


Class bounded function:
```javascript
class MyClass { // Does create a new scope
    ordinaryFunc() {
        console.log(this);
    }
}
const newObj = new MyClass();
newObj.ordinayFunc(); // MyClass {...}
```

## `this` keyword in arrow function
Arrow functions do not have their own bindings to this, thus it is always
bound to the context of execution (scope) where they are in.

Unbounded arrow function:
```javascript
let arrowFunc = () => console.log(this);
arrowFunc(); // undefined, window {...} (or the global object)
```

Object bounded arrow function:
```javascript
let obj = { // Does not create a new scope
    arrowFunc: () => console.log(this),
}
obj.arrowFunc(); // undefined, window {...} (or the global object)
```

Class bounded arrow function:
```javascript
class MyClass { // Does create a new scope
    arrowFunc = () => console.log(this);
}
let newObj = new MyClass();
newObj.arrowFunc(); // MyClass {...}
```

## Implications of `this` keyword in _function_ vs _arrow function_
```javascript
class MyClass { // Does create a new scope
    ordinaryFunc() {
        let innerFunc = function() { console.log(this); }
        const innerArrowFunc = () => console.log(this);
        
        innerFunc(); // undefined
        innerArrowFunc(); // MyClass {...}
        console.log(this); // MyClass {...}
    };
}
let newObj = new MyClass();
newObj.ordinaryFunc();
```

