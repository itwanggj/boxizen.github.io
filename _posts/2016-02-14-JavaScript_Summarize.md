---
layout : post
title : JavaScript知识梳理
category : JavaScript
tags : JavaScript 前端
id: 2016021401
---

> 本文列举了JavaScript中常见的语言特性，总结并分析了其中的奥妙与原理，以巩固和加深自己对知识的理解。转载请注明出处，谢谢。

<style>
	em {
		font-size: 0.8rem;
	}	
</style>

<style>
	table {
		width: 100%;
		border: 1px solid #dddddd;
		border-collapse: collapse;
		margin-bottom: 20px;
	}
	th, td {
		border: 1px solid #dddddd;
		padding: 5px;
		font-size: 0.8rem;
	}
	@media screen and (max-width: 1100px) {
		.content {
			display: none;
		}
	}
	.content {
		position: fixed;
		right: 5%;
		top: 1.125rem;
		list-style-type: none;
		margin: 0;
		width: 150px;
	}
	.content.hidden {
		display: none;
	}
	.content li a {
		font-size: 0.75rem;
	}
	.content > a.active {
		color: blue;
	}
	.content li a.collapse-btn {
		margin-right: 5px;
		font-size: 0.8rem;
		font-weight: bold;
	}
	.child-content.hidden {
		display: none;
	}
	.content-menu.active {
		font-weight: bold;
		color: #2a7ae2;
	}
</style>

<ul class="content hidden">
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_1" class='content-menu' id='menu_1'>作用域和内存管理</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_1_1">作用域和作用域链</a>				
			</li>
			<li>
				<a href="#section_1_2">垃圾收集策略</a>				
			</li>
			<li>
				<a href="#section_1_3">闭包</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_2" class='content-menu' id='menu_2'>面向对象编程</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_2_1">原型和原型链</a>				
			</li>
			<li>
				<a href="#section_2_2">对象创建</a>				
			</li>
			<li>
				<a href="#section_2_3">继承类型</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_3" class='content-menu' id='menu_3'>BOM和客户端检测</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_3_1">BOM</a>				
			</li>
			<li>
				<a href="#section_3_2">检测插件</a>				
			</li>
			<li>
				<a href="#section_3_3">客户端检测</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_4" class='content-menu' id='menu_4'>DOM及其拓展</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_4_1">节点层次</a>				
			</li>
			<li>
				<a href="#section_4_2">DOM操作技术</a>				
			</li>
			<li>
				<a href="#section_4_3">DOM扩展</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_5" class='content-menu' id='menu_5'>事件机制</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_5_1">事件流模型</a>				
			</li>
			<li>
				<a href="#section_5_2">事件处理</a>				
			</li>
			<li>
				<a href="#section_5_3">事件对象</a>				
			</li>
			<li>
				<a href="#section_5_4">事件类型</a>				
			</li>
			<li>
				<a href="#section_5_5">事件代理和委托</a>				
			</li>
			<li>
				<a href="#section_5_6">事件模拟</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_6" class='content-menu' id='menu_6'>错误处理机制</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_6_1">错误处理</a>				
			</li>
			<li>
				<a href="#section_6_2">错误调试</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_7" class='content-menu' id='menu_7'>JSON和AJAX</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_7_1">JSON</a>				
			</li>
			<li>
				<a href="#section_7_2">XMLHttpRequest</a>				
			</li>
			<li>
				<a href="#section_7_3">跨域资源共享</a>				
			</li>
			<li>
				<a href="#section_7_4">其他跨域技术</a>				
			</li>
		</ul>
	</li>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_8" class='content-menu' id='menu_8'>客户端存储</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_8_1">离线检测</a>				
			</li>
			<li>
				<a href="#section_8_2">应用缓存</a>				
			</li>
			<li>
				<a href="#section_8_3">客户端存储</a>				
			</li>
		</ul>
	</li>
</ul>

## <a id='section_1' class='chapter'>一、作用域和内存管理</a>

### <a id='section_1_1'>**作用域&&作用域链**</a>

每一个**执行环境**都有一个与之关联的**变量对象**，环境中定义的变量和函数都保存在这个对象中。

全局函数无法查看局部函数的内部细节，但是局部函数却可以访问上层的执行环境，直至全局执行环境，当需要在局部函数中访问某一属性或方法的时候，如果在当前的变量对象中找不到，就会在上层作用域中查找，直至全局函数，这种组织形式就是**作用域链**。

### <a id='section_1_2'>**垃圾收集策略**</a>

JavaScript是一门具有自动垃圾回收机制的编程语言，开发人员不必关心内存的分配和回收问题。对于垃圾回收机制的原理很简单，就是找出那些不再继续使用的变量，然后释放其占用的内存即可。

**(1) 标记清除** 

JavaScript中最常用的垃圾收集方式为标记清除，当变量进入环境(如在函数中声明一个变量)时，将此变量标记为"进入环境"，而当其离开环境时(函数执行完毕)，则将其标记为"离开环境"。

标记的方法可以通过翻转某个特殊位来记录一个变量何时进入环境，或者使用一个“进入环境的”变量列表及一个“离开环境的”变量列表来跟踪哪个变量发生了变化。

**(2) 引用计数** 

另一种不太常见的垃圾收集策略叫做引用计数，其含义是跟踪记录每个值被引用的次数，当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是1，相反，如果包含这个引用的变量又取了另外一个值，则这个值的引用次数减1，当这个值引用次数变成0时，则说明无法再访问这个值了，因而其占用的内存空间会被回收。

这种策略有一个致命的缺点在于，当存在两个变量相互引用时，他们的引用次数将永远不为0，因而其占用的内存永远不会被释放。

### <a id='section_1_3'>**闭包**</a>

闭包是指有权访问另一函数作用域中变量和对象的函数，一般表现为函数内部的函数。

使用闭包的优点如下:

**(1) 延长作用域链**

由于闭包可以访问外部函数中的变量和对象，因此可达到延长作用域链的作用。

	function outer {
		var out = '外部变量';
		return function() {
			console.log(out);
		}
	}

