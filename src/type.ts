export interface webpackOptions {
  context: string;
  moduleName?: string;
  setting: settingInterface;
  callback: (err: Error, res: string) => void;
}

export interface settingInterface {
  outputDirectory: string;
  output: string;
  minimize?: boolean;
  resolve?: any;
}

export interface depTree {
  modules: any;
  modulesById: any;
  chunks: any;
  nextModuleId: number;
  nextChunkId: number;
  chunkModules: any;
}
export interface Context {
  id?: number;
  requires?: any[];
  name?: string;
  nameRange?: any;
  line?: number;
  column?: number;
}
