[![animato](http://i.imgur.com/e1NrEcY.png)](#)

# animato [![Support this project][donate-now]][paypal-donations]

Simple way to animate anything (even simple values).

## Installation

```sh
$ npm i --save animato
```

## Example

```js
// Dependencies
var Animato = require("animato");

// Use the helper functions to set the duration, step and complete functions
Animato({
    x: -3
  , y: -6
}).to({
    x: 2
  , y: 4
}).duration(1000).step(function (c) {
    console.log(c);
}).start(function () {
    console.log("complete");
});
// =>
// { x: -2.9166666666666665, y: -5.833333333333333 }
// { x: -2.8333333333333335, y: -5.666666666666667 }
// { x: -2.75, y: -5.5 }
// { x: -2.6666666666666665, y: -5.333333333333333 }
// { x: -2.583333333333333, y: -5.166666666666666 }
// { x: -2.5, y: -5 }
// { x: -2.4166666666666665, y: -4.833333333333333 }
// { x: -2.3333333333333335, y: -4.666666666666667 }
// { x: -2.25, y: -4.5 }
// { x: -2.166666666666667, y: -4.333333333333334 }
// { x: -2.0833333333333335, y: -4.166666666666667 }
// { x: -2, y: -4 }
// { x: -1.916666666666667, y: -3.833333333333334 }
// { x: -1.8333333333333335, y: -3.666666666666667 }
// { x: -1.7500000000000002, y: -3.5000000000000004 }
// { x: -1.666666666666667, y: -3.333333333333334 }
// { x: -1.5833333333333335, y: -3.166666666666667 }
// { x: -1.5, y: -3 }
// { x: -1.4166666666666665, y: -2.833333333333333 }
// { x: -1.333333333333333, y: -2.666666666666666 }
// { x: -1.2499999999999998, y: -2.4999999999999996 }
// { x: -1.1666666666666663, y: -2.3333333333333326 }
// { x: -1.083333333333333, y: -2.166666666666666 }
// { x: -0.9999999999999991, y: -1.9999999999999982 }
// { x: -0.9166666666666661, y: -1.8333333333333321 }
// { x: -0.8333333333333326, y: -1.6666666666666652 }
// { x: -0.7499999999999991, y: -1.4999999999999982 }
// { x: -0.6666666666666656, y: -1.3333333333333313 }
// { x: -0.5833333333333321, y: -1.1666666666666643 }
// { x: -0.4999999999999991, y: -0.9999999999999982 }
// { x: -0.4166666666666661, y: -0.8333333333333321 }
// { x: -0.33333333333333304, y: -0.6666666666666661 }
// { x: -0.2499999999999991, y: -0.4999999999999982 }
// { x: -0.16666666666666607, y: -0.33333333333333215 }
// { x: -0.08333333333333304, y: -0.16666666666666607 }
// { x: 0, y: 0 }
// { x: 0.08333333333333304, y: 0.16666666666666607 }
// { x: 0.16666666666666652, y: 0.33333333333333304 }
// { x: 0.24999999999999956, y: 0.4999999999999991 }
// { x: 0.3333333333333326, y: 0.6666666666666652 }
// { x: 0.41666666666666563, y: 0.8333333333333313 }
// { x: 0.49999999999999867, y: 0.9999999999999973 }
// { x: 0.5833333333333321, y: 1.1666666666666643 }
// { x: 0.6666666666666652, y: 1.3333333333333304 }
// { x: 0.7499999999999982, y: 1.4999999999999964 }
// { x: 0.8333333333333313, y: 1.6666666666666625 }
// { x: 0.9166666666666643, y: 1.8333333333333286 }
// { x: 0.9999999999999982, y: 1.9999999999999964 }
// { x: 1.0833333333333313, y: 2.1666666666666625 }
// { x: 1.1666666666666643, y: 2.3333333333333286 }
// { x: 1.2499999999999973, y: 2.4999999999999947 }
// { x: 1.3333333333333304, y: 2.6666666666666607 }
// { x: 1.4166666666666634, y: 2.833333333333327 }
// { x: 1.4999999999999964, y: 2.999999999999993 }
// { x: 1.5833333333333295, y: 3.166666666666659 }
// { x: 1.6666666666666625, y: 3.333333333333325 }
// { x: 1.7499999999999956, y: 3.499999999999991 }
// { x: 1.8333333333333286, y: 3.666666666666657 }
// { x: 1.9166666666666625, y: 3.833333333333325 }
// { x: 1.9999999999999956, y: 3.999999999999991 }
// { x: 2, y: 4 }
// complete

// Pass everything in an object
Animato({
    from: {
        x: 0
      , y: 5
    }
  , to: {
        x: 10
      , y: 10
    }
  , duration: 100
  , step: function (c) {
        console.log(c);
    }
  , complete: function (c) {
        console.log("complete");
    }
});
// =>
// { x: 1.666666666666667, y: 5.833333333333334 }
// { x: 3.333333333333334, y: 6.666666666666667 }
// { x: 5, y: 7.5 }
// { x: 6.666666666666668, y: 8.333333333333334 }
// { x: 8.333333333333336, y: 9.166666666666668 }
// { x: 10, y: 10 }
// complete

// Only get the frames
var frames = Animato.Frames({
    x: -10
  , y: 2
}, {
    x: 10
  , y: -3
}, 20);
console.log(frames.toArray());
// =>
// [ { x: -9, y: 1.75 }
// , { x: -8, y: 1.5 }
// , { x: -7, y: 1.25 }
// , { x: -6, y: 1 }
// , { x: -5, y: 0.75 }
// , { x: -4, y: 0.5 }
// , { x: -3, y: 0.25 }
// , { x: -2, y: 0 }
// , { x: -1, y: -0.25 }
// , { x: 0, y: -0.5 }
// , { x: 1, y: -0.75 }
// , { x: 2, y: -1 }
// , { x: 3, y: -1.25 }
// , { x: 4, y: -1.5 }
// , { x: 5, y: -1.75 }
// , { x: 6, y: -2 }
// , { x: 7, y: -2.25 }
// , { x: 8, y: -2.5 }
// , { x: 9, y: -2.75 }
// , { x: 10, y: -3 } ]

// Use frames in animation
frames.step(function (c) {
    console.log(c);
}).start(function () {
    console.log("Complete.");
});
// =>
// { x: -9, y: 1.75 }
// { x: -9, y: 1.75 }
// { x: -8, y: 1.5 }
// { x: -8, y: 1.5 }
// { x: -8, y: 1.5 }
// { x: -8, y: 1.5 }
// { x: -8, y: 1.5 }
// { x: -8, y: 1.5 }
// { x: -7, y: 1.25 }
// { x: -7, y: 1.25 }
// { x: -7, y: 1.25 }
// { x: -7, y: 1.25 }
// { x: -7, y: 1.25 }
// { x: -7, y: 1.25 }
// { x: -7, y: 1.25 }
// { x: -6, y: 1 }
// { x: -6, y: 1 }
// { x: -6, y: 1 }
// { x: -6, y: 1 }
// { x: -6, y: 1 }
// { x: -5, y: 0.75 }
// { x: -5, y: 0.75 }
// { x: -5, y: 0.75 }
// { x: -5, y: 0.75 }
// { x: -5, y: 0.75 }
// { x: -5, y: 0.75 }
// { x: -4, y: 0.5 }
// { x: -4, y: 0.5 }
// { x: -4, y: 0.5 }
// { x: -4, y: 0.5 }
// { x: -4, y: 0.5 }
// { x: -4, y: 0.5 }
// { x: -3, y: 0.25 }
// { x: -3, y: 0.25 }
// { x: -3, y: 0.25 }
// { x: -3, y: 0.25 }
// { x: -3, y: 0.25 }
// { x: -3, y: 0.25 }
// { x: -3, y: 0.25 }
// { x: -2, y: 0 }
// { x: -2, y: 0 }
// { x: -2, y: 0 }
// { x: -2, y: 0 }
// { x: -2, y: 0 }
// { x: -2, y: 0 }
// { x: -1, y: -0.25 }
// { x: -1, y: -0.25 }
// { x: -1, y: -0.25 }
// { x: -1, y: -0.25 }
// { x: -1, y: -0.25 }
// { x: -1, y: -0.25 }
// { x: 0, y: -0.5 }
// { x: 0, y: -0.5 }
// { x: 0, y: -0.5 }
// { x: 0, y: -0.5 }
// { x: 0, y: -0.5 }
// { x: 0, y: -0.5 }
// { x: 1, y: -0.75 }
// { x: 1, y: -0.75 }
// { x: 1, y: -0.75 }
// { x: 1, y: -0.75 }
// { x: 1, y: -0.75 }
// { x: 1, y: -0.75 }
// { x: 2, y: -1 }
// { x: 2, y: -1 }
// { x: 2, y: -1 }
// { x: 2, y: -1 }
// { x: 2, y: -1 }
// { x: 2, y: -1 }
// { x: 3, y: -1.25 }
// { x: 3, y: -1.25 }
// { x: 3, y: -1.25 }
// { x: 3, y: -1.25 }
// { x: 3, y: -1.25 }
// { x: 4, y: -1.5 }
// { x: 4, y: -1.5 }
// { x: 4, y: -1.5 }
// { x: 4, y: -1.5 }
// { x: 4, y: -1.5 }
// { x: 4, y: -1.5 }
// { x: 5, y: -1.75 }
// { x: 5, y: -1.75 }
// { x: 5, y: -1.75 }
// { x: 5, y: -1.75 }
// { x: 5, y: -1.75 }
// { x: 5, y: -1.75 }
// { x: 6, y: -2 }
// { x: 6, y: -2 }
// { x: 6, y: -2 }
// { x: 6, y: -2 }
// { x: 6, y: -2 }
// { x: 6, y: -2 }
// { x: 7, y: -2.25 }
// { x: 7, y: -2.25 }
// { x: 7, y: -2.25 }
// { x: 7, y: -2.25 }
// { x: 7, y: -2.25 }
// { x: 7, y: -2.25 }
// { x: 8, y: -2.5 }
// { x: 8, y: -2.5 }
// { x: 8, y: -2.5 }
// { x: 8, y: -2.5 }
// { x: 8, y: -2.5 }
// { x: 8, y: -2.5 }
// { x: 9, y: -2.75 }
// { x: 9, y: -2.75 }
// { x: 9, y: -2.75 }
// { x: 9, y: -2.75 }
// { x: 9, y: -2.75 }
// { x: 9, y: -2.75 }
// { x: 10, y: -3 }
// { x: 10, y: -3 }
// { x: 10, y: -3 }
// { x: 10, y: -3 }
// { x: 10, y: -3 }
// { x: 10, y: -3 }
// Complete.
```

## Documentation

### `Animato(from, to, time, step, complete)`
Creates a new `Animato` instance.

Usage:

```js
Animato({...}).to({...}).duration(1000).step(function (c) {
 ...
}).start(function () {
 ...
});

Animato({
   from: {...}
 , to: {...}
 , duration: 1000
 , step: function () {...}
 , complete: function () {...}
})
```

#### Params
- **Object** `from`: The source object.
- **Object** `to`: The target object.
- **Number** `time`: The animation duration (milliseconds).
- **Function** `step`: The step function.
- **Function** `complete`: The complete function.

#### Return
- **Animato** The `Animato` instance.

### `to(to)`
Sets the target object.

#### Params
- **Object** `to`: The target object.

#### Return
- **Animato** The `Animato` instance.

### `duration(duration)`
Sets the animation duration.

#### Params
- **Number** `duration`: The animation duration (milliseconds).

#### Return
- **Animato** The `Animato` instance.

### `step(fn)`
Sets the step function. This function will be called every time when the animation changes.

#### Params
- **Function** `fn`: The step function.

#### Return
- **Animato** The `Animato` instance.

### `complete(fn)`
Sets the complete function. This function will be called when the animation is done.

#### Params
- **Function** `fn`: The complete function.

#### Return
- **Animato** The `Animato` instance.

### `start(fn)`
Starts the animation.

#### Params
- **Function** `fn`: The complete function.

#### Return
- **Raf** The `Raf` instance.

### `Frames(from, to, count)`
Generate frames for two given objects (source and target).

#### Params
- **Object** `from`: The source object.
- **Object** `to`: The target object.
- **Number** `count`: How many frames to generate.

#### Return
- **Frames** The `Animato.Frames` instance.

### `toArray()`
Builts the array of frames.

#### Return
- **Array** The frames array.

### `step(fn)`
Sets the step function. This function will be called every time when the animation changes.

#### Params
- **Function** `fn`: The step function.

#### Return
- **Animato** The `Animato` instance.

### `duration(duration)`
Sets the animation duration.

#### Params
- **Number** `duration`: The animation duration (milliseconds).

#### Return
- **Animato** The `Animato` instance.

### `start(fn)`
Starts the animation.

**TODO** This currently uses setInterval because `raf` didn't work as expected.

#### Params
- **Function** `fn`: The complete function.

#### Return
- **Raf** The `Raf` instance.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md