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
  moduleByIds: any;
  chunks: any;
  nextModuleId: number;
  nextChunkId: number;
  chunkModules: any;
}
