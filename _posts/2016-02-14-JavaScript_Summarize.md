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
