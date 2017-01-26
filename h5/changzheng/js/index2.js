/**
 * Created by bawuzhan on 2016/10/14.
 */

/**
 * Created by bawuzhan on 2016/10/12.
 */
/*整体思路
 1、最开始没走过线路段都是蓝色的  走过的路线段是红的
 2、小红军起初在起始位置 当用户点击后 运动到相应的位置 并且判断 用户点击以后是否达到下一个阶层的路线 如果达到的话，就把下一段的背景也换为红的
 3、根据实际人数判断用户是第几位参与者 并且计算剩余参与者的数量
 4、自动获取在几个重要节点签到的微信头像及昵称，呈滚动显示
 5、	“点击屏幕右上【…】分享长征接力”制作显示效果
 6、	输入手机号，并点击“参与抽奖”后自动弹出“已接过战友的抢！感谢参与！”的自动回复框
 */





//动态计算rem的值
document.documentElement.style.fontSize = document.documentElement.clientWidth / 640 * 100 + "px";

//路线点位置
var ary=[
    {left: "4.64rem",top:"4.24rem"},
    {left: "3.54rem",top: "4.66rem"},
    {left: "2.54rem",top: "3.82rem"},
    {left: "1.56rem",top: "3.56rem"},
    {left: "0.31rem",top: "2.9rem"},
    {left: "0.44rem",top: "2.18rem"},
    {left: "0.71rem",top: "1.53rem"},
    {left: "0.92rem",top: "1.47rem"},
    {left: "1.56rem",top: "0.3rem"},
    {left: "3.45rem",top: "0.8rem"},
    {left: "3.87rem",top: "2.35rem"},
]


//小人走到的位置
function pos(n){
    $(".line>i").each(function(index,item){
        if(index<=n-1){
            $(this).css("backgroundImage",'url("images/red.png")');
            $(this).css("zIndex",4);
        }
    })
    $('.event>div>i').each(function(index,item){
        if(index<=n-1){
            $(this).css("background",'#e1915c');
        }
    })
    ary.forEach(function(item,index){
        if(index<=n){
           console.log(item);
            (function(item){
                window.setTimeout(function(){
                    $(".man").animate(item);
            },index*500);
            })(item)
        }
    })
};
var index, imgIndex;
var $btn = $('#btn');//按钮


/*-------------------获取已经参与的人数-------------------------*/
$.ajax({
    url: "json/num.json",
    type: "get",
    success: fn
});
//把参与过的人绑定data
function fn(data){

    //显示对应的路线
    var total = $('#hidden>span').html();//   获取人数
    var mask=$('#hidden>div').html();//获取标识
    var img=$('#hidden>img').src//获取图片
    var b=new String(total)
    var a=b.length;//获取人数的位数
    if(total>25000){//人数超了
        $('.people').html('本次活动已经结束，感谢您的帮助');
        $(".other>.leave").html("名额已满，明年再来哦~");
    }
    //填入你是第几位参与者
    if(mask==-1){//如果点击过了 显示已经点击过了
        $('.people').html("您已经点击过了，请不要重复点击");
    }else{
        var str=""
        str+="<i><img src='"+img+"'/></i>你是第";
        for(var i=0;i<a;i++){
            str+="<span>"+b[i]+"</span>"
        };
        str+="位参与者";
        $('.people').html(str);
    }


    //计算剩余多少位名额 并计入页面
    var leave=25000-total;
    $(".other").html("<div class='total'><span>25000个抽奖名额</span></div><div class='leave'>还有<span>"+leave+"</span>个机会</div>")


    imgIndex = Math.floor((data.length) / 10);//计算该显示的图片
    pos(imgIndex);

    //绑定随机绑定所有的人的信息 10个
    var str2="";
    for(var i=0;i<10;i++){
        var ran=Math.round(Math.random()*(total-1));
        if(ran>=0){
            str2+="<li>"
            str2+="<i><img src='"+data[ran].pic+"' alt='用户头像'/></i>"
            str2+="<span>"+data[ran].name+"</span>"
            str2+="<span>"+data[ran].dec+"处签到</span>"
            str2+="</li>"
        }
    }
    $(".list").html(str2);
    run()


    index = data.length;//把当前的值赋给全局;
    //判断本地有没有存储用户信息
    var Info = localStorage.getItem("Info");
    console.log(Info)
    if (Info) {
        //点击过直接改变样式 不在绑定事件
    } else {
        //如果没有点击过在绑定事件
        $btn.singleTap(join);
    }
};





/*-------------点击参与抽奖按钮-----------------------------*/
function join() {
    //已经点击过再次点击无效
    if ($btn.attr("isTouch") === "ok") {
        return;
    };
    //设置一个标识表示点击过了
    $btn.attr("isTouch", "ok");
    //->点击完成后需要进行本地存储;
    var Info = {
        isTouch: "ok",
    };
    localStorage.setItem("Info", JSON.stringify(Info));
    //大于100人说明人数已满 不在进行操作
    if (index > 25000) {
        $btn.html('人数已满').css('background', '#333');
        return;
    };
    alert("已接过战友的抢！感谢参与！");
    //人数+1
    index++;
    //计算该加载第几张图
    imgIndex = Math.floor(index / 10);
    //把对应的图片加载上
    pos(imgIndex);
    //向后台发送请求告诉后台哪个人点击了 是第几个
    $.post("json/num.json", {'result': index});
    //改变样式显示点击过了
    $btn.html('已经参与').css('background', '#333');
    $('.bottom>p>span').html(index)
}


//滚动效果
function run(){
    var $list=$('.list');
    var inner=$list.html();
    $list.append(inner);
    $list.css("height",$list.offset().height*2);
    var timer=window.setInterval(move2,100);
    var curTop=$list[0].offsetTop;
    console.log(curTop)
    function move2(){
        curTop-=2;
        if(curTop<=-$list.offset().top/2){
            curTop=0
        }
        $list.css('top',curTop);
    }
}


