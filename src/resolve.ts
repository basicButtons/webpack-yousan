import { join } from "path";
import * as fs from "fs/promises";
import path = require("path");

function split(a: string) {
  return a.split(/[\/\\]/g);
}

// 暂时不考虑其他的引入方式，我们目前先让整个模块 run 起来

function loadAsFile(pathname: string): Promise<string> {
  return fs.stat(pathname).then(
    (res) => {
      return pathname;
    },
    (_) => {
      return _;
      // return loadAsDirectory(pathname).then(
      //   (res) => res
      // (err) => loadAsNodeModules(pathname)
      // );
    }
  );
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

export const resolve = (context: string, identifier: string, options: any) => {
  if (!options) options = {};
  if (!options.extensions) options.extensions = [".js", ".ts", ".jsx", "tsx"];
  if (!options.paths) options.paths = [];
  const identArray: string[] = identifier.split("/");
  const contextArray = context;
  if (identArray[0] === "." || identArray[0] === ".." || identArray[0] == "") {
    const pathname = "/" + join(contextArray, ...identArray);
    return loadAsFile(pathname);
  }
  return path.join(context, identifier);
};
