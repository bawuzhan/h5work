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
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>2016年大中专学生社会实践“千校千项”成果遴选网络投票</title>
<base href="/microblog-v3/h5/shijian_2016/">
<script type="text/javascript" src="http://i0.peopleurl.cn/microblog-v3/js/jquery-2.1.3.min.js"></script>

<link rel="stylesheet" href="style.css" type="text/css">
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

<script type="text/javascript">

$(function(){
	$("#wgt_smit").click(function(){
		var msgContent = $("#wgt_tId").val();
		var isTrue = msgContent.match(/([a-z]|[A-Z]|[0-9])+/);
		
		if (isTrue == null) {
			alert("请输入正确的项目或提案编号");
			return false;
		}
		
		$("#searchForm").submit();
	});
});
</script>

</head>
<body>
<div class="page_01 page">
    <div class="cont">
        <div class="banner"><img src="images/bg_01.jpg" alt=""></div> 
        <div class="searchT wrap">
            <p>请输入你支持的项目或提案编号</p> 
            <form accept-charset="utf-8" action="searchShijian.action" method="post" id="searchForm">
            	<input type="hidden" name="sn" id="sn" value="<s:property value="sn" />">
                <input type="text" name="sjId" value="" placeholder="" id="wgt_tId" autocomplete="off">
                <a href="javascript:void(0)" title="" id="wgt_smit">搜索</a>
            </form>
            <s:if test="searchResult==-1">
            <p class="tips">很抱歉，暂时没有找到你搜索的队伍
    请检查输入是否正确</p>
    		</s:if>
        </div>
        <div class="voteIntro wrap">
            <ul>
                <li>1. 投票至2016年10月5日17时止；</li>
                <li>2. 参与方式：通过搜索编号定位你支持的项目或提案，点击投票；</li>
                <li>3. 参与规则：每个微信帐号为单个项目或提案只限投一票；</li>
                <li>4. 为了公平公正，请勿刷票；</li>
                <li>5. 投票错误请联系 QQ：2367473848。</li>
            </ul>
        </div>  
    </div>
</div>
<script src="pub.js" type="text/javascript" charset="utf-8" async defer></script>
<%--
<!-- 天润测试代码 -->
<script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
<!-- /天润测试代码 -->
 --%>
</body>
</html>