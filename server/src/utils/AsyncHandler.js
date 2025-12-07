const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve().then(() => fn(req, res, next)).catch(next);
  // catch(next) is a shorthand for catch(error => next(error))
  // In javascript, when you pass a function as an argument, it automatically gets called with the parameters (e.g. error) of the calling function.
}

export default asyncHandler;


// Purpose:
//1. Reduce the use of Try-Catch every time , which makes the code messy.
//2. Pass the Error to the last Error-Handler Middleware 

// Reminder:
// This error handler is only can be userd for route handler / controllers
// not for any utilities

// The Promise.resolve() creates a promise chain which ensures that both synchronous and asynchronous errors are caught.
// The Promise.resolve() creates a resolved promise and immediately calls the .then() method with the handler function.
// If the handler function returns a promise (for async functions), it will wait for it to resolve or reject.
// if we don't use Promise.resolve() and the handler function throws a synchronous error,
// the .catch() method would not be able to catch it, leading to unhandled exceptions.
// By wrapping the handler in Promise.resolve(), we ensure that any error, whether synchronous or asynchronous, is properly caught and passed to the next middleware.


// How it works:
// Step 1: The outer function 
//   const asyncHandler = (fn) => (req, res, next) => { ... }   takes a function fn as an argument and returns a new function that takes req, res, and next as parameters.
// Step 2 : The wrapper funtion
//   (req, res, next) => { ... }  is the actual middleware function that Express will call when handling a request.
// Step 3: Inside the wrapper function, we create a promise chain using Promise.resolve().
// Step 4: We call the original handler function fn with req, res, and next as arguments inside the .then() method of the promise chain.
// Step 5: If fn returns a promise (which it will if it's an async function), we wait for it to resolve or reject.
// Step 6: If any error occurs (either synchronous or asynchronous), it will be caught by the .catch() method, which calls next(error) to pass the error to the next middleware (usually an error handler).