function JPEGEncoder(E){function B(c,r){for(var a=0,b=0,d=[],h=1;16>=h;h++){for(var k=1;k<=c[h];k++)d[r[b]]=[],d[r[b]][0]=a,d[r[b]][1]=h,b++,a++;a*=2}return d}function x(c){var r=c[0];for(c=c[1]-1;0<=c;)r&1<<c&&(z|=1<<y),c--,y--,0>y&&(255==z?(a(255),a(0)):a(z),y=7,z=0)}function a(c){C.push(M[c])}function k(c){a(c>>8&255);a(c&255)}function G(c,r,a,b,d){var h=d[0],k=d[240],q,n,s,l,p,g,f,t,m,e=0;for(q=0;8>q;++q){n=c[e];s=c[e+1];l=c[e+2];p=c[e+3];g=c[e+4];f=c[e+5];t=c[e+6];m=c[e+7];var u=n+m;n-=m;m=s+t;s-=t;t=l+f;l-=f;f=p+g;p-=g;g=u+f;u-=f;f=m+t;m-=t;c[e]=g+f;c[e+4]=g-f;g=.707106781*(m+u);c[e+2]=u+g;c[e+6]=u-g;g=p+l;f=l+s;m=s+n;l=.382683433*(g-m);p=.5411961*g+l;g=1.306562965*m+l;f*=.707106781;l=n+f;n-=f;c[e+5]=n+p;c[e+3]=n-p;c[e+1]=l+g;c[e+7]=l-g;e+=8}for(q=e=0;8>q;++q)n=c[e],s=c[e+8],l=c[e+16],p=c[e+24],g=c[e+32],f=c[e+40],t=c[e+48],m=c[e+56],u=n+m,n-=m,m=s+t,s-=t,t=l+f,l-=f,f=p+g,p-=g,g=u+f,u-=f,f=m+t,m-=t,c[e]=g+f,c[e+32]=g-f,g=.707106781*(m+u),c[e+16]=u+g,c[e+48]=u-g,g=p+l,f=l+s,m=s+n,l=.382683433*(g-m),p=.5411961*g+l,g=1.306562965*m+l,f*=.707106781,l=n+f,n-=f,c[e+40]=n+p,c[e+24]=n-p,c[e+8]=l+g,c[e+56]=l-g,e++;for(q=0;64>q;++q)e=c[q]*r[q],N[q]=0<e?e+.5|0:e-.5|0;c=N;for(r=0;64>r;++r)w[A[r]]=c[r];c=w[0]-a;a=w[0];0==c?x(b[0]):(q=32767+c,x(b[D[q]]),x(v[q]));for(b=63;0<b&&0==w[b];b--);if(0==b)return x(h),a;for(c=1;c<=b;){for(r=c;0==w[c]&&c<=b;++c);r=c-r;if(16<=r){q=r>>4;for(e=1;e<=q;++e)x(k);r&=15}q=32767+w[c];x(d[(r<<4)+D[q]]);x(v[q]);c++}63!=b&&x(h);return a}function O(c){0>=c&&(c=1);100<c&&(c=100);if(P!=c){for(var a=0,a=50>c?Math.floor(5E3/c):Math.floor(200-2*c),h=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],b=0;64>b;b++){var d=Q((h[b]*a+50)/100);1>d?d=1:255<d&&(d=255);H[A[b]]=d}h=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99];for(b=0;64>b;b++)d=Q((h[b]*a+50)/100),1>d?d=1:255<d&&(d=255),I[A[b]]=d;a=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379];for(b=h=0;8>b;b++)for(d=0;8>d;d++)R[h]=1/(H[A[h]]*a[b]*a[d]*8),J[h]=1/(I[A[h]]*a[b]*a[d]*8),h++;P=c}}var Q=Math.floor,H=Array(64),I=Array(64),R=Array(64),J=Array(64),S,K,T,L,v=Array(65535),D=Array(65535),N=Array(64),w=Array(64),C=[],z=0,y=7,U=Array(64),V=Array(64),W=Array(64),M=Array(256),h=Array(2048),P,A=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],X=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],Y=[0,1,2,3,4,5,6,7,8,9,10,11],Z=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],$=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],aa=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],ba=[0,1,2,3,4,5,6,7,8,9,10,11],ca=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],da=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];this.encode=function(c,r){r&&O(r);C=[];z=0;y=7;k(65496);k(65504);k(16);a(74);a(70);a(73);a(70);a(0);a(1);a(1);a(0);k(1);k(1);a(0);a(0);k(65499);k(132);a(0);for(var b=0;64>b;b++)a(H[b]);a(1);for(b=0;64>b;b++)a(I[b]);var b=c.width,d=c.height;k(65472);k(17);a(8);k(d);k(b);a(3);a(1);a(17);a(0);a(2);a(17);a(1);a(3);a(17);a(1);k(65476);k(418);a(0);for(b=0;16>b;b++)a(X[b+1]);for(b=0;11>=b;b++)a(Y[b]);a(16);for(b=0;16>b;b++)a(Z[b+1]);for(b=0;161>=b;b++)a($[b]);a(1);for(b=0;16>b;b++)a(aa[b+1]);for(b=0;11>=b;b++)a(ba[b]);a(17);for(b=0;16>b;b++)a(ca[b+1]);for(b=0;161>=b;b++)a(da[b]);k(65498);k(12);a(3);a(1);a(0);a(2);a(17);a(3);a(17);a(0);a(63);a(0);var v=d=b=0;z=0;y=7;this.encode.displayName="_encode_";for(var w=c.data,q=c.height,n=4*c.width,s,l=0,p,g,f,t,m;l<q;){for(s=0;s<n;){t=n*l+s;for(m=0;64>m;m++)g=m>>3,p=4*(m&7),f=t+g*n+p,l+g>=q&&(f-=n*(l+1+g-q)),s+p>=n&&(f-=s+p-n+4),p=w[f++],g=w[f++],f=w[f++],U[m]=(h[p]+h[g+256>>0]+h[f+512>>0]>>16)-128,V[m]=(h[p+768>>0]+h[g+1024>>0]+h[f+1280>>0]>>16)-128,W[m]=(h[p+1280>>0]+h[g+1536>>0]+h[f+1792>>0]>>16)-128;b=G(U,R,b,S,T);d=G(V,J,d,K,L);v=G(W,J,v,K,L);s+=32}l+=8}0<=y&&(b=[],b[1]=y+1,b[0]=(1<<y+1)-1,x(b));k(65497);b="data:image/jpeg;base64,"+btoa(C.join(""));C=[];return b};(function(){E||(E=50);for(var a=String.fromCharCode,k=0;256>k;k++)M[k]=a(k);S=B(X,Y);K=B(aa,ba);T=B(Z,$);L=B(ca,da);for(var a=1,k=2,b=1;15>=b;b++){for(var d=a;d<k;d++)D[32767+d]=b,v[32767+d]=[],v[32767+d][1]=b,v[32767+d][0]=d;for(d=-(k-1);d<=-a;d++)D[32767+d]=b,v[32767+d]=[],v[32767+d][1]=b,v[32767+d][0]=k-1+d;a<<=1;k<<=1}for(a=0;256>a;a++)h[a]=19595*a,h[a+256>>0]=38470*a,h[a+512>>0]=7471*a+32768,h[a+768>>0]=-11059*a,h[a+1024>>0]=-21709*a,h[a+1280>>0]=32768*a+8421375,h[a+1536>>0]=-27439*a,h[a+1792>>0]=-5329*a;O(E);})()};

if(!typeof btoa != 'function'){
	btoa = function(str){
		return 'btoa:' + str;
	}
}

var jpeg = new JPEGEncoder();
onmessage = function(e){
	var data = e.data;
	var q = data.q || 0.6;
	postMessage(jpeg.encode(data.imgData, q * 100));
}