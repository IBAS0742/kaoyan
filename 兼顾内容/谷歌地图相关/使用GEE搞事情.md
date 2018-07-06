# 该部分使用 GEE 搞事情[^翻墙方法]

### `可能需要使用谷歌浏览器`

## 大概步骤
* 1.注册谷歌账号
* 2.[注册进入谷歌地球引擎](https://earthengine.google.com/)
* >注册时的信息并没有验证，机构可以自己随意填写
* 3.注册并同意 [谷歌控制台](https://console.cloud.google.com/) 的协议
* 4.创建一个项目
* 5.加入谷歌地图 API
* 6.编写页面

## 进入谷歌控制台之后创建项目方法如下
* 没有项目或所有项目被关停
![没有项目或所有项目被关停](./pic/newProject-1.png)
* 没有项目或所有项目被关停
![已有项目](./pic/newProject-2.png)

## 将谷歌地图API加入到项目中
* 进入谷歌控制台主页
![进入主页](./pic/enterAPISelect-1.png)
![进入api页](./pic/enterAPISelect-2.png)
![进入api页](./pic/enterAPISelect-3.png)
* 启用 api
![启用](./pic/invokeMapAPI.png)
* 获取凭据
![获取凭据](./pic/getMapAuth.png)

## 将 GEE 的运行显示到自己的页面中
* gee 中的一个例子的运行结果(获取到 mapid 和 token)
![运行结果](./pic/runResult.png)
* 将 mapid 和 token 带入地图中使用
![代入查看](./pic/mapidAndTokenUsing.png)
* 代码中我们要划一下重点(不知道为什么地图中的坐标是相反的，gee中表示方式和google map 中使用了经纬度互调的方式)
![代码重点](./pic/demoKey.png)
* 另外说明(gee中带图标的内容，会有一个value请求可以获取到计算结果)
![说明](./pic/geeResultStatement.png)
* 代码
```html
<!DOCTYPE html>
<html>
<head>
<!--
    这里的 ee_api_js.js 是从 谷歌地球引擎 GitHub 项目中获取的
    https://github.com/google/earthengine-api 
-->
<script src="./ee_api_js.js">
</script>
<!---
<script src="http://maps.googleapis.com/maps/api/js?key=[你自己的地图授权码]&sensor=false">
</script>
-->
<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyB1gB4BsO6NpkIFf_zXnJJKUf94mtI_n6Q&sensor=false">
</script>
 
<script>
var pos = [];
var map = {};
function initialize()
{
    var mapProp = {
        center:new google.maps.LatLng(39.01918,-94.84497),
        zoom:8,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
	
    map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
	
	var mapid = 'cf436a87385ca0a02a53eea917a4a8ef';
	var token = '1381d2a56cd1df86b84cd74a0ef57c11';
	var overlay = new ee.layers.ImageOverlay(
      new ee.layers.EarthEngineTileSource('https://earthengine.googleapis.com/map', mapid, token)
    )
	
	setTimeout(() => {
		map.overlayMapTypes.push(overlay);
	},1000)
}

google.maps.event.addDomListener(window, 'load', initialize);
</script>
</head>
 
<body>
<div id="googleMap" style="width:800px;height:500px;"></div>
 <script>

	
 </script>
</body>
</html>
```

* ee_api_js.js 的 GitHub 位置
![ee_api_js.js](./pic/ee_api_js.js.png)


[^翻墙方法]:https://github.com/haotian-wang/google-access-helper