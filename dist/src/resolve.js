"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
var path_1 = require("path");
var fs = require("fs/promises");
function split(a) {
    return a.split(/[\/\\]/g);
}
// 暂时不考虑其他的引入方式，我们目前先让整个模块 run 起来
function loadAsFile(pathname) {
    return fs.stat(pathname).then(function (res) {
        return res;
    }, function (_) {
        return _;
        // return loadAsDirectory(pathname).then(
        //   (res) => res
        // (err) => loadAsNodeModules(pathname)
        // );
    });
}
// function loadAsDirectory(dirname: string) {
//   const packageJsonFile = join(split(dirname), "package.json");
//   let mainModule = "index";
//   return fs.readFile(packageJsonFile, { encoding: "utf8" }).then(
//     (content) => {
//       let newContext = JSON.parse(content);
//       mainModule = newContext.main ?? mainModule;
//       return loadAsFile(join(dirname, mainModule)).then(
//         (res) => res,
//         (err) => loadAsNodeModules(dirname)
//       );
//     },
//     (err) => {
//       return loadAsFile(join(dirname, mainModule)).then(
//         (res) => res,
//         (err) => loadAsNodeModules(dirname)
//       );
//     }
//   );
// }
// // 这个地方的引入机制好麻烦呀。。。。一直在用，但是完全没有想到有这么麻烦
// function loadNodeModules(context: string) {
//   let parts = context;
//   const rootNodeModules = parts.indexOf("node_modules");
//   const dirs = [];
//   for (var i = parts.length; i > rootNodeModules; i--) {
//     if (parts[i - 1] === "node_modules" || parts[i - 1] === "web_modules")
//       continue;
//     var part = parts.slice(0, i);
//   }
//   return dirs;
// }
var resolve = function (context, identifier, options) {
    if (!options)
        options = {};
    if (!options.extensions)
        options.extensions = [".js", ".ts", ".jsx", "tsx"];
    if (!options.paths)
        options.paths = [];
    var identArray = identifier.split("/");
    var contextArray = context;
    if (identArray[0] === "." || identArray[0] === ".." || identArray[0] == "") {
        var pathname = "/" + path_1.join.apply(void 0, __spreadArray([contextArray], identArray, false));
        return loadAsFile(pathname);
    }
};
exports.resolve = resolve;
//# sourceMappingURL=resolve.js.map