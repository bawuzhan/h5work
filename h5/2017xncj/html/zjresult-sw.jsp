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
    <base href="/microblog-v3/h5/2017xncj/html/">
    <link rel="stylesheet" href="../css/reset.min.css"/>
    <style>
        html {
            font-size: 100px;
        }
        a, a:hover, a:target, a:visited, a:active {
            color: #000;
            display: block;
        }
        html,body{
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            background: url("../images/bg2.png") no-repeat;
            background-size: cover;
            font-family: "微软雅黑";
        }
        .contain{
            width: 5.1rem;
            height: 100%;
            margin: 0 auto;
        }
        .contain .z-top{
            width: 5.1rem;
            position: relative;
            padding-bottom:.1rem;
        }
        .contain .z-top img{
            width: 100%;
            height: 3.48rem;
        }
        .z-top span,.z-mid span{
            display: block;
            width: 100%;
            color: #fff;
            text-align: center;
        }
        .z-top span:nth-of-type(1){
            font-family: MStiffHeiPRC;
            position: absolute;
            top:2.8rem;
            display: block;
            text-align: center;
            width: 100%;
            font-size: .5rem;
            line-height: .5rem;
            color: #b22d1a;
            font-weight: bolder;
        }
        .z-top span:nth-of-type(2){
            font-size: .28rem;
            line-height: .5rem;
        }
        .z-top span:nth-of-type(3){
            font-size: .4rem;
            line-height: .5rem;
        }
        .z-top span:nth-of-type(3) a{
            display:inline;
            color:#fff;
            text-decoration: underline;
        }
       .Iphone{
            width: 100%;
            height: auto;
       }
        .Iphone img{
            display: block;
            width: 2.44rem;
            height: 2.44rem;
            border: 2px dashed #b22d1a;
            border-radius: 50%;
            margin: 0rem auto;
            background: #fff;
        }
        .Iphone span{
            display: block;
            width: 100%;
            font-size: .24rem;
            line-height: .5rem;
            color:#333;
            text-align: center;
        }
        .z-bot button{
            display: block;
            width: 100%;
            height: .86rem;
            margin:.2rem auto;
            background: #f3d073;
            border: none;
            border-radius: .05rem;
            font-size: .4rem;
            font-family: "微软雅黑";
            line-height: .86rem;
            text-align: center;
        }
        .z-bot button a{
            color: #b22d1a;
        }
        .z-bot div img{
            display: block;
            width: 1.65rem;
            height: 1.65rem;
            margin: .2rem auto;
        }
        .z-bot span{
            display: block;
            width: 100%;
            color: #fff;
            text-align: center;
            font-size: .28rem;
            line-height: .5rem;
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
<body>
<div class="contain">
    <div class="z-top">
        <img src="../images/fj_03.png" alt=""/>
        <span>中奖啦</span>
        <span>恭喜您获得由<s:property value="zjHbInfo.hongbaoProvider" />提供的</span>
        <span><s:property value="zjHbInfo.hongbaoName" />一<s:property value="zjHbInfo.showNum" />
        <s:if test="zjHbInfo.hongbaoId==22 || zjHbInfo.hongbaoId==30 
        || zjHbInfo.hongbaoId==31 || zjHbInfo.hongbaoId==32">
        (<a href="<s:property value="zjHbInfo.memo" />">使用说明</a>)
        </s:if>
        </span>
    </div>
    <div class="Iphone">
        <img src="<s:property value='zjHbInfo.hongbaoImg' />" alt=""/>
        <span>请如实填写个人信息，以便奖品快速投入怀抱</span>
    </div>
    <div class="z-bot">
        <button><a href="<%=pathV3 %>/xncj2017Contact.action?sn=<s:property value='sn' />">完善信息领奖</a></button>
        <div>
            <img src="<s:property value='zjHbInfo.hongbaoLinkImg' />" alt=""/>
        </div>
        <span>欢迎关注<s:property value='zjHbInfo.barcodeName' /></span>
    </div>
</div>
    <div id="hidden" style="display: none">
    <p id="sn"><s:property value='sn' /></p>
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
