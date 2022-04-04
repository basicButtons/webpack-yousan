<h2 align="center">手写webpack1.0版本</h2>
目前计划第一版不支持 `tree shaking` 不支持 `loader` 和 `plugin`。

只去实现一些最基本打包功能

项目目录
```
/src
├── buildChunk.ts  将 depTree 转化为 chunks 进行webpack runtime封装
├── buildDeps.ts 形成依赖树
├── parse.ts  解析文件
├── resolve.ts   解析绝对路径
├── type.ts   types
└── webpack.ts 主流程文件
```