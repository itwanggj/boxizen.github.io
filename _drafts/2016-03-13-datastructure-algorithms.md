---
layout : post
title : 数据结构与算法 JavaScript描述
category : JavaScript
tags : JavaScript
id: 2016031301
---

## 一、数组

### 1. 相关函数

(1) split()
  字符串切割为数组
  
    var str = 'hehe da';
    str.split(' '); // hehe,da

(2) indexOf()
查找数组元素下标

    var arr = [1,2,3,4,5];
    arr.indexOf(2); // 1

(3) join()    
转化为字符串，默认分隔符为 ‘,’

    var arr = [1,2,3,4,5];
    arr.join(); // 1,2,3,4,5
    arr.join('-'); //1-2-3-4-5
    
(4) concat()和splice()
concat()表示连接两个数组, splice()表示在现有数组中截取新数组
    
    // concat()
    var arr_1 = [1,2,3,4,5];
    var arr_2 = ['上','山','打','老','虎'];
    arr_1.concat(arr_2); // [1,2,3,4,5,'上','山','打','老','虎'];
    // splice()
    var arr = [1,2,3,4,5];
    arr.splice(2,2); // 删除作用,返回[3,4]
    var arr = [1,2,3,4,5];
    arr.splice(3,1,7,8); // 添加作用, 返回[1,2,3,7,8,5];
    
(6) push()和unshift()
push()表示在数组尾插入元素, unshift()表示在数组头插入元素
  
    // push()
    var arr = [1,2,3];
    arr.push(4,5); // [1,2,3,4,5];
    // unshift()
    arr.unshift(-2,-1); // [-2,-1,1,2,3,4,5];
    
(7) pop()和shift()

    // pop()
    var arr = [1,2,3];
    arr.pop(); // [1,2]
    // shift()
    arr.shift(); // [2]

(8) reverse()和sort()

    var arr = [1,4,7,3,2,9];
    arr.reverse(); // 返回9,2,3,7,4,1
    arr.sort(); // 返回1,2,3,4,7,9

### 2. 迭代器

**不生成新数组的迭代方法**

(1) forEach()
对数组中每一个元素都执行一遍函数

    function square(num) {
      console.log(num +':' + num * num);
    }
    var arr = [1,2,3,4,5];
    arr.forEach(square);

(2) every()和some()
接收返回值为布尔类型的函数
  
    function isEven(num) {
      return num % 2 == 0;
    }
    var nums = [2,4,6,8,10];
    var even = nums.every(isEven);
    if (even) {
      console.log('every element is even');
    }
    else {
      print("not all numbers are even");
    }

(2) reduce()和reduceRight()
对函数中每一个元素都累加一遍

    function concat(accumulatedString, item) {
        return accumulatedString + item;
     }
    var words = ["the ", "quick ","brown ", "fox "];
    var sentences = words.reduce(concat); // the quick brown fox
    
**生成新数组的迭代方法**

(1) map()
和forEach()类似，区别在于map()能够返回一个新数组

    function add(num) {
      return num + 1;
    }
    var arr = [1,2,3,4];
    arr.map(add); // 2,3,4,5
    
(1) filter()
与map相似，不同之处在于filter只接受返回为true的元素

    function pass(num) {
      return num > 5;
    }
    var arr = [1,2,3,4,8,9,10];
    arr.filter(pass); // [8,9,10];

## 二、列表

### 1. 抽象数据类型定义

|   属性/方法名    | 说明   |
| :-----------: | :-----------:  |
| listSize |   列表的元素个数|
| pos |   列表的当前位置|
| length |   返回列表中元素个数|
| clear |   清空列表中所有元素|
| toString |   返回列表中的字符串形式|
| getElement |   返回当前位置的元素|
| insert |   在现有元素后面插入新元素|
| append |   在列表的末尾添加新元素|
| remove |   从列表中删除元素|
| front |   将列表的当前位置设移动到第一个元素|
| end |   将列表的当前位置设移动到最后一个元素|
| prev |   将列表的当前位置前移一位|
| next |   将列表的当前位置后移一位|
| curPos |   返回列表当前位置|
| moveTo |   将当前位置移动到指定位置|

### 2. 相关函数

(1) 构造函数

    function List() {
      this.listSize = 0;
      this.pos = 0;
      this.dataStore = [];
    }
    
(2) append()

    List.prototype.append = function(element) {
      this.dataStore[this.listSize++] = element;
    }
    
(3) find()

    List.prototype.find = function(element) {
      for(var i = 0; i < this.dataStore.length; i++) {
        if(this.dataStore[i] == element) {
          return i;
        }
      }
      return -1;
    }

(4) remove()    

    List.prototype.remove = function(element) {
      var foundAt = this.find(element);
      if(foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        --this.listSize;
        return true;
      }
      return false;
    }
    
    
## 三、栈

### 1. 抽象数据类型定义

|   属性/方法名    | 说明   |
| :-----------: | :-----------:  |
| push |   压栈|
| pop |   出栈|
| peek |   返回栈顶元素|

### 2. 相关函数

(1) 构造函数

    function Stack() {
      this.dataStore = [];
      this.top = 0;
    }
    
(2) push()

    Stack.prototype.push = function(element) {
      this.dataStore[this.top++] = element;
    }

(3) pop()

    Stack.prototype.pop = function() {
      // return this.dataStore.splice(--this.top,1);
      return this.dataStore[--this.top];
    }
    
(4) peek()

    Stack.prototype.peek = function() {
      return this.dataStore[this.top - 1];
    }
    
## 四、队列

### 1. 普通队列实现
  
    // 构造函数
    function Queue() {
      this.dataStore = [];
    }
    // 进队
    Queue.prototype.enqueue = function(element) {
      this.dataStore.push(element);
    }
    // 出队
    Queue.prototype.dequeue = function(element) {
      return this.dataStore.shift();
    }
    // 首元素
    Queue.prototype.front = function() {
      return this.dataStore[0];
    }
    // 尾元素
    Queue.prototype.end = function() {
      return this.dataStore[this.dataStore.length - 1];
    }
    // 是否为空
    Queue.prototype.empty = function() {
      if(this.dataStore.length == 0) {
        return true;
      } else {
        return false;
      }
    }
    
### 2. 优先队列实现

    function Patient(name, code) {
      this.name = name;
      this.code = code;
    }
    
    function dequeue() {
      var prioty = this.dataStore[0].code;
      for(var i = 1; i < this.dataStore.length; i++) {
        if(this.dataStore[i].code < prioty) {
          prioty = i;
        }
      }
      return this.dataStore.splice(i, 1);
    }