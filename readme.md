<h2 align="center">手写webpack1.0版本</h2>
目前计划第一版不支持 `tree shaking` 不支持 `loader` 和 `plugin`。

只去实现一些基本的最基本打包功能

项目目录
```
src
├─buildDeps.ts // 添加模块依赖
├─resolve.ts // 解析每一个模块的依赖
├─type.ts // 类型定义
└webpack.ts //文件主要入口
```