var Raf = require("raf");

function Animato(source, target, duration, step, complete) {
    if (this.constructor !== Animato) {
        return new Animato(source, target, duration, step, complete);
    }
    this.source = source;
    this.target = target || null;
    this.duration = duration || 200;
}

Animato.prototype.to = function (target) {
    this.target = target;
    return this;
};

Animato.prototype.duration = function (duration) {
    this.duration = duration;
    return this;
};

Animato.prototype.step = function (fn) {
    this.step = fn;
    return this;
};

Animato.prototype.complete = function (fn) {
    this.complete = fn;
    return this;
};

Animato.prototype.run = function (fn) {
    if (typeof fn === "function") {
        this.complete = fn;
    }

    return Raf(function tick (delta) {
        console.log(delta);
        Raf(tick);
    });
};

Animato.Frames = function (from, to, count) {

};

module.exports = Animato;