**(2) 模仿块级作用域**

	(function(){
		var now = new Date();
		if(now.getMonth() == 0 && now.getDate() == 1) {
			console.log('Happy new year');
		}
	})();

该做法可以减少闭包占用的内存问题，因为没有指向匿名函数的引用，只要函数执行完毕，就可以立即销毁其作用域链了。

当然闭包也存在着不足之处, 具体如下:

* (1) 增加了内存消耗。

* (2) IE浏览器由于垃圾回收机制问题，有内存溢出的风险。

* (3) 增加了代码的复杂度，不容易维护或调试。



## <a id='section_2' class='chapter'>二、面向对象编程</a>

### <a id='section_2_1'>**原型&&原型链**</a>

在JavaScript中，我们创建的所有函数都含有一个**prototype**的属性，这个属性是一个指针，指向一个对象，这个对象就是**原型对象**。原型对象作用是让该函数派生出来的所有实例均能共享其属性和方法。（*注:实例中有**__proto__**属性，该属性指向原型对象，而原型对象中的constuctor属性泽指向原来的函数。*）

每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针(constructor)，而实例斗包含一个指向原型对象的内部指针(__proto__)。假如让原型对象等于另一个类型的实例，则它将包含一个指向另一个原型对象的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，上述关系依然成立，如此层层递进，就构成了实例和原型的链条，也就是**原型链
**。

<!--img src="/img/posts/js_summary/prototype.jpg" alt="原型链"-->

### <a id='section_2_2'>**对象创建**</a>

**(1) 工厂模式** 

	function createPerson(name, age, job) {
		var o = new Object();
		o.name = name;
		o.age = age;
		o.job = job;
		o.sayName = function() {
			console.log(this.name);
		};
		return o;
	}	
	var p1 = createPerson('boxizen', 24, 'student');

不足: 无法判断对象的类别。

**(2) 构造函数模式** 
	
	function Person(name, age, job) {
		this.name = name;
		this.age = age;
		this.job = job;
		this.sayName = function() {
			console.log(this.name);
		}
	}
	var p1 = new Person('boxizen', 24, 'student');
	var p2 = new Person('zhangsan', 26, 'teacher');

不足: 主要问题在于，构造函数中的方法需要在每一个实例上重新创建一遍，造成内存资源的浪费。

**(3) 原型模式** 
	
	function Person() {}
	// 重新给prototype赋值，同时constuctor重新指向原来的构造函数
	Person.prototype = {
		constructor: Person,
		name: 'boxizen',
		age: 24,
		job: 'student',
		sayName: function() {
			alert(this.name);
		}
	}
	var p1 = new Person('boxizen', 24, 'student');

不足: 原型模式的主要缺点在于对于引用型的属性来说，由于其被所有的实例对象共享，所以其中一个实例对象修改了引用型属性就会导致所有实例对象引用的属性发生改变，而这违反了面向对象中封装特性。

**(4) 组合使用构造函数模式和原型模式** 

	function Person(name, age, job) {
		this.name = name;
		this.age = age;
		this.job = job;
		this.friends = ['Shelly', 'pt'];
	}
	Person.prototype = {
		constructor: Person,
		sayName: function() {
			console.log(this.name);
		}
	}
	var p1 = new Person('boxizen', 24, 'student');
	var p2 = new Person('zhangsan', 26, 'teacher');

这是当前在ECMAScript中使用最广泛、认可度最高的一种创建自定义类型的方法。

### <a id='section_2_3'>继承类型</a>

继承是面向对象语言中一个最为津津乐道的概念，许多OO语言对支持两种方式的继承：接口继承和实现继承，其中接口继承只继承方法签名，而实现继承则继承实际的方法。由于ECMAScript中没有方法签名，所以只支持实现继承，在ECMAScript中通过**原型链(参考前面)**来实现继承的。

**(1) 原型继承**

ECMAScript中将原型链作为实现继承的主要方法。其主要思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。
	
	// 父类构造函数
	function SuperType() {
		this.property = true;
	}
	// 父类原型方法
	SuperType.prototype.getSuperValue = funtion() {
		return this.property;
	}
	// 子类原型指向父类实例
	SubType.prototype = new SuperType();
	// 子类原型方法
	SubType.prototype.getSubValue = function() {
		return this.subproperty;
	}
	// 子类实例
	var instance = new SubType();
	console.log(instance.getSUperValue());

不足: 原型继承最大的问题来自于包含引用类型值的原型。前面提到了包含引用类型值的属性会被所有实例共享，所以为什么属性在构造函数中定义，而不是在原型对象中定义的原因；在通过原型实现继承的时候，实例属性变成了原型属性，所以造成了包含引用类型的属性被所有实例继承的现象。

**(2) 借用构造函数**

借用构造函数实现继承的思路很简单，就是在子类构造函数中调用超类型构造函数，以实现继承超类型属性方法的目的，解决了原型继承中所带来引用类型的问题。而这一过程主要依靠**call**或**apply**来实现。

	function SuperType() {
		this.colors = ['red', 'blue', 'green', 'black'];
	}
	function SubType() {
		// 继承了SUperType
		SUperType.call(this);
	}
	var instance1 = new SubType();
	instance1.colors.push('yellow');
	var instance2 = new SUbType();
	instance2.colors.push('purple');

不足: 借用构造继承的问题还是在于，前面所说的，方法都在构造函数中定义，因此函数复用无从谈起，同时也对内存资源造成了浪费。

**(3) 组合继承**

组合继承是将原型继承与借用构造继承结合在一起，避免两者的缺陷，发挥两者所长的一种继承模式，是JavaScript中最常用的继承模式。其主要思路是通过在子类构造函数调用超类构造函数，以实现对实例属性的继承，而通过原型链实现对原型属性和方法的继承。
	
	// 超类定义
	function SuperType(name) {
		this.name = name;
		this.colors = ['red', 'blue', 'green'];
	}
	SuperType.prototype.sayName = function() {
		console.log(this.name);
	}

	// 子类定义
	function SubType(name, age) {
		SuperType.call(this, name);
		this.age = age;
	}
	SubType.prototype = new SuperType();
	SuType.prototype.constructor = SubType;
	SubType.prototype.sayAge = function() {
		console.log(this.age);
	}


