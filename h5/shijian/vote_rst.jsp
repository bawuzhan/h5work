<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/microblog/";
String basep = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
String imgBasePath = "http://i0.peopleurl.cn/";
String mainBasePath = "http://www.people.com.cn/mediafile/news_index/ROOT";
%>

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>2015全国大学生社会实践评选活动</title>

<!-- 天润测试代码 -->
<META name="filetype" content="1">
<META name="publishedtype" content="1">
<META name="pagetype" content="2">
<META name="catalogs" content="SQ_0002001">
<!-- /天润测试代码 -->

<!-- <script src="mobileshow.js" type="text/javascript"></script> -->
<link rel="stylesheet" href="<%=path%>/microblog-v3/h5/shijian/animation.css" type="text/css">
<link rel="stylesheet" href="<%=path%>/microblog-v3/h5/shijian/style.css" type="text/css">
</head>
<body>
<input type="hidden" name="field＿name" id="openid" value=""> 
<div class="scenery page_vote_rst" style="display:block">
    <div class="bg"></div>
    <div class="lg_rst"></div>
    <div class="rstDetail">
    <table class="Title">
      <tr>
        <td><span id="title"></span></td>
      </tr>
    </table>
      <div class="rstNum">已获得票数：<span class="num"><b id="num" ></b></span></div>
      <!--btn_vote：投票 btn_voted：已投票 -->
<!--      <img src="<%=path%>/microblog-v3/h5/shijian/images/2code_gqt.png" class="codeImg_gqt" alt="" />  -->
      <img src="<%=path%>/microblog-v3/h5/shijian/images/2code_rmw.png" class="codeImg_rmw" alt="" />
          
      <a href="javascript:void(0)" onclick="toupiao();" id="btn_vote" class="btn_vote"></a>
    </div>

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

//获取url参数
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 

function chushihua() { 
	var confId = getQueryString("confId");//主题id
	var code = getQueryString("code");//code
	//alert(code);
	if(window.XMLHttpRequest)
	    {
	        xmlHttpReq=new XMLHttpRequest();
	    }else if(window.ActiveXObject)
	    {
	        xmlHttpReq=new ActiveXObject("Microsoft.XMLHTTP");
		}
		var url="/wechatToupiaoAjax.action?confId="+confId+"&code="+code;
		url=encodeURI(url); 
	    url=encodeURI(url); 
	    xmlHttpReq.open("GET",url,true); 
	    xmlHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	    xmlHttpReq.send(null); // 开始发起浏览请求, Mozilla 必须加 null 
		xmlHttpReq.onreadystatechange = showResult;  //异步调用showResult方法 
} 

function showResult(){ 
    if(xmlHttpReq.readyState == 4){        
        if(xmlHttpReq.status == 200){  
			var req = xmlHttpReq.responseText;
			var objs = eval(req);		
			var result = objs[1].result;
			//成功，返回当前总投票数；-1：失败；-9：已投过票
			if(result=="-1"){
				alert("投票失败");
				//document.getElementById('resultString').innerHTML="投票失败";
																	
			}else if(result=="-9"){
			
				document.getElementById("btn_vote").setAttribute("class","btn_voted");
				//$("a.btn_vote").attr("class","btn_voted");		
				//alert(11);									
			}
			
			document.getElementById('title').innerHTML=objs[0].title;		
			document.getElementById('num').innerHTML=objs[2].tp_count;		
			document.getElementById('openid').setAttribute("value",objs[3].openid);											
			//document.getElementById('nickname').innerHTML=objs[2].nickname;	
			
			//document.getElementById("headimgurl").src = objs[3].headimgurl; 			
        	
        }       
    }        
}


function toupiao() { 
	var confId = getQueryString("confId");//主题id
	var openid = document.getElementById('openid').value;//code
	if(window.XMLHttpRequest)
	    {
	        xmlHttpReq=new XMLHttpRequest();
	    }else if(window.ActiveXObject)
	    {
	        xmlHttpReq=new ActiveXObject("Microsoft.XMLHTTP");
		}
		var url="/wechatToupiaoPostAjax.action?confId="+confId+"&openid="+openid;
		url=encodeURI(url); 
	    url=encodeURI(url); 
	    xmlHttpReq.open("GET",url,true); 
	    xmlHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	    xmlHttpReq.send(null); // 开始发起浏览请求, Mozilla 必须加 null 
		xmlHttpReq.onreadystatechange = showResult1;  //异步调用showResult方法 
} 

function showResult1(){ 
    if(xmlHttpReq.readyState == 4){        
        if(xmlHttpReq.status == 200){  
			var req = xmlHttpReq.responseText;		
			var objs = eval(req);		
			var result = objs[0].result;
			//return 1：投票成功；-1：参数不正确；0：投票失败
			if(result=="-1"||result=="-0"){
				alert("投票失败");
				//document.getElementById('resultString').innerHTML="投票失败";
																	
			}else if(result=="1"){
				alert("投票成功");
				document.getElementById("btn_vote").setAttribute("class","btn_voted");
				document.getElementById('num').innerHTML = parseInt(document.getElementById("num").innerHTML)+1;
														
			}
			
			
			//document.getElementById('title').innerHTML=objs[0].title;		
			//document.getElementById('num').innerHTML=objs[2].to_count;		
													
			//document.getElementById('nickname').innerHTML=objs[2].nickname;	
			
			//document.getElementById("headimgurl").src = objs[3].headimgurl; 			
        	
        }       
    }        
}


window.onload=chushihua;

</script>
</body>
</html>
