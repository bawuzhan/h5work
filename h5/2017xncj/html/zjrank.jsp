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
            height: 100%;
        }
        a, a:hover, a:target, a:visited, a:active {
            color: #000;
            display: block;
        }
        body{
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            background-image: url("../images/bg3.png");
            background-size: 100% 100%;
            font-family: "微软雅黑";
        }
        .contain{
            width: 4.54rem;
            margin: 0 auto;
            padding-top: 1.02rem;
        }
        .but_top{
            height: .68rem;
            width: 4.52rem;
            border: 1px solid #bd3217;
            border-radius: .05rem;
        }
        .but_top button{
            float: left;
            width: 2.26rem;
            height: 100%;
            font-size: .3rem;
            line-height: .68rem;
            background: none;
            border: none;
            color: #bd3217;
        }
        .but_top .select{
            background: #bd3217;
            color: #fff;
        }
        .left div{
            position: relative;
            top:.34rem;
            left:0;
            margin: 0 auto;
            width: 2.86rem;
            height: .46rem;
        }
        .left div span{
            display: block;
            width: 100%;
            font-size: .3rem;
            line-height: .56rem;
            text-align: center;
            color: #bd3217;
        }
        .list{
            padding-bottom: .2rem;
        }
        .list .left ul,.list .right ul{
            float: left;
         }
        .list ul li{
            font-size: .26rem;
            line-height: .56rem;
        }
        .name li,.data li{
            width: 2rem;
            color: #333;
            overflow: hidden;
        }
        .name li{
            height: .56rem;
            line-height:.56rem;
        }
        .prize li{
            width:2.4rem;
            height: .56rem;
            overflow:hidden;
        }
        .prize li a{
            display: block;
            width: 100%;
            height: 100%;
            color: #bd3217;
            text-decoration:underline;
        }
        .right div{
            margin: 0 auto;
            margin-top: 5.15rem;
            width: 4.32rem;
            height: 1.1rem;
            font-size: .24rem;
            line-height: .4rem;
            color: #333;
        }
        .right div a{
            display: inline;
            font-size: .24rem;
            line-height: .4rem;
            color: #333;
        }
        .but{
            width: 100%;
            position: absolute;
            bottom: 0;
        }
        .but button{
            width: 5.1rem;
            height: .7rem;
            position: absolute;
            bottom: .85rem;
            left: .65rem;
            border: none;
            border-radius: .05rem;
            background: #f3d073;
        }
        .but button a{
            width: 100%;
            height: 100%;
            font-size: .3rem;
            line-height: .7rem;
            color: #b22d1a;
        }
        .right{
            display: none;
        }
        .right div .finish{
            color: #b22d1a;
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
    <div class="but_top">
        <button class="select btn1">获奖名单</button>
        <a href="<%=pathV3 %>/xncj2017UserZjRecord.action?sn=<s:property value='sn' />"><button class="btn2">我的奖品</button></a>
    <div id="hidden" style="display: none">
    <p id="sn"><s:property value='sn' /></p>
    </div>
    </div >
    <div class='list'>
        <div class="left">
            <div>
                <span>超级幸运榜</span>
            </div>
    <div style="width: 100%; height: 5rem;overflow:auto;margin-top: .05rem;bottom: 0">
            <ul class="name">
            	<s:iterator value="zjRecord">
                <li><s:property value="nickname" /></li>
                </s:iterator>
            </ul>
            <ul class="prize">
            	<s:iterator value="zjRecord">
                <li><s:property value="hongbaoName" /></li>
                </s:iterator>
            </ul>
    </div>
        </div>
    </div>
</div>
<div class="but">
    <button><a href="<%=pathV3 %>/xncj2017CJ.action?sn=<s:property value='sn' />">去摇奖</a></button>
</div>
<script src="../js/index.js"></script>
<script src="../js/zepto.min.js"></script>
<script>

    //请求数据  绑定数据
   /* $.get('', function(response){
        /!*绑定数据  *!/
        omit();
    })*/
    //超出变为省略号
    omit();
    function omit(){
        var reg=/[\u4e00-\u9fa5]{1,}/g;
        $('.name>li').each(function(index,item){
            if(reg.test($(item).text())&&$(item).text().length>4){
                $(item).html(($(item).text()).substring(0,4)+'...');
            }else{
                if($(item).text().length>8){
                    $(item).html(($(item).text()).substring(0,8)+'...');
                }
            }
        })
    }
    //左右切换
    <%--$('.btn1').singleTap(function(){--%>
        <%--$('.left').css('display','block');--%>
        <%--$('.right').css('display','none');--%>
        <%--$('.btn1').addClass('select')--%>
        <%--$('.btn2').removeClass('select')--%>
        <%--$('body').css('backgroundImage','url("../images/bg3.png")')--%>
    <%--})--%>
    <%--$('.btn2').singleTap(function(){--%>
        <%--$('.right').css('display','block');--%>
        <%--$('.left').css('display','none');--%>
        <%--$('.btn2').addClass('select')--%>
        <%--$('.btn1').removeClass('select')--%>
        <%--$('body').css('backgroundImage','url("../images/bg4.png")')--%>
    <%--})--%>
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
