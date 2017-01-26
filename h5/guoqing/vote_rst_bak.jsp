<%@ page contentType="text/html; charset=utf-8" language="java" import="java.util.*" errorPage="" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="m" uri="/microblog-tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
	String pathV3 = request.getContextPath();
	String basePathV3 = request.getScheme() + "://"+ request.getServerName() +  pathV3 + "/microblog-v3/";
	String basepV3 = request.getScheme() + "://"+ request.getServerName() + pathV3;
	String imgBasePath = "http://i0.peopleurl.cn/";
%>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title><s:property value="xxTitle" escapeHtml="false" />，你呢？</title>
<meta name="description" content="这个十一 怎么嗨！" />
<script src="<%=imgBasePath %>microblog-v3/h5/guoqing/mobile.js" type="text/javascript"></script>
<link rel="stylesheet" href="<%=imgBasePath %>microblog-v3/h5/guoqing/animation.css" type="text/css">
<link rel="stylesheet" href="<%=imgBasePath %>microblog-v3/h5/guoqing/style.css" type="text/css">
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
    var src = "http://58.68.146.12/weixin/JS.js?url=" + encodeURIComponent(location.href.split('#')[0]);
    var left = unescape('%3c');
    var right = unescape('%3E');
    document.write(left + 'script src="' + src + '"' + right + left + '/script' + right);
</script>
<script>
    var imgUrl = 'http://bbs1.people.com.cn/support/logo/weixinqixi.jpg';
    var link =  'http://bbs1.people.com.cn/support/qixi_v2.html';
    var title = '这个七夕，我不要……';
    var desc = '七夕“轻节日”——看，他们都不要啦！这个七夕，你有什么是不要不要的？';
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

	<!-- end copy -->

</head>
<body>
<img src="<%=imgBasePath %>microblog-v3/h5/guoqing/images/fenxiang.jpg" style="position:absolute;left:-1000px;top:-1000px;" alt="">
<div class="pb_pg page_rst">
  <div class="bg<s:property value="xxId" />"></div>
  <div class="logo_w"></div>
   <table class="rstTxt">
    <tr>
      <td>我是第 <strong><s:property value="xxCount" /></strong> <s:property value="xxStr" escapeHtml="false" /></td>
    </tr>
  </table>
  <a href="javascript:void(0)" class="toShare btn_share" ></a>
  <a href="<%=path %>/guoqingH5.action" class="toVote"></a>
</div>
<div id="shareAlert"><div class="shareArr"></div><div class="shareText">现在可以点击这里<br>点击【分享到朋友圈】</div></div>
<script>
  function Q(s, p){
      return (p || document).querySelector(s);
  };
  H5tools.initView();
  
  //微信分享时的缩略图
  if(H5tools.isWX){
    var img = new Image();
    img.src = 'images/icon.jpg';
    img.style.position = 'absolute';
    img.style.top = '-1000px';
    img.style.left = '-1000px';
    document.body.insertBefore(img, document.body.firstChild);
  };
  // 分享按钮
  Q('.btn_share').onclick=function(){showShare();}
  //显示分享提示，分享按钮可以调用
function showShare(){
  if(!H5tools.isWX){
    document.getElementById('shareAlert').innerHTML = '<div class="othersShare">分享：<a href="javascript:void(0)" onclick="shareSina()"><img src="/microblog-v3/2014subject/1216_oneword/images/sina.png"></a> <a href="javascript:void(0)" onclick="sharePeople()"><img src="/microblog-v3/2014subject/1216_oneword/images/people.png"></a> <a href="javascript:void(0)" onclick="shareTencent()"><img src="/microblog-v3/2014subject/1216_oneword/images/tencent.png"></a></div>';
  };
  Q('#shareAlert').style.display = 'block';
  setTimeout(function(){
  Q('#shareAlert').style.display = 'none';
  }, 10000);
};
history.pushState({
	title: document.title,
	url: location.href
}, document.title, '/g/guoqing2015');

</script>
<!-- 天润测试代码 -->
 <script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
 <!-- /天润测试代码 -->
</body>
</html>