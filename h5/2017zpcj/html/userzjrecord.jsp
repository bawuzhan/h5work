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
    <link rel="stylesheet" href="../css/cjxx.css"/>
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
<%--
<s:if test="needContact == 1">
<body style="background-image: url('../images/bg4.png')">
</s:if>
<s:else>
<body style="background-image: url('../images/bg3.png')">
</s:else>
 --%>
<div class="contain">
    <div class="but_top">
        <a href="<%=pathV3 %>/jkcj2017ZjRank.action?sn=<s:property value='sn' />"><button class="btn1">获奖名单</button></a>
        <button class="select btn2">我的奖品</button>
    <div id="hidden" style="display: none">
    <p id="sn"><s:property value='sn' /></p>
    </div>
    </div >
    <div class='list'>
        <div class="right">
        	<s:if test="zjRecord != null && zjRecord.size() > 0">
        		<s:if test="needContact == 1">
        		<div style="width: 100%; height: 5.1rem;overflow:auto;margin-top: .05rem;bottom: 0">
        		</s:if>
        		<s:else>
                <div style="width: 100%; height: 5.1rem;overflow:auto;margin-top: .05rem;bottom: 0">
                </s:else>
            <ul class="data">
            	<s:iterator value="zjRecord">
                <li><s:property value="zhongjiangDate" /></li>
                </s:iterator>
            </ul>
            <ul class="prize">
            	<s:iterator value="zjRecord">
                <li><a href="<%=pathV3 %>/jkcj2017ZjResult.action?sn=<s:property value='sn' />&zjRecordId=<s:property value='zjId' />"><s:property value="hongbaoName" /></a></li>
                </s:iterator>
            </ul>
                </div>
            </s:if>
        </div>
    </div>
</div>
<div class="but">
    <button><a href="<%=pathV3 %>/jkcj2017CJ.action?sn=<s:property value='sn' />">去抽奖</a></button>
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
