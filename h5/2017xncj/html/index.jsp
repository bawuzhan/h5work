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
    <meta name="viewport"content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <title></title>
    <base href="/microblog-v3/h5/2017xncj/html/">
    <link rel="stylesheet" href="../css/reset.min.css"/>
    <link rel="stylesheet" href="../css/index_1.css"/>

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
	<div id="hidden" style="display: none">
         <p id="sn"><s:property value='sn' /></p>
    </div>
    <section class="sec1">
        <div><a href="instr.html"></a></div>
    </section>
    <section class="sec2">
        <div class="tlt">
            <span>您今天还有</span>
            <span class='times'></span>
            <span>次摇一摇机会哦</span>
        </div>
    </section>
    <section class="sec3">
        <div class="mid">
            <img src="../images/yaoji_03-2.png" alt=""/>
        </div>
        <div class="egg">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="gift">
            <div class="giftItem2"></div>
            <div class="giftItem4"></div>
            <div class="giftItem"></div>
            <div class="giftItem3"></div>
            <div class="giftItem6"></div>
            <div class="giftItem5"></div>
            <div class="giftItem7"></div>
            <div class="giftItem8"></div>
        </div>
    </section>
    <section class="sec4">
        <div>
            <button><a href="<%=pathV3 %>/xncj2017H5MoreAwards.action?sn=<s:property value='sn' />">更多好礼</a></button>
            <button><a href="<%=pathV3 %>/xncj2017UserZjRecord.action?sn=<s:property value='sn' />">中奖记录</a></button>
        </div>
    </section>
    <section class="sec5">
        <div><img src="../images/logoB_03.png" alt=""/></div>
        <div><img src="../images/shuanghui_03.png" alt=""/></div>
    </section>
</div>
<div class="filter">
    <div class="inner">
        <div class="fil_top">
            <img src="../images/fj_03.png" alt=""/>
            <span>好可惜</span>
        </div>
        <div class="fil_bot">
            <div class="close"></div>
            <div class="again">
                <div class="changeTxt">
                    <h3>奖品一不小心溜走了</h3>
                    <span>别灰心<br>据说面朝东方风水更好哦</span>
                </div>
                <button class="againShake">再摇一次</button>
            </div>
            <div class="over">
                <h2>今日机会已用完</h2>
                <span>明天再来吧！</span>
            </div>
            <div class="shareAgain">
                <h2>机会已用完</h2>
                <span>邀请朋友参与再得一次抽奖机会哦</span>
                <img src="../images/huotui_02.png" alt=""/>
                <div>
                    <img src="../images/zhizhen_03.png" alt=""/>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="../js/zepto.min.js"></script>
