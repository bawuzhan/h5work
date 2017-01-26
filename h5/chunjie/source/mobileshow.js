/**
mobileshow
mengjia@people.cn
2015.9.18
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
	function addEvent(obj,eventType,func){if(obj && obj.attachEvent){obj.attachEvent("on" + eventType,func);}else{obj && obj.addEventListener(eventType,func,false)}}
	function removeEvent(obj,eventType,func){
	if(obj.detachEvent){obj && obj.detachEvent("on" + eventType,func)}else{obj && obj.removeEventListener(eventType,func,false)}
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
		mute : false,
		init: function(ele, preloadList){
			var _self = this;
			if(this.ele){
				this.uninit();
			};
			this.ele = Q(ele);

			var viewWidth, viewHeight;
			
			viewWidth = document.body.clientWidth;
			viewHeight = document.body.clientHeight;
			viewWidth = viewWidth > 640 ? 640 : viewWidth;
			viewHeight = viewHeight > 1008 ? 1008 : viewHeight;

			var s = viewWidth / 640;
			
			//通过字体控制布局比例
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
			}else if(preloadList === false){
				this.showLoading();
			}else{
				this.select(0);
			};
			var sX = -1, sY, eX, eY, f = 0;
			this.__startFn = function(e){
				var dot = e.touches?e.touches[0] : e;
				
				sX = dot.pageX;
				sY = dot.pageY;

				if(_self.soundSrc && !_self.mute && _self.auido_bg.isPaused()){
					_self.playSound();
				};
			};
			this.__moveFn = function(e){
				e.preventDefault();
				if(sX == -1){return false};
				var dot = e.touches?e.touches[0] : e;
				eX = dot.pageX - sX;
				eY = dot.pageY - sY;
				if(f == 0){
					if(eY > 0 && Math.abs(eY) > 10 && Math.abs(eY) > Math.abs(eX)){
						f = -1;
						_self.preMoveScen(eY);
					};
					if(eY < 0 && Math.abs(eY) > 10 && Math.abs(eY) > Math.abs(eX)){
						f = 1;
						_self.nextMoveScen(eY);
					};
				}else if(Math.abs(eY) > 10){
					_self.moveScen(eY, f);
				};
				return false;
			};
			this.__endFn = function(e){
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
				addEvent(Q('.sound'), 'click', function(){
					if(_self.mute){
						_self.playSound();
					}else{
						_self.stopSound();
					};
					return false;
				});
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
		showLoading : function(){
			this.loading = document.createElement('div');
			this.loading.className = 'loadingPage';
			this.loading.innerHTML = '<div class="loadingBar"><div class="block_1 loading"></div><div class="block_2 loading"></div><div class="block_3 loading"></div><div class="block_4 loading"></div><div class="block_5 loading"></div></div><div class="loadingTxt">载入中</div>';
			this.ele.appendChild(this.loading);
			
			this.loading.style.display = 'block';
		},
		hideLoading : function(){
			this.loading.style.display = 'none';
			this.select(0);
		},
		preload : function(){
			var _self = this, s = 0, img;
			this.showLoading();

			for (var i = 0; i < this.preloadList.length; i++) {
				img = new Image();
				img.onerror = img.onload = function(){
					s ++;
					if(s >= _self.preloadList.length){
						_self.hideLoading();
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
			if(f !== 0){
				this.nowScen._endFn = fn;
				this.nowScen.addEventListener(TRANSITION_END_NAME, fn, null);
			
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

			this.index = num;
			this.readyScen();

			this.nowScen.style.display = 'block';
			this.nowScen.style.zIndex = 10;
			if(f == 0){
				this.actionScen();
			};
		},
		next : function(){
			this.select(this.index + 1);
		},
		pre : function(){
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

			ele.style.display = '';
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

			ele.style.display = '';
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
		isPaused : function(){
			if(this.__objType == 'Audio'){
				return this.audioObj.paused;
			}else{
				try{
					return this.audioObj.playState == 2;
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