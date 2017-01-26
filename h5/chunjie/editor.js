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
	var readCookie = function(l){var i="",I=l+"=";if(document.cookie.length>0){var offset=document.cookie.indexOf(I);if(offset!=-1){offset+=I.length;var end=document.cookie.indexOf(";",offset);if(end==-1)end=document.cookie.length;i=document.cookie.substring(offset,end)}};return unescape(i)},
		writeCookie = function(O,o,l,I){var i="",c="";if(l!=null){i=new Date((new Date).getTime()+l*3600000);i="; expires="+i.toGMTString()};if(I!=null){c=";domain="+I};document.cookie=O+"="+escape(o)+i+c};
	var host = 'http://wx.people.com.cn';
	var iOS = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
	var isAndroid = !!navigator.userAgent.match(/android/i);
	
	var isWIFI = navigator.userAgent.indexOf('NetType/WIFI') !== -1;
	var isWX = navigator.userAgent.indexOf('Messenger') !== -1;
	var isQQ = navigator.userAgent.indexOf('QQ') !== -1 && navigator.userAgent.indexOf('QQBrowser') === -1;
	//语言包
	var _LANG = window['LANG'] || {};

	if(isWX){
		if(location.host.indexOf('.people.') === -1){
			location.href = 'http://wx.people.com.cn/h5/chunjie';
			return;
		};
	};
	var viewWidth = document.body.clientWidth;
	var s = viewWidth / 640;

	//通过字体控制布局比例
	document.documentElement.style.fontSize = 32 * s + 'px';

	document.body.style.width = viewWidth + 'px';

	Q('#editorPage').style.minHeight = document.documentElement.clientHeight + 'px';
	Q('#classPage').style.minHeight = document.documentElement.clientHeight + 'px';
	I('loading').style.display = 'none';

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

		}
	};

	var editor = {
		type : 'paper',
		classType : 1,
		username : '',
		wordList : [],
		word : null,
		imgUrl : '',
		imgId : '',
		color : 'black',
		penSize : 8,
		index : 0,
		content : '',
		signTxt : _LANG['c1'] || '群发信息没诚意，手写祝福显真情。来看看我对你说了啥。',
		signIsDeft : true,
		pageIndex : 0,
		zfTxt : [{
			"t": '猴年大吉',
			"c": '新年大吉大利、百無禁忌、五福臨門、富貴吉祥、橫財就手、財運亨通、步步高升、生意興隆、東成西就、恭喜發財！'
		},{
			"t": '猴年如猴',
			"c": '猴年长得猴美猴美的，挣得猴多猴多的，心情猴好猴好的，运气猴顺猴顺的，睡觉猴香猴香的，爱情猴甜猴甜的，总之，一切都猴蜜猴蜜的！'
		},{
			"t": '猴年事业',
			"c": '位高权重责任轻，事少钱多离家近，每天睡到自然醒，别人加班你加薪，领钱数得手抽筋，山南海北任我行。猴年大吉祥！'
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
			var _self = this;
			this.listBox = Q('.canvasList');

			//tags
			Q('#paperTag').onclick = function(){
				_self.type = 'paper';
				Q('#paperTag').className = 'selected';
				Q('#paperCont').style.display = 'block';
				Q('#textTag').className = '';
				Q('#textCont').style.display = 'none';
			};
			Q('#textTag').onclick = function(){
				_self.type = 'text';
				Q('#paperTag').className = '';
				Q('#paperCont').style.display = 'none';
				Q('#textTag').className = 'selected';
				Q('#textCont').style.display = 'block';
			};
			if(location.search.match(/(\?|&)t=1(\&|$)/)){
				Q('#textTag').onclick();
			}

			//username
			Q('.nameInput input').onfocus = function(){
				if(this.value == '您的姓名？'){
					this.value = '';
				}
			};
			var blackList = /(习近平|近平习|习进平|李克强|王岐山|张高丽|张德江|俞正声|李源潮|胡锦涛|温家宝|朱镕基|江泽民|李鹏|毛主席|毛泽东|周总理|周恩来|邓小平|刘少奇|李瑞环|胡耀邦|叶剑英|赵紫阳|华国锋|叶剑英|李先念|周永康|薄熙来)/;
			Q('.nameInput input').onblur = function(){
				var name = trim(this.value);
				if(blackList.test(name.replace(/(\s|_|~|　|\|)/g, ''))){
					name = '';
				};
				if(name == ''){
					this.value = '您的姓名？';
					Q('.nameCont .monkey').className = 'monkey';
					_self.username = '';
				}else{
					Q('.nameCont .monkey').className = 'monkey monkeyS';
					_self.username = name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
				};
			};

			//祝福选项
			var zf = this.zfTxt;
			var html = '';
			for (var i = 0; i < zf.length; i++) {
				html += '<dd data-value="' + i + '"><span>' + zf[i]["t"] + '</span></dd>';
			};
			Q('#textCont dl').innerHTML = html;
			var dd = QA('#textCont dd');
			var clickFn = function(){
				var s = parseInt(this.getAttribute('data-value')) || 0;
				for (var i = 0; i < dd.length; i++) {
					dd[i].className = '';
				};
				this.className = 'selected';
				_self.textId = s;
				Q('#textCont textarea').value = zf[s]["c"];
			};
			for (var i = 0; i < dd.length; i++) {
				dd[i].onclick = clickFn;
			};
			//选中1
			Q('#textCont dd').click();

			I('clear_btn').onclick = function(){
				_self.word.paper.clearPaper();
			};

			//选择模板
			var ct = QA('#classPage dd img');

			var clickFn = function(){
				var v = this.getAttribute('data-value');
				if(v){
					_self.toPreview(v); //预览
				};
			};
			for (var i = 0; i < ct.length; i++) {
				ct[i].onclick = clickFn;
			};

			this.btnBox = I('btnBox');
			this.undo_btn = I('undo_btn');
			this.repeat_btn = I('repeat_btn');
			this.pubBox = I('pubBox');
			this.completeBtn = I('completeBtn');

			this.undo_btn.onmousedown = function(){
				_self.word.paper.undo();
				if(_self.word.paper.repeatActi()){
					_self.showRepeatBtn();
				};
			};
			this.repeat_btn.onmousedown = function(){
				_self.word.paper.repeat();
			};

			//color
			var pStatus = 0;
			var tagPalette = I('palette');
			var tagPenSize = I('penSize');
			this.tagPSList = QA('#penSize li');

			this.penColor = I('penColor');
			I('btnPenColor').onclick = function(e){
				if(pStatus){
					pStatus = 0;
					tagPalette.style.display = 'none';
					tagPenSize.style.display = 'none';
				}else{
					pStatus = 1;
					tagPalette.style.display = 'block';
					tagPenSize.style.display = 'block';
				}
			};
			tagPalette.onclick = function(e){
				var li = e.target;
				if(li.tagName != 'LI'){return};
				_self.setColor(li.getAttribute('value'));
				pStatus = 0;
				tagPalette.style.display = 'none';
				tagPenSize.style.display = 'none';
			};
			tagPenSize.onclick = function(e){
				var li = e.target;
				if(li.tagName != 'LI'){return};
				_self.setPenSize(li.getAttribute('value'));
				pStatus = 0;
				tagPalette.style.display = 'none';
				tagPenSize.style.display = 'none';
			};

			I('nextPage_1').onclick = function(){
				_self.paperNextPage();
			};
			I('nextPage_2').onclick = function(){
				_self.textNextPage();
			};
			I('returnEdit').onclick = function(){
				_self.switchPage(Q('#editorPage') , Q('#classPage') , -1);
			};

			I('returnClass').onclick = function(){
				Q('#editorPage .canvasCont').appendChild(Q('.canvasList'));

				//_self.switchPage(Q('#classPage') , Q('#previewPage') , -1);
				
				Q('#classPage').style.display = 'block';
				Q('#previewPage').style.display = 'none';
			};

			//submit
			this.completeBtn.onclick = function(){
				_self.complete();
			};
			I('publicBtn').onclick = function(){
				_self.submit();
			};
			I('addWord').onclick = function(){
				_self.addWord();
			};

			this.addWord();
			
		},
		//预览
		toPreview : function(v){
			if(trim(Q(".nameInput input").value) == '您的姓名？'){
				Q('.nameCont .monkey').className = 'monkey';
				this.username = '';
			}else{
				Q('.nameCont .monkey').className = 'monkey monkeyS';
				this.username = trim(Q(".nameInput input").value.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
			};

			v = parseInt(v) || 1;
			var template = [
				'<div class="bg"></div>' +
		'<div class="titleFrame" data-animationIn="fadeInDown 1s 3.1s"></div>' +
		'<div class="item_01" data-animationIn="bounceIn 1s 0" data-animationOut="opacityOut 1s 2.2s"></div>',
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

			if(v < 0 || v > template.length){
				v = 1;
			};
			this.classType = v;
			var html = '<div class="scenery page_' + v + '">' + template[v-1] + (this.type == 'text' ? ('<div class="u_txt" data-animationIn="fadeIn 1s 3.6s"><div class="ut_cont">' + this.username + '祝您：<br>' + this.content.replace(/\n+/g, '<br>') + '</div></div>') : '<div class="canvasCont" data-animationIn="fadeIn 1s 3.6s"></div>' ) + '<div class="footer" data-animationIn="fadeInUp 1s 1s" data-animation="shine 2s 0 1"><div class="logo"></div></div>';
			html += '</div>'
			Q('#previewPage .slideshow').innerHTML = html;
			if(this.type == 'paper'){
				Q('#previewPage .canvasCont').appendChild(Q('.canvasList'));
			};
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
			scenery.init('#previewPage .slideshow');

			showMessage('生成预览...');

			setTimeout(function(){
				Q('#classPage').style.display = 'none';
				Q('#previewPage').style.display = 'block';
				hideMessage();
			}, 300);
			//this.switchPage(Q('#previewPage') , Q('#classPage') , 1);
		},
		paperNextPage : function(){
			if(this.wordList.length == 1 && this.wordList[0].paper.moveSum < 5){
				alert('不要这么心急，多少写点东西嘛！');
				return;
			};
			this.switchPage(Q('#classPage') , Q('#editorPage') , 1);
		},
		textNextPage : function(){
			if(trim(Q('#textCont textarea').value.length) < 5){
				alert('不要这么心急，多少写点东西嘛！');
				return;
			};
			this.content = trim(Q('#textCont textarea').value).replace(/</g, '&lt;').replace(/>/g, '&gt;');
			this.switchPage(Q('#classPage') , Q('#editorPage') , 1);
		},
		switchPage : function(tarPage, nowPage, f){
			var _self = this;
			window.scrollTo(0,0);
			f = f || 1; //方向
			var fn = function(){
				clearTimeout(_self._pageTranEndTimeout);
				this.removeEventListener(TRANSITION_END_NAME, fn, null);
				tarPage.style[getHumpCssName('transition')] = 'none';
				nowPage.style[getHumpCssName('transition')] = 'none';
				nowPage.style.display = 'none';
				nowPage.style.position = 'relative';
				tarPage.style.position = 'relative';
				tarPage.style.zIndex = 1;
			};
			this._pageTranEndTimeout = setTimeout(function(){
				fn.bind(tarPage);
			}, 500);
			tarPage.addEventListener(TRANSITION_END_NAME, fn, null);

			tarPage.style.position = 'absolute';
			tarPage.style[getHumpCssName('transition')] = 'none';
			tarPage.style[getHumpCssName('transform')] = "translateY(" + (f * document.documentElement.clientHeight) + "px)";
			tarPage.style[getHumpCssName('transform-origin')] = '50% 50%';
			tarPage.style.display = 'block';
			tarPage.style.zIndex = 200;

			nowPage.style.position = 'absolute';
			nowPage.style[getHumpCssName('transition')] = 'none';
			nowPage.style[getHumpCssName('transform')] = "translateY(0)";
			nowPage.style[getHumpCssName('transform-origin')] = '50% 50%';
			nowPage.style.display = 'block';

			
			setTimeout(function(){
				tarPage.style[getHumpCssName('transition')] = CSS_HEAD_NAME + 'transform' + ' 0.4s ease-out';
				tarPage.style[getHumpCssName('transform')] = "translateY(0px)";
				
				nowPage.style[getHumpCssName('transition')] = CSS_HEAD_NAME + 'transform' + ' 0.4s ease-out';
				nowPage.style[getHumpCssName('transform-origin')] = '50% ' + (f==1?'0':'100%');
				nowPage.style[getHumpCssName('transform')] = "scale(0.9)";
			
			}, 20);
		},
		firstAddWord : true,
		addWord : function(){
			if(this.word && this.word.paper.moveSum < 5){
				alert('这张纸上还没有写字哪，别浪费哟！');
				return;
			};
			var word = new WordArea();

			//修正android第一个全黑的bug
			if(this.firstAddWord && isAndroid){
				word = new WordArea();
				word = new WordArea();
				word = new WordArea();
				this.firstAddWord = false;
			};
			// if(this.wordList.length == 0 || this.index == this.wordList.length - 1){ //加在末尾
				this.listBox.appendChild(word.ele);
				word.index = this.wordList.length;
				this.wordList.push(word);
			// }else{//加在中间
			// 	var newList = [];
			// 	for (var i = 0; i < this.wordList.length; i++) {
			// 		this.wordList[i].index = newList.length;
			// 		newList.push(this.wordList[i]);

			// 		if(i == this.index){
			// 			word.index = newList.length;
			// 			this.listBox.insertBefore(word.ele, this.wordList[i + 1].ele);
			// 			newList.push(word);
			// 		};
			// 	};
			// 	this.wordList = newList;
			// };
			this.select(word.index);
		},
		select : function(idx){
			if(this.wordList[idx]){
				if(this.word){
					this.word.toStatic();
				};
				this.word = this.wordList[idx];
				
				this.word.ele.style.marginTop = 0;
				this.word.ele.style.marginBottom = 0;

				this.changeBtn();
				this.word.toEdit();
				if(idx == this.wordList.length - 1){
					this.word.ele.parentNode.appendChild(this.btnBox);
					this.pubBox.style.display = 'none';
				}else{
					this.word.ele.parentNode.insertBefore(this.btnBox, this.wordList[idx + 1].ele);
					this.pubBox.style.display = 'block';
				};
				this.btnBox.style.display = 'block';
				this.index = this.word.index;
				
				// this.setColor(this.word.paper.color);
				// this.setPenSize(this.word.paper.penSize);

				this.setColor(this.color);
				this.setPenSize(this.penSize);

				var y = this.word.ele.offsetTop;
				if(this.index == 0){
					y = 0;
				};
				this.scrollYTo(y, 300);
			};
		},
		remove : function(idx){
			if(this.wordList[idx]){
				var newList = [];
				if(this.word == this.wordList[idx]){
					this.word = null;
				};
				for (var i = 0; i < this.wordList.length; i++) {
					if(i != idx){
						this.wordList[i].index = newList.length;
						newList.push(this.wordList[i]);
					};
				};

				this.wordList = newList;
				// if(this.wordList.length == 1){
				// 	this.select(0);
				// };
				this.composition();
			};
		},
		complete : function(){
			if(this.word){
				// if(this.wordList.length <= 1 && this.word.paper.moveSum < 5){
				if(this.word.paper.moveSum < 5){
					alert('不要这么心急，多少写点东西嘛！');
					return;
				};
				this.btnBox.style.display = 'none';
				document.body.appendChild(this.btnBox);

				this.pubBox.style.display = 'block';
				this.word.toStatic();

				this.composition();
			};
		},
		composition : function(){ //排版
		 	//缩小上下间距
			var mp = 30 * s * 0.81967, max = 100 * s * 0.81967, temp;
			for (var i = 0; i < this.wordList.length; i++) {
				if(this.wordList.length > 1){
					if(i != 0 && this.wordList[i].paper.paddingTop > mp){
						temp = this.wordList[i].paper.paddingTop - mp;
						this.wordList[i].ele.style.marginTop = '-' + (temp>max?max:temp) + 'px';
					}else{
						this.wordList[i].ele.style.marginTop = 0;
					};
					if(i < this.wordList.length - 1 && this.wordList[i].paper.paddingBottom > mp){
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
		},
		changeBtn : function(){
			var _self = this;
			if(this.word && this.word.paper.undoActi()){
				removeClass(this.undo_btn, 'disabled');
			}else{
				addClass(this.undo_btn, 'disabled');
			};
			if(this.word && this.word.paper.repeatActi()){
				removeClass(this.repeat_btn, 'disabled');
				this.showRepeatBtn();
			}else{
				addClass(this.repeat_btn, 'disabled');
				clearTimeout(_self._repeat_timer);
				_self._repeat_timer = setTimeout(function(){
					_self.hideRepeatBtn();
				}, 3000);
			};
		},
		_repeat_timer : null,
		showRepeatBtn : function (){
			var _self = this;
			
			clearTimeout(this._repeat_timer);
			this._repeat_timer = setTimeout(function(){
				_self.hideRepeatBtn();
			}, 5000);
		},
		hideRepeatBtn : function(){
			clearTimeout(this._repeat_timer);
			this.repeat_btn.style.marginLeft = '0';
		},
		setColor : function(val){
			this.color = val;
			this.word.paper.color = val;
			var bg = val;
			if(bg == 'glod'){
				bg = 'url(' + ( window['glodImgSrc'] || 'http://wx.people.com.cn/microblog-v3/h5/chunjie/images/glod.png' ) + ')';
			}else if(bg == 'black'){
				bg = 'url(' + ( window['blackImgSrc'] || 'http://wx.people.com.cn/microblog-v3/h5/chunjie/images/black.png' ) + ')';
			};
			this.penColor.style.background = bg;
		},
		setPenSize : function(val){
			for (var i = 0; i < this.tagPSList.length; i++) {
				if(this.tagPSList[i].getAttribute('value') == val){
					this.tagPSList[i].className = 'selected';
					this.word.paper.penSize = parseInt(val);
					this.penSize = val;
					this.penColor.style.width = this.penColor.style.height = 0.2 + (parseInt(val) / 8 * 0.8) + 'em';
				}else{
					this.tagPSList[i].className = '';
				};
			};
		},
		submit : function(){
			var _self = this;
			//不用上传配置
			if(this.type == 'text' && this.content == this.zfTxt[this.textId]["c"]){
				writeCookie('_tempShow', 1, 1, 'people.com.cn;path=/');

				showMessage('请稍候...');

				setTimeout(function(){
					window.location.href = 'http://wx.people.com.cn/h5/chunjie/2016cj_' + _self.classType + '_' + _self.textId + '_' + (_self.username ? escape(_self.username.replace(/_/g, ' ')).replace(/%/g, '~') : '');
				}, 500);

				return;
			};
			
			showMessage('生成图片中');
			
			if(this.type == 'paper'){
				this.uploadImg();
			}else{
				this.uploadJSON();
			}

			//上传内容
			//selectPage('upload', '<p>' + ('图片上传中') +'('+ Math.round((data.length + dataSmall.length) / 1024) +')</p>');
			//uploadImg(data, imgType, dataSmall);
		},
		scrollYTo : function(to, duration){ //滚动页面
			var _self = this;
			var fps = 36;
			var h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			var from = window.pageYOffset;
			if(to > h){
				to = h;
			};
			duration = duration || 300;
			var frames = Math.ceil(duration * fps / 1000);
			var curFrame = 0;
			var easeIn = function(t, b, c, d) {
				return c * (t /= d) * t + b;
			};
			var easeOut = function(t,b,c,d){
				return -c *(t/=d)*(t-2) + b;
			};
			function a(){
				curFrame ++;
				var ds = easeIn(curFrame, from, to - from, frames);
				window.scrollTo(window.pageXOffset, ds);
				if(curFrame < frames){
					setTimeout(a, Math.round(1000 / fps));
				};
			};
			a();
		},
		uploadImg : function(){
			var _self = this, imgData, imgDataSmall = '';
			imgData = this.wordList[0].paper.getImgData('jpeg', 305, 0.6);
			//imgDataSmall = this.wordList[0].paper.getSmallImgData('jpeg', 0.6);
			
			imgData = imgData.substr(23);
			//imgDataSmall = imgDataSmall.substr(23);
			
			showMessage('上传图片中');

			var API = '/wx2015ChunjieUpload.action';
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					var rTxt = xhr.responseText;
					if(rTxt && (/^\d+$/).test(rTxt)){
						_self.imgUrl = 'http://i0.peopleurl.cn/nmsgimage/wx/' + rTxt.substr(0, 10) + '/' + rTxt + '.jpg';
						_self.imgId = rTxt;
						_self.uploadJSON();
					}else{
						alert('图片上传失败，请稍后再试！code:601');
						hideMessage();
					}
				}else if(xhr.readyState == 4){
					alert('图片上传失败，请稍后再试！code:' + xhr.status);
					hideMessage();
				};
			};
			xhr.ontimeout = function(e){
				alert('图片上传超时，请在较好的网络环境中再试！');
				hideMessage();
			}
			xhr.open('POST', API, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			var data = 'dataStr=' + encodeURIComponent(imgData) + '&dataSmall=' + encodeURIComponent(imgDataSmall);
			xhr.send(data);
		},
		uploadJSON : function(){
			var json;
			json = '__loadData({"type":"' + this.type + '","classType":"' + this.classType + '","username":"' + encodeURIComponent(this.username) + '","length":' + this.wordList.length + ',"t":"' + (this.type == 'text'?encodeURIComponent(this.content):'') + '","c":${cs},"img":"' + (this.imgUrl || '') + '"';
			if(this.type == 'paper'){
				json += ',"list":[';
				var temp = [];
				for (var i = 0; i < this.wordList.length; i++) {
					temp.push(this.wordList[i].paper.getPenmanship());
				};
				json += temp.join(',') + ']';
			};
			json += '});';
			
			//找出使用的颜色数
			var cs = json.match(/,"c":".*?"/g), cn = [];
			if(cs){
				for (var i = 0; i < cs.length; i++) {
					if(cn.join('|').indexOf(cs[i]) === -1){
						cn.push(cs[i]);
					};
				};
				cs = cn.length;
			}else{
				cs = 1;
			}
			
			var json = json.replace('${cs}', cs);
			
			showMessage('上传数据中...');

			var API = '/wx2015ChunjieConfUpload.action';
			var xhr = new XMLHttpRequest();
			
			var id;
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					var rTxt = xhr.responseText;
					if(rTxt && (/^\d+$/).test(rTxt)){
						//成功
						writeCookie('_tempShow', 1, 1, 'people.com.cn;path=/');
						// if(window.localStorage){
						// 	localStorage['_tempShow'] = 1;
						// };
						showMessage('请稍候...');

						setTimeout(function(){
							window.location.href = 'http://wx.people.com.cn/h5/chunjie/' + rTxt;
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
			xhr.send('confDataStr=' + encodeURIComponent(json) + '&charCount=' + this.wordList.length + '&imageType=' + cs + '&picName=' + encodeURIComponent(this.imgId));
		},
		getThumbnail : function(){
			var width = 305;
			if(this.wordList.length > 0){
				return this.wordList[0].paper.getImgData('jpeg', width, 0.7);
			}else{
				return '';
			};
		}
	};
	function initPage(){
		function orientationchange(){
			if(typeof window.orientation == 'number' && window.orientation !== 0){
				return;
			}else if(typeof initPage == 'function'){
				location.reload();
			};
		};
		window.onorientationchange = orientationchange;
		if(typeof window.orientation == 'number' && window.orientation !== 0){
			alert('请旋转您的手机为竖立状态，在横屏界面下无法操作！');
			orientationchange();
			return;
		};
		initPage = null;

		// document.addEventListener('DOMContentLoaded', function(){
			editor.init();
		// }, false);
		
	};
	function getImgPath(id, s){
		s = s || '';
		if(id.length == 25){
			return 'http://i0.peopleurl.cn/msgimage/weixin/' + (id.substr(0, 8)) + '/' + s + id + '.jpg';
		}else if(id.length == 27){
			return 'http://i0.peopleurl.cn/msgimage/weixin/' + (id.substr(0, 10)) + '/' + s + id + '.jpg';
		}else if(id.length == 28){
			return 'http://i0.peopleurl.cn/nmsgimage/wx/' + (id.substr(0, 10)) + '/' + s + id + '.jpg';
		}
	};
	
	function showMessage(str){
		I('promptLayer').style.display = 'block';
		I('promptLayer').innerHTML = '<div class="txt">' + str + '</div>';
		Q('#promptLayer .txt').style.width = document.documentElement.clientWidth + 'px';
		Q('#promptLayer .txt').style.height = document.documentElement.clientHeight + 'px';
	};
	function hideMessage(){
		I('promptLayer').style.display = 'none';
	};
	
	function hideAllPage(){
		I('editorPage').style.display = I('uploadPage').style.display = 'none';
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
		this.ele.className = 'canvasEdit';
		this.ele.innerHTML = '<div class="canvas"></div><div class="cvsBtn"><a class="btn_02 cvsEditBtn" href="javascript:void(0)">编辑</a><a class="btn_02" href="javascript:void(0)">重播</a><a class="btn_02 cvsDelBtn" href="javascript:void(0)">删除</a></div>';


		var cvs = document.createElement('canvas');
		Q('.canvas', this.ele).appendChild(cvs);

		cvs.width = 610 * s;
		cvs.height = 610 * s;
		this.paper = new Paper(cvs);

		this.paper.fontWidth = viewWidth;
		this.btnBox = Q('.cvsBtn', this.ele);
		var btns = QA('a', this.btnBox);
		this.btn_edit = btns[0];
		this.btn_replay = btns[1];
		this.btn_del = btns[2];

		this.btn_edit.onmousedown = function(){
			editor.select(_self.index);
		};
		this.btn_replay.onclick = function(){
			_self.paper.replay();
		};
		this.btn_del.onclick = function(){
			_self.del();
		};
		this.paper.onchange = function(){
			editor.changeBtn();
		};
	};
	WordArea.prototype = {
		toStatic : function(){
			if(editor.wordList.length > 1 && this.paper.moveSum < 5){
				this.del();
				editor.remove(this.index);
				return;
			};
			this.ele.className = 'canvasShow';
			this.paper.setDisabled(true);
			this.paper.surveyPadding(); //计算上下空间

			editor.word = null;
		},
		toEdit : function(){
			var _self = this;
			if(this.paper.status == 'play'){
				this.paper._stop();
				this.paper.recovery();
			};
			this.ele.className = 'canvasEdit';
			this.paper.setDisabled(false);
		},
		del : function(){
			var _self = this;
			if(editor.wordList.length <= 1){
				editor.select(0);
				editor.word.paper.clearPaper();
				return;
			};
			editor.remove(this.index);
			// this.ele.style.transition = 'height 0.5s ease-out';
			// this.ele.style.overflow = 'hidden';
			// this.ele.style.height = 0;
			this.btn_edit.onmousedown = this.btn_del.onclick = this.paper.onchange = null;

			if(this.paper.status == 'play'){
				this.paper._stop();
				this.paper.recovery();
			};

			// setTimeout(function(){
				_self.ele.parentNode.removeChild(_self.ele);
			// }, 500);
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
		};

		this.init();
		this.penmanship = [];//笔迹堆栈
		this.repeatQueue = [];//重做堆栈
	};
	Paper.prototype = {
		lineWidth : 1,
		color : 'black',
		penSize : 8,
		fontWidth : 320,
		bg : 'images/paper.jpg',
		moveSum : 0,
		stroke : null, //当前笔画
		status : 'edit',
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

			this.ctx.strokeStyle = this.color;
			this.ctx.fillStyle = this.color;
			this.addEvent(this.canvas, 'selectstart', function() { //去掉选择
				return false;
			});
			this.bgImg = new Image();
			this.bgImg.src = window['paperImgSrc'] || this.bg;

			//创建画笔类型
			this.createPat('glodPat', window["glodImgSrc"] || '/microblog-v3/h5/chunjie/images/glod.png', 150);
			this.createPat('blackPat', window["blackImgSrc"] || '/microblog-v3/h5/chunjie/images/black.png', 150);


			var __startEvent = function(e){
				if(_self.status !== 'edit'){
					return;
				};
				var x, y;
				if(e.type == 'touchstart'){
					if(e.touches.length >= 2){return}
					x = e.touches[0].pageX;
					y = e.touches[0].pageY;
					_self.removeEvent(_self.canvas, 'mousedown', __startEvent);
				}else{
					x = e.pageX;
					y = e.pageY;
				};
				
				_self.canvasPos = _self.canvas.getBoundingClientRect();
				_self.canvasPos = {
					left: _self.canvasPos.left + (window.scrollX || window.pageXOffset),
					top: _self.canvasPos.top + (window.scrollY || window.pageYOffset)
				};

				x = x - _self.canvasPos.left;
				y = y - _self.canvasPos.top;

				_self.stroke = {
					"t" : new Date(),
					"d" : [{x:x, y:y, t:0}],
					"c" : _self.color,
					"p" : _self.penSize
				};

				_self.moveBegin(x, y, e.type);
				e.preventDefault();
			};

			this.addEvent(this.canvas, 'touchstart', __startEvent);
			this.addEvent(this.canvas, 'mousedown', __startEvent);

			//test
			// setTimeout(function(){
			// 	this.ctx.strokeStyle = this.glodPat;
			// 	this.ctx.fillStyle = this.glodPat;
			// 	this.ctx.font = '500px 华文行楷';
			// 	this.ctx.fillText('福', 50, 450);
			// 	this.showToCanvas(true);

			// 	var s = this.getImgData('png', 610);
			// 	var img = new Image();
			// 	img.src = s;
			// 	document.body.appendChild(img);
			// }.bind(this), 200);
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

			if(this.__moveEvent){
				this.removeEvent(document, 'mousemove', this.__moveEvent);
				this.removeEvent(document, 'touchmove', this.__moveEvent);
				this.removeEvent(document, 'mouseup', this.__endEvent);
				this.removeEvent(document, 'touchend', this.__endEvent);
			};

			this.__moveEvent = function(e){
				if(_self.status !== 'edit'){
					return;
				};
				var x, y;
				if(e.type == 'touchmove'){
					if(e.touches.length >= 2){return}
					x = e.touches[0].pageX;
					y = e.touches[0].pageY;
				}else{
					x = e.pageX;
					y = e.pageY;
				};
				
				x = x - _self.canvasPos.left;
				y = y - _self.canvasPos.top;

				//笔迹
				_self.stroke["d"].push({"x":x, "y":y, "t": new Date() - _self.stroke["t"]});

				_self.moving(x, y);
				e.preventDefault();
			};
			this.__endEvent = function(e){
				if(_self.status !== 'edit'){
					return;
				};
				_self.moveEndFn();
				if(_self.penmanship.length){
					_self.stroke["t"] = _self.stroke["t"] - _self.penmanshipTime;
				}else{
					_self.penmanshipTime = _self.stroke["t"];
					_self.stroke["t"] = _self.stroke["t"].getTime();
				}
				_self.penmanship.push(_self.stroke);
				_self._clearQueue = null;

				//清空重做堆栈
				_self.repeatQueue = [];

				_self.stroke = null;

				if(typeof _self.onchange == 'function'){
					_self.onchange();
				};
				//alert(_self.testStr);
			};

			if(type == 'touchstart'){
				this.addEvent(document, 'touchmove', this.__moveEvent);
				this.addEvent(document, 'touchend', this.__endEvent);
			}else{
				this.addEvent(document, 'mousemove', this.__moveEvent);
				this.addEvent(document, 'mouseup', this.__endEvent);
			}
			

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
			this.removeEvent(document, 'mousemove', this.__moveEvent);
			this.removeEvent(document, 'touchmove', this.__moveEvent);
			this.removeEvent(document, 'mouseup', this.__endEvent);
			this.removeEvent(document, 'touchend', this.__endEvent);

			this.ctx.lineWidth = this.ctx.lineWidth - 1;
			var dot;

			while(this.moveQueue.length){
				dot = this.moveQueue.shift();
				this.actionPaint(dot, this.penSize * ( this.fontWidth / 320 ) / 8);
			};

			//刷新投影
			this.showToCanvas(true);

			// document.getElementById('log').innerHTML = this.testStr;
		},
		setDisabled : function(t){
			if(t && this.status == 'edit'){
				this.status = 'disabled';
			}else if(!t && this.status == 'disabled'){
				this.status = 'edit';
			};
		},
		undoActi : function(){
			return this._clearQueue && this._clearQueue.length || this.penmanship.length;
		},
		undo : function(){ //
			if(this.status !== 'edit'){
				return;
			};
			if(this._clearQueue && this._clearQueue.length){
				this.penmanship = this._clearQueue;
				this._clearQueue = null;
				this.recovery();
				if(typeof this.onchange == 'function'){
					this.onchange();
				};
			}else if(this.penmanship.length){
				var p = this.penmanship.pop();
				this.repeatQueue.push([p]);

				if(this.penmanship.length == 0){
					this._moveSum = this.moveSum;
					this.moveSum = 0;
				};
				this.recovery();
				if(typeof this.onchange == 'function'){
					this.onchange();
				};
			};
		},
		repeatActi : function(){
			return !!this.repeatQueue.length;
		},
		repeat : function(){ 
			if(this.status !== 'edit'){
				return;
			};
			if(this.repeatQueue.length){
				if(this.penmanship.length == 0){
					this.moveSum = this._moveSum;
				};
				this.penmanship = this.penmanship.concat(this.repeatQueue.pop());
				this.recovery();
				if(typeof this.onchange == 'function'){
					this.onchange();
				};
			};
		},
		_clearQueue : null,
		clearPaper : function(){
			if(this.status !== 'edit'){
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
						imgData.data[i] = 100;
						imgData.data[i+1] = 30;
						imgData.data[i+2] = 7;
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
			this.color = stroke["c"];
			this.penSize = stroke["p"];

			this.moveBegin(stroke["d"][0]["x"], stroke["d"][0]["y"]);
			if(stroke["d"].length == 1){
				_self.moveEndFn();
				strokeEnd();
			}
			var p = 1, dot, time = 0; //i < stroke.d.length; ) {
			
			dot = stroke["d"][p];

			(function(){
				if(!dot){return};
				_self.moving(dot["x"], dot["y"]);
				
				if(p >= stroke["d"].length - 1){
					_self.moveEndFn();
					strokeEnd();
				};
				p ++;
				dot = stroke["d"][p];
				
				if(!dot){return};
				clearTimeout(_self._playTimer);
				_self._playTimer = setTimeout(arguments.callee, dot["t"] - time);
				time = dot["t"];
			})();
				
			
			this.playPos ++;
			function strokeEnd(){
				_self.color = _color;
				_self.penSize = _penSize;
				if(_self.playPos >= _self.penmanship.length){
					_self.status = _self.oldStatus;
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
				this.color = stroke["c"];
				this.penSize = stroke["p"];
				
				this.moveBegin(stroke["d"][0]["x"], stroke["d"][0]["y"]);
				if(stroke["d"].length == 1){
					this.moveEndFn();
					strokeEnd();
				}
				for (var i = 1, p = 1; i < stroke["d"].length; i++) {

					var dot = stroke["d"][p];
					p ++;

					this.moving(dot["x"], dot["y"]);
					//console.log(dot.x + ', ' + dot.y);
					if(p >= stroke["d"].length){
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
				if(_self.playPos >= _self.penmanship.length){
					_self.status = 'edit';
					return;
				};
			};
		},
		paintDot : function(x, y, c){
			var cX,
				cY,
				s = 8,
				c,
				toW = this.lineWidth;

			//test
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

			//输出显示
			// this.showToCanvas();
		},
		getPenmanship : function(){
			var str = '', t;
			for(var i = 0; i < this.penmanship.length; i++){
				if(i != 0){str += ','}
				str += '{"t":' + this.penmanship[i]["t"] + ',';
				str += '"c":"' + this.penmanship[i]["c"] + '",';
				str += '"p":"' + this.penmanship[i]["p"] + '",';
				str += '"d":[';
				for (var j = 0; j < this.penmanship[i]["d"].length; j++) {
					t = this.penmanship[i]["d"][j];
					if(j != 0){str += ','}
					str += Math.round(t["x"] * 100) / 100 + ',' + Math.round(t["y"] * 100) / 100 + ',' + (t["t"]||0);
				};
				str += ']}';
			}
			str = '{"w":' + this.fontWidth + ',"p":[' + str + ']}';
			return str;
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
		getImgData : function(type, width, q){
			return toImageData(type, q, this, width || 610);
		},
		getSmallImgData : function(type, q){
			return toImageData(type, q, this, 80);
		},
		createPat : function(name, src, size){
			size *= s;
			var img = new Image();
			img.src = src;
			img.onload = function(){
				var cc = document.createElement('canvas');
				cc.width = cc.height = size;
				var ctx = cc.getContext('2d');
				ctx.drawImage(img, 0, 0, size, size);
				this[name] = this.ctx.createPattern(cc, 'repeat');
			}.bind(this);
		}
	};
	function toImageData(type, q, _self, size){
		if(!_self.bgImg.complete){
			return '';
		};
		size = size || 610;

		type = type || 'png';

		q = q || 0.7;
		var cc = document.createElement('canvas');
		cc.width = cc.height = size;

		var canvas, cvs1, cvs2, ctx1, ctx2, w = _self.canvas.width, h = _self.canvas.height;

		if(w / size > 1.8){ //阶梯缩小，避免锯齿
			cvs1 = document.createElement('canvas');
			cvs2 = document.createElement('canvas');
			ctx1 = cvs1.getContext('2d');
			ctx2 = cvs2.getContext('2d');
			cvs1.width = w;
			cvs1.height = h;
			ctx1.drawImage(_self.canvas, 0, 0, w, h);

			while(w / size > 1.8){
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
			canvas = _self.canvas;
		}

		var ctx = cc.getContext('2d');
		ctx.drawImage(_self.bgImg, 0, 0, size, size);
		ctx.drawImage(_self.bgCanvas, 0, 0, size, size);
		ctx.drawImage(canvas, 0, 0, size, size);
		// ctx.drawImage(_self.logoImg, 41 * (size/610), 34 * (size/610), _self.logoImg.width * (size/610), _self.logoImg.height * (size/610));
		
		return cc.toDataURL('image/' + type, q);
	};
	initPage();
	
})();

