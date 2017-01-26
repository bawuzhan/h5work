/**
mobileshow
mengjia@people.cn
2015.4.27
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
				if(_self.soundSrc && !_self.mute && _self.auido_bg.isPaused()){
					_self.playSound();
				};
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

			if(this.soundSrc && !this.mute && this.auido_bg.isPaused()){
				this.playSound();
			};
			
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
			if(Q('.moveArr')){
				if(num + 1 == this.length){
					Q('.moveArr').style.display = 'none';
				}else{
					Q('.moveArr').style.display = 'block';
				};
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

	//window['mobileshow'] = mobileshow;
	

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
	//window['stackBlurCanvasRGB'] = stackBlurCanvasRGB
	
	var iOS = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
	var isWIFI = navigator.userAgent.indexOf('NetType/WIFI') !== -1;
	var isWX =  navigator.userAgent.indexOf('Messenger') !== -1;
	var isMobile = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);
	isMobile = isMobile ? isMobile[0] : false;

	if(isWX){
		if(location.host.indexOf('.people.') === -1){
			location.href = 'http://mblog.people.com.cn/h5/muqin2016';
			return;
		};
	};
	//loader
	var loader = {
		page : 1,
		bgAudio : 'images/sound.mp3',
		elementsPath : 'images/',
		elements : [ //需要加载的元素
			['bg_01.jpg', 't_02.png', 'title_01.png', 'e_01.png', 'e_02.png', 'e_03.png']
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
			var dataurl = '/nmsgimage/wx/' + dataId.substr(0, 10) + '/' + dataId + '.txt';
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					//上传完成
					var rTxt = xhr.responseText;
					if(window.localStorage && sessionStorage['tempId'] == dataId){
						showShare();
						sessionStorage['tempId'] = '';
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
			this.dataId = dataId;
		},
		preview : function(data){
			if(data['scrnery'].length == 0){
				alert('数据不正确');
				return;
			};
			this.style = data['style'];
			this.items = data['scrnery'];
			this.firstItem = data['firstScrn'] || {};
			
			shareData.image = this.items[0].src;
			var html = '<div class="globalPackage"><div class="sound s_off"></div><div class="moveArr"></div></div><div class="scenery page_01"><div class="bg"></div><div class="title" data-animationIn="fadeInDown 1s 0.5s"></div><div class="t_02" data-animationIn="fadeInRight 1s 0"></div><div class="footer" data-animationIn="fadeInUp 1s 1.5s" data-animation="shine 1s 0 1"><div class="logo"></div></div></div>';
			var animations = ['fadeInLeft 1s 0', 'fadeInRight 1s 0', 'fadeInDown 1s 0', 'fadeInUp 1s 0'];
			var txtInAnimations = ['fadeInRight 3s 0', 'fadeInLeft 3s 0', 'fadeInRight 3s 0', 'fadeInLeft 3s 0'];
			
			var txts, ti;
			for (var i = 0; i < this.items.length; i++) {
				html += '<div class="scenery p_0' + (i+1) + '" data-autoNext="1000"><div class="userImgBox" data-animationIn="' + (animations[i % animations.length]) + '"><canvas id="bgCanvas_' + i + '" class="userBgImg"></canvas>' + '<img '+ (i==0?'':'data-') +'src="' + this.items[i]['src'] + '" class="userImg" onload="showBlurBg(this)" style="top:' + (Math.round((viewHeight - (viewWidth / this.items[i]['width'] * this.items[i]['height'])) * 0.4)) + 'px"></div>';
				if(this.items[i]['txt']){
					html += '<div class="userTxt" data-animationIn="' + (txtInAnimations[i % txtInAnimations.length]) + '">' + decodeURI(this.items[i]['txt']).replace(/</g, '&lt;').replace(/\n+/g, '<br>') + '</div>';
				};
				html += '</div>';
			};
			html += '<div class="scenery page_end_0' + this.style + '">'+
		'<div class="bg"></div><div class="photo" data-animationIn="rollIn 1s 0"></div>'+
			'<div class="btns" data-animationIn="fadeInUp 1.1s 0.5s"><a href="javascript:void(0)" id="btn_vote" class="btn_01">我要送花<span class="flower"></span></a><a href="http://t.people.com.cn/h5/muqin2016" id="btn_showAgain" class="btn_01" style="margin-left:1rem;">我也写一封</a></div><div class="voteCount" data-animationIn="fadeInUp 1s 1.5s">我的女神妈妈收到<span id="voteNum">--</span>朵鲜花</div></div>';
			Q('.slideshow').innerHTML = html;
			if(typeof window['setShareTitle'] == 'function'){
				window['setShareTitle'](data['style'], this.items[0]['src']);
			};
			
			var preload = this.elements[this.style - 1];
			for (var i = 0; i < preload.length; i++) {
				preload[i] = this.elementsPath + preload[i];
			};

			if(this.firstItem.src){
				preload = false;
				window.mobileshow = mobileshow;
			}else{
				preload = [];
			}
			mobileshow.init('.slideshow', preload);
			mobileshow.setSound(this.bgAudio);

			Q('#btn_vote').onclick = function(){
				this.vote();
				return false;
			}.bind(this);

			//获取票数
			var API = '/getMqjDzCount.action?id=' + this.dataId.substr(10);
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					var data = parseInt(xhr.responseText) || 0;
					Q('#voteNum').innerHTML = data + 1;
				};
			};
			xhr.open('GET', API, true);
			xhr.send(null);
		},
		vote : function(){

			var _self = this;
			//避免重复投票
			if(window.localStorage && localStorage['mqjVoteList']){
				if(localStorage['mqjVoteList'].match(new RegExp('(^|,)' + this.dataId.substr(10) + '(,|$)'))){
					alert('您已经献过花了，您可以邀请朋友来献花！^_^');
					return;
				}
			};

			var API = '/addMqjDz.action?id=' + this.dataId.substr(10);
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					var data = parseInt(xhr.responseText) || 0;
					if(data > 0){
						if(window.localStorage){
							localStorage['mqjVoteList'] = (localStorage['mqjVoteList'] || '') + _self.dataId.substr(10) + ',';
						}
						Q('#voteNum').innerHTML = data + 1;
						alert('感谢您的鲜花！');
					};
				};
			};
			xhr.ontimeout = function(e){
				alert('网络超时，请稍后再试！');
			}
			xhr.open('GET', API, true);
			xhr.send(null);
		}
	};
	function showShare(str){
		if(!isWX){
			document.getElementById('shareAlert').innerHTML = '<div class="othersShare">分享：<a href="javascript:void(0)" onclick="shareSina()"><img src="/microblog-v3/2014subject/1216_oneword/images/sina.png"></a> <a href="javascript:void(0)" onclick="sharePeople()"><img src="/microblog-v3/2014subject/1216_oneword/images/people.png"></a> <a href="javascript:void(0)" onclick="shareTencent()"><img src="/microblog-v3/2014subject/1216_oneword/images/tencent.png"></a></div>';
		};
		Q('#shareAlert').style.display = 'block';
		setTimeout(function(){
			Q('#shareAlert').style.display = 'none';
		}, 10000);
	};
	

	var viewWidth = document.body.clientWidth,
		viewHeight = document.body.clientHeight;
	
	viewWidth = viewWidth > 640 ? 640 : viewWidth;
	viewHeight = viewHeight > 1008 ? 1008 : viewHeight;

	var s = viewWidth / 640;

	addEvent(document, 'touchmove', function(e){
		e.preventDefault();
	});

	//通过字体控制布局比例
	if(!isMobile){//非移动设备
		var f = document.documentElement.clientHeight / 504 * 16,
			viewWidth = Math.round(document.documentElement.clientHeight / 504 * 320);
		document.documentElement.style.fontSize = f + 'px';
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
		document.documentElement.style.fontSize = 32 * s + 'px';
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
			if(canvas.getAttribute('data-exec')){
				new Function(canvas.getAttribute('data-exec')).call(canvas);
			};
		};
		img.src = src;
	}
	loader.init();
})();
