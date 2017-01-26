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
        html,body{
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            background: url("../images/bg3.png") no-repeat;
            background-size: 100% 100%;
            font-family: "微软雅黑";
        }
        .contain{
            width: 4.42rem;
            height: 5.77rem;
            margin: 0 auto;
            padding-top: 1.25rem;
        }
        .contain span{
            display: block;
            text-align: center;
            color: #b22d1a;
        }
        .contain span:nth-of-type(1){
            font-size: .36rem;
            line-height: .5rem;
        }
        .contain span:nth-of-type(2){
            font-size: .28rem;
            line-height: .5rem;
        }
        .form{
            height: 4.18;
            width: 100%;
            margin-top: .3rem;
        }
        .form form{
            width: 100%;
            height: 100%;
            display: block;
            color:#b22d1a;
            font-size: .3rem;
            line-height: .45rem;
        }
        .form form input{
    width: 2.58rem;
            height: .52rem;
            border: 1px solid #b22d1a;
            padding-left: .1rem;
            border-radius: .05rem;
            margin-top: .35rem;
            color:#b22d1a;
        }
        .form form textarea{
    width: 2.58rem;
            height: 1.5rem;
            border: 1px solid #b22d1a;
            padding-left: .1rem;
            border-radius: .05rem;
            margin-top: .35rem;
            resize: none;
            color:#b22d1a;
        }
        .form form .address{
            position: relative;
            top:-1.25rem;
        }
        .form form label{
            display: inline-block;
            width: 78px;
        }
        .but{
            width: 100%;
            position: relative;
            top: 0;
        }
        .but button{
            width: 5.1rem;
            height: .7rem;
            position: absolute;
            top: 2rem;
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
        .delay{
            display: none;
            position: absolute;
            width: 4rem;
            height: 2rem;
            background: rgba(0,0,0,0.8);
            color: #fff;
            border-radius: .1rem;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin:auto;
        }
        .close{
            width: .36rem;
            height: .36rem;
            margin-left: 3.5rem;
            margin-top: .1rem;
            position: absolute;
            background: url(../images/close_03.png) no-repeat 0 0;
            background-size: 100% 100%;
            z-index: 20;
        }
        .delay span{
            display: block;
            width: 90%;
            padding: 5%;
            margin-top: .45rem;
            line-height: .5rem;
            font-size: .28rem;
            color: #b22d1a;
            text-align: center;
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
    <span>请如实填写您的个人信息</span>
    <span>以保证奖品顺利寄送到您的手中</span>
    <div class="form">
        <form action="">
        	<input type="hidden" id="sn" name="sn" value="<s:property value='sn' />" />
        	<input type="hidden" id="existsContact" name="existsContact" value="<s:property value='existsContact' />" />
            <label for="name">姓　　名</label>
            <input id="name" name="trueName" type="text" value="<s:property value='contact.trueName' />"></input>
            <label for="phone">联系电话</label>
            <input id="phone" type="tel" name="phone" value="<s:property value='contact.phone' />"></input>
            <label for="address" class="address">寄送地址</label>
            <textarea id="address" name="address"><s:property value='contact.address' /></textarea>
            <label for="id">身份证号</label>
            <input id="id" type="text" name="personId" value="<s:property value='contact.personId' />"></input>
        </form>
    </div>
</div>
<div class="but">
    <button id="but"><a href="javascript:;">提交</a></button>
</div>
<div class="delay">
    <div class="close"></div>
    <span></span>
</div>
    <div id="hidden" style="display: none">
    <p id="sn"><s:property value='sn' /></p>
    </div>
<script src="../js/zepto.min.js"></script>
<script>
    //适配
    if (document.documentElement.clientWidth / document.documentElement.clientHeight > 0.76) {
        viewWidth = Math.round(document.documentElement.clientHeight / 416 * 320);
        viewScale = viewWidth / 640;
    } else {
        viewScale = document.documentElement.clientWidth / 640;
    };
    document.documentElement.style.fontSize = 100 * viewScale + 'px';

    //表单验证
    var flag=true,$name=$('#name')[0],$phone=$('#phone')[0],$address=$('#address')[0],$id=$('#id')[0]
    $name.onblur=function(){
        var reg=/^[\u4e00-\u9fa5]{2,}$/
        if(!reg.test(this.value.trim())){
            $('.delay>span').text('请输入正确的姓名');
            $('.delay').css('display','block')
            flag=false;
        }else{
            flag=true;
        }
    }
    $phone.onblur=function(){
        var reg=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        if(!reg.test(this.value.trim())){
            $('.delay>span').text('请输入正确的手机号');
            $('.delay').css('display','block')
            flag=false;
        }else{
             flag=true;
        }
    }
    $address.onblur=function(){
        if(!this.value.trim()){
            $('.delay>span').text('请输入正确的寄送方式');
            $('.delay').css('display','block')
            flag=false;
        }else{
            flag=true;
        }
    }
    $id.onblur=function(){
        var reg=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
        if(!reg.test(this.value.trim())){
            $('.delay>span').text('请输入正确的身份证号码');
            $('.delay').css('display','block')
            flag=false;
        }else{
            flag=true;
        }
    }
    $('.close').on('click',function(){
        $('.delay').css('display','none');
    })
    $('#but>a').on("click",function(){
        if((!flag)||(!$name.value.trim())||(!$phone.value.trim())||(!$address.value.trim())||(!$id.value.trim())){
            $('.delay>span').text('请完善您的信息');
            $('.delay').css('display','block')
            return;
        }else{
        	$.post('http://t.people.com.cn/addContact.action', 
        		{
        		sn:$('#sn').val(),
                trueName:$name.value.trim(),
                phone:$phone.value.trim(),
                address:$address.value.trim(),
                personId:$id.value.trim(),
                existsContact:$('#existsContact').val()
        		},
        	function(response){
                if(response==1){
                	alert('提交成功');
                	window.location.href='<%=pathV3 %>/xncj2017CJ.action?sn=<s:property value="sn" />'}
                else if(response==0){
                    alert('提交失败，请检查输入')
                }else{
                    window.location.href='instr.html';
                }
            });
        }
    })
    function toStr(obj){
        var arr=[];
        for(var key in obj){
            arr.push(encodeURIComponent(key)+"="+encodeURIComponent(obj[key]))
        }
        var str=arr.join('&');
        return str;
    }
</script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript">
    var src = "http://mblog.people.com.cn/weixinJS.action?url=" + encodeURIComponent(location.href.split('#')[0]);
    var left = unescape('%3c');
    var right = unescape('%3E');
    document.write(left + 'script src="' + src + '"' + right + left + '/script' + right);
    </script>
    <script type="text/javascript" src="../js/share.js" />
<!-- 天润测试代码 -->
<script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
<!-- /天润测试代码 -->

</body>
</html>
