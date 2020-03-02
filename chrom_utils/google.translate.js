/**
 * 将文字复制到谷歌翻译之后总是换行，这里写个代码解决这个问题
 * */
// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://translate.google.cn/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var btn = document.createElement('div')
    btn.style.position = "absolute";
    btn.style.top = "10px";
    btn.style.left = "100px";
    btn.innerText = "ToLine"
    btn.style.zIndex = 10000;
    btn.style.background = "black";
    btn.style.color = "white";
    btn.style.fontSize = "xx-large";
    btn.style.fontWeight = "bold";
    document.body.appendChild(btn)
    btn.onclick = function () {
        source.value = source.value.split(/[\r\n]/).join(' ');
    }
    // Your code here...
})();