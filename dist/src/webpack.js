"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpack = void 0;
var Path = require("path");
var buildDeps_1 = require("./buildDeps");
var webpack = function (options) {
    var context = options.context, moduleName = options.moduleName, setting = options.setting, callback = options.callback;
    // assess the muduleName  if it isn't a fileName the set dirname to context
    if (!moduleName) {
        moduleName = "./" + Path.basename(context);
        context = Path.dirname(moduleName);
    }
    var depTree = (0, buildDeps_1.buildDeps)(context, moduleName, options.setting);
};
exports.webpack = webpack;
//# sourceMappingURL=webpack.js.map