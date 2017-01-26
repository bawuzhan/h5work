(function(){
	var isWX = navigator.userAgent.indexOf('Messenger') !== -1;
	if(isWX){
		if(window.location.href.indexOf('.people.') === -1){
			location.replace('http://t.people.com.cn/h5/dongwo');
			return;
		};
	};
	var isMobile = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);
	isMobile = isMobile ? isMobile[0] : false;
	
	function Q(s, p){
		return (p || document).querySelector(s);
	};
	function QA(s, p){
		return (p || document).querySelectorAll(s);
	};

	var viewWidth = document.documentElement.clientWidth;
	if(!isMobile || screen.width/screen.height > 0.66){
		var f = document.documentElement.clientHeight / 490 * 16,
			viewWidth = Math.round(document.documentElement.clientHeight / 490 * 320);
		document.documentElement.style['font-size'] = f + 'px';
	}else if(document.body.clientWidth < 640){
		document.documentElement.style.fontSize = 32 * viewWidth / 640 + 'px';
	};
	function addEvent(obj,eventType,func){if(obj.attachEvent){obj.attachEvent("on" + eventType,func);}else{obj.addEventListener(eventType,func,false)}}
	function removeEvent(obj,eventType,func){
	if(obj.detachEvent){obj.detachEvent("on" + eventType,func)}else{obj.removeEventListener(eventType,func,false)}
	}
	var question = [
		{
			id : 1,
			t : 'txt',
			a : [
				'认真生活，充实',
				'顺其自然，不忧虑',
				'不太顺，需要调整',
				'平平淡淡就是真',
				'常与朋友相伴',
				'想放假却停不下来'
			]
		},
		{
			id : 2,
			t : 'pic',
			a : [
				'qst02/01.jpg,宁泽涛',
				'qst02/02.jpg,王凯',
				'qst02/03.jpg,金星',
				'qst02/04.jpg,尔康',
				'qst02/05.jpg,贾玲',
				'qst02/06.jpg,TFboys'
			]
		},
		{
			id : 3,
			t : 'txt',
			a : [
				'红包在哪我在哪',
				'经常错过好几亿…',
				'发出去比抢回来多',
				'红包致富，退隐中',
				'首先跪谢老板',
				'一直抢，不说话'
			]
		},
		{
			id : 4,
			t : 'pic',
			a : [
				'qst04/01.jpg,何以笙箫默',
				'qst04/02.jpg,武媚娘传奇',
				'qst04/03.jpg,芈月传',
				'qst04/04.jpg,花千骨',
				'qst04/05.jpg,琅琊榜',
				'qst04/06.png'
			]
		},
		{
			id : 5,
			t : 'pic',
			a : [
				'qst05/01.jpg,大圣归来',
				'qst05/02.jpg,寻龙诀',
				'qst05/03.jpg,我的少女时代',
				'qst05/04.jpg,火星援救',
				'qst05/05.jpg,夏洛特烦恼',
				'qst05/06.png'
			]
		},
		{
			id : 6,
			t : 'pic',
			a : [
				'qst06/01.png',
				'qst06/02.png',
				'qst06/03.png',
				'qst06/04.png',
				'qst06/05.png',
				'qst06/06.png'
			]
		},
		{
			id : 7,
			t : 'txt',
			a : [
				'我忍！',
				'立马屏蔽',
				'有用的还是看看',
				'默默在心中画个叉',
				'朋友圈声讨此事',
				'用刷屏抵制刷屏'
			]
		},
		{
			id : 8,
			t : 'txt',
			a : [
				'告诉我哪家医院',
				'反正我信了……',
				'无所谓咯~',
				'无奇不有，活久见',
				'关我何事',
				'自然美才是真美'
			]
		},
		{
			id : 9,
			t : 'pic',
			a : [
				'qst09/01.png',
				'qst09/02.png',
				'qst09/03.png',
				'qst09/04.png',
				'qst09/05.png',
				'qst09/06.png'
			]
		},
		{
			id : 10,
			t : 'pic',
			a : [
				'qst10/01.jpg,手环',
				'qst10/02.jpg,智能手表',
				'qst10/03.jpg,平衡电动车',
				'qst10/04.jpg,VR头盔',
				'qst10/05.jpg,特斯拉',
				'qst10/06.jpg,还是自拍杆最实在'
			]
		},
		{
			id : 11,
			t : 'txt',
			a : [
				'治好拖延症',
				'不再迟到！！！',
				'瘦成闪电',
				'学点新东西',
				'挣更多钱买买买',
				'什么都不想做……'
			]
		},
		{
			id : 12,
			t : 'pic',
			a : [
				'qst12/01.jpg,连不上WIFI',
				'qst12/02.jpg,没信号',
				'qst12/03.jpg,电量只剩1%',
				'qst12/04.jpg,网页刷不出来',
				'qst12/05.jpg,手机屏幕碎了',
				'qst12/06.jpg,要求[扫一扫]关注'
			]
		},
		{
			id : 13,
			t : 'pic',
			a : [
				'qst13/01.jpg',
				'qst13/02.jpg',
				'qst13/03.jpg',
				'qst13/04.jpg',
				'qst13/05.jpg',
				'qst13/06.jpg'
			]
		},
		{
			id : 14,
			t : 'pic',
			a : [
				'qst14/01.jpg,发财的秘密',
				'qst14/02.jpg,如何征服英俊少男',
				'qst14/03.jpg,轻功是怎样炼成的',
				'qst14/04.jpg,75天嫁入豪门',
				'qst14/05.jpg,怎样鉴别黄色歌曲',
				'qst14/06.jpg,外星人入侵生存指南'
			]
		}
	];
	var imgPath = 'images/';
	var CLICK_EVENT = 'click';
	var nickname = '';
	var audioType = navigator.userAgent.match(/Firefox|Opera/i)?'ogg':'mp3';
	var bgAudio = imgPath + 'sound.' + audioType;
	function init(){
		var data = location.href.match(/dongwo\/([\w~]+)/);
		if(!data || data[1].split('_').length < 2){
			alert('数据格式错误');
			return;
		};
		data = data[1].split('_');
		nickname = unescape(data[1].replace(/~/g, '%'));
		var id = data[0].split(/[A-Z]/);
		id.pop();
		var an = data[0].split(/\d+/);
		an.shift();

		var idList = [];
		for (var i = 0; i < id.length; i++) {
			idList.push(parseInt(id[i]) - 1);
			question[parseInt(id[i]) - 1].s = an[i];
		};

		var s = 'ABCDEF'.split('');
		var html = '<div class="globalPackage"><div class="sound s_off"></div></div><div class="main cover scenery" id="page_1">'+
			'<div class="logo bg_scale"></div>'+
			'<div class="coverHd bg_scale"></div>'+
			'<div class="coverPic bg_scale"></div>'+
			'<a href="javascript:void(0)" title="" class="btn_01 bg_scale">我来试试</a>'+
		'</div>';
		for (var i = 0; i < idList.length; i++) {
			var item = question[idList[i]];
			html += '<div class="main qst scenery"><div class="qst_wrap"><div class="tips1">(' + (i+1) + '/5)</div><div class="qst01_b"><div class="title title' + (item.id<10?'0'+item.id:item.id) + ' bg_scale"></div>';
			html += '<ul class="' + (item.t == 'txt' ? 'qstList_A' : 'qstList_B') + '">';

			for (var j = 0; j < item.a.length; j++) {
				if(item.t == 'txt'){
					html += '<li id="' + idList[i] + '_' + s[j] + '"><div class="itemWrap"><span class="sequ">' + s[j] + '</span><span>' + item.a[j] + '</span></div></li>';
				}else{
					var pic = item.a[j].split(',');
					html += '<li id="' + idList[i] + '_' + s[j] + '"><img src="' + imgPath + pic[0] + '" >' + (pic[1]?'<span class="bg_scale">'+pic[1]+'</span>':'') + '<div class="mask_B"></div><span class="right"></span></li>';
				}
			}
			html += '</ul></div></div></div>';
		};
		html += '<div class="main cover scenery">'+
			'<div class="rstCoverPic01 bg_scale" id="score"></div>'+
			'<div class="arr_btn">'+
			'<a href="javascript:void(0)" class="btn_02" id="shareBtn">晒成绩</a>'+
			'<a href="javascript:void(0)" class="btn_02" id="toEditBtn">我要出题</a>'+
			'</div>'+
			'</div>';
		Q('.slideshow').innerHTML = html;

		addEvent(Q('#page_1 .btn_01'), CLICK_EVENT, function(e){
			mobileshow.next();
		});
		addEvent(Q('#shareBtn'), CLICK_EVENT, function(e){
			showShare();
		});
		addEvent(Q('#toEditBtn'), CLICK_EVENT, function(e){
			localStorage.setItem('toEdit', 1);
			window.location.href = '/h5/dongwo';
		});
		var preload = []; //预载图片
		mobileshow.init('.slideshow', preload);
		mobileshow.loop = false;
		mobileshow.touch = false;
		mobileshow.setSound(bgAudio);
		
		var score = 0;
		var li = QA('.slideshow li');
		for (var i = 0; i < li.length; i++) {
			li[i].onclick = function(){
				var id = this.id.split('_');
				if(question[id[0]].s != id[1]){
					if(Q('.right', this)){
						Q('.right', this).className = 'wrong';
						Q('li:nth-child(' + (question[id[0]].s.charCodeAt() - 64) + ') .right', this.parentNode).style.display = 'block';
					}else{
						Q('.sequ', this).className = 'sequWrong';
						Q('li:nth-child(' + (question[id[0]].s.charCodeAt() - 64) + ') .sequ', this.parentNode).className = 'sequRight';
					}
				}else{
					score += 20;
				};
				var b = QA('li', this.parentNode);
				for (var i = 0; i < b.length; i++) {
					b[i].onclick = null;
					b[i].className = '';
				};
				this.className = 'selected';
				if(mobileshow.index >= 5){
					setScore(score);
				};
				setTimeout(function(){
					mobileshow.next();
				}, 600);
			}
		};
	}
	function setScore(s){
		var stitle = [
			'简直要哭了，' + nickname + '给我打了0分',
			nickname +'出的都是什么题，我竟然不及格……',
			nickname +'给我打了60分，我们之间是真心的',
			'80分，我和'+ nickname +'连笑点都一样',
			'100分，我是最懂'+ nickname +'的人'
		];
		if(s >= 100){
			Q('#score').className = 'rstCoverPic05 bg_scale';
			document.title = stitle[4];
		}else if(s >= 80){
			Q('#score').className = 'rstCoverPic04 bg_scale';
			document.title = stitle[3];
		}else if(s >= 60){
			Q('#score').className = 'rstCoverPic03 bg_scale';
			document.title = stitle[2];
		}else if(s > 0){
			Q('#score').className = 'rstCoverPic02 bg_scale';
			document.title = stitle[1];
		}else{
			document.title = stitle[0];
		};
		setShareImg(imgPath + 's_' + s + '.jpg');
		Q('#score').innerHTML = '<span class="score">' + s + '<i>分</i></span>';
	}
	function showShare(){
		Q('#shareLayer').style.display = 'block';
		setTimeout(function(){
			Q('#shareLayer').style.display = 'none';
		}, 5000);
	};
	function setShareImg(u){
		if(u){
			var img = window._shareImg || new Image();
			
			img.src = u;
			img.style.position = 'absolute';
			img.style.left = '-1000px';
			img.style.top = '-1000px';

			window._shareImg = img;
			document.body.insertBefore(img, document.body.firstChild);
		};
	};
	setShareImg(imgPath + 's_d.jpg');
	
	document.ontouchmove = function(e){e.preventDefault()}

	init();

	if(localStorage.getItem('showShare') == 1){
		showShare();
		localStorage.removeItem('showShare');
	}
})();