## <a id='section_3' class='chapter'>三、BOM和客户端检测</a>

### <a id='section_3_1'>**BOM**</a>

**(1) location对象**

location饰最有用的BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能，它既是window对象的属性，也是document对象的属性。

|   属性名    |  例子      |   说明   |
| :-----------: | :-----------:  |  :-----------:  |
| hash |  #contents  | 返回URL的hash|
| host |  www.wrox.com:80  | 返回服务器名和端口号(如果有)|
| hostname |  www.wrox.com  | 返回不带端口号的服务器名|
| port |  80 | 返回端口号|
| href |  http://www.wrox.com  | 返回完成URL，与location.toString()返回值一样|
| pathname |  /boxizen/  | URL中目录或文件名|
| protocol |  http:  | 返回URI的协议|
| search |  ?q=javascript  | 返回查询字符串|

**(2) navigator对象**

|   属性名    |  说明   |
| :-----------: | :-----------:  |
| appName|  完整浏览器版本  |
| userAgent|  浏览器的用户代理字符串  |
| vendor|  浏览器品牌  |
| language|  浏览器主语言  |
| plugins|  浏览器安装的插件信息的数组  |
| ...|  ...  |

### <a id='section_3_2'>**检测插件**</a>

检测插件(IE无效):

	function hasPlugin(name) {
		name = name.toLowerCase();
		for(var i = 0; i < navigator.plugins.length; i++) {
			if(navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
				return true;
			}
		}
		return false;
	}

检测IE中的插件:

	function hashIEPlugin(name) {
		try {
			new ActiveXObject(name);
			return true;
		} catch(e) {
			return false;
		}
	}

**(3) history对象**

history对象保存着用户上网的历史记录，从窗口被打开那一刻起算起。
	
后退一页

	history.go(-1);
	history.back();

前进一页

	history.go(1);
	history.forward();

跳转到历史记录中的某个页面，如果历史记录不包含该字符串，则该方法什么也不做

	history.go('wrox.com');


### <a id='section_3_3'>**客户端检测**</a>

**(1) 能力检测**

最常用也是最被广泛接受的客户端检测形式，通过判断浏览器的能力来识别浏览器的范围。

**(2) 怪癖检测**

通过识别浏览器的特殊行为判断特定的浏览器。而通常这些特殊行为表现为浏览器的BUG，譬如在IE8及更早的版本中存在一个BUG，即如果某个实例属性与[[Enumerable]]标记为false的某个原型属性同名，那么改实例属性将不会出现在for-in循环中。

**(3) 用户代理检测**

在客户端，用户代理检测被看作是万不得已才用的做法，优先级排在能力检测和怪癖检测之后，原因在于浏览器经常使用**电子欺骗**的手段(在用户代理字符串中加入一些错误或误导性信息)欺骗服务器，以达到站点正确访问的目的。

用户代理检测的做法是通过**navigator.userAgent**属性得到代理字符串的值，再通过给该值做正则匹配以达到识别客户端浏览器的目的。

## <a id='section_4' class='chapter'>四、DOM及其拓展</a>

DOM(文档对象模型)是针对HTML和XML文档的一个API，它描绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一部分。

### <a id='section_4_1'>**节点层次**</a>

**(1) Node类型**

DOM1级定义了一个Node接口，JavaScript中的所有节点类型都继承于该类型，因此所有节点类型都共享着相同的基本属性和方法，如下所示:

|   属性/方法名    | 说明   |
| :-----------: | :-----------:  |
| **childNodes** |   获取第一个子节点|
| parentNode |  获取父节点|
| previousSibling |  获取上一个兄弟节点|
| nextSibling |  获取下一个兄弟节点|
| hasChildNodes() | 返回是否包含子节点|
| appendChild() |  在最后插入子节点|
| replaceChild() | 代替子节点|
| removeChild() |  删除子节点|
| insertBefore() | 在特定节点前面插入|

**(2) Document类型**

JavaScript通过Document类型表示文档，Document节点nodeType为**9**, nodeName为**#document**，常见的属性及方法如下:

|   属性/方法名    | 说明   |
| :-----------: | :-----------:  |
| body |  指向<body>元素|
| doctype |  指向<!DOCTYPE>元素|
| title |  文档标题|
| url |  文档所在的完整url |
| referer |  来源页面的URL|
| getElementById() |  取得id对应的元素|
| getElementsByTagName() |  取得某个标签的元素集合|


**(3) Element类型**

Element类型是Web编程中最常用的类型之一，因为它提供了对元素标签名、子节点及特性的访问，它的nodeType为**1**, nodeName为**元素的标签名**。

* HTML元素

所有HTML元素都由HTMLElement类型表示，HTML元素继承于Element并添加了一些默认属性，因此可以直接访问这些属性，如下所示:

	var div = document.getElementById('myDiv');
	console.log(div.id);
	console.log(div.className);
	console.log(div.title);
	console.log(div.lang);
	console.log(div.dir);

* 取得属性

在使用自定义属性的时候，可以通过getAttribute()方法取得该属性的值:

	var div = document.getElementById('myDiv');
	console.log(div.getAttribute('data-custom'));

* 设置属性

与getAttribute()相对应:
	
	div.setAttribute('data-custom', 'hehe');

* attributes属性

常用方法如下:

|   属性/方法名    | 说明   |
| :-----------: | :-----------:  |
| getNamedItem(name) |  获得nodeName为name的节点|
| removeNamedItem(name) |  从属性列表移除nodeName为name的节点|
| setNamedItem(name) |  添加节点，并以nodeName作为索引|
| item(pos) |  返回位于数字pos位置处的节点|

	var id = element.attributes.getNamedItem('id').nodeValue;
	element.attributes[i].nodeName;
	element.attributes[i].nodeValue;

* 创建元素

使用document.createElement()创建新的元素:
	
	var div = document.createElement('div');
	div.id = 'myDiv';
	div.className = 'box';
	document.body.appendChild(div);

