---
layout : post
title : 前端工程师基础素养
category : 前端 JavaScript
tags : 前端 JavaScript
id: 2016031501
---

> 总结了前端工程师所应具备的基础知识素养，涉及到的知识领域包括了重构、JavaScript、移动端、Web安全、常用算法及HTTP等知识。

<style>
	table {
		width: 100%;
		border: 1px solid #dddddd;
		border-collapse: collapse;
		margin-bottom: 20px;
	}
	th, td {
		border: 1px solid #dddddd;
		padding: 5px;
		font-size: 0.8rem;
	}
	@media screen and (max-width: 1100px) {
		.content {
			display: none;
		}
	}
	.content {
		position: fixed;
		right: 5%;
		top: 1.125rem;
		list-style-type: none;
		margin: 0;
		width: 150px;
	}
	.content.hidden {
		display: none;
	}
	.content li a {
		font-size: 0.75rem;
	}
	.content > a.active {
		color: blue;
	}
	.content li a.collapse-btn {
		margin-right: 5px;
		font-size: 0.8rem;
		font-weight: bold;
	}
	.child-content.hidden {
		display: none;
	}
	.content-menu.active {
		font-weight: bold;
		color: #2a7ae2;
	}
</style>

<ul class="content hidden">
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_1" class='content-menu' id='menu_1'>JavaScript基础</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_1_1">事件机制</a>				
			</li>
			<li>
				<a href="#section_1_2">原型链继承</a>				
			</li>
			<li>
				<a href="#section_1_3">闭包原理</a>				
			</li>
			<li>
				<a href="#section_1_4">跨域原理</a>				
			</li>
			<li>
				<a href="#section_1_5">性能优化</a>				
			</li>
			<li>
				<a href="#section_1_6">内存管理</a>				
			</li>
			<li>
				<a href="#section_1_7">其它</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_2" class='content-menu' id='menu_2'>重构相关</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_2_1">BFC</a>				
			</li>
			<li>
				<a href="#section_2_2">自适应布局</a>				
			</li>
			<li>
				<a href="#section_2_3">垂直居中</a>				
			</li>
			<li>
				<a href="#section_2_4">HTML5与CSS3</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_3" class='content-menu' id='menu_3'>移动端</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_3_1">点击穿透</a>				
			</li>
			<li>
				<a href="#section_3_2">2/3倍屏</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_4" class='content-menu' id='menu_4'>Web安全</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_4_1">XSS</a>				
			</li>
			<li>
				<a href="#section_4_2">CSRF</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_5" class='content-menu' id='menu_5'>HTTP相关</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_5_1">常见状态码</a>				
			</li>
			<li>
				<a href="#section_5_2">浏览器缓存原理</a>				
			</li>
			<li>
				<a href="#section_5_3">页面加载过程</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_6" class='content-menu' id='menu_6'>前端工程</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_6_1">模块化</a>				
			</li>
			<li>
				<a href="#section_6_2">组件化</a>				
			</li>
			<li>
				<a href="#section_6_3">MVC与MVVM</a>				
			</li>
			<li>
				<a href="#section_6_4">前段自动化</a>				
			</li>
		</ul>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_7" class='content-menu' id='menu_7'>常用数据结构与算法</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_7_1">快速排序</a>				
			</li>
			<li>
				<a href="#section_7_2">More....</a>				
			</li>
		</ul>
	</li>
	</li>
	<li><a href='#' class='collapse-btn'>+</a><a href="#section_8" class='content-menu' id='menu_8'>设计模式</a>
		<ul class="child-content hidden">
			<li>
				<a href="#section_8_1">观察者模式</a>				
			</li>
			<li>
				<a href="#section_8_2">职责链模式</a>				
			</li>
		</ul>
	</li>
</ul>

## <a id='section_1' class='chapter'>JavaScript 基础</a>

### <a id='section_1_1'>一、事件机制</a>

**事件模型**

JavaScript中有两种事件流模型，分别是事件冒泡和事件捕获，而W3C事件流模型则是将这两种模型合二为一，分为三个阶段: 事件捕获、处于目标与事件冒泡。

