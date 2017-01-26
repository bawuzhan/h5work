<%@ page contentType="text/html; charset=utf-8" language="java" import="java.util.*" errorPage="" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="m" uri="/microblog-tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String pathV3 = request.getContextPath();
	String basepV3 = request.getScheme() + "://"+ request.getServerName() + pathV3 + "/";
	String basePathV3 = request.getScheme() + "://"+ request.getServerName() +  pathV3 + "/microblog-v3/";
	String imgBasePath = "http://i0.peopleurl.cn/";
%>

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>国庆，怎么嗨！</title>
<meta name="description" content="国庆，怎么嗨！" />
<script src="<%=basepV3 %>microblog-v3/h5/guoqing/mobile.js" type="text/javascript"></script>
<link rel="stylesheet" href="<%=basepV3 %>microblog-v3/h5/guoqing/animation.css" type="text/css">
<link rel="stylesheet" href="<%=basepV3 %>microblog-v3/h5/guoqing/style.css" type="text/css">

<!-- 天润测试代码 -->
<META name="filetype" content="1">
<META name="publishedtype" content="1">
<META name="pagetype" content="2">
<META name="catalogs" content="SQ_0002001">
<!-- /天润测试代码 -->
</head>
<body>
<img src="<%=basepV3 %>microblog-v3/h5/guoqing/images/fenxiang.jpg" style="position:absolute;left:-1000px;top:-1000px;" alt="">
<div class="pb_pg page_vote">
  <div class="bg"></div>
  <div class="logo_w"></div>
  <div class="title zoomIn"></div>
  <div class="roler fadeInRight"></div>
  <div class="horn fadeInLeft"></div>
  <div class="hornTxt horntxtIn"></div>
  <ul class="voteList">
    <li class="voteOpt01"><a href="<%=path %>/guoqingH5Tp.action?xxId=1">宅在家</a><em style="width:<s:property value="bfbMap['1']" />%"></em></li>
    <li class="voteOpt02"><a href="<%=path %>/guoqingH5Tp.action?xxId=2">去相亲</a><em style="width:<s:property value="bfbMap['2']" />%"></em></li>
    <li class="voteOpt03"><a href="<%=path %>/guoqingH5Tp.action?xxId=3">加班</a><em style="width:<s:property value="bfbMap['3']" />%"></em></li>
    <li class="voteOpt04"><a href="<%=path %>/guoqingH5Tp.action?xxId=4">被堵在高速/景区/大卖场</a><em style="width:<s:property value="bfbMap['4']" />%"></em></li>
    <li class="voteOpt05"><a href="<%=path %>/guoqingH5Tp.action?xxId=5">吃吃吃</a><em style="width:<s:property value="bfbMap['5']" />%"></em></li>
    <li class="voteOpt06"><a href="<%=path %>/guoqingH5Tp.action?xxId=6">参加婚礼</a><em style="width:<s:property value="bfbMap['6']" />%"></em></li>
    <li class="voteOpt07"><a href="<%=path %>/guoqingH5Tp.action?xxId=7">回家陪亲人</a><em style="width:<s:property value="bfbMap['7']" />%"></em></li>
    <li class="voteOpt08"><a href="<%=path %>/guoqingH5Tp.action?xxId=8">出境游</a><em style="width:<s:property value="bfbMap['8']" />%"></em></li>
    <li class="voteOpt09"><a href="<%=path %>/guoqingH5Tp.action?xxId=9">上课</a><em style="width:<s:property value="bfbMap['9']" />%"></em></li>
    <li class="voteOpt10"><a href="<%=path %>/guoqingH5Tp.action?xxId=10">饱尝相思苦</a><em style="width:<s:property value="bfbMap['10']" />%"></em></li>
    <li class="voteOpt11"><a href="<%=path %>/guoqingH5Tp.action?xxId=11">没有你的选项?<i>点这里给小编拍砖</i></a><em style="width:<s:property value="bfbMap['11']" />%"></em></li>
  </ul>
    <div class="pdtTeam">策划:&nbsp;崔泽昊&nbsp;尚晓茜&nbsp;&nbsp;&nbsp;设计:&nbsp;韦梦&nbsp;&nbsp;&nbsp;开发:&nbsp;马迎琪&nbsp;&nbsp;史倩娥</div>
</div>
<script>
  H5tools.initView();
</script>
 <!-- 天润测试代码 -->
 <script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
 <!-- /天润测试代码 -->
</body>
</html>
