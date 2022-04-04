import * as Path from "path";
import { buildDeps } from "./buildDeps";
import { webpackOptions } from "./type";
import { buildChunks } from "./buildChunk";
import * as fs from "fs/promises";
import path = require("path");

export const webpack = async function (options: webpackOptions) {
  let { context, moduleName, setting, callback } = options;
  
  const dist = setting.outputDirectory || __dirname;

  // assess the muduleName  if it isn't a fileName the set dirname to context
  if (!moduleName) {
    moduleName = "./" + Path.basename(context);
    context = Path.dirname(moduleName);
  }
  const depTree = await buildDeps(context, moduleName, options.setting);
  const chunks = buildChunks(depTree);
  fs.writeFile(Path.join(dist, "bundle.js"), chunks, { encoding: "utf-8" });
};
