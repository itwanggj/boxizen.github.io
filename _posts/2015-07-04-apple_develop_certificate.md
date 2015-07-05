---
layout : post
title : ios证书制作与打包发布
category : ios
tags : ios 苹果
id: 2015070401
---

>苹果的证书多样纷杂，且打包审核的过程严格复杂，各种身份验证，证书验证的操作相信已经把许多人搞晕，包括本人在内，最近一个项目需要打包上线，却因为这些非技术问题而把原计划拖延许久。看来记录笔记刻不容缓。

## <a name="profile" id="profile">1. node.js</a>
在node.js出现以前, javascript大部分依赖于浏览器而执行。 由于javascript是一种脚本语言, 它的执行必须得依赖于一个解析器, 谷歌Chrome浏览器为例, 该解析器即为V8引擎。而node正是将V8引擎作为自己的javascript解析器, 使得javascript可以脱离浏览器而单独运行。

node的出现使得javascript可以在服务器端运行, 同时也推动了前端工程师向全端工程师进阶的过程, 这可是件非常酷炫的事情啊。

## <a name="module" id="module">2. 模块机制</a>
node.js使用CMD模块系统，主程序作为程序入口点，所有的模块只在执行过程中初始化一次，初始化后的模块对象会被缓存起来以重复利用。

### **2.1 模块引用**
require用于在当前模块中引入其他模块，传入一个模块名，返回一个模块导出对象，模块路径可以使用相对路径(./)，也可以使用绝对路径(/../)，模块后面的".js"可以省略，如下:

	var foo1 = require('./foo.js');
	var foo2 = require('./foo');

同时require可以引入一个json文件，此时后面的".json"不可省略，如下:

	var data = require('./data.json');

### **2.2 模块定义**
exports对象用于导出当前模块的变量与方法，而且它是唯一导出的出口，对应于require方法。

	//math.js
	exports.add = function() {
		var sum = 0,
			i = 0,
			args = arguments,
			l = args.length;
		while(i < l) {
			sum += args[i++];
		}
		return sum;
	}

### **2.3 二进制模块**
node.js中模块可分为两类，一种是核心模块，是已经编译好的二进制模块；而另外一种则是文件模块，指的是用户所编写的模块，这里大概列出几种常用的核心模块。
	
#### **2.3.1 stdio**

console模块是node.js提供的核心模块，提供了基本的输出功能。

	console.log()        // 控制台输出日志文件
	console.dir(object)  // 输出对象分析    

#### **2.3.2 URL与QueryString**

	url.parse(url,qs,sl)   // 将url解析为一个对象，其中包含host,hostname,port等字段，若qs为true，则调用querystring解析查询串	
	querystring.parse(str) // 解析查询串为对象

#### **2.3.3 Stream**

Stream是Node实现的一种面向流处理的接口，支持文件流、HTTP数据流、标准IO流等进行抽象操作。

Stream分为readStream与writeStream两种类型。

#### **2.3.4 http**

http协议模块，最重要的模块。

	var http = require('http') ;
	var server = http.createServer(function(req,res){
	 	res.writeHeader(200,{
		     'Content-Type' : 'text/plain;charset=utf-8'  // 添加charset=utf-8
	 	}) ;
		res.end("Hello,大熊！") ;
	}) ;
	server.listen(8888) ;
	console.log("http server running on port 8888 ...") ;

## <a name="express" id="express">3. express</a>

express是node.js官方指定的web开发框架，为了更快地玩转node.js，决定直接使用express，开启美妙的node.js之旅。

### **3.1 安装**

安装过程中需要注意的是要额外再安装express-generator，express 4.x以后的版本express把构建项目的命令独立到了express-generator中，如果不安装则会提示找不到express命令。

	npm install express -g
	npm install express-generator -g

### **3.2 使用**

	express myapp
	cd myapp && 
	npm install //安装中间件与依赖包
	npm run	//运行项目

### **3.3 结构**

express的项目目录结构如下所示:
<img src="/img/posts/nodeJs/express-tree.png" alt="express目录结构" style="display:block;width:150px;margin:10px;margin-left:0px"/>

**app.js**, 程序启动文件;
**bin**, 程序执行程序;
**node_modules**, 存放所有的项目依赖库;
**package.json**, 项目依赖配置及开发者;
**public**, 静态文件存放目录;
**route**, 路由文件;
**views**, 视图文件存放目录;


## <a name="mongodb" id="mongodb">4. mongodb</a>

### **4.1 认识mongodb**

mongodb是面向文档(document-oriented)的数据库系统(Nosql的一种)，其层次关系为:database -> collection -> document -> field(key：value)，其中collection对应与SQL数据库系统中的table，而document则对应于SQL数据库中的row。

### **4.2 简单使用**

mongodb的安装可参考网络上的各种教程，这里简单介绍其使用。

mongodb安装完后可分为两部分：服务器与客户端

#### **4.2.1 服务器端**
启用服务器方法如下：

	mongod mongod --dbpath /usr/local/data/mongodb --fork --logpath /usr/local/log/mongo.log

其中--dbpath表示指定数据库数据存储目录，--fork表示让数据库服务后台运行，--logpath为制定数据库的日志路径，更多的参数可以通过输入命令mongod --help获得。

为了不每次都输出这么长串命令，我使用startmongo简单代替之，如下所示：

	alias startmongo='sudo mongod --dbpath /usr/local/data/mongodb --fork --logpath /usr/local/log/mongo.log'

把该命令添加进.bashrc或.zshrc中，在终端中输入命令source .zshrc/.bashrc 激活之。

#### **4.2.2 客户端**

客户端命令如下：

	show dbs 	//列出所有数据库
	use movie 	//创建数据库
	db.getName() 	//查看数据库
	db.dropDatabase() 	//删除数据库
	db.getCollectionNames() 或者 show collections 	//查看集合
	db.person.insert({name:"boxizen", age:24}) db.person.save({name:"boxizen", age:24})  //添加数据
	db.person.find() 	//查找数据
	db.person.find().limit(2) 	//限制为两条记录
	db.person.remove({"name":"boxizen"}) 	//删除记录
	db.person.update({"name":"boxizen"},{"age":23}) 	//修改记录 

## <a name="integration" id="integration">5. 项目整合</a>

(文章持续更新中......)

<script type="text/javascript">
	$(function(){
		var profile = $('#profile').offset().top,
			module = $('#module').offset().top,
			express = $('#express').offset().top,
			mongodb = $('#mongodb').offset().top,
			integration = $('#integration').offset().top;
		console.log(express);
		$(window).scroll(function(){
			if($(window).scrollTop() >= profile && $(window).scrollTop() < module){
				$('.content').fadeIn(1);
				$('.content a').removeClass('active');
				$('.profile').addClass('active');
			}
			else if($(window).scrollTop() >= module && $(window).scrollTop() < express){
				$('.content a').removeClass('active');
				$('.module').addClass('active');
			}
			else if($(window).scrollTop() >= express && $(window).scrollTop() < mongodb){
				$('.content a').removeClass('active');
				$('.express').addClass('active');
			}
			else if($(window).scrollTop() >= mongodb && $(window).scrollTop() < integration){
				$('.content a').removeClass('active');
				$('.mongodb').addClass('active');
			}
			else if($(window).scrollTop() >= integration){
				$('.content a').removeClass('active');
				$('.integration').addClass('active');
			}
			else{			
				$('.content').fadeOut(1);
			}
		});
	});
</script>