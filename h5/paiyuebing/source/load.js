(function(){function k(a){this.f=this.canvas=a.canvas||document.createElement("canvas");this.f.width=a.width||800;this.f.height=a.height||600;this.b=a.width;this.d=a.height;this.o=this.f.getContext("2d");this.scale=a.scale||1;this.L=a.L||!1;this.onclick=a.onclick;this.x=a.x||0;this.y=a.y||0;this.k=new l;this.U=function(){var a,c,d;this.b/this.d<this.a.width/this.a.height&&this.L?(a=this.d/this.a.height,c=(this.b-this.a.width*a)/2,d=0):(a=this.b/this.a.width,c=0,d=(this.d-this.a.height*a)/2);this.i(a,
c,d)}.bind(this);this.Z()}function l(a,b,c,d,e,f){this.B=null;a&&b&&c&&this.l(a,b,c,d,e,f)}(function(){for(var a=0,b=["webkit","moz"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),f=Math.max(0,30-(c-a)),h=window.setTimeout(function(){b(c+
f)},f);a=c+f;return h});window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})})();k.prototype={s:3,n:null,q:null,v:null,I:null,index:-1,g:null,select:function(a){if(!(a==this.index||0>a||a>=this.g.length)){this.index=a;var b,c,d;b=this.g[a];a<this.g.length-1&&(d=this.g[a+1]);0<a&&(c=this.g[a-1]);this.X(b);this.H(c);this.G(d)}},next:function(){this.e&&(this.c=this.a,this.w=this.y,this.h=this.scale,this.index++,this.a=this.e,this.y=this.t,this.x=this.c.width*this.h+
this.x,this.scale=this.j,this.index<this.g.length-1?this.G(this.g[this.index+1]):this.e=null,this.k.l({x:this.x},{x:0},function(a){this.i(this.scale,a.x,this.y)}.bind(this),200,null,function(){this.H(this.g[this.index-1])}.bind(this)))},Y:function(){this.c&&(this.e=this.a,this.t=this.y,this.j=this.scale,this.index--,this.a=this.c,this.y=this.w,this.x=this.x-this.c.width*this.h-this.b/10,this.scale=this.h,0<this.index?this.H(this.g[this.index-1]):this.c=null,this.k.l({x:this.x},{x:0},function(a){this.i(this.scale,
a.x,this.y)}.bind(this),200,null,function(){this.G(this.g[this.index+1])}.bind(this)))},F:function(a,b){if("string"==typeof a)b.src=a;else if(a.V||!a.small)b.src=a.src;else{b.src=a.small;var c=new Image;c.onload=function(){b.src=a.src;a.V=!0};c.src=a.src}},X:function(a){this.a=new Image;this.a.onload=this.U;this.F(a,this.a)},H:function(a){a?(this.h=this.w=this.N=null,this.c=new Image,this.c.onload=function(){this.c&&(this.h=this.b/this.c.width,this.w=this.c.height*this.h<this.d?(this.d-this.c.height*
this.h)/2:0)}.bind(this),this.F(a,this.c)):(this.c&&(this.c.onload=null),this.c=null)},G:function(a){a?(this.j=this.t=this.M=null,this.e=new Image,this.e.onload=function(){this.e&&(this.j=this.b/this.e.width,this.t=this.e.height*this.j<this.d?(this.d-this.e.height*this.j)/2:0)}.bind(this),this.F(a,this.e)):(this.e&&(this.e.onload=null),this.e=null)},Z:function(){var a=null,b=null,c=null,d=null,e=null,f=null,h=null,m=null,k,r,l="mousedown",x="mousemove",y="mouseup";void 0!==document.ontouchstart&&
(l="touchstart",x="touchmove",y="touchend");this.f.addEventListener(l,function(g){this.$=new Date;this.O=!1;this.k.clear();g.preventDefault();m=this.scale;g.targetTouches||(g.targetTouches=[{pageX:g.pageX,pageY:g.pageY}]);a=g.targetTouches[0].pageX-this.f.getBoundingClientRect().left;b=g.targetTouches[0].pageY-this.f.getBoundingClientRect().top;2==g.targetTouches.length?(c=g.targetTouches[1].pageX-this.f.getBoundingClientRect().left,d=g.targetTouches[1].pageY-this.f.getBoundingClientRect().top,e=
a+(c-a)/2,f=b+(d-b)/2,h=Math.sqrt(Math.pow(c-a,2)+Math.pow(d-b,2))):(e=a,f=b,h=0);k=e-this.x;r=f-this.y;this.n=g.targetTouches[0].pageX;this.q=g.targetTouches[0].pageY;this.a.width*this.scale<=this.b&&(this.D=this.C=!0)}.bind(this),!1);var p=null,q=null,s=null,t=null,u=null,v=null,w=null;this.f.addEventListener(x,function(a){a.preventDefault();if(null!==h){a.targetTouches||(a.targetTouches=[{pageX:a.pageX,pageY:a.pageY}]);this.O=!0;var b=this.scale,c,d;p=a.targetTouches[0].pageX-this.f.getBoundingClientRect().left;
q=a.targetTouches[0].pageY-this.f.getBoundingClientRect().top;2==a.targetTouches.length?(s=a.targetTouches[1].pageX-this.f.getBoundingClientRect().left,t=a.targetTouches[1].pageY-this.f.getBoundingClientRect().top,u=p+(s-p)/2,v=q+(t-q)/2,w=Math.sqrt(Math.pow(s-p,2)+Math.pow(t-q,2)),b=m*(w/h||1)):(u=p,v=q,w=0);b*this.a.width<this.b?b-=.7*(b-this.b/this.a.width):b*this.a.width>this.b*this.s&&(b-=.7*(b-this.b*this.s/this.a.width));c=u-k/m*b;d=v-r/m*b;this.v=this.n;this.I=this.q;this.n=a.targetTouches[0].pageX;
this.q=a.targetTouches[0].pageY;a=this.u(b,c,d);a.x!=c&&(!(0<c)||this.c&&this.C?!(0>c)||this.e&&this.D||(c=a.x+.3*(c-a.x)):c=a.x+.3*(c-a.x));a.y!=d&&(d=a.y+.3*(d-a.y));this.i(b,c,d)}}.bind(this),!1);this.f.addEventListener(y,function(a){a.preventDefault();if(0==this.O&&1E3>new Date-this.$&&"function"==typeof this.onclick)this.onclick(this.index);a.targetTouches||(a.targetTouches=[]);1==a.targetTouches.length?(d=c=null,e=a.targetTouches[0].pageX-this.f.getBoundingClientRect().left,f=a.targetTouches[0].pageY-
this.f.getBoundingClientRect().left,k=e-this.x,r=f-this.y,m=this.scale,h=0):(h=f=e=null,this.aa(a))}.bind(this),!1)},aa:function(){var a={},b={};if(this.scale*this.a.width<this.b)a.scale=this.scale,b.scale=this.b/this.a.width,a.x=this.x,b.x=0,a.y=this.y,b.y=b.scale/a.scale*(this.y-this.d/2)+this.d/2,0<b.y&&(b.y=0),this.k.l(a,b,function(a){this.i(a.scale,a.x,a.y)}.bind(this),300);else if(this.scale*this.a.width>this.b*this.s)a.scale=this.scale,b.scale=this.b/this.a.width*this.s,a.x=this.x,b.x=b.scale/
a.scale*(this.x-this.b/2)+this.b/2,a.y=this.y,b.y=b.scale/a.scale*(this.y-this.d/2)+this.d/2,b=this.u(b.scale,b.x,b.y),this.k.l(a,b,function(a){this.i(a.scale,a.x,a.y)}.bind(this),300);else if(null!==this.n&&null!==this.v){var c=this.n-this.v,d=this.q-this.I;a.x=this.x;a.y=this.y;var e=this.b/3,f=this.b/50,h=this.u(this.scale,a.x,a.y);this.a.width*this.scale>=this.b&&(this.D=this.C=!1,0<=this.x&&(this.C=!0),this.x<=-Math.floor(this.a.width*this.scale-this.b)&&(this.D=!0));if(h.x!=a.x&&(Math.abs(c)>
f&&this.a.width*this.scale<=this.b&&this.a.height*this.scale<=this.d||Math.abs(a.x-h.x)>e)){if(0<a.x&&this.c){this.Y();return}if(0>a.x&&this.e){this.next();return}}b.x=this.x+5*c;b.y=this.y+5*d;b=this.u(this.scale,b.x,b.y);this.k.l(a,b,function(a){this.i(this.scale,a.x,a.y)}.bind(this),300,null)}this.I=this.v=this.q=this.n=null},u:function(a,b,c){var d={};d.scale=a;d.x=b;d.y=c;0<b?d.x=0:b<-(this.a.width*a-this.b)&&(d.x=-this.a.width*a+this.b);this.a.height*a<this.d?d.y=(this.d-this.a.height*a)/2:
0<c?d.y=0:c<-(this.a.height*a-this.d)&&(d.y=-this.a.height*a+this.d);return d},i:function(a,b,c){this.a.height*a<this.d&&(c=(this.d-this.a.height*a)/2);this.scale=a;this.x=b;this.y=c;this.o.fillStyle="#000";this.o.fillRect(0,0,this.b,this.d);this.o.drawImage(this.a,b,c,a*this.a.width,this.scale*this.a.height);this.x>this.b/10&&this.c&&(this.N=-this.c.width*this.h+this.x-this.b/10,this.o.drawImage(this.c,this.N,this.w,this.h*this.c.width,this.h*this.c.height));this.x<-(this.a.width*this.scale-this.b)-
this.b/10&&this.e&&(this.M=this.x+this.a.width*this.scale+this.b/10,this.o.drawImage(this.e,this.M,this.t,this.j*this.e.width,this.j*this.e.height))}};k.prototype.setImages=function(a,b){if(a.length){this.g=[];for(var c,d=0;d<a.length;d++)c="string"===typeof a[d]?{src:a[d]}:{src:a[d].src,small:a[d].small},this.g.push(c);this.index=-1;this.select(parseInt(b)||0)}};l.prototype={l:function(a,b,c,d,e,f){a&&b&&"function"==typeof c&&(this.A=a,this.p=b,this.K=c,this.P=d||3E3,this.m=f,this.T="function"===
typeof e?e:"easeInOut"==e?this.r.R:"easeIn"==e?this.r.Q:"linear"==e?this.r.W:this.r.S,clearTimeout(this.B),this.startTime=new Date,this.J())},J:function(){var a=this,b={},c=new Date-this.startTime;for(n in this.A)"number"==typeof this.A[n]&&"number"==typeof this.p[n]&&(b[n]=this.T(c,this.A[n],this.p[n]-this.A[n],this.P));c>=this.P?(this.K(this.p),"function"==typeof this.m&&(this.m(this.p),this.m=null)):(this.K(b),this.B=requestAnimationFrame(function(){a.J()}))},clear:function(){cancelAnimationFrame(this.B);
"function"==typeof this.m&&(this.m(this.p),this.m=null)},r:{Q:function(a,b,c,d){return c*(a/=d)*a+b},S:function(a,b,c,d){return-c*(a/=d)*(a-2)+b},R:function(a,b,c,d){return 1>(a/=d/2)?c/2*a*a+b:-c/2*(a*(a-2)-1)+b},W:function(a,b,c,d){return c*a/d+b}}};window.TouchPhotos=k})();

