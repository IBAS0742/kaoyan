# 使用 ```gdaldem``` 将 tif 假彩色

> 1.手动插件颜色表

如下格式，每行表示一个信息

例如第一行，表示将 0 数值的内容用 RGB(76,180,131) 转换为

```
0	76	180	131
0.35	255	195	159
0.45	255	238	147
0.55	226	219	190
0.65	163	163	128
0.75	204	252	98
0.85	246	214	255
1	0	0	0
```

```batch
gdaldem color-relief result.tif result_color.txt result.color.tif
```

![](./pic/gdaldem_1.jpg)
