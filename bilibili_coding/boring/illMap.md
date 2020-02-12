# 疫情地图的代码如下

- 网站中用到的地图边界来自阿里 [地图选择器](http://datav.aliyun.com/tools/atlas/)

- 地图网页代码

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <!--<script src="https://cdn.bootcss.com/leaflet/1.5.1/leaflet-src.js"></script>-->
        <link href="https://cdn.bootcss.com/leaflet/1.5.1/leaflet.css" rel="stylesheet">
        <script src="https://cdn.bootcss.com/leaflet/1.5.1/leaflet.js"></script>
        <style>
            #mapid,body {
                margin: 0;
                padding: 0;
                border: none;
            }
            #mapid {
                height: 100vh;
                width: 100vw;
            }
            #label {
                position: absolute;
                top: 110px;
                left: 30px;
                width: 120px;
                z-index: 10000;
                background: #03A9F4;
                padding: 5px;
            }
            .label {
                width: 100%;
                height: 30px;
            }
            .label-color {
                width: 20px;height: 20px;background: #800026;display: inline-block;float:left;
            }
        </style>
    </head>
    <body>
        <div id="mapid"></div>
        <div id="label">
            <div class="label">
                <select name="" id="select" >
                    <option value="china">中国</option>
                    <option value="guangdong">广东</option>
                </select>
                <button style="margin: 0;padding: 4px;
    border: none;
    background: white;
    cursor: pointer;" onclick="reflesh()">刷新数据</button>
            </div>
            <div class="label">
                <a style="margin: 0;padding: 4px;
    border: none;
    background: white;
    cursor: pointer;" target="_blank" href="/mapSource">数据来源</a>
            </div>
            <div class="label">
                <div style="background: #800026;" class="label-color"></div><div style="display: inline-block;"> > 10000</div>
            </div>
            <div class="label">
                <div style="background: #E31A1C;" class="label-color"></div><div style="display: inline-block;"> 1000 ~ 9999</div>
            </div>
            <div class="label">
                <div style="background: #FD8D3C;" class="label-color"></div><div style="display: inline-block;"> 100 ~ 999</div>
            </div>
            <div class="label">
                <div style="background: #FEB24C;" class="label-color"></div><div style="display: inline-block;"> 10 ~ 99 </div>
            </div>
            <div class="label">
                <div style="background: #FFEDA0;" class="label-color"></div><div style="display: inline-block;"> 1 ~ 9 </div>
            </div>
            <div class="label">
                <div style="background: #fff;" class="label-color"></div><div style="display: inline-block;"> 0 </div>
            </div>
        </div>
    </body>
    <script>
    
let mapName = {
    "北京市": "北京",
    "天津市": "天津",
    "河北省": "河北",
    "山西省": "山西",
    "内蒙古自治区": "内蒙古",
    "辽宁省": "辽宁",
    "吉林省": "吉林",
    "黑龙江省": "黑龙江",
    "上海市": "上海",
    "江苏省": "江苏",
    "浙江省": "浙江",
    "安徽省": "安徽",
    "福建省": "福建",
    "江西省": "江西",
    "山东省": "山东",
    "河南省": "河南",
    "湖北省": "湖北",
    "湖南省": "湖南",
    "广东省": "广东",
    "广西壮族自治区": "广西",
    "海南省": "海南",
    "重庆市": "重庆",
    "四川省": "四川",
    "贵州省": "贵州",
    "云南省": "云南",
    "西藏自治区": "西藏",
    "陕西省": "陕西",
    "甘肃省": "甘肃",
    "青海省": "青海",
    "宁夏回族自治区": "宁夏",
    "新疆维吾尔自治区": "新疆",
    "台湾省": "台湾",
    "香港特别行政区": "香港",
    "澳门特别行政区": "澳门",
    // 广东省
    "广州市": "广州",
    "韶关市": "韶关",
    "深圳市": "深圳",
    "珠海市": "珠海",
    "汕头市": "汕头",
    "佛山市": "佛山",
    "江门市": "江门",
    "湛江市": "湛江",
    "茂名市": "茂名",
    "肇庆市": "肇庆",
    "惠州市": "惠州",
    "梅州市": "梅州",
    "汕尾市": "汕尾",
    "河源市": "河源",
    "阳江市": "阳江",
    "清远市": "清远",
    "东莞市": "东莞",
    "中山市": "中山",
    "东沙群岛": "东沙群岛",
    "潮州市": "潮州",
    "揭阳市": "揭阳",
    "云浮市": "云浮"
};

