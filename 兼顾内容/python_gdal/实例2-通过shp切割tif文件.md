# 使用```矢量```裁切```栅格```文件

> 使用 [```gdalwarp.exe```](https://gdal.org/1.11/gdalwarp.html)

- 安装 gdal 后，在 python 目录下的 Library\bin 目录下可以找到改文件

![](./pic/gdalwarp_loc.png)

- 最初级使用方法

```batch
shp 是矢量文件
tif 是要被裁切的栅格文件
out_tif 是裁切结果文件

gdalwarp -cutline shp tif out_tif
```
