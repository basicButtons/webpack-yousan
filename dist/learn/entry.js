"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var webpack_1 = require("../src/webpack");
(0, webpack_1.webpack)({
    moduleName: "a.js",
    context: path.dirname(path.join(__dirname, "./a.js")),
    setting: {
        output: "bundle.js",
        outputDirectory: "./dist",
    },
    callback: function (err, res) {
        if (err)
            throw err;
        console.log(res);
    },
});
//# sourceMappingURL=entry.js.map