(function(){function h(a,b){return(b||document).querySelector(a)}function I(a,b){var c=a.className.replace(new RegExp("\\b"+b+"\\b","g"),"");a.className=c.replace(/ +/g," ").replace(/(^ +| +$)/g,"")+" "+b}function J(a,b){a.className=a.className.replace(new RegExp("\\b"+b+"\\b","g")," ").replace(/ +/g," ").replace(/(^ +| +$)/g,"")}function w(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener(b,c,!1)}function A(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener(b,c,!1)}
function n(a){a=(D+a).replace(/-+/g,"-").replace(/(^-|-$)/g,"").split("-");for(var b=1;b<a.length;b++)a[b]=a[b].substr(0,1).toLocaleUpperCase()+a[b].substr(1).toLowerCase();return a.join("")}function K(){if(navigator.userAgent.match(/MSIE [678]/))try{this.__objType="MediaPlayer",this.audioObj=document.createElement("object"),this.audioObj.classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6",this.audioObj.settings.autoStart=!1,this.audioObj.settings.volume=100}catch(a){}else this.__objType="Audio",
this.audioObj=document.createElement("audio");this.audioObj.style.display="none";this.audioObj.style.position="absolute";this.audioObj.style.left="-100px";this.audioObj.style.top="-100px";document.body.insertBefore(this.audioObj,document.body.firstChild)}function q(a,b,c,d,e,f){a=v(v(b,a),v(d,f));return v(a<<e|a>>>32-e,c)}function r(a,b,c,d,e,f,l){return q(b&c|~b&d,a,b,e,f,l)}function s(a,b,c,d,e,f,l){return q(b&d|c&~d,a,b,e,f,l)}function t(a,b,c,d,e,f,l){return q(c^(b|~d),a,b,e,f,l)}function v(a,
b){var c=(a&65535)+(b&65535);return(a>>16)+(b>>16)+(c>>16)<<16|c&65535}function x(a){h("#promptLayer").style.display="block";h("#promptLayer .txt").style.width=u+"px";h("#promptLayer .txt").style.height=B+"px";h("#promptLayer .txt").innerHTML=a}function y(){h("#promptLayer").style.display="none"}var m=document.createElement("canvas");m.width=m.height=1;0!==m.toDataURL("image/jpeg").indexOf("data:image/jpeg")&&(m=document.createElement("script"),m.type="text/javascript",m.src="/microblog-v3/2015subject/0211_chunjie/cvsjpeg.js",
document.body.insertBefore(m,document.body.firstChild));m="";-1!==navigator.userAgent.indexOf("WebKit")?m="webkit":-1!==navigator.userAgent.indexOf("Firefox")?m="moz":-1!==navigator.userAgent.indexOf("MSIE")&&(m="ms");var L={moz:"animationend",webkit:"webkitAnimationEnd",ms:"MSAnimationEnd"}[m]||"animationend",M={moz:"transitionend",webkit:"webkitTransitionEnd",ms:"MSTransitionEnd"}[m]||"transitionend",D={moz:"",webkit:"-webkit-",ms:""}[m]||"",E="mousedown",F="mousemove",G="mouseup";void 0!==document.ontouchstart&&
(E="touchstart",F="touchmove",G="touchend");var z={_timers:[],mute:!0,init:function(a,b){var c=this;this.ele&&this.uninit();this.ele=h(a);var d;d=document.body.clientWidth;d=640<d?640:d;640>d&&(this.ele.style["font-size"]=d/640*32+"px");this.scenery=(this.ele||document).querySelectorAll(".scenery");for(d=0;d<this.scenery.length;d++)this.scenery[d].style.display="none";this.length=this.scenery.length;this.index=-1;this.cssKey="";b&&b.length?(this.preloadList=b,this.preload()):!1===b?this.showLoading():
this.select(0);var e=-1,f,l,k,g=0;this.__startFn=function(a){a=a.touches?a.touches[0]:a;e=a.pageX;f=a.pageY};this.__moveFn=function(a){if(-1!=e)return a=a.touches?a.touches[0]:a,l=a.pageX-e,k=a.pageY-f,0==g?(0<k&&10<Math.abs(k)&&Math.abs(k)>Math.abs(l)&&(g=-1,c.preMoveScen(k)),0>k&&10<Math.abs(k)&&Math.abs(k)>Math.abs(l)&&(g=1,c.nextMoveScen(k))):10<Math.abs(k)&&c.moveScen(k,g),!1};this.__endFn=function(a){e=-1;0!=g&&c.endMoveScen(g);g=0};w(this.ele,E,this.__startFn);w(this.ele,F,this.__moveFn);w(this.ele,
G,this.__endFn);this.auido_bg||(this.auido_bg=new K,this.auido_bg.setLoop(!0),w(h(".sound"),"click",function(){c.mute?c.playSound():c.stopSound();return!1}))},setSound:function(a){this.soundSrc=a;this.mute?this.stopSound():this.playSound()},stopSound:function(){this.mute=!0;I(h(".sound"),"s_off");J(h(".sound"),"s_on");this.auido_bg.pause()},playSound:function(){this.auido_bg.setSrc(this.soundSrc);this.mute=!1;J(h(".sound"),"s_off");I(h(".sound"),"s_on");this.auido_bg.play()},showLoading:function(){this.loading=
document.createElement("div");this.loading.className="loadingPage";this.loading.innerHTML='<div class="loadingBar"><div class="block_1 loading"></div><div class="block_2 loading"></div><div class="block_3 loading"></div><div class="block_4 loading"></div><div class="block_5 loading"></div></div><div class="loadingTxt">\u8f7d\u5165\u4e2d</div>';this.ele.appendChild(this.loading);this.loading.style.display="block"},hideLoading:function(){this.loading.style.display="none";this.select(0)},preload:function(){var a=
this,b=0,c;this.showLoading();for(var d=0;d<this.preloadList.length;d++)c=new Image,c.onerror=c.onload=function(){b++;b>=a.preloadList.length&&a.hideLoading()},c.src=this.preloadList[d]},uninit:function(){this.ele&&(A(this.ele,E,this.__startFn),A(this.ele,F,this.__moveFn),A(this.ele,G,this.__endFn),this.ele=null,this.auido_bg.pause())},select:function(a,b){var c=this;if(a!=this.index){var d=0;a>this.index?d=1:a<this.index&&(d=-1);-1==this.index&&(d=0);a>=this.length?a=0:0>a&&(a=this.length-1);a+1==
this.length?h(".moveArr").style.display="none":h(".moveArr").style.display="block";this.preScen&&(this.preScen.style.zIndex=1);this.nowScen&&("function"==typeof this.nowScen._endFn&&this.nowScen._endFn(),this.nowScen.style.zIndex=2,this.preScen=this.nowScen);this.nowScen=this.scenery[a];this.nowScen.style.display="block";this.nowScen.style.zIndex=10;this.preloadScen(this.nowScen);clearTimeout(this._autoNextTimer);var e=function(){clearTimeout(c._pageTranEndTimeout);this.removeEventListener(M,e,null);
this.style[n("transition")]="none";this._endFn=null;c.clearPreScen();c.actionScen()};0!==d?(this.nowScen._endFn=e,this.nowScen.addEventListener(M,e,null),this.nowScen.style[n("transition")]="none",this.nowScen.style[n("transform")]="translateY("+d*document.body.clientHeight+"px)",this.preScen&&(this.preScen.style[n("transition")]="none"),b||c.endMoveScen(d)):this.autoNext();this.index=a;this.readyScen();0==d&&this.actionScen()}},next:function(){this.select(this.index+1)},pre:function(){this.select(this.index-
1)},preMoveScen:function(a){this.select(this.index-1,!0);this.moveScen(a,-1)},nextMoveScen:function(a){this.select(this.index+1,!0);this.moveScen(a,1)},moveScen:function(a,b){var c=b*document.body.clientHeight+a,d=c*b/document.body.clientHeight*.1+.9;this.nowScen.style[n("transform-origin")]="50% 50%";this.nowScen.style[n("transform")]="translateY("+c+"px)";this.preScen&&(this.preScen.style[n("transform-origin")]="50% "+(1==b?"0":"100%"),this.preScen.style[n("transform")]="scale("+d+")")},endMoveScen:function(a){var b=
this;setTimeout(function(){b.nowScen.style[n("transform-origin")]="50% 50%";b.nowScen.style[n("transition")]=D+"transform 0.4s ease-out";b.nowScen.style[n("transform")]="translateY(0px)";b.preScen&&(b.preScen.style[n("transition")]=D+"transform 0.4s ease-out",b.preScen.style[n("transform-origin")]="50% "+(1==a?"0":"100%"),b.preScen.style[n("transform")]="scale(0.9)")},10);this.autoNext();clearTimeout(this._pageTranEndTimeout);this._pageTranEndTimeout=setTimeout(function(){b.nowScen._endFn&&b.nowScen._endFn()},
500);this.preloadScen(this.index+1>=this.length-1?this.scenery[0]:this.scenery[this.index+1])},preloadScen:function(a){if(a&&!a.getAttribute("data-isLoad")){for(var b=(a||document).querySelectorAll("img[data-src]"),c=0;c<b.length;c++)b[c].src=b[c].getAttribute("data-src"),b[c].removeAttribute("data-src");a.setAttribute("data-isLoad",1)}},autoNext:function(){var a=this,b=0;clearTimeout(this._autoNextTimer);if(b=this.nowScen.getAttribute("data-autoNext"))b=-1!==b.indexOf("ms")?b==parseFloat(b):1E3*
parseFloat(b),3E3>b&&(b=3E3),this._autoNextTimer=setTimeout(function(){a.next()},b)},clearPreScen:function(){if(this.preScen){this.preScen.style.display="none";this.preScen.childs||(this.preScen.childs=(this.preScen||document).querySelectorAll("*[data-animationIn],*[data-animation],*[data-animationOut]"));for(var a=0;a<this.preScen.childs.length;a++)"function"==typeof this.preScen.childs[a]._endFn&&this.preScen.childs[a]._endFn()}},readyScen:function(){this.nowScen.childs||(this.nowScen.childs=(this.nowScen||
document).querySelectorAll("*[data-animationIn],*[data-animation],*[data-animationOut]"));for(var a,b,c,d=0;d<this.nowScen.childs.length;d++)c=this.nowScen.childs[d],a=c.getAttribute("data-animationIn"),b=c.getAttribute("data-animation"),c.getAttribute("data-animationOut"),a&&(a=a.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)))?/i))&&3<=a.length?c.style.display="none":b&&(b=b.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)))?/i))&&3<=b.length&&(c.setAttribute("data-endClassName",
c.getAttribute("data-endClassName")||c.className),c.className=c.getAttribute("data-endClassName")+" "+b[1],c.style[n("animation-duration")]=b[2],c.style[n("animation-fill-mode")]="backwards",c.style[n("animation-play-state")]="paused")},actionScen:function(){var a;this.nowScen.childs||(this.nowScen.childs=(this.nowScen||document).querySelectorAll("*[data-animationIn],*[data-animation],*[data-animationOut]"));for(;a=this._timers.pop();)clearTimeout(a);for(var b,c,d=0;d<this.nowScen.childs.length;d++)c=
this.nowScen.childs[d],a=c.getAttribute("data-animationIn"),b=c.getAttribute("data-animation"),c.getAttribute("data-animationOut"),a&&(a=a.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?/i))&&3<=a.length?this._actionIn(c):b&&(b=b.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?(?:\s(\d+|infinite))?/i))&&3<=b.length&&this._action(c)},_actionIn:function(a){var b=this,c=a.getAttribute("data-animationIn").match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?/i),d=function(){this.removeEventListener(L,
arguments.call,null);this.getAttribute("data-endClassName")&&(this.className=this.getAttribute("data-endClassName"));this.removeAttribute("data-endClassName");this._endFn=null;delete this._endFn;b._action(this)};a.addEventListener(L,d,null);a._endFn=d;a.style.display="";a.setAttribute("data-endClassName",a.getAttribute("data-endClassName")||a.className);a.className=a.getAttribute("data-endClassName")+" "+c[1];a.style[n("animation-duration")]=c[2];a.style[n("animation-delay")]=c[3]||0;a.style[n("animation-fill-mode")]=
"both";a.style[n("animation-iteration-count")]=1;a.style[n("animation-play-state")]="running"},_ele_animation_end_event_fn:function(){this.getAttribute("data-endClassName")&&(this.className=this.getAttribute("data-endClassName"));this.removeAttribute("data-endClassName");this._endFn=null;delete this._endFn},_action:function(a){var b=a.getAttribute("data-animation");b&&(b=b.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?(?:\s(\d+|infinite))?/i))&&3<=b.length&&(a._endFn=this._ele_animation_end_event_fn,
a.style.display="",a.setAttribute("data-endClassName",a.getAttribute("data-endClassName")||a.className),a.className=a.getAttribute("data-endClassName")+" "+b[1],a.style[n("animation-duration")]=b[2],a.style[n("animation-delay")]=b[3]||0,a.style[n("animation-fill-mode")]="both",a.style[n("animation-iteration-count")]=parseFloat(b[4])?b[4]:"infinite",a.style[n("animation-play-state")]="running")}};K.prototype={mute:!1,setMute:function(a){this.mute=a=!0===a;if("Audio"==this.__objType)this.audioObj.muted=
a;else try{this.audioObj.settings.mute=a}catch(b){}},setVolume:function(a){a=parseInt(a);100<a?a=100:0>a&&(a=0);if("Audio"==this.__objType)this.audioObj.volume=a/100;else try{this.audioObj.settings.volume=a}catch(b){}},play:function(){if("Audio"==this.__objType)this.audioObj.play();else try{this.audioObj.controls.play()}catch(a){}},setLoop:function(a){a=1==a;if("Audio"==this.__objType)this.audioObj.loop=a;else try{this.audioObj.settings.playCount=a?9999:1}catch(b){}},pause:function(){if("Audio"==
this.__objType)this.audioObj.pause();else try{this.audioObj.controls.pause()}catch(a){}},setSrc:function(a){if("Audio"==this.__objType)this.audioObj.src=a;else try{this.audioObj.URL=a}catch(b){}}};var N=function(a){for(var b=[],c=0;c<8*a.length;c+=8)b[c>>5]|=(a.charCodeAt(c/8)&255)<<c%32;a=8*a.length;b[a>>5]|=128<<a%32;b[(a+64>>>9<<4)+14]=a;a=1732584193;for(var c=-271733879,d=-1732584194,e=271733878,f=0;f<b.length;f+=16){var l=a,k=c,g=d,Q=e;a=r(a,c,d,e,b[f+0],7,-680876936);e=r(e,a,c,d,b[f+1],12,-389564586);
d=r(d,e,a,c,b[f+2],17,606105819);c=r(c,d,e,a,b[f+3],22,-1044525330);a=r(a,c,d,e,b[f+4],7,-176418897);e=r(e,a,c,d,b[f+5],12,1200080426);d=r(d,e,a,c,b[f+6],17,-1473231341);c=r(c,d,e,a,b[f+7],22,-45705983);a=r(a,c,d,e,b[f+8],7,1770035416);e=r(e,a,c,d,b[f+9],12,-1958414417);d=r(d,e,a,c,b[f+10],17,-42063);c=r(c,d,e,a,b[f+11],22,-1990404162);a=r(a,c,d,e,b[f+12],7,1804603682);e=r(e,a,c,d,b[f+13],12,-40341101);d=r(d,e,a,c,b[f+14],17,-1502002290);c=r(c,d,e,a,b[f+15],22,1236535329);a=s(a,c,d,e,b[f+1],5,-165796510);
e=s(e,a,c,d,b[f+6],9,-1069501632);d=s(d,e,a,c,b[f+11],14,643717713);c=s(c,d,e,a,b[f+0],20,-373897302);a=s(a,c,d,e,b[f+5],5,-701558691);e=s(e,a,c,d,b[f+10],9,38016083);d=s(d,e,a,c,b[f+15],14,-660478335);c=s(c,d,e,a,b[f+4],20,-405537848);a=s(a,c,d,e,b[f+9],5,568446438);e=s(e,a,c,d,b[f+14],9,-1019803690);d=s(d,e,a,c,b[f+3],14,-187363961);c=s(c,d,e,a,b[f+8],20,1163531501);a=s(a,c,d,e,b[f+13],5,-1444681467);e=s(e,a,c,d,b[f+2],9,-51403784);d=s(d,e,a,c,b[f+7],14,1735328473);c=s(c,d,e,a,b[f+12],20,-1926607734);
a=q(c^d^e,a,c,b[f+5],4,-378558);e=q(a^c^d,e,a,b[f+8],11,-2022574463);d=q(e^a^c,d,e,b[f+11],16,1839030562);c=q(d^e^a,c,d,b[f+14],23,-35309556);a=q(c^d^e,a,c,b[f+1],4,-1530992060);e=q(a^c^d,e,a,b[f+4],11,1272893353);d=q(e^a^c,d,e,b[f+7],16,-155497632);c=q(d^e^a,c,d,b[f+10],23,-1094730640);a=q(c^d^e,a,c,b[f+13],4,681279174);e=q(a^c^d,e,a,b[f+0],11,-358537222);d=q(e^a^c,d,e,b[f+3],16,-722521979);c=q(d^e^a,c,d,b[f+6],23,76029189);a=q(c^d^e,a,c,b[f+9],4,-640364487);e=q(a^c^d,e,a,b[f+12],11,-421815835);
d=q(e^a^c,d,e,b[f+15],16,530742520);c=q(d^e^a,c,d,b[f+2],23,-995338651);a=t(a,c,d,e,b[f+0],6,-198630844);e=t(e,a,c,d,b[f+7],10,1126891415);d=t(d,e,a,c,b[f+14],15,-1416354905);c=t(c,d,e,a,b[f+5],21,-57434055);a=t(a,c,d,e,b[f+12],6,1700485571);e=t(e,a,c,d,b[f+3],10,-1894986606);d=t(d,e,a,c,b[f+10],15,-1051523);c=t(c,d,e,a,b[f+1],21,-2054922799);a=t(a,c,d,e,b[f+8],6,1873313359);e=t(e,a,c,d,b[f+15],10,-30611744);d=t(d,e,a,c,b[f+6],15,-1560198380);c=t(c,d,e,a,b[f+13],21,1309151649);a=t(a,c,d,e,b[f+4],
6,-145523070);e=t(e,a,c,d,b[f+11],10,-1120210379);d=t(d,e,a,c,b[f+2],15,718787259);c=t(c,d,e,a,b[f+9],21,-343485551);a=v(a,l);c=v(c,k);d=v(d,g);e=v(e,Q)}b=[a,c,d,e];a="";for(c=0;c<4*b.length;c++)a+="0123456789abcdef".charAt(b[c>>2]>>c%4*8+4&15)+"0123456789abcdef".charAt(b[c>>2]>>c%4*8&15);return a},R=function(){function a(a,b,c,l,k){var g=a.getShortAt(b+2,k);l=a.getLongAt(b+4,k);c=a.getLongAt(b+8,k)+c;switch(g){case 1:case 7:if(1==l)return a.getByteAt(b+8,k);c=4<l?c:b+8;b=[];for(g=0;g<l;g++)b[g]=
a.getByteAt(c+g);return b;case 2:return a.getStringAt(4<l?c:b+8,l-1);case 3:if(1==l)return a.getShortAt(b+8,k);c=2<l?c:b+8;b=[];for(g=0;g<l;g++)b[g]=a.getShortAt(c+2*g,k);return b;case 4:if(1==l)return a.getLongAt(b+8,k);b=[];for(g=0;g<l;g++)b[g]=a.getLongAt(c+4*g,k);return b;case 5:if(1==l)return a.getLongAt(c,k)/a.getLongAt(c+4,k);b=[];for(g=0;g<l;g++)b[g]=a.getLongAt(c+8*g,k)/a.getLongAt(c+4+8*g,k);return b;case 9:if(1==l)return a.getSLongAt(b+8,k);b=[];for(g=0;g<l;g++)b[g]=a.getSLongAt(c+4*g,
k);return b;case 10:if(1==l)return a.getSLongAt(c,k)/a.getSLongAt(c+4,k);b=[];for(g=0;g<l;g++)b[g]=a.getSLongAt(c+8*g,k)/a.getSLongAt(c+4+8*g,k);return b}}var b={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",
273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},c=function(a,b,c){var l=a,k=b||0,g=0;this.getRawData=function(){return l};"string"==typeof a?(g=c||l.length,this.getByteAt=function(a){return l.charCodeAt(a+
k)&255}):"unknown"==typeof a&&(g=c||IEBinary_getLength(l),this.getByteAt=function(a){return IEBinary_getByteAt(l,a+k)});this.getLength=function(){return g};this.getSByteAt=function(a){a=this.getByteAt(a);return 127<a?a-256:a};this.getShortAt=function(a,b){var c=b?(this.getByteAt(a)<<8)+this.getByteAt(a+1):(this.getByteAt(a+1)<<8)+this.getByteAt(a);0>c&&(c+=65536);return c};this.getSShortAt=function(a,b){var c=this.getShortAt(a,b);return 32767<c?c-65536:c};this.getLongAt=function(a,b){var c=this.getByteAt(a),
d=this.getByteAt(a+1),e=this.getByteAt(a+2),f=this.getByteAt(a+3),c=b?(((c<<8)+d<<8)+e<<8)+f:(((f<<8)+e<<8)+d<<8)+c;0>c&&(c+=4294967296);return c};this.getSLongAt=function(a,b){var c=this.getLongAt(a,b);return 2147483647<c?c-4294967296:c};this.getStringAt=function(a,b){for(var c=[],d=a,e=0;d<a+b;d++,e++)c[e]=String.fromCharCode(this.getByteAt(d));return c.join("")};this.getCharAt=function(a){return String.fromCharCode(this.getByteAt(a))};this.toBase64=function(){return window.btoa(l)};this.fromBase64=
function(a){l=window.atob(a)}};return function(d,e){var f;a:{var l=new c(d);if(255!=l.getByteAt(0)||216!=l.getByteAt(1))f=!1;else{var k=2;for(f=l.getLength();k<f;){if(255!=l.getByteAt(k)){f=!1;break a}var g=l.getByteAt(k+1);if(22400==g||225==g){b:if(f=l,g=k+4,l.getShortAt(k+2,!0),"Exif"!=f.getStringAt(g,4))f=!1;else{var h=void 0,l=g+6;if(18761==f.getShortAt(l))h=!1;else if(19789==f.getShortAt(l))h=!0;else{f=!1;break b}if(42!=f.getShortAt(l+2,h)||8!=f.getLongAt(l+4,h))f=!1;else{for(var k=l+8,g=b,n=
f.getShortAt(k,h),p={},m=0;m<n;m++){var q=k+12*m+2,r=g[f.getShortAt(q,h)];p[r]=a(f,q,l,k,h)}f=p}}break a}k+=2+l.getShortAt(k+2,!0)}f=void 0}}return f[e]?f[e]:""}}(),O=navigator.userAgent.match(/ OS (\d+).*? Mac OS/)||!1;navigator.userAgent.indexOf("NetType/WIFI");if(-1!==navigator.userAgent.indexOf("Messenger")&&"t.people.com.cn"!=location.host)location.href="http://t.people.com.cn/wx/father";else{var C={name:"urlcache",get:function(a){if(/[&\\=\|\?%]/.test(a))window.console&&console.log("name\u4e0d\u80fd\u5305\u542b\u7279\u6b8a\u7b26\u53f7:"+
a);else if(window.localStorage&&(a=(window.localStorage[this.name]||"").match(RegExp("(?:^|&)"+a+"=([^&]*)"))))return decodeURIComponent(a[1])},set:function(a,b){if(/[&\\=\|\?%]/.test(a))return window.console&&console.log("name\u4e0d\u80fd\u5305\u542b\u7279\u6b8a\u7b26\u53f7:"+a),!1;if(window.localStorage){var c=window.localStorage[this.name]||"",c=void 0===this.get(a)?c+((""===c?"":"&")+a+"="+b.replace(/&/g,"%26").replace(/=/g,"%3D")):c.replace(RegExp("(^|&)"+a+"=([^&]*)"),"$1"+a+"="+encodeURIComponent(b));
window.localStorage[this.name]=c;return!0}return!1},del:function(a){if(/[&\\=\|\?%]/.test(a))return alert("name\u4e0d\u80fd\u5305\u542b\u7279\u6b8a\u7b26\u53f7"),!1;if(window.localStorage&&void 0!==this.get(a)){var b=window.localStorage[this.name]||"",b=b.replace(RegExp("(^|&)"+a+"=([^&]*)"),"");window.localStorage[this.name]=b.replace(/^&/,"");return!0}return!1},clear:function(){window.localStorage&&(window.localStorage[this.name]="")}},p={ready:!0,limit:7,maxWidth:532,maxHeight:532,type:"*",num:0,
multiple:!0,init:function(){var a=this;this.fileRef=document.createElement("div");this.fileRef.style.width="1px";this.fileRef.style.height="1px";this.fileRef.style.overflow="hidden";this.fileRef.style.position="absolute";this.fileRef.style.zIndex=900;this.fileRef.style.left="-10px";this.fileRef.style.top="-10px";document.body.appendChild(this.fileRef);this.form=document.createElement("form");this.form.className="ente_uploadForm";this.form.setAttribute("target","enteUploadImgFrame");this.form.setAttribute("enctype",
"multipart/form-data");this.form.setAttribute("method","post");this.form.style.width="260px";this.fileRef.appendChild(this.form);this.form.innerHTML='<div class="ente_f"><input type="file" multiple="multiple" accept="image/'+this.type+'" name="upload" /></div>';this.file=h("input[type=file]",this.form);this.fileBox=h(".ente_f",this.form);this.form.style.opacity="0";if(O){var b=0,c=function(){b++;3<=b&&0==a.file.files.length&&"function"==typeof a.oncomplete&&(a.oncomplete(),A(document,"touchstart",
c))};this.file.onclick=function(){"function"==typeof a.onbegin&&(a.onbegin(),w(document,"touchstart",c))}}this.file.onchange=function(){O||"function"!=typeof a.onbegin||(a.onbegin(),w(document,"touchstart",c));A(document,"touchstart",c);a.setDisabled(!0);a._push(this)}},setMultiple:function(a){(this.multiple=!0===a)?this.file.setAttribute("multiple","multiple"):this.file.removeAttribute("multiple")},bind:function(a){var b=this;a="string"==typeof a?h(a):a;a.onmouseover=function(){b.coverTarget(a)};
this.coverTarget(a)},unbind:function(a){a.onmouseover=null},_loadQueue:[],_load:function(){if(this._loadQueue.length){var a=this._loadQueue.shift();a&&this._readExif(a)}},_push:function(a){_self=this;for(var b=this.num=this.sum=0;b<a.files.length&&!(b>=this.limit);b++)this._loadQueue.push(a.files[b]),this.sum++,_self._load()},_readExif:function(a){var b=this,c=(window.URL||window.webkitURL).createObjectURL(a);if(a)try{var d=new FileReader;d.onload=function(a){a=R(this.result,"Orientation");b._readFile(c,
a)};d.onerror=function(a){b._readFile(c,0)};d.readAsBinaryString(a)}catch(e){this._readFile(c,0)}},_readFile:function(a,b){var c=this,d=new Image,e=b||0,f=navigator.userAgent.match(/ OS (\d+).*? Mac OS/)||!1;f&&(f=parseInt(f[1]));d.onload=function(){var a=d.width,b=d.height,g=a/b,h,n,m,p=1;3E3<Math.max(a,b)&&(a*=.8,b*=.8);if(f&&8>f){h=document.createElement("canvas");h.width=a;h.height=b;m=h.getContext("2d");m.drawImage(d,0,0,a,b);m=m.getImageData(0,0,1,b).data;for(var p=c._detectSquash(m,b,0),q=
0;1!=p&&3>q;)q++,n=document.createElement("canvas"),n.width=a,n.height=b,m=n.getContext("2d"),m.drawImage(h,0,0,a,b/p),m=m.getImageData(0,0,1,b).data,p=c._detectSquash(m,b,0),1!=p&&(a*=.8,b*=.8),h=n}else h=d;if(6==e||8==e)g=a,a=b,b=g,g=a/b;a>c.maxWidth&&(a=parseInt(c.maxWidth),b=parseInt(a/g));b>c.maxHeight&&(b=parseInt(c.maxHeight),a=parseInt(b*g));g=document.createElement("canvas");m=g.getContext("2d");g.width=a;g.height=b;switch(e){case 3:m.rotate(180*Math.PI/180);m.drawImage(h,-a,-b,a,b);break;
case 6:m.rotate(90*Math.PI/180);m.drawImage(h,0,-a,b,a);break;case 8:m.rotate(270*Math.PI/180);m.drawImage(h,-b,0,b,a);break;default:m.rotate(0),m.drawImage(h,0,0,a,b)}g=c.zoomCanvas(g,532,532);a=g.toDataURL("image/jpeg",f?.7:.86);g=c.zoomCanvas(g,80,80);g.getContext("2d");smallBase64=g.toDataURL("image/jpeg",.7);"function"==typeof c.onadd&&c.add(a,smallBase64);c._load()};d.onerror=function(){c.onerror("\u6ca1\u6709\u6743\u9650\u8bbf\u95ee\u6587\u4ef6");alert("\u7531\u4e8e\u5b89\u5168\u9650\u5236\uff0c\u65e0\u6cd5\u4ece\u624b\u673a\u4e2d\u8bfb\u53d6\u7167\u7247\uff0c\u8bf7\u5c1d\u8bd5\u5728\u6d4f\u89c8\u5668\u4e2d\u6253\u5f00\uff0c\u4f7f\u7528\u62cd\u7167\u4e0a\u4f20\u3002")};
d.src=a},zoomCanvas:function(a,b,c){var d,e,f,l,k=a.width,g=a.height;e=d=0;f=k;l=g;if(1.8<k/b){d=document.createElement("canvas");e=document.createElement("canvas");f=d.getContext("2d");l=e.getContext("2d");d.width=k;d.height=g;for(f.drawImage(a,0,0,k,g);1.8<k/b;)k=Math.round(.6*k),g=Math.round(.6*g),e.width=k,e.height=g,l.drawImage(d,0,0,k,g),d.width=k,d.height=g,f.drawImage(e,0,0,k,g);a=d}a.width>a.height?(f=a.height/c*b,l=a.height,d=(a.width-a.height/c*b)/2,e=0):(f=a.width,l=a.width/b*c,d=0,e=
(a.height-a.width/b*c)/2);k=document.createElement("canvas");k.width=b;k.height=c;k.getContext("2d").drawImage(a,d,e,f,l,0,0,b,c);return k},error:function(a){if("function"==typeof this.onerror)this.onerror(a);this.setDisabled(!1);this.file.value=""},add:function(a,b){if("function"==typeof this.onadd)this.onadd(a,b);this.num++;if("function"==typeof this.onprogress)this.onprogress(this.num/this.sum);if(this.num==this.sum&&(this.setDisabled(!1),this.file.value="","function"==typeof _self.oncomplete))_self.oncomplete()},
_detectSquash:function(a,b,c){switch(c){case 3:case 6:for(c=b-1;0<=c&&0!==a[4*c+3];c--);c=b-2-c;break;default:for(c=0;c<b&&0!==a[4*c+3];c++);--c}if(2>=b-c)return 1;a=c/(b-1);return 0>=a?1:a},coverTarget:function(a){this.target=a="string"==typeof a?h(a):a;var b=0,c=0,d=a;try{for(;null!=d&&d!=document.body&&d!=document.documentElement&&void 0!=d;)b+=d.offsetLeft,c+=d.offsetTop,d=d.offsetParent}catch(e){}this.fileRef.style.width=a.offsetWidth+"px";this.fileRef.style.height=a.offsetHeight+"px";this.fileRef.style.left=
b+"px";this.fileRef.style.top=c+"px";this.fileRef.style.display="block";this.revise||(-1!==navigator.userAgent.indexOf("MSIE 8")?this.fileBox.style.left="-183px":navigator.userAgent.match(/MSIE (9|10)/)?this.fileBox.style.left="-"+(15*this.fileBox.offsetWidth-this.target.offsetWidth)+"px":-1===navigator.userAgent.indexOf("MSIE")&&(this.fileBox.style.left="-100px"),this.revise=!0)},setDisabled:function(a){a=!!a;this.ready=!a;this.form.style.display=a?"none":"block"},hide:function(){this.fileRef.style.display=
"none"},show:function(){this.fileRef.style.display="block"}},P={page:1,bgAudio:"http://i0.peopleurl.cn/microblog-v3/h5/father/images/sound."+(navigator.userAgent.match(/Firefox|Opera/i)?"ogg":"mp3"),firstItem:{isFirst:!0,isDefault:!0,defaultSrc:"",defaultTxt:"",smallBase64:"",txt:"",imgUrl:""},allDefaultTxt:["\u81ea\u6211\u5471\u5471\u5760\u5730\uff0c\n\u4f60\u5c31\u662f\u6211\u7684\u8d85\u7ea7\u82f1\u96c4\uff0c\n\u62a4\u6211\u5728\u81c2\u5f2f\u3002 \u4e00\u4e2a\u73a9\u5177\u4e00\u53e5\u80af\u5b9a\uff0c\n\u90fd\u80fd\u8ba9\u6211\u6210\u4e3a\u6700\u5e78\u798f\u7684\u5c0f\u5b69\u3002 \u4f60\u5bf9\u6211\u4e25\u5389\u548c\u8d23\u9a82\uff0c\n\u8ba9\u6211\u77e5\u9053\u5982\u4f55\u505a\u5f97\u66f4\u597d\u3002 \u5bf9\u6211\u7684\u5ba0\u6eba\u548c\u5173\u7231\uff0c\n\u662f\u6211\u4eba\u751f\u6700\u7f8e\u597d\u7684\u753b\u9762\u3002 \u4f60\u7528\u6700\u6c89\u9ed8\u7684\u966a\u4f34\uff0c\n\u8be0\u91ca\u4e86\u201c\u7231\u201d\u7684\u53e6\u4e00\u79cd\u8868\u8fbe\u3002 \u4f46\u6211\u5374\u60f3\u5927\u58f0\u558a\u51fa\uff1a\n\u8001\u7238\uff0c\u6211\u7231\u4f60\uff01 \u4e16\u754c\u8fd9\u4e48\u5927\uff0c\u552f\u6709\u4f60\uff0c\n\u4e00\u76f4\u662f\u6211\u7684\u201c\u8d85\u7ea7\u82f1\u96c4\u201d\u3002".split(" ")],
defaultTxtIndex:0,elementsPath:"http://i0.peopleurl.cn/microblog-v3/h5/father/images/",style:1,items:[],limit:7,init:function(){var a=this;h("#btnPreview").onclick=function(){a.preview()};h("#btnToEdit").onclick=function(){z.uninit();a.setPage(2)};h("#btnSubmit").onclick=function(){a.submit()};h("#btnDelete").onclick=function(){a.delItem()};h("#btnSaveChange").onclick=function(){a.saveChange()};this.defaultTxt=this.allDefaultTxt[0];this.setStyle(1);h("#firstItem").onclick=function(){a.change(a.firstItem)};
this.items.push(this.firstItem)},setStyle:function(a){this.style=a||1;this.setPage(2);this.firstItem.img=h("#firstPageImg");this.firstItem.imgUrl=this.firstItem.defaultSrc=this.firstItem.img.src=this.elementsPath+"icon.jpg";h("#lastPageImg").setAttribute("src",this.elementsPath+"icon_e_0"+this.style+".jpg");this.defaultTxt=this.allDefaultTxt[this.style-1]||this.allDefaultTxt[0];this.resetDefaTxt()},setPage:function(a){1===a?(h(".e_page_2").style.display="none",h(".e_page_3").style.display="none",
p.hide(),this.page=1):2===a?(h(".e_page_2").style.display="block",h(".e_page_3").style.display="none",this.checkLimit(),this.page=2):3===a&&(h(".e_page_2").style.display="none",h(".e_page_3").style.display="block",p.hide(),this.page=3)},addImage:function(a,b){var c=this;if(!(this.items.length>=this.limit+1)){var d={};d.smallBase64=b;d.li=document.createElement("li");d.img=new Image;var e=document.createElement("span");d.img.src=a;d.li.appendChild(e);e.appendChild(d.img);e=document.createElement("div");
e.className="itemTxt";d.li.appendChild(e);h("#addItemBtn").parentNode.insertBefore(d.li,h("#addItemBtn"));d.txt=this.defaultTxt[this.defaultTxtIndex];d.isDefaTxt=!0;this.defaultTxtIndex++;this.defaultTxtIndex>=this.defaultTxt.length&&(this.defaultTxtIndex=0);d.li.onclick=function(){c.change(d)};this.items.push(d);this.checkLimit()}},checkLimit:function(){this.items.length>=this.limit+1?(h("#addItemBtn").style.display="none",p.hide()):(h("#addItemBtn").style.display="block",p.coverTarget("#addImage"),
p.show(),p.limit=this.limit-this.items.length+1)},preview:function(){if(1==this.items.length)alert("\u81f3\u5c11\u9700\u8981\u6dfb\u52a01\u5f20\u7167\u7247\uff0c\u8bf7\u70b9\u51fb\u201c+\u201d\u6309\u94ae\u6dfb\u52a0\u7167\u7247\u3002");else{z.uninit();for(var a='<div class="globalPackage"><div class="sound s_off"></div><div class="moveArr"></div></div><div class="scenery page_0'+this.style+(0==this.firstItem.isDefault?" userScenery_2":"")+'">'+(0==this.firstItem.isDefault?'<div class="ornament" data-animationIn="zoomIn 1s 1s"></div><div class="userPic"><img src="'+
this.firstItem.img.src+'" alt=""></div>':'<div class="bg"></div><div class="month"></div><div class="superman" data-animationIn="supermanIn 1.5s 0.5s" data-animation="supermanShake 5s 0 0"></div>')+'<div class="title" data-animationIn="fadeInDown 2s 0"></div><div class="footer" data-animationIn="fadeInUp 1s 2s" data-animation="shine 2s 0 2"><div class="logo"></div></div></div>',b=["fadeInLeft 1s 0","fadeInRight 1s 0","fadeInDown 1s 0","fadeInUp 1s 0"],c=["fadeInRight 3s ","fadeInLeft 3s ","fadeInRight 3s ",
"fadeInLeft 3s "],d=1;d<this.items.length;d++)a+='<div class="scenery userScenery_'+(0==(d-1)%2?"1":"2")+'" data-autoNext="10000"><div class="ornament" data-animationIn="zoomIn 1s 1s"></div><div class="en" data-animationIn="fadeInDown 1s 1s"></div>'+(0==(d-1)%2?'<div class="pic_bg" data-animationIn="picBgAnim 1s 1s"></div>':"")+'<div class="userPic" data-animationIn="'+b[(d-1)%b.length]+'"><img src="'+this.items[d].img.src+'"></div>',this.items[d].txt&&(a+='<div class="userTxt" data-animationIn="'+
c[(d-1)%c.length]+'">'+(-1===this.items[d].txt.indexOf("\n")?this.items[d].txt.replace(/</g,"&lt;").replace(/([,\uff0c;\uff1b\u3002])/g,"$1<br>"):this.items[d].txt.replace(/</g,"&lt;").replace(/\n/g,"<br>"))+"</div>"),a+="</div>";a+='<div class="scenery page_end_0'+this.style+'"><div class="bg"></div><div class="month"><p>\u5e73\u51e1\u4e16\u754c\u91cc\uff0c<br>\u8c22\u8c22\u4f60\uff0c<br>\u8ba9\u6211\u65e0\u6240\u754f\u60e7\u53bb\u8ffd\u68a6</p></div><div class="superman" data-animationIn="supermanIn 1.5s 0" data-animation="supermanShake 5s 0 0"></div></div>';
h(".slideshow").innerHTML=a;this.setPage(3);z.init(".slideshow");z.setSound(this.bgAudio)}},submit:function(){if(1>=this.items.length)alert("\u81f3\u5c11\u9700\u8981\u6dfb\u52a01\u5f20\u7167\u7247\uff0c\u8bf7\u70b9\u51fb\u201c+\u201d\u6309\u94ae\u6dfb\u52a0\u7167\u7247\u3002"),this.setPage(2);else{for(var a=0;a<this.items.length;a++);this.uploadImg()}},change:function(a){this._changeItem=a;h(".imgTxtLayer").style.display="block";h(".imgTxtLayer .it_pic img").setAttribute("src",a.img.src);h(".imgTxtLayer .it_txt textarea").value=
a.txt||"";p.__onadd=p.onadd;p.onadd=function(b,c){a.img.src=b;a.smallBase64=c;a.isFirst&&(a.isDefault=!1,a.imgUrl="");h(".imgTxtLayer .it_pic img").setAttribute("src",a.img.src)};p.setMultiple(!1);p.bind("#changeImage")},saveChange:function(){if(this._changeItem){var a=h(".imgTxtLayer .it_txt textarea").value||"";a!=this._changeItem.txt&&(this._changeItem.isDefaTxt=!1);this._changeItem.txt=a;this.closeChangeLayer()}},closeChangeLayer:function(){h(".imgTxtLayer").style.display="none";p.onadd=p.__onadd||
p.onadd;p.__onadd=null;p.setMultiple(!0);p.unbind("#changeImage");p.coverTarget("#addImage");this._changeItem=null},resetDefaTxt:function(){this.defaultTxtIndex=0;if(this.items.length){for(var a=1;a<this.items.length;a++)this.items[a].isDefaTxt&&(this.items[a].txt=this.defaultTxt[(a-1)%this.defaultTxt.length]);this.defaultTxtIndex=this.items.length}},delItem:function(a){if(a=a||this._changeItem)if(a.isFirst)a.isDefault?alert("\u5c01\u9762\u65e0\u6cd5\u5220\u9664"):confirm("\u5c01\u9762\u65e0\u6cd5\u5220\u9664\uff0c\u662f\u5426\u6062\u590d\u9ed8\u8ba4\u5c01\u9762\u5417\uff1f")&&
(a.img.src=a.defaultSrc,a.imgUrl=a.defaultSrc,a.txt=a.defaultTxt,a.isDefault=!0,a.smallBase64="",this.closeChangeLayer());else if(confirm("\u786e\u5b9a\u8981\u5220\u9664\u5f53\u524d\u7167\u7247\u5417\uff1f")){for(var b=[],c=0;c<this.items.length;c++)this.items[c]!=a?b.push(this.items[c]):a.li.parentNode.removeChild(a.li);this.items=b;this.checkLimit();this.resetDefaTxt();this.closeChangeLayer()}},uploadImg:function(){function a(){b.uploadIndex++;if(b.uploadIndex>=b.items.length)b.uploadJSON();else{var c=
b.items[b.uploadIndex];c.smallBase64&&(c.md5=N(c.smallBase64),c.imgUrl=C.get("img_"+c.md5));c.imgUrl?a():(f.open("POST","/wx2015ImageUpload.action",!0),f.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),c="dataStr="+encodeURIComponent(c.img.src.substr(23))+"&dataSmall="+encodeURIComponent(c.smallBase64.substr(23)),f.send(c))}}var b=this;x("\u56fe\u7247\u4e0a\u4f20\u4e2d...");this.uploadIndex=-1;for(var c=0,d=0,e=0;e<this.items.length;e++)this.items[e].imgUrl||(c+=this.items[e].smallBase64.length+
this.items[e].img.src.length);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(4==f.readyState&&200==f.status){var c=f.responseText;if(c&&/^\d+$/.test(c)){var e;e="";c="http://i0.peopleurl.cn/nmsgimage/wx/"+c.substr(0,10)+"/"+e+c+".jpg";b.items[b.uploadIndex].imgUrl=c;C.set("img_"+b.items[b.uploadIndex].md5,c);d+=b.items[b.uploadIndex].smallBase64.length+b.items[b.uploadIndex].img.src.length;a()}else alert("\u56fe\u7247\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01code:600"),
y()}else 4==f.readyState&&(alert("\u7f51\u7edc\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01code:"+f.status),y())};f.ontimeout=function(a){alert("\u4e0a\u4f20\u8d85\u65f6\uff0c\u8bf7\u5728\u8f83\u597d\u7684\u7f51\u7edc\u73af\u5883\u4e2d\u518d\u8bd5\uff01");y()};f.upload&&(f.upload.onprogress=function(a){a.lengthComputable&&(a=(d+a.loaded)/c,a=1<a?1:a,x("\u56fe\u7247\u4e0a\u4f20\u8fdb\u5ea6<br>"+Math.round(c/1024)+"k/"+Math.round(100*a)+"%"))});a()},getJSON:function(){for(var a='{"style":'+this.style+
",",a=a+('"firstScrn":{"src":"'+(this.firstItem.isDefault?"":this.firstItem.imgUrl)),a=a+('","txt":"'+encodeURI(this.firstItem.txt.replace(/</g,"&lt;")||"").replace(/(\\|")/g,"\\$1")+'","width":'+this.firstItem.img.width+',"height":'+this.firstItem.img.height+"},"),a=a+'"scrnery":[',b=1;b<this.items.length;b++)1!=b&&(a+=","),a+='{"src":"'+this.items[b].imgUrl+'","txt":"'+encodeURI(this.items[b].txt.replace(/</g,"&lt;")||"").replace(/(\\|")/g,"\\$1")+'","width":'+this.items[b].img.width+',"height":'+
this.items[b].img.height+"}";return a+"]}"},uploadJSON:function(){var a=new XMLHttpRequest;x("\u4e0a\u4f20\u573a\u666f\u4e2d...");var b=encodeURIComponent(this.getJSON()),c=N(b),d=C.get("json_"+c);d?(window.localStorage&&(localStorage.fqId=d),x("\u8bf7\u7a0d\u5019..."),window.location.href="/h5/father/"+d):(a.onreadystatechange=function(){if(4==a.readyState&&200==a.status){var b=a.responseText;b&&/^\d+$/.test(b)?(window.localStorage&&(localStorage.fqId=b),C.set("json_"+c,b),x("\u8bf7\u7a0d\u5019..."),
setTimeout(function(){window.location.href="/h5/father/"+b},2E3)):(alert("\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01code:601"),y())}else 4==a.readyState&&(alert("\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01code:"+a.status),y())},a.ontimeout=function(a){alert("\u4e0a\u4f20\u8d85\u65f6\uff0c\u8bf7\u5728\u8f83\u597d\u7684\u7f51\u7edc\u73af\u5883\u4e2d\u518d\u8bd5\uff01");y()},a.open("POST","/wx2015ChunjieConfUpload.action",!0),a.setRequestHeader("Content-Type",
"application/x-www-form-urlencoded"),a.send("confDataStr="+b+"&recordType=father&imageCount="+this.items.length))}},u=document.body.clientWidth,B=document.body.clientHeight,u=640<u?640:u,B=1008<B?1008:B,m=u/640;w(document,"touchmove",function(a){a.preventDefault()});var H=navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);(H=H?H[0]:!1)?640>u&&(document.documentElement.style["font-size"]=32*m+"px"):(m=document.documentElement.clientHeight/504*16,u=Math.round(document.documentElement.clientHeight/
504*320),document.body.style["font-size"]=m+"px",document.body.style.overflow="hidden",document.body.style.width=u+"px",m=document.createElement("div"),m.className="pageBtn",m.style.left=u+"px",m.innerHTML='<a href="javascript:void(0)" id="preBtn">\u4e0a\u4e00\u9875</a><a href="javascript:void(0)" id="nextBtn">\u4e0b\u4e00\u9875</a>',h(".e_page_3").appendChild(m),h("#preBtn").onclick=function(){z.pre();return!1},h("#nextBtn").onclick=function(){z.next();return!1});p.onbegin=function(){x("\u5904\u7406\u7167\u7247\u4e2d\uff0c\u8bf7\u7a0d\u540e...")};
p.onadd=function(a,b){P.addImage(a,b)};p.onprogress=function(a){x("\u5904\u7406\u7167\u7247\u4e2d\uff0c\u8fdb\u5ea6"+Math.round(1E4*a)/100+"%")};p.oncomplete=function(){y()};p.init();p.bind("#addImage");P.init()}})();
