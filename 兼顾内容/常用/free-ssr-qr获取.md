# 自动获取 free-ssr 的二维码

- 可能墙的问题，需要设置 host 文件

```
104.18.18.18 free-ss.site
```

- 使用 node 自动获取

> 环境: node

> node 依赖 npm i request crypto-js qrcode

```javascript
var request = require('request');
var fs = require("fs");
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
var QRCode = require('qrcode');

function getABC(cb) {
    const targetStr = "if(detect){var a='';var b='';var c='';}else{";
    const targetTwo = "eval(function(p,a,c,k,e,d)";
    request("https://free-ss.site/",function(err,res,body) {
        let abcStr = "";
        let decStr = "";
        body.split('\n').forEach(_ => {
            if (_.trim().includes(targetStr)) {
                abcStr = _;
            } else if (_.trim().substring(0,targetTwo.length) === targetTwo) {
                decStr = _.trim();
            } else {
                return false;
            }
        });
        eval(abcStr.split('else')[1]);
        eval(`r=${decStr.substring(5,decStr.length - 1)}`)
        r.replace('CryptoJS.AES.decrypt','AES.decrypt');
        cb({a,b,c},r);
    });
};

function getData(ABC,cb) {
    request.post({url:'https://free-ss.site/data.php', form:ABC}, function(error, response, body) {
        cb(body);
    })
};

function decodeData(ABC,r,data) {
    let x = CryptoJS.enc.Latin1.parse(ABC.a);
    let y = CryptoJS.enc.Latin1.parse(ABC.b);
    let d = data;
    // let dec = AES.decrypt(data, x, {
    //     iv: y,
    //     mode: CryptoJS.mode.CTR,
    //     padding: CryptoJS.pad.ZeroPadding
    // });
    eval(r);
    return dec.toString(CryptoJS.enc.Utf8);
};

function saveAsImage(outer) {
    function toQRcode(data) {
        return 'ss://'+CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data[3]+':'+data[4]+'@'+data[1]+':'+data[2]));
    }
    let a = new Date();
    let path = `${a.getYear() + 1900}_${a.getMonth() + 1}_${a.getDate()}_${a.getHours()}_${a.getMinutes()}_${a.getSeconds()}`;
    fs.mkdirSync(path);
    JSON.parse(outer).data.forEach(item => {
        let url = toQRcode(item);
        QRCode.toDataURL(url, function (err, url) {
            console.log(url)
            var base64 = url.replace(/^data:image\/\w+;base64,/, "");
            var dataBuffer = new Buffer(base64, 'base64');
            let pngPath = `./${path}/${item.slice(1).join('_').replace(/:/g,'!')}.png`;
            fs.writeFile(pngPath,dataBuffer,function(err){//用fs写入文件
                if(err){
                    console.log(`write ${pngPath} error \r\n ${err.message}`);
                }
            })
        })
    });
}

getABC((ABC,r) => {
    getData(ABC,data => {
        let ret = decodeData(ABC,r,data);
        // fs.writeFileSync('test_main.txt',JSON.stringify(JSON.parse(ret),'','\t'));
        saveAsImage(ret);
    });
})
```

- 简单实现一个定时任务

> 需要将上面内容保存到一个 main.js 文件中，供下面代码调用

```javascript
const spawn = eval('require')('child_process').spawn;
const fs = require('fs');
const dir = process.cwd();

const path_ = eval('require')('path');

const deleteall = function (path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            const curPath = path_.join(path, '/', file); // path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteall(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

function autoDelete() {
    let f = fs.readdirSync(dir);
    if (f.length < 5) {
        return ;
    } else {
        f = f.filter(_ => {
            return !fs.statSync(dir + '\\' + _).isFile() && _ !== 'node_modules';
        }).sort((a,b)=> a>b);
        if (f.length > 5) {
            deleteall(dir + '\\' + f[0]);
        }
    }
}

const task = function() {
    console.log(`=============开始获取 ${new Date()}=====================`)
    autoDelete();
    const cmd = spawn("node main.js", {
        shell: true,
    });
};
task();
setInterval(task,3600 * 1000);
```