<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK" import="java.util.*"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="m" uri="/microblog-tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%  
String path = request.getContextPath();
String pathV3 = request.getContextPath();
String basePathV3 = request.getScheme() + "://"+ request.getServerName() +  pathV3 + "/microblog-v3/";
String basepV3 = request.getScheme() + "://"+ request.getServerName() + pathV3;
long currentTime = new Date().getTime();
String imgBasePath = "http://i0.peopleurl.cn/";
%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="GBK">
    <title>带上健康·回家过年</title>
    <link rel="stylesheet" href="http://t.people.com.cn/microblog-v3/css/public_v2.css"/>
    <link rel="stylesheet" href="http://t.people.com.cn/microblog-v3/css/page_live.css"/>
    <!--<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="../js/weibo-widgets.js"></script>
    <script type="text/javascript" src="../js/weibo-class.js"></script>
    <script type="text/javascript" src="http://t.people.com.cn/microblog-v3//js/weibo-subject.js"></script>-->
    <style>
        body,h1,h2,h3,p,ul,ol,li,button{
            margin:0;
            padding:0;
        }
        html{
            background: #fadcc2;
        }
        body{
            height: 100%;
            width: 100%;
            font-size:12px;
            font-style:normal;
            font-family:"\5FAE\8F6F\96C5\9ED1",Helvetica,sans-serif;
            position: relative;
            z-index: -2;
            background:#fadcc2;
        }
        a{
            text-decoration:none;
            display: block;
            width: 100%;
            height: 100%;
            background-color:transparent;
        }
        a:hover,a:active{
            outline-width:0;
            text-decoration:none;
        }
        img{
            border-style:none;
            display: block;
            width: 100%;
            height: 100%;
        }
        ul,ol{
            list-style:none;
        }
        body>div{
            margin: 0 auto;
        }
        .header{
            height: 34px;
            width: 100%;
            background: #fff;
        }
        .header div{
            height: 34px;
            width: 90px;
            background: url("<%=basePathV3 %>h5/2017zpcj/images/logoRed_02.png");
            background-size: 100% 100%;
            margin-left: 305px;
        }
        .titTop{
            background:url("<%=basePathV3 %>h5/2017zpcj/images/bg_title_02.png") no-repeat;
            background-size: 100% 100%;
            height: 1080px;
            position: relative;
            z-index: -1;
        }
        .titTop div{
            width: 960px;
            margin: 0 auto;
        }
        .str{
            position: relative;
            width: 960px;
            height: 586px;
            margin: 0 auto;
            margin-top: -630px;
            background: url("<%=basePathV3 %>h5/2017zpcj/images/bg2_03_03.png") no-repeat;
            background-size: 100% 100%;
            z-index: 2;
        }
        .str div{
            width: 159px;
            height: 184px;
            position: absolute;
            right: 190px;
            top: 184px;
        }

        .go{
            width: 960px;
            margin: 0 auto;
            margin-top: 35px;
            height: 126px;
        }
        .go div{
            float: left;
            width: 320px;
            height: 100%;
        }
        .go div img{
            width: 100%;
            height: 100%;
        }
        .luck{
            width: 100%;
            margin-top: 35px;
            background-color: #fa3924;
            padding-bottom: 40px;
        }
        .tit{
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 26px;
            font-family: MStiffHeiPRC;
            font-weight: bolder;
        }
        .luck .tit{
            width: 100%;
            background: url("<%=basePathV3 %>h5/2017zpcj/images/tit_1_05.png") no-repeat;
            background-size: 100% 100%;
            color: #fadcc2;
        }
        .luck ul{
            margin: 0 auto;
            margin-top: 40px;
            width: 930px;
            overflow: hidden;
        }
        .luck ul li{
            float: left;
            width: 160px;
            height: 180px;
            background:#fadcc2;
            margin:0 13px;
            margin-bottom: 20px;
        }
        .luckPrize{
            width: 130px;
            height: 130px;
            position: relative;
            margin: 0 auto;
            margin-top: 10px;
        }
        .luckPrize span{
            display: block;
            height: 22px;
            width: 100%;
            position: absolute;
            overflow: hidden;
            bottom: 0;
            margin: 0 auto;
            background: rgba(0,0,0,.4);
            color: #fff;
            line-height: 22px;
            text-align: center;
            font-size: 14px;


        }
        .luckPrize_ins{
            display: block;
            height: 22px;
            width: 100%;
            margin: 0 auto;
            color: #d6271b;
            line-height: 30px;
            text-align: center;
            font-size: 16px;
        }
        .luckPrize_ins:hover{
            text-decoration: underline;
        }
        .innerMin1 span{
            margin-left: 435px;
        }
        .partner{
            width: 960px;
            margin-top: 40px;
            background: #ffebcc;
        }
        .partner .tit{
            background:url("<%=basePathV3 %>h5/2017zpcj/images/patiner_05.png") no-repeat;
            background-size:100% 100%;
            width: 960px;
            margin: 0 auto;
        }
        .partner ul{
            width: 960px;
            padding-left: 5px;
            padding-top: 12px;
            overflow: hidden;
            background: #ffebcc;
        }
        .partner ul li{
            float: left;
            width: 110px;
            height: 54px;
            margin:0 10px 10px 0;
        }
        .bottom{
            width: 100%;
            height: 128px;
            margin-top: 55px;
            background: url("<%=basePathV3 %>h5/2017zpcj/images/BOT_09.png") no-repeat;
            background-size: 100% 100%;
        }
        .m_left{
            margin: 0 auto;
        }
        .pbl_icon{
            width: 160px;
        }
        .pbl_icon a{
            float: left;
            width: 40px;
        }
        .pbl_bot{
            width: 600px;
        }
        .list_func a{
            display: inline;
        }
        .WBM_publisher{
            margin-bottom: 60px;
        }
        .live_cont{
            position: relative;
        }
        .line{
            width: 860px;
            height: 0;
            position: absolute;
            border-bottom: 1px solid  #ef2d25;
            left: 50px;
        }
        .filter{
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
            background: rgba(0,0,0,0.5);
            display: none;
        }
        .alert{
            width: 960px;
            height: 753px;
            position: fixed;
            left: 0;
            right: 0;
            margin: 0 auto;
            top: 50px;
            background: url("<%=basePathV3 %>h5/2017zpcj/images/bgAlert_03.png") no-repeat;
            background-size: 100% 100%;
            z-index: 10;
        }
        .alert i{
            display: block;
            width: 23px;
            height: 23px;
            background: url("<%=basePathV3 %>h5/2017zpcj/images/close.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            right: 30px;
            top: 70px;
        }
        .alert ul{
            position: absolute;
            width: 460px;
            left: 145px;
            top: 500px;
        }
        .alert ul li{
            width: 100%;
            font-size: 16px;
            line-height: 24px;
            color: #fff;
        }
        .alert_zp{
            position: absolute;
            width: 270px;
            height: 270px;
            right: 97px;
            top: 165px;
        }
        .alert_zp img,.alert_ewm img{
            display: block;
            width: 100%;
            height: 100%;
        }
        .alert_ewm{
            position: absolute;
            width: 130px;
            height: 130px;
            right: 156px;
            top: 500px;
        }
        .come img{
            cursor: pointer;
        }
        <%--二期转盘--%>
        .str .zp2{
                display: none;
                position: absolute;
                top: 41px;
                right: 21px;
                width: 496px;
                height: 501px;
        }
        .str .zp2 img{
                display: block;
                width: 100%;
                height: 100%;
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
<div class="header">
    <div></div>
</div>
<div class="titTop">
    <div><img src="<%=basePathV3 %>h5/2017zpcj/images/img_title1_03.png" alt=""/></div>
</div>
<div class="str">
    <div class="zp2"><img src="<%=basePathV3 %>h5/2017zpcj/images/zp2.png" alt=""/></div>
    <div class="come"><img src="<%=basePathV3 %>h5/2017zpcj/images/zz_06.png" alt=""/></div>
    </div>
</div>
<div class="go wid">
    <div style="width:100%"><a href="http://health.people.com.cn" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729684492.jpg" alt=""/></a></div>
</div>
<div class="luck">
    <div class="tit">
    </div>
    <ul>
        <s:iterator value="hbList">
        <li>
            <a href="<s:property value="hongbaoLink" />" target="_blank">
                <div class="luckPrize">
                    <img src="<s:property value="hongbaoImg" />" alt=""/>
                    <span><s:property value="hongbaoName" /></span>
                </div>
                <span class="luckPrize_ins"><s:property value="hongbaoProvider" />提供</span>
            </a>
        </li>
        </s:iterator>
    </ul>
</div>
<div class="go wid">
    <div style="width:100%"><a href="http://www.picchealth.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729703310.jpg" alt=""/></a></div>
</div>
<div class="partner wid">
  <div class="tit"></div>
    <ul>
        <li><a href="http://www.picchealth.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729003380.jpg" alt=""/></a></li>
        <li><a href="http://www.fv88.com/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729209012.jpg" alt=""/></a></li>
        <li><a href="http://www.by-health.com/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729244496.jpg" alt=""/></a></li>
        <li><a href="http://www.yihu365.com/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729326288.jpg" alt=""/></a></li>
        <li><a href="http://www.joymain.com/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729347330.jpg" alt=""/></a></li>
        <li><a href="http://www.ciming.com/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729391021.jpg" alt=""/></a></li>
        <li><a href="http://www.bybo.com.cn/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729418834.jpg" alt=""/></a></li>
        <li><a href="http://www.yilingshop.com/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729437348.jpg" alt=""/></a></li>
        <li><a href="http://www.xiannianmi.com/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729461237.jpg" alt=""/></a></li>
        <li><a href="http://www.omega3treasure.com/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729539167.jpg" alt=""/></a></li>
        <li><a href="http://www.maysu.com.cn/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729561038.jpg" alt=""/></a></li>
        <li><a href="https://lianshengtang.tmall.com/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729582510.jpg" alt=""/></a></li>
        <li><a href="http://china-kitchen.lkk.com/zh-CN"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729605178.jpg" alt=""/></a></li>
        <li><a href="http://www.apollo.com.cn/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484806483531.jpg" alt=""/></a></li>
        <li><a href="http://www.js118.com.cn/"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484729650807.jpg" alt=""/></a></li>
    </ul>
</div>
<div class="bottom">
</div>
<div class="filter">
    <div class="alert" id="alert">
        <i></i>
        <div class="alert_zp">
        <img src="<%=basePathV3 %>h5/2017zpcj/images/zpStr_03.png" alt=""/>
        <%--二期转盘--%>
        <%--<img src="<%=basePathV3 %>h5/2017zpcj/images/bg2-a.png" alt=""/>--%>
        </div>
        <ul>
            <li>1、活动期间关注人民网健康微信（微信号：rmwjkpd），参与 “带上健康·回家过年”活动，即可参与抽奖。</li>
            <li>2、每个微信账号每天有6次抽奖机会。</li>
            <li>3、抽奖时间：2017年1月23日至2017年2月12日。</li>
            <li>4、用户中奖后领取奖品需要提供姓名、手机、地址等信息，若信息不准确、有误、漏填，均视为自动放弃奖品。</li>
            <li>5、所有奖品将在活动结束后15个工作日内寄出。</li>
            <li>6、人民网拥有对此活动的唯一解释权。</li>
        </ul>
        <div class="alert_ewm"><img src="<%=basePathV3 %>h5/2017zpcj/images/JKewm_03.jpg" alt=""/></div>
    </div>
</div>
<script src="<%=basePathV3 %>h5/2017zpcj/js/jquery-1.9.1.min.js"></script>
<script>
    $('.come').on('click',function(){
        $('.filter').css('display','block');
    })
    $('.alert i').on('click',function(){
        $('.filter').css('display','none');
    })


</script>
<!-- 天润测试代码 -->
 <script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
 <!-- /天润测试代码 -->
</body>
</html>
