---
layout : post
title : ios证书制作与打包发布
category : ios
tags : ios 苹果
id: 2015070401
---

>苹果的证书多样纷杂，且打包审核的过程严格复杂，各种身份验证，证书验证的操作相信已经把许多人搞晕，包括本人在内，最近一个项目需要打包上线，却因为这些非技术问题而把原计划拖延许久。看来记录笔记刻不容缓。(**多图慎点**)

<style>
	img{
		display:block;
		margin-top:10px;
		margin-bottom: 10px;
		border: 1px solid #CBCACA;
	}
	.content{
		position:fixed;
		left: 90%;
		top: 200px;
		margin: 0px;
		display: none;
	}
	.content li{
		list-style-type: none;
	}
	.content li a{
		font-size: 0.5rem;
	}
	.content li a.active{
		font-size: 0.9rem;
		font-weight: bold;
		color: #2a7ae2;
	}	
</style>

<ul class="content">
	<li><a href="#csr" class="csr">生成CSR文件</a></li>
	<li><a href="#certificate" class="certificate">创建开发者证书</a></li>
	<li><a href="#appid" class="appid">创建App ID</a></li>
	<li><a href="#notification" class="notification">主动推送</a></li>
	<li><a href="#p12" class="p12">生成p12文件</a></li>
	<li><a href="#provision" class="provision">导出provision</a></li>
	<li><a href="#packet" class="packet">Xcode打包ipa</a></li>
</ul>

### <a name="csr" id="csr">1. 生成CSR文件</a>

CSR文件，全称CertificateSigningRequest，由本地生成，为请求苹果开发证书所用，操作流程如下：

在spotlight中搜索keychain,默认是第一条记录，点击打开钥匙串访问:
<img src="/img/posts/apple/spotlight.png" alt="spotlight"/>

在钥匙串访问中选：择证书助理 －> 从证书颁发机构请求证书:
<img src="/img/posts/apple/keychain.png" alt="钥匙串访问"/>

填写邮箱信息并把CSR文件保存到磁盘:
<img src="/img/posts/apple/csr.png" alt="CSR文件"/>

最终生成如下所示的CSR文件，该文件将用于向苹果开发者后台请求cer证书:
<img src="/img/posts/apple/csrfile.png" alt="CSR文件" style="width:120px;" />

### <a name="certificate" id="certificate">2. 创建开发者证书</a>

苹果开发者证书分为两种：开发版与发布版，对于仅需要开发测试的应用，可以申请开发版证书，而对于要打包并发布到苹果商城中的应用，则必须选择发布版证书，需要注意的是一个账号只能申请三张发布版的证书，证书的有限性意味着多个苹果应用可能共用一张发布证书。

进入苹果开发者证书管理后台，点击左侧Certificate选项，选择自己需要的证书类型(开发/发布)，如图所示:

<img src="/img/posts/apple/certificate.png" alt="开发证书"/>

点击右上方"+"创建证书,由于发布证书已达三个数量上限，为了演示方便这里选择了开发版的证书创建:
<img src="/img/posts/apple/certificate_1.png" alt="开发证书"/>

点击下一步，上传CSR文件，也就是上面我们在本地所创建的文件:
<img src="/img/posts/apple/certificate_2.png" alt="开发证书"/>

上传完成后可获得开发者证书，下载该证书并双击添加到本地证书中:
<img src="/img/posts/apple/certificate_3.png" alt="开发证书"/>

### <a name="appid" id="appid">3. 创建App ID</a>

在Apple Store中，每一个程序应用对应于一个App ID，所以在应用发布前需要在苹果的开发者后台创建一个App ID，流程如下：

进入苹果开发者证书管理后台，点击左侧App ID选项，如图所示:
<img src="/img/posts/apple/appidview.png" alt="App ID界面预览"/>

点击右上角的“＋”，新建App ID，此处需要注意的就是Bundle ID必须填写完整的包名:
<img src="/img/posts/apple/appid_create_1.png" alt="App ID界面预览"/>

由于我的应用拥有推送的功能，所以需要在下方为Push Notifications打勾:
<img src="/img/posts/apple/appid_create_2.png" alt="App ID界面预览"/>

不断下一步之后可完成App ID的创建，由于刚刚激活了主动推送的功能，所以这里还需要完成配置的操作，在App ID列表中点击刚刚创建的App ID，可看到Push Notifications状态如下：
<img src="/img/posts/apple/push_notification.png" alt="主动推送"/>

### <a name="notification" id="notification">4. 激活主动推送功能</a>

点击“Edit”对主动推送功能进行激活，如下图所示:
<img src="/img/posts/apple/push_notification_1.png" alt="主动推送"/>

点击"create Certificate"按钮，上传我们在第一步中所创建的CSR文件:
<img src="/img/posts/apple/push_notification_2.png" alt="主动推送"/>

不断下一步以完成了推送功能的配置，这时候可将推送功能的证书notification_push.cer下载到本地，如下图：
<img src="/img/posts/apple/push_notification_3.png" alt="主动推送"/>

