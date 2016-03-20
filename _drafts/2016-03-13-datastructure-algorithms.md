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
    
    
## 五、链表

### 单向链表实现
    
    // 节点对象
    function Node(element) {
      this.element = element;
      this.next = null;
    }
    // 链表对象
    function List() {
      this.head = new Node('head');
    }
    // 查找节点
    List.prototype.find = function(item) {
      var curNode = this.head;
      while(curNode.element != item) {
        curNode = curNode.next;
      }
      return curNode;
    }
    // 插入节点
    List.prototype.insert = function(newElement, item) {
      var newNode = new Node(newElement);
      var curNode = this.find(item);
      newNode.next = curNode.next;
      curNode.next = newNode;
    }
    // 显示链表
    List.prototype.display = function() {
      var curNode = this.head;
      while(curNode.next) {
        console.log(curNode.element);
        curNode = curNode.next;
      }
    }
    // 上一个节点
    List.prototype.previous = function(item) {
      var curNode = this.head;
      while(curNode.next && (curNode.next.item!=item)) {
        curNode = curNode.next;
      }
      return curNode;
    }
    // 删除节点
    List.prototype.remove = function(item) {
      var prevNode = this.previous(item);
      if(prevNode.next) {
        prevNode.next = prevNode.next.next;  
      }
    }
    
### 双向/循环链表

此处略去....

## 六、字典

### 字典实现

JavaScript中使用数组(因为要排序)实现Dictionary类
    
    // 构造函数
    function Dictionary() {
      this.datastore = [];
    }
    // 添加方法
    Dictionary.prototype.add = function(key, value) {
      this.datastore[key] = value;
    }
    // 查找方法
    Dictionary.prototype.find = function(key {
      return this.datastore[key];
    }
    // 删除方法
    Dictionary.prototype.remove = function(key) {
      delete this.datastore[key];
    }
    // 遍历方法
    Dictionary.prototype.showAll = function() {
      for(var key in Object.keys(this.datastore)) {
        console.log(key + '->' + this.datastore[key]);
      }
    }
    
### 排序功能

    Dictionary.prototype.showAll = function() {
      for(var key in Object.keys(this.datastore).sort()) {
        console.log(key + '->' + this.datastore[key]);
      }
    }
    
## 七、散列

散列是一种常用的数据存储技术，散列后的数据可以快速地插入或取用。散列使用的数据结构叫做散列表。

### 字符串HashTable类

    function HashTable() {
      this.table = new Array(137);
    }
    
    HashTable.prototype.put = function(data) {
      var pos = this.simpleHash(data);
      this.table[pos] = data;
    }
    
    // 散列函数
    HashTable.prototype.simpleHash = function(data) {
      var total = 0;
      for(var i = 0; i < data.length; i++) {
        // 返回ASCII码值
        total += data.charCodeAt(i);
      }
      return total % this.table.length;
    }
    
    HashTable.prototype.showDistro = function() {
      var n = 0;
      for(var i = 0; i < this.table.length; i++) {
        if(typeof this.table[i] != 'undefined') {
          console.log(this.table[i]);
        }
      }
    }

### 碰撞处理

开链法&&线性探测法

## 八、集合

### 定义

    function Set() {
      this.dataStore = []; 
    }
    
    Set.prototype.add = function(data) {
      if(this.dataStore.indexOf(data) < 0 ) {
        this.dataStore.push(data);
        return true;
      } else {
        return false;
      }
    }
    
    Set.prototype.remove = function(data) {
      var pos = this.dataStore.indexOf(data);
      if(post > -1) {
        this.dataStore.splice(pos, 1);
        return true;
      } else {
        return false;
      }
    }
    
    Set.prototype.show = function() {
      return this.dataStore;
    }
    
### 更多操作
  
    // 包含
    Set.prototype.contains = function(data) {
      if(this.dataStore.indexOf(data) > -1) {
        return true;
      } else {
        return false;
      }
    }
    // 合并
    Set.prototype.unio = function(set) {
      var tmpSet = new Set();
      for(var i = 0; i < this.dataStore.length; i++) {
        tmpSet.add(this.dataStore[i]);
      }
      for(var i = 0; i < set.dataStore.length; i++) {
        if(!tmpSet.contains(set.dataStore[i])) {
          tmpSet.add(set.dataStore[i]);
        }
      }
    }
    // 交集
    Set.prototype.intersect = function(set) {
      var tmpSet = new Set();
      for(var i = 0; i < this.dataStore.length; i++) {
        if(set.contains(this.dataStore[i])) {
          tmpSet.add(this.dataStore[i]);
        }
      }
      return tmpSet;
    }
    
## 九、二叉树与二叉排序树

### 基本定义

    // Node
    function Node(data, left, right) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
    // show方法
    Node.prototype.show = function() {
      return this.data;
    }
    // BST
    function BST() {
      this.root = null;
    }
    BST.prototype.insert = function(data) {
      var n = new Node(data, null, null);
      if(this.root == null) {
        this.root = n;
      } else {
        var current = this.root;
        var parent;
        while(true) {
          parent = current;
          if(data < current.data) {
            current = current.left;
            if(current == null) {
              parent.left = n;
              break;
            } 
          } else {
            current = current.right;
            if(current == null) {
              parent.right = n;
              break;
            }
          }
        }
      }
    }
    
### 遍历二叉排序树

中序遍历

    BST.prototype.inOrder = function(node) {
      if(node != null) {
        this.inorder(node.left);
        console.log(node.show());
        this.inorder(node.right);
      }
    }
    
先序遍历

    BST.prototype.preOrder = function(node) {
      if(node != null) {
        console.log(node);
        this.inorder(node.left);
        this.inorder(node.right);
      }      
    }
    
后序遍历

    BST.prototype.postOrder = function(node) {
      if(node != null) {
        this.order(node.left);
        this.order(node.right);
        console.log(node);
      }
    }

### 二叉排序树上查找

查找最小值

    BST.prototype.getMin = function() {
      var current = this.root;
      while(current) {
        current = current.left;
      }
      return current.data;
    }
    
查找最大值

    BST.prototype.getMax = function() {
      var current = this.root;
      while(current) {
        current = current.right;
      }
      return current.data;
    }
    
查找给定值

    BST.prototype.find = function(data) {
      var current = this.root;
      while(current) {
        if(current.data == data) {
          return current;
        } else if(current.data > data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return null;
    }
    
### 删除节点

    BST.prototype.remove = function(data) {
      root = this.removeNode(this.root, data);
    }
    
    BST.prototype.removeNode = function(node, data) {
      if(node == null) {
        return null;
      }
      if(data == node.data) {
        // 没有子节点
        if(node.left == null & node.right == null) {
          return null;
        } 
        // 没有左节点
        if(node.left == null) {
          return node.right;
        }
        // 没有右节点
        if(node.right == null) {
          return node.left;
        }
        // 有两个子节点
        var tempNode = getSmallest(node.right);
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);           return node;
      } else if(data < node.data) {
        node.left = this.removeNode(node.left, data);
        return node;
      } else {
        node.right = this.removeNode(node.right, data);
        return node;
      }
    }