/**
 * 
 * @authors Shi.Q.E (shi.q.e@hotmail.com)
 * @date    2016-09-06 14:55:01
 * @version 1.0.0
 */

(function(){
  function Q(s, p){
    return (p || document).querySelector(s);
  };
  function QA(s, p){
    return (p || document).querySelectorAll(s);
  };
  var isMobile = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);
  var isWX =  navigator.userAgent.indexOf('Messenger') !== -1;

  isMobile = isMobile ? isMobile[0] : false;

  //微信分享时的缩略图
  if(isWX){
    setShareInfo("见识新一代大火箭——长征五号的秘密！",imgUrl,"./index.html");
  };

  function setShareInfo(title, img, url){
  if(url && history.pushState){
  history.pushState(null, document.title, url);
  };
  if(img){
  var i = window._shareImg || new Image();
  i.src = img;
  i.style.position = 'absolute';
  i.style.left = '-1000px';
  i.style.top = '-1000px';
  window._shareImg = i;
  document.body.insertBefore(i, document.body.firstChild);
  };
  if(title){
  document.title = title;
  }
  }
 
// 分享按钮
if(!!Q('#btn_share')){
  
  Q('#btn_share').onclick=function(){showShare();} 
}
//显示分享提示，分享按钮可以调用
function showShare(){
  if(!isWX){
    document.getElementById('shareAlert').innerHTML = '<div class="othersShare">分享：<a href="javascript:void(0)" onclick="shareSina()"><img src="/microblog-v3/2014subject/1216_oneword/images/sina.png"></a> <a href="javascript:void(0)" onclick="sharePeople()"><img src="/microblog-v3/2014subject/1216_oneword/images/people.png"></a> <a href="javascript:void(0)" onclick="shareTencent()"><img src="/microblog-v3/2014subject/1216_oneword/images/tencent.png"></a></div>';
  };
  Q('#shareAlert').style.display = 'block';
  Q('#shareAlert').onclick=function(){
    Q('#shareAlert').style.display = 'none';
    clearTimeout(st);
  };
  var st = setTimeout(function(){
    clearTimeout(st);
    Q('#shareAlert').style.display = 'none';
  }, 5000);
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


})();