双击程序，将证书安装添加至本地中：
<img src="/img/posts/apple/push_notification_4.png" alt="主动推送" style="width:120px;"/>

### <a name="p12" id="p12">5. 导出p12文件</a>

每一个带密钥的证书都可以导出p12文件，这是一个加密的文件，只要知道其密码，就可以在其他设备上使用，在钥匙串访问中右键点击刚刚添加的主动推送证书，选择“导出...”
<img src="/img/posts/apple/push_notification_5.png" alt="p12文件导出"/>

以p12格式进行文件导出:
<img src="/img/posts/apple/push_notification_6.png" alt="p12文件导出"/>

输入p12的密码:
<img src="/img/posts/apple/push_notification_7.png" alt="p12文件导出"/>

下面就是导出后的文件:
<img src="/img/posts/apple/push_notification_8.png" alt="p12文件导出" style="width:120px;"/>

### <a name="provision" id="provision">6. 生成Provisioning Profiles

Provisioning Profiles，简称PP文件，该文件将appID，开发者证书，硬件Device绑定在一起，在开发者中心配置好后可以添加到Xcode上，也可以直接在Xcode上连接开发者中心生成，真机调试时需要在PP文件中添加真机的udid，由于此处配置的是发布版本的PP文件，所以没有了添加真机udid这一步骤。

点击开发者中心的Provisioning Profiles，选择Distribution，如下:
<img src="/img/posts/apple/provision.png" alt="provisioning"/>

点击右上方"+",选择自己需要的版本进行配置，由于要在商城发布，这里我选择的是App Store:
<img src="/img/posts/apple/provision_1.png" alt="provisioning"/>

下一步选择需要配置的AppId:
<img src="/img/posts/apple/provision_2.png" alt="provisioning"/>

下一步选择开发证书:
<img src="/img/posts/apple/provision_3.png" alt="provisioning"/>

填写provision profile的名字，完成配置:
<img src="/img/posts/apple/provision_4.png" alt="provisioning"/>

配置成功后下载PP文件,如下图:
<img src="/img/posts/apple/provision_5.png" alt="provisioning"/>

<img src="/img/posts/apple/provision_6.png" alt="provisioning" style="width:120px;"/>

至此，苹果打包所需的所有证书已经准备完毕。

### <a name="packet" id="packet">6. Xcode打包生成ipa

前序的准备工作上面已经详细介绍，真是呕心沥血啊... 废话少说，直接进入主题

打开Xcode，选择需要打包的项目，然后执行 Product -> Scheme -> Edit Scheme
<img src="/img/posts/apple/xcode.png" alt="xcode"/>

把Build Configuration改为Release，如下图:
<img src="/img/posts/apple/xcode_2.png" alt="xcode"/>

完成上述操作后执行 Product -> Archieve
<img src="/img/posts/apple/xcode_3.png" alt="xcode"/>

选择导出的用途后点击export按钮:
<img src="/img/posts/apple/xcode_4.png" alt="xcode"/>

在此过程会有一个签名自动验证的过程，此处略过许多坑...历经千辛，排除万难，终于打包成功:
<img src="/img/posts/apple/xcode_5.png" alt="xcode" style="width:120px;"/>

如果你认为，只要按上述步骤完成就可以成功打包，那真是天真了...在整个过程中可以会遇到许多的问题，这里就不一一描述了，有疑问可留言。

转载请注明出处，谢谢。

<script type="text/javascript">
	$(function(){
		var csr = $('#csr').offset().top,
			certificate = $('#certificate').offset().top,
			appid = $('#appid').offset().top,
			notification = $('#notification').offset().top,
			p12 = $('#p12').offset().top,
			provision = $('#provision').offset().top,
			packet = $('#packet').offset().top;

		$(window).scroll(function(){
			if($(window).scrollTop() >= csr && $(window).scrollTop() < certificate){
				$('.content').fadeIn(1);
				$('.content a').removeClass('active');
				$('.csr').addClass('active');
			}
			else if($(window).scrollTop() >= certificate && $(window).scrollTop() < appid){
				$('.content a').removeClass('active');
				$('.certificate').addClass('active');
			}
			else if($(window).scrollTop() >= appid && $(window).scrollTop() < notification){
				$('.content a').removeClass('active');
				$('.appid').addClass('active');
			}
			else if($(window).scrollTop() >= notification && $(window).scrollTop() < p12){
				$('.content a').removeClass('active');
				$('.notification').addClass('active');
			}
			else if($(window).scrollTop() >= p12 && $(window).scrollTop() < provision){
				$('.content a').removeClass('active');
				$('.p12').addClass('active');
			}
			else if($(window).scrollTop() >= provision && $(window).scrollTop() < packet){
				$('.content a').removeClass('active');
				$('.provision').addClass('active');
			}
			else if($(window).scrollTop() >= packet){
				$('.content a').removeClass('active');
				$('.packet').addClass('active');
			}
			else{			
				$('.content').fadeOut(1);
			}
		});
	});
</script>