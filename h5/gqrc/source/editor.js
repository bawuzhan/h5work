(function(){ //修正不支持jpeg压缩
	var c = document.createElement('canvas');
	c.width = c.height = 1;
	var str = c.toDataURL('image/jpeg');
	if(str.indexOf('data:image/jpeg') !== 0){
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = '/microblog-v3/2015subject/0211_chunjie/cvsjpeg.js';
		document.body.insertBefore(s, document.body.firstChild);
	}

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
					console.log('play');
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


	// md5

	/* ---------------------------- MD5 -------------------------- */

	/*
	* A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	* Digest Algorithm, as defined in RFC 1321.
	* Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	* Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	* Distributed under the BSD License
	* See http://pajhome.org.uk/crypt/md5 for more info.
	*/

	/*
	* Configurable variables. You may need to tweak these to be compatible with
	* the server-side, but the defaults work in most cases.
	*/
	var hexcase = 0;
	/* hex output format. 0 - lowercase; 1 - uppercase        */
	var b64pad = "";
	/* base-64 pad character. "=" for strict RFC compliance   */
	var chrsz = 8;
	/* bits per input character. 8 - ASCII; 16 - Unicode      */

	/*
	* These are the functions you'll usually want to call
	* They take string arguments and return either hex or base-64 encoded strings
	*/
	function hex_md5(s) {
		return binl2hex(core_md5(str2binl(s), s.length * chrsz));
	}

	function b64_md5(s) {
		return binl2b64(core_md5(str2binl(s), s.length * chrsz));
	}

	function str_md5(s) {
		return binl2str(core_md5(str2binl(s), s.length * chrsz));
	}

	function hex_hmac_md5(key, data) {
		return binl2hex(core_hmac_md5(key, data));
	}

	function b64_hmac_md5(key, data) {
		return binl2b64(core_hmac_md5(key, data));
	}

	function str_hmac_md5(key, data) {
		return binl2str(core_hmac_md5(key, data));
	}

	/*
	* Calculate the MD5 of an array of little-endian words, and a bit length
	*/
	function core_md5(x, len) {
		/* append padding */
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;

		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;

		for (var i = 0; i < x.length; i += 16) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;

			a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
			d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
			b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
			d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
			c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
			d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
			d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

			a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
			d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
			c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
			b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
			d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
			c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
			d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
			c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
			a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
			d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
			c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
			b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

			a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
			d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
			b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
			d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
			c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
			d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
			a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
			d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
			b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

			a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
			d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
			c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
			d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
			d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
			a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
			d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
			b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return Array(a, b, c, d);

	}

	/*
	* These functions implement the four basic operations the algorithm uses.
	*/
	function md5_cmn(q, a, b, x, s, t) {
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}

	function md5_ff(a, b, c, d, x, s, t) {
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}

	function md5_gg(a, b, c, d, x, s, t) {
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}

	function md5_hh(a, b, c, d, x, s, t) {
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}

	function md5_ii(a, b, c, d, x, s, t) {
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	/*
	* Calculate the HMAC-MD5, of a key and some data
	*/
	function core_hmac_md5(key, data) {
		var bkey = str2binl(key);
		if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

		var ipad = Array(16),
		opad = Array(16);
		for (var i = 0; i < 16; i++) {
			ipad[i] = bkey[i] ^ 0x36363636;
			opad[i] = bkey[i] ^ 0x5C5C5C5C;
		}

		var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
		return core_md5(opad.concat(hash), 512 + 128);
	}

	/*
	* Add integers, wrapping at 2^32. This uses 16-bit operations internally
	* to work around bugs in some JS interpreters.
	*/
	function safe_add(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}

	/*
	* Bitwise rotate a 32-bit number to the left.
	*/
	function bit_rol(num, cnt) {
		return (num << cnt) | (num >>> (32 - cnt));
	}

	/*
	* Convert a string to an array of little-endian words
	* If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
	*/
	function str2binl(str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
		return bin;
	}

	/*
	* Convert an array of little-endian words to a string
	*/
	function binl2str(bin) {
		var str = "";
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < bin.length * 32; i += chrsz) str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
		return str;
	}

	/*
	* Convert an array of little-endian words to a hex string.
	*/
	function binl2hex(binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF": "0123456789abcdef";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
		}
		return str;
	}

	/*
	* Convert an array of little-endian words to a base-64 string
	*/
	function binl2b64(binarray) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i += 3) {
			var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
				else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
			}
		}
		return str;
	}
	var md5 = hex_md5;


	var readAsBinaryExif=function(){function m(f,e,c,b,d){var a=f.getShortAt(e+2,d);b=f.getLongAt(e+4,d);c=f.getLongAt(e+8,d)+c;switch(a){case 1:case 7:if(1==b)return f.getByteAt(e+8,d);c=4<b?c:e+8;e=[];for(a=0;a<b;a++)e[a]=f.getByteAt(c+a);return e;case 2:return f.getStringAt(4<b?c:e+8,b-1);case 3:if(1==b)return f.getShortAt(e+8,d);c=2<b?c:e+8;e=[];for(a=0;a<b;a++)e[a]=f.getShortAt(c+2*a,d);return e;case 4:if(1==b)return f.getLongAt(e+8,d);e=[];for(a=0;a<b;a++)e[a]=f.getLongAt(c+4*a,d);return e;case 5:if(1==b)return f.getLongAt(c,d)/f.getLongAt(c+4,d);e=[];for(a=0;a<b;a++)e[a]=f.getLongAt(c+8*a,d)/f.getLongAt(c+4+8*a,d);return e;case 9:if(1==b)return f.getSLongAt(e+8,d);e=[];for(a=0;a<b;a++)e[a]=f.getSLongAt(c+4*a,d);return e;case 10:if(1==b)return f.getSLongAt(c,d)/f.getSLongAt(c+4,d);e=[];for(a=0;a<b;a++)e[a]=f.getSLongAt(c+8*a,d)/f.getSLongAt(c+4+8*a,d);return e}}var n={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},r=function(f,e,c){var b=f,d=e||0,a=0;this.getRawData=function(){return b};"string"==typeof f?(a=c||b.length,this.getByteAt=function(a){return b.charCodeAt(a+d)&255}):"unknown"==typeof f&&(a=c||IEBinary_getLength(b),this.getByteAt=function(a){return IEBinary_getByteAt(b,a+d)});this.getLength=function(){return a};this.getSByteAt=function(a){a=this.getByteAt(a);return 127<a?a-256:a};this.getShortAt=function(a,c){var b=c?(this.getByteAt(a)<<8)+this.getByteAt(a+1):(this.getByteAt(a+1)<<8)+this.getByteAt(a);0>b&&(b+=65536);return b};this.getSShortAt=function(a,b){var c=this.getShortAt(a,b);return 32767<c?c-65536:c};this.getLongAt=function(a,c){var b=this.getByteAt(a),d=this.getByteAt(a+1),e=this.getByteAt(a+2),f=this.getByteAt(a+3),b=c?(((b<<8)+d<<8)+e<<8)+f:(((f<<8)+e<<8)+d<<8)+b;0>b&&(b+=4294967296);return b};this.getSLongAt=function(a,b){var c=this.getLongAt(a,b);return 2147483647<c?c-4294967296:c};this.getStringAt=function(a,b){for(var c=[],d=a,e=0;d<a+b;d++,e++)c[e]=String.fromCharCode(this.getByteAt(d));return c.join("")};this.getCharAt=function(a){return String.fromCharCode(this.getByteAt(a))};this.toBase64=function(){return window.btoa(b)};this.fromBase64=function(a){b=window.atob(a)}};return function(f,e){var c;a:{var b=new r(f);if(255!=b.getByteAt(0)||216!=b.getByteAt(1))c=!1;else{var d=2;for(c=b.getLength();d<c;){if(255!=b.getByteAt(d)){c=!1;break a}var a=b.getByteAt(d+1);if(22400==a||225==a){b:if(c=b,a=d+4,b.getShortAt(d+2,!0),"Exif"!=c.getStringAt(a,4))c=!1;else{var g=void 0,b=a+6;if(18761==c.getShortAt(b))g=!1;else if(19789==c.getShortAt(b))g=!0;else{c=!1;break b}if(42!=c.getShortAt(b+2,g)||8!=c.getLongAt(b+4,g))c=!1;else{for(var d=b+8,a=n,p=c.getShortAt(d,g),k={},h=0;h<p;h++){var l=d+12*h+2,q=a[c.getShortAt(l,g)];k[q]=m(c,l,b,d,g)}c=k}}break a}d+=2+b.getShortAt(d+2,!0)}c=void 0}}return c[e]?c[e]:""}}();

	//不支持jpeg，尝试使用多线程处理jpeg
	// var workers;
	// if(0&&HTMLCanvasElement.prototype._toDataURL && window.Worker){
	// 	workers = [new Worker('jpegWorker.js'), new Worker('jpegWorker.js'), new Worker('jpegWorker.js'), new Worker('jpegWorker.js'), new Worker('jpegWorker.js'), new Worker('jpegWorker.js')];
	// };
	
	var iOS = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
	var isWIFI = navigator.userAgent.indexOf('NetType/WIFI') !== -1;
	var isWX =  navigator.userAgent.indexOf('Messenger') !== -1;
	if(isWX){
		if(location.host != 't.people.com.cn'){
			location.href = 'http://t.people.com.cn/wx/guoqing';
			return;
		};
	};
	var localCache = {
		name : 'urlcache',
		get : function(name){
			if(/[&\\=\|\?%]/.test(name)){
				if(window.console)console.log('name不能包含特殊符号:' + name);
				return;
			};
			if(window.localStorage){
				var str = window.localStorage[this.name] || '';
				var val = str.match(RegExp('(?:^|&)' + name + '=([^&]*)'));
				if(val){
					return decodeURIComponent(val[1]);
				}else{
					return;
				};
			}
		},
		set : function(name, value){
			if(/[&\\=\|\?%]/.test(name)){
				if(window.console)console.log('name不能包含特殊符号:' + name);
				return false;
			};
			if(window.localStorage){
				var str = window.localStorage[this.name] || '';
				if(this.get(name) === undefined){
					str += (str === '' ? '' : '&') + name + '=' + value.replace(/&/g, '%26').replace(/=/g, '%3D');
				}else{
					str = str.replace(RegExp('(^|&)' + name + '=([^&]*)'), '$1' + name + '=' + encodeURIComponent(value));
				}
				window.localStorage[this.name] = str;
				return true;
			};
			return false;
		},
		del : function(name){
			if(/[&\\=\|\?%]/.test(name)){
				alert('name不能包含特殊符号');
				return false;
			};
			if(window.localStorage){
				if(this.get(name) !== undefined){
					var str = window.localStorage[this.name] || '';
					str = str.replace(RegExp('(^|&)' + name + '=([^&]*)'), '');
					window.localStorage[this.name] = str.replace(/^&/, '');
					return true;
				};
			};
			return false;
		},
		clear : function(){
			if(window.localStorage){
				window.localStorage[this.name] = '';
			}
		}
	}

	var imageLoader = {
		ready : true,
		limit : 7, //图数量限制
		maxWidth : 500,
		maxHeight : 550,
		type : '*', //jpeg | png | gif | *
		num : 0,
		multiple : true,
		init : function(){
			var _self = this;
			this.fileRef = document.createElement('div');
			this.fileRef.style.width = '1px';
			this.fileRef.style.height = '1px';
			this.fileRef.style.overflow = 'hidden';
			this.fileRef.style.position = 'absolute';
			this.fileRef.style.zIndex = 900;
			this.fileRef.style.left = '-10px';
			this.fileRef.style.top = '-10px';
			document.body.appendChild(this.fileRef);


			this.form = document.createElement('form');
			this.form.className = 'ente_uploadForm';
			this.form.setAttribute('target', 'enteUploadImgFrame');
			this.form.setAttribute('enctype', 'multipart/form-data');
			this.form.setAttribute('method', 'post');
			this.form.style.width = '260px';
			this.fileRef.appendChild(this.form);
			this.form.innerHTML = '<div class="ente_f"><input type="file" multiple="multiple" accept="image/' + this.type + '" name="upload" /></div>';


			this.file = Q('input[type=file]', this.form);

			this.fileBox = Q('.ente_f', this.form);

			this.form.style['opacity'] = '0';

			if(iOS){
				var s = 0;
				var _endFn = function(){
					s ++;
					if(s >= 3 && _self.file.files.length == 0 && typeof _self.oncomplete == 'function'){
						_self.oncomplete();
						removeEvent(document, 'touchstart', _endFn);
					};
				};
				this.file.onclick = function(){
					if(typeof _self.onbegin == 'function'){
						_self.onbegin();
						addEvent(document, 'touchstart', _endFn);
					};
				};
			};

			this.file.onchange = function(){
				if(!iOS){
					if(typeof _self.onbegin == 'function'){
						_self.onbegin();
						addEvent(document, 'touchstart', _endFn);
					};
				};
				removeEvent(document, 'touchstart', _endFn);
				_self.setDisabled(true);
				_self._push(this);
			};
		},
		setMultiple : function(val){
			this.multiple = val === true;
			if(this.multiple){
				this.file.setAttribute('multiple', 'multiple');
			}else{
				this.file.removeAttribute('multiple');
			}
		},
		bind : function(input){ //绑定图片和输入框
			var _self = this;
			input = typeof input == 'string' ? Q(input) : input;
			input.onmouseover = function(){
				_self.coverTarget(input);
			};
			this.coverTarget(input);
		},
		unbind : function(input){
			input.onmouseover = null;
		},
		_loadQueue : [],
		_load : function(){
			if(this._loadQueue.length){
				// var worker;
				// if(workers){
				// 	if(workers.length == 0){
				// 		return;
				// 	};
				// 	worker = workers.shift();
				// };

				var file = this._loadQueue.shift();
				if(file){
					//this._readExif(file, worker);
					this._readExif(file);
				};
			};
		},
		_push : function(input){
			var file
				_self = this;
			this.sum = 0;
			this.num = 0;
			for (var i = 0; i < input.files.length; i++) {
				if(i >= this.limit){break;}
				this._loadQueue.push(input.files[i]);
				this.sum ++;
				//setTimeout(function(){
					_self._load();
				//},0)
			};
			
		},
		_readExif : function(file, worker){
			var _self = this;
			var url = (window.URL || window.webkitURL).createObjectURL(file);

			//读取文件exif
			if(file){
				try{
					var reader = new FileReader();
					reader.onload = function(e){
						var orientation = readAsBinaryExif(this.result, 'Orientation');
						_self._readFile(url, orientation, worker);
					};
					reader.onerror = function(e){
						_self._readFile(url, 0, worker);
					}
					reader.readAsBinaryString(file);
				}catch(e){
					this._readFile(url, 0, worker);
				}
			}
		},
		_readFile : function(url, orientation, worker){
			/* 生成图片
			* ---------------------- */
			var _self = this;
			var img = new Image();
			var orien = orientation || 0;
			var iOS = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
			if(iOS){
				iOS = parseInt(iOS[1]);
			};

			img.onload = function(){
				var width = img.width, height = img.height, scale = width / height,
					cc, c2, ctx, data, squash = 1;

				if(Math.max(width, height) > 3000){
					width = width * 0.8;
					height = height * 0.8;
				}
				if(iOS && iOS < 8){ //修正 iOS8 之前的bug
					cc = document.createElement('canvas');
					cc.width = width;
					cc.height = height;
					ctx = cc.getContext('2d');

					ctx.drawImage(img, 0, 0, width, height);

					data = ctx.getImageData(0, 0, 1, height).data;
					squash = _self._detectSquash(data, height, 0);

					var sum = 0;
					while(squash != 1 && sum < 3){
						sum ++;
						var c2 = document.createElement('canvas');
						c2.width = width;
						c2.height = height;
						ctx = c2.getContext('2d');

						ctx.drawImage(cc, 0, 0, width, height / squash);
						
						data = ctx.getImageData(0, 0, 1, height).data;
						squash = _self._detectSquash(data, height, 0);
						if(squash != 1){
							width = width * 0.8;
							height = height * 0.8;
						}
						cc = c2;
					};
					data = null;
				}else{
					cc = img;
				};

				var temp;
				if(orien == 6 || orien == 8){
					temp = width;
					width = height;
					height = temp;
					scale = width / height;
				};
				if(width > _self.maxWidth){
					width = parseInt(_self.maxWidth);
					height = parseInt(width / scale);
				}

				if(height > _self.maxHeight){
					height = parseInt(_self.maxHeight);
					width = parseInt(height * scale);
				};

				//缩小
				// var c2 = document.createElement('canvas');
				// c2.width = width;
				// c2.height = height;
				// ctx = c2.getContext('2d');

				// ctx.drawImage(cc, 0, 0, width, height);
				// cc = c2;

				// //生成canvas
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				canvas.width = width;
				canvas.height = height;

				// var canvas = _self.zoomCanvas(cc, width, height);
				// var ctx = canvas.getContext('2d');
				switch(orien){
					case 3: //180度
						ctx.rotate(180 * Math.PI / 180);
						ctx.drawImage(cc, -width, -height, width, height);
						break;
					case 6: //90度
						ctx.rotate(90 * Math.PI / 180);
						ctx.drawImage(cc, 0, -width, height, width);
						break;
					case 8: //270度
						ctx.rotate(270 * Math.PI / 180);
						ctx.drawImage(cc, -height, 0, height, width);
						break;
					default:
						ctx.rotate(0);
						ctx.drawImage(cc, 0, 0, width, height);
						break;
				}

				var base64;
				
				// //logo
				// canvas = _self.zoomCanvas(canvas, width, height);
				// ctx = canvas.getContext('2d');
				
				// ctx.drawImage(_self.logoImg, width - 120, height - 48, 120, 43);

				base64 = canvas.toDataURL('image/jpeg', iOS?0.7:0.86);

				canvas = _self.zoomCanvas(canvas, 80, 80);
				ctx = canvas.getContext('2d');

				smallBase64 = canvas.toDataURL('image/jpeg', 0.7);

				if(typeof _self.onadd == 'function'){
					_self.add(base64, smallBase64);
				};
				_self._load();
			
				
			}
			img.onerror = function(){
				_self.onerror('没有权限访问文件');
				alert('由于安全限制，无法从手机中读取照片，请尝试在浏览器中打开，使用拍照上传。');
			};
			img.src = url;

		},
		zoomCanvas : function(cc, toW, toH){ //缩放
			var canvas, cvs1, cvs2, ctx1, ctx2, w = cc.width, h = cc.height, x = 0, y = 0, sw = w, sh = h;
			if(w / toW > 1.8){ //阶梯缩小，避免锯齿
				cvs1 = document.createElement('canvas');
				cvs2 = document.createElement('canvas');
				ctx1 = cvs1.getContext('2d');
				ctx2 = cvs2.getContext('2d');
				cvs1.width = w;
				cvs1.height = h;

				ctx1.drawImage(cc, 0, 0, w, h);

				while(w / toW > 1.8){
					w = Math.round(w * 0.6);
					h = Math.round(h * 0.6);
					
					cvs2.width = w;
					cvs2.height = h;
					ctx2.drawImage(cvs1, 0, 0, w, h);

					cvs1.width = w;
					cvs1.height = h;
					ctx1.drawImage(cvs2, 0, 0, w, h);
				}
				canvas = cvs1;
			}else{
			 	canvas = cc;
			};
			if(canvas.width > canvas.height){
				sw = canvas.height / toH * toW;
				sh = canvas.height;
				x = (canvas.width - (canvas.height / toH * toW)) / 2;
				y = 0;
			}else{
				sw = canvas.width;
				sh = canvas.width / toW * toH;
				x = 0;
				y = (canvas.height - (canvas.width / toW * toH)) / 2;
			};

			var nCanvas = document.createElement('canvas');
			nCanvas.width = toW;
			nCanvas.height = toH;
			var ctx = nCanvas.getContext('2d');
			ctx.drawImage(canvas, x, y, sw, sh, 0, 0, toW, toH);
			return nCanvas;
		},
		error : function(msg){
			if(typeof this.onerror == 'function'){
				this.onerror(msg);
			};
			this.setDisabled(false);
			this.file.value = '';
		},
		add : function(data, smallData){
			if(typeof this.onadd == 'function'){
				this.onadd(data, smallData);
			};
			//console.log('size:' + (Math.round(data.length / 10.24)/100) + 'k');
			this.num ++;

			if(typeof this.onprogress == 'function'){
				this.onprogress(this.num / this.sum);
			};
			if(this.num == this.sum){
				this.setDisabled(false);
				this.file.value = '';
				if(typeof _self.oncomplete == 'function'){
					_self.oncomplete();
				};
			};
		},
		_detectSquash : function(data, width, orien) {
			switch(orien){
				case 3://180
				case 6://90
					for (var i = width - 1; i >= 0; i--) {
						if(data[i * 4 + 3] === 0){
							break;
						};
					};
					i = width - 2 - i;
					
					break;
				case 8://270
				default:
					for (var i = 0; i < width; i++) {
						if(data[i * 4 + 3] === 0){
							break;
						};
					};
					i = i - 1;
					break;
					
			}
			if(width - i <= 2){
				return 1;
			};
			var ratio = (i / (width - 1));
			return (ratio<=0)?1:ratio;
		},
		coverTarget : function(target){
			target = typeof target == 'string' ? Q(target) : target;
			this.target = target;
			var offset = absPosition(target);

			this.fileRef.style.width = target.offsetWidth + 'px';
			this.fileRef.style.height = target.offsetHeight + 'px';
			this.fileRef.style.left = offset.left + 'px';
			this.fileRef.style.top = offset.top + 'px';

			this.fileRef.style.display = 'block';

			//修正IE 8、9位置bug
			if(this.revise){
				return;
			}else if(navigator.userAgent.indexOf('MSIE 8') !== -1){
				this.fileBox.style.left = '-183px';
			}else if(navigator.userAgent.match(/MSIE (9|10)/)){
				this.fileBox.style.left = '-' + (this.fileBox.offsetWidth * 15 - this.target.offsetWidth) + 'px';
			}else if(navigator.userAgent.indexOf('MSIE') === -1){
				this.fileBox.style.left = '-100px';
			};
			this.revise = true;
		},
		setDisabled : function(s){
			var s = !!s;
			this.ready = !s;
			if(s){
				this.form.style.display = 'none';
			}else{
				this.form.style.display = 'block';
			}
		},
		hide : function(){
			this.fileRef.style.display = 'none';
		},
		show : function(){
			this.fileRef.style.display = 'block';
		}
	};
	var audioType = navigator.userAgent.match(/Firefox|Opera/i)?'ogg':'mp3';
	//编辑器
	var editor = {
		page : 1,
		bgAudio : 'http://i0.peopleurl.cn/microblog-v3/h5/wuyi/images/sound.' + audioType,
		firstItem : { //封面
			isFirst : true,
			isDefault : true,
			defaultSrc : '',
			defaultTxt : '',
			smallBase64 : '',
			txt : '',
			imgUrl : ''
		},
		allDefaultTxt : [
			[
				'吃',
				'穿',
				'住',
				'用',
				'行',
				'玩',
				'伴儿'
			]
		],
		defaultTxtIndex : 0,
		elementsPath : 'images/',
		style : 1,
		items : [],
		limit : 7,
		init : function(){
			var _self = this;
			
			Q('#btnPreview').onclick = function(){
				_self.preview();
			};
			Q('#btnToEdit').onclick = function(){
				mobileshow.uninit();
				_self.setPage(2);
			};
			Q('#btnSubmit').onclick = function(){
				_self.submit();
			};
			Q('#btnDelete').onclick = function(){
				_self.delItem();
			};
			Q('#btnSaveChange').onclick = function(){
				_self.saveChange();
			};
			this.defaultTxt = this.allDefaultTxt[0];

			this.setStyle(1);

			Q('#firstItem').onclick = function(){
				_self.change(_self.firstItem);
			};

			this.items.push(this.firstItem);
			//this.setPage(1);
		},
		setStyle : function(s){
			this.style = s || 1;
			this.setPage(2);
			this.firstItem.img = Q('#firstPageImg');
			this.firstItem.imgUrl = this.firstItem.defaultSrc = this.firstItem.img.src = this.elementsPath + 'icon.jpg';

			Q('#lastPageImg').setAttribute('src' , this.elementsPath + 'icon_e_0' + this.style + '.jpg');
			this.defaultTxt = this.allDefaultTxt[this.style - 1] || this.allDefaultTxt[0];
			this.resetDefaTxt();
		},
		setPage : function(p){
			if(p === 1){
				//Q('.e_page_1').style.display = 'block';
				Q('.e_page_2').style.display = 'none';
				Q('.e_page_3').style.display = 'none';
				imageLoader.hide();
				this.page = 1;
			}else if(p === 2){
				//Q('.e_page_1').style.display = 'none';
				Q('.e_page_2').style.display = 'block';
				Q('.e_page_3').style.display = 'none';
				this.checkLimit();
				this.page = 2;
			}else if(p === 3){
				//Q('.e_page_1').style.display = 'none';
				Q('.e_page_2').style.display = 'none';
				Q('.e_page_3').style.display = 'block';
				imageLoader.hide();
				this.page = 3;
			}
		},
		addImage : function(img, smallBase64){
			var _self = this;
			if(this.items.length >= this.limit + 1){
				return;
			};
			var item = {};
			item.smallBase64 = smallBase64;
			item.li = document.createElement('li');
			item.img = new Image();
			var span = document.createElement('span');
			item.img.src = img;
			item.li.appendChild(span);
			span.appendChild(item.img);
			var txtIcon = document.createElement('div');
			txtIcon.className = 'itemTxt';
			item.li.appendChild(txtIcon);

			Q('#addItemBtn').parentNode.insertBefore(item.li, Q('#addItemBtn'));

			item.txt = this.defaultTxt[this.defaultTxtIndex];
			item.isDefaTxt = true;

			this.defaultTxtIndex ++;
			if(this.defaultTxtIndex >= this.defaultTxt.length){
				this.defaultTxtIndex = 0;
			};

			item.li.onclick = function(){
				_self.change(item);
			};
			this.items.push(item);
			this.checkLimit();
		},
		checkLimit : function(){
			if(this.items.length >= this.limit + 1){
				Q('#addItemBtn').style.display = 'none';
				imageLoader.hide();
			}else{
				Q('#addItemBtn').style.display = 'block';
				imageLoader.coverTarget('#addImage');
				imageLoader.show();
				imageLoader.limit = this.limit - this.items.length + 1;
			}
		},
		preview : function(){
			if(this.items.length == 1){
				alert('至少需要添加1张照片，请点击“+”按钮添加照片。');
				return;
			};
			var viewWidth = document.body.clientWidth,
			viewHeight = document.body.clientHeight;

			mobileshow.uninit();

			var html = '<div class="globalPackage"><div class="sound s_off"></div><div class="moveArr"></div></div><div class="scenery page_0' + this.style +  (this.firstItem.isDefault==false?' userBg':'') + '">' + (this.firstItem.isDefault==false ? ('<div class="userImgBox"><canvas id="bgCanvas_first" class="userBgImg"></canvas><img src="' + this.firstItem.img.src + '" class="userImg" onload="showBlurBg(this)" style="top:' + (Math.round((viewHeight - (this.firstItem.img.height * viewWidth / this.firstItem.img.width)) * 0.4)) + 'px"></div>'):'<div class="bg"></div>') +'<div class="title" data-animationIn="fadeInDown 1s 0"></div><div class="subtitle" data-animationIn="fadeInUp 1.5s 0.5s">' + this.firstItem.txt + '</div><div class="footer" data-animationIn="fadeInUp 1s 1s" data-animation="shine 2s 0 2"><div class="logo"></div></div>'+
	'</div>';
			var animations = ['fadeInLeft 1s 0', 'fadeInRight 1s 0', 'fadeInDown 1s 0', 'fadeInUp 1s 0'];
			var txtInAnimations = ['fadeInRight 3s 0', 'fadeInLeft 3s 0', 'fadeInRight 3s 0', 'fadeInLeft 3s 0'];
			var txts, ti;
			for (var i = 1; i < this.items.length; i++) {
				html += '<div class="scenery" data-autoNext="1000"><div class="userImgBox" data-animationIn="' + (animations[(i-1) % animations.length]) + '"><canvas id="bgCanvas_' + (i-1) + '" class="userBgImg"></canvas>' + '<img src="' + this.items[i].img.src + '" class="userImg" onload="showBlurBg(this)" style="top:' + (Math.round((viewHeight - (this.items[i].img.height * viewWidth / this.items[i].img.width)) * 0.4)) + 'px"></div>';
				if(this.items[i].txt){
					html += '<div class="userTxt" data-animationIn="' + (txtInAnimations[(i-1) % txtInAnimations.length]) + '">' + decodeURI(this.items[i].txt).replace(/</g, '&lt;').replace(/([,，;；。])/g, '$1<br>') + '</div>';
				};
				html += '</div>';
			};
			html += '<div class="scenery page_end_0' + this.style + '">'+
		'<div class="bg"></div></div>'+
	'</div>';
			Q('.slideshow').innerHTML = html;
			this.setPage(3);
			
			mobileshow.init('.slideshow');
			mobileshow.setSound(this.bgAudio);
		},
		submit : function(){
			if(this.items.length <= 1){
				alert('至少需要添加1张照片，请点击“+”按钮添加照片。');
				this.setPage(2);
				return;
			};
			var total = 0;
			for (var i = 0; i < this.items.length; i++) {
				total += this.items[i].img.src.length + this.items[i].smallBase64.length;
			};
			this.uploadImg();
			//alert('测试：\n共 ' + this.items.length + ' 图片，总大小：' + (Math.round(total / 100) / 10) + 'k。');
		},
		change : function(item){
			this._changeItem = item;
			Q('.imgTxtLayer').style.display = 'block';
			Q('.imgTxtLayer .it_pic img').setAttribute('src', item.img.src);
			Q('.imgTxtLayer .it_txt textarea').value = item.txt || '';

			//修改图片
			imageLoader.__onadd = imageLoader.onadd;

			imageLoader.onadd = function(bigBase64, smallBase64){
				item.img.src = bigBase64
				item.smallBase64 = smallBase64;
				
				if(item.isFirst){
					item.isDefault = false;
					item.imgUrl = '';
				};

				Q('.imgTxtLayer .it_pic img').setAttribute('src', item.img.src);
			};
			imageLoader.setMultiple(false);
			imageLoader.bind('#changeImage');
		},
		saveChange : function(){
			if(!this._changeItem){
				return;
			};
			var txt =  Q('.imgTxtLayer .it_txt textarea').value || '';
			if(txt != this._changeItem.txt){
				this._changeItem.isDefaTxt = false;
			};
			this._changeItem.txt = txt;
			

			this.closeChangeLayer();
		},
		closeChangeLayer : function(){
			Q('.imgTxtLayer').style.display = 'none';

			imageLoader.onadd = imageLoader.__onadd || imageLoader.onadd;
			imageLoader.__onadd = null;
			imageLoader.setMultiple(true);
			imageLoader.unbind('#changeImage');
			imageLoader.coverTarget('#addImage');
			this._changeItem = null;
		},
		resetDefaTxt : function(){
			this.defaultTxtIndex = 0;
			if(!this.items.length){
				return;
			};
			for (var i = 1; i < this.items.length; i++) {
				if(this.items[i].isDefaTxt){
					this.items[i].txt = this.defaultTxt[(i - 1) % this.defaultTxt.length];
				}
			};
			this.defaultTxtIndex = this.items.length;
		},
		delItem : function(item){
			item = item || this._changeItem;
			if(!item){
				return;
			};
			
			if(item.isFirst){
				if(item.isDefault){
					alert('封面无法删除');
					return;
				};
				if(!confirm('封面无法删除，是否恢复默认封面吗？')){
					return;
				};
				item.img.src = item.defaultSrc;
				item.imgUrl = item.defaultSrc;
				item.txt = item.defaultTxt;
				item.isDefault = true;
				item.smallBase64 = '';
				this.closeChangeLayer();
				return;
			};
			if(!confirm('确定要删除当前照片吗？')){
				return;
			};
			var items = [];
			for (var i = 0; i < this.items.length; i++) {
				if(this.items[i] != item){
					items.push(this.items[i]);
				}else{
					item.li.parentNode.removeChild(item.li);
				};
			};
			
			this.items = items;
			this.checkLimit();

			this.resetDefaTxt();
			this.closeChangeLayer();
		},
		uploadImg : function(){
			var _self = this;
			showMessage('图片上传中...');
			this.uploadIndex = -1;

			//统计进度
			var total = 0, sumSize = 0;
			for (var i = 0; i < this.items.length; i++) {
				if(!this.items[i].imgUrl){
					total += this.items[i].smallBase64.length + this.items[i].img.src.length;
				};
			};

			var API = '/yb2015ImageUpload.action';
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					//上传完成
					var rTxt = xhr.responseText;
					if(rTxt && (/^\d+$/).test(rTxt)){
						var imgUrl = getImgPath(rTxt);

						//成功
						_self.items[_self.uploadIndex].imgUrl = imgUrl;
						//cache
						localCache.set('img_' + _self.items[_self.uploadIndex].md5, imgUrl);

						sumSize += _self.items[_self.uploadIndex].smallBase64.length + _self.items[_self.uploadIndex].img.src.length;

						//下一张
						postImg();

					}else{
						alert('图片上传失败，请稍后再试！code:600');
						hideMessage();
					};
				}else if(xhr.readyState == 4){
					alert('网络忙，请稍后再试！code:' + xhr.status);
					hideMessage();
				};
			};
			xhr.ontimeout = function(e){
				alert('上传超时，请在较好的网络环境中再试！');
				hideMessage();
			}
			if(xhr.upload)xhr.upload.onprogress = function(e){
				if(e.lengthComputable) {
					var p = (sumSize + e.loaded) / total;
					p = p > 1 ? 1 : p;
					showMessage('图片上传进度' + '<br>' + Math.round(total/1024) + 'k/' + Math.round(p * 100) + '%');
				};
			};
			function postImg(){
				_self.uploadIndex ++;
				if(_self.uploadIndex >= _self.items.length){
					//全部完成
					_self.uploadJSON();
					return;
				};
				var item = _self.items[_self.uploadIndex];
				// 缓存
				if(item.smallBase64){
					item.md5 = md5(item.smallBase64);
					item.imgUrl = localCache.get('img_' + item.md5);
				};

				if(item.imgUrl){
					//next
					postImg();
					return;
				};
				xhr.open('POST', API, true);
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				var data = 'dataStr=' + encodeURIComponent(item.img.src.substr(23)) + '&dataSmall=' + encodeURIComponent(item.smallBase64.substr(23));
				xhr.send(data);
			};
			postImg();
		},
		getJSON : function(){
			var js = '{"style":' + this.style + ',';
			
			js += '"firstScrn":{"src":"' + (this.firstItem.isDefault?'':this.firstItem.imgUrl);
			js += '","txt":"' + encodeURI(this.firstItem.txt.replace(/</g, '&lt;') || '').replace(/(\\|")/g, '\\$1') + '","width":' + this.firstItem.img.width + ',"height":' + this.firstItem.img.height + '},'
			
			js += '"scrnery":[';
			for (var i = 1; i < this.items.length; i++) {
				if(i != 1){
					js += ',';
				}
				js += '{"src":"' + this.items[i].imgUrl + '","txt":"' + encodeURI(this.items[i].txt.replace(/</g, '&lt;') || '').replace(/(\\|")/g, '\\$1') + '","width":' + this.items[i].img.width +',"height":' + this.items[i].img.height +'}';
			};
			js += ']}';
			return js;
		},
		uploadJSON : function(){
			var API = '/guoqingConf.action';
			var xhr = new XMLHttpRequest();
			showMessage('上传场景中...');
			var json = encodeURIComponent(this.getJSON());
			var m5 = md5(json);
			var id = localCache.get('json_' + m5);
			if(id){
				if(window.localStorage){
					localStorage['tempId'] = id;
				};
				showMessage('请稍候...');
				window.location.href = '/h5/guoqing/' + id;
				return;
			};

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					var rTxt = xhr.responseText;
					if(rTxt && (/^\d+$/).test(rTxt)){
						//成功
						if(window.localStorage){
							localStorage['tempId'] = rTxt;
						};
						localCache.set('json_' + m5, rTxt)
						showMessage('请稍候...');
						//window.location.href = '/h5/guoqing/' + rTxt;
						setTimeout(function(){
							window.location.href = '/h5/guoqing/' + rTxt;
						}, 2000);

					}else{
						alert('上传失败，请稍后再试！code:601');
						hideMessage();
					}
				}else if(xhr.readyState == 4){
					alert('上传失败，请稍后再试！code:' + xhr.status);
					hideMessage();
				};
			};
			xhr.ontimeout = function(e){
				alert('上传超时，请在较好的网络环境中再试！');
				hideMessage();
			}
			xhr.open('POST', API, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send('confDataStr=' + json + '&recordType=wuyi&imageCount=' + this.items.length);
		}
	};

	var viewWidth = document.body.clientWidth,
		viewHeight = document.body.clientHeight;
	
	viewWidth = viewWidth > 640 ? 640 : viewWidth;
	viewHeight = viewHeight > 1008 ? 1008 : viewHeight;

	var s = viewWidth / 640;

	addEvent(document, 'touchmove', function(e){
		e.preventDefault();
	});

	var isMobile = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);
	isMobile = isMobile ? isMobile[0] : false;
	//通过字体控制布局比例
	if(!isMobile){//非移动设备
		var f = document.documentElement.clientHeight / 504 * 16,
			viewWidth = Math.round(document.documentElement.clientHeight / 504 * 320);
		document.body.style['font-size'] = f + 'px';
		document.body.style['overflow'] = 'hidden';
		document.body.style['width'] = viewWidth + 'px';
		
		var pb = document.createElement('div');
		pb.className = 'pageBtn';
		pb.style.left = viewWidth + 'px';
		pb.innerHTML = '<a href="javascript:void(0)" id="preBtn">上一页</a><a href="javascript:void(0)" id="nextBtn">下一页</a>'
		Q('.e_page_3').appendChild(pb);

		Q('#preBtn').onclick = function(){
			mobileshow.pre();
			return false;
		};
		Q('#nextBtn').onclick = function(){
			mobileshow.next();
			return false;
		};

	}else if(viewWidth < 640){
		//document.body.style['font-size'] = 32 * s + 'px';
		document.documentElement.style['font-size'] = 32 * s + 'px';
	};

	function showMessage(str){
		Q('#promptLayer').style.display = 'block';
		Q('#promptLayer .txt').style.width = viewWidth + 'px';
		Q('#promptLayer .txt').style.height = viewHeight + 'px';
		Q('#promptLayer .txt').innerHTML = str;
	};
	function hideMessage(){
		Q('#promptLayer').style.display = 'none';
	};
	function getImgPath(id, s){
		s = s || '';
		return 'http://i0.peopleurl.cn/nmsgimage/wx/2015yuebing/' + (id.substr(0, 10)) + '/' + s + id + '.jpg';
	};

	imageLoader.onbegin = function(){
		showMessage('处理照片中，请稍后...');
	};
	imageLoader.onadd = function(bigBase64, smallBase64){
		editor.addImage(bigBase64, smallBase64);
	};
	imageLoader.onprogress = function(p){
		showMessage('处理照片中，进度' + (Math.round(p * 10000) / 100) + '%');
	};
	imageLoader.oncomplete = function(){
		hideMessage();
	};
	imageLoader.init();
	imageLoader.bind('#addImage');
	//Q('.loadingPage').style.display = 'none';

	window['showBlurBg'] = function(img){
		var canvas = img.previousSibling;
		if(canvas.tagName != 'CANVAS'){
			return;
		};
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		stackBlurCanvasRGB(canvas, 0, 0, canvas.width, canvas.height, Math.round(canvas.width/10));
	};
	
	editor.init();
})();
