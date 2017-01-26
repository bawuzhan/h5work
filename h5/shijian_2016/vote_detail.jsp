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
<title>2016�����רѧ�����ʵ����ǧУǧ��ɹ���ѡ����ͶƱ</title>
<base href="/microblog-v3/h5/shijian_2016/">
<script type="text/javascript" src="http://i0.peopleurl.cn/microblog-v3/js/jquery-2.1.3.min.js"></script>

<link rel="stylesheet" href="style.css" type="text/css">
<!-- ������Դ��� -->
<META name="filetype" content="1">
<META name="publishedtype" content="1">
<META name="pagetype" content="2">
<META name="catalogs" content="SQ_0002001">
<!-- /������Դ��� -->
<!-- �ٶ�ͳ�� -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?8d2077d60272dd9e6d0ea4e1e413b118";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
<!-- /�ٶ�ͳ�� -->

<script type="text/javascript">

$(function(){
	$("#vote_smit").click(function(){
		$("#voteForm").submit();
	});
});

$(function(){
	$("#index_smit").click(function(){
		$("#indexForm").submit();
	});
});
</script>
</head>
<body>
<div class="page_02 page">
    <div class="cont">
        <div class="wrap" style="overflow:hidden">
            <div class="tDteail">
            	
                <h2><s:property value="shijianMap['title']" /></h2>
                <p>
                    <a href="http://bbs1.people.com.cn/post/80/1/1/<s:property value="shijianMap['postId']" />.html" title="">�鿴����>></a>
                    <img src="<s:property value="shijianMap['imageUrl']" />" height="330" width="445" alt="">
                    <span>�ŶӺ�Ӱ</span>
                </p>
                
                <s:if test="isVote==1">
                <a href="JavaScript:void(0)" title="" class="btn_voted">��ͶƱ</a>
                </s:if>
                <s:else>
                
                 
                <form action="voteShijian.action" method="post" id="voteForm">
            	<input type="hidden" name="sjId" id="sjId" value="<s:property value="shijianMap['confId']" />" />
            	<input type="hidden" name="sn" id="sn" value="<s:property value="sn" />">
            	</form>
                <a href="JavaScript:void(0)" title="" class="btn_vote" id="vote_smit">ͶƱ</a>
                
                </s:else>
                
            </div>
            <s:if test="isVote==1">
            <div class="detalTips">
                <p>����Ϊ�ö���Ͷ��Ʊ�������ظ�ͶƱ��</p>
                <form action="shijianIndex.action" method="post" id="indexForm">
            	   	<input type="hidden" name="sn" id="sn" value="<s:property value="sn" />">
            	</form>
                <a href="JavaScript:void(0)" title="" class="btn_back" id="index_smit">������ҳ</a>
            </div>
            </s:if>
        </div>  
        
    </div>
    <div class="footer"><img src="images/logo_rst.png" height="34" width="640" alt=""></div>
</div>
<script src="pub.js" type="text/javascript" charset="utf-8" async defer></script>
<%--
<!-- ������Դ��� -->
<script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
<!-- /������Դ��� -->
 --%>
</body>
</html>
