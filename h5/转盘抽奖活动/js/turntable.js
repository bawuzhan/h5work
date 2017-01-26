
// options = {
//     rotateObj:'', //旋转的对象
//     duration:3000, //旋转的时间
//     angles: 1440,  //旋转时间内转动的角度
//     awardsList: ['奖品一', '奖品二', '奖品三', '奖品四', '奖品五', '奖品六'],//所有奖品列表array，指针转--按照顺时针方向从0点位置开始记录，转盘转--按照逆时针...
//     awardsDegree: [], //每个奖品对应的角度值array,若是所有奖品所占角度平均，则可以不赋值
//     flag:true //是否可以启动转盘的标志位，默认为true，主要用于转盘转动的过程中不可再次出发转盘，一般不需要传
// };


/**
 * Turntable 活动转盘类
 * @param options 配置对象
 * @constructor Turntable
 */
function Turntable(options) {

    this.rotateObj = ''; //旋转的对象，可以是装盘或指针,jquery选择对象条件（例：'#btn','.box'...）
    this.duration = 5000;//转动的时间
    this.angles = 1440;  //指定时间内转动的整圈数
    //所有奖品列表，指针转--按照顺时针方向从0点位置开始记录
    //             转盘转--按照逆时针...
    this.awardsList = ['苹果6S Plus', '100M流量', '1G流量', '未中奖', '500M流量', '30M流量'];
    //奖品列表每一项对应的角度array
    this.awardsDegree = [];
    this.flag = true;//是否可以启动转盘的标志
    this.preFlag = true; //是否可以启动预先的匀速转动
    //根据形参赋值
    for (var key in options) {
        if (this.hasOwnProperty(key)) {
            this[key] = options[key];
        }
    }

    //如果奖品对应角度值为空数组，则根据奖品数均分360deg
    if(this.awardsDegree.length == 0){
        //计算每个奖品对应的旋转角度
        for (var i = 0, len = this.awardsList.length; i < len; i++) {
            var one = 360 / len;
            this.awardsDegree.push(one * i);
        }
    }

}


/**
 * lottery 原形上的摇奖函数
 * @param awardIndex 中奖奖品在列表中的索引
 * @param callback 转盘结束后的回调函数
 * @param animate 转盘运动的动画类型，默认为ease-out，值为1时-匀速
 */
Turntable.prototype.lottery = function (awardIndex, callback, animate) {
    // 预先转动为flase 且 摇奖转动为true，即preTurn函数已调用，并且lottery的转动没有执行
    if(!this.preFlag && this.flag ){
        this.flag = false; //把启动标志位置为false
        var _this = this;
        //转盘运动的动画类型
        var easings = [function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        }, //默认ease-out，先快后慢
            function (x,t,b,c,d) { //匀速运动
                return t/d*c;
            }
        ];
        //动画类型若没有值则为0
        animate = animate || 0;
        //停止之前的转盘运动
        $(this.rotateObj).stopRotate();
        //启动转盘
        $(this.rotateObj).rotate({
            angle: 0,
            duration: _this.duration,
            animateTo: _this.angles + _this.awardsDegree[awardIndex],
            easing: easings[animate],
            callback: callback
        });

        //转盘结束后再把启动标志位设为true
        setTimeout(function () {
            _this.flag = true;
            _this.preFlag = true;
        },_this.duration);
    }

};

/**
 * preTurn 点击摇奖按钮，先让转盘匀速转动的函数
 * @param angles 匀速转动的角度
 * @param duration 匀速转动的时间
 */
Turntable.prototype.preTurn = function (angles, duration) {
    angles = angles || 7200; //默认旋转的角度为7200度
    duration = duration || 10000; //默认时间10秒
    //预转动为true 并且 摇奖转动为true
    if(this.preFlag && this.flag) {
        $(this.rotateObj).stopRotate();
        //启动转盘
        $(this.rotateObj).rotate({
            angle: 0,
            duration: duration,
            animateTo: angles,
            easing: function (x, t, b, c, d) { //匀速运动
                return t / d * c;
            }
        });
        this.preFlag = false;
    }
};

/**
 * stop 转盘停止，状态位恢复
 */
Turntable.prototype.stop = function () {
    $(this.rotateObj).stopRotate();
    this.preFlag = true;
    this.flag = true;
};


