// Dependencies
const typpy = require("typpy")

/**
 * Animato
 * Creates a new `Animato` instance.
 *
 * Usage:
 *
 * ```js
 * Animato({...}).to({...}).duration(1000).step(function (c) {
 *  ...
 * }).start(function () {
 *  ...
 * });
 *
 * Animato({
 *    from: {...}
 *  , to: {...}
 *  , duration: 1000
 *  , step: function () {...}
 *  , complete: function () {...}
 * })
 * ```
 *
 * @name Animato
 * @function
 * @param {Object} from The source object.
 * @param {Object} to The target object.
 * @param {Number} time The animation duration (milliseconds).
 * @param {Function} step The step function.
 * @param {Function} complete The complete function.
 * @return {Animato} The `Animato` instance.
 */
function Animato(from, to, time, step, complete) {

    if (arguments.length === 1 && from && typeof from.from === "object" && typeof from.to === "object") {
        return new Animato(from.from, from.to, from.duration, from.step, from.complete);
    }

    if (!typpy(this, Animato)) {
        return new Animato(from, to, time, step, complete);
    }

    this._from = from;
    this._inter = {};
    this._to = to || null;
    this._duration = time || 200;
    this._step = step || function () {};
    this._complete = function () {};
    if (typeof complete === "function") {
        this.start(complete);
    }
}

/**
 * to
 * Sets the target object.
 *
 * @name to
 * @function
 * @param {Object} to The target object.
 * @return {Animato} The `Animato` instance.
 */
Animato.prototype.to = function (to) {
    this._to = to;
    return this;
};

/**
 * duration
 * Sets the animation duration.
 *
 * @name duration
 * @function
 * @param {Number} duration The animation duration (milliseconds).
 * @return {Animato} The `Animato` instance.
 */
Animato.prototype.duration = function (duration) {
    this._duration = duration;
    return this;
};

/**
 * step
 * Sets the step function. This function will be called every time when the animation changes.
 *
 * @name step
 * @function
 * @param {Function} fn The step function.
 * @return {Animato} The `Animato` instance.
 */
Animato.prototype.step = function (fn) {
    this._step = fn;
    return this;
};

/**
 * complete
 * Sets the complete function. This function will be called when the animation is done.
 *
 * @name complete
 * @function
 * @param {Function} fn The complete function.
 * @return {Animato} The `Animato` instance.
 */
Animato.prototype.complete = function (fn) {
    this._complete = fn;
    return this;
};

/**
 * start
 * Starts the animation.
 *
 * @name start
 * @function
 * @param {Function} fn The complete function.
 * @return {Animato.Frames} The `Animato.Frames` instance.
 */
Animato.prototype.start = function (fn, count) {

    const self = this;

    self.deltas = {};
    let max = 0;
    for (let k in self._from) {
        if (!self._from.hasOwnProperty(k)) continue;
        if ((self.deltas[k] = self._to[k] - self._from[k]) > max) {
            max = self.deltas[k];
        }
    }

    if (typeof fn === "function") {
        this._complete = fn;
    }

    let i = 0
      , frames = Animato.Frames(self._from, self._to, max * 2)
      ;

    return frames.duration(this._duration).step(this._step).start(this._complete);
};

/**
 * Frames
 * Generate frames for two given objects (source and target).
 *
 * @name Frames
 * @function
 * @param {Object} from The source object.
 * @param {Object} to The target object.
 * @param {Number} count How many frames to generate.
 * @return {Frames} The `Animato.Frames` instance.
 */
Animato.Frames = function (from, to, count) {

    if (this.constructor !== Animato.Frames) {
        return new Animato.Frames(from, to, count);
    }

    this._from = from;
    this._to = to;
    this._count = count;
    this._step = function () {};
    this._complete = function () {};
    this._duration = 200;
};

/**
 * toArray
 * Builts the array of frames.
 *
 * @name toArray
 * @function
 * @return {Array} The frames array.
 */
Animato.Frames.prototype.toArray = function () {
    let frames = [this._from]
      , deltas = {}
      , steps = {}
      , inter = {}
      , k = null
      ;

    for (k in this._from) {
        if (!this._from.hasOwnProperty(k)) continue;
        steps[k] = (deltas[k] = this._to[k] - this._from[k]) / this._count;
    }

    for (let i = 1; i < this._count; ++i) {
        inter = {};
        for (k in this._from) {
            if (!this._from.hasOwnProperty(k)) continue;
            inter[k] = this._from[k] + steps[k] * i;
        }
        frames.push(inter);
    }

    frames.push(this._to);
    return frames;
};

/**
 * step
 * Sets the step function. This function will be called every time when the animation changes.
 *
 * @name step
 * @function
 * @param {Function} fn The step function.
 * @return {Animato} The `Animato` instance.
 */
Animato.Frames.prototype.step = function (fn) {
    this._step = fn || this._step;
    return this;
};

/**
 * duration
 * Sets the animation duration.
 *
 * @name duration
 * @function
 * @param {Number} duration The animation duration (milliseconds).
 * @return {Animato} The `Animato` instance.
 */
Animato.Frames.prototype.duration = function (duration) {
    this._duration = duration;
    return this;
};

/**
 * start
 * Starts the animation.
 *
 * @name start
 * @function
 * @param {Function} fn The complete function.
 * @return {Animato.Frames} The `Animato.Frames` instance.
 */
Animato.Frames.prototype.start = function (fn) {
    let self = this
      , frames = this.toArray()
      , delay = this._duration / this._count
      , index = -1
      , interval = setInterval(function () {
            let frame = frames[++index];
            if (!frame) {
                clearInterval(interval);
                return self._complete();
            }

            self._step(frame);
        }, delay)
      ;

    self._complete = fn || self._complete;
    return interval;
};

module.exports = Animato;
