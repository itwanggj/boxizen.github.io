---
layout : post
title : 深入浅出NodeJS思维导图
category : NodeJS
tags : NodeJS 深入学习
id: 2016022901
---

> 阅读《深入浅出NodeJS》有感，以思维导图形式记录之。

## 一、Node简介

<a href='https://raw.githubusercontent.com/boxizen/boxizen.github.io/master/img/posts/nodeJs/intro.png' target='_blank'><img src="https://raw.githubusercontent.com/boxizen/boxizen.github.io/master/img/posts/nodeJs/intro.png" alt="node简介" /></a>

2009年3月，**Ryan Dahl**在博客上宣布要基于V8创建一款轻量级的服务器，这便是Node的雏形。经过了两年的发展，Node迅速成为了github上关注度最高的项目，同时在Windows平台下也得到了支持。

JavaScript**事件驱动**、**非阻塞IO**等的特性使它成为了成为了Node的首选宿主语言，而也正因为如此，JavaScript成为了可以在前后端游离的编程语言，这使得前端工程师能更好地向全栈方向迈进，同时也大大降低了前后端工作切换时所需的上下文交换代价。


## 二、模块机制

