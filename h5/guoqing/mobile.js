/**
 * 
 * @authors shi.q.e (you@example.org)
 * @date    2015-09-25 13:30:34
 * @version $Id$
 */

(function(){
    
    var H5tools={
        isMobile:navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/),
        isWX : navigator.userAgent.indexOf('Messenger') !== -1,
        isMobile : function (){return isMobile ? isMobile[0] : false},
        initView: function (){
        var viewWidth = document.body.clientWidth;
          if(this.isMobile){
          var f = document.documentElement.clientWidth / 640 * 32;
           document.documentElement.style['font-size'] = f + 'px';
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
          // document.body.style['overflow'] = 'hidden';
          document.body.style['max-width'] = '640px';
          document.body.style['width'] = viewWidth + 'px';
          document.body.style['position'] = 'relative';

        };
      },
    }

    if (!window.H5tools) {window.H5tools=H5tools};
  
   
})();
