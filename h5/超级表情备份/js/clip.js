var clearLine;
function tapClip(a){
    var hastouch = "ontouchstart" in window?true:false,
        tapstart = hastouch?"touchstart":"mousedown",
        tapmove = hastouch?"touchmove":"mousemove",
        tapend = hastouch?"touchend":"mouseup";
    var s=document.documentElement.clientWidth/300;
    canvas.addEventListener(tapstart ,clearLine,false);
    function clearLine(e){
        e.preventDefault();
        x1 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas2.offsetLeft;
        y1 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas2.offsetTop;

        ctx.lineCap = "round";　　//设置线条两端为圆弧
        ctx.lineJoin = "round";　　//设置线条转折为圆弧
        ctx.lineWidth = a*2;
        ctx.globalCompositeOperation = "destination-out";

        ctx.save();
        ctx.beginPath()
        ctx.arc(x1/s,y1/s,1,0,2*Math.PI);
        ctx.fill();
        ctx.restore();
        canvas.addEventListener(tapmove , tapmoveHandler);
        canvas.addEventListener(tapend , function(){
            canvas.removeEventListener(tapmove , tapmoveHandler);
        });
        function tapmoveHandler(e){
            e.preventDefault()
            x2 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
            y2 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;
            ctx.save();
            ctx.moveTo(x1/s,y1/s);
            ctx.lineTo(x2/s,y2/s);
            ctx.stroke();
            ctx.restore();
            x1 = x2;
            y1 = y2;
            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);//获取图片的像素值
            ctx.putImageData(imgData, 0, 0);//画到画布上
            download.href = canvas.toDataURL();//设置图片下载的链接
        }
    }
    window.clearLine=clearLine;
}

