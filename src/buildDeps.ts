import { webpackOptions, depTree } from "./type";
import { resolve } from "./resolve";
import { parse } from "./parse";
import * as fs from "fs/promises";

const addModule = async (
  depTree: depTree,
  context: string,
  mainModule: string,
  options: webpackOptions["setting"]
) => {
  let filename: string;
  filename = await resolve(context, mainModule, options.resolve);
  if (depTree.modules[filename]) {
    return depTree.modules[filename].id;
  } else {
    // 具体参考 可以看项目中 webpack-learn 中对于 depTree 数据结构的描述。
    const module = (depTree.modules[filename] = {
      id: depTree.nextModuleId++,
      filename: filename,
    });
    depTree.modulesById[module.id] = module;
    fs.readFile(filename, "utf-8").then(
      (source) => {
        const deps = parse(source);
      },
      (err) => {
        throw err;
      }
    );
  }
};

export const buildDeps = async function (
  context: string,
  moduleName: string,
  options: webpackOptions["setting"]
) {
  const depTree: depTree = {
    modules: {},
    modulesById: {},
    chunks: {},
    nextModuleId: 0,
    nextChunkId: 0,
    chunkModules: {},
  };
  let mainModuleId;
  const id = await addModule(depTree, context, moduleName, options);
  buildTree();
  function buildTree() {}
};
