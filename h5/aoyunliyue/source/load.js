/**
mobileshow
mengjia@people.cn
2015.5.26
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

	var CSS3Prefix = '';
	if(navigator.userAgent.indexOf('WebKit') !== -1){
		CSS3Prefix = 'webkit';
	}else if(navigator.userAgent.indexOf('Firefox') !== -1){
		CSS3Prefix = 'moz';
	}else if(navigator.userAgent.indexOf('MSIE') !== -1){
		CSS3Prefix = 'ms';
	};
	var ANIMATION_END_NAME = ({
		"moz" : "animationend",
		"webkit" : "webkitAnimationEnd",
		"ms" : "MSAnimationEnd"
	})[CSS3Prefix] || "animationend";
	var TRANSITION_END_NAME = ({
		"moz" : "transitionend",
		"webkit" : "webkitTransitionEnd",
		"ms" : "MSTransitionEnd"
	})[CSS3Prefix] || "transitionend";
	var CSS_HEAD_NAME = ({
		"moz" : "",
		"webkit" : "-webkit-",
		"ms" : ""
	})[CSS3Prefix] || "";
	function getHumpCssName(name){
		name = (CSS_HEAD_NAME + name).replace(/-+/g, '-').replace(/(^-|-$)/g, '').split('-');
		for (var i = 1; i < name.length; i++) {
			name[i] = name[i].substr(0, 1).toLocaleUpperCase() + name[i].substr(1).toLowerCase();
		};
		return name.join('');
	};
	var isWX =  navigator.userAgent.indexOf('Messenger') !== -1;
	if(isWX){
		if(location.host != 't.people.com.cn'){
			location.href = 'http://t.people.com.cn/h5/tongxin';
			return;
		};
	};
	var START_EVENT_NAME = 'mousedown',
		MOVE_EVENT_NAME = 'mousemove',
		END_EVENT_NAME = 'mouseup';
	if(document.ontouchstart !== undefined){
		START_EVENT_NAME = 'touchstart';
		MOVE_EVENT_NAME = 'touchmove';
		END_EVENT_NAME = 'touchend';
	}
	var mobileshow = {
		_timers : [],
		mute : true,
		touch : true,
		loop : true,
		init: function(ele, preloadList){
			var _self = this;
			if(this.ele){
				this.uninit();
			};
			this.ele = Q(ele);

			// var viewWidth, viewHeight;
			
			// viewWidth = document.body.clientWidth;
			// viewHeight = document.body.clientHeight;
			// viewWidth = viewWidth > 640 ? 640 : viewWidth;
			// viewHeight = viewHeight > 1008 ? 1008 : viewHeight;

			// var s = viewWidth / 640;
			
			// // //通过字体控制布局比例
			// if(viewWidth < 640){
			// 	this.ele.style['font-size'] = 32 * s + 'px';
			// };
			

			this.scenery = QA('.scenery', this.ele);
			for (var i = 0; i < this.scenery.length; i++) {
				this.scenery[i].style.display = 'none';
			};
			
			this.length = this.scenery.length;
			this.index = -1;
			
			this.cssKey = '';
			if(preloadList && preloadList.length){
				this.preloadList = preloadList;
				this.preload();
			}else{
				this.select(0);
			};
			var sX = -1, sY, eX, eY, f = 0;
			this.__startFn = function(e){
				if(_self.touch === false){return}

				var dot = e.touches?e.touches[0] : e;
				
				sX = dot.pageX;
				sY = dot.pageY;
			};
			this.__moveFn = function(e){
				if(_self.touch === false){return}
				if(sX == -1){return}
				var dot = e.touches?e.touches[0] : e;
				eX = dot.pageX - sX;
				eY = dot.pageY - sY;
				if(f == 0){
					if((_self.loop || _self.index != 0) && eY > 0 && Math.abs(eY) > 10 && Math.abs(eY) > Math.abs(eX)){
						f = -1;
						_self.preMoveScen(eY);
					};
					if((_self.loop || _self.index != _self.length - 1) && eY < 0 && Math.abs(eY) > 10 && Math.abs(eY) > Math.abs(eX)){
						f = 1;
						_self.nextMoveScen(eY);
					};
				}else if(Math.abs(eY) > 10){
					_self.moveScen(eY, f);
				};
				return false;
			};
			this.__endFn = function(e){
				if(_self.touch === false){return}
				sX = -1;
				if(f != 0){
					_self.endMoveScen(f);
				}
				f = 0;
			};
			addEvent(this.ele, START_EVENT_NAME, this.__startFn);
			addEvent(this.ele, MOVE_EVENT_NAME, this.__moveFn);
			addEvent(this.ele, END_EVENT_NAME, this.__endFn);
			if(!this.auido_bg){
				this.auido_bg = new Sound();
				this.auido_bg.setLoop(true);
				if(Q('.sound')){addEvent(Q('.sound'), 'click', function(){
					if(_self.mute){
						_self.playSound();
					}else{
						_self.stopSound();
					};
					return false;
				})};
			};
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
			addClass(Q('.sound'), 's_off');
			removeClass(Q('.sound'), 's_on');
			this.auido_bg.pause();
		},
		playSound : function(){
			this.auido_bg.setSrc(this.soundSrc);
			this.mute = false;
			removeClass(Q('.sound'), 's_off');
			addClass(Q('.sound'), 's_on');
			this.auido_bg.play();
		},
		preload : function(){
			var _self = this, s = 0, img;
			this.loading = document.createElement('div');
			this.loading.className = 'loadingPage';
			this.loading.innerHTML = '<div class="loadingBar"><div class="block_1 loading"></div><div class="block_2 loading"></div><div class="block_3 loading"></div><div class="block_4 loading"></div><div class="block_5 loading"></div></div><div class="loadingTxt">载入中</div>';
			this.ele.appendChild(this.loading);
			
			this.loading.style.display = 'block';

			for (var i = 0; i < this.preloadList.length; i++) {
				img = new Image();
				img.onerror = img.onload = function(){
					s ++;
					if(s >= _self.preloadList.length){
						_self.loading.style.display = 'none';
						_self.select(0);
					};
				};
				img.src = this.preloadList[i];
			};
		},
		uninit : function(){
			if(this.ele){
				removeEvent(this.ele, START_EVENT_NAME, this.__startFn);
				removeEvent(this.ele, MOVE_EVENT_NAME, this.__moveFn);
				removeEvent(this.ele, END_EVENT_NAME, this.__endFn);
				this.ele = null;
				this.auido_bg.pause();
			};
		},
		select : function(num, moving){
			var _self = this;
			if(num == this.index){
				return;
			};
			var f = 0;
			if(num > this.index){
				f = 1;	
			}else if(num < this.index){
				f = -1;
			};
			if(this.index == -1){
				f = 0;
			};
			if(num >= this.length){
				num = 0;
			}else if(num < 0){
				num = this.length - 1;
			};
			//最后一页隐藏箭头
			if(num + 1 == this.length){
				Q('.moveArr').style.display = 'none';
			}else{
				Q('.moveArr').style.display = 'block';
			};

			if(this.preScen){
				this.preScen.style.zIndex = 1;
			};
			if(this.nowScen){
				if(typeof this.nowScen._endFn == 'function'){
					this.nowScen._endFn();
				};
				this.nowScen.style.zIndex = 2;
				this.preScen = this.nowScen;
			};

			this.nowScen = this.scenery[num];
			this.nowScen.style.display = 'block';
			this.nowScen.style.zIndex = 10;
			
			this.preloadScen(this.nowScen);
			
			clearTimeout(this._autoNextTimer);

			var fn = function(){
				clearTimeout(_self._pageTranEndTimeout);
				this.removeEventListener(TRANSITION_END_NAME, fn, null);
				this.style[getHumpCssName('transition')] = 'none';
				this._endFn = null;
				_self.clearPreScen();
				_self.actionScen();
			};
			this.nowScen._endFn = fn;
			//if(moving){
				this.nowScen.addEventListener(TRANSITION_END_NAME, fn, null);
			//}
			this.index = num;
			if(f !== 0){
				this.nowScen.style[getHumpCssName('transition')] = 'none';
				this.nowScen.style[getHumpCssName('transform')] = "translateY(" + (f*document.body.clientHeight) + "px)";
				if(this.preScen){
					this.preScen.style[getHumpCssName('transition')] = 'none';
					//this.preScen.style[getHumpCssName('transform')] = "translateY(0px)";
				};
				if(!moving){
					_self.endMoveScen(f);
				};
			}else{
				this.autoNext();
			};
			
			this.readyScen();
			if(f == 0){
				this.actionScen();
			};
		},
		next : function(){
			if(!this.loop && this.index == this.length - 1){
				return;
			};
			this.select(this.index + 1);
		},
		pre : function(){
			if(!this.loop && this.index ==0){
				return;
			};
			this.select(this.index - 1);
		},
		preMoveScen : function(eY){
			this.select(this.index - 1, true);
			this.moveScen(eY, -1);
		},
		nextMoveScen : function(eY){
			this.select(this.index + 1, true);
			this.moveScen(eY, 1);
		},
		moveScen : function(ey, f){
			var y = (f*document.body.clientHeight) + ey,
				z = y * f / document.body.clientHeight * 0.1 + 0.9;
			this.nowScen.style[getHumpCssName('transform-origin')] = '50% 50%';
			this.nowScen.style[getHumpCssName('transform')] = "translateY(" + y + "px)";
			if(this.preScen){
				this.preScen.style[getHumpCssName('transform-origin')] = '50% ' + (f==1?'0':'100%');
				this.preScen.style[getHumpCssName('transform')] = "scale(" + z + ")";
			};
		},
		endMoveScen : function(f){
			var _self = this;
			
			setTimeout(function(){
				_self.nowScen.style[getHumpCssName('transform-origin')] = '50% 50%';
				_self.nowScen.style[getHumpCssName('transition')] = CSS_HEAD_NAME + 'transform' + ' 0.4s ease-out';
				_self.nowScen.style[getHumpCssName('transform')] = "translateY(0px)";
				if(_self.preScen){
					_self.preScen.style[getHumpCssName('transition')] = CSS_HEAD_NAME + 'transform' + ' 0.4s ease-out';
					_self.preScen.style[getHumpCssName('transform-origin')] = '50% ' + (f==1?'0':'100%');
					_self.preScen.style[getHumpCssName('transform')] = "scale(0.9)";
				};
			}, 10);
			this.autoNext();

			//避免end事件不触发
			clearTimeout(this._pageTranEndTimeout);
			this._pageTranEndTimeout = setTimeout(function(){
				if(_self.nowScen._endFn){
					_self.nowScen._endFn();
				}
			}, 500);

			//预载上一页和下一页中的图片
			var nextScen = this.index + 1 >= this.length - 1 ? this.scenery[0] : this.scenery[this.index + 1];
			var preScen = this.index - 1 < 0 ? this.scenery[this.length - 1] : this.scenery[this.index - 1];
			this.preloadScen(nextScen);
			//this.preloadScen(preScen);

			if(typeof this.onchange === 'function'){
				this.onchange();
			};
		},
		preloadScen : function(scen){
			if(scen && !scen.getAttribute('data-isLoad')){
				var imgs = QA('img[data-src]', scen);
				for (var i = 0; i < imgs.length; i++) {
					imgs[i].src = imgs[i].getAttribute('data-src');
					imgs[i].removeAttribute('data-src');
				};
				scen.setAttribute('data-isLoad', 1);
			};
		},
		autoNext : function(){
			var _self = this,
				n = 0;
			clearTimeout(this._autoNextTimer);
			if(n = this.nowScen.getAttribute('data-autoNext')){
				n = n.indexOf('ms') !== -1 ? n == parseFloat(n) : parseFloat(n) * 1000;
				if(n < 3000){
					n = 3000;
				};
				this._autoNextTimer = setTimeout(function(){
					_self.next();
				}, n);
			}
		},
		clearPreScen : function(){
			//停止上一场景中的元素动画
			if(!this.preScen){
				return;
			};
			this.preScen.style.display = 'none';
			if(!this.preScen.childs){
				this.preScen.childs = QA('*[data-animationIn],*[data-animation],*[data-animationOut]', this.preScen);
			};
			for (var i = 0; i < this.preScen.childs.length; i++) {
				if(typeof this.preScen.childs[i]._endFn == 'function'){
					this.preScen.childs[i]._endFn();
				};
			};
		},
		readyScen : function(){
			//准备场景
			if(!this.nowScen.childs){
				this.nowScen.childs = QA('*[data-animationIn],*[data-animation],*[data-animationOut]', this.nowScen);
			};
			//隐藏 in 动画的元素
			var aIn, a, aOut, item;
			for (var i = 0; i < this.nowScen.childs.length; i++) {
				item = this.nowScen.childs[i];
				aIn = item.getAttribute('data-animationIn');
				a = item.getAttribute('data-animation');
				aOut = item.getAttribute('data-animationOut');
				if(aIn && (aIn = aIn.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)))?/i)) && aIn.length >= 3){
					item.style.display = 'none';
				}else if(a && (a = a.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)))?/i)) && a.length >= 3){
					//暂停在开始处
					item.setAttribute('data-endClassName', item.getAttribute('data-endClassName') || item.className);
					item.className = item.getAttribute('data-endClassName') + ' ' + a[1];
					item.style[getHumpCssName('animation-duration')] = a[2];
					item.style[getHumpCssName('animation-fill-mode')] = "backwards";
					item.style[getHumpCssName('animation-play-state')] = 'paused';
				};
			};
		},
		actionScen : function(){
			//执行场景中的元素动画
			var _self = this;
			//清除上次的延时
			var t;
			if(!this.nowScen.childs){
				this.nowScen.childs = QA('*[data-animationIn],*[data-animation],*[data-animationOut]', this.nowScen);
			};
			while(t = this._timers.pop()){
				clearTimeout(t);
			};
			var aIn, a, aOut, item;
			for (var i = 0; i < this.nowScen.childs.length; i++) {
				item = this.nowScen.childs[i];
				aIn = item.getAttribute('data-animationIn');
				a = item.getAttribute('data-animation');
				aOut = item.getAttribute('data-animationOut');

				if(aIn && (aIn = aIn.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?/i)) && aIn.length >= 3){
					this._actionIn(item);
				}else if(a && (a = a.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?(?:\s(\d+|infinite))?/i)) && a.length >= 3){
					//暂停在开始处
					this._action(item);
				}
			};
		},
		_actionIn : function(ele){
			//执行单个元素的 in 动画
			var _self = this;
			var a = ele.getAttribute('data-animationIn').match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?/i);

			var fn = function(){
				this.removeEventListener(ANIMATION_END_NAME, arguments.call, null);
				if(this.getAttribute('data-endClassName')){
					this.className = this.getAttribute('data-endClassName');
				};
				this.removeAttribute('data-endClassName');
				this._endFn = null;
				delete this._endFn;
				_self._action(this);
			}

			ele.addEventListener(ANIMATION_END_NAME, fn, null);
			ele._endFn = fn;

			ele.style.display = 'block';
			ele.setAttribute('data-endClassName', ele.getAttribute('data-endClassName') || ele.className);
			ele.className = ele.getAttribute('data-endClassName') + ' ' + a[1];
			ele.style[getHumpCssName('animation-duration')] = a[2];
			ele.style[getHumpCssName('animation-delay')] = a[3] || 0;
			ele.style[getHumpCssName('animation-fill-mode')] = "both";
			ele.style[getHumpCssName('animation-iteration-count')] = 1;
			ele.style[getHumpCssName('animation-play-state')] = 'running';
		},
		_ele_animation_end_event_fn : function(){
			if(this.getAttribute('data-endClassName')){
				this.className = this.getAttribute('data-endClassName');
			};
			this.removeAttribute('data-endClassName');
			this._endFn = null;
			delete this._endFn;
		},
		_action : function(ele){
			//执行单个元素的 默认 动画
			var _self = this;
			var a = ele.getAttribute('data-animation');
			if(!(a && (a = a.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?(?:\s(\d+|infinite))?/i)) && a.length >= 3)){
				return;
			}

			ele._endFn = this._ele_animation_end_event_fn;

			ele.style.display = 'block';
			ele.setAttribute('data-endClassName', ele.getAttribute('data-endClassName') || ele.className);
			ele.className = ele.getAttribute('data-endClassName') + ' ' + a[1];
			ele.style[getHumpCssName('animation-duration')] = a[2];
			ele.style[getHumpCssName('animation-delay')] = a[3] || 0;
			ele.style[getHumpCssName('animation-fill-mode')] = "both";
			ele.style[getHumpCssName('animation-iteration-count')] = parseFloat(a[4]) ? a[4] : 'infinite';
			ele.style[getHumpCssName('animation-play-state')] = 'running';
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

	window['mobileshow'] = mobileshow;
	
})();
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
	var isWX =  navigator.userAgent.indexOf('Messenger') !== -1;
	var audioType = navigator.userAgent.match(/Firefox|Opera/i)?'ogg':'mp3';
	var isMobile = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);
	isMobile = isMobile ? isMobile[0] : false;

	var basePath = 'http://i0.peopleurl.cn/microblog-v3/h5/tongxin/images/';
	var preload = [basePath + 'p_m_04.png', basePath + 'p_m_05.png'];
	var question = [
		{
			q: 'TFboys的“成长的烦恼算什么”是谁唱的？',
			a: ['王俊凯','王源','易烊千玺','合唱'],
			p: 't_01.jpg', //图片
			d: 3, //正确答案
			l: 2 //难度
		},
		{
			q: '图中的人物是谁？',
			a: ['舒克','贝塔','莫克','杰瑞'],
			p: 't_02.jpg',
			d: 0,
			l: 2
		},
		{
			q: '《灌篮高手》中“三井寿”的队服是几号？',
			a: ['10','14','11','7'],
			p: 't_03.jpg',
			d: 1,
			l: 4
		},
		{
			q: '图中的休闲游戏名称哪项是错的？',
			a: ['抽陀螺','打老牛','挤摩摩','悬嘎嘎'],
			p: 't_04.jpg',
			d: 2,
			l: 5
		},
		{
			q: '《让我们荡起双桨》是哪里游玩？',
			a: ['颐和园','奥体公园','玉渊潭公园','北海公园'],
			p: 't_05.jpg',
			d: 3,
			l: 2
		},
		{
			q: '机器猫诞生时是什么颜色？',
			a: ['蓝','黄','红','紫'],
			p: 't_06.jpg',
			d: 1,
			l: 5
		},
		{
			q: '喇叭裤开始流行于哪个年代？ ',
			a: ['60','70','80','90'],
			p: 't_07.jpg',
			d: 1,
			l: 3
		},
		{
			q: '北冰洋有几种口味？',
			a: ['2种','3种','4种','5种'],
			p: 't_08.jpg',
			d: 2,
			l: 3
		},
		{
			q: '《白雪公主》是出自什么童话？',
			a: ['格林童话','安徒生童话','伊索寓言','王尔德童话'],
			p: 't_09.jpg',
			d: 0,
			l: 4
		},
		{
			q: '灰太狼每次被打败后都会说的一句话是什么？',
			a: ['我是不会放过你的','我一定会回来的'],
			p: 't_10.jpg',
			d: 1,
			l: 2
		},
		{
			q: '是谁大闹东海抓住了龙王三太子敖丙？',
			a: ['孙悟空','哪吒','猪八戒','观世音'],
			p: 't_11.jpg',
			d: 1,
			l: 1
		},
		{
			q: '一直与黑猫警长作对的老鼠头目叫什么？',
			a: ['舒克','米老鼠','一只耳','蓝皮'],
			p: 't_12.jpg',
			d: 2,
			l: 1
		},
		{
			q: '这是哪个游戏的画面？',
			a: ['飞行棋','叠叠高','大富翁','跳棋'],
			p: 't_13.jpg',
			d: 2,
			l: 1
		},
		{
			q: '哪种糖放在嘴里会噼里啪啦响？',
			a: ['跳跳糖','魔鬼糖','比巴卜','QQ'],
			p: 't_14.jpg',
			d: 0,
			l: 1
		},
		{
			q: '图中是哪个游戏？',
			a: ['天天酷跑','天天连萌','天天炫斗','天天爱消除'],
			p: 't_15.jpg',
			d: 1,
			l: 2
		},
		{
			q: '这是什么东西？',
			a: ['橡皮擦','弹珠','西瓜泡泡糖','彩虹糖'],
			p: 't_16.jpg',
			d: 2,
			l: 2
		},
		{
			q: '葫芦兄弟中的男主角妖精是什么动物？',
			a: ['蛇精','蝎子精','蛤蟆精','穿山甲'],
			p: 't_17.jpg',
			d: 1,
			l: 3
		},
		{
			q: '图中的男子在干什么？',
			a: ['打造宝剑','炼铁','炸爆米花','放鞭炮'],
			p: 't_18.jpg',
			d: 2,
			l: 1
		},
		{
			q: '这部动画片的主人公叫什么？',
			a: ['花园宝宝','海绵宝宝','天线宝宝','泡泡宝宝'],
			p: 't_19.jpg',
			d: 2,
			l: 1
		},
		{
			q: '猪猪侠最常变身成什么动物？',
			a: ['石甲熊','铁拳虎','冰封鹿','飞天猪'],
			p: 't_20.jpg',
			d: 1,
			l: 3
		},
		{
			q: '图中的游戏叫什么名字？',
			a: ['丢石子','打弹珠','扔沙包','跳房子'],
			p: 't_21.jpg',
			d: 3,
			l: 1
		}

	];
	var CLICK_EVENT = isMobile ? 'touchstart' : 'click';
	var game = {
		score : 0,
		index : null,
		init : function(){
			this.score = 0;
			this.index = null;
			var html = '<div class="scenery page_01">'+
				'<div class="moveArr"></div>'+
				'<div class="title" data-animationIn="fadeIn 1s 1s"></div>'+
				'<div class="heart" data-animationIn="bounceIn 1s 2s" data-animation="pulse 0.5s 0"></div>'+
				'<div class="cloud" data-animationIn="fadeInDown 1s 0"></div>'+
				'<div class="baby"></div>'+
				'<div class="btn"></div>'+
				'<div class="balloon" data-animation="swing 20s 0"></div>'+
				'<div class="bg"></div>'+
				'<div class="footer" data-animationIn="fadeInUp 1s 1s" data-animation="shine 2s 0 2"><div class="logo"></div></div>'+
			'</div>';
			for (var i = 0; i < question.length; i++) {
				question[i]._r = Math.random();
			};
			question.sort(function(a, b){
				return a._r - b._r;
			});
			question.length = 10;
			question.sort(function(a, b){ //按级别排序
				return a.l - b.l;
			});
			for (var i = 0; i < 10; i++) {
				html += '<div class="scenery page_02">'+
				'<div class="pic"><img data-src="' + basePath + question[i].p + '" alt=""></div>'+
				'<div class="bird"><span>'+(i+1)+'</span></div>'+
				'<div class="cloud cloud1" data-animation="shake 50s 0.5s"></div>'+
				'<div class="cloud cloud2" data-animation="shake 60s 0"></div>'+
				'<div class="cloud cloud3" data-animation="shake 40s 2s"></div>'+
				'<div class="title"><span>' + question[i].q + '</span></div>'+
				'<ol>';
					for (var j = 0; j < question[i].a.length; j++) {
						html += '<li style="'+( question[i].a.length>2 && j%2==1?'float:right':'clear:left' )+';" on'+ CLICK_EVENT +'="_issue(this,' + i + ',' + j + ')">' + question[i].a[j] + '</li>';
					};
				html += '</ol>'+
			'</div>';
			};
			html += '<div class="scenery page_end">' +
				'<div class="pic"></div>' +
				'<div class="txt"></div>' +
				'<div class="bg"></div>' +
				'<div class="score" data-animationIn="bounceIn 1s 0"></div>' +
			'<div class="btns" data-animationIn="fadeInUp 1.1s 0.5s"><a href="javascript:showShare()" class="btn_01 flashBtn"><span>分享给朋友</span></a>' + (isWX?('<a href="' + (iOS?'http://mp.weixin.qq.com/s?__biz=MjM5NzI3NDg4MA==&mid=202118832&idx=1&sn=537a80cac54948c45ea94ec135232d93#rd':'weixin://profile/people_rmw') + '" class="btn_01" style="margin-left:1em;"><span>关注赢大奖</span></a>'):'') + '</div>' +
			'</div>';
			
			Q('.slideshow').innerHTML = html;
			addEvent(Q('.slideshow .btn'), CLICK_EVENT, function(e){
				mobileshow.next();
			});
			mobileshow.init('.slideshow', preload);
			mobileshow.loop = false;
			mobileshow.onchange = function(){
				if(this.index > 0){
					this.touch = false;
				}
			}
		}
	};
	function init(){
		game.init();
		
		addEvent(document, 'touchmove', function(e){
			e.preventDefault();
		});
		
		//通过字体控制布局比例
		if(!isMobile || screen.width/screen.height > 0.66){//非移动设备
			var f = document.documentElement.clientHeight / 490 * 16,
				viewWidth = Math.round(document.documentElement.clientHeight / 490 * 320);
			document.body.style['font-size'] = f + 'px';
			document.body.style['overflow'] = 'hidden';
			document.body.style['width'] = viewWidth + 'px';
		}else if(document.body.clientWidth < 640){
			document.body.style['font-size'] = 32 * (document.body.clientWidth / 640) + 'px';
		};
	};
	var shareData = {
		image: basePath + 'l_1_s.jpg',
		link: location.href,
		title: "这么多年，原来她才是我的女神......",
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
	window._issue = function(li, i, j){
		var ol = li.parentNode;
		
		i = parseInt(i);
		j = parseInt(j);

		if(this.index == i){
			return;
		};
		this.index = i;
		if(question[i].d == parseInt(j)){
			li.className = 'right';
			game.score += 10;
		}else{
			QA('li', ol)[question[i].d].className = 'right';
			li.className = 'wrong';
		};
		if(i >= 9){
			Q('.slideshow .score').innerHTML = '<span'+ (game.score == 100?' style="font-size:1.7em"':'') +'>' + game.score + '</span>';
			if(game.score <= 40){
				Q('.slideshow .page_end').className = 'scenery page_end page_end_l4';
				shareInfo('我的童心指数是' + game.score + '，我的成熟无人能及！你也来试试？','l_4_s.jpg');
			}else if(game.score <= 60){
				Q('.slideshow .page_end').className = 'scenery page_end page_end_l3';
				shareInfo('我的童心指数是' + game.score + '，内心是个可爱的孩子哦！你也来试试？','l_3_s.jpg');
			}else if(game.score <= 80){
				Q('.slideshow .page_end').className = 'scenery page_end page_end_l2';
				shareInfo('我的童心指数是' + game.score + '，毫不掩饰的孩子气！你也来试试？','l_2_s.jpg');
			}else{
				Q('.slideshow .page_end').className = 'scenery page_end page_end_l1';
				shareInfo('我的童心指数是' + game.score + '，传说中的骨灰级孩子王！你也来试试？','l_1_s.jpg');
			};
		};
		setTimeout(function(){
			mobileshow.next();
		}, 1000);
	};
	init();
})();