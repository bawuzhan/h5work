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
	function trim(str){
		return str.toString().replace(/(^\s+|\s+$)/g, '');
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

	var isAndroid = !!navigator.userAgent.match(/android/i);
	var readCookie = function(l){var i="",I=l+"=";if(document.cookie.length>0){var offset=document.cookie.indexOf(I);if(offset!=-1){offset+=I.length;var end=document.cookie.indexOf(";",offset);if(end==-1)end=document.cookie.length;i=document.cookie.substring(offset,end)}};return unescape(i)},
		writeCookie = function(O,o,l,I){var i="",c="";if(l!=null){i=new Date((new Date).getTime()+l*3600000);i="; expires="+i.toGMTString()};if(I!=null){c=";domain="+I};document.cookie=O+"="+escape(o)+i+c};

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
	};
	var scenery = {
		mute : false,
		status : '',
		init: function(ele, preloadList){
			var _self = this;
			this.nowScen = Q(ele);
			this.ele = this.nowScen.parentNode;
			this.nowScen.childs = QA('*[data-animationIn],*[data-animation],*[data-animationOut]', this.nowScen);

			var viewWidth, viewHeight;
			
			viewWidth = document.body.clientWidth;
			viewHeight = document.documentElement.clientHeight;
			viewWidth = viewWidth > 640 ? 640 : viewWidth;

			var s = viewWidth / 640;
			this.nowScen.style.minHeight = viewHeight + 'px';

			//通过字体控制布局比例
			// if(viewWidth < 640){
			// 	this.ele.style['font-size'] = 32 * s + 'px';
			// };
			
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

			this.cssKey = '';
			if(preloadList && preloadList.length){
				this.status = 'loading';
				this.preloadList = preloadList;
				this.preload();
			}else if(preloadList === false){
				this.showLoading();
			}else{
				this.action(0);
			};
		},
		showLoading : function(){
			this.loading = document.createElement('div');
			this.loading.className = 'loadingPage';
			this.loading.innerHTML = '<div class="loadingTxt">载入中...</div>';
			this.ele.appendChild(this.loading);
			
			this.loading.style.display = 'block';
		},
		hideLoading : function(){
			if(this.status != 'loading'){
				return;
			};
			this.status = '';
			this.loading.style.display = 'none';
			this.action(0);
		},
		preload : function(){
			var _self = this, s = 0, img;
			this.showLoading();

			//超时
			setTimeout(function(){
				_self.hideLoading();
			}, 3000);

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
		readyScen : function(){
			var item = this.nowScen;
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
		},
		action : function(){
			//执行场景中的元素动画
			var _self = this;

			this.readyScen();

			if(this.soundSrc && !this.mute && this.auido_bg.isPaused()){
				this.playSound();
			};

			//清除上次的延时
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
				}else if(aOut && (aOut = aOut.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?/i)) && aOut.length >= 3){
					this._actionOut(item);
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
			};

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
		_action : function(ele){
			//执行单个元素的 默认 动画
			var _self = this;
			var a = ele.getAttribute('data-animation');
			if(!(a && (a = a.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?(?:\s(\d+|infinite))?/i)) && a.length >= 3)){
				if(ele.getAttribute('data-animationOut')){
					this._actionOut(ele);
				};
				return;
			};
			var fn = function(){
				if(this.getAttribute('data-endClassName')){
				this.className = this.getAttribute('data-endClassName');
				};
				this.removeAttribute('data-endClassName');
				this._endFn = null;
				delete this._endFn;
				_self._actionOut(this);
			};
			ele.addEventListener(ANIMATION_END_NAME, fn, null);
			ele._endFn = fn;

			ele.style.display = '';
			ele.setAttribute('data-endClassName', ele.getAttribute('data-endClassName') || ele.className);
			ele.className = ele.getAttribute('data-endClassName') + ' ' + a[1];
			ele.style[getHumpCssName('animation-duration')] = a[2];
			ele.style[getHumpCssName('animation-delay')] = a[3] || 0;
			ele.style[getHumpCssName('animation-fill-mode')] = "both";
			ele.style[getHumpCssName('animation-iteration-count')] = parseFloat(a[4]) ? a[4] : 'infinite';
			ele.style[getHumpCssName('animation-play-state')] = 'running';
		},
		_ele_animation_end_event_fn : function(){
			this._endFn = null;
			delete this._endFn;
		},
		_actionOut : function(ele){
			//执行单个元素的 移出 动画
			var _self = this;
			var a = ele.getAttribute('data-animationOut');
			if(!(a && (a = a.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?/i)) && a.length >= 3)){
				return;
			}
			ele.addEventListener(ANIMATION_END_NAME, this._ele_animation_end_event_fn, null);
			ele._endFn = this._ele_animation_end_event_fn;

			ele.style.display = '';
			ele.setAttribute('data-endClassName', ele.getAttribute('data-endClassName') || ele.className);
			ele.className = ele.getAttribute('data-endClassName') + ' ' + a[1];
			ele.style[getHumpCssName('animation-duration')] = a[2];
			ele.style[getHumpCssName('animation-delay')] = a[3] || 0;
			ele.style[getHumpCssName('animation-fill-mode')] = "forwards";
			ele.style[getHumpCssName('animation-iteration-count')] = 1;
			ele.style[getHumpCssName('animation-play-state')] = 'running';

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
			this.auido_bg.setVolume(80);
			this.mute = false;
			removeClass(Q('.sound'), 's_off');
			addClass(Q('.sound'), 's_on');
			this.auido_bg.play();
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

	var host = 'http://microblog.people.com.cn';
	var iOS = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
	
	var isWIFI = navigator.userAgent.indexOf('NetType/WIFI') !== -1;
	var isWX =  navigator.userAgent.indexOf('Messenger') !== -1;
	var isQQ = navigator.userAgent.indexOf(' QQ/') !== -1;
	//语言包
	var _LANG = window['LANG'] || {};

	if(isWX){
		if(location.host.indexOf('.people.') === -1){
			location.href = 'http://microblog.people.com.cn/h5/chunjie';
			return;
		};
	};
	var viewWidth = document.body.clientWidth;
	if(viewWidth == 0){
		if(window['__st'] != 1){
			window['__st'] = 1
			setTimeout(arguments.callee, 200);
			return;
		};
	};
	var s = viewWidth / 640;

	//通过字体控制布局比例
	document.documentElement.style.fontSize = 32 * s + 'px';

	document.body.style.width = viewWidth + 'px';
	var imgUrl = '',
		imgMoveSum = 0;
	I('loading').style.height = document.documentElement.clientHeight + 'px';
	window['__loadData'] = function(data){
		I('loading').style.display = 'none';
		I('previewPage').style.display = 'block';
		player.preload(data);
	};
	var glodImg = new Image(), blackImg = new Image();
	
	var player = {
		wordList : [],
		word : null,
		imgMoveSum : 0,
		imgUrl : '',
		color : '',
		index : 0,
		id : '',
		zfTxt : [{
			"t": '猴年大吉',
			"c": '新年大吉大利、百無禁忌、五福臨門、富貴吉祥、橫財就手、財運亨通、步步高升、生意興隆、東成西就、恭喜發財！'
		},{
			"t": '猴年如猴',
			"c": '猴年长得猴美猴美的，挣得猴多猴多的，心情猴好猴好的，运气猴顺猴顺的，睡觉猴香猴香的，爱情猴甜猴甜的，总之，一切都猴蜜猴蜜的！'
		},{
			"t": '猴年事业',
			"c": '位高权重责任轻，事少钱多离家近，每天睡到自然醒，别人加班你加薪，领钱数得手抽筋，出差旅游任我行。猴年大吉祥！'
		},{
			"t": '一切顺心',
			"c": '工作舒心，薪水合心，被窝暖心，朋友知心，爱人同心，一切都顺心，永远都开心，事事都称心！'
		},{
			"t": '朋友祝福',
			"c": '在新的一年开启新的希望，新的空白承载新的梦想。朋友拂去岁月之尘，让欢笑和泪水，爱与哀愁在心中凝成一颗厚重晶莹的琥珀停留。祝最好的朋友新年快乐！'
		},{
			"t": '猴年祝福',
			"c": '猴年心情如烟花般灿烂，事业如星光般闪耀，爱情如瑞雪般纯洁，生活如霞光般温暖，家庭如祝福般美满！猴年快乐！'
		},{
			"t": '十全十美',
			"c": '猴年一而再再而三，事事如意，五福临门，六六大顺，七彩生活，八面玲珑，久盛不衰，十全十美，百年好合，千禧之初，万贯家财！'
		},{
			"t": '我要祝福你',
			"c": '运气追着你，美事跟着你，金钱贴着你，贵人帮助你，祸事躲着你，小人绕着你，爱人念着你，家人挂着你，上天保佑你，我在祝福你。新年快乐！'
		}],
		init : function(){
			var _self = this, dataUrl;

			//http://i0.peopleurl.cn/nmsgimage/wx/2015021015/2015021015142355496908576691.txt
			//http://i0.peopleurl.cn/nmsgimage/wx/2015021016/2015021016142355676441023501.txt
			// http://i0.peopleurl.cn/nmsgimage/wx/2016012916/2016012916145405500171046811.txt

			var id = location.href.match(/\/2016cj_(\d+)_(\d+)_([\w~]*)($|\?)/);
			// id = ['', '2', '1', 'abc'];
			if(id){
				this.load({
					"type" : 'text',
					"classType" : id[1],
					"t" : this.zfTxt[parseInt(id[2])]["c"],
					"username" : unescape(id[3].replace(/~/g, '%'))
				});
				I('loading').style.display = 'none';
				I('previewPage').style.display = 'block';
				return;
			};

			id = location.href.match(/\/(\d+)($|\?)/);
			
			// id = ['','2015021016142355676441023501'];

			if(id){
				this.id = id[1];
				dataUrl = 'http://i0.peopleurl.cn/nmsgimage/wx/' + id[1].substr(0, 10) + '/' + id[1] + '.txt';
				var script = document.createElement('script');
				script.src = dataUrl;
				document.body.insertBefore(script, document.body.firstChild);
			}else{
				location.replace('http://microblog.people.com.cn/h5/chunjie');
			};
		},
		preload : function(data){
			data["type"] = data["type"] || (data["list"] && data["list"].length ? 'paper' : 'text');

			// 寻找有没有使用图片笔色，有则加载笔的图片后再load
			var _self = this,
				fn = function(){
					this._l = 0;
					if(!blackImg._l && !glodImg._l){ //载入完成
						_self.load(data);
					}
			};
			if(data["type"] == 'paper'){
				for (var i = 0; i < data["list"].length; i++) {
					for (var j = 0; j < data["list"][i]["p"].length; j++) {
						if(data["list"][i]["p"][j]["c"] == 'black'){
							blackImg._l = 1;
						};
						if(data["list"][i]["p"][j]["c"] == 'glod'){
							glodImg._l = 1;
						};
					};
				};
				if(!blackImg._l && !glodImg._l){
					this.load(data);
					return;
				};
				if(blackImg._l){
					blackImg.onload = fn;
					blackImg.src = window["blackImgSrc"] || 'http://bbs1.people.com.cn/support/h5/chunjie/images/black.png';
				}
				if(glodImg._l){
					glodImg.onload = fn;
					glodImg.src = window["glodImgSrc"] || 'http://bbs1.people.com.cn/support/h5/chunjie/images/glod.png';
				};
			}else{
				this.load(data);
			};
		},
		load : function(data){
			var template = [
				'<div class="bg"></div>' +
		'<div class="titleFrame" data-animationIn="fadeInDown 1s 3.1s"></div>' +
		'<div class="title" data-animationIn="fadeInDown 1s 1s" data-animationOut="titleToFrame 1s 1.3s"></div>' +
		'<div class="item_01" data-animationIn="bounceIn 1s 0" data-animationOut="opacityOut 1s 2.2s"></div>' +
		'<div class="item_02" data-animationIn="monkeyIn 0.6s 2s" data-animationOut="opacityOut 1s 0.6s"></div>',
				'<div class="bg"></div>' +
		'<div class="titleFrame" data-animationIn="fadeInDown 1s 3.1s"></div>' +
		'<div class="item_01" data-animationIn="rotationIn 1.5s 0" data-animationOut="opacityOut 1s 2.2s"></div>' +
		'<div class="title" data-animationIn="fadeInDown 1s 1.5s" data-animationOut="opacityOut 1s 1.3s"></div>' +
		'<div class="item_02" data-animationIn="fadeIn 1s 2s" data-animationOut="opacityOut 1s 1s"></div>',
				'<div class="titleFrame" data-animationIn="fadeInDown 1s 3.1s"></div>' +
		'<div class="title" data-animationIn="fadeInDown 1s 1s" data-animationOut="fadeOut 1s 1.3s"></div>' +
		'<div class="item_02" data-animationIn="fadeInLeft 1s 1.5s"></div>' +
		'<div class="item_03" data-animationIn="fadeInRight 1s 1s"></div>' +
		'<div class="item_01" data-animationIn="zoomIn 1s 0" data-animationOut="opacityOut 1s 2.2s"></div>',
				'<div class="titleFrame" data-animationIn="fadeInDown 1s 3.1s"></div>' +
		'<div class="title" data-animationIn="fadeInDown 1s 1s" data-animationOut="fadeOut 1s 1.2s"></div>' +
		'<div class="item_01" data-animationIn="fadeIn 1.5s 0" data-animationOut="opacityOut 1s 2.2s"></div>' +
		'<div class="item_02" data-animationIn="bounceInDown 1s 1.7s"></div>'
			];
			window.scrollTo(0,0);

			var imgUrl = data["img"] || '';
			var content = decodeURIComponent(data["t"] || '').replace(/</g, '&lt;');
			var username = decodeURIComponent(data["username"] || '').replace(/</g, '&lt;');
			var word;

			var blackList = /(习近平|近平习|习进平|李克强|王岐山|张高丽|张德江|俞正声|李源潮|胡锦涛|温家宝|朱镕基|江泽民|李鹏|毛主席|毛泽东|周总理|周恩来|邓小平|刘少奇|李瑞环|胡耀邦|叶剑英|赵紫阳|华国锋|叶剑英|李先念|周永康|薄熙来)/;
			if(blackList.test(username.replace(/(\s|_|~|　|\|)/g, ''))){
				username = '';
			};

			var v = parseInt(data["classType"]) || 1;

			if(v < 0 || v > template.length){
				v = 1;
			};
			
			var html = '<div class="globalPackage"><div class="sound s_off"></div></div><div class="scenery page_' + v + '">' + template[v-1] + (data["type"] == 'text' ? ('<div class="u_txt" data-animationIn="fadeIn 1s 3.2s"><div class="ut_cont">' + username + '祝您：<br>' + content.replace(/\n+/g, '<br>') + '</div></div>') : '<div class="canvasCont" data-animationIn="fadeIn 1s 3.2s"><div class="canvasList"></div></div>' ) + '<div class="footer" data-animationIn="fadeInUp 1s 1s" data-animation="shine 2s 0 1"><div class="logo"></div></div><div class="toEditbtn_c" data-animationIn="fadeIn 1s 3.2s">' + (isWX?'<a href="http://microblog.people.com.cn/wx/2016cj" style="margin-right:2rem;" class="btn_01"><span class="icon_2">猴年抽大奖</span></a>':'') + '<a href="http://microblog.people.com.cn/h5/chunjie'+ (data["type"]=='text'?'?t=1':'') +'" class="btn_01"><span class="icon_1">我也做一个</span></a></div></div>';
			Q('#previewPage .slideshow').innerHTML = html;
			var prList = [
				['bg_1.png', 'cj_m_02.png', 'cj_m_04.png', 'cj_m_06.png', 'cj_m_05.png', 'cj_m_07.png'],
				['bg_2.png', 'bg_2_c.png', 'cj_m_14.png', 'cj_m_13.png', 'cj_m_15.png', 'cj_m_16.png'],
				['bg_3_c.png', 'bg_3.png', 'cj_m_17.png', 'cj_m_20.png', 'cj_m_18.png', 'cj_m_19.png', 'cj_m_21.png'],
				['bg_4.jpg', 'cj_m_22.png', 'cj_m_23.jpg', 'cj_m_24.png', 'cj_m_25.png']
			];
			var preload = prList[v - 1];
			if(preload && preload.length){
				for (var i = 0; i < preload.length; i++) {
					preload[i] = 'http://i0.peopleurl.cn/microblog-v3/h5/chunjie/images/' + preload[i]; //图片路径
				};
			}
			scenery.init('#previewPage .slideshow', preload);
			scenery.setSound('sound.mp3');
			
			if(window['setShareData']){
				window['setShareData'](v, data["type"], imgUrl);
			};

			if(data["type"] == 'paper'){
				this.listBox = Q('.canvasList');
				
				//修正android第一个全黑的bug
				if(isAndroid){
					word = new WordArea();
					word = new WordArea();
					word = new WordArea();
				};

				var mp = 30 * s * 0.81967, max = 100 * s * 0.81967, temp;

				for (var i = 0; i < data["list"].length; i++) {
					word = new WordArea();
					this.listBox.appendChild(word.ele);
					word.index = this.wordList.length;
					this.wordList.push(word);

					word.paper.setPenmanship(data["list"][i]);
					word.paper.recovery();

					if(data["list"].length > 1){
						if(i != 0 && this.wordList[i].paper.paddingTop > mp){
							temp = this.wordList[i].paper.paddingTop - mp;
							this.wordList[i].ele.style.marginTop = '-' + (temp>max?max:temp) + 'px';
						}else{
							this.wordList[i].ele.style.marginTop = 0;
						};
						if(i < data["list"].length - 1 && this.wordList[i].paper.paddingBottom > mp){
							temp = this.wordList[i].paper.paddingBottom - mp;
							this.wordList[i].ele.style.marginBottom = '-' + (temp>max?max:temp) + 'px';
						}else{
							this.wordList[i].ele.style.marginBottom = 0;
						};
					}else{
						this.wordList[i].ele.style.marginTop = 0;
						this.wordList[i].ele.style.marginBottom = 0;
					}
				};
			}

			if(readCookie('_tempShow') == '1'){
				showShare();
				writeCookie('_tempShow', 0, 1, 'people.com.cn;path=/');
			};
		}
	};
	
	function initPage(){
		player.init();
	};
	function showShare(str){
		if(!isWX && !isQQ){
			Q('#shareAlert').innerHTML = '<div class="othersShare">分享：<a href="javascript:void(0)" onclick="shareSina()"><img src="/microblog-v3/2014subject/1216_oneword/images/sina.png"></a> <a href="javascript:void(0)" onclick="sharePeople()"><img src="/microblog-v3/2014subject/1216_oneword/images/people.png"></a> <a href="javascript:void(0)" onclick="shareTencent()"><img src="/microblog-v3/2014subject/1216_oneword/images/tencent.png"></a></div>';
		}else{
			Q('#shareAlert').innerHTML = '<div class="shareArr"></div><div class="shareIcon"></div>';
		};
		Q('#shareAlert').style.display = 'block';
		setTimeout(function(){
			Q('#shareAlert').style.display = 'none';
		}, 10000);
	};
	function showMessage(str){
		I('promptLayer').style.display = 'block';
		I('promptLayer').innerHTML = str;
	};
	function hideMessage(){
		I('promptLayer').style.display = 'none';
	};
	
	if(window.console && window.console.log){
		console.log('Copyright by people.cn');
	};
	//写字区
	function WordArea(){
		var _self = this;
		var viewWidth = document.body.clientWidth;
		var s = viewWidth / 640;

		this.ele = document.createElement('div');
		this.ele.className = 'canvasShow';
		this.ele.innerHTML = '<div class="canvas"></div><div class="cvsBtn" style="display:block;padding-top:3.5rem;"><a class="btn_02" href="javascript:void(0)">播放</a></div>';

		var cvs = document.createElement('canvas');
		//cvs.className = 'canvas';
		Q('.canvas', this.ele).appendChild(cvs);
		cvs.width = 610 * s;
		cvs.height = 610 * s;
		this.paper = new Paper(cvs);

		this.paper.fontWidth = viewWidth;
		this.btnBox = Q('.cvsBtn', this.ele);
		var btns = QA('a', this.btnBox);
		this.btn_replay = btns[0];

		
		this.btn_replay.onclick = function(){
			_self.paper.replay();
		};
		
	};
	WordArea.prototype = {
		toStatic : function(){
			if(editor.wordList.length > 1 && this.paper.moveSum < 5){
				this.del(1);
				editor.remove(this.index);
				return;
			};
			this.btnBox.style.display = 'block';
			this.paper.setDisabled(true);
			this.word = null;
		}
	};

	//Paper
	function Paper(canvas){
		if(canvas.nodeType){//判断结点类型
			this.canvas = canvas;
		}else if(typeof canvas == 'string') {
			this.canvas = Q(canvas);
		}else{
			return;
		}
		this.init();
		this.penmanship = [];//笔迹堆栈
		this.repeatQueue = [];//重做堆栈
	};
	Paper.prototype = {
		lineWidth : 1,
		color : 'rgba(0,0,0, 1)',
		penSize : 8,
		fontWidth : 320,
		moveSum : 0,
		stroke : null, //当前笔画
		status : 'show',
		init: function() {
			var _self = this;
			if (!this.canvas.getContext) { //判断是否支持Canvas
				return;
			};

			this.bgCanvas = document.createElement('canvas');
			this.bgCanvas.width = this.canvas.width;
			this.bgCanvas.height = this.canvas.height;

			this.canvas.style.position = 'absolute';
			this.canvas.style.left = 0;
			this.canvas.style.top = 0;
			this.canvas.parentNode.appendChild(this.bgCanvas);

			this.ctx = this.canvas.getContext('2d');
			this.bgCtx = this.bgCanvas.getContext('2d');

			//创建画笔类型
			if(glodImg.src){
				this.createPat('glodPat', glodImg, 150);
			};
			if(blackImg.src){
				this.createPat('blackPat', blackImg, 150);
			};

			// this.bgImg.onload = function(){
			// 	if(_self.bgImg.complete){
			// 		_self.showViewImg();
			// 	};
			// };

			// this.bgImg.src = this.bg;
		},
		moveBegin: function(x, y, type) {
			var _self = this;

			window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty(); //清除文本的选中

			this.ctx.save();
			this.ctx.moveTo(x, y);
			this.preDot = null;

			this.moveQueue = [];
			this.firstMove = 0;
			this.lineWidth = this.penSize / 2 * ( this.fontWidth / 320 );

			this.clearPaint();
			this.moving(x, y);
		},
		moving : function(x, y){
			var dot,
				c = 0;

			if(this.moveQueue.length){ //计算与上一点的距离
				dot = this.moveQueue[this.moveQueue.length - 1];

				c = Math.sqrt((dot.x - x) * (dot.x - x) + (dot.y - y) * (dot.y - y));

				if(c == 0){
					return;
				}
			};
			this.moveSum ++;

			// iOS下笔优化
			if(iOS && !this.firstMove && this.moveQueue.length == 2 && c * 4 < this.moveQueue[1].c){
				this.moveQueue[0].x -= (this.moveQueue[0].x - this.moveQueue[1].x) * (2/3);
				this.moveQueue[0].y -= (this.moveQueue[0].y - this.moveQueue[1].y) * (2/3);
				//console.log('修正c:' + this.moveQueue[1].c + ', c=' + (this.moveQueue[1].c * (2/3)));
				this.moveQueue[1].c /= this.moveQueue[1].c * (2/3);
			};
			dot = {x:x, y:y, c:c};

			//放入队列，缓执行
			this.moveQueue.push(dot);
			if(this.moveQueue.length >= 3){
				dot = this.moveQueue.shift();
				this.actionPaint(dot);
			};
		},
		actionPaint: function(dot, pw) {
			var x = dot.x,
					y = dot.y,
				c = dot.c;

			if(this.preDot && c === 0){
				return;
			};
			var now = new Date();
			this.nextDot = this.moveQueue.length ? this.moveQueue[0] : null;

			if(c){
				this.ctx.moveTo(this.preDot.x, this.preDot.y);

				// Android下笔优化
				var xzc = 0;
				if(!this.firstMove && this.nextDot && c > this.nextDot.c * 3){ //防止安卓首帧跳跃
					//console.log('修正c:' + c + ', c=' + (c/4));
					c = c / 4;
					xzc = 1;
				};
				this.firstMove = 1;

				//this.testStr += '(' + Math.round(c) + ':' + this.nextDot.c + '), ';
				var bw = 320;
					bs = this.penSize * ( this.fontWidth / bw );
				if(pw){
					pw = pw;
				}else if(c < 1/bw * this.fontWidth){
					pw = bs * 1.625;
				}else if(c < 2/bw * this.fontWidth){
					pw = bs * 1.375;
				}else if(c < 3/bw * this.fontWidth){
					pw = bs * 1.25;
				}else if(c < 5/bw * this.fontWidth){
					pw = bs * 1.125;
				}else if(c < 7/bw * this.fontWidth){
					pw = bs;
				}else if(c < 9/bw * this.fontWidth){
					pw = bs * 0.875;
				}else if(c < 11/bw * this.fontWidth){
					pw = bs * 0.75;
				}else if(c < 15/bw * this.fontWidth){
					pw = bs * 0.625;
				}else if(c < 20/bw * this.fontWidth){
					pw = bs * 0.5;
				}else{
					pw = bs * 0.375;
				}
				this.toLW = pw;

				if(xzc){
					for (var i = 1; i <= 3; i++) {
						this.paintDot(x + (this.preDot.x - x) * (i/3), y + (this.preDot.y - y) * (i/3), c);
					};
				}
			};

			this.paintDot(x, y, c);
			
			this.preDot = dot;
		},
		moveEndFn: function() {

			this.ctx.lineWidth = this.ctx.lineWidth - 1;
			var dot;

			while(this.moveQueue.length){
				dot = this.moveQueue.shift();
				this.actionPaint(dot, this.penSize * ( this.fontWidth / 320 ) / 8);
			}
			
			//刷新投影
			this.showToCanvas(true);

			// document.getElementById('log').innerHTML = this.testStr;
		},
		_clearQueue : null,
		clearPaper : function(){
			if(this.status !== 'show'){
				return;
			};
			this.preDot = null;
			this.moveSum = 0;

			if(this.penmanship.length){
				//清空重做堆栈
				//debugger
				this._clearQueue = this.penmanship;

				//this.repeatQueue.push(this.penmanship);
			};
			this.penmanship = [];
			

			this.ctx.beginPath();
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.bgCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.closePath();

			if(typeof this.onchange == 'function'){
				this.onchange();
			};
		},
		replay : function(){
			if(this.penmanship.length == 0){
				return;
			};
			if(this.status == 'play'){
				this._stop();
				this.recovery();
				return;
			};
			this.hideViewImg();
			this.oldStatus = this.status;
			this.status = 'play';

			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.bgCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();

			this.playPos = 0;
			this._play();
		},
		showToCanvas : function(bg){ //显示
			if(this.isRecovery){
				return;
			}
			
			//投影
			if(bg){
				this.bgCtx.clearRect(0, 0, this.canvas.width, this.canvas.height); //显示的canvas
				var imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
				for (var i = 0; i < imgData.data.length; i+=4) {
					if(imgData.data[i + 3] != 0){
						// 投影颜色
						imgData.data[i] = 159;
						imgData.data[i+1] = 17;
						imgData.data[i+2] = 13;
						imgData.data[i+3] = Math.round( imgData.data[i+3] * 0.75 ); //A:75%
					}
				};
				this.bgCtx.putImageData(imgData, -5 * s, 5 * s);
			};
			//this.showCtx.drawImage(this.bgCanvas, 0, 0, this.canvas.width, this.canvas.height);
		},
		_stop : function(){
			this.status = this.oldStatus;
			clearTimeout(this._playTimer);
		},
		_play : function(){
			var _self = this;
			var _color = this.color;
			var _penSize = this.penSize;
			var stroke = this.penmanship[this.playPos];
			var time = 0;
			if(!stroke || this.status != 'play'){
				return;
			}
			this.color = stroke['c'];
			this.penSize = stroke["p"];

			this.moveBegin(stroke['d'][0]['x'], stroke['d'][0]['y']);
			if(stroke['d'].length == 1){
				_self.moveEndFn();
				strokeEnd();
			}
			
			var p = 1, dot, time = 0; //i < stroke.d.length; ) {
			
			dot = stroke['d'][p];

			(function(){
				if(!dot){return};
				_self.moving(dot['x'], dot['y']);
				
				if(p >= stroke['d'].length - 1){
					_self.moveEndFn();
					strokeEnd();
				};
				p ++;
				dot = stroke['d'][p];
				
				if(!dot){return};
				clearTimeout(_self._playTimer);
				_self._playTimer = setTimeout(arguments.callee, dot['t'] - time);
				time = dot['t'];
			})();
			
			this.playPos ++;
			function strokeEnd(){
				_self.color = _color;
				_self.penSize = _penSize;
				if(_self.playPos >= _self.penmanship.length){
					_self.status = _self.oldStatus;
					// _self.showViewImg();
					return;
				};
				clearTimeout(_self._playTimer);
				_self._playTimer = setTimeout(function(){
					_self._play();
				}, 300);
			};
		},
		recovery : function(){
			var _self = this;
			var _color = this.color;
			var _penSize = this.penSize;

			this.isRecovery = true;

			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.bgCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();

			this.playPos = 0;
			var stroke = this.penmanship[this.playPos];

			while(stroke){
				this.color = stroke['c'];
				this.penSize = stroke["p"];
				
				this.moveBegin(stroke['d'][0].x, stroke['d'][0].y);
				if(stroke['d'].length == 1){
					this.moveEndFn();
					strokeEnd();
				}
				for (var i = 1, p = 1; i < stroke['d'].length; i++) {

					var dot = stroke['d'][p];
					p ++;

					this.moving(dot.x, dot.y);
					//console.log(dot.x + ', ' + dot.y);
					if(p >= stroke['d'].length){
						this.moveEndFn();
						strokeEnd();
					}
					
				};
				this.playPos ++;
				stroke = this.penmanship[this.playPos];
			}
			
			this.isRecovery = false;
			this.showToCanvas(true);

			function strokeEnd(){
				_self.color = _color;
				_self.penSize = _penSize;
				// if(_self.playPos >= _self.penmanship.length - 1){
				// 	_self.showViewImg();
				// 	//_self.status = 'edit';
				// 	return;
				// };
			};
			this.surveyPadding();
		},
		// showViewImg : function(){
		// 	if(this.bgImg.complete && !this.viewImg){
		// 		this.viewImg = new Image();
		// 		this.viewImg.className = 'showImg';
		// 		this.canvas.parentNode.appendChild(this.viewImg);
		// 		// this.viewImg.src = this.getImgData('png', 610);
		// 	};
		// 	if(this.viewImg && this.status == 'show'){
		// 		this.viewImg.style.display = 'block';
		// 	};
		// },
		hideViewImg : function(){
			if(this.viewImg){
				this.viewImg.style.display = 'none';
			};
		},
		paintDot : function(x, y, c){
			var cX,
				cY,
				s = 8,
				c,
				toW = this.lineWidth;

			var pat = this.color;

			if(this["glodPat"] && this.color == 'glod'){
				pat = this["glodPat"];
			};

			if(this["blackPat"] && this.color == 'black'){
				pat = this["blackPat"];
			};

			//line
			this.ctx.fillStyle = pat;
			this.ctx.strokeStyle = pat;
			// this.ctx.shadowBlur = 1 * ( this.fontWidth / 320 );
			// this.ctx.shadowColor = this.color;
			if(this.preDot){ //上一次的点
				cX = this.preDot.x - x;
				cY = this.preDot.y - y;
				//c = Math.sqrt((this.preDotX - x) * (this.preDotX - x) + (this.preDotY - y) * (this.preDotY - y));
				s = Math.floor(Math.abs(c) / (this.lineWidth/3));
				if(s > 1){
					toW = this.lineWidth;
					for (var i = 0; i < s; i++) {
						toW -= ( (toW - this.toLW) / (s > 8? s : 8) );
					};
				}else{
					if(Math.abs( this.lineWidth - this.toLW) > this.penSize * ( this.fontWidth / 320 ) * 0.025){
						toW = this.lineWidth - ( (this.lineWidth - this.toLW) / 8 );
					};
				};

				var asin1 = this.lineWidth * Math.sin(Math.atan((y-this.preDot.y)/(x-this.preDot.x)));
				var acos1 = this.lineWidth * Math.cos(Math.atan((y-this.preDot.y)/(x-this.preDot.x)));
				var asin2 = toW * Math.sin(Math.atan((y-this.preDot.y)/(x-this.preDot.x)));
				var acos2 = toW * Math.cos(Math.atan((y-this.preDot.y)/(x-this.preDot.x)));

				var x1 = this.preDot.x+asin1;
				var y1 = this.preDot.y-acos1;
				var x2 = this.preDot.x-asin1;
				var y2 = this.preDot.y+acos1;
				var x3 = x+asin2;
				var y3 = y-acos2;
				var x4 = x-asin2;
				var y4 = y+acos2;

				// this.ctx.lineWidth = 1;
				// this.ctx.lineCap = "round";
				// this.ctx.lineJoin = "round";
				this.ctx.beginPath()
				this.ctx.moveTo(x1,y1);
				this.ctx.lineTo(x2,y2);
				
				this.ctx.lineTo(x4,y4);
				this.ctx.lineTo(x3,y3);
				this.ctx.fill();
				this.ctx.closePath();

				//this.ctx.stroke();
				this.ctx.fillStyle = pat;

				this.ctx.lineWidth = this.lineWidth = toW;
			};
			
			this.ctx.beginPath();
			this.ctx.lineWidth = this.lineWidth = toW;
			this.ctx.arc(x, y, this.lineWidth, 0, 2 * Math.PI);
			this.ctx.fill();
			//this.ctx.stroke();
			this.ctx.closePath();
		},
		setPenmanship : function(str){
			try{
				var data;
				if(typeof str == 'string'){
					data = eval('(' + str + ')');
				}else if(typeof str == 'object'){
					data = str;
				};
				var p = data['p'];
				var s = this.fontWidth / data['w'], dot;
				for(var i = 0; i < p.length; i++){
					p[i]['p'] = p[i]['p'] || 8; //默认笔粗细
					if(p[i]['d'].length % 3 != 0){
						console.log('数据格式错误!');
						return;
					};
					var ds = [];
					for (var j = 0; j < p[i]['d'].length; j+=3) {
						dot = {
							"x" : Math.round(p[i]['d'][j] * s * 10) / 10,
							"y" : Math.round(p[i]['d'][j + 1] * s * 10) / 10,
							"t" : p[i]['d'][j + 2]
						};
						ds.push(dot);
					};
					p[i]['d'] = ds;
				};
				this.penmanship = p;
				//this.recovery()
				if(typeof this.onchange == 'function'){
					this.onchange();
				};
			}catch(e){
				console.log('数据错误');
				console.log(e);
			}
		},
		paddingTop : 0,
		paddingBottom : 0,
		surveyPadding : function(){ //测量字的上下间距
			this.paddingTop = 0;
			this.paddingBottom = 0;
			var imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
			for (var i = 0; i < this.canvas.height; i++) {
				for (var j = 0; j < this.canvas.width; j++) {
					if(imgData.data[(i * this.canvas.height + j) * 4 + 3] > 0){
						this.paddingTop = i - 1;
						i = this.canvas.height;
						break;
					}
				};
			};
			
			for (var i = this.canvas.height - 1; i >=0 ; i--) {
				for (var j = 0; j < this.canvas.width; j++) {
					if(imgData.data[(i * this.canvas.height + j) * 4 + 3] > 0){
						this.paddingBottom = this.canvas.height - i - 1;
						i = -1;
						break;
					}
				};
			};
		},
		clearPaint : function(){
			this.preDot = null;
		},
		addEvent : function(obj,eventType,func){if(obj.attachEvent){obj.attachEvent("on" + eventType,func);}else{obj.addEventListener(eventType,func,false)}},
		removeEvent : function(obj,eventType,func){
		if(obj.detachEvent){obj.detachEvent("on" + eventType,func)}else{obj.removeEventListener(eventType,func,false)}
		},
		// getImgData : function(type, width, q){
		// 	return toImageData(type, q, this, width || 610);
		// },
		// getSmallImgData : function(type, q){
		// 	return toImageData(type, q, this, 80);
		// },
		createPat : function(name, img, size){
			size = Math.round(size * s);

			var cc = document.createElement('canvas');
			cc.width = cc.height = size;
			var ctx = cc.getContext('2d');
			ctx.drawImage(img, 0, 0, size, size);
			this[name] = this.ctx.createPattern(cc, 'repeat');
		}
	};
	// function toImageData(type, q, _self, size){
	// 	if(!_self.bgImg.complete){
	// 		return '';
	// 	};
	// 	size = size || 610;

	// 	type = type || 'png';

	// 	q = q || 0.7;
	// 	var cc = document.createElement('canvas');
	// 	cc.width = cc.height = size;

	// 	var canvas, cvs1, cvs2, ctx1, ctx2, w = _self.canvas.width, h = _self.canvas.height;

	// 	if(w / size > 1.8){ //阶梯缩小，避免锯齿
	// 		cvs1 = document.createElement('canvas');
	// 		cvs2 = document.createElement('canvas');
	// 		ctx1 = cvs1.getContext('2d');
	// 		ctx2 = cvs2.getContext('2d');
	// 		cvs1.width = w;
	// 		cvs1.height = h;
	// 		ctx1.drawImage(_self.canvas, 0, 0, w, h);

	// 		while(w / size > 1.8){
	// 			w = Math.round(w * 0.6);
	// 			h = Math.round(h * 0.6);
				
	// 			cvs2.width = w;
	// 			cvs2.height = h;
	// 			ctx2.drawImage(cvs1, 0, 0, w, h);

	// 			cvs1.width = w;
	// 			cvs1.height = h;
	// 			ctx1.drawImage(cvs2, 0, 0, w, h);
	// 		}
	// 		canvas = cvs1;
	// 	}else{
	// 		canvas = _self.canvas;
	// 	}

	// 	var ctx = cc.getContext('2d');
	// 	ctx.drawImage(_self.bgImg, 0, 0, size, size);
	// 	ctx.drawImage(canvas, 0, 0, size, size);
		
	// 	return cc.toDataURL('image/' + type, q);
	// };
	initPage();
})();

