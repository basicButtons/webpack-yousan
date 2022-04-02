import * as Path from "path";
import { buildDeps } from "./buildDeps";
import { webpackOptions } from "./type";

export const webpack = function (options: webpackOptions) {
  let { context, moduleName, setting, callback } = options;
  // assess the muduleName  if it isn't a fileName the set dirname to context
  if (!moduleName) {
    moduleName = "./" + Path.basename(context);
    context = Path.dirname(moduleName);
  }
  const depTree = buildDeps(context, moduleName, options.setting);
};