**(4) Text类型**

文本节点由Text表示，它的nodeType为**3**, nodeName为**#text**, 创建方法如下:

	var element = document.createElement('div');
	element.className = 'msg';

	var textNode = document.createTextNode("<strong>hello</stong>");
	element.appendChild(textNode);

	document.body.append(element);
	
**(5) Attr类型**

元素属性在DOM中以Attr类型表示，它的nodeType为**2**，nodeName是**属性的名称**创建方法如下:

	var attr = document.createAttribute('align');
	attr.value = 'left';

	element.setAttribute(attr);
	element.getAttribute('align');
	element.attributes['align'].nodeValue;

**(6) DocumentFragment类型**

在所有的节点类型中，只有DocumentFragment在文档中没有对应的标记。DOM规定DocumentFragment是一种“轻量级文档”，可以包含和控制节点，但却不会像完整的文档那样占用额外的资源。nodeType为**11**, nodeName为**#document-fragment**。

	var fragment = document.createDocumentFragment();
	var ul = document.getElementById('myList');
	var li = null;

	for(var i = 0; i < 10; i++) {
		li = document.createElement('li');
		li.appendChild(document.createTextNode('Item ' + (i+1)));
		fragment.appendChild(li);
	}

	ul.appendChild(fragment);

由此也可以看出，使用DocumentFragment可以减少因频繁插入dom元素而带来的资源消耗，减少了dom结构的重排次数，从而得到了更高效的性能提升。

**(7) 其它类型**

其它类型还包括**Comment类型**、**CDATASelection**和**DocumentType类型**，因使用频率较低，故不做总结。


### <a id='section_4_2'>**DOM操作技术**</a>

**(1) 动态脚本**

	function loadScriptString(code) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		try{
			script.appendChild(document.createTextNode(code));
		} catch(ex) {
			script.text = code;
		}
		document.body.appendChild(script);
	}

**(2) 动态样式**

	function loadStyles(css) {
		var style = document.createElement('style');
		style.type = 'text/css';
		try{
			style.appendChild(document.createTextNode(css));
		} catch(ex) {
			style.styleSheet.cssText = css;
		}
		document.getElementsByTagName('head')[0].appendChild(style);
	}

**(3) 操作表格**

	var table = document.createElement('table');
	table.border = 1;
	table.width = '100%';

	var tbody = document.createElement('tbody');
	table.appendChild(tbody);

	tbody.insertRow(0);
	tbody.rows[0].insertCell(0);
	tbody.rows[0].cells[0].appendChild(document.createTextNode('cell 1,1'));
	tbody.rows[0].insertCell(1);
	tbody.rows[0].cells[1].appendChild(document.createTextNode('cell 2,1'));

### <a id='section_4_3'>**DOM扩展**</a>

尽管DOM作为API意境非常完善了，但为了实现更多的功能，仍然会有一些标准或专有的扩展。对DOM的主要两个扩展是**Selectors API**和**HTML5**。

**(1) Selectors API**

Selectors API是由W3C发起制定的一个标准，致力于让浏览器原生支持CSS查询。所有实现这一功能的JavaScript库都会写一个基础的CSS解析器，然后再使用已有的DOM方法查询文档并找到匹配的节点。而把这个功能变成原生API后，解析和树查询操作可以在浏览器内部通过编译后的代码完成，极大地改善了性能。

* **querySelector()方法**

接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回null。

	var body = document.querySelector('body');

	var myDIV = document.querySelector('#myDiv');

* **querySelectorAll()方法**

与querySelector()一样，不过返回的是一个NodeList的实例。

	var ems = document.getElementById('myDiv').querySelectorAll('em');

* **matchesSelector()方法**

这个地方接收一个参数，即CSS选择符，如果调用元素与该选择符匹配，返回true；否则，返回false。

	if(document.body.matchesSelector('body.page1')) {
		// true
	}

**(2) HTML5**

* **与类相关的扩充**

getElementsByClassName()方法

	// 获得所有类中包含'username'和'current'的元素，类名先后顺序无所谓
	var name =  document.getElementsByClassName('username current');

* **焦点管理**

H5中添加了DOM焦点的功能，包括**document.activeElement**和**hasFocus()**

	var button = document.getElementById('myBtn');
	button.focus();
	console.log(document.activeElement === button); // true
	console.log(document.hasFocus()); // true

* **HTMLDocument的变化**

H5把**readyState**、**compatMode**和**head**属性添加进标准:
	
	// 文档加载进度
	if(document.readyState == 'complete') {
		// 文档加载完毕
	}
	// 渲染页面模式
	if(document.compatMode == 'CSS1Compat') {
		// 标准模式
	}
	// 文档头部
	var head = document.head || document.getElementsByTagName('head')[0];

* **插入标记**

**innerHTML**和**outerHTML**属性，避免了插入元素时频繁创建节点以及处理节点间关系的繁琐步骤，带来了极大的便利，但是需要谨慎其带来的性能消耗问题。

* **其它**

此外H5还添加了字符集属性、自定义属性和scrollIntoView()等dom相关的属性及方法:

	// 字符集
	console.log(document.charset); //UTF-16
	document.charset = 'UTF-8';

	// 自定义数据属性
	<div id='myDiv' data-appId='1234' data-myName='boxizen'></div>
	var div = document.getElementById('myDiv');
	// 取得自定义属性值
	var appId = div.dataset.appId;
	var myName = div.dataset.myName;
	// 设置自定义属性值
	div.dataset.appId = '12345566';
	div.dataset.myName = 'boxi';

	// 让元素可见
	document.forms[0].scrollIntoView();

## <a id='section_5' class='chapter'>五、事件机制</a>

### <a id='section_5_1'>**事件流**</a>

事件流指的是从页面中接收事件的顺序，在IE和Netscape开发团队中提出了差不多完全相反的事件流的概念，其中IE的事件流是**事件冒泡流**, 而Netscape的事件流是**事件捕获流**。

**(1) 事件冒泡**

IE的事件流称为**事件冒泡**，即事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点(文档)。事件接收的顺序如下(以点击页面中某一div为例):

