<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK" import="java.util.*"%>
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
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>2016�����רѧ�����ʵ����ǧУǧ��ɹ���ѡ����ͶƱ</title>
<base href="/microblog-v3/h5/shijian_2016/">
<script type="text/javascript" src="http://i0.peopleurl.cn/microblog-v3/js/jquery-2.1.3.min.js"></script>

<link rel="stylesheet" href="style.css" type="text/css">
<!-- ������Դ��� -->
<META name="filetype" content="1">
<META name="publishedtype" content="1">
<META name="pagetype" content="2">
<META name="catalogs" content="SQ_0002001">
<!-- /������Դ��� -->
<!-- �ٶ�ͳ�� -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?8d2077d60272dd9e6d0ea4e1e413b118";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
<!-- /�ٶ�ͳ�� -->

<script type="text/javascript">
$(function(){
	$("#index_smit").click(function(){
		$("#indexForm").submit();
	});
});
</script>
</head>
<body>
<div class="page_03 page">
    <div class="cont">
        <div class="wrap" style="overflow:hidden">
            <div class="voteRst">
            	<s:if test="isVote==1">
            <div class="detalTips">
                <p>����Ϊ�ö���Ͷ��Ʊ�������ظ�ͶƱ��</p>
                <form action="shijianIndex.action" method="post" id="indexForm">
            	   	<input type="hidden" name="sn" id="sn" value="<s:property value="sn" />">
            	</form>
            </div>
            </s:if>
                <s:else>
                <div class="rstTips"><img src="images/rst_OK.png" height="52" width="276" alt=""></div>
                <h2><s:property value="shijianMap['title']" /></h2>
                <p>
                    <span>��ǰ��Ʊ��<br /><b><s:property value="voteCount" /></b></span>
                </p>
                </s:else>
            </div>
            <div class="arrCtrl">
                <a href="JavaScript:void(0)" title="" class="btn_toShare" id="btn_share">��������</a>
                 
                <a href="/shijianPh.action" title="" class="btn_toRank">Top���а�</a>
                
                 
                 <form action="shijianIndex.action" method="post" id="indexForm">
            	   	<input type="hidden" name="sn" id="sn" value="<s:property value="sn" />">
            	</form>
                <a href="JavaScript:void(0)" title="" class="btn_toVote" id="index_smit">����ͶƱ</a>
                
            </div>
        </div>  
        
    </div>
    <div class="footer"><img src="images/logo_rst.png" height="34" width="640" alt=""></div>
    <div id="shareAlert"><div class="shareArr"></div><div class="shareText">���ڿ��Ե������<br>�������������Ȧ��</div></div>
</div>
<script src="pub.js" type="text/javascript" charset="utf-8" async defer></script>

<!-- ΢�ŷ���ӿ� -->
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

<%--
<script type="text/javascript">

var src = "http://58.68.146.12/weixin/JS.js?url=" + encodeURIComponent(location.href.split('#')[0]);
var left = unescape('%3c');
var right = unescape('%3E');
document.write(left + 'script src="' + src + '"' + right + left + '/script' + right);
</script>
<script>
var imgUrl = 'http://t.people.com.cn/microblog-v3/h5/shijian_2016/images/pic01.jpg';
var link =  'http://t.people.com.cn/microblog-v3/h5/shijian_2016/intro.htm';
var title = '2016ȫ����ѧ�����ʵ��';
var desc= 'ʵ���ͶƱ';

peopleWXConfig.jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'];
wx.config(peopleWXConfig);
wx.ready(function() {

    wx.onMenuShareAppMessage({
        title: title,
        desc:desc,
        link: link,
        imgUrl:imgUrl
    });
    wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl:imgUrl
    });
    wx.onMenuShareQQ({
        title: title,
        desc:desc,
        link: link,
        imgUrl:imgUrl
    });
    wx.onMenuShareWeibo({
        title: title,
        desc:desc,
        link: link,
        imgUrl:imgUrl
    });
});
</script>
 --%>

<script type="text/javascript">

var src = "http://58.68.146.12/weixin/JS.js?url=" + encodeURIComponent(location.href.split('#')[0]);
var left = unescape('%3c');
var right = unescape('%3E');
document.write(left + 'script src="' + src + '"' + right + left + '/script' + right);
</script>
<script>
var shareData = {
  imgUrl : 'http://mblog.people.com.cn/microblog-v3/h5/shijian_2016/images/icon.jpg',
  link :  'http://mblog.people.com.cn/microblog-v3/h5/shijian_2016/intro.htm',
  title : '2016���������ʵ����ǧУǧ���ѡ�ͶƱ��',
  desc : '������٣�����Ͷ�������硱���ʵ����ȡ�óɹ���Ϊ���Ǽ��Ͱɣ�'
};

peopleWXConfig.jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'];
wx.config(peopleWXConfig);
function initWXShare(){
    wx.onMenuShareAppMessage({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl
    });
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

<%--
<!-- ������Դ��� -->
<script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
<!-- /������Դ��� -->
 --%>
</body>
</html>
