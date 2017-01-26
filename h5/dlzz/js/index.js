
FastClick.attach(document.body);

var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / 640 * 100 + "px";


new Swiper(".swiper-container",{
    loop:true,
    direction:"vertical",
    effect:"coverflow",
    pagination : '.swiper-pagination',
    paginationType : 'custom',
   /* paginationCustomRender: function (swiper, current, total) {
        return current + ' / ' + total;
    },*/
    onSlidePrevEnd:changeEnd,
    onSlideNextEnd:changeEnd
});
function changeEnd(swiper) {
    var n = swiper.activeIndex,
        slideAry = swiper.slides;
    [].forEach.call(slideAry, function (slide, index) {
        if (n === index) {
            if(n==1||n==10){
                slide.id="page1";
                return;
            }
            if(n==2){
                slide.id="page2";
                return;
            }
            if(n==3){
                slide.id="page3";
                return;
            }
            if(n==4){
                slide.id="page4";
                return;
            }
            if(n==5){
                slide.id="page5";
                return;
            }
            if(n==6){
                slide.id="page6";
                return;
            }
            if(n==7){
                slide.id="page7";
                return;
            }
            if(n==8){
                slide.id="page8";
                return;
            }
            if(n==9||n==0){
                slide.id="page9";
                return;
            }

        }
        slide.id = null;
    });
}
