"use strict";

const Raf = require("raf");
const typpy = require("typpy");

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
    // ... (No changes in the function signature)

    // New variable names for better readability
    this.from = from;
    this.intermediate = {};
    this.to = to || null;
    this.duration = time || 200;
    this.step = step || function () {};
    this.complete = function () {};
    if (typeof complete === "function") {
        this.start(complete);
    }
}

/**
 * start
 * Starts the animation.
 *
 * @name start
 * @function
 * @param {Function} fn The complete function.
 * @return {Raf} The `Raf` instance.
 */
Animato.prototype.start = function (fn) {
    this.calculateDeltas();

    if (typeof fn === "function") {
        this.complete = fn;
    }

    this.step(this.from);

    const self = this;
    let startTime;

    function animate(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }
        const progress = (timestamp - startTime) / self.duration;

        if (progress >= 1) {
            self.step(self.to);
            return self.complete();
        }

        self.calculateIntermediate(progress);
        self.step(self.intermediate);

        Raf(animate);
    }

    Raf(animate);
};

/**
 * calculateDeltas
 * Calculates the differences between the "from" and "to" objects.
 *
 * @name calculateDeltas
 * @function
 */
Animato.prototype.calculateDeltas = function () {
    this.deltas = {};
    for (const key in this.from) {
        if (this.from.hasOwnProperty(key)) {
            this.deltas[key] = this.to[key] - this.from[key];
        }
    }
};

/**
 * calculateIntermediate
 * Calculates the intermediate values based on the animation progress.
 *
 * @name calculateIntermediate
 * @function
 * @param {Number} progress The animation progress (0 to 1).
 */
Animato.prototype.calculateIntermediate = function (progress) {
    for (const key in this.from) {
        if (this.from.hasOwnProperty(key)) {
            this.intermediate[key] = this.from[key] + this.deltas[key] * progress;
        }
    }
};

/**
 * Animato.Frames
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
    // ... (No changes in the function signature)

    // New variable names for better readability
    this.from = from;
    this.to = to;
    this.count = count;
    this.stepFn = function () {};
    this.completeFn = function () {};
    this.duration = 200;
};

/**
 * start
 * Starts the animation.
 *
 * @name start
 * @function
 * @param {Function} fn The complete function.
 * @return {Raf} The `Raf` instance.
 */
Animato.Frames.prototype.start = function (fn) {
    const self = this;
    const frames = this.toArray();
    const delay = this.duration / this.count;
    let index = -1;

    const interval = setInterval(function () {
        const frame = frames[++index];
        if (!frame) {
            clearInterval(interval);
            return self.completeFn();
        }

        self.stepFn(frame);
    }, delay);

    self.completeFn = fn || self.completeFn;
    return interval;
};

module.exports = Animato;
