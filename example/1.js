var raf = require("raf");
handle = raf(function tick (c) {
    console.log(c);
    raf(tick);
})

