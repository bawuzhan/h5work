(function(){
	var iOS = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
	var isWIFI = navigator.userAgent.indexOf('NetType/WIFI') !== -1;
	var isWX =  navigator.userAgent.indexOf('Messenger') !== -1;
	var isMobile = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);
	isMobile = isMobile ? isMobile[0] : false;

	function I(id){
		return document.getElementById(id);
	};
	function Q(s, p){
		return (p || document).querySelector(s);
	};
	function QA(s, p){
		return (p || document).querySelectorAll(s);
	};

	var audioType = navigator.userAgent.match(/Firefox|Opera/i)?'ogg':'mp3';
	if(isWX){
		if(location.host != 't.people.com.cn'){
			location.href = 'http://t.people.com.cn/h5/shijian';
			return;
		};
	};
	var mul_table = [
	        512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,
	        454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,
	        482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,
	        437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,
	        497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,
	        320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,
	        446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,
	        329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,
	        505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,
	        399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,
	        324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,
	        268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,
	        451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,
	        385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,
	        332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,
	        289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];
	   
	var shg_table = [
		     9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 
			17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 
			19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
			20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
			21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
			21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 
			22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
			22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 
			23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
			23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
			23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 
			23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];

	function stackBlurCanvasRGB( canvas, top_x, top_y, width, height, radius )
	{
		if ( isNaN(radius) || radius < 1 ) return;
		radius |= 0;
		
		var context = canvas.getContext("2d");
		var imageData;
		try {
		  try {
			imageData = context.getImageData( top_x, top_y, width, height );
		  } catch(e) {
		  
			// NOTE: this part is supposedly only needed if you want to work with local files
			// so it might be okay to remove the whole try/catch block and just use
			// imageData = context.getImageData( top_x, top_y, width, height );
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
				imageData = context.getImageData( top_x, top_y, width, height );
			} catch(e) {
				alert("Cannot access local image");
				throw new Error("unable to access local image data: " + e);
				return;
			}
		  }
		} catch(e) {
		  alert("Cannot access image");
		  throw new Error("unable to access image data: " + e);
		}
				
		var pixels = imageData.data;
				
		var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
		r_out_sum, g_out_sum, b_out_sum,
		r_in_sum, g_in_sum, b_in_sum,
		pr, pg, pb, rbs;
				
		var div = radius + radius + 1;
		var w4 = width << 2;
		var widthMinus1  = width - 1;
		var heightMinus1 = height - 1;
		var radiusPlus1  = radius + 1;
		var sumFactor = radiusPlus1 * ( radiusPlus1 + 1 ) / 2;
		
		var stackStart = new BlurStack();
		var stack = stackStart;
		for ( i = 1; i < div; i++ )
		{
			stack = stack.next = new BlurStack();
			if ( i == radiusPlus1 ) var stackEnd = stack;
		}
		stack.next = stackStart;
		var stackIn = null;
		var stackOut = null;
		
		yw = yi = 0;
		
		var mul_sum = mul_table[radius];
		var shg_sum = shg_table[radius];
		
		for ( y = 0; y < height; y++ )
		{
			r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;
			
			r_out_sum = radiusPlus1 * ( pr = pixels[yi] );
			g_out_sum = radiusPlus1 * ( pg = pixels[yi+1] );
			b_out_sum = radiusPlus1 * ( pb = pixels[yi+2] );
			
			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			
			stack = stackStart;
			
			for( i = 0; i < radiusPlus1; i++ )
			{
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack = stack.next;
			}
			
			for( i = 1; i < radiusPlus1; i++ )
			{
				p = yi + (( widthMinus1 < i ? widthMinus1 : i ) << 2 );
				r_sum += ( stack.r = ( pr = pixels[p])) * ( rbs = radiusPlus1 - i );
				g_sum += ( stack.g = ( pg = pixels[p+1])) * rbs;
				b_sum += ( stack.b = ( pb = pixels[p+2])) * rbs;
				
				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				
				stack = stack.next;
			}
			
			
			stackIn = stackStart;
			stackOut = stackEnd;
			for ( x = 0; x < width; x++ )
			{
				pixels[yi]   = (r_sum * mul_sum) >> shg_sum;
				pixels[yi+1] = (g_sum * mul_sum) >> shg_sum;
				pixels[yi+2] = (b_sum * mul_sum) >> shg_sum;
				
				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				
				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				
				p =  ( yw + ( ( p = x + radius + 1 ) < widthMinus1 ? p : widthMinus1 ) ) << 2;
				
				r_in_sum += ( stackIn.r = pixels[p]);
				g_in_sum += ( stackIn.g = pixels[p+1]);
				b_in_sum += ( stackIn.b = pixels[p+2]);
				
				r_sum += r_in_sum;
				g_sum += g_in_sum;
				b_sum += b_in_sum;
				
				stackIn = stackIn.next;
				
				r_out_sum += ( pr = stackOut.r );
				g_out_sum += ( pg = stackOut.g );
				b_out_sum += ( pb = stackOut.b );
				
				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				
				stackOut = stackOut.next;

				yi += 4;
			}
			yw += width;
		}

		
		for ( x = 0; x < width; x++ )
		{
			g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;
			
			yi = x << 2;
			r_out_sum = radiusPlus1 * ( pr = pixels[yi]);
			g_out_sum = radiusPlus1 * ( pg = pixels[yi+1]);
			b_out_sum = radiusPlus1 * ( pb = pixels[yi+2]);
			
			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			
			stack = stackStart;
			
			for( i = 0; i < radiusPlus1; i++ )
			{
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack = stack.next;
			}
			
			yp = width;
			
			for( i = 1; i <= radius; i++ )
			{
				yi = ( yp + x ) << 2;
				
				r_sum += ( stack.r = ( pr = pixels[yi])) * ( rbs = radiusPlus1 - i );
				g_sum += ( stack.g = ( pg = pixels[yi+1])) * rbs;
				b_sum += ( stack.b = ( pb = pixels[yi+2])) * rbs;
				
				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				
				stack = stack.next;
			
				if( i < heightMinus1 )
				{
					yp += width;
				}
			}
			
			yi = x;
			stackIn = stackStart;
			stackOut = stackEnd;
			for ( y = 0; y < height; y++ )
			{
				p = yi << 2;
				pixels[p]   = (r_sum * mul_sum) >> shg_sum;
				pixels[p+1] = (g_sum * mul_sum) >> shg_sum;
				pixels[p+2] = (b_sum * mul_sum) >> shg_sum;
				
				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				
				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				
				p = ( x + (( ( p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;
				
				r_sum += ( r_in_sum += ( stackIn.r = pixels[p]));
				g_sum += ( g_in_sum += ( stackIn.g = pixels[p+1]));
				b_sum += ( b_in_sum += ( stackIn.b = pixels[p+2]));
				
				stackIn = stackIn.next;
				
				r_out_sum += ( pr = stackOut.r );
				g_out_sum += ( pg = stackOut.g );
				b_out_sum += ( pb = stackOut.b );
				
				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				
				stackOut = stackOut.next;
				
				yi += width;
			}
		}
		
		context.putImageData( imageData, top_x, top_y );
		
	}

	function BlurStack()
	{
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 0;
		this.next = null;
	}

	//编辑器
	var load = {
		page : 1,
		bgAudio : 'http://i0.peopleurl.cn/microblog-v3/2015subject/0122_thisyear/images/sound.' + audioType,
		elementsPath : 'images/',
		elements : [ //需要加载的元素
			[],
			[],
			[],
			[],
			[]
		],
		defaultTxtIndex : 0,
		style : 1,
		mute : false,
		init : function(){
			var _self = this;
			var dataId = location.href.match(/\/(\d+)($|\?)/) || location.href.match(/id=(\d+)($|\&)/);
			if(!dataId){
				alert('请指定id');
				return;
			}else{
				dataId = dataId[1];
			};
			this.dataId = dataId;
			var dataurl = '/nmsgimage/wx/conf/' + dataId + '.txt';
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					//上传完成
					var rTxt = xhr.responseText;
					if(window.localStorage && localStorage['tempId'] == dataId){
						showShare();
						localStorage.removeItem('tempId');
					};
					// try{
						var data = eval('(' + rTxt + ')');
						_self.preview(data);
					// }catch(e){
					// 	alert('未知错误！');
					// 	console.log(e.message);
					// }
				}else if(xhr.readyState == 4){
					alert('网络忙，请稍后再试！code:' + xhr.status);
				};
			};
			xhr.ontimeout = function(e){
				alert('网络不给力，请在较好的网络环境中再试！');
			};
			xhr.open('GET', dataurl, true);
			xhr.send(null);
		},
		preview : function(data){
			if(data.scrnery.length == 0){
				alert('数据不正确');
				return;
			};
			this.style = data.style;
			this.items = data.scrnery;
			this.teamName = decodeURIComponent(data.team).replace(/</g, '&lt;');
			
			var viewWidth = document.body.clientWidth,
			viewHeight = document.body.clientHeight;
			var preload = this.elements[this.style - 1];
			for (var i = 0; i < preload.length; i++) {
				preload[i] = this.elementsPath + preload[i];
			};
			shareData.image = this.items[0].src;
			var html = '<div class="globalPackage"><div class="sound s_off"></div><div class="moveArr moveArr_0' + this.style + '"></div></div><div class="scenery page_0' + this.style + '">'+
		'<div class="bg"></div>'+
		'<div class="bigTitle" data-animationIn="fadeInUp 1s 1s">'+
		'<div class="title"></div><p>' + this.teamName + '</p></div>'+
		'<div class="logo"></div>'+
	'</div>';
			var animations = ['fadeInLeft 1s 0', 'fadeInRight 1s 0', 'fadeInDown 1s 0', 'fadeInUp 1s 0'];
			var txtPos = ['top:5em;left:2em;','bottom:8em;right:2em;','top:5em;left:2em;','bottom:8em;right:2em;'];
			var txtInAnimations = ['fadeInRight 3s 0', 'fadeInLeft 3s 0', 'fadeInRight 3s 0', 'fadeInLeft 3s 0'];
			if(this.items.length){
				preload.push(this.items[0].src);
			};
			for (var i = 0; i < this.items.length; i++) {
				html += '<div class="scenery" data-autoNext="8"><div class="userImgBox" data-animationIn="' + (animations[i % animations.length]) + '"><canvas id="bgCanvas_' + i + '" class="userBgImg"></canvas><img '+ (i==0?'':'data-') +'src="' + this.items[i].src + '" class="userImg" onload="showBlurBg(this)" style="top:' + (Math.round((viewHeight - (this.items[i].height * viewWidth / this.items[i].width)) * 0.4)) + 'px"></div>';
				

				if(this.items[i].txt){
					html += '<div class="userTxt" data-animationIn="' + (txtInAnimations[i % txtInAnimations.length]) + '" style="'+ (txtPos[i % txtPos.length]) +'">' + decodeURI(this.items[i].txt).replace(/</g, '&lt;').replace(/([,，;；。])/g, '$1<br>') + '</div>';
				};
				html += '</div>';
			};
			html += '<div class="scenery page_end_01">'+
		'<div class="bg"></div>'+
		'<div class="number">编号：' + this.dataId + '</div>'+
			'<a href="/dxsHuodongPh.action" class="toRank"></a>' +
		    '<a href="javascript:showShare()" class="toShare"></a>' +
		    //'<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx08c557d901beff5a&redirect_uri=http%3A%2F%2Ft.people.com.cn%2Fwechatcallback.action%3FconfId%3D' + this.dataId + '&response_type=code&scope=snsapi_login&state=state#wechat_redirect" class="toVote"></a>' +
		    '<a href="javascript:alert(\'投票已结束\')" class="toVote"></a>' +
		    '<a href="/h5/shijian" class="toDoSelf"></a>' +
			'<div class="footer" data-animationIn="fadeInUp 1s 0" data-animation="shine 2s 0 2"><div class="pic"></div></div>' +
			'</div>';
			$('.slideshow').html(html);
			if(typeof window.setShareTitle == 'function'){
				window.setShareTitle(data.style, this.items[0].src, this.teamName);
			};
			mobileshow.init('.slideshow', preload);
			mobileshow.setSound(this.bgAudio);
		}
	};
	window.showShare = function(str){
		if(!isWX){
			document.getElementById('shareAlert').innerHTML = '<div class="othersShare">分享：<a href="javascript:void(0)" onclick="shareSina()"><img src="/microblog-v3/2014subject/1216_oneword/images/sina.png"></a> <a href="javascript:void(0)" onclick="sharePeople()"><img src="/microblog-v3/2014subject/1216_oneword/images/people.png"></a> <a href="javascript:void(0)" onclick="shareTencent()"><img src="/microblog-v3/2014subject/1216_oneword/images/tencent.png"></a></div>';
		};
		$('#shareAlert').show();
		setTimeout(function(){
			$('#shareAlert').hide();
		}, 10000);
	};
	

	var viewWidth = document.body.clientWidth,
		viewHeight = document.body.clientHeight;
	
	viewWidth = viewWidth > 640 ? 640 : viewWidth;
	viewHeight = viewHeight > 1008 ? 1008 : viewHeight;

	var s = viewWidth / 640;

	$(document).bind('touchmove', function(e){
		return false;
	});

	//通过字体控制布局比例
	if(!isMobile){//非移动设备
		var f = document.documentElement.clientHeight / 504 * 16,
			viewWidth = Math.round(document.documentElement.clientHeight / 504 * 320);
		document.documentElement.style['font-size'] = f + 'px';
		document.body.style['overflow'] = 'hidden';
		document.body.style['width'] = viewWidth + 'px';
		document.body.style['position'] = 'relative';
		
		var pb = document.createElement('div');
		pb.className = 'pageBtn';
		pb.style.left = viewWidth + 'px';
		pb.innerHTML = '<a href="javascript:void(0)" id="preBtn">上一页</a><a href="javascript:void(0)" id="nextBtn">下一页</a>'
		document.body.appendChild(pb);

		Q('#preBtn').onclick = function(){
			mobileshow.pre();
			return false;
		};
		Q('#nextBtn').onclick = function(){
			mobileshow.next();
			return false;
		};

	}else if(viewWidth < 640){
		document.documentElement.style['font-size'] = 32 * s + 'px';
	};

	//等待loadImg frame载入
	var loadImg;
	window.onmessage = function(e){
		if(e.origin === 'http://i0.peopleurl.cn' && e.data == 'ready'){
			loadImg = document.getElementById('loadImgFrame').contentWindow;
			window.onmessage = function(e){
				if(e.origin === 'http://i0.peopleurl.cn'){
					var data = e.data.split('{|}');
					if(data.length == 2 && document.getElementById(data[0])){
						excuBlurBg(document.getElementById(data[0]), data[1]);
					}
				}
			};
		};
	};
	window['showBlurBg'] = function(img){
		var canvas = img.previousSibling;
		if(canvas.tagName != 'CANVAS'){
			return;
		};
		//如果frame未载入，稍后重试
		if(loadImg){
			loadImg.postMessage(canvas.id + '{|}' + img.src, '*');
		}else{
			var t = img.getAttribute('data-bgTry') || 0;
			if(t < 20){
				img.setAttribute('data-bgTry', t);
				setTimeout(function(){
					window['showBlurBg'](img);
				}, 500);
			};
		}
	};
	function excuBlurBg(canvas, src){
		var img = new Image();
		img.onload = function(){
			canvas.width = document.body.clientWidth;
			canvas.height = document.body.clientHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			stackBlurCanvasRGB(canvas, 0, 0, canvas.width, canvas.height, Math.round(canvas.width/10));
			var imgW = canvas.width,
				imgH = imgW / img.width * img.height,
				top = (canvas.height - imgH) * 0.4;
			ctx.drawImage(img, 0, top, imgW, imgH);
			// if(canvas.nextSibling && canvas.nextSibling.tagName == 'IMG'){
			// 	canvas.parentNode.removeChild(canvas.nextSibling);
			// };
		};
		img.src = src;
	}

	load.init();
})();
