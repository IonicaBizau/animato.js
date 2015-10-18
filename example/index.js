var Animato = require("../lib");


//              ^
//              |
//              |
//              |
//              |
//              |   B
//              |
// -------------+-------------->
//              |
//              |
//         A    |
//              |
//              |
//              |


Animato({
    x: -3
  , y: -3
}).to({
    x: 2
  , y: 2
}).duration(1000).step(function (c) {
    console.log(c);
}).run(function () {
    console.log("complete");
});

//Animato({
//    from: {
//        x: 0
//      , y: 5
//    }
//  , to: {
//        x: 10
//      , y: 10
//    }
//  , step: function (c) {
//        console.log(c);
//    }
//  , complete: function (c) {
//        console.log("complete");
//    }
//});
