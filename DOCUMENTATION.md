## Documentation

You can see below the API reference of this module.

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

