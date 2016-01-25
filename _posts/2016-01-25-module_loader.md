---
layout : post
title : RequireJS, Sea.js, Browserify和webpack的对比
category : 前端
tags : 前端 模块化
id: 2016012501
---

> 在前端领域，新技术与轮子很多，在模块加载方面也不另外，这篇文章列出了当下为人所知的四种种模块依赖管理工具，其中大部分本人都有接触过，故结合使用经验与相关资料，总结写下它们之间的异同点。

## RequireJS

本人最早接触的模块化工具是RequireJS，这在前端领域算是一个老牌模块化加载器，从诞生到现在已有6年有余，可见其生命力之顽强，不断前行。我认为RequireJs对下面三个代码组织管理工具的诞生也或多或少有一定的影响。

RequireJS是为了在浏览器端写模块化代码而出现，它的写法符合**AMD**规范。

### 文件引用

    // 首先引入require.js的文件，并指定好脚本的入口文件main.js
    <script data-main="scripts/main" src="scripts/require.js"></script>
    
    // main.js - 在入口文件中加载依赖的模块
    require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC)
    {
        alert('加载成功');
    });
    
### 模块定义
    // 符合AMD规范
    define(function() {
      var obj = {};
      var test = function() {
        alert('test');
      }
      return {
        obj:  obj,
        test: test
      }
    });
  
### 资源打包
    // 打包依赖
    // RequireJS通过一个r.js的文件进行依赖打包，需要node环境支持
    node r.js -o build
    
### 优劣之处
**优点：** RequireJS是前端模块化工具的老牌，它在推广过程中推出了**AMD**的开发理念，解放了生产力，在推出初期拥有不可磨灭的影响力，同时在它的发展过程中推出了许多插件，促进了整个生态的发展，也为广大前端开发者提供了极大的便利。

**缺点：** 必须引入require.js文件，对于轻量级应用而言，尤其是移动端项目，未免有些臃肿庞大。

---

## Sea.js

阿里玉伯写的一款模块加载器，在推广过程中产出了**CMD**的标准，其与*AMD*区别具体请看[AMD 和 CMD 的区别有哪些？](https://www.zhihu.com/question/20351507)

### 文件引用

在 hello.html 页尾，通过 script 引入 sea.js 后，有一段配置代码：
    
    // seajs 的简单配置
    seajs.config({
      base: "../sea-modules/",
      alias: {
        "jquery": "jquery/jquery/1.10.1/jquery.js"
      }
    })
    
    // 加载入口模块
    seajs.use("../static/hello/src/main")

### 模块代码

    // 所有模块都通过 define 来定义
    define(function(require, exports, module) {
    
      // 通过 require 引入依赖
      var $ = require('jquery');
      var Spinning = require('./spinning');
    
      // 通过 exports 对外提供接口
      exports.doSomething = ...
    
      // 或者通过 module.exports 提供整个接口
      module.exports = ...
    
    });

### 资源打包

sea.js通过一款名为spm的工具构建打包，此乃**坑爹**中的**坑爹**，老子花了好久都没打包出任何东西。
    
### 优劣之处

**优点：** CMD规范推崇依赖后置，我们可以在需要使用模块的地方再使用引入语句 require，更符合人的自然思维，而不需要像Require.js一样在定义一个模块的时候就把依赖写上（新版本的RequireJS好像也可以依赖后置了）。

**缺点：** 值得一提的是，玉伯曾多次在社交平台或场合中说过，Sea.js已死。但是我还是要吐槽一下，sea.js的文档不完善，社区衰落，打包使用了我完全不关注的spm，并且spm版本跨度大，不向下兼容，折腾了很久还没有打好包，有问题只好在github上的issue查看解决方案，不料解答太杂乱，很难找到问题所在，最重要的是，我刚开始使用sea.js的时候，玉伯竟然宣布sea.js已挂...

---

## webpack

这是最近兴起的一种模块加载器兼打包工具，功能强大，主要体现为:

* 任何东西均是模块，所有的东西(图片、css等)都可以通过require的方式引进。
* 同时支持**CommonJS**和**AMD**模块，对于熟悉RequireJS或者是node.js的同学来说是个巨大的福利，我们可以按照自己的习惯选择适合自己编写代码的方式。
* 内置插件机制丰富，提供了对CoffeeScript、ES6的支持，同时也可以使用webpack-dev-server做测试服务器，调试起来非常方便。
* 支持对CSS、图片等资源进行打包，完成了gulp的部分功能。
* 在内存完成打包，效率更高，能够满足开发过程中实时打包的需求。

总而言之，在我看来，webpack不仅仅是一个工具，而是前端的**整体工程化方案**。

### 安装方法

    // 首先需要通过node安装webpack的npm模块
    npm install -g webpack

### 模块定义
> 上面提到了，webpack支持AMD和CommonJS模块, 所以我们可以自由选择自己喜欢的模块方式编写代码
    
    // entry.js, 可以看到我们可以把css文件当作是一个模块引入
    require('./style.css');
    for(let i = 0; i < 5; i++) {
    	console.log(i);                                                              
    }
    document.write(require('./comment.js'));
    
    // comment.js
    module.exports = "It works from comment.js";
    
    // style.css
    body {
    	background: yellow;
    }

### 编译打包
    // webpack默认通过webpack.config.js作为打包配置文件，大致用法如下
    module.exports = {
      // 入口
      entry: './src/entry.js',
      // 输出
      output: {
        path: './dist',
        filename: 'bundle.js'
      },
      module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel",
            query: {
            	presets: ['es2015']
            }
        }, 
        test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.(css|scss)$/,
            loader: 'style!css'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192' // 图片低于 8MB 时转换成 inline base64
        }]
      }
    }
  
    // 通过运行下面的命令完成打包, **-p** 表示对打包后的文件进行压缩
    webpack -p

### 优劣之处

**优点：** 总结得出，webpack实在是厉害，配置简单，功能强大，使用舒心，在我看来，工具就应该是方便人类而设，不应该在上面花太多的时间成本，同时因为webpack支持commonJS规范，这使得未来前后端(node.js)模块的共用成为可能，所以现阶段webpack将会是本人的最优选择。

**缺点：** 需要时间的考验

---

## Browserify

// 尚未使用过，有待研究

---

## 总结

新的JavaScript模块标准使得曾为竞争关系的SeaJS和RequireJS都过时了，Browserify和webpack成为新时代模块化管理的潮流，另外从SeaJS的衰落中也可看到，只有开放英文社区才能真正使得一个技术产品能被大众所熟知并做出贡献，在轮子倍出的前端领域尤为如此。