var readAsBinaryExif=function(){function m(f,e,c,b,d){var a=f.getShortAt(e+2,d);b=f.getLongAt(e+4,d);c=f.getLongAt(e+8,d)+c;switch(a){case 1:case 7:if(1==b)return f.getByteAt(e+8,d);c=4<b?c:e+8;e=[];for(a=0;a<b;a++)e[a]=f.getByteAt(c+a);return e;case 2:return f.getStringAt(4<b?c:e+8,b-1);case 3:if(1==b)return f.getShortAt(e+8,d);c=2<b?c:e+8;e=[];for(a=0;a<b;a++)e[a]=f.getShortAt(c+2*a,d);return e;case 4:if(1==b)return f.getLongAt(e+8,d);e=[];for(a=0;a<b;a++)e[a]=f.getLongAt(c+4*a,d);return e;case 5:if(1==b)return f.getLongAt(c,d)/f.getLongAt(c+4,d);e=[];for(a=0;a<b;a++)e[a]=f.getLongAt(c+8*a,d)/f.getLongAt(c+4+8*a,d);return e;case 9:if(1==b)return f.getSLongAt(e+8,d);e=[];for(a=0;a<b;a++)e[a]=f.getSLongAt(c+4*a,d);return e;case 10:if(1==b)return f.getSLongAt(c,d)/f.getSLongAt(c+4,d);e=[];for(a=0;a<b;a++)e[a]=f.getSLongAt(c+8*a,d)/f.getSLongAt(c+4+8*a,d);return e}}var n={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},r=function(f,e,c){var b=f,d=e||0,a=0;this.getRawData=function(){return b};"string"==typeof f?(a=c||b.length,this.getByteAt=function(a){return b.charCodeAt(a+d)&255}):"unknown"==typeof f&&(a=c||IEBinary_getLength(b),this.getByteAt=function(a){return IEBinary_getByteAt(b,a+d)});this.getLength=function(){return a};this.getSByteAt=function(a){a=this.getByteAt(a);return 127<a?a-256:a};this.getShortAt=function(a,c){var b=c?(this.getByteAt(a)<<8)+this.getByteAt(a+1):(this.getByteAt(a+1)<<8)+this.getByteAt(a);0>b&&(b+=65536);return b};this.getSShortAt=function(a,b){var c=this.getShortAt(a,b);return 32767<c?c-65536:c};this.getLongAt=function(a,c){var b=this.getByteAt(a),d=this.getByteAt(a+1),e=this.getByteAt(a+2),f=this.getByteAt(a+3),b=c?(((b<<8)+d<<8)+e<<8)+f:(((f<<8)+e<<8)+d<<8)+b;0>b&&(b+=4294967296);return b};this.getSLongAt=function(a,b){var c=this.getLongAt(a,b);return 2147483647<c?c-4294967296:c};this.getStringAt=function(a,b){for(var c=[],d=a,e=0;d<a+b;d++,e++)c[e]=String.fromCharCode(this.getByteAt(d));return c.join("")};this.getCharAt=function(a){return String.fromCharCode(this.getByteAt(a))};this.toBase64=function(){return window.btoa(b)};this.fromBase64=function(a){b=window.atob(a)}};return function(f,e){var c;a:{var b=new r(f);if(255!=b.getByteAt(0)||216!=b.getByteAt(1))c=!1;else{var d=2;for(c=b.getLength();d<c;){if(255!=b.getByteAt(d)){c=!1;break a}var a=b.getByteAt(d+1);if(22400==a||225==a){b:if(c=b,a=d+4,b.getShortAt(d+2,!0),"Exif"!=c.getStringAt(a,4))c=!1;else{var g=void 0,b=a+6;if(18761==c.getShortAt(b))g=!1;else if(19789==c.getShortAt(b))g=!0;else{c=!1;break b}if(42!=c.getShortAt(b+2,g)||8!=c.getLongAt(b+4,g))c=!1;else{for(var d=b+8,a=n,p=c.getShortAt(d,g),k={},h=0;h<p;h++){var l=d+12*h+2,q=a[c.getShortAt(l,g)];k[q]=m(c,l,b,d,g)}c=k}}break a}d+=2+b.getShortAt(d+2,!0)}c=void 0}}return c[e]?c[e]:""}}();

