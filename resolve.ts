import { join } from "path";
import fs from "fs/promises";

function split(a) {
  return a.split(/[\/\\]/g);
}

function loadAsFile(pathname: string) {
  return fs.stat(pathname).then(
    (res) => {
      return res;
    },
    (_) => {
      return loadAsDirectory(pathname).then(
        (res) => res,
        // (err) => loadAsNodeModules(pathname)
      );
    }
  );
}

function loadAsDirectory(dirname: string) {
  const packageJsonFile = join(split(dirname), "package.json");
  let mainModule = "index";
  return fs.readFile(packageJsonFile, { encoding: "utf8" }).then(
    (content) => {
      let newContext = JSON.parse(content);
      mainModule = newContext.main ?? mainModule;
      return loadAsFile(join(dirname, mainModule));
    },
    (err) => {
      return loadAsFile(join(dirname, mainModule));
    }
  );
}

// 这个地方的引入机制好麻烦呀。。。。一直在用，但是完全没有想到有这么麻烦

// function loadAsNodeModules(context: string) {
//   let parts = context;
//   const rootNodeModules = parts.indexOf("node_modules");
//   for (var i = parts.length; i > rootNodeModules; i--) {
//     if (parts[i - 1] === "node_modules" || parts[i - 1] === "web_modules")
//       continue;
//     var part = parts.slice(0, i);
//     dirs.push(join(part, ["node_modules"]));
//   }
//   return dirs;
// }

export const resolve = (context: string, identifier: string, options: any) => {
  if (!options) options = {};
  if (!options.extensions) options.extensions = [".js", ".ts", ".jsx", "tsx"];
  if (!options.paths) options.paths = [];
  const identArray = identifier.split("/");
  const contextArray = split(context);
  if (identArray[0] === "." || identArray[0] === ".." || identArray[0] == "") {
    const pathname = "/" + join(contextArray, ...identArray);
    loadAsFile(pathname);
  }
};
