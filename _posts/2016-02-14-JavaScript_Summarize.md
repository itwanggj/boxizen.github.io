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

## 一、面向对象编程

### 原型&&原型链

在JavaScript中，我们创建的所有函数都含有一个**prototype**的属性，这个属性是一个指针，指向一个对象，这个对象就是**原型对象**。原型对象作用是让该函数派生出来的所有实例均能共享其属性和方法。（*注:实例中有**__pro__**属性，该属性指向原型对象，而原型对象中的constuctor属性泽指向原来的函数。*）

而如果原型对象中的__pro__指向另外一个函数的原型，如此下去，会形成一种链式的结构，也就是**原型链**。

<img src="/img/posts/js_summary/prototype.jpg" alt="原型链">




