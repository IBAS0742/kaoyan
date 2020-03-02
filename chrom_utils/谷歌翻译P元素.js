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
    window.onload = function () {
        let dom = jQuery(`<div style="position: absolute;top: 10px;right: 100px;font-weight: bold;
        z-index: 10000000;background: black;font-size: xx-large;color: #fff;">
        <div style="padding: 5px;">
            <div id="_ibas_tran_exit_" style="display: inline-block;
                cursor:pointer;background:darkturquoise;"
                onclick="_tran_ToRemove()">X</div>
            <div id="_ibas_tran_p_" style="display: inline-block;
                cursor:pointer;background: darkorange;"
                onclick="_tran_ToTran()">TranslateP</div>
        </div>
        <div style="overflow: hidden;">
            <input id="_ibas_tran_inp_"
                   style="width: 100%;background: #ceff95;color: #000;"
                   type="text"
                    onchange="_tran_changeSession()">
        </div>
    </div>`);
        jQuery('body').append(dom);
        window._tran_changeSession = function () {
            sessionStorage.setItem('_ibas_tran_', document.getElementById('_ibas_tran_inp_').value);
        }
        window._tran_ToTran = function () {
            $tranPElement(document.getElementById('_ibas_tran_inp_').value);
        }
        window._tran_ToRemove = (function (dom) {
            dom.css({
                display: "none"
            });
        }).bind(null, dom);
        setTimeout(function () {
            document.getElementById('_ibas_tran_inp_').value = sessionStorage.getItem('_ibas_tran_');
        }, 500);
    }
    // Your code here...
})();