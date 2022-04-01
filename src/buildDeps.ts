import { webpackOptions, depTree } from "./type";
import { resolve } from "./resolve";

const addModule = (
  depTree: depTree,
  context: string,
  mainModule: string,
  options: webpackOptions["setting"]
) => {
  resolve(context, mainModule, options.resolve);
};

export const buildDeps = function (
  context: string,
  moduleName: string,
  options: webpackOptions["setting"]
) {
  const depTree: depTree = {
    modules: {},
    moduleByIds: {},
    chunks: {},
    nextModuleId: 0,
    nextChunkId: 0,
    chunkModules: {},
  };
  let mainModuleId;
  addModule(depTree, context, mainModuleId, options);
};
