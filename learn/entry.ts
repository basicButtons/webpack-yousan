import * as path from "path";
import { webpack } from "../src/webpack";

webpack({
  moduleName: "a.js",
  context: path.dirname(path.join(__dirname, "./a.js")),
  setting: {
    output: "bundle.js",
    outputDirectory: path.join(__dirname, "./dist"),
  },
  callback: (err, res) => {
    if (err) throw err;
    console.log(res);
  },
});