**事件处理**

	var EventUtil = {
		addHandler: function(element, type, handler) {
			if(element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if(element.attachEvent) {
				element.attachEvent('on' + type, handler);
			} else {
				element['on' + type] = handler;
			}
		},

		removeHandler: function(element, type, handler) {
			if(element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if(element.detachEvent) {
				element.detachEvent('on'+type, handler);
			} else {
				element['on' + type] = null;
			}
		},

		getEvent: function(event) {
			return event ? event : window.event;
		},

		getTarget: function(event) {
			return event.target ? event.target : event.srcElement;
		},

		preventDefault: function(event) {
			if(event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}			
		},

		stopPropagation: function(event) {
			if(event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		}
	}

**事件代理**

	var list = document.getElementById('myLinks');

	EventUtil.addEventHandler(list, 'click', function(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.gettarget(event);

		switch(target.id) {
			case 'xxx':
				document.title = 'xxx';
				break;
			case 'hhh':
				document.title = 'hhh';
				break;
			case 'bbb':
				document.title = 'bbb';
				break;
			...
		}
	});

**自定义事件模型**

	var EventUtil = function() {
		this._listener = {};
	}
	
	EventUtil.prototype.bind = function(name, callback) {
		var listeners = this._listener[name] || [];
		listeners.push(callback);
		this._listener[name] = listeners;
	}

	EventUtil.prototype.trigger = function(name) {
		var listeners = this._listener[name];
		var args = Array.prototype.Slice.call(arguments).slice(1);
		var self = this;

		for(var i = 0; i < listeners.length; i++) {
			var listener = listeners[i];
			listener.apply(self, args);
		}

	}

**事件派发**

W3C事件模拟:

	var event = document.createEvent('custom');
	event.initCustomEvent('...',....);
	div.dispatchEvent(event);

IE事件模拟:
	
	var event = document.createEventObject();
	event.xxx = false;
	...
	textbox.fireEvent('onkeypress', event);

### <a id='section_1_2'>二、原型链继承</a>

**原型链**

构造函数、原型与实例之间的关系: 每个构造函数都有一个原型对象，原型对象又包含指向构造函数的指针(constructor)，而实例都包含了一个指向原型对象的内部指针(__proto__)。

如果让原型对象等于另一个类型的实例，此时原型对象包含一个指向另一个原型对象的指针，相应地，另一个原型对象也指向另一个构造函数。假设另一个原型又是另一个类型的实例，如此层层递进，形成一种实例与原型的链条，这种组织形式就叫做**原型链**。

**原型继承**

	function SuperType() {
		this.property = true;
	}

	SuperType.prototype.getSuperValue = function() {
		return this.property;
	};

	function SubType() {
		this.subproperty = false;
	}

	SubType.prototype = new SuperType();

这种继承方式最大的问题在于引用类型的原型属性会被所有实例共享。

**借用构造继承**

	function SuperType(name) {
		this.name = name;
	}

	function SubType(name) {
		SuperType.call(this, name);
		this.aget = 29;
	}

缺点在于方法都在构造函数中定义，无法复用。

**组合继承**

	function SuperType(name) {
		this.name = name;
		this.colors = ['red', 'blue', 'green'];
	}

	SuperType.prototype.sayName = function() {
		console.log(this.name);
	}

	function SubType(name, age) {
		SuperType.call(this, name);
		this.age = age;
	}

	SubType.prototype = new SuperType();
	SubType.prototype.constructor = SubType;

JS中最流行的继承方式。


### <a id='section_1_3'>三、闭包</a>

**闭包**

闭包是能够访问另一函数作用域的内部函数。

闭包常常用作设计私有的方法与变量。

缺点就是常驻内存，会增大内存使用量，使用不当很容易造成内存泄露


### <a id='section_1_4'>四、跨域原理</a>

**JSONP**

基于同源的安全策略，浏览器不允许访问脚本访问站外的资源，但是包含src属性的标签除外，它们可以随意引用站外的资源，JSONP就是基于script标签实现跨域。

**CORS**

通过设置Access-Control-Allow-Origin: * 允许资源跨域访问。

**window.name**

通过把信息传至window.name中，再重定向location返回到相同域下实现跨域资源访问。

**document.domain**

子域名不同的两个站点可以通过document.domain设置为相同的父域以实现跨域资源访问。

**postMessage**
	
	// a.html
	var ifr = document.getElementById('iframe');
	ifr.contentWindow.postMessage('message', 'http://b.com');

	// b.html
	window.addEventListener('message', function(event) {
		if(event.origin == 'http://a.com') {
			console.log(event.data);
		}
	});


### <a id='section_1_5'>五、性能优化</a>

1、减少HTTP请求

合并图片，css sprites、合并CSS和JS文件，图片较多的使用lazyLoad。

2、减少DOm操作

修改和访问DOM会造成页面的Repaint和Reflow，合理是哟过JavaScript变量储存内容，考虑大量元素中循环的性能开销，在循环结束时一次性卸乳。

3、CDN加速

使用CDN对静态资源进行缓存。

4、精简文件

对JS、CSS和图片等文件进行压缩处理。



### <a id='section_1_6'>六、内存管理</a>

JS中使用引用计数法以及标记清除法对内存进行管理。


### <a id='section_1_7'>七、其它</a>

**cookie**

	// 设置cookie
	function setCookie(name, value, expiredays) {
		var ExpireDate = new Date();
		ExpireDate.setTime(ExpireDate.getTime() + expiredays * 24 * 3600 * 1000);
		document.cookie = name + '=' + escape(value) +'; expires=' + ExpireDate.toGMTString();
	}

	// 读取cookie
	function getCookie(name) {
		var begin = document.cookie.indexOf(name+'=');
		if(begin != -1) {
			begin = begin + name.length + 1;
			var end = document.cookie.indexOf(';', begin);
			return unscape(document.cookie.substring(begin, end));
		}
		return null;
	}

	// 删除cookie
	function delCookie(name) {
		var ExpireDate = new Date();
		ExpireDate.setTime(ExpireDate.getTime() - 1);
		document.cookie = name + '=' +'; expires=' + ExpireDate.toGMTString();
	}

**ajax**

ajax通过设置 withCredentials: true / Access-Control-Allow-credentials: true 允许携带cookie访问。

	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	} else [
		xhr = null;
	]
	if(xhr) {
		xhr.open('GET', 'http://xxx.xxx.com/');
		xhr.onreadstatechange = function() {
			if(xhr.readystate == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
			}
		}
	}

## <a id='section_2' class='chapter'>重构相关</a>

### <a id='section_2_1'>一、BFC</a>

**概念**

BFC, 块级格式化上下文，是一个独立的渲染区域，只有块级的box参与，它规定了内部的元素的排列规则，并且与这个区域外部毫不相关。

**布局规则**

* 内部box垂直方向一个接一个放置。
* 同一个BFC相邻两个box的margin会重叠。
* BFC区域不会与float box重叠。
* 计算BFC高度时，浮动元素也参与计算。

**触发条件**

* float值不为none。
* overflow值不为visible。
* display为table-cell、table-caption、inline-block的任何一个。
* position的值不为relative和static。



### <a id='section_2_2'>二、自适应布局</a>

使用圣杯或双飞翼进行三列和两列的布局。
详情参加<a href='https://github.com/boxizen/demo/tree/master/layout'>这里</a>

### <a id='section_2_3'>三、垂直居中</a>

### <a id='section_2_4'>四、HTML5与CSS3新特性</a>

## <a id='section_3' class='chapter'>移动端</a>

### <a id='section_3_1'>一、点击穿透</a>

### <a id='section_3_2'>二、2倍屏与3倍屏</a>



## <a id='section_4' class='chapter'>Web安全</a>

### <a id='section_4_1'>一、XSS</a>

### <a id='section_4_2'>二、CSRF</a>


## <a id='section_5' class='chapter'>HTTP相关</a>

### <a id='section_5_1'>一、常见状态码</a>

### <a id='section_5_2'>二、浏览器缓存原理</a>

### <a id='section_5_3'>三、页面加载过程</a>


## <a id='section_6' class='chapter'>前端工程</a>

### <a id='section_6_1'>一、模块化</a>

### <a id='section_6_2'>二、组件化</a>

### <a id='section_6_3'>三、MVC与MVVM</a>

### <a id='section_6_4'>四、前端自动化</a>



## <a id='section_7' class='chapter'>常用数据结构与算法</a>

### <a id='section_7_1'>一、快速排序</a>

### <a id='section_7_2'>二、慢慢补充....</a>

## <a id='section_8' class='chapter'>设计模式</a>

### <a id='section_8_1'>一、观察者模式</a>

### <a id='section_8_2'>二、职责链模式</a>

<script type='text/javascript'>
	$(function() {		
		/* 章节数量 */ 
		var chapterNum = $('.chapter').length;

		/* 监听滚动事件 */
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop();
			// 判断滚动部分是否超出banner高度
			if(scrollTop > 350) {
				$('.content').removeClass('hidden');
			} else {
				$('.content').addClass('hidden');
			}
			for(var i = 0; i < chapterNum; i++) {
				var num = parseInt(i) + parseInt(1);
				var sectionTop = $('#section_'+num).offset().top;
				if(sectionTop <= scrollTop) {					
					$('.content-menu').removeClass('active');
					$('#menu_' + num).addClass('active');
				}
			}
		});		
		/* 折叠按钮 */
		$('.collapse-btn').click(function() {
			var btn = $(this);
			if(btn.hasClass('opened')) {
				btn.removeClass('opened');
				btn.text('+');
				btn.siblings('.child-content').addClass('hidden');
			} else {
                btn.addClass('opened');
				btn.text('-');
				btn.siblings('.child-content').removeClass('hidden');
			}
			return false;
		});
	});
</script>