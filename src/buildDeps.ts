import { webpackOptions, depTree, Context } from "./type";
import { resolve } from "./resolve";
import { parse } from "./parse";
import * as fs from "fs/promises";

interface moduleType {
  id: number;
  filename: string;
  requires?: Context[];
  source?: string;
  chunks?: any[];
  asyncs?: any[];
  chunkId?: number;
}

const addModule = async (
  depTree: depTree,
  context: string,
  mainModule: string,
  options: webpackOptions["setting"]
) => {
  const res = await resolve(context, mainModule, options.resolve);
  const filename: string = res;
  if (depTree.modules[filename]) {
    return depTree.modules[filename].id;
  } else {
    // 具体参考 可以看项目中 webpack-learn 中对于 depTree 数据结构的描述。
    // 这个是抽象语法树上的 模块信息
    const module: moduleType = (depTree.modules[filename] = {
      id: depTree.nextModuleId++,
      filename: filename,
    });
    depTree.modulesById[module.id] = module;
    const source = await fs.readFile(filename, "utf-8");
    // 返回一个 文件（在webpack中 文件就是模块）中的 关键信息，包含依赖等
    const deps = parse(source);
    // 为 devTree 上的模块
    module.requires = deps.requires || [];
    module.source = source;
    // 新建一个 对象来存储依赖
    const requires: { [name: string]: Context[] } = {};

    // 如有依赖的话，就将其让在另外一个
    // 将这些依赖添加 requires 这个新对象上 的方法
    const add = (r: Context) => {
      requires[r.name] = requires[r.name] || [];
      requires[r.name].push(r);
    };
    if (module.requires) {
      module.requires.forEach(add);
    }

    // 把每一个依赖都添加到 devTree 上
    let promiseList: Promise<any>[] = [];
    Object.keys(requires).forEach((moduleName) => {
      promiseList.push(addModule(depTree, context, moduleName, options));
    });
    return Promise.all(promiseList);
  }
};

// 构建buildDep 这个 tree
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
  await addModule(depTree, context, moduleName, options);
  return depTree;
};
