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
<html style="font-size: 16px;">
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />

<title>2016年大中专学生社会实践“千校千项”成果遴选网络投票</title>
<base href="/microblog-v3/h5/shijian_2016/">

<link rel="stylesheet" href="animation.css" type="text/css">
<link rel="stylesheet" href="style.css" type="text/css">
</head>
<body>
<div class="page_04">

	<s:if test="!phList.isEmpty()">
  <table class="voteRank">
  	<s:iterator value="phList" status="stat">
  	
    <tr>
      <td class="Row1"><span class="Num<s:if test='#stat.count < 4'> bg01</s:if>"><s:property value="#stat.count" />.</span><p class="portName"><s:property value="title" />
  		</p></td>
      <td class="Row2"><span class="voteNum"><s:property value="tp_count" /></span></td>
    </tr>
    <%--
    </s:if>
    <s:else>
    <tr>
      <td class="Row1"><span class="Num">4.</span><p class="portName"> 北京大学志愿者服务队
   北京大学志愿者服务...
</p></td>
      <td class="Row2"><span class="voteNum">90018</span></td>
    </tr>
    
    </s:else>
     --%>
    </s:iterator>
  </table>
  </s:if>
</div>
<script src="pub.js" type="text/javascript" charset="utf-8" async defer></script>
</body>
</html>
