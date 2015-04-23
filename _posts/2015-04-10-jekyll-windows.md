---
layout: post
title:  "Windows环境下搭建Jekyll博客"
date:   2015-04-10 19:44:41
categories: jekyll
id: 2015041001
---
>最近换了系统，实现了从ubuntu向win8操作环境的跨越，所有的开发环境与项目环境需要重新配置，这不得重新在windows下搭建jekyll环境嘛，顺便给博客换换皮肤，换个心情，提醒一下自己经常总结更新博客。

###**关于[Jekyll][jekyll]**
Jekyll是一个静态页面的生成工具，可以处理HTML、CSS、JavaSCript、Markdown、Liquid等静态文件，并输出静态网页。如今很多人通过Jekyll创建自己的静态博客，并托管于github上，对于这种静态博客好处是显而易见的，创建者如此描述：Simple，Static and Blog-aware，由于没有数据库，我们可以通过第三方评论插件，如Disqus，多说以对博客文章进行评论。

###**安装Ruby&&Ruby DevKit**
由于Jekyll是使用Ruby语言所编写的，所以我们必须得先安装Ruby的环境，windows下通过[RubyInstaller][RubyInstaller]进行安装。我在此处下载的是Ruby 2.1.6 (x64)。

安装完Ruby后，随即下载[Ruby DevKit][RubyDevKit]开发包，特别要注意Devkit一定要跟Ruby的版本对应起来，如Ruby是32位的就应该选择32位的Devkit，反之选择64位的Devkit，由于一开始没有选对版本，在后面安装jekyll的时候一直提示不存在某些包或环境，浪费了哥哥好多的时间....

*1.* DevKit下载完后是一个压缩包，将其解压到某个目录下，运行命令 
<code>ruby dk.rb init</code>
生成config.yml配置文件，该配置文件包含了之前Ruby的安装路径。

*2.* 接着运行命令<code>ruby dk.rb install</code>安装开发环境

*3.* 命令行中输入ruby -version与gem -v，若能在终端中输出ruby与gem的版本号则说明该环节安装完成。

###**安装Jekyll**
Jekyll的安装非常简单，只需要在命令行中键入<code>gem install jekyll</code>就完事了。

不过，但是呢，由于天朝的网络问题，使得jekyll的国外源难以触及，这时候我们就得修改下载镜像了，具体方法如下：

*1.* 首先删除gem原有的镜像：<code>gem sources --remove https://rubygens.org</code>

*2.* 然后再添加国内的镜像(此处我选择的是淘宝的下载镜像)：<code>gem sources --a http://ruby.taobao.org/</code>

*3.* 最后打印出gem的镜像列表：<code>gem sources --l</code>

到了这里，我们再次输入<code>gem install jekyll</code>,会发现加载速度比原有的镜像快得多，下载并安装完后，我们就可以尽情体验静态博客带来的魅力了。

###**最后**
在这里分享几个常用的jekyll命令:

*1.* <code>jekyll new projName</code> 构建一个jekyll项目

*2.* <code>jekyll serve</code> 运行jekyll项目，默认端口为4000，可以通过_config.xml修改

*3.* <code>jekyll serve --watch</code> 带监听的运行jekyll项目，可以监听文件修改，相当于是play framework的dev模式

更多的教程及内容可以点击: [Jekyll官网][jekyll] 获得，祝大家玩得开心，hiahia。

[jekyll]:         http://jekyllrb.com
[RubyInstaller]:  http://rubyinstaller.org/downloads/
[RubyDevKit]: 	  http://rubyinstaller.org/add-ons/devkit/
