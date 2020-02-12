

```matlab
clc;clear;close all;
x = -8 : 0.01 : 8;
y = 64 - x .^ 2;
plot(x,y)

dx = [-6 2 6];
y0 = 64 - dx .^ 2;
dy = -2 * dx;
for j = 1:length(dx)
    y = dy(j) * (x - dx(j)) + y0(j);
    hold on;
    plot(x,y);
end
```