<script>
/*摇一摇*/
    //判断浏览器
    var iOS = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
    var isAndroid = (/android/i).test(navigator.userAgent) || false;
    //适配
    var viewWidth, viewScale;
    if(document.documentElement.clientWidth / document.documentElement.clientHeight > 0.76){
        viewWidth = Math.round(document.documentElement.clientHeight / 416 * 320);
        viewScale = viewWidth / 640;
    }else{
        viewScale = document.documentElement.clientWidth / 640;
    };
    <%--viewScale = document.documentElement.clientWidth / 640;--%>
    document.documentElement.style.fontSize = 100 * viewScale + 'px';
    window.openItem = openItem;
    var shake=$('.sec3>.mid>img'),filter=$('.filter'),shareAgain=$('.shareAgain'),over=$('.over'),again=$('.again');
    var audioObj = document.createElement("audio");
    audioObj.src = 'shake.mp3';
    //设置全局的计数变量 和 分享状态
    var kcjCount=0,shareFlag;
    //获取用户抽奖次数 只在打开页面时获取一次
    $.ajax({
    url: "http://t.people.com.cn/queryCjNum.action?sn="+$('#sn').html(),
    type: "get",
    data:null,
    success: function(result){
    result=JSON.parse(result);
        kcjCount=result.kcjCount,shareFlag=result.shareFlag;
    <%--alert(kcjCount+"   first   "+shareFlag)--%>
    console.log(kcjCount)
        if(kcjCount==-1){//sn不正确
            console.log("error")
            return;
        }else{
    console.log(kcjCount)
            kcjCount>=3?$('.tlt .times').html("3"):$('.tlt .times').html(kcjCount);//绑定抽奖次数
        }
    }
    });
    //摇一摇
    var shakeOn = true;
    function init() {
        var SHAKE_THRESHOLD = 1500;
        var last_update = 0;
        var x = y = z = last_x = last_y = last_z = 0;
        var lTime = 0, _timeLimit = 1500;
        function deviceMotionHandler(eventData) {
            if(shakeOn == false){return}
            var acceleration = eventData.accelerationIncludingGravity;
            var curTime = new Date().getTime();
            if ((curTime - last_update) > 100) {
                var diffTime = curTime - last_update;
                last_update = curTime;
                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;
                var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                if (speed > SHAKE_THRESHOLD){
                    if(new Date() - lTime > _timeLimit){
                        lTime = new Date();
                        //动画效果
                        if($('.tlt .times').html()==0){
                            filter.css('display','block');
                            over.css('display','block');
                            return;
                        }
                        audioObj.play();
                        shake[0].id='shake';
                        $('.tlt')[0].id='tlt';
                        $('.gift div').each(function(index,item){
                            $(item).attr("id",item.className)
                        })
                        setTimeout(function(){
                            shake[0].id='';
                            $('.tlt')[0].id='';
                            $('.gift div').each(function(index,item){
                                $(item).attr("id","")
                            });
                            prize();
                        },1000);
                    };
                }
                if (speed < SHAKE_THRESHOLD){

                }
                last_x = x;
                last_y = y;
                last_z = z;
            }
        }
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', deviceMotionHandler, false);
        }
    }


    init();
       var inner=['<h3>奖品一不小心溜走了</h3><span>别灰心<br>据说面朝东方风水更好哦</span>','<h3>大奖没有投入你的怀抱</h3><span>你和奖品还差再摇一次的距离</span>','<h3>大奖就差一点点</h3><span>可能姿势不对哦</span>'];
    //随机数
    function ran(a,b){
        return Math.round(Math.random()*(b-a)+a);
    }
    var innerIndex=ran(0,2);
    //处理中奖奖品
    function prize(){
    //如果已经小于0次就不在发送请求了
        if(kcjCount<0){
            return;
        }
        shakeOn = false;
        $.ajax({
            url: "http://t.people.com.cn/procChoujiang.action?sn="+$('#sn').html(),
            type: "get",
            data:"",
            success:function(data){
                //alert(data);
                openItem(data);
    }
        });
    }
    //摇一摇回调函数  处理中奖信息 和次数信息
    function openItem(data){

    //每次调用成功  使总次数减少一次
        kcjCount--;
        //alert(kcjCount+"  openItem");
        if(kcjCount<=0){
            kcjCount=0
            $('.tlt .times').html(kcjCount)
        }else{
    $('.tlt .times').html(kcjCount)
    }
    //alert( $('.tlt .times').html()+"   yaohou")
        data=JSON.parse(data);
        var zjRecordId =data.zjRecordId ,zjFlag =data.zjFlag;
    <%--alert(zjFlag);--%>
        //显示弹出层
    filter.css('display','none');
        again.css('display','none');
        shareAgain.css('display','none');
        over.css('display','none');
        if(zjFlag==-1){
            window.location.href='http://mblog.people.com.cn/microblog-v3/h5/2017xncj/html/instr.html';
        }else if(zjFlag==-3){//表示摇过两次
    filter.css('display','block');
            shareAgain.css('display','block');
        }else if(zjFlag==-9){
    filter.css('display','block');
            over.css('display','block');
        }else if(zjFlag==0){
    filter.css('display','block');
            $('.changeTxt').html(inner[innerIndex])
            again.css('display','block');
        }else if(zjFlag==1){//中奖啦
            shakeOn = true;
            window.location.href='http://t.people.com.cn/xncj2017ZjResult.action?sn='+$('#sn').html()+'&zjRecordId='+zjRecordId;
        }
    };
    //关闭弹出层
    $('.close').on('click',function(){
    shakeOn = true;
        filter.css('display','none');
    })
    //点击分享按钮
    $('.againShake').on("click",function(){
        filter.css('display','none');
    shakeOn = true;
    });
