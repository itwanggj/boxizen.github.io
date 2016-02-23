---
layout : post
title : JavaScript知识梳理
category : JavaScript
tags : JavaScript 前端
id: 2016021401
---

> 本文列举了JavaScript中常见的语言特性，总结并分析了其中的奥妙与原理，以巩固和加深自己对知识的理解。

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
	<li><a href='#' class='collapse-btn opened'>-</a><a href="#section_1" class='content-menu' id='menu_1'>作用域和内存管理</a>
		<ul class="child-content">
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
	<li><a href='#' class='collapse-btn opened'>-</a><a href="#section_2" class='content-menu' id='menu_2'>面向对象编程</a>
		<ul class="child-content">
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
	<li><a href='#' class='collapse-btn opened'>-</a><a href="#section_3" class='content-menu' id='menu_3'>BOM和客户端检测</a>
		<ul class="child-content">
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
	<li><a href='#' class='collapse-btn opened'>-</a><a href="#section_4" class='content-menu' id='menu_4'>DOM及其拓展</a>
		<ul class="child-content">
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
	<li><a href='#' class='collapse-btn opened'>-</a><a href="#section_6">事件机制</a>
		<ul class="child-content">
			<li>
				<a href="#section_5_1">事件流</a>				
			</li>
			<li>
				<a href="#section_5_2">事件处理</a>				
			</li>
			<li>
				<a href="#section_5_3">事件对象</a>				
			</li>
			<li>
				<a href="#section_5_5">内存和性能</a>				
			</li>
			<li>
				<a href="#section_5_6">模拟事件</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn opened'>-</a><a href="#section_7">错误处理机制</a></li>
	<li><a href='#' class='collapse-btn opened'>-</a><a href="#section_8">JSON和AJAX</a></li>
	<li><a href='#' class='collapse-btn opened'>-</a><a href="#section_9">客户端存储</a></li>
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