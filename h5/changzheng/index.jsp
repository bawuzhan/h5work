<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*,java.io.*"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="m" uri="/microblog-tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%  
	String pathV3 = request.getContextPath();
	String basePathV3 = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ pathV3 + "/microblog-v3/";
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ pathV3 + "/microblog/";
%><!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <meta name="apple-mobile-web-app-title" content="长征胜利80周年"/>
    <title>长征胜利80周年</title>
    <base href="/microblog-v3/h5/changzheng/">
    <link rel="stylesheet" href="css/reset.min.css"/>
    <link rel="stylesheet" href="css/index.css"/>
    <!-- 天润测试代码 -->
<META name="filetype" content="1">
<META name="publishedtype" content="1">
<META name="pagetype" content="2">
<META name="catalogs" content="SQ_0002001">
<!-- /天润测试代码 -->
<!-- 百度统计 -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?8d2077d60272dd9e6d0ea4e1e413b118";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
<!-- /百度统计 -->
</head>
<body>
<div class="container">
    <!--标题-->
    <section class="title">
        <div class="tit1">
            <i><img src="images/logo_03.png" alt="人民网"/></i>
            <span>纪念红军长征胜利80周年特别策划</span>
        </div>
        <div class="top2 bounceIn">
            <img src="images/buwang_05.png" alt="不忘初心 接力重温长征路"/>
        </div>
    </section>
    <!--地图-->
    <section class="map">
        <div class="mapMain">
            <div class="line">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </div>
            <div class="event">
                <div>
                    <span>瑞金</span>
                </div>
                <div>
                    <span>强渡乌江</span>
                    <i></i>
                </div>
                <div>
                    <i></i>
                    <span>遵义会议</span>
                </div>
                <div>
                    <span>四渡赤水</span>
                    <i></i>
                </div>
                <div>
                    <i></i>
                    <span>强渡大渡河</span>
                </div>
                <div>
                    <i></i>
                    <span>飞夺泸定桥</span>
                </div>
                <div>
                    <i></i>
                    <span>翻雪山</span>
                </div>
                <div>
                    <i></i>
                    <span>过草地</span>
                </div>
                <div>
                    <span>长征大会师</span>
                    <i></i>
                </div>
                <div>
                    <span>直罗镇战役</span>
                </div>

            </div>
            <div class="man">
                <img src="images/hongjun.gif" alt=""/>
            </div>
        </div>
        <div class="people">
            <i><img src="images/touxiang_11.png" alt=""/></i>
            你是第
            位参与者
        </div>
        <div id="hidden">
            <img src="<s:property value='headImgUrl' />" alt=""/>
            <span><s:property value='voteCount' /></span><!--盛放数量-->
            <i><s:property value='currCount' /></i><!--盛放点击的标识-->
            <p id="sn"><s:property value='sn' /></p>
        </div>

    </section>
    <!--活动介绍-->
    <section class="action">
        <div class="tit">活动介绍</div>
        <ul class="tro">
            <li>80年了，我们仍然记得！</li>
            <li>征服雪山草地、翻越峡谷激流</li>
            <li>二万五千里的辗转与艰难</li>
            <li>篆刻为中华民族的英雄血脉</li>
            <li>传承与接力</li>
            <li>赢取你的“小米”加“步枪”</li>
            <li>在未来的“长征路”上</li>
            <li>不忘初心、勇往直前！</li>
        </ul>
        <div class="share">
            <span>点击屏幕右上【···】分享长征接力</span><i></i>
        </div>
        <div class="other">
            <div class="total"><span>25000个抽奖名额</span></div>
            <div class="leave">还有<span></span>个机会</div>
        </div>
        <div class="banner">
            <ul class="list">
            </ul>
        </div>
        
        <!--提交手机号-->
        <div class="phone" id="inp">
            <input class="pho" type="text" placeholder="输入手机号..."/>
            <input id="btn" type="button" value="参与抽奖"/>
        </div>
    </section>
    <!--抽奖说明-->
    <section class="instruction">
        <div class="tit">抽奖说明</div>
        <p>10月31日将公布参与活动的幸运网友</p>
        <ul>
            <li>
                <div>
                    <img src="images/shouji_07.png" alt="智能4G手机"/>
                    <span>智能4G手机 2台</span>
                </div>
            </li>
            <li>
                <div>
                    <img src="images/gangbi_09.png" alt="智能4G手机"/>
                    <span>精美钢笔 10支</span>
                </div>
            </li>
        </ul>
    </section>
    <!--参与抽奖-->
    <div class="join">
        <a href="javascript:;">
            <span>参与抽奖</span>
        </a>
    </div>
    <footer>本活动最终解释权为人民网所有</footer>
</div>
</body>
<script src="js/zepto.min.js"></script>
<!--<script src="js/pub.js"></script>-->
<script src="js/index.js"></script>

<script src="js/pub.js" type="text/javascript" charset="utf-8" async defer></script>

<!-- 微信分享接口 -->
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

<script type="text/javascript">
var src = "http://t.people.com.cn/weixinJS.action?url=" + encodeURIComponent(location.href.split('#')[0]);
var left = unescape('%3c');
var right = unescape('%3E');
document.write(left + 'script src="' + src + '"' + right + left + '/script' + right);
</script>
<script>
//var shareData = {
  //imgUrl : 'http://t.people.com.cn/microblog-v3/h5/changzheng/images/200.jpg',
  //link :  'http://mblog.people.com.cn/microblog-v3/h5/changzheng/intro.htm',
  //title : '“不忘初心 接力重温长征路”活动正在进行中',
  //desc : '今天，让我们一起接力重温长征路，不忘初心、勇往直前！'
//};

var shareData = {
		  imgUrl : 'http://mblog.people.com.cn/microblog-v3/h5/changzheng/images/200.png',
		  link :  'http://mblog.people.com.cn/microblog-v3/h5/changzheng/intro.htm',
		  <s:if test="shareCount>0">
		  title : '我是第<s:property value='shareCount' />位接力重温长征的人，小伙伴们快来一起参加吧！',
		  </s:if>
		  <s:else>
		  title : '“不忘初心 接力重温长征路”活动正在进行中',
		  </s:else>
		  desc : '今天，让我们一起接力重温长征路，不忘初心、勇往直前！'
};

//peopleWXConfig.debug = true;
peopleWXConfig.jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'];
wx.config(peopleWXConfig);
function initWXShare(){
	// 分享给朋友
    wx.onMenuShareAppMessage({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl,
        success: function () { 
            // 用户确认分享后执行的回调函数
            alert('success');
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
            alert('cancel');
        }
    });
    // 分享到朋友圈
    wx.onMenuShareTimeline({
        title: shareData.title,
        link: shareData.link,
        imgUrl: shareData.imgUrl
    });
    wx.onMenuShareQQ({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl
    });
    wx.onMenuShareWeibo({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl
    });
}
wx.ready(initWXShare);
</script>
<!-- 天润测试代码 -->
<script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
<!-- /天润测试代码 -->
</html>
