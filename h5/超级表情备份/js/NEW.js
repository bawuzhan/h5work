
/**
 * Created by bawuzhan on 2016/11/22.
 */
var $ = window.$ || function(id){
        return document.getElementById(id);
    }
var canvas = $('canvas'),
    action = $('action'),
    download = $('download'),
    strangth = $('strength'),
    dropper = $('dropper'),
    grid = $('grid'),
    slider = $('scaleRange'),
    ctx = canvas.getContext('2d'),
    scale= 1,
    btn=$('btn'),
    img,
    item,
    button=document.getElementsByClassName('bottom')[0],
/* timeout,*/
    cacheImg;
var imageWidth;
var imageHeight;
var sx2;
var sy2;
canvas.height=canvas.width;
var image=new Image();
//判断透明度  apply可不可以点击
var toggleActionButton = function(status){
    if(status){
        action.disabled = false;
    }else{
        action.disabled = true;
    }
}
var doSketch = function(){
    var st = Math.abs(strangth.value || 20);//得到透明度的值
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);//获取图片的像素值
    sk.sketch(imgData, st);//执行图片的一系列的处理
    ctx.putImageData(imgData, 0, 0);//画到画布上
};

//拖进 并可以调节大小
dropper.addEventListener('drop', function(e){//拖拽绘制到画布
    e.preventDefault();
    dropper.innerHTML = '';
    var file = e.dataTransfer.files[0];
    var reader = new FileReader();
    reader.onload = function(e){
        img = new Image();
        img.onload = function(){
            drawImageByScale(scale);
            toggleActionButton(true);
            download.href = canvas.toDataURL();//设置图片下载的链接
        }
        img.src = e.target.result;
    }
    reader.onerror = function(e){
        var code = e.target.error.code;
        if(code === 2){
            alert('please don\'t open this page using protocol fill:///');
        }else{
            alert('error code: ' + code);
        }
        reader.readAsDataURL(file);
    }
    var hastouch = "ontouchstart" in window?true:false;
    var tapMove = hastouch?"touchmove":"mousemove";
    slider.addEventListener(tapMove,function(){
        if(button.style.display=='block'){
            button.style.display='none';
        }
        scale=slider.value;
        setTimeout(drawImageByScale,10,scale)

    },false);
    function drawImageByScale(scale){
        var imageWidth=canvas.width*scale;
        var imageHeight=canvas.height*scale;
        var sx=-imageWidth/2+canvas.width/2
        var sy=-imageHeight/2+canvas.height/2
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(img,sx,sy,imageWidth,imageHeight);
        download.href = canvas.toDataURL();//设置图片下载的链接
    }
    reader.readAsDataURL(file);
}, false);
dropper.addEventListener('dragover', function(e){
    e.preventDefault();
}, false);
dropper.addEventListener('dragenter', function(e){
    e.preventDefault();
}, false);