(function(){
	function I(id){
		return document.getElementById(id);
	};
	function Q(s, p){
		return (p || document).querySelector(s);
	};
	function QA(s, p){
		return (p || document).querySelectorAll(s);
	};
	function addClass(node, n){
		var cn = node.className.replace(new RegExp('\\b' + n + '\\b', 'g'), '');
		node.className = cn.replace(/ +/g, ' ').replace(/(^ +| +$)/g, '') + ' ' + n;
	};
	function removeClass(node, n){
		node.className = node.className.replace(new RegExp('\\b' + n + '\\b', 'g'), ' ').replace(/ +/g, ' ').replace(/(^ +| +$)/g, '');
	};
	function addEvent(obj,eventType,func){if(obj.attachEvent){obj.attachEvent("on" + eventType,func);}else{obj.addEventListener(eventType,func,false)}}
	function removeEvent(obj,eventType,func){
	if(obj.detachEvent){obj.detachEvent("on" + eventType,func)}else{obj.removeEventListener(eventType,func,false)}
	}
	function absPosition(obj, parentObj){ //位置
		var left = 0, top = 0, tempObj = obj;
		try{
			while(tempObj!= null && tempObj!=document.body && tempObj!=document.documentElement && tempObj != parentObj){
				left += tempObj.offsetLeft;
				top += tempObj.offsetTop;
				tempObj = tempObj.offsetParent;
			};
		}catch(e){};
		return {left:left,top:top};
	}
	
	var iOS = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
	var isWIFI = navigator.userAgent.indexOf('NetType/WIFI') !== -1;
	var isWX =  navigator.userAgent.indexOf('Messenger') !== -1;
	// var audioType = navigator.userAgent.match(/Firefox|Opera/i)?'ogg':'mp3';
	var isMobile = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);
	isMobile = isMobile ? isMobile[0] : false;

	if(isWX){
		if(location.host != 't.people.com.cn'){
			location.href = 'http://t.people.com.cn/h5/paiyuebing';
			return;
		};
	};
	//loader
	var loader = {
		page : 1,
		// bgAudio : 'http://i0.peopleurl.cn/microblog-v3/h5/wuyi/images/sound.' + audioType,
		imgDomain : 'http://i0.peopleurl.cn/',
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
			var API = '/getYbRecord.action?contentId=' + dataId;
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					var rTxt = xhr.responseText;
					if(window.localStorage && localStorage['ybId'] == dataId){
						showShare();
						localStorage['ybId'] = '';
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
			xhr.open('GET', API, true);
			xhr.send(null);

			this.touchPhotos = new TouchPhotos({
				canvas : document.getElementById('photosCanvas'),
				width : viewWidth,
				height : viewHeight,
				onclick : function(){
					_self.touchPhotos.canvas.className = 'canvasHide';
					setTimeout(function(){
						_self.touchPhotos.canvas.className = '';
					}, 300);
				}
			});
		},
		preview : function(data){
			var _self = this;
			//作品不存在
			if(data.result != 1 || !data.imageList || !data.imageList.length){
				Q('#userPhotos').innerHTML = '<div class="errorTxt">╮(╯_╰)╭<br>照片拍的不够好，继续努力！</div>';
				window.onscroll = null;
				this.toplist = true;
				Q('#otherBox').style.display = 'none';
				Q('.voteBtn').style.display = 'none';
				return;	
			};
			var imgData = [],
				shStatus = true; //审核状态
			var html = '<ul>';
			for (var i = 0; i < data.imageList.length; i++){
				if(data.imageList[i].status != 2){
					shStatus = false;
				}
				html += '<li><img src="' + this.imgDomain + data.imageList[i].smallPicName + '" data-src="' + this.imgDomain + data.imageList[i].picName + '" data-index="' + i + '" /></li>';
				imgData.push({
					src : this.imgDomain + data.imageList[i].picName,
					small : this.imgDomain + data.imageList[i].smallPicName
				});
			};
			html += '</ul>';

			
			if(!shStatus){
				//待审图片，并且不是自己的
				if(!(window.localStorage && localStorage['myYbIdList'] && localStorage['myYbIdList'].match(new RegExp('(^|_)' + this.dataId + '(_|$)')))){
					html = '<div class="errorTxt">图片还在路上，马上就到^_^</div>';
					window.onscroll = null;
					this.toplist = true;
					Q('#otherBox').style.display = 'none';
				};
			};
			
			Q('.userPhone').innerHTML = '<span>' + data.mobile + '</span> 的作品';
			Q('#userPhotos').innerHTML = html;
			Q('.voteBtn').innerHTML = '投票(已有' + data.dzCount + '票)';

			var imgs = QA('#userPhotos img'),
				_self = this;
				cFN = function(){
					_self.touchPhotos.setImages(imgData, this.getAttribute('data-index'));
					_self.touchPhotos.canvas.className = 'canvasShow';
				};

			for (var i = 0; i < imgs.length; i++) {
				imgs[i].onclick = cFN;
			};

			// if(typeof window['setShareTitle'] == 'function'){
			// 	window['setShareTitle'](data['style'], this.imgDomain + data.imageList[0].picName);
			// };

			Q('#shareBtn').onclick = function(){
				showShare();
			};
			Q('.voteBtn').onclick = function(){
				this.vote();
			}.bind(this);

			//最新
			var pos = absPosition(Q('#toplist'));
			window.onscroll = function(){
				if(window.pageYOffset + document.body.clientHeight >= pos.top){
					_self.loadTopList(); //加载最新列表
				}
			}
		},
		toplist : false,
		loadTopList : function(){//加载最新列表
			if(this.toplist){return};
			var _self = this;
			window.onscroll = null;
			this.toplist = true;
			var API = '/getYbNewImageList.action';
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					var data = eval('(' + xhr.responseText + ')');
					if(data && data.result == 1){
						var html = '<ul>';
						for (var i = 0; i < data.imageList.length; i++){
							html += '<li><a href="/h5/paiyuebing/' + data.imageList[i].contentId + '"><img src="' + _self.imgDomain + data.imageList[i].smallPicName + '" /></a></li>';
						}
						html += '</ul>';
						Q('#toplist').innerHTML = html;
						if(data.total){
							Q('#toplistTit').innerHTML = '最新上传：(共' + data.total + '组)';
						}
					}else{
						Q('#toplist').innerHTML = '载入失败';
					};
				};
			};
			xhr.ontimeout = function(e){
				Q('#toplist').innerHTML = '网络超时';
			}
			//xhr.open('POST', API, true);
			xhr.open('GET', API + '?contentId=' + this.dataId, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send();
		},
		vote : function(){
			var _self = this;
			//避免重复投票
			if(window.localStorage && localStorage['ybVoteList']){
				if(localStorage['ybVoteList'].match(new RegExp('(^|_)' + this.dataId + '(_|$)'))){
					alert('不能重复投票！ 还是分享到朋友圈帮我拉拉票吧！^_^');
					return;
				}
			};

			var API = '/addYbDianzan.action';
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					var data = eval('(' + xhr.responseText + ')');
					if(data && data.result > 0){
						if(window.localStorage){
							localStorage['ybVoteList'] = localStorage['ybVoteList'] + '_' + _self.dataId;
						}
						Q('.voteBtn').innerHTML = '投票(已有' + data.result + '票)';
						alert('感谢您为我投票, 顺手帮我分享到朋友圈拉拉票吧！^_^');
					};
				};
			};
			xhr.ontimeout = function(e){
				alert('网络超时，请稍后再试！');
			}
			xhr.open('POST', API, true);
			//xhr.open('GET', API + '?contentId=' + this.dataId, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send('contentId=' + this.dataId);

		}
	};
	function showShare(str){
		if(!isWX){
			document.getElementById('shareAlert').innerHTML = '<div class="othersShare">分享：<a href="javascript:void(0)" onclick="shareSina()"><img src="/microblog-v3/2014subject/1216_oneword/images/sina.png"></a> <a href="javascript:void(0)" onclick="sharePeople()"><img src="/microblog-v3/2014subject/1216_oneword/images/people.png"></a> <a href="javascript:void(0)" onclick="shareTencent()"><img src="/microblog-v3/2014subject/1216_oneword/images/tencent.png"></a></div>';
		};
		Q('#shareAlert').style.display = 'block';
		setTimeout(function(){
			Q('#shareAlert').style.display = 'none';
		}, 5000);
	};
	

	var viewWidth = document.body.clientWidth,
		viewHeight = document.body.clientHeight;
	
	viewWidth = viewWidth > 640 ? 640 : viewWidth;
	viewHeight = viewHeight > 1008 ? 1008 : viewHeight;

	var s = viewWidth / 640;

	// addEvent(document, 'touchmove', function(e){
	// 	e.preventDefault();
	// });

	//通过字体控制布局比例
	if(!isMobile){//非移动设备
		var f = document.documentElement.clientHeight / 504 * 16,
			viewWidth = Math.round(document.documentElement.clientHeight / 504 * 320);
		document.body.style['font-size'] = f + 'px';
		document.body.style['width'] = viewWidth + 'px';

	}else if(viewWidth < 640){
		document.body.style['font-size'] = 32 * s + 'px';
	};
	
	loader.init();
})();
