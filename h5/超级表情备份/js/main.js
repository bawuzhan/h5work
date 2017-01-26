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
        img,
        cacheImg;
canvas.width=640;
canvas.height=640;
    //判断透明度  apply可不可以点击
    var toggleActionButton = function(status){
        if(status){
            action.classList.add('btn-primary');
            action.disabled = false;
        }else{
            action.classList.remove('btn-primary');
            action.disabled = true;
        }
    }

    var doSketch = function(){
        var st = Math.abs(strangth.value || 10);//得到透明度的值
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);//获取图片的像素值
        sk.sketch(imgData, st);//执行图片的一系列的处理
        ctx.putImageData(imgData, 0, 0);//画到画布上
    }
    var defaultWidth = 480, defaultHeight = 600;//默认大小是640*480px
    //设置画布大小
    var setCanvasSize = function(width, height){
        var scale = height / width,//求出缩放比例
            defaultScale = defaultHeight / defaultWidth;
        if(scale >= defaultScale && height >= defaultHeight){
            height = defaultHeight;
            width = height / scale;
        }
        if(scale <= defaultScale && width >= defaultWidth){
            width = defaultWidth;
            height = width * scale;
        }
        // console.log(width, height);
        canvas.width = width;
        canvas.height = height;
    }
    //画到画布上
    var drawImage = function(img){
        toggleActionButton(false);//设置为apply
        setTimeout(function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);//清除之前的画布
            scaleA();
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);//先把当前的图片画上去
            doSketch();//修改为素描图案
            download.href = canvas.toDataURL();//设置图片下载的链接
            toggleActionButton(true);//当画布已经重新绘制完毕  apply按钮可以点击；
            dropper.style.position="static";
        }, 0);
    }

    dropper.addEventListener('drop', function(e){//拖拽绘制到画布
        e.preventDefault();
        dropper.innerHTML = '';
        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onload = function(e){
            img = new Image();
            img.onload = function(){
                drawImage(this);
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
        }
        reader.readAsDataURL(file);
    }, false);
    dropper.addEventListener('dragover', function(e){
        e.preventDefault();
    }, false);
    dropper.addEventListener('dragenter', function(e){
        e.preventDefault();
    }, false);

    action.addEventListener('click', function(e){
        if(img){
            drawImage(img);
        }else{
            alert('please select a picture first')
        }
    }, false);
    //图片缩放
    var hastouch = "ontouchstart" in window?true:false;
    var tapMove = hastouch?"touchmove":"mousemove";
    function scaleA(){
        console.log('aaa')
        slider.addEventListener(tapMove,function(){
            console.log('aaa');
            scale=slider.value;
            setTimeout(drawImageByScale,50,scale)
            //drawImageByScale(scale)
        },false);
        function drawImageByScale(scale){
            var imageWidth=480*scale;
            var imageHeight=600*scale;
            var sx=-imageWidth/2+canvas.width/2
            var sy=-imageHeight/2+canvas.height/2
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(img,sx,sy,imageWidth,imageHeight)

        }
    }