<img src="/img/posts/js_summary/bubble.png" alt="事件冒泡">

**(2) 事件捕获**

Netscape Communicator团队提出的另一种事件流叫**事件捕获**，它的思想是不太具体的节点应该更早接收到事件，而具体的节点应该最后接收到事件，它的用意在于在事件到达预定目标之前捕获它。事件接收顺序如下:

<img src="/img/posts/js_summary/catch.png" alt="事件捕获">

**(3) DOM事件流**

"DOM2级事件"规定的事件流包括三个阶段: 事件捕获阶段、处于目标阶段和事件冒泡阶段。仍以前面简单的HTML页面为例，单击div元素会按照下图所示的顺序触发事件:

<img src="/img/posts/js_summary/event-w3c.png" alt="DOM事件流">

### <a id='section_5_2'>**事件处理程序**</a>

事件是用户或浏览器自身执行的某个动作，而响应某个事件的函数就叫做**事件处理程序(或事件侦听)**。

**(1) HTML事件处理程序**

在HTML中定义的事件处理程序可以包含要执行的具体动作，也可以调用在页面其它地方定义的脚本:

	<script>
		function showMsg() {
			console.log('Hello World!');
		}
	</script>

	<input type="button" value='Click Me' onclick='showMsg()'>

这种方式有两个缺点，首先是存在**时差问题**, 用户可能会在元素一出现在页面就触发响应的事件，但当时的事件处理程序可能不具备执行条件。另一个缺点是HTML与JavaScript代码**紧密耦合**, 造成维护的困难。

**(2) DOM0级事件处理程序**

通过JavaScript指定事件处理程序就是把一个方法赋值给一个元素的事件处理程序属性。

	<input type="button" value='Click Me' id='btn'>

	<script>
		var btn = document.getElementById('btn');
		btn.onclick = function() {
			console.log(this.id);
		}
	</script>

如此处理，事件处理程序在元素的作用域下运行，this就是当前元素，还有一个好处，可以直接给onclick属性赋值为null删除事件处理程序。

**(3) DOM2级事件处理程序**

DOM2级事件处理程序定义了两个方法用于处理指定和删除事件处理程序的操作: **addEventListener**和**removeEventListener**。
它们都接收三个参数: 时间类型、事件处理方法和一个布尔值(true表示在事件捕获阶段调用事件处理程序，默认为false)。

	<input type="button" value='Click Me' id='btn'>

	<script>
		var btn = document.getElementById('btn');
		// 添加第一个事件监听
		btn.addEventListener('click', function() {
			console.log('click it!');
		}, true);		
		// 添加第二个事件监听
		var clickEvent = function() {
			console.log('hehehe');
		};
		btn.addEventListener('click', clickEvent, true);
		// 删除第二个监听事件
		btn.removeEventListenr('click', clickEvent, true);
	</script>	

这么做有的好处是可以为一个元素添加**多个事件监听**。

IE不支持addEventListener和removeEventListener两个方法，但是它却实现了类似的两个方法**attachEvent**和**detachEvent**，由于IE8及其更早的版本只支持事件冒泡，所以通过attachEvent添加的事件处理程序都会被添加到冒泡阶段。

	<input type="button" value='Click Me' id='btn'>

	<script>
		var btn = document.getElementById('btn');
		var handler = function() {
			console.log('click');
		};
		// 添加事件监听
		btn.attachEvent('onclick', handler);
		// 删除监听事件
		btn.detachEvent('onclick', handler);
	</script>		
	

需要注意的是，与DOM0的事件处理程序不同的是，DOM0事件处理程序会在其所属元素的作用域内运行，而在使用attachEvent()情况下，事件处理程序会在全局作用域内运行。并且在使用attachEvent()为某元素添加多个事件的时候，当事件触发时，会以添加事件时**相反的**顺序执行事件处理程序，这一点是跟DOM1事件处理不同的。

**(4) 跨浏览器事件处理程序**

