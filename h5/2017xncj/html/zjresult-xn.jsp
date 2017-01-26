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
        .z-mid{
            width: 4.62rem;
            height: auto;
            padding: .2rem;
            padding-bottom: .1rem;
            border: 2px dashed #333;
            border-radius: .05rem;
            overflow: hidden;
        }
        .z-mid span:nth-of-type(1){
            font-size: .28rem;
            line-height: .5rem;
            padding-bottom: .1rem;
        }
        .z-mid div{
            width: 4.62rem;
            margin: 0 auto;
            border-bottom: 2px solid #8e2314;
        }
        .z-mid p{
            width: 4.62rem;
            margin-top: .2rem;
            margin-bottom: .1rem;
            font-size: .24rem;
            line-height: .34rem;
            color:#333;
        }
        .z-mid a{
            float: right;
            font-size: .24rem;
            line-height: .34rem;
            color:#333;
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
        <span><s:property value="zjHbInfo.hongbaoName" />一<s:property value="zjHbInfo.showNum" /></span>
    </div>
    <div class="z-mid">
        <span>兑换码:<s:property value="zjHbInfo.ticket" /></span>
        <div></div>
        <p class="offer"><s:property value="zjHbInfo.hongbaoInfo" /></p>
        <a class="show" href="javascript:;">展开全部</a>
    </div>
    <div class="z-bot">
        <a href="<%=pathV3 %>/xncj2017CJ.action?sn=<s:property value='sn' />"><button>再摇一次</button></a>
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
<script src="../js/zepto.min.js"></script>
<script>
    //获取参数 绑定相应的兑换码和奖品名称

    //使用说明 展开收起
    //判断字数
    var $show=$(".show");
    $show.attr("flag","false");
    var $offer=$(".offer");
    var offInner=$offer.html()
    console.log(offInner);
    if(offInner.length>38){//大于100字才有按钮
        var a=offInner;
        $offer.html(offInner.substr(0,35)+"...");
        $show.singleTap(function(){
            var flag = $show.attr("Flag");
            if (flag ==="false") {//这样是收起状态 让文字变为展开
                $offer.html(a);
                $show.attr("flag", "true").html("收起");
                return;
            }else{//这样是展开状态  让文字变为收起的
                $offer.html(offInner.substr(0,35)+"...");
                $show.attr("flag", "false").html("展开全部");
            }
        });
    }
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
