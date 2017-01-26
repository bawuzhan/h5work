/**
 * Created by bawuzhan on 2016/10/14.
 */
//动态计算rem的值
document.documentElement.style.fontSize = document.documentElement.clientWidth / 640 * 100 + "px";

//红军路线点位置
var ary = [
    {left: "4.64rem", top: "4.24rem"},
    {left: "3.54rem", top: "4.66rem"},
    {left: "2.54rem", top: "3.82rem"},
    {left: "1.56rem", top: "3.56rem"},
    {left: "0.31rem", top: "2.9rem"},
    {left: "0.44rem", top: "2.18rem"},
    {left: "0.71rem", top: "1.53rem"},
    {left: "0.92rem", top: "1.27rem"},
    {left: "1.56rem", top: "0.3rem"},
    {left: "3.45rem", top: "0.8rem"},
]


//小人走到的位置
function pos(n) {
    $(".line>i").each(function (index, item) {
        if (index <= n - 2) {
            $(this).css("backgroundImage", 'url("images/red.png")');
            $(this).css("zIndex", 4);
        }
    })
    $('.event>div>i').each(function (index, item) {
        if (index <= n - 2) {
            $(this).css("background", '#e1915c');
        }
    })
    ary.forEach(function (item, index) {
        if (index <= n-1) {
            (function (item) {
                window.setTimeout(function () {
                    $(".man").animate(item);
                }, index * 500);
            })(item)
        }
    })
};
var index, imgIndex;
var $btn = $('#btn');//按钮


/*-------------------获取已经参与的人数-------------------------*/
$.ajax({
    url: "http://t.people.com.cn/queryUserList.action",
    type: "get",
    success: fn,
});
//把参与过的人绑定data
function fn(data) {
    //显示对应的路线
    var total = $('#hidden>span').html();//   获取人数
    var mask = $('#hidden>i').html();//获取标识
    console.log(mask);
    var aImg = $('#hidden>img')[0].src//获取图片
    console.log(aImg)
    var b = new String(total);
    var a = b.length;//获取人数的位数
    if (mask==-9) {//人数超了
        total = 25000;
        $('.people').html('本次活动已经结束，感谢您的参与');
        $(".other>.leave").html("名额已满，明年再来哦~");
        $(".other>.leave").css("fontSize","");
        $(".phone").hide();
        $(".join").hide();
        $(".share").css("marginBottom","10px");
    } else {
        //填入你是第几位参与者
        if (mask == -1) {//如果点击过了 显示已经点击过了
            $('.people').html("您已经参与过本次活动");
            $(".phone").hide();
            $(".join").hide();
            $(".share").css("marginBottom","10px");
        } else {
            var str = "";
            str += "<i><img src='" + aImg + "'/></i>你是第";
            for (var i = 0; i < a; i++) {
                str += "<span>" + b[i] + "</span>"
            };
            str += "位参与者";
            $('.people').html(str);
        }
        //计算剩余多少位名额 并计入页面
        var leave = 25000 - total;
        $(".other").html("<div class='total'><span>25000个抽奖名额</span></div><div class='leave'>还有<span>" + leave + "</span>个机会</div>")
    }

    imgIndex = Math.floor((total) / 2500);//计算该显示的图片
    pos(imgIndex);

    //绑定随机绑定所有的人的信息 最多10个
    var eve = ["瑞金", "强渡乌江", "遵义会议", "四渡赤水", "强渡大渡河", "飞夺泸定桥", "翻雪山", "过草地", "长征大会师", "直罗镇战役"];
    var str2 = "";
    data=JSON.parse(data)
    if (data) {
        for (var i = 0; i < data.length; i++) {
            data[i].nickname=data[i].nickname.length>5?data[i].nickname.substring(0,5)+"...":data[i].nickname;
            str2 += "<li>"
            str2 += "<i><img src='" + data[i].headimgurl + "' alt='用户头像'/></i>"
            str2 += "<span>" + data[i].nickname + "</span>"
            str2 += "<span>" + eve[data[i].czid] + "处签到</span>"
            str2 += "</li>"
        }
    };
    $(".list").html(str2);
    if (data.length < 6) {//不滚动并且高度缩小
        $(".banner").css("height", data.length * .88 + "rem");
    } else {
        run();
    };
    index = total;//把当前的值赋给全局;
    //判断本地有没有存储用户信息
};
/*var Info = localStorage.getItem("Info");*/
/*if (!Info) {*/
    //如果没有点击过在绑定事件
    $btn.singleTap(join);
/*};*/
/*-------------点击参与抽奖按钮-----------------------------*/
function join() {
    var Info = {
        isTouch: "ok",
    };
    if (!(/^1[34578]\d{9}$/.test($(".pho")[0].value))) {
        alert("请填写正确的手机号");
        return;
    }
    var phoneValue = $(".pho")[0].value;
    var sn = $("#sn").html();
    var url = "http://t.people.com.cn/voteChangzheng.action?mobile=" + phoneValue + "&sn=" + sn;
    $.get(url, {inFor: null}, function (data) {
        console.log(data);
        if (data == 1) {
            alert("已接过战友的枪！感谢参与！");
            /*localStorage.setItem("Info", JSON.stringify(Info));*/
            $(".phone").hide()
            $(".share").css("marginBottom","10px");
        } else if(data == -9){
            alert("手机号不合法,请重新输入");
        }
    });
    $(".join").hide();
    //人数+1
    index++;
};
$(".pho").singleTap(function () {
    //当表单点击时红旗的定位变为绝对定位
    $(".join").css("position", "absolute");
});
$(".join").singleTap(function(){
    console.log(1)
    var height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
    window.scrollTo(0,height)
});
//滚动效果
function run() {
    var $list = $('.list');
    var inner = $list.html();
    console.log(inner);
    $list.append(inner);
    $list.css("height", $list.offset().height * 2);
    var timer = window.setInterval(move2, 100);
    var curTop = $list[0].offsetTop;

    function move2() {
        curTop -= 2;
        if (curTop <= -$list.offset().top / 2) {
            curTop = 0
        }
        $list.css('top', curTop);
    }
}


