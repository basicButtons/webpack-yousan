webpack

思维路线：

webpack ==> buildDeps(context, mainModule, options, callback) :此处callback维护两个参数(err,depTree). 

==> addModule(depTree,...buildDeps.args) 

==> resolve(context, identifier, options, callback) --> 去通过输入的 context 路径去判断该去哪里引入依赖 （相对路径？ 绝对路径 node_module?） 给 callback 回传两个参数 (err,filename)

==> resolve 获取到了 filename(文件真实的路径)				

![image-20220401134514075](/Users/yousan/Library/Application Support/typora-user-images/image-20220401134514075.png)



depTree 的数据结构

chunkmodules 将 module 指向于 chunk。

![image-20220402103922248](/Users/yousan/Library/Application Support/typora-user-images/image-20220402103922248.png)

chunks：

最后打包成几个 chunk 

![image-20220402104103902](/Users/yousan/Library/Application Support/typora-user-images/image-20220402104103902.png)

```
chunks:{
	modules:{
		0:"include",
		1:"include"
	},
	context:{
		asyncs:[]
		filename: // 入口文件
		id:number
		source: 'const b = require("./b.js");\nconsole.log(b.some);\n'
		// 入口文件的内容
	}，
	modules:{
		[filename]:{
			filename:"...",
			id:number,
			requires:[],// 依赖内容
			source:文件内容
			
		}
	},
	modulesById:{
		0:跟上面的 modules 的形式一样。
		1: 主要就是通过id的形式来map
	}
}
```

![image-20220402111423902](/Users/yousan/Library/Application Support/typora-user-images/image-20220402111423902.png)