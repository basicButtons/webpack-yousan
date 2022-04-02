"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var parser = require("@babel/parser");
var parse = function (source) {
    var ast = parser.parse(source);
};
exports.parse = parse;
//# sourceMappingURL=parse.js.map