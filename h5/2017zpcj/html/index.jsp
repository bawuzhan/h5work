<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*,java.io.*"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="m" uri="/microblog-tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String pathV3 = request.getContextPath();
	String basePathV3 = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ pathV3 + "/microblog-v3/";
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ pathV3 + "/microblog/";
%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="viewport"content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <title></title>
    <base href="/microblog-v3/h5/2017zpcj/html/">
    <link rel="stylesheet" href="../css/reset.min.css"/>
    <link rel="stylesheet" href="../css/index.css"/>
    <link rel="stylesheet" href="../css/common.css"/>
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
<div class="contain">
    <div class="count">已有<span>10</span>人带上健康回家过年</div>
    <div class="main" id="main">
        <div class="zp" id="zp"></div>
        <div class="zz"></div>
    </div>
    <div class="record"><a href="<%=pathV3 %>/jkcj2017UserZjRecord.action?sn=<s:property value='sn' />">中奖记录</a></div>
</div>
<div class="filter">
    <div class="close"></div>
    <div class="again">
        <div class="changeTxt">
            <h2>大奖就差一点点</h2>
            <span>换个姿势试试手气</span>
        </div>
        <button class="w360 againShake"><a href="javascript:;">再抽一次</a></button>
    </div>
    <div class="over">
        <h2>今天的机会用完啦</h2>
        <span>明天再来吧！</span>
    </div>
    <div class="zj_1" style="font-size:.3rem">
        <span  style="line-height: 1.2rem">恭喜您获得</span>
        <h2 style="margin-top: .3rem">Ipnone手机一部</h2>
    </div>
   <!-- <div class="zj_2">
        <span>恭喜您获得</span>
        <span>由<a href="javascript:;">百度百度百度</a>提供的</span>
        <span>50元流量券</span>
        <p>兑换码：SNY96583453</p>
        <button class="w360"><a href="javascript:;">再抽一次</a></button>
        <span>长按下图二维码兑换奖品</span>
        <span>人民网</span>
        <img src="../images/ewm_03.png" alt=""/>
    </div>-->
    <div class="shareAgain">
        <h2>抽奖机会已用完</h2>
        <span>邀请好友参加抽奖机会+1</span>
        <span>下载人民健康APP<br>获取更多健康信息</span>
        <div>
            <img src="../images/jkEWM_03.png" alt=""/>
            <img src="../images/JK_LOGO_06.png" alt=""/>
        </div>
    </div>
</div>
<div id="hidden" style="display: none">
    <p id="sn"><s:property value='sn' /></p>
</div>
<div class="tlt" style="display: none">
    <span>您今天还有</span>
    <span class='times'></span>
    <span>次摇一摇机会哦</span>
</div>
<script src="../js/zepto.min.js"></script>
<script src="../js/index.js"></script>
<script src="../js/ZeptoRotate.1.0.js"></script>
<script src="../js/zp.js"></script>
<!-- 微信分享接口 -->
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript">
    var src = "http://mblog.people.com.cn/weixinJS.action?url=" + encodeURIComponent(location.href.split('#')[0]);
    var left = unescape('%3c');
    var right = unescape('%3E');
    document.write(left + 'script src="' + src + '"' + right + left + '/script' + right);
</script>
<script type="text/javascript">
    function save(){
    var Infor={
    time: new Date().getTime(),//设置存储的时间
    overTime:864000-(new Date().getHours()*3600+new Date().getMinutes()*60+new Date().getSeconds()),//存储过期时间
    shareFlag:shareFlag,
    }
    localStorage.setItem("Infor", JSON.stringify(Infor));
    };
    //微信分享代码
    var shareData = {
        imgUrl: "http://mblog.people.com.cn/microblog-v3/h5/2017zpcj/images/share.jpg",
        link: 'http://mblog.people.com.cn/microblog-v3/h5/2017zpcj/html/instr.html',
        title: '带上健康•回家过年 健康好礼免费送',
        desc: '健康大转盘，好礼转不停！2017年，健康中国，健康你我。'
    };
    peopleWXConfig.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'];
    wx.config(peopleWXConfig);
    function initWXShare() {
        wx.onMenuShareAppMessage({
            title: shareData.title,
            desc: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            success:function(){
                <%--alert(shareFlag+"  shareFlag")--%>
                if(shareFlag==0){//如果没有分享过
                    $.ajax({
                        url: "http://t.people.com.cn/wxJkShareCallback.action?sn="+$('#sn').html(),
                        type: "get",
                        data:"",
                        success:function(result){
                            if(result==1){//分享成功，抽奖次数加1
                                kcjCount+=1;
                            <%--alert(kcjCount+"   sharehou")--%>
                                $('.tlt .times').html(kcjCount)
                                shareFlag=1;
                                save();
                                filter.css('display','none');
                                shareAgain.css('display','none');
                                $('.zz').attr("flag",1);
                            }else if(result==0){//未分享
                                return;
                            }else{
                                window.location.href='instr.html';
                            }
                        }
                    })
                }
            }
        });
        wx.onMenuShareTimeline({
            title: shareData.title,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            success:function(){
                if(shareFlag==0){//如果没有分享过
                    $.ajax({
                        url: "http://t.people.com.cn/wxJkShareCallback.action?sn="+$('#sn').html(),
                        type: "get",
                        data:"",
                        success:function(result){
                            if(result==1){//分享成功，抽奖次数加1
                                kcjCount++;
                                $('.tlt .times').html(kcjCount)
                                shareFlag=1;
                                save();
                                filter.css('display','none');
                                shareAgain.css('display','none');
                                $('.zz').attr("flag",1);
                            }else if(result==0){
                                return;
                            }else{
                                window.location.href='instr.html';
                            }
                        }
                    })
                }
            }
        });
        wx.onMenuShareQQ({
            title: shareData.title,
            desc: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            success:function(){
                if(shareFlag==0){//如果没有分享过
                    $.ajax({
                        url: "http://t.people.com.cn/wxJkShareCallback.action?sn="+$('#sn').html(),
                        type: "get",
                        data:"",
                        success:function(result){
                            if(result==1){//分享成功，抽奖次数加1
                                kcjCount+=1;
                                $('.tlt .times').html(kcjCount)
                                shareFlag=1;
                                save();
                                filter.css('display','none');
                                shareAgain.css('display','none');
                                $('.zz').attr("flag",1);
                            }else if(result==0){
                                return;
                            }else{
                                window.location.href='instr.html';
                            }
                        }
                    })
                }
            }
        });
        wx.onMenuShareWeibo({
            title: shareData.title,
            desc: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            success:function(){
                if(shareFlag==0){//如果没有分享过
                    $.ajax({
                        url: "http://t.people.com.cn/wxJkShareCallback.action?sn="+$('#sn').html(),
                        type: "get",
                        data:"",
                        success:function(result){
                            if(result==1){//分享成功，抽奖次数加1
                                kcjCount+=1;
                                $('.tlt .times').html(kcjCount)
                                shareFlag=1;
                                save();
                                filter.css('display','none');
                                shareAgain.css('display','none');
                                $('.zz').attr("flag",1);
                            }else if(result==0){
                                return;
                            }else{
                                window.location.href='instr.html';
                            }
                        }
                    })
                }
            }
        });
    }
    wx.ready(initWXShare);
</script>
<!-- 天润测试代码 -->
<script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
<!-- /天润测试代码 -->
</body>
</html>
