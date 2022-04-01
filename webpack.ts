import path, * as Path from "path";
import * as fs from "fs";
import { buildDeps } from "./buildDeps";
import { webpackOptions } from "./type";

export const webpack = function (options: webpackOptions) {
  let { context, moduleName, setting, callback } = options;
  // assess the muduleName  if it isn't a fileName the set dirname to context
  if (!moduleName) {
    moduleName = "./" + path.basename(context);
    context = path.dirname(moduleName);
  }
  const depTree = buildDeps(context, moduleName, options.setting);
};
