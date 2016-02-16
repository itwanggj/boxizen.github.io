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

### **原型&&原型链**

在JavaScript中，我们创建的所有函数都含有一个**prototype**的属性，这个属性是一个指针，指向一个对象，这个对象就是**原型对象**。原型对象作用是让该函数派生出来的所有实例均能共享其属性和方法。（*注:实例中有**__pro__**属性，该属性指向原型对象，而原型对象中的constuctor属性泽指向原来的函数。*）

而如果原型对象中的__pro__指向另外一个函数的原型，如此下去，会形成一种链式的结构，也就是**原型链**。

<!--img src="/img/posts/js_summary/prototype.jpg" alt="原型链"-->

### **对象创建**

 **1. 工厂模式** 

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

**2. 构造函数模式** 
	
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

**3. 原型模式** 
	
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

**4. 组合使用构造函数模式和原型模式** 

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


