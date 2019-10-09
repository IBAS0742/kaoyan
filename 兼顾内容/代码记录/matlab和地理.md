# 对于地理信息处理的 matlab 意见

> 对于栅格的处理意见

- 如果需要获取其中内容并挨个处理，建议是将矩阵进行旋转

- 理由是，地理信息的坐标和我们看到的matlab的坐标不太一样，y轴方向的差异(具体为什么要逆时针90°我忘了)

![](./pic/read_raster_rot90_reason.jpg)

```matlab
% 读取栅格数据
[A,R] = geotiffread('a.tif');
A = rot90(A,3);
[A_x,A_y] = size(A);
for i = 1 : A_x
    for j = 1 : A_y
        do something for A(A_x,A_y)
    end
end
%旋转回来
A = rot90(A);
```