---
layout : post
title : JavaScript面向对象编程(一):封装
category : JavaScript
tags : JavaScript面向对象 对象 
id: 2014080501
---

> JavaScript是一种基于对象(Object-Based)的语言，在里面我们遇到的许多东西都是对象，它们通常是以键值对的形式存在。
> 但是它又不完全是面向对象的语言，因为它里面没有类的概念。而本文章将会总结并介绍JavaScript中对象的几种构建方法。

## 一、原始的对象构建

#### *1. 对象字面量*
    var person = {
        name : 'boxiZen',
        sex : 'man'
    }

#### *2. Object构造函数*
    var person  =  new Object();
    person.name = 'boxiZen';
    person.sex = 'man';

#### *3. 缺点*
使用以上两种方式创建对象最明显的缺点就是造成代码冗余，假如要创建多个对象，不得不重复写一大堆一样的代码。
为解决该问题，人们开始将工厂模式应用到对象的创建上。


## 二、工厂模式

#### *1. 构建方式*
利用工厂模式封装创建对象的具体细节，对外则提供一个标准的创建接口，通过调用该接口可以批量构建多个相似的对象。具体实现如下:

    function createPerson(name,sex,job){
        var o = new Object();
        o.name  = name;
        o.sex = sex;
        o.job = job;
        o.sayName = function(){
                alert(this.name);
        }
        return o;
    }          
    var person1 = createPerson('boxiZen','man','programmer');
    var person2 = createPerson('tingxuan','female','manager');

#### *2. 不足之处*
工厂模式虽然能够很好地解决为相似的对象编写重复的代码，但是无法解决对象的识别问题，因为我们找不出生成对象的类型，
看不出person1和person2是什么关系。(都是人类)


## 三、构造函数模式

#### *1. 构建方式*
    function Person(name,sex,job){
        this.name = name;
        this.sex = sex;
        this.job = job;
        this.sayName = function() {
            alert(this.name);
        }
    }
    var person1 = new Person('boxiZen','man','programmer');
    var person2 = new Person('tingxuan','female','manager');
    

此时person1与person2会被赋予constructor属性，指向它们的构造函数 :

    alert(person1.constructor == Person); //true
    alert(person1.constructor == person2.constructor); //true
    alert(person1 instanceof Person); //true
    alert(person2 instanceof Person); //true

####  *2. 改进之处*
上面的构造函数中每个方法都会在每个实例上被创建一次，实际上它等同于

    function Person(name,sex,job){
        this.name = name;
        this.sex = sex;
        this.job = job;
        this.sayName = new Function("alert(this.name)");
    }
如此以来，每创建一个对象，都要重复生成一样的函数方法，浪费了内存。
**方法改进**
可以将上面的代码改成如下所示:

    function Person(name,sex,job){
        ....
        this.sayName = sayName;
    }      
    function sayName(){
        alert(this.name);
    } 
这样所有的实例在调用sayName()方法时，相当于调用Person类的静态方法。

####  *３. 不足之处*
看起来几斤完美的改进方法也有它的不足之处，上面的方法实际上是将多个对象回使用到的函数方法提取出来，放在了全局环境中，再在构造函数内部
调用该全局函数。但其实这样子也是非常不妥当的，因为sayName()应该是专属于Person类的方法。What's more.如果对象需要定义许多方法，那么
就需要定义许多个全局函数，这样我们自定义的函数也就毫无封装性可言了。


## 四、原型模式

#### *1. 构建方式*
JavaScript规定每一个构造函数都有一个prototype属性，指向另一个对象，而该对象的所有属性与方法会被构造函数的实例所继承。
如此一来我们可以将静态的属性与方法定义在prototype对象。

    function Person(name,sex,job){
        this.name = name;
        this.sex = sex;
        this.job = job;
    } 
    Person.prototype.sayName = function() {
        alert(this.name);
    };

#### *2. 验证方法*

JavaScript中提供了一些辅助方法验证Prototype属性，如下:

##### **isPrototypeOf() : 用来判断某个prototype对象与某个实例之间练习**
    alert(Person.prototypeOf(person1)); //true

##### **hasOwnProperty() : 用来判断是否本地属性**
    alert(person1.hasOwnProperty('sayName')); //false

##### **in运算符 : 用来判断是否含有某方法或属性**
    alert('sayName' in person1); //true


###  本节完，未完待续