function JPEGEncoder(E){function B(c,r){for(var a=0,b=0,d=[],h=1;16>=h;h++){for(var k=1;k<=c[h];k++)d[r[b]]=[],d[r[b]][0]=a,d[r[b]][1]=h,b++,a++;a*=2}return d}function x(c){var r=c[0];for(c=c[1]-1;0<=c;)r&1<<c&&(z|=1<<y),c--,y--,0>y&&(255==z?(a(255),a(0)):a(z),y=7,z=0)}function a(c){C.push(M[c])}function k(c){a(c>>8&255);a(c&255)}function G(c,r,a,b,d){var h=d[0],k=d[240],q,n,s,l,p,g,f,t,m,e=0;for(q=0;8>q;++q){n=c[e];s=c[e+1];l=c[e+2];p=c[e+3];g=c[e+4];f=c[e+5];t=c[e+6];m=c[e+7];var u=n+m;n-=m;m=s+t;s-=t;t=l+f;l-=f;f=p+g;p-=g;g=u+f;u-=f;f=m+t;m-=t;c[e]=g+f;c[e+4]=g-f;g=.707106781*(m+u);c[e+2]=u+g;c[e+6]=u-g;g=p+l;f=l+s;m=s+n;l=.382683433*(g-m);p=.5411961*g+l;g=1.306562965*m+l;f*=.707106781;l=n+f;n-=f;c[e+5]=n+p;c[e+3]=n-p;c[e+1]=l+g;c[e+7]=l-g;e+=8}for(q=e=0;8>q;++q)n=c[e],s=c[e+8],l=c[e+16],p=c[e+24],g=c[e+32],f=c[e+40],t=c[e+48],m=c[e+56],u=n+m,n-=m,m=s+t,s-=t,t=l+f,l-=f,f=p+g,p-=g,g=u+f,u-=f,f=m+t,m-=t,c[e]=g+f,c[e+32]=g-f,g=.707106781*(m+u),c[e+16]=u+g,c[e+48]=u-g,g=p+l,f=l+s,m=s+n,l=.382683433*(g-m),p=.5411961*g+l,g=1.306562965*m+l,f*=.707106781,l=n+f,n-=f,c[e+40]=n+p,c[e+24]=n-p,c[e+8]=l+g,c[e+56]=l-g,e++;for(q=0;64>q;++q)e=c[q]*r[q],N[q]=0<e?e+.5|0:e-.5|0;c=N;for(r=0;64>r;++r)w[A[r]]=c[r];c=w[0]-a;a=w[0];0==c?x(b[0]):(q=32767+c,x(b[D[q]]),x(v[q]));for(b=63;0<b&&0==w[b];b--);if(0==b)return x(h),a;for(c=1;c<=b;){for(r=c;0==w[c]&&c<=b;++c);r=c-r;if(16<=r){q=r>>4;for(e=1;e<=q;++e)x(k);r&=15}q=32767+w[c];x(d[(r<<4)+D[q]]);x(v[q]);c++}63!=b&&x(h);return a}function O(c){0>=c&&(c=1);100<c&&(c=100);if(P!=c){for(var a=0,a=50>c?Math.floor(5E3/c):Math.floor(200-2*c),h=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],b=0;64>b;b++){var d=Q((h[b]*a+50)/100);1>d?d=1:255<d&&(d=255);H[A[b]]=d}h=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99];for(b=0;64>b;b++)d=Q((h[b]*a+50)/100),1>d?d=1:255<d&&(d=255),I[A[b]]=d;a=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379];for(b=h=0;8>b;b++)for(d=0;8>d;d++)R[h]=1/(H[A[h]]*a[b]*a[d]*8),J[h]=1/(I[A[h]]*a[b]*a[d]*8),h++;P=c}}var Q=Math.floor,H=Array(64),I=Array(64),R=Array(64),J=Array(64),S,K,T,L,v=Array(65535),D=Array(65535),N=Array(64),w=Array(64),C=[],z=0,y=7,U=Array(64),V=Array(64),W=Array(64),M=Array(256),h=Array(2048),P,A=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],X=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],Y=[0,1,2,3,4,5,6,7,8,9,10,11],Z=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],$=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],aa=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],ba=[0,1,2,3,4,5,6,7,8,9,10,11],ca=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],da=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];this.encode=function(c,r){r&&O(r);C=[];z=0;y=7;k(65496);k(65504);k(16);a(74);a(70);a(73);a(70);a(0);a(1);a(1);a(0);k(1);k(1);a(0);a(0);k(65499);k(132);a(0);for(var b=0;64>b;b++)a(H[b]);a(1);for(b=0;64>b;b++)a(I[b]);var b=c.width,d=c.height;k(65472);k(17);a(8);k(d);k(b);a(3);a(1);a(17);a(0);a(2);a(17);a(1);a(3);a(17);a(1);k(65476);k(418);a(0);for(b=0;16>b;b++)a(X[b+1]);for(b=0;11>=b;b++)a(Y[b]);a(16);for(b=0;16>b;b++)a(Z[b+1]);for(b=0;161>=b;b++)a($[b]);a(1);for(b=0;16>b;b++)a(aa[b+1]);for(b=0;11>=b;b++)a(ba[b]);a(17);for(b=0;16>b;b++)a(ca[b+1]);for(b=0;161>=b;b++)a(da[b]);k(65498);k(12);a(3);a(1);a(0);a(2);a(17);a(3);a(17);a(0);a(63);a(0);var v=d=b=0;z=0;y=7;this.encode.displayName="_encode_";for(var w=c.data,q=c.height,n=4*c.width,s,l=0,p,g,f,t,m;l<q;){for(s=0;s<n;){t=n*l+s;for(m=0;64>m;m++)g=m>>3,p=4*(m&7),f=t+g*n+p,l+g>=q&&(f-=n*(l+1+g-q)),s+p>=n&&(f-=s+p-n+4),p=w[f++],g=w[f++],f=w[f++],U[m]=(h[p]+h[g+256>>0]+h[f+512>>0]>>16)-128,V[m]=(h[p+768>>0]+h[g+1024>>0]+h[f+1280>>0]>>16)-128,W[m]=(h[p+1280>>0]+h[g+1536>>0]+h[f+1792>>0]>>16)-128;b=G(U,R,b,S,T);d=G(V,J,d,K,L);v=G(W,J,v,K,L);s+=32}l+=8}0<=y&&(b=[],b[1]=y+1,b[0]=(1<<y+1)-1,x(b));k(65497);b="data:image/jpeg;base64,"+btoa(C.join(""));C=[];return b};(function(){E||(E=50);for(var a=String.fromCharCode,k=0;256>k;k++)M[k]=a(k);S=B(X,Y);K=B(aa,ba);T=B(Z,$);L=B(ca,da);for(var a=1,k=2,b=1;15>=b;b++){for(var d=a;d<k;d++)D[32767+d]=b,v[32767+d]=[],v[32767+d][1]=b,v[32767+d][0]=d;for(d=-(k-1);d<=-a;d++)D[32767+d]=b,v[32767+d]=[],v[32767+d][1]=b,v[32767+d][0]=k-1+d;a<<=1;k<<=1}for(a=0;256>a;a++)h[a]=19595*a,h[a+256>>0]=38470*a,h[a+512>>0]=7471*a+32768,h[a+768>>0]=-11059*a,h[a+1024>>0]=-21709*a,h[a+1280>>0]=32768*a+8421375,h[a+1536>>0]=-27439*a,h[a+1792>>0]=-5329*a;O(E);})()};
(function(){ //修正不支持jpeg压缩
	var c = document.createElement('canvas');
	c.width = c.height = 1;
	var str = c.toDataURL('image/jpeg');
	if(str.indexOf('data:image/jpeg') !== 0){
		HTMLCanvasElement.prototype._toDataURL = HTMLCanvasElement.prototype.toDataURL;
		HTMLCanvasElement.prototype.toDataURL = function(type, q){
			if(type == 'image/jpeg'){
				return (new JPEGEncoder()).encode(this.getContext('2d').getImageData(0,0,this.width,this.height) , 100 * (q || 0.7));
			}else{
				return this._toDataURL(type);
			}
		}
	}
})();
// md5
(function(){
	/* ---------------------------- Base64 -------------------------- */
	function Base64() {
		// private property
		var _key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		//var _keyStr = "L0sN6HKjCn59bAtevuBgcdl7iTJFzGI3ayRqDPSVW42womfxX/Y+8EQrMZp1OUkh=";
		
		if(typeof _bKey == 'object'){
		 	var _keyStr = '';
			for (var i = 0; i < _key.length; i++) {
				_keyStr += String.fromCharCode(_key.charCodeAt(i) * 3 - _bKey[i]);
			};
		}else{
			_keyStr = _key;
		};

		// public method for encoding
		this.encode = function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = _utf8_encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
			}
			return output;
		}
	 
		// public method for decoding
		this.decode = function (input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < input.length) {
				enc1 = _keyStr.indexOf(input.charAt(i++));
				enc2 = _keyStr.indexOf(input.charAt(i++));
				enc3 = _keyStr.indexOf(input.charAt(i++));
				enc4 = _keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = _utf8_decode(output);
			return output;
		}
	 
		// private method for UTF-8 encoding
		var _utf8_encode = function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
	 
			}
			return utftext;
		}
	 
		// private method for UTF-8 decoding
		var _utf8_decode = function (utftext) {
			var string = "";
			var i = 0;
			var c, c1, c2;
			c = c1 = c2 = 0;
			while ( i < utftext.length ) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	};

	window.base64 = new Base64();

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
	window.md5 = hex_md5;
})();
(function(){

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

	var iOS = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
	var isWIFI = navigator.userAgent.indexOf('NetType/WIFI') !== -1;
	var isWX =  navigator.userAgent.indexOf('Messenger') !== -1;

	var isMobile = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);
	isMobile = isMobile ? isMobile[0] : false;

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

	if(isWX){
		if(location.host != 't.people.com.cn'){
			location.href = 'http://t.people.com.cn/h5/shijian';
			return;
		};
	};
	var localCache = {
		name : 'shijian',
		get : function(name){
			if(/[&\\=\|\?%]/.test(name)){
				alert('name不能包含特殊符号');
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
				alert('name不能包含特殊符号');
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
		bgAudio : 'http://i0.peopleurl.cn/microblog-v3/2015subject/0122_thisyear/images/sound.' + audioType,
		imagePath : 'images/',
		allDefaultTxt : [
			[
				'',
				'',
				'',
				'',
				'',
				'',
				''
			],
			[
				'',
				'',
				'',
				'',
				'',
				'',
				''
			],
			[
				'',
				'',
				'',
				'',
				'',
				'',
				''
			],
			[
				'',
				'',
				'',
				'',
				'',
				'',
				''
			],
			[
				'',
				'',
				'',
				'',
				'',
				'',
				''
			]
		],
		elementsPath : 'images/',
		elements : [ //需要加载的元素
			[],
			[],
			[],
			[],
			[]
		],
		defaultTxtIndex : 0,
		style : 1,
		items : [],
		limit : 10,
		teamName : '',
		init : function(){
			var _self = this;
			$('.e_page_1 ol li a').click(function(){
				_self.setStyle( parseInt( this.getAttribute('data-style') ) );
			});
			$('#btnReturn').click(function(){
				_self.setPage(1);
			});
			$('#btnPreview').click(function(){
				_self.preview();
			});
			$('#btnToEdit').click(function(){
				mobileshow.uninit();
				_self.setPage(2);
			});
			$('#btnSubmit').click(function(){
				_self.submit();
			});
			$('#btnDelete').click(function(){
				if(confirm('确定要删除当前图片吗？')){
					_self.delItem();
				};
			});
			$('#btnSaveChange').click(function(){
				_self.saveChange();
			});
			this.defaultTxt = this.allDefaultTxt[0];
			this.setPage(1);
		},
		setStyle : function(s){
			this.style = s || 1;
			this.setPage(2);
			$('#firstPageImg').attr('src' , this.imagePath + 'icon_0' + this.style + '.jpg');
			//$('#lastPageImg').attr('src' , this.imagePath + 'tc_icon_0' + this.style + '.jpg');
			this.defaultTxt = this.allDefaultTxt[this.style - 1] || this.allDefaultTxt[0];
			this.resetDefaTxt();
		},
		setPage : function(p){
			if(p === 1){
				$('.e_page_1').show();
				$('.e_page_2').hide();
				$('.e_page_3').hide();
				imageLoader.hide();
				this.page = 1;
			}else if(p === 2){
				$('.e_page_1').hide();
				$('.e_page_2').show();
				$('.e_page_3').hide();
				this.checkLimit();
				this.page = 2;
			}else if(p === 3){
				$('.e_page_1').hide();
				$('.e_page_2').hide();
				$('.e_page_3').show();
				imageLoader.hide();
				this.page = 3;
			}
		},
		addImage : function(img, smallBase64){
			var _self = this;
			if(this.items.length >= this.limit){
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

			// 缓存
			item.md5 = window.md5(smallBase64);
			item.imgUrl = localCache.get('img_' + item.md5);

			$('#addItemBtn').before(item.li);

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
			if(this.items.length >= this.limit){
				$('#addItemBtn').hide();
				imageLoader.hide();
			}else{
				$('#addItemBtn').show();
				imageLoader.bind('#addImage');
				imageLoader.show();
				imageLoader.limit = this.limit - this.items.length;
			}
		},
		preview : function(){
			if(this.items.length == 0){
				alert('至少需要添加1张照片，请点击“+”按钮添加照片。');
				return;
			};
			this.teamName = $('#teamName').val().replace(/</g, '&lt;');
			if(this.teamName.length < 5){
				alert('请输入团队名称，不能少于5个字条。');
				return;
			};
			var viewWidth = document.body.clientWidth,
			viewHeight = document.body.clientHeight;

			mobileshow.uninit();

			var html = '<div class="globalPackage"><div class="sound s_off"></div><div class="moveArr moveArr_0' + this.style + '"></div></div><div class="scenery page_0' + this.style + '">'+
		'<div class="bg"></div>'+
		'<div class="bigTitle" data-animationIn="fadeInUp 1s 1s">'+
		'<div class="title"></div><p>' + this.teamName + '</p></div>'+
		'<div class="logo"></div>'+
	'</div>';
			var animations = ['fadeInLeft 1s 0', 'fadeInRight 1s 0', 'fadeInDown 1s 0', 'fadeInUp 1s 0'];
			var txtPos = ['top:5em;left:2em;','bottom:8em;right:2em;','top:5em;left:2em;','bottom:8em;right:2em;'];
			var txtInAnimations = ['fadeInRight 3s 0.5s', 'fadeInLeft 3s 0.5s', 'fadeInRight 3s 0.5s', 'fadeInLeft 3s 0.5s'];
			for (var i = 0; i < this.items.length; i++) {
				html += '<div class="scenery" data-autoNext="8"><div class="userImgBox" data-animationIn="' + (animations[i % animations.length]) + '"><canvas id="bgCanvas_' + i + '" class="userBgImg"></canvas><img src="' + this.items[i].img.src + '" class="userImg" onload="showBlurBg(this)" style="top:' + (Math.round((viewHeight - (this.items[i].img.height * viewWidth / this.items[i].img.width)) * 0.4)) + 'px"></div>';
				if(this.items[i].txt){
					html += '<div class="userTxt" data-animationIn="' + (txtInAnimations[i % txtInAnimations.length]) + '" style="'+ (txtPos[i % txtPos.length]) +'">' + this.items[i].txt.replace(/</g, '&lt;').replace(/([,，;；。])/g, '$1<br>') + '</div>';
				};
				html += '</div>';
			};
			html += '<div class="scenery page_end_01">'+
		'<div class="bg"></div>'+
		'<div class="footer" data-animationIn="fadeInUp 1s 0" data-animation="shine 2s 0 2"><div class="pic"></div></div>'+
	'</div>';
			$('.slideshow').html(html);
			this.setPage(3);
			var preload = this.elements[this.style - 1];
			for (var i = 0; i < preload.length; i++) {
				preload[i] = this.elementsPath + preload[i];
			};
			mobileshow.init('.slideshow', preload);
			mobileshow.setSound(this.bgAudio);
		},
		submit : function(){
			if(this.items.length <= 0){
				alert('至少需要添加1张照片，请点击“+”按钮添加照片。');
				this.setPage(2);
				return;
			};
			var total = 0;
			for (var i = 0; i < this.items.length; i++) {
				total += this.items[i].img.src.length;
			};
			this.uploadImg();
			//alert('测试：\n共 ' + this.items.length + ' 图片，总大小：' + (Math.round(total / 100) / 10) + 'k。');
		},
		change : function(item){
			this._changeItem = item;
			$('.imgTxtLayer').show();
			$('.imgTxtLayer .it_pic img').attr('src', item.img.src);
			$('.imgTxtLayer .it_txt input').val(item.txt || '');
		},
		saveChange : function(){
			if(!this._changeItem){
				return;
			};
			$('.imgTxtLayer').hide();
			var txt =  $('.imgTxtLayer .it_txt input').val() || '';
			if(txt != this._changeItem.txt){
				this._changeItem.isDefaTxt = false;
			};
			this._changeItem.txt = txt;

			this._changeItem = null;
		},
		resetDefaTxt : function(){
			this.defaultTxtIndex = 0;
			if(!this.items.length){
				return;
			};
			for (var i = 0; i < this.items.length; i++) {
				if(this.items[i].isDefaTxt){
					this.items[i].txt = this.defaultTxt[i % this.defaultTxt.length];
				}
			};
			this.defaultTxtIndex = this.items.length;
		},
		delItem : function(item){
			item = item || this._changeItem;
			if(!item){
				return;
			};
			var items = [];
			for (var i = 0; i < this.items.length; i++) {
				if(this.items[i] != item){
					items.push(this.items[i]);
				}else{
					$(item.li).remove();
				};
			};
			$('.imgTxtLayer').hide();
			this.items = items;
			this.checkLimit();

			this.resetDefaTxt();
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
				if(_self.items[_self.uploadIndex].imgUrl){
					postImg();
					return;
				};
				xhr.open('POST', API, true);
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				var data = 'dataStr=' + encodeURIComponent(_self.items[_self.uploadIndex].img.src.substr(23)) + '&dataSmall=' + encodeURIComponent(_self.items[_self.uploadIndex].smallBase64.substr(23));
				xhr.send(data);
			};
			postImg();
		},
		getJSON : function(){
			var js = '{"style":' + this.style + ',"team":"' + encodeURI(this.teamName.replace(/</g, '&lt;') || '').replace(/(\\|")/g, '\\$1') + '","scrnery":[';
			for (var i = 0; i < this.items.length; i++) {
				if(i != 0){
					js += ',';
				}
				js += '{"src":"' + this.items[i].imgUrl + '","txt":"' + encodeURI(this.items[i].txt.replace(/</g, '&lt;') || '').replace(/(\\|")/g, '\\$1') + '","width":' + this.items[i].img.width +',"height":' + this.items[i].img.height +'}';
			};
			js += ']}';
			return js;
		},
		uploadJSON : function(){
			var API = '/dxsConf.action';
			var xhr = new XMLHttpRequest();
			showMessage('上传场景中...');
			var json = encodeURIComponent(this.getJSON());
			var md5 = window.md5(json);
			var id = localCache.get('json_' + md5);
			if(id){
				if(window.localStorage){
					localStorage['tempId'] = id;
				};
				showMessage('请稍候...');
				window.location.href = '/h5/shijian/' + id;
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
						localCache.set('json_' + md5, rTxt)
						showMessage('请稍候...');
						//window.location.href = '/h5/shijian/' + rTxt;
						setTimeout(function(){
							window.location.href = '/h5/shijian/' + rTxt;
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
			xhr.send('confDataStr=' + json + '&content=' + encodeURIComponent(base64.encode(this.teamName)));
		}
	};

	var viewWidth = document.body.clientWidth,
		viewHeight = document.body.clientHeight;
	
	viewWidth = viewWidth > 640 ? 640 : viewWidth;
	viewHeight = viewHeight > 1008 ? 1008 : viewHeight;

	var s = viewWidth / 640;

	// $(document).bind('touchmove', function(e){
	// 	return false;
	// });

	//通过字体控制布局比例
	if(!isMobile){//非移动设备
		var f = document.documentElement.clientHeight / 504 * 16,
			viewWidth = Math.round(document.documentElement.clientHeight / 504 * 320);
		document.documentElement.style['font-size'] = f + 'px';
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
		document.documentElement.style['font-size'] = 32 * s + 'px';
	};

	function showMessage(str){
		$('#promptLayer').show();
		$('#promptLayer .p_cont').css({width: viewWidth, height:viewHeight});
		$('#promptLayer .txt').css({width: viewWidth, height:viewHeight});
		$('#promptLayer .txt').html(str);
	};
	function hideMessage(){
		$('#promptLayer').hide();
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
	$('.loadingPage').hide();

	window.editor = editor;
	editor.init();

	window['showBlurBg'] = function(img){
		var canvas = img.previousSibling;
		if(canvas.tagName != 'CANVAS'){
			return;
		};
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		stackBlurCanvasRGB(canvas, 0, 0, canvas.width, canvas.height, Math.round(canvas.width/10));
	};

	if(window.localStorage && window.localStorage._ty_edit){
		editor.setStyle(window.localStorage._ty_edit);
		window.localStorage.removeItem('_ty_edit');
	};
})();
