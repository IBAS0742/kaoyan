// ==UserScript==
// @name         Google Translate
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @require           https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const requestUrl = location.protocol === "https:" ? "https://www.sunibas.cn/api" : "http://www.sunibas.cn/api";
    window.$jq = jQuery;
    window.$tran = function (list) {
        return fetch(requestUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify({
                api: "GoogleTranslate",
                method: "fetchTran",
                data: {
                    list: list
                }
            })
        }).then(_ => _.text()).then(JSON.parse).then(_ => _.data.data);
    }
    let tasks = [];
    window.$tranPElement = function (tar) {
        let ps = $jq(tar || 'p');
        for (let i = 0; i < ps.length; i++) {
            tasks.push((function (node) {
                $tran(node.innerText)
                    .then(_ => {
                        $jq(node).after($jq(`<p class="ibas_tran">${_}</p>`));
                        if (tasks.length) {
                            tasks.shift()();
                        } else {
                            alert("完成");
                        }
                    })
                    .catch(_ => {
                        console.log(_);
                        if (tasks.length) {
                            tasks.shift()();
                        } else {
                            alert("完成");
                        }
                    })
            }).bind(null, ps[i]));
        }
        if (tasks.length) {
            tasks.shift()();
        } else {
            alert("完成");
        }
    }
    var btn = document.createElement('div')
    btn.style.position = "absolute";
    btn.style.top = "10px";
    btn.style.right = "100px";
    btn.style.zIndex = 10000;
    btn.style.background = "black";
    btn.style.color = "white";
    btn.style.fontSize = "xx-large";
    btn.style.fontWeight = "bold";
    btn.style.cursor = "pointer";
    document.body.appendChild(btn)
    var btnClick = document.createElement('div');
    var inp = document.createElement('input');
    btnClick.onclick = function () {
        $tranPElement(inp.value);
    }
    btnClick.innerText = "TranslateP";
    btn.appendChild(btnClick);
    btn.appendChild(inp);
    inp.value = sessionStorage.getItem('_ibas_tran_');
    inp.onchange = function () {
        sessionStorage.setItem('_ibas_tran_', inp.value);
    }
    // Your code here...
})();