let mapCenterAndZoom = {
    china: {
        center: [29.16,115.79],
        zoom: 4
    },
    guangdong: {
        center: [22.22,114.233],
        zoom: 7
    },
    // hubei: {
    //     center: [30.584355,114.298572],
    //     zoom: 7
    // }
};
        reflesh = () => {
            toLoadMap();
        };
        window.onload = function () {
            toLoadMap();
        };
        function toLoadMap() {
            let target = document.getElementById('select').value;
            let mapid = document.getElementById('mapid');
            document.body.removeChild(mapid);
            mapid = document.createElement("div");
            mapid.id = 'mapid';
            document.body.appendChild(mapid);
            let mymap = L.map('mapid').setView(mapCenterAndZoom[target].center,mapCenterAndZoom[target].zoom);
            window.mymap = mymap;
            function getColor(d) {
                if (d === 0) {
                    d = '';
                }
                return d.length === 5 ? '#800026' :
                    d.length === 4  ? '#E31A1C' :
                        d.length === 3   ? '#FD8D3C' :
                            d.length === 2   ? '#FEB24C' :
                                d.length === 1   ? '#FFEDA0' :
                                    '#fff';
            }
            function style(feature) {
                return {
                    fillColor: getColor(feature.properties.caseList),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            }
            function hoverToShowTooltip(e) {
                (window.popup || {remove(){}}).remove();
                let prop = e.target.feature.properties;
                let center = prop.center;
                window.popup = L.popup()
                    .setLatLng([center[1],center[0]])
                    .setContent(`<p>${prop.name}<br/>${prop.caseList} 例</p>`)
                    .addTo(mymap);
            }
            L.tileLayer('http://mt0.google.cn/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga', {
                attribution: 'google map',
                maxZoom: 18,
            }).addTo(mymap);
            fetch(`/public/caseList/${target}.json`)
                .then(_ => _.text())
                .then(JSON.parse)
                .then(caseList => {
                    window.maxNum = window.minNum = -1;
                    window.caseList = caseList;
                    window.deta = (window.maxNum - window.minNum) / 7;
                    fetch(`/public/geojson/${target}.json`)
                        .then(_ => _.text())
                        .then(JSON.parse)
                        .then(geojson => {
                            window.geojson = geojson;
                            geojson.features.map(_ => {
                                let name = _.properties.name in mapName ? mapName[_.properties.name] : _.properties.name;
                                _.properties.caseList = name in caseList ? caseList[name].confirmed : 0;
                                return _;
                            });
                            L.geoJSON(geojson,{
                                style: style,
                                onEachFeature(feauture,layer) {
                                    layer.on({
                                        mouseover: hoverToShowTooltip
                                    });
                                }
                            }).addTo(mymap);
                        });
                });
        }
    </script>
</html>
```

- 爬取网站的代码

```javascript
const request = require("request");
const fs = require('fs');
const commonPath = 'public/caseList/';

const allMethod = {
    china(){},
    guangdong() {},
    hubei() {}
};

/**爬取全国的数据**/
allMethod.china = function () {
    request('https://voice.baidu.com/act/newpneumonia/newpneumonia', (err, res, body) => {
        if (err) {
            console.log(err);
        } else {
            let o = res.body.split(/[\r\n]+/).filter(_ => _.indexOf('require.config') + 1).filter(_ => _.length > 100);
            eval('out = {"page":' + o[0].split('{"page":')[1].split('V.bsData')[0]);
            out = out.component[0].caseList
            o = {};
            out.forEach(c => {
                o[c.area] = c;
            });
            fs.writeFileSync(commonPath + 'china.json', JSON.stringify(o));
        }
    })
};

/**爬取广东省的疫情情况**/
allMethod.guangdong = function () {
    let matchGuangDong = (text) => {
        let count = {};
        let city = `广州、深圳、佛山、东莞、中山、珠海、江门、肇庆、惠州、汕头、潮州、揭阳、汕尾、湛江、茂名、阳江、云浮、韶关、清远、梅州、河源`.split('、').map(_ => {
            let rt = text.match(new RegExp(_ + '[0-9]+例', 'g'));
            if (rt) {
                count[_] = rt.map(_ => _.match(/[0-9]+/)[0]).sort((a, b) => b - a)[0];
            }
        });
        return count;
    };
    // 哪里哪里n例
    let cutPlaceAndCount = (text) => {
        let _ = text.split(/[0-9]+/);
        return [_[0], text.substring(_[0].length, text.length - _[1].length)];
    };
    request.get("http://wsjkw.gd.gov.cn/zwyw_yqxx/", (err, res, body) => {
        if (err) {
            console.log(err);
        } else {
            let url = res.body.split(/[\r\n]+/)
                .map(_ => _.trim())
                .filter(_ => _.indexOf('<li><a href="http://wsjkw.gd.gov.cn/zwyw_yqxx/content') + 1)
                .filter(_ => _.indexOf('疫情情况') + 1)[0]
                .match(/http:\/\/[a-zA-Z0-9\/._]+/)[0];
            request.get(url, (err, res, body) => {
                if (err) {
                    console.log(err);
                } else {
                    let ret = matchGuangDong(res.body);
                    let out = {};
                    for (let i in ret) {
                        out[i] = {
                            confirmed: ret[i] + ''
                        };
                    }
                    fs.writeFileSync(commonPath + 'guangdong.json', JSON.stringify(out));
                }
            });
        }
    });
};

setInterval(function () {
    allMethod.china();
    allMethod.guangdong();
},1000 * 60 * 10);

```