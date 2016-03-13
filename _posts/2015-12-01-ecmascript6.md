---
layout : post
title : ECMAScript6 学习笔记
category : 前端
tags : 前端 ES6
id: 2015120101
---


> 2015年6月，ECMASCript6发布，成为JavaScript语言的新一代标准，本文简单总结了其中常用的新特性。

## 块级绑定

### let关键词
(1) 仅在其所在代码块有效
(2) 不存在变量提升

    console.log(foo); // 输出undefined
    console.log(bar); // 报错ReferenceError
    var foo = 2;
    let bar = 2;
    
(3) 暂时性死区
(4) 不允许重复声明

### const关键词
(1) 仅在其所在代码块有效
(2) 不允许重复声明
(3) 一旦声明必须立刻赋值，且不能再改变值


## Module

### export
(1) 导出变量

    var firstName = 'Michael';
    var lastName = 'Jackson';
    var year = 1958;
    export {firstName, lastName, year};
    
(2) 导出函数

    function v1() { ... }
    function v2() { ... }
    export {
      v1 as streamV1,
      v2 as streamV2,
      v2 as streamLatestVersion
    };
    // 或者这样：
    export function multiply (x, y) {
      return x * y;
    };
    
### import
import命令具有提升效果，会提升到整个模块的头部
    
    import {firstName, lastName, year} from './profile';
    
    function setName(element) {
      element.textContent = firstName + ' ' + lastName;
    }
    
### 整体加载
  
    // 定义模块circle.js
    export function area(radius) {
      return Math.PI * radius * radius;
    }
    export function circumference(radius) {
      return 2 * Math.PI * radius;
    }
    
    // 普通加载模块方法
    import { area, circumference } from './circle';
    console.log("圆面积：" + area(4));
    console.log("圆周长：" + circumference(14));
    
    // 整体加载方法
    import * as circle from './circle';
    console.log("圆面积：" + circle.area(4));
    console.log("圆周长：" + circle.circumference(14));



> 持续更新，未完待续
