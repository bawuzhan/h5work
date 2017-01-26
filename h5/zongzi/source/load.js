/**
mengjia@people.cn
2015.6.16
*/
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
	//bind
	if (!Function.prototype.bind) {
		Function.prototype.bind = function(oThis) {
			if (typeof this !== "function") {
				// closest thing possible to the ECMAScript 5 internal IsCallable function 
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}
			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				fNOP = function() {},
				fBound = function() {
					return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
						aArgs.concat(Array.prototype.slice.call(arguments)));
				};
			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();
			return fBound;
		};
	}
	var iOS = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
	var isWIFI = navigator.userAgent.indexOf('NetType/WIFI') !== -1;
	var isWX = navigator.userAgent.indexOf('Messenger') !== -1;
	var audioType = navigator.userAgent.match(/Firefox|Opera/i)?'ogg':'mp3';
	var isMobile = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);
	isMobile = isMobile ? isMobile[0] : false;

	var CSS3Prefix = '';
	if(navigator.userAgent.indexOf('WebKit') !== -1){
		CSS3Prefix = 'webkit';
	}else if(navigator.userAgent.indexOf('Firefox') !== -1){
		CSS3Prefix = 'moz';
	}else if(navigator.userAgent.indexOf('MSIE') !== -1){
		CSS3Prefix = 'ms';
	};
	var CSS_HEAD_NAME = ({
		"moz" : "",
		"webkit" : "-webkit-",
		"ms" : ""
	})[CSS3Prefix] || "";
	var TRANSITION_END_NAME = ({
		"moz" : "transitionend",
		"webkit" : "webkitTransitionEnd",
		"ms" : "MSTransitionEnd"
	})[CSS3Prefix] || "transitionend";
	function getHumpCssName(name){
		name = (CSS_HEAD_NAME + name).replace(/-+/g, '-').replace(/(^-|-$)/g, '').split('-');
		for (var i = 1; i < name.length; i++) {
			name[i] = name[i].substr(0, 1).toLocaleUpperCase() + name[i].substr(1).toLowerCase();
		};
		return name.join('');
	};
	function getHump_css_name(name){
		return (CSS_HEAD_NAME + name).replace(/-+/g, '-');
	};
	var START_EVENT_NAME = 'mousedown',
		MOVE_EVENT_NAME = 'mousemove',
		END_EVENT_NAME = 'mouseup';
	if(document.ontouchstart !== undefined){
		START_EVENT_NAME = 'touchstart';
		MOVE_EVENT_NAME = 'touchmove';
		END_EVENT_NAME = 'touchend';
	};

	var basePath = "http://i0.peopleurl.cn/microblog-v3/h5/zongzi/images/";

	//通过字体控制布局比例
	var viewScale = 1;
	if(!isMobile || screen.width/screen.height > 0.66){//非移动设备
		viewScale = document.documentElement.clientHeight / 980,
			viewWidth = Math.round(document.documentElement.clientHeight / 490 * 320);
		document.body.style['font-size'] = viewScale * 32 + 'px';
		document.body.style['overflow'] = 'hidden';
		//document.body.style['width'] = viewWidth + 'px';
	}else if(document.body.clientWidth < 640){
		viewScale = document.body.clientWidth / 640;
		document.body.style['font-size'] = 32 * viewScale + 'px';
	};

	function getPosition(e) {
		var t = e.offsetTop;
		var l = e.offsetLeft;
		while (e = e.offsetParent) {
			t += e.offsetTop;
			l += e.offsetLeft;
		}
		return {
			left :l,
			top :t
		};
	}
	//drag
	var drag = {
		touches : {}, //拖动点
		eleTemp : [], //回收的拖动对象
		multipoint : false,
		bind : function(ele){
			addEvent(ele, START_EVENT_NAME, function(e){
				drag.start(ele, e);
				e.preventDefault();
			});
			if(!this.ele){
				addEvent(document.body, MOVE_EVENT_NAME, function(e){
					drag.move(e);
				});
				addEvent(document.body, END_EVENT_NAME, function(e){
					drag.end(e);
				});
			};
		},
		getTouchEle : function(){
			var ele
			if(this.eleTemp.length){
				ele = this.eleTemp.pop();
			}else{
				ele = document.createElement('div');
				ele.style.display = 'none';
				ele.style.zIndex = 20;
				document.body.appendChild(ele);
			};
			return ele;
		},
		start : function(target, e){
			var points,
				touch;
			if(e.type == 'touchstart'){
				if(e.touches.length >= 2 && !this.multipoint){return}
				points = e.touches;
			}else{
				points = [{
					pageX : e.pageX,
					pageY : e.pageY,
					identifier : 0
				}]
			};

			for (var i = 0; i < points.length; i++) {
				if(this.touches['t_' + points[i].identifier]){ //点已存在
					continue;
				};
				touch = {
					target : target,
					sX : points[i].pageX,
					sY : points[i].pageY,
					nX : -1,
					nY : -1,
					ele : this.getTouchEle()
				};
				this.touches['t_' + points[i].identifier] = touch;

				break;
			};

			
			var style = target.getAttribute('data-style').split(',');
			var rotate = parseInt(style[0]) || 0;
			var scale = parseFloat(style[1]) || 1;

			//var pos = getPosition(target);
			//debugger
			var pos = {
				left: touch.sX - scale * 170 * viewScale / 2 + (window.scrollX || window.pageXOffset),
				top: touch.sY - scale * 170 * viewScale / 2 + (window.scrollY || window.pageYOffset)
			};

			touch.pos = pos;

			touch.ele.style.display = 'none';

			touch.ele.className = touch.target.className;
			touch.ele.style.left = touch.pos.left + 'px';
			touch.ele.style.top = touch.pos.top + 'px';
			
			touch.ele.style[getHumpCssName('transform')] = 'rotate(' + rotate + 'deg) scale(' + scale + ')';
			touch.target.style.display = 'none';
			touch.ele.style.display = 'block';

			this.status = 'move';

		},
		move : function(e){
			var points;
			if(this.status != 'move'){
				return;
			}
			if(e.type == 'touchmove'){
				points = e.touches;
			}else{
				points = [{
					pageX : e.pageX,
					pageY : e.pageY,
					identifier : 0
				}]
			};
			var touch;
			for (var i = 0; i < points.length; i++) {
				touch = this.touches['t_' + points[i].identifier];
				if(!touch){ //点不存在
					continue;
				};
				touch.nX = points[i].pageX;
				touch.nY = points[i].pageY;

				touch.ele.style.left = touch.pos.left + (touch.nX - touch.sX) + 'px';
				touch.ele.style.top = touch.pos.top + (touch.nY - touch.sY) + 'px';
			};

			this.status = 'move';
			e.preventDefault();
		},
		end : function(e){
			if(this.status != 'move'){
				return;
			};
			var points;
			if(e.type == 'touchend'){
				points = e.touches;
			}else{
				points = []
			};
			for (var i = 0; i < points.length; i++) {
				touch = this.touches['t_' + points[i].identifier];
				if(touch){ //点存在
					touch.alive = true;
				};
			};
			var r = 0;
			var sw = document.documentElement.clientWidth;
			var sh = document.documentElement.clientHeight;
			var sum = 0;
			for(var name in this.touches){
				touch = this.touches[name];
				if(touch.alive){
					delete touch.alive;
					sum ++;
					continue;
				};
				touch.ele.style.display = 'none';
				if(touch.nY / sh > 0.8 && touch.nX / sw > 0.15 && touch.nX / sw < 0.75){
					r = 1;
				};
				if(typeof this.onend == 'function'){
					this.onend(r, touch.target);
				};
				this.eleTemp.push(touch.ele);
				delete this.touches[name];
			}

			if(sum == 0){
				this.status = 'end';
			};
			e.preventDefault();
		}
	};
	//游戏
	var game = {
		timeout : 30,
		score : 0,
		type : 0,
		scale : 1,
		runtime : 3000,
		mute : false,
		playAudio : basePath + 'play.' + audioType,
		startAudio : basePath + 'start.' + audioType,
		init : function(){
			setTimeout(function(){
				Q('.mainPage .title').style[getHumpCssName('transition')] = 'top 1s';
			}, 100);
			drag.bind(Q('.select .zongzi_t'));
			drag.bind(Q('.select .zongzi_x'));
			drag.onend = function(r, target){
				if(r){
					game.begin(target.getAttribute('data-value'));
				}else{
					target.style.display = 'block';
				}
			};
			drag.multipoint = false;
			this.scale = 1;
			this.runtime = 3000;

			addEvent(document.body, 'touchmove', function(e){
				e.preventDefault();
			});

			this.auido_bg = new Sound();
			this.auido_bg.setLoop(true);

			if(this.mute){
				this.stopSound();
			}else{
				this.setSound(this.startAudio);
				this.playSound();
			};
			if(Q('#sound')){
				addEvent(Q('#sound'), 'click', function(){
					if(this.mute){
						this.playSound();
					}else{
						this.stopSound();
					};
					return false;
				}.bind(this));
			};			

			Q('.btns').innerHTML = '<a href="javascript:restartGame()" class="btn_01"><span>再玩一次</span></a><a href="javascript:showShare()" class="btn_01 flashBtn" style="margin-left:1em;"><span>分享给朋友</span></a>' + (isWX?('<a href="' + (iOS?'http://mp.weixin.qq.com/s?__biz=MjM5NzI3NDg4MA==&mid=202118832&idx=1&sn=537a80cac54948c45ea94ec135232d93#rd':'weixin://profile/people_rmw') + '" class="btn_link">关注人民网，赢iPhone6大奖</a>'):'');
		},
		setSound : function(src){
			this.soundSrc = src;
			if(!this.mute){
				this.playSound();
			}else{
				this.stopSound();
			};
		},
		stopSound : function(){
			this.mute = true;
			addClass(Q('#sound'), 'sound_off');
			removeClass(Q('#sound'), 'sound_on');
			this.auido_bg.pause();
		},
		playSound : function(){
			this.auido_bg.setSrc(this.soundSrc);
			this.mute = false;
			removeClass(Q('#sound'), 'sound_off');
			addClass(Q('#sound'), 'sound_on');
			this.auido_bg.play();
		},
		restart : function(){
			this.setScore(0);
			drag.multipoint = false;
			this.scale = 1;
			this.runtime = 3000;
			drag.onend = function(r, target){
				if(r){
					game.begin(target.getAttribute('data-value'));
				}else{
					target.style.display = 'block';
				}
			};
			this.setSound(this.startAudio);
			document.body.className = '';

			// Q('.mainPage .title').style.top = '0.9375em';
			// Q('.prompt').style.display = 'block';
			// Q('.select').style.display = 'block';

			Q('.zz1 .zongzi_t').style.display = 'block';
			Q('.zz2 .zongzi_x').style.display = 'block';

			// Q('#baby').style.bottom = 0;

			// Q('.footer').style.bottom = '-1.75em';
			// Q('.btns').style.bottom = '-' + Q('.mainPage .title').offsetHeight + 'px';
			// Q('#endPic').style.display = 'none';
			// Q('#endTitle').style.display = 'none';

			// document.body.style.background = '#ec6519';
		},
		begin : function(type){
			var _self = this;
			document.body.className = 'ps_play';
			this.setSound(this.playAudio);

			drag.onend = function(r, target){
				if(r){
					if(target.className == 'zongzi_t' && _self.type == 0 || target.className == 'zongzi_x' && _self.type == 1){
						_self.setScoreBy(1);
						_self.setBaby(3);
					}else{
						_self.setScoreBy(-1);
						_self.setBaby(2);
					};
				}else{
					target.style.display = 'block';
				}
			};
			drag.multipoint = true;

			//Q('.mainPage .title').style.top = '-' + Q('.mainPage .title').offsetHeight + 'px';
			//Q('.topBar').style.top = 0;
			//Q('.prompt').style.display = 'none';
			//Q('.select').style.display = 'none';

			this.type = parseInt(type);

			Q('#zzType').className = this.type?'zongzi_x':'zongzi_t';
			Q('#endPic').className = this.type?'endPic_x':'endPic_t';
			Q('#endTitle').className = this.type?'endTitle_x':'endTitle_t';

			Q('#scroll1').style.display = 'block';
			Q('#scroll1').style[getHumpCssName('transform')] = 'translate(-' + (660 * viewScale) + 'px, 0)';
			Q('#scroll2').style[getHumpCssName('transform')] = 'translate(-' + (1320 * viewScale) + 'px, 0)';

			this.fill(Q('#scroll1'));
			this.fill(Q('#scroll2'));

			setTimeout(this.moveScene.bind(this), 10);

			this.setScore(1);
			this.setBaby(3);
			this.setTimeout(this.timeout);

			//document.body.style.background = '#ff8f43';
		},
		fill : function(ele){
			var i, div, rotate, scale,
				wrongClass = this.type == 0 ? 'zongzi_x' : 'zongzi_t',
				rightClass = this.type == 0 ? 'zongzi_t' : 'zongzi_x';
			if(ele.childNodes.length == 0){
				for (i = 0; i < 18; i++) {
					div = document.createElement('div');
					div.className = 'zongzi_t';
					ele.appendChild(div);
					drag.bind(div);
				};
			};
			for (var i = ele.childNodes.length - 1; i >= 0; i--) {
				if(ele.childNodes[i].nodeType == 1){
					this.scale -= 0.002;

					div = ele.childNodes[i];
					
					div.style.left = (Math.floor(i / 3) * 213 + (i % 3 % 2 == 1 ? 80 : 0)) * viewScale + 'px';
					div.style.top = (150 + i % 3 * 220 + Math.round(Math.random() * 50)) * viewScale + 'px';
					div.className = Math.random() < .3 ? wrongClass : rightClass;
					rotate = Math.round(Math.random() * 60 - 30);
					scale = (0.6 + Math.random() * 0.4) * this.scale;
					div.style[getHumpCssName('transform')] = 'rotate(' + rotate + 'deg) scale(' + scale + ')';
					div.style.display = 'block';
					div.setAttribute('data-style', rotate + ',' + scale);
				}
			};
		},
		moveScene : function(){
			var st = 300;
			var _self = this;

			var nowItem = Q('#scroll1')
				nextItem = Q('#scroll2');

			nowItem.style[getHumpCssName('transform')] = 'translate(-' + (660 * viewScale) + 'px, 0)';
			nextItem.style[getHumpCssName('transform')] = 'translate(-' + (1320 * viewScale) + 'px, 0)';

			nowItem.style[getHumpCssName('transition')] = getHump_css_name('transform') + ' ' + (_self.runtime * 1) + 'ms linear';
			nextItem.style[getHumpCssName('transition')] = getHump_css_name('transform') + ' ' + (_self.runtime * 2) + 'ms linear';

			setTimeout(function(){
				nowItem.style[getHumpCssName('transform')] = 'translate(' + (0 * viewScale) + 'px, 0)';
				nowItem.pos = 1;
				nextItem.pos = 1;
			}, 10);

			var preTime = new Date();
			var temp;
			var fn = function(){
				var _ele = this;
				if(this.pos == 1){

					this.pos = 0;
					this.style[getHumpCssName('transition')] = getHump_css_name('transform') + ' ' + (_self.runtime * 1) + 'ms linear';

					_ele.style[getHumpCssName('transform')] = 'translate(' + (660 * viewScale) + 'px, 0)';

					nextItem.style.display = 'block';
					setTimeout(function(){
						nextItem.style[getHumpCssName('transform')] = 'translate(' + (0 * viewScale) + 'px, 0)';
					}, 5);

					_self.runtime -= st;
					
				}else{
					this.style.display = 'block';
					this.style[getHumpCssName('transition')] = 'all 0s';
					_ele.style[getHumpCssName('transform')] = 'translate(-' + (1320 * viewScale) + 'px, 0)';

					setTimeout(function(){
						_ele.style[getHumpCssName('transition')] = getHump_css_name('transform') + ' ' + (_self.runtime * 2) + 'ms linear';
					}, 5);
					this.pos = 1;
					_self.fill(_ele);

					temp = nowItem;
					nowItem = nextItem;
					nextItem = temp;
				};
			};


			if(this.fn1){
				Q('#scroll1').removeEventListener(TRANSITION_END_NAME, this.fn1, null);
				Q('#scroll2').removeEventListener(TRANSITION_END_NAME, this.fn2, null);
			};

			this.fn1 = fn.bind(Q('#scroll1'));
			this.fn2 = fn.bind(Q('#scroll2'));
			Q('#scroll1').addEventListener(TRANSITION_END_NAME, this.fn1, null);
			Q('#scroll2').addEventListener(TRANSITION_END_NAME, this.fn2, null);
		},
		setScoreBy : function(n){
			this.setScore(this.score + n);
			var popo = document.createElement('div');
			if(n >= 0){
				popo.className = 'scorePopo';
				popo.innerHTML = '+' + n;
			}else{
				popo.className = 'scorePopo colorRed';
				popo.innerHTML = n;
			};
			Q('.mainPage').appendChild(popo);
			setTimeout(function(){
				popo.parentNode.removeChild(popo);
			}, 1000);
		},
		setScore : function(s){
			if(s < 0){
				s = 0;
			}
			Q('#score').innerHTML = s;
			this.score = s;
		},
		setBaby : function(s){
			clearTimeout(this._babyTimer);
			Q('#baby').className = s == 2?'baby_2':'baby_3';
			this._babyTimer = setTimeout(function(){
				Q('#baby').className = 'baby_1';
			}, 400);
		},
		setTimeout : function(s){
			var _self = this;
			this.timeout = s;
			Q('#timeBar span').style.width = '100%';
			Q('#timeBar i').style[getHumpCssName('transform')] = 'translate(0, 0)';
			clearInterval(this._timer);
			this._timer = setInterval(function(){
				s -= 0.1;
				
				if(s <= 0){
					_self.end();
					return;
				};
				
				Q('#timeBar span').style.width =  (s / _self.timeout) * 100 + '%';
				Q('#timeBar i').style[getHumpCssName('transform')] = 'translate(-' + ((292 - s / _self.timeout * 292) * viewScale) + 'px, 0)';
			}, 100);
		},
		end : function(){
			clearInterval(this._timer);
			document.body.className = 'ps_end';
			this.setSound(this.startAudio);

			Q('#scroll1').style[getHumpCssName('transition')] = 'none';
			Q('#scroll2').style[getHumpCssName('transition')] = 'none';
			Q('#scroll1').style.display = 'none';
			Q('#scroll2').style.display = 'none';

			// Q('#baby').style.bottom = '-' + Q('#baby').offsetHeight + 'px';
			// Q('.topBar').style.top = '-' + Q('.topBar').offsetHeight + 'px';

			// Q('.footer').style.bottom = 0;
			// Q('.btns').style.bottom = '3.71875em';
			// Q('#endPic').style.display = 'block';
			// Q('#endTitle').style.display = 'block';
			

			setTimeout(function(){
				Q('#endPic').style[getHumpCssName('transform')] = 'scale(1)';
			}, 1);

			var exceed; //超越

			exceed = Math.round(100 * Math.sin(this.score/80 * Math.PI/2));
			if(this.score >= 74 || exceed > 99){
				exceed = 99;
			}else if(this.score <= 0 || exceed <= 0){
				exceed = 0;
			};

			Q('#endTitle').innerHTML = '<span>' + this.score + '</span><i>' + (exceed>9?exceed:('0'+exceed)) + '%</i>';
			shareInfo('我吃了' + this.score + '个' + (this.type?'咸':'甜') + '粽，超越' + exceed + '%网友，粽子就应该是' + (this.type?'咸':'甜') + '的！', this.type?'share_x.png':'share_t.png');
			Q('#endText').innerHTML = this.type?'粽子就应该是咸的':'粽子就应该是甜的';
		}
	};
	//声音控制器
	function Sound(){
		if(navigator.userAgent.match(/MSIE [678]/)){ //IE 9以下使用MediaPlayer
			try{
				this.__objType = 'MediaPlayer';
				this.audioObj = document.createElement("object");
				this.audioObj.classid = "clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6";
				this.audioObj.settings.autoStart = false;
				this.audioObj.settings.volume = 100;
			}catch(e){}
		}else{
			this.__objType = 'Audio';
			this.audioObj = document.createElement("audio");
		};
		this.audioObj.style.display = 'none';
		this.audioObj.style.position = 'absolute';
		this.audioObj.style.left = '-100px';
		this.audioObj.style.top = '-100px';
		document.body.insertBefore(this.audioObj, document.body.firstChild);
	};
	Sound.prototype = {
		mute : false, //是否静音
		setMute : function(val){
			val = val === true;
			this.mute = val;
			if(this.__objType == 'Audio'){
				this.audioObj.muted = val;
			}else{
				try{
					this.audioObj.settings.mute = val;
				}catch(e){}
			}
		},
		setVolume : function(val){
			val = parseInt(val);
			if(val > 100){
				val = 100;
			}else if(val < 0){
				val = 0;
			}
			if(this.__objType == 'Audio'){
				this.audioObj.volume = val/100;
			}else{
				try{
					this.audioObj.settings.volume = val;
				}catch(e){}
			}
		},
		play : function(){
			if(this.__objType == 'Audio'){
				this.audioObj.play();
			}else{
				try{
					this.audioObj.controls.play();
				}catch(e){}
			}
		},
		setLoop : function(val){
			val = val == true;
			if(this.__objType == 'Audio'){
				this.audioObj.loop = val;
			}else{
				try{
					this.audioObj.settings.playCount = val?9999:1;
				}catch(e){}
			}
		},
		pause : function(){
			if(this.__objType == 'Audio'){
				this.audioObj.pause();
			}else{
				try{
					this.audioObj.controls.pause();
				}catch(e){}
			}
		},
		setSrc : function(val){
			if(this.__objType == 'Audio'){
				this.audioObj.src = val;
			}else{
				try{
					this.audioObj.URL = val;
				}catch(e){}
			}

		}
	};
	game.init();
	var shareData = {
		image: basePath + 'share_t.png',
		link: location.href,
		title: "粽子大战：你是咸派还是甜派？",
		content: ""
	};
	var shareImg = new Image();
	shareImg.src = shareData.image;
	shareImg.style.position = 'absolute';
	shareImg.style.top = '-1000px';
	shareImg.style.left = '-1000px';
	document.body.insertBefore(shareImg, document.body.firstChild);
	function getRanomTitle(){
		if(!isWX){return ''}
		var m = Math.abs(Math.round(new Date().getTime() / 600000) - 2387961); //10分钟
		m = m.toString(36);
		return '[' + m + ']';
	};
	function shareInfo(title, pic){
		shareImg.src = shareData.image = basePath + pic;
		document.title = shareData.title = title;
	};
	window.shareSina = function(){
		window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(shareData.link) + '&appkey=&title=' + encodeURIComponent(shareData.title) + '&pic=' + encodeURIComponent(shareData.image.replace('s_', '')) + '&ralateUid=&language=&sudaref=service.weibo.com');
	};
	window.shareTencent = function(){
		window.open('http://share.v.t.qq.com/index.php?c=share&a=index&url=' + encodeURIComponent(shareData.link) + '&title=' + encodeURIComponent(shareData.title) + '&pic=' + encodeURIComponent(shareData.image.replace('s_', '')));
	};
	window.sharePeople = function(){
		window.open('http://t.people.com.cn/toshareinfo.action?url=' + encodeURIComponent(shareData.link) + '&appkey=&title=' 
	+ encodeURIComponent(shareData.title) + '&pic=' + encodeURIComponent(shareData.image.replace('s_', '')) + '&site=');
	};
	window.showShare = function(){
		if(!isWX){
			document.getElementById('shareAlert').innerHTML = '<div class="othersShare">分享：<a href="javascript:void(0)" onclick="shareSina()"><img src="http://i0.peopleurl.cn/microblog-v3/2014subject/1216_oneword/images/sina.png"></a> <a href="javascript:void(0)" onclick="sharePeople()"><img src="http://i0.peopleurl.cn/microblog-v3/2014subject/1216_oneword/images/people.png"></a> <a href="javascript:void(0)" onclick="shareTencent()"><img src="http://i0.peopleurl.cn/microblog-v3/2014subject/1216_oneword/images/tencent.png"></a></div>';
		};
		Q('#shareAlert').style.display = 'block';
		setTimeout(function(){
			Q('#shareAlert').style.display = 'none';
		}, 10000);
	};
	window.restartGame = function(){
		game.restart();
	};
	
})();