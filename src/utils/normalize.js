import FastClick from 'fastclick'

(function(doc, win) {
    if ('addEventListener' in doc) {
        var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            const clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = Math.ceil(10 * (clientWidth / 320)) + 'px';
        };
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', function() {
            recalc();
            FastClick.attach(doc.body);
        }, false);
    }
})(document, window);