var drawImage = function(img){
    var imageWidth=canvas.width*scale;
    var imageHeight=canvas.height*scale;
    var sx=-imageWidth/2+canvas.width/2
    var sy=-imageHeight/2+canvas.height/2
    setTimeout(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);//清除之前的画布
        ctx.drawImage(img,sx,sy,imageWidth,imageHeight);//先把当前的图片画上去
        doSketch();//修改为素描图案
        download.href = canvas.toDataURL();//设置图片下载的链接
        /*dropper.style.position="static";*/
        dropper.style.display="none";
    }, 0);
}
//变为素描
action.addEventListener('click', function(e){
    button.style.display='block'
    if(img){
        drawImage(img);
    }else{
        alert('please select a picture first')
        dropper.style.position="relative";
    }
}, false);
//调取橡皮擦
btn.addEventListener('click',clear, false);
function clear(e){
    action.style.display='none';
    slider.style.display='none';
    dropper.style.position="static";
    if(img){
        tapClip(8);
    }else{
        alert('please select a picture first')
    }
};
//贴纸部分显示
$('btn2').onclick=function(){
    if( slider.style.display=='block'){
        slider.style.display='none'
    }
    $('mul').style.bottom=0;
}
//点击贴纸 贴纸定位到指定位置 可以进行拖拽 旋转 保存 只有保存时才会合并
//可以添加多张图片
$('images').addEventListener('click', function (e) {
    if(clearLine){
        canvas.removeEventListener(tapstart ,clearLine,false);
    }
    var a= e.target;
    if(a && a.nodeName == "IMG") {
        /*if(item){
            var frag=confirm('是要重新选择吗');
            if(frag){
                grid.removeChild(item);
            }else{
                return;
            }
        }*/
        dropper.style.display="none";
        var ico=document.createElement('div');
        ico.className='item';
        ico.id='item';
        var img= a.cloneNode(true)
        ico.appendChild(img);
        grid.appendChild(ico);
        $('mul').style.bottom='-2.56rem';
        item=document.getElementsByClassName('item')[0];//本不应该是一个
        download.href = canvas.toDataURL();//设置图片下载的链接
        //设置拖拽
        drag(item);
    }
},false);
//贴纸的移动
function drag(item) {
    item.addEventListener(tapstart, function (e) {
        var touches = e.touches[0];
        oW = touches.clientX - item.offsetLeft;
        oH = touches.clientY - item.offsetTop;
        //阻止页面的滑动默认事件
        document.addEventListener(tapmove, defaultEvent, false);
    }, false)

    item.addEventListener(tapmove, function (e) {
        var touches = e.touches[0];
        var oLeft = touches.clientX - oW;
        var oTop = touches.clientY - oH;
        if (oLeft < 0) {
            oLeft = 0;
        } else if (oLeft > document.documentElement.clientWidth - item.offsetWidth) {
            oLeft = (document.documentElement.clientWidth - item.offsetWidth);
        }
        ;
        if (oTop < 0) {
            oTop = 0;
            console.log(canvas.offsetHeight)
        } else if (oTop >= canvas.offsetHeight - item.offsetHeight) {
            oTop = canvas.offsetHeight - item.offsetHeight;
        }
        item.style.left = oLeft + "px";
        item.style.top = oTop + "px";
    }, false);

    item.addEventListener(tapend, function () {
        document.removeEventListener(tapend, defaultEvent, false);
    }, false);
    function defaultEvent(e) {
        e.preventDefault();
    };
}
/*
 //贴纸的旋转和缩放
 var hammertime = Hammer(document.getElementById('grid'), {
 transform_always_block: true,
 transform_min_scale: 0.5,
 drag_block_horizontal: true,
 drag_block_vertical: true,
 drag_min_distance: 0
 });
 //初始值
 var posX = 0,
 posY = 0,
 last_posX,
 last_posY,
 scaleL = 1,
 last_scale,
 rotation = 0,
 last_rotation;

 hammertime.on('touch drag transform', function (e) {
 switch (e.type) {
 //当touch开始时，记录下当前的缩放量，旋转量和位移量
 case 'touch':
 last_scale = scale;
 last_rotation = rotation;
 last_posX = posX;
 last_posY = posY;
 break;
 //拖拽时改变位移量
 case 'drag':
 posX = last_posX + e.gesture.deltaX;
 posY = last_posY + e.gesture.deltaY;
 break;
 case 'transform':
 rotation = last_rotation + e.gesture.rotation;
 scaleL = Math.min(last_scale * e.gesture.scale, 10);
 break;
 }
 //使用CSS3 transform进行图片的变换
 var transform = "translate3d(" + posX + "px," + posY + "px,0)" + "scale3d(" + scaleL + "," + scaleL + ",1)" + "rotate(" + rotation + "deg)";
 item.style.webkitTransform = transform;
 })
 }
 //最后把item画到canvas上
 function concat(item,rotation,scale){
 var img=item.children[0];
 var l=posX;
 var t=posY;
 var w=item.clientWidth*scale;
 var h=item.clientHeight*scale;
 ctx.drawImage(img,l,t,w,h);//合并
 ctx.rotate(rotation * Math.PI / 180);//旋转
 }
 //当客户下载图片的时候合并
 download.onclick=function(){
 if(item){
 concat(item,rotation,scaleL);
 }
 download.href = canvas.toDataURL();
 }



 */
 //调取微信的照相机或者相册接口
 $('#take').on('click', function () {
 wx.chooseImage({
 success: function (res) {
 var localIds = res.localIds;
 syncUpload(localIds);
 }
 });
 });
 var syncUpload = function(localIds){
 var localId = localIds.pop();
 wx.uploadImage({
 localId: localId,
 isShowProgressTips: 1,
 success: function (res) {
 var serverId = res.serverId; // 返回图片的服务器端ID
 //其他对serverId做处理的代码
 if(localIds.length > 0){
 syncUpload(localIds);
 }
 }
 });
 };
















