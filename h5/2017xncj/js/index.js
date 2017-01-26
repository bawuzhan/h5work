/**
 * Created by bawuzhan on 2016/12/5.
 */
//适配
if (document.documentElement.clientWidth / document.documentElement.clientHeight > 0.76) {
    viewWidth = Math.round(document.documentElement.clientHeight / 416 * 320);
    viewScale = viewWidth / 640;
} else {
    viewScale = document.documentElement.clientWidth / 640;
};
document.documentElement.style.fontSize = 100 * viewScale + 'px';