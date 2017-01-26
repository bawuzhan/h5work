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
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <title></title>
    <base href="/microblog-v3/h5/2017zpcj/html/">
    <link rel="stylesheet" href="../css/reset.min.css"/>
    <link rel="stylesheet" href="../css/index.css"/>
    <link rel="stylesheet" href="../css/common.css"/>
    <style>
    html {
    font-size: 100px;
    }
    html,body{
    width: 100%;
    overflow-x: hidden;
    font-family: "微软雅黑";
    }
    .filter{
    height: 10.4rem;
    background: none;
    display: block;
    }
    .filter .zj_2{
    display: block;
    height: 100%;
    width: 100%;
    background: url("../images/bg_zj1.png") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    }
    </style>
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
<body class="filter">
    <div class="zj_2">
        <span>恭喜您获得</span>
        <span>由<a href="javascript:;"><s:property value="zjHbInfo.hongbaoProvider" /></a>提供的</span>
        <h2><s:property value="zjHbInfo.hongbaoName" />一<s:property value="zjHbInfo.showNum" />
        </h2>
        <img src="<s:property value='zjHbInfo.hongbaoImg' />" alt=""/>
        <span>请如实填写个人信息，<br>以便奖品快速投入怀抱哦</span>
    <button><a href="<%=pathV3 %>/jkcj2017Contact.action?sn=<s:property value='sn' />">完善信息领奖</a></button>
    </div>
<script src="../js/index.js"></script>
<script>
    //获取参数 绑定相应物品
    var str=window.location.href
    function GetHref(str){
        arr=str.split('?');
        return arr[2];
    }
    var hax= GetHref(str)
</script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript">
    var src = "http://mblog.people.com.cn/weixinJS.action?url=" + encodeURIComponent(location.href.split('#')[0]);
    var left = unescape('%3c');
    var right = unescape('%3E');
    document.write(left + 'script src="' + src + '"' + right + left + '/script' + right);
    </script>
    <script type="text/javascript" src="../js/share.js"></script>
    <!-- 天润测试代码 -->
<script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
<!-- /天润测试代码 -->

</body>
</html>
