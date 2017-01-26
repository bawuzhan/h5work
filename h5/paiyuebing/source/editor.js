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
			location.href = 'http://t.people.com.cn/wx/paiyuebing';
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
		maxWidth : 640,
		maxHeight : 800,
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

				canvas = _self.zoomCanvas(canvas, 160, 160);
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
	
	//编辑器
	var editor = {
		page : 1,
		items : [],
		limit : 9,
		init : function(){
			var _self = this;
			
			Q('#btnPreview').onclick = function(){
				_self.submit();
				//_self.preview();
			};
			// Q('#btnToEdit').onclick = function(){
			// 	_self.setPage(2);
			// };
			// Q('#btnSubmit').onclick = function(){
			// 	_self.submit();
			// };

			Q('#phone').onfocus = function(){
				if(this.value == '请输入您的手机号'){
					this.value = '';
					this.className = 'phoneNumber';
				}
			};
			Q('#phone').onblur = function(){
				if(this.value == ''){
					this.value = '请输入您的手机号';
					this.className = '';
				}
			};

			this.setPage(2);

			//this.setPage(1);
		},
		setPage : function(p){
			var _self = this;
			if(p === 2){
				//Q('.e_page_1').style.display = 'none';
				Q('.e_page_2').style.display = 'block';
				// Q('.e_page_3').style.display = 'none';
				this.checkLimit();
				this.page = 2;
			}else if(p === 3){
				
				// Q('.e_page_2').style.display = 'none';
				// Q('.e_page_3').style.display = 'block';
				// imageLoader.hide();
				// this.page = 3;
				// if(!this.touchPhotos){
				// 	this.touchPhotos = new TouchPhotos({
				// 		canvas : document.getElementById('photosCanvas'),
				// 		width : viewWidth,
				// 		height : viewHeight,
				// 		onclick : function(){
				// 			_self.touchPhotos.canvas.className = 'canvasHide';
				// 			setTimeout(function(){
				// 				_self.touchPhotos.canvas.className = '';
				// 			}, 300);
				// 		}
				// 	});
				// };
				// var imgs = QA('#userPhotos img'),
				// 	imgData = [];
				// for (var i = 0; i < imgs.length; i++) {
				// 	imgs[i].onclick = function(){
				// 		if(document.documentElement.clientWidth > viewWidth){
				// 			_self.touchPhotos.canvas.style.left = (document.documentElement.clientWidth - viewWidth) / 2 + 'px';
				// 		};
				// 		_self.touchPhotos.setImages(imgData, this.getAttribute('data-index'));
				// 		_self.touchPhotos.canvas.className = 'canvasShow';
				// 	};
				// 	imgs[i].setAttribute('data-index', i);
				// 	imgData.push({
				// 		small : imgs[i].src,
				// 		src : imgs[i].getAttribute('data-src')
				// 	});
				// };
				
			}
		},
		addImage : function(img, smallBase64){
			var _self = this;
			if(this.items.length >= this.limit + 1){
				return;
			};
			var item = {};
			item.smallBase64 = smallBase64;
			item.src = img;
			item.li = document.createElement('li');
			item.img = new Image();
			var span = document.createElement('span');
			item.img.src = smallBase64;
			item.li.appendChild(span);
			span.appendChild(item.img);
			var delIcon = document.createElement('div');
			delIcon.className = 'itemDel';
			item.li.appendChild(delIcon);

			//console.log('size:' + (item.src.length / 1024) + ', small size:' + (item.smallBase64.length / 1024));
			Q('#addItemBtn').parentNode.insertBefore(item.li, Q('#addItemBtn'));

			item.li.onclick = function(){
				_self.delItem(item);
			};
			this.items.push(item);
			this.checkLimit();
		},
		checkLimit : function(){
			if(this.items.length >= this.limit){
				Q('#addItemBtn').style.display = 'none';
				imageLoader.hide();
			}else{
				Q('#addItemBtn').style.display = 'block';
				imageLoader.coverTarget('#addImage');
				imageLoader.show();
				imageLoader.limit = this.limit - this.items.length;
			}
		},
		preview : function(){
			this.phoneNumber = Q('#phone').value;
			if(!(/^1[3-8]\d{9}$/).test(this.phoneNumber)){
				alert('为了完成评奖，请正确填写手机号码。');
				return;
			};
			if(this.items.length == 1){
				alert('至少需要添加1张照片，请点击“+”按钮添加照片。');
				return;
			};
			var viewWidth = document.body.clientWidth,
			viewHeight = document.body.clientHeight;


			var html = '<ul>';
			for (var i = 0; i < this.items.length; i++) {
				html += '<li><img src="' + this.items[i].smallBase64 + '" data-src="' + this.items[i].src + '" ></li>';
			};
			html += '</ul>';
			Q('.userPhone span').innerHTML = this.phoneNumber;
			Q('#userPhotos').innerHTML = html;
			this.setPage(3);
		},
		submit : function(){
			this.phoneNumber = Q('#phone').value;
			if(!(/^1[3-8]\d{9}$/).test(this.phoneNumber)){
				alert('为了完成评奖，请正确填写手机号码。');
				return;
			};
			if(this.items.length < 1){
				alert('至少需要添加1张照片，请点击“+”按钮添加照片。');
				return;
			};
			var total = 0;
			for (var i = 0; i < this.items.length; i++) {
				total += this.items[i].img.src.length + this.items[i].smallBase64.length;
			};
			this.uploadImg();
		},
		
		delItem : function(item){
			item = item || this._changeItem;
			if(!item){
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
					_self.uploadData();
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
				var data = 'dataStr=' + encodeURIComponent(item.src.substr(23)) + '&dataSmall=' + encodeURIComponent(item.smallBase64.substr(23));
				xhr.send(data);
			};
			postImg();
		},
		uploadData : function(){
			var API = '/yb2015Submit.action';
			var xhr = new XMLHttpRequest();
			showMessage('作品上传...');
			var imgs = [],
				fileId;
			for (var i = 0; i < this.items.length; i++) {
				fileId = this.items[i].imgUrl.match(/(\d+)\.jpg/i);
				if(fileId){
					imgs.push(fileId[1]);
				};
			};
			imgs = imgs.join('#');
			
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					var rTxt = xhr.responseText;
					if(rTxt && (/^\d+$/).test(rTxt)){
						//成功
						if(window.localStorage){
							localStorage['ybId'] = rTxt;
							localStorage['myYbIdList'] += '_' + rTxt;
						};
						
						showMessage('请稍候...');
						
						setTimeout(function(){
							window.location.href = '/h5/paiyuebing/' + rTxt;
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
			xhr.send('mobile=' + this.phoneNumber + '&imageStr=' + encodeURIComponent(imgs));
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
		return 'http://i0.peopleurl.cn/nmsgimage/wx/' + (id.substr(0, 10)) + '/' + s + id + '.jpg';
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
