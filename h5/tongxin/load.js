(function(){function g(a,b){return(b||document).querySelector(a)}function h(a,b){var c=a.className.replace(new RegExp("\\b"+b+"\\b","g"),"");a.className=c.replace(/ +/g," ").replace(/(^ +| +$)/g,"")+" "+b}function r(a,b){a.className=a.className.replace(new RegExp("\\b"+b+"\\b","g")," ").replace(/ +/g," ").replace(/(^ +| +$)/g,"")}function l(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener(b,c,!1)}function s(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener(b,c,!1)}
function d(a){a=(f+a).replace(/-+/g,"-").replace(/(^-|-$)/g,"").split("-");for(var b=1;b<a.length;b++)a[b]=a[b].substr(0,1).toLocaleUpperCase()+a[b].substr(1).toLowerCase();return a.join("")}function u(){if(navigator.userAgent.match(/MSIE [678]/))try{this.__objType="MediaPlayer",this.audioObj=document.createElement("object"),this.audioObj.classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6",this.audioObj.settings.autoStart=!1,this.audioObj.settings.volume=100}catch(a){}else this.__objType="Audio",
this.audioObj=document.createElement("audio");this.audioObj.style.display="none";this.audioObj.style.position="absolute";this.audioObj.style.left="-100px";this.audioObj.style.top="-100px";document.body.insertBefore(this.audioObj,document.body.firstChild)}var m="";-1!==navigator.userAgent.indexOf("WebKit")?m="webkit":-1!==navigator.userAgent.indexOf("Firefox")?m="moz":-1!==navigator.userAgent.indexOf("MSIE")&&(m="ms");var q={moz:"animationend",webkit:"webkitAnimationEnd",ms:"MSAnimationEnd"}[m]||"animationend",
v={moz:"transitionend",webkit:"webkitTransitionEnd",ms:"MSTransitionEnd"}[m]||"transitionend",f={moz:"",webkit:"-webkit-",ms:""}[m]||"";if(-1!==navigator.userAgent.indexOf("Messenger")&&"t.people.com.cn"!=location.host)location.href="http://t.people.com.cn/h5/tongxin";else{var t="mousedown",k="mousemove",p="mouseup";void 0!==document.ontouchstart&&(t="touchstart",k="touchmove",p="touchend");u.prototype={mute:!1,setMute:function(a){this.mute=a=!0===a;if("Audio"==this.__objType)this.audioObj.muted=
a;else try{this.audioObj.settings.mute=a}catch(b){}},setVolume:function(a){a=parseInt(a);100<a?a=100:0>a&&(a=0);if("Audio"==this.__objType)this.audioObj.volume=a/100;else try{this.audioObj.settings.volume=a}catch(b){}},play:function(){if("Audio"==this.__objType)this.audioObj.play();else try{this.audioObj.controls.play()}catch(a){}},setLoop:function(a){a=1==a;if("Audio"==this.__objType)this.audioObj.loop=a;else try{this.audioObj.settings.playCount=a?9999:1}catch(b){}},pause:function(){if("Audio"==
this.__objType)this.audioObj.pause();else try{this.audioObj.controls.pause()}catch(a){}},setSrc:function(a){if("Audio"==this.__objType)this.audioObj.src=a;else try{this.audioObj.URL=a}catch(b){}}};window.mobileshow={_timers:[],mute:!0,touch:!0,loop:!0,init:function(a,b){var c=this;this.ele&&this.uninit();this.ele=g(a);this.scenery=(this.ele||document).querySelectorAll(".scenery");for(var e=0;e<this.scenery.length;e++)this.scenery[e].style.display="none";this.length=this.scenery.length;this.index=
-1;this.cssKey="";b&&b.length?(this.preloadList=b,this.preload()):this.select(0);var d=-1,f,m,n,h=0;this.__startFn=function(a){!1!==c.touch&&(a=a.touches?a.touches[0]:a,d=a.pageX,f=a.pageY)};this.__moveFn=function(a){if(!1!==c.touch&&-1!=d)return a=a.touches?a.touches[0]:a,m=a.pageX-d,n=a.pageY-f,0==h?((c.loop||0!=c.index)&&0<n&&10<Math.abs(n)&&Math.abs(n)>Math.abs(m)&&(h=-1,c.preMoveScen(n)),(c.loop||c.index!=c.length-1)&&0>n&&10<Math.abs(n)&&Math.abs(n)>Math.abs(m)&&(h=1,c.nextMoveScen(n))):10<
Math.abs(n)&&c.moveScen(n,h),!1};this.__endFn=function(a){!1!==c.touch&&(d=-1,0!=h&&c.endMoveScen(h),h=0)};l(this.ele,t,this.__startFn);l(this.ele,k,this.__moveFn);l(this.ele,p,this.__endFn);this.auido_bg||(this.auido_bg=new u,this.auido_bg.setLoop(!0),g(".sound")&&l(g(".sound"),"click",function(){c.mute?c.playSound():c.stopSound();return!1}))},setSound:function(a){this.soundSrc=a;this.mute?this.stopSound():this.playSound()},stopSound:function(){this.mute=!0;h(g(".sound"),"s_off");r(g(".sound"),"s_on");
this.auido_bg.pause()},playSound:function(){this.auido_bg.setSrc(this.soundSrc);this.mute=!1;r(g(".sound"),"s_off");h(g(".sound"),"s_on");this.auido_bg.play()},preload:function(){var a=this,b=0,c;this.loading=document.createElement("div");this.loading.className="loadingPage";this.loading.innerHTML='<div class="loadingBar"><div class="block_1 loading"></div><div class="block_2 loading"></div><div class="block_3 loading"></div><div class="block_4 loading"></div><div class="block_5 loading"></div></div><div class="loadingTxt">\u8f7d\u5165\u4e2d</div>';
this.ele.appendChild(this.loading);this.loading.style.display="block";for(var e=0;e<this.preloadList.length;e++)c=new Image,c.onerror=c.onload=function(){b++;b>=a.preloadList.length&&(a.loading.style.display="none",a.select(0))},c.src=this.preloadList[e]},uninit:function(){this.ele&&(s(this.ele,t,this.__startFn),s(this.ele,k,this.__moveFn),s(this.ele,p,this.__endFn),this.ele=null,this.auido_bg.pause())},select:function(a,b){var c=this;if(a!=this.index){var e=0;a>this.index?e=1:a<this.index&&(e=-1);
-1==this.index&&(e=0);a>=this.length?a=0:0>a&&(a=this.length-1);a+1==this.length?g(".moveArr").style.display="none":g(".moveArr").style.display="block";this.preScen&&(this.preScen.style.zIndex=1);this.nowScen&&("function"==typeof this.nowScen._endFn&&this.nowScen._endFn(),this.nowScen.style.zIndex=2,this.preScen=this.nowScen);this.nowScen=this.scenery[a];this.nowScen.style.display="block";this.nowScen.style.zIndex=10;this.preloadScen(this.nowScen);clearTimeout(this._autoNextTimer);var f=function(){clearTimeout(c._pageTranEndTimeout);
this.removeEventListener(v,f,null);this.style[d("transition")]="none";this._endFn=null;c.clearPreScen();c.actionScen()};this.nowScen._endFn=f;this.nowScen.addEventListener(v,f,null);this.index=a;0!==e?(this.nowScen.style[d("transition")]="none",this.nowScen.style[d("transform")]="translateY("+e*document.body.clientHeight+"px)",this.preScen&&(this.preScen.style[d("transition")]="none"),b||c.endMoveScen(e)):this.autoNext();this.readyScen();0==e&&this.actionScen()}},next:function(){(this.loop||this.index!=
this.length-1)&&this.select(this.index+1)},pre:function(){(this.loop||0!=this.index)&&this.select(this.index-1)},preMoveScen:function(a){this.select(this.index-1,!0);this.moveScen(a,-1)},nextMoveScen:function(a){this.select(this.index+1,!0);this.moveScen(a,1)},moveScen:function(a,b){var c=b*document.body.clientHeight+a,e=c*b/document.body.clientHeight*.1+.9;this.nowScen.style[d("transform-origin")]="50% 50%";this.nowScen.style[d("transform")]="translateY("+c+"px)";this.preScen&&(this.preScen.style[d("transform-origin")]=
"50% "+(1==b?"0":"100%"),this.preScen.style[d("transform")]="scale("+e+")")},endMoveScen:function(a){var b=this;setTimeout(function(){b.nowScen.style[d("transform-origin")]="50% 50%";b.nowScen.style[d("transition")]=f+"transform 0.4s ease-out";b.nowScen.style[d("transform")]="translateY(0px)";b.preScen&&(b.preScen.style[d("transition")]=f+"transform 0.4s ease-out",b.preScen.style[d("transform-origin")]="50% "+(1==a?"0":"100%"),b.preScen.style[d("transform")]="scale(0.9)")},10);this.autoNext();clearTimeout(this._pageTranEndTimeout);
this._pageTranEndTimeout=setTimeout(function(){b.nowScen._endFn&&b.nowScen._endFn()},500);this.preloadScen(this.index+1>=this.length-1?this.scenery[0]:this.scenery[this.index+1]);if("function"===typeof this.onchange)this.onchange()},preloadScen:function(a){if(a&&!a.getAttribute("data-isLoad")){for(var b=(a||document).querySelectorAll("img[data-src]"),c=0;c<b.length;c++)b[c].src=b[c].getAttribute("data-src"),b[c].removeAttribute("data-src");a.setAttribute("data-isLoad",1)}},autoNext:function(){var a=
this,b=0;clearTimeout(this._autoNextTimer);if(b=this.nowScen.getAttribute("data-autoNext"))b=-1!==b.indexOf("ms")?b==parseFloat(b):1E3*parseFloat(b),3E3>b&&(b=3E3),this._autoNextTimer=setTimeout(function(){a.next()},b)},clearPreScen:function(){if(this.preScen){this.preScen.style.display="none";this.preScen.childs||(this.preScen.childs=(this.preScen||document).querySelectorAll("*[data-animationIn],*[data-animation],*[data-animationOut]"));for(var a=0;a<this.preScen.childs.length;a++)"function"==typeof this.preScen.childs[a]._endFn&&
this.preScen.childs[a]._endFn()}},readyScen:function(){this.nowScen.childs||(this.nowScen.childs=(this.nowScen||document).querySelectorAll("*[data-animationIn],*[data-animation],*[data-animationOut]"));for(var a,b,c,e=0;e<this.nowScen.childs.length;e++)c=this.nowScen.childs[e],a=c.getAttribute("data-animationIn"),b=c.getAttribute("data-animation"),c.getAttribute("data-animationOut"),a&&(a=a.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)))?/i))&&3<=a.length?c.style.display="none":b&&(b=b.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)))?/i))&&
3<=b.length&&(c.setAttribute("data-endClassName",c.getAttribute("data-endClassName")||c.className),c.className=c.getAttribute("data-endClassName")+" "+b[1],c.style[d("animation-duration")]=b[2],c.style[d("animation-fill-mode")]="backwards",c.style[d("animation-play-state")]="paused")},actionScen:function(){var a;this.nowScen.childs||(this.nowScen.childs=(this.nowScen||document).querySelectorAll("*[data-animationIn],*[data-animation],*[data-animationOut]"));for(;a=this._timers.pop();)clearTimeout(a);
for(var b,c,e=0;e<this.nowScen.childs.length;e++)c=this.nowScen.childs[e],a=c.getAttribute("data-animationIn"),b=c.getAttribute("data-animation"),c.getAttribute("data-animationOut"),a&&(a=a.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?/i))&&3<=a.length?this._actionIn(c):b&&(b=b.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?(?:\s(\d+|infinite))?/i))&&3<=b.length&&this._action(c)},_actionIn:function(a){var b=this,c=a.getAttribute("data-animationIn").match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?/i),
e=function(){this.removeEventListener(q,arguments.call,null);this.getAttribute("data-endClassName")&&(this.className=this.getAttribute("data-endClassName"));this.removeAttribute("data-endClassName");this._endFn=null;delete this._endFn;b._action(this)};a.addEventListener(q,e,null);a._endFn=e;a.style.display="block";a.setAttribute("data-endClassName",a.getAttribute("data-endClassName")||a.className);a.className=a.getAttribute("data-endClassName")+" "+c[1];a.style[d("animation-duration")]=c[2];a.style[d("animation-delay")]=
c[3]||0;a.style[d("animation-fill-mode")]="both";a.style[d("animation-iteration-count")]=1;a.style[d("animation-play-state")]="running"},_ele_animation_end_event_fn:function(){this.getAttribute("data-endClassName")&&(this.className=this.getAttribute("data-endClassName"));this.removeAttribute("data-endClassName");this._endFn=null;delete this._endFn},_action:function(a){var b=a.getAttribute("data-animation");b&&(b=b.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?(?:\s(\d+|infinite))?/i))&&
3<=b.length&&(a._endFn=this._ele_animation_end_event_fn,a.style.display="block",a.setAttribute("data-endClassName",a.getAttribute("data-endClassName")||a.className),a.className=a.getAttribute("data-endClassName")+" "+b[1],a.style[d("animation-duration")]=b[2],a.style[d("animation-delay")]=b[3]||0,a.style[d("animation-fill-mode")]="both",a.style[d("animation-iteration-count")]=parseFloat(b[4])?b[4]:"infinite",a.style[d("animation-play-state")]="running")}}}})();
(function(){var g,h,r;function l(a,b){return(b||document).querySelector(a)}function s(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener(b,c,!1)}function d(a,b){p.src=g="http://i0.peopleurl.cn/microblog-v3/h5/tongxin/images/"+b;document.title=h=a}Function.prototype.bind||(Function.prototype.bind=function(a){if("function"!==typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,e=function(){},
d=function(){return c.apply(this instanceof e&&a?this:a,b.concat(Array.prototype.slice.call(arguments)))};e.prototype=this.prototype;d.prototype=new e;return d});var u=navigator.userAgent.match(/ OS (\d+).*? Mac OS/)||!1;navigator.userAgent.indexOf("NetType/WIFI");var m=-1!==navigator.userAgent.indexOf("Messenger");navigator.userAgent.match(/Firefox|Opera/i);var q=navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/),q=q?q[0]:!1,v=["http://i0.peopleurl.cn/microblog-v3/h5/tongxin/images/p_m_04.png",
"http://i0.peopleurl.cn/microblog-v3/h5/tongxin/images/p_m_05.png"],f=[{q:"TFboys\u7684\u201c\u6210\u957f\u7684\u70e6\u607c\u7b97\u4ec0\u4e48\u201d\u662f\u8c01\u5531\u7684\uff1f",a:["\u738b\u4fca\u51ef","\u738b\u6e90","\u6613\u70ca\u5343\u73ba","\u5408\u5531"],p:"t_01.jpg",d:3,l:2},{q:"\u56fe\u4e2d\u7684\u4eba\u7269\u662f\u8c01\uff1f",a:["\u8212\u514b","\u8d1d\u5854","\u83ab\u514b","\u6770\u745e"],p:"t_02.jpg",d:0,l:2},{q:"\u300a\u704c\u7bee\u9ad8\u624b\u300b\u4e2d\u201c\u4e09\u4e95\u5bff\u201d\u7684\u961f\u670d\u662f\u51e0\u53f7\uff1f",
a:["10","14","11","7"],p:"t_03.jpg",d:1,l:4},{q:"\u56fe\u4e2d\u7684\u4f11\u95f2\u6e38\u620f\u540d\u79f0\u54ea\u9879\u662f\u9519\u7684\uff1f",a:["\u62bd\u9640\u87ba","\u6253\u8001\u725b","\u6324\u6469\u6469","\u60ac\u560e\u560e"],p:"t_04.jpg",d:2,l:5},{q:"\u300a\u8ba9\u6211\u4eec\u8361\u8d77\u53cc\u6868\u300b\u662f\u54ea\u91cc\u6e38\u73a9\uff1f",a:["\u9890\u548c\u56ed","\u5965\u4f53\u516c\u56ed","\u7389\u6e0a\u6f6d\u516c\u56ed","\u5317\u6d77\u516c\u56ed"],p:"t_05.jpg",d:3,l:2},{q:"\u673a\u5668\u732b\u8bde\u751f\u65f6\u662f\u4ec0\u4e48\u989c\u8272\uff1f",
a:["\u84dd","\u9ec4","\u7ea2","\u7d2b"],p:"t_06.jpg",d:1,l:5},{q:"\u5587\u53ed\u88e4\u5f00\u59cb\u6d41\u884c\u4e8e\u54ea\u4e2a\u5e74\u4ee3\uff1f ",a:["60","70","80","90"],p:"t_07.jpg",d:1,l:3},{q:"\u5317\u51b0\u6d0b\u6709\u51e0\u79cd\u53e3\u5473\uff1f",a:["2\u79cd","3\u79cd","4\u79cd","5\u79cd"],p:"t_08.jpg",d:2,l:3},{q:"\u300a\u767d\u96ea\u516c\u4e3b\u300b\u662f\u51fa\u81ea\u4ec0\u4e48\u7ae5\u8bdd\uff1f",a:["\u683c\u6797\u7ae5\u8bdd","\u5b89\u5f92\u751f\u7ae5\u8bdd","\u4f0a\u7d22\u5bd3\u8a00","\u738b\u5c14\u5fb7\u7ae5\u8bdd"],
p:"t_09.jpg",d:0,l:4},{q:"\u7070\u592a\u72fc\u6bcf\u6b21\u88ab\u6253\u8d25\u540e\u90fd\u4f1a\u8bf4\u7684\u4e00\u53e5\u8bdd\u662f\u4ec0\u4e48\uff1f",a:["\u6211\u662f\u4e0d\u4f1a\u653e\u8fc7\u4f60\u7684","\u6211\u4e00\u5b9a\u4f1a\u56de\u6765\u7684"],p:"t_10.jpg",d:1,l:2},{q:"\u662f\u8c01\u5927\u95f9\u4e1c\u6d77\u6293\u4f4f\u4e86\u9f99\u738b\u4e09\u592a\u5b50\u6556\u4e19\uff1f",a:["\u5b59\u609f\u7a7a","\u54ea\u5412","\u732a\u516b\u6212","\u89c2\u4e16\u97f3"],p:"t_11.jpg",d:1,l:1},{q:"\u4e00\u76f4\u4e0e\u9ed1\u732b\u8b66\u957f\u4f5c\u5bf9\u7684\u8001\u9f20\u5934\u76ee\u53eb\u4ec0\u4e48\uff1f",
a:["\u8212\u514b","\u7c73\u8001\u9f20","\u4e00\u53ea\u8033","\u84dd\u76ae"],p:"t_12.jpg",d:2,l:1},{q:"\u8fd9\u662f\u54ea\u4e2a\u6e38\u620f\u7684\u753b\u9762\uff1f",a:["\u98de\u884c\u68cb","\u53e0\u53e0\u9ad8","\u5927\u5bcc\u7fc1","\u8df3\u68cb"],p:"t_13.jpg",d:2,l:1},{q:"\u54ea\u79cd\u7cd6\u653e\u5728\u5634\u91cc\u4f1a\u567c\u91cc\u556a\u5566\u54cd\uff1f",a:["\u8df3\u8df3\u7cd6","\u9b54\u9b3c\u7cd6","\u6bd4\u5df4\u535c","QQ"],p:"t_14.jpg",d:0,l:1},{q:"\u56fe\u4e2d\u662f\u54ea\u4e2a\u6e38\u620f\uff1f",
a:["\u5929\u5929\u9177\u8dd1","\u5929\u5929\u8fde\u840c","\u5929\u5929\u70ab\u6597","\u5929\u5929\u7231\u6d88\u9664"],p:"t_15.jpg",d:1,l:2},{q:"\u8fd9\u662f\u4ec0\u4e48\u4e1c\u897f\uff1f",a:["\u6a61\u76ae\u64e6","\u5f39\u73e0","\u897f\u74dc\u6ce1\u6ce1\u7cd6","\u5f69\u8679\u7cd6"],p:"t_16.jpg",d:2,l:2},{q:"\u846b\u82a6\u5144\u5f1f\u4e2d\u7684\u7537\u4e3b\u89d2\u5996\u7cbe\u662f\u4ec0\u4e48\u52a8\u7269\uff1f",a:["\u86c7\u7cbe","\u874e\u5b50\u7cbe","\u86e4\u87c6\u7cbe","\u7a7f\u5c71\u7532"],p:"t_17.jpg",
d:1,l:3},{q:"\u56fe\u4e2d\u7684\u7537\u5b50\u5728\u5e72\u4ec0\u4e48\uff1f",a:["\u6253\u9020\u5b9d\u5251","\u70bc\u94c1","\u70b8\u7206\u7c73\u82b1","\u653e\u97ad\u70ae"],p:"t_18.jpg",d:2,l:1},{q:"\u8fd9\u90e8\u52a8\u753b\u7247\u7684\u4e3b\u4eba\u516c\u53eb\u4ec0\u4e48\uff1f",a:["\u82b1\u56ed\u5b9d\u5b9d","\u6d77\u7ef5\u5b9d\u5b9d","\u5929\u7ebf\u5b9d\u5b9d","\u6ce1\u6ce1\u5b9d\u5b9d"],p:"t_19.jpg",d:2,l:1},{q:"\u732a\u732a\u4fa0\u6700\u5e38\u53d8\u8eab\u6210\u4ec0\u4e48\u52a8\u7269\uff1f",a:["\u77f3\u7532\u718a",
"\u94c1\u62f3\u864e","\u51b0\u5c01\u9e7f","\u98de\u5929\u732a"],p:"t_20.jpg",d:1,l:3},{q:"\u56fe\u4e2d\u7684\u6e38\u620f\u53eb\u4ec0\u4e48\u540d\u5b57\uff1f",a:["\u4e22\u77f3\u5b50","\u6253\u5f39\u73e0","\u6254\u6c99\u5305","\u8df3\u623f\u5b50"],p:"t_21.jpg",d:3,l:1}],t=q?"touchstart":"click",k={score:0,index:null,init:function(){this.score=0;this.index=null;for(var a='<div class="scenery page_01"><div class="moveArr"></div><div class="title" data-animationIn="fadeIn 1s 1s"></div><div class="heart" data-animationIn="bounceIn 1s 2s" data-animation="pulse 0.5s 0"></div><div class="cloud" data-animationIn="fadeInDown 1s 0"></div><div class="baby"></div><div class="btn"></div><div class="balloon" data-animation="swing 20s 0"></div><div class="bg"></div><div class="footer" data-animationIn="fadeInUp 1s 1s" data-animation="shine 2s 0 2"><div class="logo"></div></div></div>',
b=0;b<f.length;b++)f[b]._r=Math.random();f.sort(function(a,b){return a._r-b._r});f.length=10;f.sort(function(a,b){return a.l-b.l});for(b=0;10>b;b++){for(var a=a+('<div class="scenery page_02"><div class="pic"><img data-src="http://i0.peopleurl.cn/microblog-v3/h5/tongxin/images/'+f[b].p+'" alt=""></div><div class="bird"><span>'+(b+1)+'</span></div><div class="cloud cloud1" data-animation="shake 50s 0.5s"></div><div class="cloud cloud2" data-animation="shake 60s 0"></div><div class="cloud cloud3" data-animation="shake 40s 2s"></div><div class="title"><span>'+
f[b].q+"</span></div><ol>"),c=0;c<f[b].a.length;c++)a+='<li style="'+(2<f[b].a.length&&1==c%2?"float:right":"clear:left")+';" on'+t+'="_issue(this,'+b+","+c+')">'+f[b].a[c]+"</li>";a+="</ol></div>"}a+='<div class="scenery page_end"><div class="pic"></div><div class="txt"></div><div class="bg"></div><div class="score" data-animationIn="bounceIn 1s 0"></div><div class="btns" data-animationIn="fadeInUp 1.1s 0.5s"><a href="javascript:showShare()" class="btn_01 flashBtn"><span>\u5206\u4eab\u7ed9\u670b\u53cb</span></a>'+
(m?'<a href="'+(u?"http://mp.weixin.qq.com/s?__biz=MjM5NzI3NDg4MA==&mid=202118832&idx=1&sn=537a80cac54948c45ea94ec135232d93#rd":"weixin://profile/people_rmw")+'" class="btn_01" style="margin-left:1em;"><span>\u5173\u6ce8\u8d62\u5927\u5956</span></a>':"")+"</div></div>";l(".slideshow").innerHTML=a;s(l(".slideshow .btn"),t,function(a){mobileshow.next()});mobileshow.init(".slideshow",v);mobileshow.loop=!1;mobileshow.onchange=function(){0<this.index&&(this.touch=!1)}}};g="http://i0.peopleurl.cn/microblog-v3/h5/tongxin/images/l_1_s.jpg";
r=location.href;h="\u8fd9\u4e48\u591a\u5e74\uff0c\u539f\u6765\u5979\u624d\u662f\u6211\u7684\u5973\u795e......";var p=new Image;p.src=g;p.style.position="absolute";p.style.top="-1000px";p.style.left="-1000px";document.body.insertBefore(p,document.body.firstChild);window.shareSina=function(){window.open("http://service.weibo.com/share/share.php?url="+encodeURIComponent(r)+"&appkey=&title="+encodeURIComponent(h)+"&pic="+encodeURIComponent(g.replace("s_",""))+"&ralateUid=&language=&sudaref=service.weibo.com")};
window.shareTencent=function(){window.open("http://share.v.t.qq.com/index.php?c=share&a=index&url="+encodeURIComponent(r)+"&title="+encodeURIComponent(h)+"&pic="+encodeURIComponent(g.replace("s_","")))};window.sharePeople=function(){window.open("http://t.people.com.cn/toshareinfo.action?url="+encodeURIComponent(r)+"&appkey=&title="+encodeURIComponent(h)+"&pic="+encodeURIComponent(g.replace("s_",""))+"&site=")};window.showShare=function(){m||(document.getElementById("shareAlert").innerHTML='<div class="othersShare">\u5206\u4eab\uff1a<a href="javascript:void(0)" onclick="shareSina()"><img src="http://i0.peopleurl.cn/microblog-v3/2014subject/1216_oneword/images/sina.png"></a> <a href="javascript:void(0)" onclick="sharePeople()"><img src="http://i0.peopleurl.cn/microblog-v3/2014subject/1216_oneword/images/people.png"></a> <a href="javascript:void(0)" onclick="shareTencent()"><img src="http://i0.peopleurl.cn/microblog-v3/2014subject/1216_oneword/images/tencent.png"></a></div>');
l("#shareAlert").style.display="block";setTimeout(function(){l("#shareAlert").style.display="none"},1E4)};window._issue=function(a,b,c){var e=a.parentNode;b=parseInt(b);c=parseInt(c);this.index!=b&&(this.index=b,f[b].d==parseInt(c)?(a.className="right",k.score+=10):((e||document).querySelectorAll("li")[f[b].d].className="right",a.className="wrong"),9<=b&&(l(".slideshow .score").innerHTML="<span"+(100==k.score?' style="font-size:1.7em"':"")+">"+k.score+"</span>",40>=k.score?(l(".slideshow .page_end").className=
"scenery page_end page_end_l4",d("\u6211\u7684\u7ae5\u5fc3\u6307\u6570\u662f"+k.score+"\uff0c\u6211\u7684\u6210\u719f\u65e0\u4eba\u80fd\u53ca\uff01\u4f60\u4e5f\u6765\u8bd5\u8bd5\uff1f","l_4_s.jpg")):60>=k.score?(l(".slideshow .page_end").className="scenery page_end page_end_l3",d("\u6211\u7684\u7ae5\u5fc3\u6307\u6570\u662f"+k.score+"\uff0c\u5185\u5fc3\u662f\u4e2a\u53ef\u7231\u7684\u5b69\u5b50\u54e6\uff01\u4f60\u4e5f\u6765\u8bd5\u8bd5\uff1f","l_3_s.jpg")):80>=k.score?(l(".slideshow .page_end").className=
"scenery page_end page_end_l2",d("\u6211\u7684\u7ae5\u5fc3\u6307\u6570\u662f"+k.score+"\uff0c\u6beb\u4e0d\u63a9\u9970\u7684\u5b69\u5b50\u6c14\uff01\u4f60\u4e5f\u6765\u8bd5\u8bd5\uff1f","l_2_s.jpg")):(l(".slideshow .page_end").className="scenery page_end page_end_l1",d("\u6211\u7684\u7ae5\u5fc3\u6307\u6570\u662f"+k.score+"\uff0c\u4f20\u8bf4\u4e2d\u7684\u9aa8\u7070\u7ea7\u5b69\u5b50\u738b\uff01\u4f60\u4e5f\u6765\u8bd5\u8bd5\uff1f","l_1_s.jpg"))),setTimeout(function(){mobileshow.next()},1E3))};(function(){k.init();
s(document,"touchmove",function(a){a.preventDefault()});if(!q||.66<screen.width/screen.height){var a=document.documentElement.clientHeight/490*16,b=Math.round(document.documentElement.clientHeight/490*320);document.body.style["font-size"]=a+"px";document.body.style.overflow="hidden";document.body.style.width=b+"px"}else 640>document.body.clientWidth&&(document.body.style["font-size"]=document.body.clientWidth/640*32+"px")})()})();