根据上述事件处理程序的特点，可以写出如下兼容各个浏览器的事件处理程序:

	var EventUtil = {
		addHandler: function(element, type, handler) {
			if(element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if(element.attachEvent) {
				element.attachEvent('on'+type, handler);
			} else {
				element.['on' + type] = handler;
			}
 		},		
		removeHandler: fuction(element, type, handler) {
			if(element.removeListener) {
				element.removeListener(type, handler, false);
			} else if(element.detachEvent) {
				element.detach('on' + type, handler);
			} else {
				element['on' + type] = null;
			}	
		}
	}


### <a id='section_5_3'>**事件对象**</a>

**(1) DOM事件对象**

|   属性/方法    | 类型   | 读/写 | 说明 |
| :-----------: | :-----------:  | :-----------:  | :-----------:  |
| bubbles| Boolean| 只读| 表明事件是否冒泡 |
| cancelable| Boolean| 只读| 表明是否可以取消事件的默认行为 |
| currentTarget| Element| 只读| 其事件处理程序当前正在处理事件的那个元素 |
| detail| Integer| 只读| 与事件相关的细节信息 |
| eventPhase| Integer| 只读| 调用事件处理程序的阶段:1捕获,2:目标,3:冒泡 |
| preventDefault()| Function| 只读| 取消默认行为，如果cancelable为true，则可调用该方法 |
| stopPropagation()| Function| 只读| 取消事件的进一步捕获或冒泡，如果bubles为true，则可调用该方法 |
| target| Element| 只读| 事件的目标 |
| type| String| 只读| 被触发的事件类型 |
| ... | ... | ... | ... |

**(2) IE中的事件对象**

|   属性/方法    | 类型   | 读/写 | 说明 |
| :-----------: | :-----------:  | :-----------:  | :-----------:  |
| cancelBubble| Boolean| 读/写| 默认为false，但将其设置为true就可以取消事件冒泡,同**stopPropagation()** |
| returnValue| Boolean| 读/写| 默认为true，但将其设置为false就可以取消默认行为,同**preventDefault()** |
| srcElement| Element| 只读| 事件的目标,同**target** |
| type | String| 只读| 被触发的事件类型 |

**(3) 跨浏览器的事件对象**

	var EventUtil = {
		addHandler: funcrion(element, type, handler) {
			// 参见上一部分
		}, 
		removeHandler: function(element, type, handler) {
			// 参见上一部分
		},
		getEvent: function(event) {
			return event ? event : window.event;
		},
		getTarget: function(event) {
			return event.target || event.srcElement;
		},
		preventDefault: function(event) {
			if(event.preventDefault) {

				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		stopPropagation: function(event) {
			if(event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		}
	}

### <a id='section_5_4'>**事件类型**</a>

|   事件    | 类型   | 说明 |
| :-----------: | :-----------:  | :-----------:  |
| load | UI | 页面完全加载触发(包括图像、js、css等外部资源)|
| unload | UI | 文档被卸载后触发(用户从一个页面切换到另一个)|
| resize | UI | 浏览器窗口大小调整触发|
| scroll | UI | 滚动条滚动时触发，作用在windows对象上|
| focus | 焦点 | 元素获得焦点时触发|
| unfocus | 焦点 | 元素失去焦点时触发|
| click | 鼠标 | 点击时触发|
| dblclick | 鼠标 | 双击时触发|
| mousedown | 鼠标 | 按下鼠标时触发|
| mouseup | 鼠标 | 释放鼠标时触发|
| mouseenter | 鼠标 | 鼠标移到特定元素时触发|
| mouseleave | 鼠标 | 鼠标离开特定元素时触发|
| mousemove | 鼠标 | 移动鼠标时时触发|
| mousewheel | 滚轮 | 滚动滚轮时触发|
| keydown | 键盘 | 用户按下键盘上任意键时触发，返回键盘的代码|
| keyup | 键盘 | 用户释放键盘上任意键时触发|
| keypress | 键盘 | 用户按下键盘上任意键时触发，返回ASCII字符|
| hashchange | HTML5 | hash值改变时触发|
| orientationchange | 设备 | safari查看模式旋转时触发|
| deviceorientation | 设备 | 设备方向变化时触发|
| devicemotion | 设备 | 设备移动时时触发|

### <a id='section_5_5'>**事件代理和委托**</a>

在JavaScript中，添加到页面上事件的数量直接影响页面的整体运行性能，导致这一问题原因主要是，每一个**函数都是对象**，都会占用内存，内存中对象越多，性能就越差。

对“事件处理程序过多”问题的解决方案就是**事件委托**，它利用了**事件冒泡**，达到了只指定一个事件处理程序，就可以管理某一类型的所有事件。

如给某一列表下所以选项添加事件可以这么写:

	var list = document.getElementById('myLinks');

	EventUtil.addHandler(list, 'click', function(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		switch(target.id) {
			case 'dosomething':
				 document.title = "I changed the document's title";
				 break;
			case 'gosomewhere':
				 console.log('go somewhere');
				 break;
		    case 'sayhi':
		    	 console.log('hi');
		    	 break;
		}
	});

使用事件委托/代理的优点主要有:

* 可以大量节省内存占用，减少事件注册，比如在table上代理所有td的click事件，从而提升页面的整体运行性能。

* 可以实现新增子对象时的动态事件绑定，不需要再给新增的元素单独添加事件。

### <a id='section_5_6'>**事件模拟**</a>

**(1) DOM中的事件模拟**

	var btn = document.getElementById('myBtn');
	// 创建事件对象
	var event = document.createEvent('MouseEvents');
	// 初始化事件对象
	event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	// 触发事件
	btn.dispatchEvent(event);

**(2) IE中的事件模拟**

	var textbox = document.getElementById('myTextBox');
	// 创建事件对象
	var event = document.createEventObject();
	// 初始化事件对象
	event.altKey = false;
	event.ctrlKey = false;
	event.shiftKey = false;
	event.keyCode = 65;
	// 触发事件
	textbox.fireEvent('onkeypress', event);

## <a id='section_6' class='chapter'>六、错误处理机制</a>

### <a id='section_6_1'>**错误处理**</a>

由于JavaScript本身是动态语言，且多年来一直没有固定的开发工具，因此人们普遍认为它是一种最难调试的编程语言，抛出的错误没有上下文信息，让人摸不着头脑，而在ECMAScript3中引入了一套错误处理机制，意在帮助开发者更好地处理错误，更好地避免错误的发生。

ECMA-262定义了如下7种错误:

* Error, 基类型，其他错误类型都继承自该类型。

* EvalError, 在使用eval()函数时发生异常时抛出。

* RangeError, 数值超出相应范围时触发。

* ReferenceError, 在找不到对象的情况下抛出。

* SyntaxError, 语法错误时抛出。

* TypeError, 在执行特定类型操作的时候，变量类型不符合要求时抛出。

* URIError, URI格式错误时抛出。

**(1) try-catch语句**

JavaScript中处理错误标准的方式。

	try{
		someFunction();
	} catch(error) {
		if(error instanceof TypeError) {
			// 处理类型错误
		} else if(error instanceof ReferenceError) {
			// 处理引用错误
		} else {
			// 其他类型错误
		}
	}

**(2) throw语句**

与try-catch语句相配，用于随时抛出自定义错误。

	function CustomError(message) {
		this.name = 'CustomError';
		this.message = message;
	}

	CustomError.prototype = new Error();

	throw new CustomError('my massage');

**(3) 错误(error)事件**

任何没有通过try-catch处理的错误都会触发window对象的error事件，onerror事件处理程序不会创建event对象，但它接收三个参数: **错误消息**、**错误所在URL**和**错误行号**。

	window.onerror = function(message, url, line) {
		alert(message);
		// 阻止浏览器默认行为
		return false;
	}

**(4) 错误记录到服务器**

开发Web应用程序过程中一种常见的做法，就是集中保存错误日志，以便找重要错误的原因。而在复杂的程序员，通过把前端JavaScript错误集中汇报给后端也显得同样重要，常见的做法如下:

	function logError(sev, msg) {
		var img = new Image();
		img.src = 'log.php?sev=' + encodeURIComponent(sev) + '&msg=' + encodeURIComponent(msg);
	}

	try{
		// 可能出错的操作
	} catch(ex) {
		logError('nonfatal', ex.message);
	}

使用Image发送请求的好处有:

* 所有浏览器都支持Image对象，包括那些不支持XMLHttpRequest对象的浏览器

* 可以避免跨域限制。

* 在记录错误过程中出问题的概率比较低。

### <a id='section_6_2'>**错误调试**</a>

**(1) 控制台输出**

主要手段是通过console.log将信息输出至控制台中。

	function log(message) {
		if(typeof console == 'object') {
			console.log(message);
		} else if(typeof opera == 'object') {
			opera.postError(message);
		} 
	}
	log('error');

**(2) 页面输出**

在页面上直接输出错误信息

	function log(message) {
		var console = document.getElementById('debuginfo');
		if(console === null) {
			console = document.getElementById('div');
			console.id = 'debuginfo';
			console.style.border = '1px solid #000';
			.....
			document.body.appendChild(console);
		}
		console.innerHTML += '<p>' + message + '</p>';
	}

**(3) 错误抛出**

	function assert(condition, message) {
		if(!condition) {
			throw new Error(message);
		}
	}

	assert(typeof num1 == 'number' && obj1 instanceof Number, '类型错误');


## <a id='section_7' class='chapter'>七、JSON和AJAX</a>

### <a id='section_7_1'>**JSON**</a>

曾经有一段时间，XML是互联网上传输结构化数据的事实标准，然而业界一直不乏质疑XML的声音，他们认为XML结构臃肿，操作繁琐，而JSON的出现，让这些开发者看到了更加轻量、操作便捷的数据交换格式，并开始广泛使用这种结构化数据，渐渐地，JSON已经取代了XML，成为时下在互联网上最流行的数据传输格式。

**(1) 语法**

JSON支持**简单值**、**对象**和**数组**三种类型的值:
	
	// 简单值
	"Hello World!"

	// 对象
	{
		"name": "boxizen",
		"age": 24
	}

	// 数组
	[
		{
			"name": "boxizen",
			"age": 24
		},
		{
			"name": "Lisi",
			"age": 42
		}
	]

需要注意的是，JSON对象中属性名必须加上双引号。

**(2) 解析与序列化**

JSON对象有两个方法: **stringify()**和**parse()**, 这两个方法分别用于**把JavaScript对象序列化为JSON字符串**和**把JSON字符串解析为JavaScript对象**。

### <a id='section_7_2'>**XMLHttpRequest**</a>

Ajax的技术核心是**XMLHttpRequest**，这是由微软首先引入的一个特性，其他浏览器提供商后来都提供了相同的实现

**(1) XMLHttpRequest基本用法**
	
**XHR创建:**

	function createXHR() {
		var xhr;
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if(window.ActiveXObject) {
			var activexName = [ "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ]; 
			for(var i = 0; i < activexName.length; i++) {
				try {
					xhr = new ActiveXObject(activexName[i]);
					if(xhr) {
						break;
					}
				} catch(e) {

				}
			}
		}

		return xhr;
	}


**get请求:**

	function get() {
		var req = createXHR();
		if(req) {
			req.open("GET", "http://xxxxx", true);
			req.onreadystatechange = function() {
				// 0未初始化，1启动，2发送，3接收部分数据，4接收到全部响应数据
				if(req.readState == 4) {
					if(req.status == 200) {
						console.log(req.responseText);
					} else {
						alert('error');
					}
				}
			}
			req.send(null);
		}
	}


**post请求:**

	function post() {
		var req = createXHR();
		if(req) {			
			req.open('POST', 'http://xxxx', true);
			req.onreadystatechange = function() {
				if(req.readyState == 4) {
					if(req.status == 200) {
							console.log(req.responseText);
					} else {
						alert('error');
					}
				}
			}
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			req.send(serialize(form));
		}
	}

**(2) XMLHttpRequest扩展**

鉴于XMLHttpRequest已经得到广泛使用，成为了事实标准，W3C也着手制定相应标准以规范其行为，XHR1级把已有的XHR对象的实现细节描述了出来，而XHR2级将继续拓展功能。

**FormData**
		
	// 基本使用
	var data = new FormData();
	data.append('name', 'boxizen');
	
	// 直接传入表单元素
	var data = new FormData(document.forms[0]);

	// 使用案例
	....
	xhr.open('post', 'http://xxxx', true);
	xhr.send(new FormData(document.forms[0]));

使用FormData的方便之处在于不必明确地在XHR对象上设置请求头部，XHR对象能够识别传入的数据类型是FormData的实例，并配置适当的头部信息。

**超时设定**

IE8为XHR对象添加了timeout属性，表示请求在等待响应多少毫秒后就停止，同时会触发ontimeout事件，而此功能后来也被收入了XHR2级规范中。

	// 使用案例
	....
	xhr.open('post', 'http://xxxx', true);
	// 超时时间设为1秒
	xhr.timeout = 1000;
	xhr.ontimeout = function() {
		alert('timeout');
	}
	xhr.send(new FormData(document.forms[0]));	


### <a id='section_7_3'>**跨域资源共享**</a>

通过Ajax通信的一个主要限制，来自于跨域安全策略(同源策略)，即XHR对象只能访问同源(相同的协议、相同的域名和相同的端口)下的资源。这种安全策略从一定程度上可以防止恶意行为的出现，但是合理的跨域请求在某些开发场景下却显得格外重要。

为了解决**跨域资源**访问问题，W3C提出了**CORS**的工作草案, 即Cross-Origin Resource Sharing，它的基本思想是通过自定义的HTTP头部让浏览器和服务器进行沟通，从而决定请求或响应是应该成功还是失败的:

	// 客户端发送Origin的请求头
	Origin: http://bignews.boxizen.com/

	// 服务器通过Access-Control-Allow-Origin请求判断该请求是否被允许, 
	// 如果回应与Origin值相同的或者是"*"的值，则表示该请求被允许
	Access-Control-Allow-Origin: http://bignews.boxizen.com/

**(1) IE对CORS的实现**

IE为实现跨域请求，引入了**XDR**对象，即XDomainRequest, 它与XHR不同之处在于:

* cookie不会随请求发送，也不会随响应返回
* 只能设置头部信息中的Content-Type字段
* 不能访问响应的头部信息
* 只支持get/post方法

具体实现如下:

	var xdr = new XDomainRequest();
	xdr.onload = function() {
		console.log(xdr.responseText);
	}
	xdr.onerror = function() {
		alert('errors!');
	}
	// 与XHR不同的是，XDR的open方法只接收两个参数
	xdr.open('get', 'http://bignews.boxizen.com/ajax/');
	xdr.send(null);

**(2) 其他浏览器对CORS的实现**

其他的浏览器通过对XHR对象实现了跨域的支持，不过出现了一些限制：

* 不能通过setRequestHeader()设置自定义头部
* 不能发送和接收cookie
* 调用getAllRequestHeaders()总会返回空字符串

**(3) 跨浏览器的CORS**

每个浏览器对CORS的支持程度都不一样，但是所有的浏览器都支持简单的(不带自定义头部信息和凭据的)请求，因此有必要实现一套跨浏览器方案的跨域请求。通过判断XHR中是否包含**"withCredentials"**属性来判断是否支持CORS跨域。
	
创建跨浏览器的CORS请求对象:

	function createCORSRequest(method, url) {
		var xhr = new XMLHttpRequest();
		if("withCredentials" in xhr) {
			xhr.open(method, url, true);
		} else if(window.XDomainRequest) {
			vxhr = new XDomainRequest();
			vxhr.open(method, url);
			xhr = vxhr
		} else {
			xhr = null;
		}
	}

发送CORS请求:

	var request = createCORSRequest('get', 'http://bignews.boxizen.com/ajax');
	if(request) {
		request.onload = function() {
			console.log(request.responseText);
		}
		request.send();
	}

### <a id='section_7_4'>**其他跨域技术**</a>

**(1) 图像Ping**

我们知道，一个网页可以加载任何网页中的图像资源，利用这一点可以实现简单的跨域方式，这也是在线广告跟踪浏览量的主要方式。

	var img = new Image();
	img.onload = function() {
		alert('done!');		
	}
	img.src = 'http://bignews.boxizen.com/statistics';

这种方式有两种主要缺点:

* 只能发送Get请求
* 不能获得服务器端响应的文本信息

**(2) JSONP**

 它由两部分组成：**回调函数**和**json数据**，格式看起来是这样的: 

 **callback({"name": "boxizen"})**

	
	function handleReponse(response) {
		alert('name:' + response.name);
	}

	var script = document.createElement('script');
	script.src = 'http://bignews.boxizen.com/jsonp';
	document.body.insertBefore(script, document.body.firstChild);

使用JSONP一个最大的优点是可以访问服务器端的响应，支持浏览器端和服务器端的双向通信。而它的缺点也是显而易见的:

* JSONP是从其他域中加载代码执行，如果其他域不安全，可能会在响应中夹带一些恶意代码，因此在使用不是你自己运维的web服务时，一定要保证它安全可靠
* 确定JSONP请求是否失败并不容易。

## <a id='section_8' class='chapter'>八、客户端存储</a>

### <a id='section_8_1'>**离线检测**</a>

HTML5中定义了一个**navigator.onLine**属性，用于监测设备是否处理在线状态，为**true**即在线，为**false**即离线。

	if(navigator.onLine) {
		// 正常工作
	} else {
		// 执行离线状态时的任务
	}

此外，HTML5还定义了两个事件:**online**和**offline**，当网络从离线变为在线或者从在线变为离线时分别触发这两个事件。

	EventUtil.addHandler(window, 'online', function() {
		alert('online');
	});

	EventUtil.addHandler(window, 'offline', function() {
		alert('offline');
	});

判断应用是否在线一般的做法是，在页面加载后，先通过navigator.onLine取得初始的状态，然后再通过上述两个事件确定网络的变化状态。

### <a id='section_8_2'>**应用缓存**</a>

HTML5的应用缓存(application cache),简称为appcache，是专门为开发离线Web应用设计的，是从浏览器缓存中分出来的一块缓存区。想使用这个缓存保存数据，可以使用一个**描述文件(manifest file)**，列出要下载和缓存的资源。

	CACHE MANIFEST
	#Comment

	file.js
	file.css

然后再将描述文件域页面关联起来，可以在<html>中的manifest属性中指定这个文件的路径，这个文件的MIME类型必须是**text/cache-manifest**:

	<html manifest="/offline.manifest">

此外JavaScript中还提供了**applicationCache**的对象对离线资源进行操作和管理，此处略去。


### <a id='section_8_3'>**客户端存储**</a>

随着WebApp的出现，产生了对能够直接在客户端上存储用户信息能力的要求。

**(1) Cookie**

Cookie最初是在客户端存储会话信息的。

**(2) IE用户数据**

**(3) Web存储机制**

* sessionStorage对象

* globalStorage对象

* localStorage对象

**(4) IndexedDB**


<script type='text/javascript'>
	$(function() {		
		/* 章节数量 */ 
		var chapterNum = $('.chapter').length;

		/* 监听滚动事件 */
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop();
			// 判断滚动部分是否超出banner高度
			if(scrollTop > 350) {
				$('.content').removeClass('hidden');
			} else {
				$('.content').addClass('hidden');
			}
			for(var i = 0; i < chapterNum; i++) {
				var num = parseInt(i) + parseInt(1);
				var sectionTop = $('#section_'+num).offset().top;
				if(sectionTop <= scrollTop) {					
					$('.content-menu').removeClass('active');
					$('#menu_' + num).addClass('active');
				}
			}
		});		
		/* 折叠按钮 */
		$('.collapse-btn').click(function() {
			var btn = $(this);
			if(btn.hasClass('opened')) {
				btn.removeClass('opened');
				btn.text('+');
				btn.siblings('.child-content').addClass('hidden');
			} else {
                btn.addClass('opened');
				btn.text('-');
				btn.siblings('.child-content').removeClass('hidden');
			}
			return false;
		});
	});
</script>