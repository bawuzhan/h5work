<%@ page contentType="text/html; charset=utf-8" language="java" errorPage="" %>

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>载入中...</title>

</head>
<script>

//获取url参数
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 

function chushihua(){
	var code = getQueryString("code");//code
	if(window.XMLHttpRequest)
	    {
	        xmlHttpReq=new XMLHttpRequest();
	    }else if(window.ActiveXObject)
	    {
	        xmlHttpReq=new ActiveXObject("Microsoft.XMLHTTP");
		}
		var url="/wechatGetInfoByCode.action?code="+code;
		url=encodeURI(url); 
	    url=encodeURI(url); 
	    xmlHttpReq.open("GET",url,true); 
	    xmlHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	    xmlHttpReq.send(null); // 开始发起浏览请求, Mozilla 必须加 null 
		xmlHttpReq.onreadystatechange = showResult;  //异步调用showResult方法 
};

function showResult(){ 
    if(xmlHttpReq.readyState == 4){        
        if(xmlHttpReq.status == 200){  
			var req = xmlHttpReq.responseText;
					
			var objs = eval(req);	
						
			var openid = objs[0].openid;//用户的唯一标识，对开放平台下一个网页唯一						
			var nickname = objs[0].nickname;
			var headimgurl = objs[0].headimgurl;
			var sex = objs[0].sex;//1 男，2 女
			var city = objs[0].city;//城市
			var country = objs[0].country;//国家
			var province = objs[0].province;//省
			var unionid = objs[0].unionid;//用户的唯一标识，对开放平台下所有网页唯一	
			
			if(nickname){
				localStorage.setItem('wx_openid', openid);			
				localStorage.setItem('wx_nickname', nickname);
				localStorage.setItem('wx_headimgurl', headimgurl);
				localStorage.setItem('wx_sex', sex);
				localStorage.setItem('wx_city', city);
				localStorage.setItem('wx_country', country);
				localStorage.setItem('wx_province', province);
				localStorage.setItem('wx_unionid', unionid);
				
			};
			var refer = location.search.match(/(?:\?|&)refer=([^?&]*)/);
			if(refer){
				location.replace(refer[1]);
			};		
        }       
    }        
}

window.onload=chushihua;

</script>

<body>
<script>
/*
(function(){
	var nickname = '';
	var headimgurl = '';
	var sex = '';
	var city = '';
	var country = '';
	var province = '';
	if(nickname){
		localStorage.setItem('wx_nickname', nickname);
		localStorage.setItem('wx_headimgurl', headimgurl);
		localStorage.setItem('wx_sex', sex);
		localStorage.setItem('wx_city', city);
		localStorage.setItem('wx_country', country);
		localStorage.setItem('wx_province', province);
	};
	var refer = location.search.match(/(?:\?|&)refer=([^?&]*)/);
	if(refer){
		location.replace(refer[1]);
	};
})();

*/
</script>
</body>
</html>