function save(){
        var Infor={
            time: new Date().getTime(),//设置存储的时间
            overTime:864000-(new Date().getHours()*3600+new Date().getMinutes()*60+new Date().getSeconds()),//过期时间
            shareFlag:shareFlag,
        }
        localStorage.setItem("Infor", JSON.stringify(Infor));
};
</script>

<!-- 微信分享接口 -->
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript">
var src = "http://mblog.people.com.cn/weixinJS.action?url=" + encodeURIComponent(location.href.split('#')[0]);
var left = unescape('%3c');
var right = unescape('%3E');
document.write(left + 'script src="' + src + '"' + right + left + '/script' + right);
</script>
<script type="text/javascript">
        //微信分享代码
        var shareData = {
    imgUrl: "http://t.people.com.cn/microblog-v3/h5/2017xncj/images/share.jpg",
    link: 'http://zhengwutong.com/microblog-v3/h5/2017xncj/html/instr.html',
    title: '人民网大拜年：吉星高照，好礼来袭',
    desc: '一大波新年礼物来袭！小手一抖，吉礼到手！2017，你我同行。'
        };
        peopleWXConfig.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'];
        wx.config(peopleWXConfig);
        function initWXShare() {
        wx.onMenuShareAppMessage({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl,
        success:function(){
        <%--alert(shareFlag+"  shareFlag")--%>
        if(shareFlag==0){//如果没有分享过
        $.ajax({
        url: "http://t.people.com.cn/wxShareCallback.action?sn="+$('#sn').html(),
        type: "get",
        data:"",
        success:function(result){
        if(result==1){//分享成功，抽奖次数加1
                kcjCount+=1;
                <%--alert(kcjCount+"   sharehou")--%>
    $('.tlt .times').html(kcjCount)
                shareFlag=1;
                save();
    filter.css('display','none');
    shareAgain.css('display','none');
    shakeOn = true;
        }else if(result==0){//未分享
                return;
        }else{
                window.location.href='instr.html';
        }
        }
        })
        }
        }
        });
        wx.onMenuShareTimeline({
        title: shareData.title,
        link: shareData.link,
        imgUrl: shareData.imgUrl,
        success:function(){
        if(shareFlag==0){//如果没有分享过
        $.ajax({
        url: "http://t.people.com.cn/wxShareCallback.action?sn="+$('#sn').html(),
        type: "get",
        data:"",
        success:function(result){
        if(result==1){//分享成功，抽奖次数加1
        kcjCount++;
    $('.tlt .times').html(kcjCount)
    shareFlag=1;
        save();
    filter.css('display','none');
    shareAgain.css('display','none');
    shakeOn = true;
        }else if(result==0){
        return;
        }else{
        window.location.href='instr.html';
        }
        }
        })
        }
        }
        });
        wx.onMenuShareQQ({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl,
        success:function(){
        if(shareFlag==0){//如果没有分享过
        $.ajax({
        url: "http://t.people.com.cn/wxShareCallback.action?sn="+$('#sn').html(),
        type: "get",
        data:"",
        success:function(result){
        if(result==1){//分享成功，抽奖次数加1
        kcjCount+=1;
    $('.tlt .times').html(kcjCount)
        shareFlag=1;
        save();
    filter.css('display','none');
    shareAgain.css('display','none');
    shakeOn = true;
        }else if(result==0){
        return;
        }else{
        window.location.href='instr.html';
        }
        }
        })
        }
        }
        });
        wx.onMenuShareWeibo({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl,
        success:function(){
        if(shareFlag==0){//如果没有分享过
        $.ajax({
        url: "http://t.people.com.cn/wxShareCallback.action?sn="+$('#sn').html(),
        type: "get",
        data:"",
        success:function(result){
        if(result==1){//分享成功，抽奖次数加1
        kcjCount+=1;
    $('.tlt .times').html(kcjCount)
        shareFlag=1;
        save();
    filter.css('display','none');
    shareAgain.css('display','none');
    shakeOn = true;
        }else if(result==0){
        return;
        }else{
        window.location.href='instr.html';
        }
        }
        })
        }
        }
        });
        }
        wx.ready(initWXShare);
</script>
<!-- 天润测试代码 -->
<script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
<!-- /天润测试代码 -->
</body>
</html>
