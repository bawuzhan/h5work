/**
 * Created by bawuzhan on 2016/12/19.
 */
//微信分享代码

//保存到本地
var shareFlag=0;//默认没有分享过
var Infor=JSON.parse(localStorage.getItem("Infor"))
if(Infor){//如果本地存在 那就说明分享过
    if(new Date().getTime() - Math.floor(Infor.time) > Math.floor(Infor.overTime)){//如果存储的信息超市 就移除他
        localStorage.removeItem("Infor");
    }else{
        shareFlag=JSON.parse(localStorage.getItem("Infor")).shareFlag
    }
}
function save(){
    var Infor={
        time: new Date().getTime(),//设置存储的时间
        overTime:864000-(new Date().getHours()*3600+new Date().getMinutes()*60+new Date().getSeconds()),//存储过期时间
        shareFlag:shareFlag,
    }
    localStorage.setItem("Infor", JSON.stringify(Infor));
};
//微信分享代码
var shareData = {
    imgUrl: "http://mblog.people.com.cn/microblog-v3/h5/2017xncj/images/share.jpg",
    link: 'http://mblog.people.com.cn/microblog-v3/h5/2017xncj/html/instr.html',
    title: '人民网大拜年：吉星高照，好礼来袭',
    desc: '一大波新年礼物来袭！小手一抖，吉礼到手！2017，你我同行。'
};
peopleWXConfig.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'];
wx.config(peopleWXConfig);
function initWXShare() {
    wx.onMenuShareAppMessage({
        title:shareData.title,
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
                            shareFlag=1;
                            save();
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
                            shareFlag=1;
                            save()
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
                            shareFlag=1;
                            save()
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
                            shareFlag=1;
                            save()
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