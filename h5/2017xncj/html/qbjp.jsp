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
	<base href="/microblog-v3/h5/2017xncj/html/">
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <title></title>
    <link rel="stylesheet" href="../css/reset.min.css"/>
    <style>
        html {
            font-size: 100px;
        }

        a, a:hover, a:target, a:visited, a:active {
            color: #000;
            display: block;
        }
        html, body {
            width: 100%;
            overflow-x: hidden;
            background: url("../images/bg0_02.png") repeat-y;
            background-size:100%;
            font-family: "微软雅黑";
        }
        .head {
            width: 100%;
            height: 4.85rem;
            background: url("../images/title_01.png") no-repeat;
            background-size: cover;
        }

        .head span {
            display: block;
            width: 100%;
            font-size: .34rem;
            line-height: .6rem;
            color: #b22d1a;
            text-align: center;
            position: absolute;
            top: 3.35rem;
        }

        .contain {
            height: auto;
            width: 5.6rem;
            margin: 0 auto;
        }
        .contain ul{
            width: 100%;
            background: url("../images/bg6_04_01.png") repeat-y;
            background-size:100% 3.31rem;
            overflow: hidden;
            padding-bottom: .26rem;
        }
        .contain ul li{
            float: left;
            margin-left: .26rem;
            margin-top: .72rem;
            width: 2.42rem;
            height: 2.6rem;
            background: #dec18e;
        }
        .contain ul li.fir{
            margin-top: .2rem;
        }
        .contain ul li img{
            display: block;
            width: 2.16rem;
            height: 1.96rem;
            margin: .13rem;
            margin-bottom: .05rem;
            position: relative;
        }
        .contain ul li div{
            position: relative;
            height: .32rem;
            width: 100%;
        }
        .contain ul li div span.sub0{
            display: block;
            position: absolute;
            width: 1.1rem;
            height: .32rem;
            background: url("../images/logo_06.png") no-repeat;
            background-size: 100% 100%;
            top:-.64rem;
            left:-.1rem;
            font-size: .2rem;
            line-height: .32rem;
            padding-left: .2rem;
            color: #fff;
        }
        .contain ul li div span.sub{
            margin-left: .16rem;
            font-size: .24rem;
            line-height: .4rem;
            color: #b9292b;

        }
        .contain ul li div span:nth-of-type(3){
            margin-left: .46rem;
            font-size: .24rem;
            line-height: .4rem;
            background: #cf5a1a;
            padding: 0 .1rem;
            color: #fff;
            border-radius: .05rem;
        }
        .contain button{
            display: block;
            width: 100%;
            height: .7rem;
            background: #c7350b;
            border: none;
            border-radius: .05rem;
            margin-top: .36rem;
            text-align: center;
            font-size: .3rem;
        }
        .contain button a{
            display: block;
            width: 100%;
            height: 100%;
            line-height: .7rem;
            color: #fff;
        }
        footer{
            width: 100%;
            background:#b22d1a;
            height: .74rem;
            position: relative;
            bottom: 0;
            margin-top: .45rem;
        }
        footer i{
            float: left;
            width: .95rem;
            height: .4rem;
            background: url("../images/logo_12.png") no-repeat;
            background-size: 100% 100%;
            margin-top: .17rem;
            margin-left: 2.3rem;
        }
        footer span{
            font-size: .23rem;
            margin-left: .1rem;
            line-height: .74rem;
            color: #fff;
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
<div class="head">
    <span>全部奖品</span>
    <div id="hidden" style="display: none">
    <p id="sn"><s:property value='sn' /></p>
    </div>
</div>
<div class="contain">
    <ul>
    	<s:iterator value="hbList" status="stat">
    	<s:if test="#stat.index<=1">
        <li class="fir">
        </s:if>
        <s:else>
        <li>
        </s:else>
            <img src="<s:property value='hongbaoImg' />" alt=""/>
            <div>
            	<s:if test="showPrice==1">
            		<span class="sub0">￥<s:property value='hongbaoPrice' /></span>
            	</s:if>
                <span class="sub"><s:property value='hongbaoName' /></span>
                
            </div>
        </li>
        </s:iterator>
    </ul>
    <button><a href="<%=pathV3 %>/xncj2017CJ.action?sn=<s:property value='sn' />">去抽奖</a></button>
</div>
<footer><i></i><span>出品</span></footer>
    <script src="../js/zepto.min.js"></script>
    <script>
    $(function(){
    $('.sub0').each(function(index,item){
    if($(item).html()==""){
    $(item).css("display","none");
    }
    })
    })




    var GetLength = function (str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
    }
    return realLength;
    };

    function cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
    a = str.charAt(i);
    str_length++;
    if (escape(a).length > 4) {
    //中文字符的长度经编码之后大于4
    str_length++;
    }
    str_cut = str_cut.concat(a);
    if (str_length >= len) {
    <%--str_cut = str_cut.concat("...");--%>
    return str_cut;
    }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
    return str;
    }
    }
    $('.sub').each(function(index,item){
        if(GetLength($(item).html())>18){
            $(item).html(cutstr($(item).html(), 18));
    }
    })
    </script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="../js/index.js"></script>
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
