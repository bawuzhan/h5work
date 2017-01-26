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
<title>2015全国大学生社会实践评选活动</title>

<!-- <script src="mobileshow.js" type="text/javascript"></script> -->
<link rel="stylesheet" href="<%=basePathV3 %>h5/shijian/animation.css" type="text/css">
<link rel="stylesheet" href="<%=basePathV3 %>h5/shijian/style.css" type="text/css">

<!-- 天润测试代码 -->
<META name="filetype" content="1">
<META name="publishedtype" content="1">
<META name="pagetype" content="2">
<META name="catalogs" content="SQ_0002001">
<!-- /天润测试代码 -->
</head>
<body>
<div class="page_vote">
	<s:if test="!phList.isEmpty()">
  <table>
  	<s:iterator value="phList" status="stat">
  	<tr>
      <td class="Row1"><span class="Num"><s:property value="#stat.count" /></span></td>
      <td class="Row2"><p class="portName"><a href="<%=pathV3 %>/h5/shijian/<s:property value="conf_id" />"><s:property value="content" /></a></p></td>
      <td class="Row3"><span class="voteNum"><s:property value="tp_count" />票</span></td>
    </tr>
  	</s:iterator>
    
   </table>
   </s:if>
   <s:else>
   <div align="center" style="color:#999;font-size:14px;padding:40px">没有查询结果！</div>
   </s:else>
</div>
<script>
(function(){
  var viewWidth = document.body.clientWidth;
  var isMobile = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);
  var isWX =  navigator.userAgent.indexOf('Messenger') !== -1;

  isMobile = isMobile ? isMobile[0] : false;
  
  if(isMobile){
    var f = document.documentElement.clientWidth / 640 * 32;
     document.documentElement.style['font-size'] = f + 'px';
    if(document.documentElement.clientWidth / document.documentElement.clientHeight > 0.6349){
      //小屏幕手机单独定义CSS
      //document.body.className = 'smallScreen';
      f = document.documentElement.clientHeight / 1008 * 32;
    }
    document.documentElement.style['font-size'] = f + 'px';
    document.body.style['max-width'] = '20rem';
    document.body.style['width'] = viewWidth + 'px';
    document.body.style['position'] = 'relative';
  }else{
    var f = document.documentElement.clientHeight / 504 * 16,
      viewWidth = Math.round(document.documentElement.clientHeight / 504 * 320);
    document.documentElement.style['font-size'] = f + 'px';
    // document.body.style['overflow'] = 'hidden';
    document.body.style['max-width'] = '640px';
    document.body.style['width'] = viewWidth + 'px';
    document.body.style['position'] = 'relative';

  };
})();
</script>

<!-- 天润测试代码 -->
<script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
<!-- /天润测试代码 -->

</body>
</html>
