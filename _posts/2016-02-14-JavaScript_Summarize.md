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
</style>

## 一、作用域和内存管理

### **作用域&&作用域链**

每一个**执行环境**都有一个与之关联的**变量对象**，环境中定义的变量和函数都保存在这个对象中。

全局函数无法查看局部函数的内部细节，但是局部函数却可以访问上层的执行环境，直至全局执行环境，当需要在局部函数中访问某一属性或方法的时候，如果在当前的变量对象中找不到，就会在上层作用域中查找，直至全局函数，这种组织形式就是**作用域链**。

### **垃圾收集策略**

JavaScript是一门具有自动垃圾回收机制的编程语言，开发人员不必关心内存的分配和回收问题。对于垃圾回收机制的原理很简单，就是找出那些不再继续使用的变量，然后释放其占用的内存即可。

**(1) 标记清除** 

JavaScript中最常用的垃圾收集方式为标记清除，当变量进入环境(如在函数中声明一个变量)时，将此变量标记为"进入环境"，而当其离开环境时(函数执行完毕)，则将其标记为"离开环境"。

标记的方法可以通过翻转某个特殊位来记录一个变量何时进入环境，或者使用一个“进入环境的”变量列表及一个“离开环境的”变量列表来跟踪哪个变量发生了变化。

**(2) 引用计数** 

另一种不太常见的垃圾收集策略叫做引用计数，其含义是跟踪记录每个值被引用的次数，当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是1，相反，如果包含这个引用的变量又取了另外一个值，则这个值的引用次数减1，当这个值引用次数变成0时，则说明无法再访问这个值了，因而其占用的内存空间会被回收。

这种策略有一个致命的缺点在于，当存在两个变量相互引用时，他们的引用次数将永远不为0，因而其占用的内存永远不会被释放。

### **闭包**

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



## 二、面向对象编程

### **原型&&原型链**

在JavaScript中，我们创建的所有函数都含有一个**prototype**的属性，这个属性是一个指针，指向一个对象，这个对象就是**原型对象**。原型对象作用是让该函数派生出来的所有实例均能共享其属性和方法。（*注:实例中有**__proto__**属性，该属性指向原型对象，而原型对象中的constuctor属性泽指向原来的函数。*）

每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针(constructor)，而实例斗包含一个指向原型对象的内部指针(__proto__)。假如让原型对象等于另一个类型的实例，则它将包含一个指向另一个原型对象的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，上述关系依然成立，如此层层递进，就构成了实例和原型的链条，也就是**原型链
**。

<!--img src="/img/posts/js_summary/prototype.jpg" alt="原型链"-->

### **对象创建**

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

### 继承类型

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


## 三、BOM和客户端检测

### **BOM**

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

**检测插件**

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

