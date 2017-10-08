> 项目运行
```
1.开启服务器: npm run dev
2.打包文件: npm run build
3.github:https://github.com/PlusLius/-devServer-ES6-.git
4.如果觉得有用的话,请给个start,后面将继续更新,如果有错误知错还请指出,谢谢!
```


>  安装包的作用
```
1. "clean-webpack-plugin"和"html-webpack-plugin"这两个包来帮助我们完成shell操作(dist文件的添加和删除,以及html自动插入绑定)
2. 开启我们的webpack服务器
3. "webpack-merge"用来对我们的开发环境和生 产环境对webpack基础配置进行扩展
4. 打包文件的压缩
  "devDependencies": {
    "clean-webpack-plugin": "^0.1.17",
    "html-webpack-plugin": "^2.30.1",
    "webpack-dev-server": "^2.9.1",
    "webpack-merge": "^4.1.0",
    "uglifyjs-webpack-plugin": "^0.4.6",
  }
```
> 先让我们的脚手架支持ES6
1. 配置文件.babelrc
2. prestets字段的作用是用来设置转码规则
```
//.babelrc

# ES2015转码规则
babel-preset-es2015

# ES7不同阶段语法提案的转码规则（共有4个阶段)
babel-preset-stage-0
babel-preset-stage-1
babel-preset-stage-2
babel-preset-stage-3

#下载完这些包后,填入presets字段
{
  "presets": [
    "es2015",
    "stage-2"
  ],
  "plugins": []
}
```

>babel-ployfill 让Babel支持新的API,如Symbol、Promise等,
```
#为当前环境安装一个垫片(babel-ployfill)

$ npm install --save babel-polyfill

#安装好后就可以在文件头部中引入
import 'babel-polyfill';

```
>babel-register 使用require时会先调用Babel进行转码

```
$ npm install --save-dev babel-register

require("babel-register");
require("./index.js");

#babel-register只会对require命令加载的文件转码，
而不会对当前文件转码
```

> babel-core 如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块。

```
$ npm install babel-core --save
var babel = require('babel-core');

// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});
```

> Browserslist 在不同的前端工具之间共享支持的浏览器列表的库。它用于：
```
1.Autoprefixer
2.babel-preset-env (external config in package.json or browserslist files supported in 2.0)
3.eslint-plugin-compat
4.stylelint-no-unsupported-browser-features
5.postcss-normalize
```

>babel-preset-env babel-preset-env 会根据配置的 env 只编译那些还不支持新的特性。
```
优化.babelrc,不支持ES6的一些新特性的
浏览器我们才去编译成ES5
详细:https://github.com/babel/babel-preset-env
配置项:
targets.node 支持到哪个版本的 node
targets.browsers 支持到哪个版本的浏览器
loose 启动宽松模式，配合 webpack 的 loader 使用
modules 使用何种模块加载机制
debug 开启调试模式
include 包含哪些文件
exclude 排除哪些文件
useBuiltIns 是否对 babel-polyfill 进行分解，只引入所需的部分

{
    "presets":[
        ["env",{
          "modules": false,
          "targets": {
             "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
           }
        }]
    ],
    "plugins":["transform-runtime"]
}


```

> plugins字段中,transform-runtime的作用
```
1.使用它可以增强代码的使用性,如果使用了新的一些api会造成全局污染如:promise,set,map
2.可以不用require来使用来使用这些新的api
3.配置参数:
辅助(helpers)
默认值是:true

表示是否开启内联的babel helpers(即babel或者环境本来的存在的垫片或者某些对象方法函数)(clasCallCheck,extends,etc)在调用模块名字(moduleName)时将被替换名字。

垫片/polyfill
默认值是:`true'

表示是否把内置的东西(Promise,Set,Map,tec)转换成非全局污染垫片。

重新生成/regenerator
默认值是:true

是否开启generator函数转换成使用regenerator runtime来避免污染全局域。


模块名字/moduleName
默认值:babel-runtime

当调用辅助（内置垫片）设置模块（module）名字/路径.

详细:https://segmentfault.com/a/1190000009065987

{
    "presets":[
        ["env",{
          "modules": false,
          "targets": {
             "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
           }
        }]
    ],
    "plugins":["transform-runtime"]
}

```

> env字段的作用,使用环境变量,对不同环境使用不同的配置
```
1.该env的键将会去找process.env.BABEL_ENV，当找不到，则使用process.env.NODE_ENV，如果不可用，则默认为"development"。
2.如果希望在平台上工作，可以使用 cross-env包
在终端中执行了类似这样了命令后BABEL_ENV=production YOUR_COMMAND_HERE,就会执行下面的环境


{
  "env": {
    "production": {
      "plugins": ["transform-react-constant-elements"]
    }
  }
}
//那我们可以给测试环境配置编译环境
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": ["istanbul"]
    }
  }
```
> babel-loader配置
```
//详细说明
http://babeljs.io/docs/setup/#installation
//webpack.base.js
module: {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
}
```

> 参考链接

```
1.http://www.jianshu.com/p/41d3f7768095
2.https://github.com/jakwuh/babel-plugin-transform-runtime
3.https://segmentfault.com/a/1190000009065987
4.https://segmentfault.com/p/1210000008466178
5.http://www.jianshu.com/p/ff7e0de573a9
6.http://babeljs.io/docs/usage/babelrc/
7.http://www.jianshu.com/p/1e402922ee32
8.http://www.ruanyifeng.com/blog/2016/01/babel.html
9.https://github.com/gotwarlost/istanbul
```
>让我们的脚手架支持vue
```
vue-loader详细文档
https://vue-loader.vuejs.org/zh-cn/
在运行环境,我们必须拿完整版本渲染
详细:https://segmentfault.com/q/1010000010380119

template字段的作用是以我们注册的根组件为模版进行渲染
compoents字段的作用是注册一个根组件

import Vue from 'vue/dist/vue.js';
import Plus from './plus'

new Vue({
    el: '#app',
    template: '<Plus/>',
    components: { Plus }
})

// vue模版的编译需要基于一下loader作为支持
"vue-loader":"^13.0.5",
"vue-style-loader": "^3.0.3",
"vue-template-compiler": "^2.4.4",
"css-loader": "^0.28.7",
```
> 参考文档
```
https://vue-loader.vuejs.org/zh-cn/
https://segmentfault.com/q/1010000010380119
```

