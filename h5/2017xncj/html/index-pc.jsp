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
    <meta charset="gbk">
    <title>吉星高照赢好礼</title>
    <meta http-equiv="content-type" content="text/html;charset=gbk" />
	<meta http-equiv="content-language" content="gbk" />
	<meta name="robots" content="all" />
	<meta itemprop="name" content="吉星高照赢好礼" />
	<meta name="description" itemprop="description" content="新年到，送好运！人民网喊你来抢百万新年大礼！心动不如行动，快来参与吧！" />
    <base href="/microblog-v3/h5/2017xncj/html/">
    <link rel="stylesheet" href="http://t.people.com.cn/microblog-v3/css/public_v2.css"/>
    <link rel="stylesheet" href="http://t.people.com.cn/microblog-v3/css/page_live.css"/>

    
    <style>
        body,h1,h2,h3,p,ul,ol,li,button{
            margin:0;
            padding:0;
        }
    html{
    background: #ffd16c;
    }
    body{
    height: 100%;
    width: 100%;
    font-size:12px;
    font-style:normal;
    font-family:"\5FAE\8F6F\96C5\9ED1",Helvetica,sans-serif;
    background:url("<%=basePathV3 %>h5/2017xncj/images/bR_1_02.png") repeat-x;
    background-position:0 34px;
    position: relative;
    z-index: -2;
    }
        a{
            text-decoration:none;
            display:inline-block;
            height: 100%;
            background-color:transparent;
        }
        a:hover,a:active{
            outline-width:0;
            text-decoration:none;
        }
        
        .luckPrize img, .partner img {
            border-style:none;
            display: block;
            width: 100%;
            height: 100%;
        }
        
        ul,ol{
            list-style:none;
        }
        .header{
            height: 34px;
            width: 100%;
            background: #fbfbfb;
        }
        .header div{
            height: 34px;
            width: 90px;
            background: url("<%=basePathV3 %>h5/2017xncj/images/logoRed_02.png");
            background-size: 100% 100%;
            margin-left: 305px;
        }
    .titTop{
    background:url("<%=basePathV3 %>h5/2017xncj/images/topBg_02.png") no-repeat -300px;
    background-size: 2000px 507px;
    height: 505px;
    position: relative;
    z-index: -1;
    }
    .titTop div{
    position: absolute;
    left: 240px;
    top: 42px;
    width: 128px;
    height: 64px;
    }
    .titTop div img{
    display: inline-block;
    width: 125px;
    height: 100%;
    }
        .str{
            width: 960px;
            height: 800px;
            margin: 0 auto;
            padding: 0 98px;
            margin-top: -170px;
            background: url("<%=basePathV3 %>h5/2017xncj/images/bg2_03.png") no-repeat;
            background-size: 100% 100%;
        }
        .str .strL,.str .strR{
            float: left;
            height: 630px;
            margin-top: 170px;
        }
        .str .strL div{
            padding:30px;
        
        }
        .str .strL .strL_mid{
            width: 246px;
            height: 100px;
            margin-top: 265px;
            color: #fff;
        }
        .str .strL .strL_mid h2,.str .strL .strL_bot h2{
            width: 100%;
            font-size: 18px;
            line-height: 30px;
        }
        .str .strL_mid p{
            margin-top: 10px;
            font-size:14px;
            line-height: 30px;
        }
    .str .strL_mid p a{
    display: inline;
    color: #fff;
    margin-left: 10px;
    }
    .str .strL_mid p a:hover{
    color: #fff;
    text-decoration: underline;
    }
        .str .strL .strL_bot{
            color: #fff;
            padding-top:0px;
        }
        .str .strL .strL_bot p{
            margin-top: 10px;
            font-size:14px;
            line-height: 30px;
            width: 246px;
    		height: 100px;
        }
    .str .strL .strL_bot .banner{
        margin-top: 10px;
        position:relative;
        overflow:hidden;
        height: 90px;
        margin-left: -20px;
    }
        .str .strL .strL_bot ul.bannerList{
            position:absolute;
            top:0;
        }
        .str .strL .strL_bot li{
            line-height: 30px;
            height: 30px;
            font-size:14px
        }
        .str .strL .strL_bot li span.name{
            display: inline-block;
            margin-left: 10px;
            width: 80px;
        }
        .str .strL .strL_bot li span.pri{
            margin-left: 10px;
        }
        .str .strR{
            width: 585px;
            height: 584px;
            padding: 23px;
            margin-left:23px;
        }
        .strR ul{
            width: 100%;
            height: 100%;
        }
        .strR ul li{
            position: relative;
            float: left;
            width: 190px;
            height: 188px;
            background: url("<%=basePathV3 %>h5/2017xncj/images/bg5_03.png") no-repeat;
            background-size: 100% 100%;
            margin-top: 5px;
            margin-right: 2px;
        }
        .luck ul li a{
        display:block;
        width:100%;
        height:100%;
        }
        .strR ul li img{
            display: block;
            background: #fff;
            border-radius: 10px;
            width: 190px;
            height: 180px;
        }
        .strR ul li .liT{
            position: absolute;
            width: 190px;
            margin-top: 0;
            height: 26px;
            background: #fed06b;
            font-size: 14px;
            line-height: 30px;
            text-align: center;
            color: #000;
            border-top-right-radius:11px;
            border-top-left-radius: 11px;

        }
        .strR ul li .liB{
            position: absolute;
            width: 190px;
            height: 26px;
            bottom: 7px;
            background:rgba(0,0,0,0.4);
            font-size: 14px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            border-bottom-right-radius:12px;
            border-bottom-left-radius: 12px;
        }
        .wid{
            width: 960px;
            margin: 0 auto;
        }
        .strR ul li.come img{
            display: block;
            border-radius: 15px;
            width: 190px;
            height: 190px;
        }
        .go{
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
            margin-top: 5px;
            background-color: #ef2d25;
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
            background: url("<%=basePathV3 %>h5/2017xncj/images/tit4_14.png") no-repeat;
            background-size: 100% 100%;
            color: #d6271b;
        }
        .luck ul{
            margin: 0 auto;
            margin-top: 40px;
            width: 930px;
            overflow:hidden;
        }
        .luck ul li{
            float: left;
            width: 160px;
            height: 180px;
            background:#f9e5c9;
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
            overflow:hidden;
            position: absolute;
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
            height: 30px;
            width: 100%;
            overflow:hidden;
            margin: 0 auto;
            color: #d6271b;
            line-height: 30px;
            text-align: center;
            font-size: 16px;
        }
        .summary{
            margin-top: 45px;
            background: #ffebce;
        }
        .summary .tit{
            background:url("<%=basePathV3 %>h5/2017xncj/images/tit3_15.png") no-repeat;
            background-size:100% 100%;
            width: 100%;
            color: #ffd16c;
        }
        .innerMin1{
            margin-top: 75px;
            width: 100%;
            height: 22px;
            line-height: 22px;
            color: #bbb;
            font-size: 12px;
        }
        .innerMin1 span{
            margin-left: 365px;
        }
        .more{
            margin-top: 38px;
            height: 247px;
            background: #ef2d25;
        }
        .more .tit{
            background:url("<%=basePathV3 %>h5/2017xncj/images/tit4_14.png") no-repeat;
            background-size:100% 100%;
            width: 100%;
            color: #ef2d25;
        }
        .more ul{
            width: 1000px;
            height: 140px;
            overflow: hidden;
            margin: 0 auto;
            margin-top: 45px;
        }
        .more ul li{
            width: 200px;
            height: 100%;
            float: left;
            position: relative;
            margin: 0 25px;
        }
        .more ul li div{
            position: absolute;
            height: 100%;
            width: 40px;
            left: 0;
            top: 0;
            background: #000;
        }
        .moreL{
            float: left;
            width: 10px;
            height: 100%;
            margin:7px;
            line-height: 15px;
            font-size: 12px;
            color: #fff;
        }
        .moreR{
            float: left;
            width: 15px;
            height: 100%;
            margin-top: 52px;
            font-size: 14px;
            color: #fff;
        }
        .partner{
            margin-top: 40px;
            height: 320px;
            background: #ffebce;
        }
        .partner .tit{
            background:url("<%=basePathV3 %>h5/2017xncj/images/tit3_15.png") no-repeat;
            background-size:100% 100%;
            width: 100%;
            color: #ffd16c;
        }
        .partner ul{
            width: 100%;
            height: 260px;
            margin-top: 12px;
            margin-left: 5px;
            overflow: hidden;
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
            background: url("<%=basePathV3 %>h5/2017xncj/images/BOT_09.png") no-repeat;
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
        .strR ul li .liB:hover{
            text-decoration: underline;
        }
		.luckPrize_ins:hover{
            text-decoration: underline;
        }
    .filter{
    width: 100%;
    height: 4518px;
    top: 0;
    left: 0;
    position: absolute;
    background: rgba(0,0,0,0.5);
    display: none;
    }
    .alert{
    width: 900px;
    height: 650px;
    position: fixed;
    top: 100px;
    background: url("<%=basePathV3 %>h5/2017xncj/images/alert_03.png") no-repeat;
    background-size: 100% 100%;
    z-index: 10;
    }
    .alert i{
    display: block;
    width: 68px;
    height: 62px;
    background: url("<%=basePathV3 %>h5/2017xncj/images/clo_03.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: -30px;
    top: -30px;
    }
        
    </style>


<script type="text/javascript" src="http://t.people.com.cn/getCookieUserInfo.action" charset="gbk"></script>
<script type="text/javascript" src="http://t.people.com.cn/microblog-v3/js/jquery-1.8.2.min.js"></script>

<script type="text/javascript" src="http://t.people.com.cn/microblog-v3/js/weibo-widgets.js"></script>
<script type="text/javascript" src="http://t.people.com.cn/microblog-v3/js/weibo-class.js"></script>
<script type="text/javascript" src="http://t.people.com.cn/microblog-v3/js/weibo-subject.js"></script>

<!-- dwr interface -->
<script type='text/javascript' src="http://t.people.com.cn/dwr/util.js"></script>
<script type='text/javascript' src="http://t.people.com.cn/dwr/engine.js"></script>
<script type='text/javascript' src='http://t.people.com.cn/dwr/interface/indexAjax.js'></script>
<script type='text/javascript' src='http://t.people.com.cn/dwr/interface/indexV3Ajax.js'></script>
<script type='text/javascript' src='http://t.people.com.cn/dwr/interface/subjectV3Ajax.js'></script>
<script type='text/javascript' src='http://t.people.com.cn/dwr/interface/xyycjAjax.js'></script>

<script type="text/javascript" src="http://t.people.com.cn/microblog-v3/2016subject/0105_choujiang/pc/js/Marquee.js"></script>


    
</head>

<body>
    <!-- 专题通用顶通 -->
	<div id="subjectHead"></div>
	<script type="text/javascript">
	(function(){var s = document.createElement('script');s.src = 'http://t.people.com.cn/microblog-v3/2013subject/subjecthead.js';document.getElementsByTagName('head')[0].appendChild(s)})();
	</script>
	<!-- /专题通用顶通 -->
	
<div class="titTop">
    <div><img src="<%=basePathV3 %>h5/2017xncj/images/logoTeyue_03.png" alt=""/>
    </div>
    </div>
<div class="str">
    <div class="strL">
        <div  class="strL_mid">
            <h2>抽奖攻略</h2>
    		<p>吉星高照赢好礼！人民网喊你来抽百万大奖。进入人民网微信，点击菜单栏参与抽奖。 <a class="lookMore" href="javascript:;">查看详情>></a></p>
        </div>
        
        <div  class="strL_bot">
        <%--
            <h2>幸运榜</h2>
            <p>新年到，送好运！贺岁金条、手机、吸尘器、精美护肤品套装......超多大奖等你来扑！虚位以待，说不定你榜上有名哦！</p>
       		<ul class='bannerList'>
       		</ul>
       		 --%>
            <h2>幸运榜(Top 50)</h2>
    <div class="banner">
    		
                <ul class='bannerList'>
                <s:iterator value="zjRecord">
                    <li><span class="name"><s:property value="nickname" /></span class="pri"><span class="pri"><s:property value="hongbaoName" /></span></li>
                </s:iterator>
                
    </div>
        </div>
    </div>
    <div class="strR">
       <ul>
       		<s:iterator value="cjdjHbList" status="stat">
       		<li><a href="<s:property value='hongbaoLink' />" target="_blank">
               <div class="liT"><s:property value='hongbaoName' /></div>
               <img src="<s:property value='hongbaoImg' />" alt=""/>
               <div class="liB"><s:property value='hongbaoProvider' />提供</div>
           </a></li>
           </s:iterator>
       </ul>
    </div>
</div>

<div class="go wid" style="width:">
    <div style="width:960px;height:80px"><a href="http://www.shuanghui.net/" target="_blank"><img src="<%=basePathV3 %>h5/2017xncj/images/960_80.jpg" alt=""/></a></div>
</div>

<div class="luck">
    <div class="tit">
        <span>幸运好奖</span>
    </div>
    <ul>
    	<s:iterator value="hbList">
        <li>
            <a href="<s:property value="hongbaoLink" />" target="_blank">
                <div class="luckPrize">
                    <img src="<s:property value="hongbaoImg" />" alt=""/>
                    <span class="sub"><s:property value="hongbaoName" /></span>
                </div>
                <span class="luckPrize_ins"><s:property value="hongbaoProvider" />提供</span>
            </a>
        </li>
        </s:iterator>

    </ul>
</div>
<div class="go wid">
    <div><a href="https://www.haohaizi.com/product-5972.html" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1484103059731.jpg" alt=""/></a></div>
    <div><a href="http://kids.360.cn/?from=renminwang" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482367544413.jpg" alt=""/></a></div>
    <div><a href="http://mall.360.cn/shop/item?item_id=5799719b4ae38d2fa0ac5ee7" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482367569910.jpg" alt=""/></a></div>
</div>

<%--
<div class="summary wid">
    <div class="tit">
        <span>总结我的2016</span>
    </div>
    <div class="innerMin">
        <div class="live_cont clearfix">
            <div class="m_left" style="height:862px;width:610px">
                <!-- publisher -->
                <div class="WBM_publisher WBM_weiboEditor" data-widget="publisher" id="mainPublisher">
					<div class="pbl_top clearfix">
    					<div class="pbl_num" data-nodetype="textSum">还可以输入<i>140</i>个字</div>
		            </div>
                    <div class="pbl_text">
                        <textarea class="wgt_text_01" data-nodeType="publisherText">#一句话总结你的2016#</textarea>
                    </div>
                    <div class="pbl_media skin_color_01 clearfix" data-nodeType="mediaList"></div>
                    <div class="pbl_bot clearfix">
                        <div class="pbl_icon">
                         <a href="javascript:void(0)" data-nodeType="btnFace" class="pbl_icon01">表情</a>
                          <a href="javascript:void(0)" data-nodeType="btnImage" class="pbl_icon02">图片</a>
                          <a href="javascript:void(0)" data-nodetype="btnVideo" class="pbl_icon03" style="display:none;">视频</a>
		                  <a href="javascript:void(0)" data-nodetype="btnLongText" class="pbl_icon04" style="display:none;">长文</a>
		                  <a href="javascript:void(0)" data-nodetype="btnTopic" class="pbl_icon05" style="display:none;">话题</a>
		                  <a href="javascript:void(0)" data-nodetype="btnVote" class="pbl_icon06" style="display:none;">投票</a>
                           
                         </div>
                        <div class="pbl_submit"><a href="javascript:void(0)" data-nodeType="publishButton" title="发布"></a></div>
                    </div>
                </div>
                <!-- /publisher -->
                <div class="line"></div>
                <div class="wbp_listnav clearfix" style="padding:10px 0 0">
                    <div class="ln_tags"> </div>
                </div>
                <div>
                    <div class="WBM_list">
                    <ul class="ln_tags_y" id="feedtab" style="display:none;">
		            <li class="set"><a href="javascript:void(0);" data-typeid="0" data-keyword="一句话总结你的2016"></a></li>
		            </ul>
                    <div class="sub_list">
                        <!--这里放微博列表，和主页一样,注意是放在sub_list标签里-->
          				<div class="WBM_list" id="indexFeedList"></div>
                    </div>
                        
                    </div>
                    <div id="feedListPage" style="display: block;"></div>
                </div>
            </div>
        </div>
    </div>
</div>
--%>
<%--
<!-- 微博发布，滚动 -->
<div class="summary wid">
    <div class="tit">
        <span>总结我的2016</span>
    </div>
    <div class="innerMin">

    	<div class="live_cont clearfix">

            <div class="m_left" style="height:auto;width:610px">
                <!-- publisher -->
                <div class="WBM_publisher WBM_weiboEditor" data-widget="publisher" id="mainPublisher">
					<div class="pbl_top clearfix">
    <div class="innerMin1"><span>中国人可能获诺贝尔奖，央视首次受邀采访　24小时热博</span></div>
		            </div>
                    <div class="pbl_text">
                        <textarea class="wgt_text_01" data-nodeType="publisherText">#你好，2017！#</textarea>
                    </div>
                    <div class="pbl_media skin_color_01 clearfix" data-nodeType="mediaList"></div>
                    <div class="pbl_bot clearfix">
                        <div class="pbl_icon"> <a href="javascript:void(0)" data-nodeType="btnFace" class="pbl_icon01">表情</a> <a href="javascript:void(0)" data-nodeType="btnImage" class="pbl_icon02">图片</a> </div>
                        <div class="pbl_submit"><a href="javascript:void(0)" data-nodeType="publishButton" title="发布"></a></div>
                    </div>
                </div>
                <!-- /publisher -->
                <div class="line"></div>
                <div class="wbp_listnav clearfix" style="padding:10px 0 0">
                    <div class="ln_tags"> </div>
                </div>
                <ul class="ln_tags_y" id="feedtab" style="display:none;">
		            <li class="set"><a href="javascript:void(0);" data-typeid="0" data-keyword="你好，2017"></a></li>
		            </ul>
                    <div class="sub_list">
                        <!--这里放微博列表，和主页一样,注意是放在sub_list标签里-->
          				<div class="WBM_list" id="indexFeedList"></div>
                    </div>
                    <div id="feedListPage" style="display: block;"></div>
            </div>
        </div>
    </div>
</div>
 --%>
<%--
<div class="more">
    <div class="tit">更多年终策划</div>
    <ul>
        <li><a href="">
            <div>
                <span class="moreL">国际大牌运动专场</span>
                <span class="moreR">一折狂欢</span>
            </div>
            <img src="../images/more_06.png" alt=""/>
        </a></li>
        <li><a href="">
            <div>
                <span class="moreL">国际大牌运动专场</span>
                <span class="moreR">一折狂欢</span>
            </div>
            <img src="../images/more_06.png" alt=""/>
        </a></li>
        <li><a href="">
            <div>
                <span class="moreL">国际大牌运动专场</span>
                <span class="moreR">一折狂欢</span>
            </div>
            <img src="../images/more_06.png" alt=""/>
        </a></li>
        <li><a href="">
            <div>
                <span class="moreL">国际大牌运动专场</span>
                <span class="moreR">一折狂欢</span>
            </div>
            <img src="../images/more_06.png" alt=""/>
        </a></li>
    </ul>
</div>
 --%>

<div class="partner wid">
  <div class="tit"><span>合作伙伴</span></div>
    <ul>
    	<li><a href="http://www.shuanghui.net/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482456545254.jpg" alt=""/></a></li>
        <li><a href="https://www.bafang.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482456896160.jpg" alt=""/></a></li>
        <li><a href="https://www.lechangebuy.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482455195458.jpg" alt=""/></a></li>
        <li><a href="http://shouji.360.cn/360cleandroid/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482396372482.jpg" alt=""/></a></li>
        <li><a href="http://kids.360.cn/?from=renminwang" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482715634129.jpg" alt=""/></a></li>
        <li><a href="http://jia.360.cn/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482737522834.jpg" alt=""/></a></li>
        <li><a href="http://che.mall.360.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482716071754.jpg" alt=""/></a></li>
        <li><a href="https://www.haohaizi.com/GoodBabyCarnival" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482991297127.jpg" alt=""/></a></li>
        <li><a href="https://yunifang.tmall.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482459374718.jpg" alt=""/></a></li>
        <li><a href="https://jinshuju.net/f/Y57oEI" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482737568625.jpg" alt=""/></a></li>
        <li><a href="https://xiaogouds.tmall.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482980902427.jpg" alt=""/></a></li>
        <li><a href="http://cn.changhong.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482396218823.jpg" alt=""/></a></li>
        <li><a href="http://shop.ddyding.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482396244008.jpg" alt=""/></a></li>
        <li><a href="https://shop15230870.koudaitong.com" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482799343024.jpg" alt=""/></a></li>
        <li><a href="http://www.tootoo.cn/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482458407757.jpg" alt=""/></a></li>
        <li><a href="https://www.huicui.1688.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482456370603.jpg" alt=""/></a></li>
        <li><a href="http://www.cisri.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482736936716.jpg" alt=""/></a></li>
        <li><a href="http://www.huayuclub.com" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482458834239.jpg" alt=""/></a></li>
        <li><a href="https://h5.koudaitong.com/v2/showcase/homepage?alias=yi67gesg" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482983058355.jpg" alt=""/></a></li>
        <li><a href="http://www.leishen.cn" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482458302849.jpg" alt=""/></a></li>
        <li><a href="https://tuan.qunar.com/activity/sact/IzM3e2?bd_source=tg_hd_08988" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482458676514.jpg" alt=""/></a></li>
        <li><a href="http://t.people.com.cn/grrbwb" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482396079449.jpg" alt=""/></a></li>
        <li><a href="http://t.people.com.cn/14917928" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482396057874.jpg" alt=""/></a></li>
        <li><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482460006833.jpg" alt=""/></li>
        <li><a href="http://t.people.com.cn/gdfb" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482396016637.jpg" alt=""/></a></li>
        <li><a href="http://t.people.com.cn/22154076" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482396098885.jpg" alt=""/></a></li>
        <li><a href="http://m.people.cn/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482713096060.jpg" alt=""/></a></li>
        <li><a href="http://www.trylist.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482902731891.jpg" alt=""/></a></li>
        
        <%--
    	<li><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482396879083.jpg" alt=""/></li>
    	<li><a href="http://www.prizecn.com/" target="_blank"><img src="http://i0.peopleurl.cn/htmlfile/subjectupload/subjectimg_1482397055405.jpg" alt=""/></a></li>
    	 --%>
    </ul>
</div>
<div class="bottom">
</div>
<div class="filter">
    <div class="alert" id='alert'>
    <i></i>
    </div>
    </div>
<!-- toTopButton -->
<a href="javascript:void(0)" class="WBM_toTop" data-widget="toTopButton" data-pageWidth="1000"></a>
<!-- /toTopButton -->

<script type="text/javascript">
//幻灯片
$(".blk_pic01").ready(function(){
    var $picShow = $('.blk_pic01'),
        $arrLeft = $('.picShowArrLeft'),
        $arrRight = $('.picShowArrRight'),
        $pics = $picShow.find('.pic_item'),
        index,
        _timeObj;

    //左箭头
    $arrLeft.mouseover(function(){
        this.className = 'picShowArrLeft_hover';
    }).mouseout(function(){
        this.className = 'picShowArrLeft';
    }).click(function(){
        pre();
    });
    //右箭头
    $arrRight.mouseover(function(){
        this.className = 'picShowArrRight_hover';
    }).mouseout(function(){
        this.className = 'picShowArrRight';
    }).click(function(){
        next();
    });

    select(0);

    function select(num){
        if(!$pics[num] || index == num){
            return;
        };
        autoPlay();
        $($pics[num]).fadeIn(500);
        $pics.each(function(n){
            if(n != num){
                $(this).hide();
            };
        });
        index = num;
    };

    function next(){
        var n = index + 1;
        if(n >= $pics.length){
            n = 0;
        };
        select(n);
    };
    function pre(){
        var n = index - 1;
        if(n < 0){
            n = $pics.length - 1;
        };
        select(n);
    };
    function autoPlay(){
        stopAutoPlay();
        _timeObj = setInterval(function(){
            next();
        }, 6000);
    };
    function stopAutoPlay(){
        clearInterval(_timeObj);
    };
}());
</script>
    <script>
    function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    $('body').css('width',"120%")
    $('.filter').css('width',"120%")
    $('.alert').css('left',"10%")
    } else {
    $('body').css('width',"100%")
    $('.filter').css('width',"100%")
    }
    }
    browserRedirect()




    function run() {
    var $scroll = $('.bannerList');
    var inner = $scroll.html();
    $scroll.append(inner);
    $scroll.css("height", $scroll.offset().height * 2);
    var timer = window.setInterval(move2, 100);
    var curTop = $scroll[0].offsetTop;

    function move2() {
    curTop -= 2;
    if (curTop <= -$scroll.offset().top / 2) {
    curTop = 0
    }
    $scroll.css('top', curTop);
    }
    }
    run();


    function sub(el,len,isAdd){
    el.each(function(index,item){
    if($(item).html().length>len){
    if(isAdd){
    $(item).html($(item).html().substring(0,len)+isAdd)
    }else{
    $(item).html($(item).html().substring(0,len))
    }
    }
    })
    }
    <%--sub($('.sub'),8,"...")--%>
    <%--sub($('.luckPrize_ins'),9,"...")--%>
    sub($('.name'),5)
    sub($('.name'),2,"***")
    sub($('.pri'),8,"...")

    $('.lookMore').on('click',function(){
    $('.filter').css('display','block');
    })
    $('.alert i').on('click',function(){
    $('.filter').css('display','none');
    })
	


    var l=(document.documentElement.clientWidth||document.body.clientWidth)/2;
    var w=document.getElementById('alert');
    $('.alert').css('left',l-450);
    $('.titTop').css("background-position",l-1000+"px"+" 0");


    </script>

<%--
<script type="text/javascript" src="http://t.people.com.cn/microblog-v3/2016subject/0105_choujiang/pc/js/xqyycj.js"></script>
 --%>
<%--
<script type="text/javascript">
var feedlist = new WeiBoList("#indexFeedList","#feedListPage","","#feedtab li","set",$("#feedtab li.set a:first").attr("data-typeid"),"2382","2017xncj");
feedlist.setPer(3);
</script>
 --%>
<!-- 天润测试代码 -->
 <script src="http://www.people.com.cn/css/2010tianrun/webdig_test.js" type="text/javascript"></script>
 <!-- /天润测试代码 -->
</body>
</html>
