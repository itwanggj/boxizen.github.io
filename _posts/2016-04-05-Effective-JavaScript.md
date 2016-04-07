---
layout : post
title : 编写高质量JavaScript代码
category : JavaScript 前端
tags : JavaScript 前端
id: 2016040501
---

> 汇总《Effective JavaScript》68个有效方法。

## JavaScript特性

### 第1条: JavaScript版本

JavaScript在1997年正式成为国际标准(ECMAScript)，至今共经历了多个版本，如1999年定稿的ES3、2009年发布的ES5和2015年确定的ES6等，不同平台上支持的版本有差异，因此确定当前运行环境所支持的ES版本至关重要。

ES5引入了一种版本控制的考量－严格模式(strict mode)，用于禁止使用一些JavaScript语言中问题较多或易于出错的特性，这种写法向后兼容:

	'use strict';
	function f() {
		// 执行函数代码
	}

### 第2条: JavaScript浮点数

不同于其他编程语言，JavaScript的数值型数据类型只有一种：双精度浮点数(double－由IEEE754标准制定的64位编码数字，可以表示高达53位精度的整数)，对于浮点数的运算应该时刻保持警惕，它们的运算并不精确，如:
	
	0.1 + 0.2; // 0.30000000000000004

解决办法是尽可能地采用整数值运算，因为整数在表示时不需要摄入。

### 第3条: 隐式的强制转换

JavaScript对类型错误出奇宽容，许多在其他动态类型语言中的表达式被认为是错误的，而在JavaScript中却可以正确地运行。