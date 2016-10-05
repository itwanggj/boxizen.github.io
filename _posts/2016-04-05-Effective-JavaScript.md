---
layout : post
title : 编写高质量JavaScript代码
category : JavaScript 前端
tags : JavaScript 前端
id: 2016040501
---

> 汇总《Effective JavaScript》68个有效方法。

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

## 一、JavaScript特性

### **第1条: JavaScript版本**

JavaScript在1997年正式成为国际标准(ECMAScript)，至今共经历了多个版本，如1999年定稿的ES3、2009年发布的ES5和2015年确定的ES6等，不同平台上支持的版本有差异，因此确定当前运行环境所支持的ES版本至关重要。

ES5引入了一种版本控制的考量－严格模式(strict mode)，用于禁止使用一些JavaScript语言中问题较多或易于出错的特性，这种写法向后兼容:

	'use strict';
	function f() {
		// 执行函数代码
	}

### **第2条: JavaScript浮点数**

不同于其他编程语言，JavaScript的数值型数据类型只有一种：双精度浮点数(double－由IEEE754标准制定的64位编码数字，可以表示高达53位精度的整数)，对于浮点数的运算应该时刻保持警惕，它们的运算并不精确，如:
	
	0.1 + 0.2; // 0.30000000000000004

解决办法是尽可能地采用整数值运算，因为整数在表示时不需要摄入。

### **第3条: 隐式的强制转换**

JavaScript对类型错误出奇地/宽容，许多在其他动态类型语言中的表达式被认为是错误的，而在JavaScript中却可以正确地运行。
如算术运算符 -、 *、 / 和 ％ 在计算前会尝试将其参数转换为数字。
	
	// 判断是否为NaN
	function isReallyNaN(x) {
		return x !== x;
	}


当一个对象存在toString()和valueOf()方法时，在执行+运算时默认调用的是valueOf()方法。

	var obj = {
		toString: function() {
			return 'string method';
		},
		valueOf: function() {
			return 0;
		}
	}
	console.log('obj: ' + obj); // obj: 0

JavaScript中有7个假值: false、0、－0、""、NaN、null和undefined，其他所有的值均为真值。

	// 此函数忽略任何为假值的参数
	function point(x, y) {
		if(!x) {
			x = 320;
		}
		if(!y) {
			y = 240;
		}
		return {x: x, y: y};
	}

检查参数是否为undefined更为严格的方式是使用typeof或者和undefined比较

	// typeof判断
	if(typeof x === 'undefined') {...}
	
	// 和undefined比较
	if(x === undefined) {...}

### **第4条: 原始类型优于封装对象**

除了对象以外，JavaScript有5个原始值类型：布尔值、数字、字符串、null和undefined。

当作相等比较时，原始类型的封装对象与其原始值行为不一样。

	var s1 = new String('hello');
	var s2 = new String('hello');
	s1 === s2; // false

	var s3 = 'hello';
	var s4 = 'hello';
	s3 === s4; // true

获取和设置原始类型值的属性会隐式地创建封装对象，因此对原始类型设置属性是没有意义的。

	'hello'.someProperty = 17;
	'hello'.someProperty; // undefined;

### **第5条: 避免对混合类型使用==运算符**

当参数类型不同时，＝＝运算符应用了一套难以理解的隐式强制类型转换规则，如下所示:


|   参数类型1    |  参数类型2   |  强制转换 |
| :-----------: | :-----------:  | :-------: |
| null| undefined| 不转换，总是返回true|
| null或undefined | 其他任何非null或undefined的类型 | 不转换，总是返回false |
| 原始类型: string、number或boolean | Date对象 | 原始类型转换为数字；Date对象转换为原始类型(优先尝试toString，再尝试valueOf) |
| 原始类型: string、number或boolean | 非Date对象 | 原始类型转换为数字；将非Date对象转换为原始类型(优先尝试valueOf，再尝试toString) |
| 原始类型: string、number或boolean | 原始类型: string、number或boolean | 将原始类型转换为数字 |

==运算符应用的转换规则难以理解，在比较不同类型的值时，可使用显示强制转换使程序的行为更为清晰。

