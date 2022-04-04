import { depTree, Context } from "./type";
interface module {
  id: number;
  filename: string;
  requires: Context[];
  source: string;
}

export const buildChunks = (depTree: depTree) => {
  const modules = depTree.modules;
  let moduleResult = "";
  Object.keys(modules).forEach((key: string) => {
    const module = modules[key];
    const requiresMap: any = {};
    if (module.requires) {
      module.requires?.forEach((require: any, index: number) => {
        requiresMap[require.name] = index;
      });
    }
    moduleResult += `${module.id}: [function(require,module,exports){
      ${module.source}
    },${JSON.stringify(requiresMap)}],\n`;
  });

  console.log(moduleResult);
  return `((function (modules) {

    function require(id){
      const [fn,mapping] = modules[id]

      function localRequire(relativePath){
        return require(mapping[relativePath])
      }

      const localModule = {exports:{]}}

      fn(localRequire, localModule, localModule.exports)
    }

    require(0)

  })(
    {${moduleResult}}
  ))`;
};
