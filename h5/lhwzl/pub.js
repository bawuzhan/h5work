/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-02-16 16:09:53
 * @version $Id$
 */

var viewWidth = document.body.clientWidth;
var isMobile = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);
var isWX =  navigator.userAgent.indexOf('Messenger') !== -1;

isMobile = isMobile ? isMobile[0] : false;
if(isMobile){
  var f = document.documentElement.clientWidth / 640 * 32;
        
  if(document.documentElement.clientWidth / document.documentElement.clientHeight > 0.6349){
          //小屏幕手机单独定义CSS
          //document.body.className = 'smallScreen';
          f = document.documentElement.clientHeight / 1008 * 32;
        }
        document.documentElement.style['font-size'] = f + 'px';
        document.body.style['max-width'] = '20rem';
        document.body.style['width'] = viewWidth + 'px';
        document.body.style['position'] = 'relative';
  }else{
        var f = document.documentElement.clientHeight / 504 * 16,
          viewWidth = Math.round(document.documentElement.clientHeight / 504 * 320);
        document.documentElement.style['font-size'] = f + 'px';
        document.body.style['overflow'] = 'hidden';
        document.body.style['max-width'] = '640px';
        document.body.style['width'] = viewWidth + 'px';
        document.body.style['position'] = 'relative';

  };
  //微信分享时的缩略图
  function Q(s, p){
    return (p || document).querySelector(s);
  };
  if(isWX){
    var img = new Image();
    img.src = 'images/icon.jpg';
    img.style.position = 'absolute';
    img.style.top = '-1000px';
    img.style.left = '-1000px';
    document.body.insertBefore(img, document.body.firstChild);
  };
  // 分享按钮
  Q('#btn_share').onclick=function(){showShare();} 

    //显示分享提示，分享按钮可以调用
function showShare(){
  if(!isWX){
    document.getElementById('shareAlert').innerHTML = '<div class="othersShare">分享：<a href="javascript:void(0)" onclick="shareSina()"><img src="/microblog-v3/2014subject/1216_oneword/images/sina.png"></a> <a href="javascript:void(0)" onclick="sharePeople()"><img src="/microblog-v3/2014subject/1216_oneword/images/people.png"></a> <a href="javascript:void(0)" onclick="shareTencent()"><img src="/microblog-v3/2014subject/1216_oneword/images/tencent.png"></a></div>';
  };
  Q('#shareAlert').style.display = 'block';
  setTimeout(function(){
    Q('#shareAlert').style.display = 'none';
  }, 10000);
};

function shareSina () {
    location.href='http://service.weibo.com/share/share.php?url='+encodeURIComponent(location.href)+'&amp;title='+encodeURIComponent(document.title)+'&amp;ralateUid=2286908003&amp;source='
}
function sharePeople () {
  location.href='http://t.people.com.cn/bbsShare.action?url='+encodeURIComponent(location.href)+'&amp;title='+encodeURIComponent(document.title)+'&amp;showtype=&amp;bigtype=&amp;appkey=2592306546&amp;pic=&amp;site='
}
function shareTencent () {
  location.href='http://v.t.qq.com/share/share.php?title='+encodeURI(document.title)+'&url='+encodeURIComponent(location.href);
}


