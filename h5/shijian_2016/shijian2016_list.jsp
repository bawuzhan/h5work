<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK" import="java.util.*"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="m" uri="/microblog-tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%  
	String pathV3 = request.getContextPath();
	String basePathV3 = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ pathV3 + "/microblog-v3/";
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ pathV3 + "/microblog/";
	String basepV3 = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ pathV3;
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>全站公告管理_人民微博</title>
<link rel="stylesheet" href="<%=basePathV3 %>css/public.css" />
<link rel="stylesheet" href="<%=basePathV3 %>css/page_admin.css" />
<script type="text/javascript" src="<%=basePathV3 %>js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="<%=basePathV3 %>js/weibo-widgets.js"></script>
<script type="text/javascript" src="<%=basePathV3 %>js/weibo-class.js"></script>

<script type="text/javascript" src="<%=basePath %>admin_new/js/siteinfo_admin.js"></script>

<style>
.blk_fm{border-bottom-style:dashed}
.layer_ok{left:150px;right:0;height:60px;line-height:60px;width:170px}
.pb_tabel04{width:100%;border:1px solid #ccc;text-align:center;margin:20px 0}
.pb_tabel04 th{font-weight:700;}
.pb_tabel04 th,.pb_tabel04 td{line-height:30px;border:1px solid #ccc;}
.pb_tabel04 td{border-bottom:1px dashed #ccc;border-top:1px dashed #ccc;}
.pb_tabel04 .tb_a{text-align:left;width:50px;padding:0 20px}
</style>
</head>

<body>
<div class="wrap_970 admin_color">
    <!--blk_nav-->
    <!--/blk_nav-->
    <!-- main -->
	<div class="blk_admin_main pb_boder01">
    	<div class="padd_02">
            <s:if test="!imgList.isEmpty()">
            <!-- 分页 -->
            <div  class="wbp_pagelist_blue" style="border:none">
                 总共：<s:property value="t" escape="false" /> 条
            </div>
            <!-- /分页 -->
            <table class="pb_tabel04">
            	<tr>
            	<th class="tb_a">序号</th> 
            	<th class="tb_a">编号</th>
				<th class="tb_b">项目名称</th>
                <th class="tb_b">投票数</th>
                <th class="tb_b">链接</th>
                </tr>
                <s:iterator value="imgList" status="stat">
				<tr id="<s:property value='conf_id' />">
				<td class="tb_a"><s:property value="#stat.count" /></td>
				<td class="tb_a"><s:property value="conf_id" /></td>
				<td><s:property value="title" /></td>
                <td><s:property value="tp_count" /></td>
                <td class="tb_a"><a href="http://bbs1.people.com.cn/post/80/1/1/<s:property value="post_id" />.html" target="_blank"><s:property value="post_id" /></a></td>
                </tr>
                </s:iterator>
            </table>
            <!-- 分页 -->
            <div  class="wbp_pagelist_blue" style="border:none">
                总共：<s:property value="t" escape="false" /> 条
            </div>
            <!-- /分页 -->
            </s:if>
            <s:else>
            <div align="center" style="color:#999;font-size:14px;padding:40px">没有查询结果！</div>
            </s:else>
        </div>
    </div>
    <!-- /main -->
    
</div>
</body>
</html>
