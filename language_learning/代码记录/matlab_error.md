# matlab 问题及解决方案

> geotiffwrite 写文件时发生错误，前提是两个tif的地理信息是一样的

![](./pic/matlab_geotiffwrite_error.png)

- 解决方案如下

```matlab
info = geotiffinfo('1.tif');
[img1,R] = geotiffread('1.tif');
[img2] = geotiffread('2.tif');
cimg = [];
cimg(:,:,1) = img1;
cimg(:,:,2) = img2;
geotiffwrite(['out.tif'],cimg,R,'GeoKeyDirectoryTag',info.GeoTIFFTags.GeoKeyDirectoryTag);

```