### **第6条: 了解分号插入的局限**

 在以 ( 、 [ 、 + 、 － 、 或 / 字符开头的语句前绝不能省略分号。

 当脚本连接的时候，在脚本之间显示地插入分号。

 在return、throw、break、continue、++或--的参数之前不能换行。

### **第7条: 视字符串为16位的代码单元序列**
略

## 二、变量作用域

### **第8、9条: 尽量少用全局对象，始终声明局部变量**

在JavaScript中，定义全局变量会污染共享的公共命名空间，并可能导致意外的命名冲突。全局变量不利于模块化，因为它会导致程序中独立组件间的不必要耦合

因此应该尽可能避免声明全局变量，转而使用局部变量取代。

### **第10条: 避免使用with**

程序经常需要对单个对象依次调用一系列方法，**with**语句的动机在于方便地避免对对象的重复引用，而这种方便却是以不可靠和低效率为代价的。

在with语句中使用某变量时，虽然会在with对象的作用域中查找是否存在该变量，如果存在，则使用with对象中的变量，否则会在上一层作用域中查找该变量，这种做法导致了变量容易混淆和查找效率低两种后果。

因此应该尽可能避免使用with语句，可通过**使用简单的变量名代替重复访问的对象**和**显示绑定局部变量到对象属性上**两种方式取代with语句。

**变量名代替重复访问的对象:**

	function status(info) {
		var w = new Widget();
		w.setBackground('blue');
		w.setForeground('white');
		w.addText('status:' + info);
		w.show();
	}

**显示绑定局部变量到对象属性上:**

	function f(x, y) {
		var min = Math.min, round = Math.round, sqrt = Math.sqrt;
		return min(round(x), sqrt(y));
	}

### **第11条: 熟练使用闭包**

闭包是JavaScript中的特性，有如下三个特点：

**1. 允许引用在当前函数外定义的变量:**

	function makeSandwich() {
		var magicIngredient = 'peanut butter';
		function make(filling) {
			return magicIngredient + ' and ' + filling;
		}
		return make('jelly');
	}

**2. 即使外部函数已经返回，当前函数仍然可以引用在外部函数所定义的变量:**	

	function sandwichMaker() {
		var magicIngredient = 'peanut butter';
		function make(filling) {
			return magicIngredient + ' and ' + filling;
		}
		return make;
	}
	var f = sandwichMaker();
	f('jelly');

**3. 闭包可以更新外部变量的值:**	

	function box() {
		var val = undefined;
		return {
			set: function(newVal) {
				val = newVal;
			},
			get: function() {
				return val;
			},
			type: function() {
				return typeof val;
			}
		}
	}
	var b = box();
	b.type(); // undefined;
	b.set(98.6);
	b.get(); // 98.6
	b.type(); // 'number'

### **第12条: 理解变量声明提升**

在代码块中的变量声明会被隐式地提升到封闭函数的顶部，我们称之为**变量提升**。

需要注意的是JavaScript没有块级作用域，但其中一个例外是**try-catch**语句:

	function test() {
		var x = 'var', result = [];
		result.push(x);
		try{
			throw 'exception';
		} catch(x) {
			x = 'catch';
		}
		result.push(x);
		return result;
	}
	test(); // ['var', 'var']

### **第13条: 使用立即调用的函数表达式创建局部作用域**

	function wrapElements(a) {
		var result = [], i, n;
		for(i = 0, n = a.length; i < n; i++) {
			result[i] = (function(i) {
				return a[i];
			})(i);
		}
		return result;
	}
	var w = wrapElements([10,11,12,13,43]);
	w[0]; // 10

### **第14条: 当心命名函数表达式笨拙的作用域**

### **第15条: 当心局部块函数声明笨拙的作用域**

### **第16条: 避免使用eval创建局部变量**

eval函数容易污染调用者的作用域，如下:

	var y = 'global';
	function test(x) {
		if(x) {
			eval('var y = "local";'); // 动态绑定
		}
		return y;
	}
	test(true); // local
	test(false); // global

保证eval函数不影响外部作用域的一个方法是在一个明确的嵌套作用域中运行它，如:

	var y = 'global';
	function test(src) {
		(function(){
			eval(src);
		})();
		return y;
	}

	test('var y = "local";'); // global
	test('var z = "local";'); // global

### **第17条: 间接调用eval函数优于直接调用**

## 三、使用函数

### **第18条: 函数调用、方法调用及构造函数调用区别**

有别于其他面向对象编程语言，JavaScript 将函数调用、方法调用以及构造函数调用看作是单个构造对象的三种不同的使用模式。

### **第19条: 熟练掌握高阶函数**

所谓高阶函数，即是使用函数作为**参数**或**返回值**的函数，常常用于数组的方法中。

	var names = ["ABC", "dEf", "GHI"];
	var lower = names.map(function(name) {
		return name.toLowerCase();
	})
	lower; // ['abc', 'def', 'ghi']

此外，高阶函数还可用于重构并整合一些相同的模式，如：

	function alphabet() {
		var aIndex = "a".charCodeAt(0);
		var alphabet = "";
		for(var i = 0; i < 26; i++) {
			alphabet += String.fromCharCode(aIndex + i);
		}
	}
	
	function digits() {
		var digits = "";
		for(var i = 0; i < 10; i++) {
			digits += i;
		}
	}

	function random() {
		var random = "";
		for(var i = 0; i < 8; i++) {
			random += String.fromCharCode(Math.floor(Math.random() * 26) + aIndex);
		}
	}
	
上面两个函数创建了不同的字符串，但是他们都有着共同的逻辑，可以通过编写一个高阶函数提取出共用的部分：

	function buildString(n, callback) {
		var result = '';
		for(var i = 0; i < n; i++) {
			result += callback(i);
		}
		return result;
	}

于是上面的三个例子可以简化为:

	var alphabet = buildString(26, function(i) {
		return String.fromCharCode(alIndex + i);
	})

	var digits = buildString(10, function(i) {
		return i;
	})

	var random = buildString(8, function(i) {
		String.fromCharCode(Math.floor(Math.random() * 26)+ aIndex);
	})

### **第20条: 使用call调用方法**

在很多业务场景下，开发者常常需要自定义对象作为某个函数的调用者，首先想到的方法可能是将该函数作为一个新的属性添加到接受者对象中:

	obj.temporary = f;
	var result = obj.temporary(arg1, arg2, arg3);
	delete obj.temporay;

然而这种方法看上去非常别扭而危险，一般而言这种做法是一种不好的实践，可通过 call 解决这样的问题:

	f.call(obj, arg1, arg2, arg3);

### **第21条: 使用apply调用方法**

apply 与 call 类似，区别在于 apply 接收的参数对象为数组对象:

	var scores = getAllScores();
	average.apply(null, scores);

### **第22-24条: arguments对象**

隐式的 arguments 对象可实现可变参数的函数，虽然 arguments 看起来像一个数组，但它并不是一个真正的数组，可通过下面的方法将它转化为真正的数组:

	var args = [].slice.call(arguments, 2);