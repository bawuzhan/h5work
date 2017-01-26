
/**
 * Created by bawuzhan on 2017/1/13.
 */
var filter=$('.filter'),again=$('.again'),shareAgain=$('.shareAgain'),over=$('.over'),sn=$("#sn").html(),count=$('.count span'),kcjCount=0,shareFlag;
var inner=['<h2>大奖就差一点点</h2><span>换个姿势试试手气</span>','<h2>大奖没有投入你的怀抱</h2><span>你和奖品还差再摇一次的距离</span>','<h2>大奖就差一点点</h2><span>可能姿势不对哦</span>'];
//公用的function
var utils={
    random:function (m,n){//取随机数
        return Math.round(Math.random(n-m)*n+m)
    },
    alert:function(index){
        filter.css('display','block');
        again.css('display','none');
        over.css('display','none');
        shareAgain.css('display','none');
        index.css('display','block');
    },
    err:function (text){//提示错误信息
        alert(text);
    },
    awardsAlert:function(data){//传进去的参数 弹出中奖的内容
        var awardsList = ['欧淬恩鱼肝油', '美素护手霜', '好医生卡', '祝您健康', '酸枣仁油胶囊', '蛋白粉',"医护到家卡",'联盛堂人参','李锦记耗油','颐净净化器',"先农氏现碾米","慈铭卡"]//奖品列表
        var zjRecordId =data.zjRecordId ,zjFlag =data.zjFlag,zjHongbaoId=data.zjHongbaoId;
        kcjCount--;
        //alert(kcjCount+"  openItem");
        if(kcjCount<=0){
            kcjCount=0
            $('.tlt .times').html(kcjCount)
        }else{
            $('.tlt .times').html(kcjCount)
        }
        //显示弹出层
        if(zjFlag==-1){
            $('#zp').css("transform","rotateZ(0)")
            window.location.href='instr.html';
        }else if(zjFlag==-3){//表示摇过两次
            utils.alert(shareAgain);
            $('#zp').css("transform","rotateZ(0)")
        }else if(zjFlag==-9){//表示没有机会了
            utils.alert(over);
            $('#zp').css("transform","rotateZ(0)")
        }else if(zjFlag==0){
            $('.changeTxt').html(inner[utils.random(0,2)])
            utils.alert(again);
            $('#zp').css("transform","rotateZ(0)")
        }else if(zjFlag==1){//中奖啦
                /*$('.zj_1 h2').html(awardsList[zjHongbaoId])
                $('.zj_1').css("display","block");//如果中奖了 显示中奖的产品*/
                filter.css('display','none');
                window.setTimeout(function(){
                    filter.css('display','none');
                    $('.zz').attr("flag",1);
                    $('#zp').css("transform","rotateZ(0)");
                    window.location.href='http://t.people.com.cn/jkcj2017ZjResult.action?sn='+$('#sn').html()+'&zjRecordId='+zjRecordId;
                },1000)
        }
    }
}
$(function(){
    //请求人数
    $.ajax({
        url: "http://t.people.com.cn/queryCjTotal.action?sn="+sn,
        type: "get",
        success: function(data){
            data=JSON.parse(data);
            count.html(data.totalCount);
        }
    })
    //统计抽奖次数
    $.ajax({
        url: "http://t.people.com.cn/queryJkCjNum.action?sn="+$('#sn').html(),
        type: "get",
        data:null,
        success: function(result){
            result=JSON.parse(result);
            kcjCount=result.kcjCount,shareFlag=result.shareFlag;
            if(kcjCount==-1){//sn不正确
                console.log("error")
                return;
            }else{
                kcjCount>=5?$('.tlt .times').html(5):$('.tlt .times').html(kcjCount);//绑定抽奖次数
            }
        }
    });

    //开始摇奖
    $('.zz').attr("flag",1);
    $('.zz').on('click',function(){
        if($('.tlt .times').html()==0){
            utils.alert(over);
            return;
        }
        if($('.zz').attr("flag")==0){
            return;
        }
        $('.zz').attr("flag",0);
        $.ajax({
             url: "http://t.people.com.cn/procJkChoujiang.action?sn="+sn,
             type: "get",
             success: function(data){
                 data=JSON.parse(data);
                 rotate({
                     obj:'#zp',
                     data:data
                    })
             }
         });
        //text()
    })
    //转动的函数
    /*
     obj--转动的元素
     * during--转动的时间
     * animate--运动的动画形式
     * dir--运动的方向
     * data--ajax请求回来的参数
     * */
    function text(){
        rotate({
            obj:'#zp',
            data:{
                zjHongbaoId :9,
                zjFlag:1,
            },
            during:3000
        })
    }
    function rotate(options){
        var awardsDegree;
        //默认的转动形式
        var animate=['ease','linear','ease-in','ease-out','ease-in-out']
        var _default={
            obj:"#zp",
            data:"",
            during:4000,
            animate:animate[3],
            dir:-1
        };
        for (var key in options) {
            if (_default.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        $(_default.obj).css("transform","rotateZ(0)")
        if(_default.data){
            awardsDegree=[30,60,90,120,150,180,210,240,270,300,330,360];//对应view的不同的角度 80deg的表示没有中奖
            if(_default.data.zjFlag==1){
                switch (_default.data.zjHongbaoId){
                    case 3 :
                        _default.data.zjHongbaoId=0;
                        break;
                    case 12 :
                        _default.data.zjHongbaoId=1;
                        break;
                    case 19 :
                        _default.data.zjHongbaoId=2;
                        break;
                    case 5 :
                        _default.data.zjHongbaoId=4;
                        break;
                    case 11 :
                        _default.data.zjHongbaoId=5;
                        break;
                    case 9:
                        _default.data.zjHongbaoId=6;
                        break;
                    case 18 :
                        _default.data.zjHongbaoId=7;
                        break;
                    case 13 :
                        _default.data.zjHongbaoId=8;
                        break;
                    case 14 :
                        _default.data.zjHongbaoId=9;
                        break;
                    case 8 :
                        _default.data.zjHongbaoId=10;
                        break;
                    case 16 :
                        _default.data.zjHongbaoId=11;
                        break;
                    case 0:
                        _default.data.zjHongbaoId=3;
                        break;
                }
                /*二期*/
                /*
                * if(_default.data.zjFlag==1){
                 switch (_default.data.zjHongbaoId){
                 case 14 :
                 _default.data.zjHongbaoId=0;
                 break;
                 case 10 :
                 _default.data.zjHongbaoId=1;
                 break;
                 case 11 :
                 _default.data.zjHongbaoId=2;
                 break;
                 case 19 :
                 _default.data.zjHongbaoId=4;
                 break;
                 case 6 :
                 _default.data.zjHongbaoId=5;
                 break;
                 case 4:
                 _default.data.zjHongbaoId=6;
                 break;
                 case 20 :
                 _default.data.zjHongbaoId=7;
                 break;
                 case 17 :
                 _default.data.zjHongbaoId=8;
                 break;
                 case 21 :
                 _default.data.zjHongbaoId=9;
                 break;
                 case 15 :
                 _default.data.zjHongbaoId=10;
                 break;
                 case 7 :
                 _default.data.zjHongbaoId=11;
                 break;
                 case 0:
                 _default.data.zjHongbaoId=3;
                 break;
                 }*/
                _default.deg=awardsDegree[_default.data.zjHongbaoId]-15;
            }else{
                _default.deg=awardsDegree[3]-15;
            }
        }
        _default.deg=_default.deg+utils.random(-24,-4);
        _default.deg=_default.dir>0?_default.deg+utils.random(4,5)*360:-(_default.deg+utils.random(4,7)*360);//判断旋转方向
        $(_default.obj).animate({rotateZ:_default.deg+'deg'},_default.during,_default.animate,function(){
            //弹出中的什么奖
            setTimeout(function(){
                utils.awardsAlert(_default.data);
            },1000)
        })
    }
    //关闭弹出层
    $('.close').on('click',function(){
        filter.css('display','none');
        $('.zz').attr("flag",1);
    })
    //点击再来一次
    $('.againShake').on("click",function(){
        filter.css('display','none');
        $('.zz').attr("flag",1);
    });

})