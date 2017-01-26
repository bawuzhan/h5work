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
    //�ж�͸����  apply�ɲ����Ե��
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
        var st = Math.abs(strangth.value || 10);//�õ�͸���ȵ�ֵ
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);//��ȡͼƬ������ֵ
        sk.sketch(imgData, st);//ִ��ͼƬ��һϵ�еĴ���
        ctx.putImageData(imgData, 0, 0);//����������
    }
    var defaultWidth = 480, defaultHeight = 600;//Ĭ�ϴ�С��640*480px
    //���û�����С
    var setCanvasSize = function(width, height){
        var scale = height / width,//������ű���
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
    //����������
    var drawImage = function(img){
        toggleActionButton(false);//����Ϊapply
        setTimeout(function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);//���֮ǰ�Ļ���
            scaleA();
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);//�Ȱѵ�ǰ��ͼƬ����ȥ
            doSketch();//�޸�Ϊ����ͼ��
            download.href = canvas.toDataURL();//����ͼƬ���ص�����
            toggleActionButton(true);//�������Ѿ����»������  apply��ť���Ե����
            dropper.style.position="static";
        }, 0);
    }

    dropper.addEventListener('drop', function(e){//��ק���Ƶ�����
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
    //ͼƬ����
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
