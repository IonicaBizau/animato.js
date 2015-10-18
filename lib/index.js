var Raf = require("raf");

function Animato(from, to, time, step, complete) {
    if (arguments.length === 1 && from && typeof from.from === "object" && typeof from.to === "object") {
        return new Animato(from.from, from.to, from.duration, from.step, from.complete);
    }
    if (this.constructor !== Animato) {
        return new Animato(from, to, time, step, complete);
    }
    this._from = from;
    this._inter = {};
    this._to = to || null;
    this._duration = time || 200;
    this._step = step || function () {};
    this._complete = function () {};
    if (typeof complete === "function") {
        this.run(complete);
    }
}

Animato.prototype.to = function (to) {
    this._to = to;
    return this;
};

Animato.prototype.duration = function (duration) {
    this._duration = duration;
    return this;
};

Animato.prototype.step = function (fn) {
    this._step = fn;
    return this;
};

Animato.prototype.complete = function (fn) {
    this._complete = fn;
    return this;
};

Animato.prototype.run = function (fn) {

    var self = this;

    self.deltas = {};
    for (var k in self._from) {
        if (!self._from.hasOwnProperty(k)) continue;
        self.deltas[k] = self._to[k] - self._from[k];
    }

    if (typeof fn === "function") {
        this._complete = fn;
    }

    return Raf(function tick (delta) {
        var proc = delta / self._duration
          , k
          ;

        for (k in self._from) {
            if (!self._from.hasOwnProperty(k)) continue;
            self._inter[k] = self._from[k] + self.deltas[k] * proc;
        }


        if (proc >= 1) {
            self._step(self._to);
            return self._complete();
        }

        self._step(self._inter);

        Raf(tick);
    });
};

Animato.frames = function (from, to, count) {

};

module.exports = Animato;
