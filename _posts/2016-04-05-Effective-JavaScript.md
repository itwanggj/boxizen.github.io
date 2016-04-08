---
layout : post
title : 编写高质量JavaScript代码
category : JavaScript 前端
tags : JavaScript 前端
id: 2016040501
---

> 汇总《Effective JavaScript》68个有效方法。

## JavaScript特性

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


