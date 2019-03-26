### 神奇的 C

- 冒泡排序

```c
#include <stdio.h>

int main() {
    int a[10],i,j,t;
    // 输入 10 个数用来比较
    for (i = 0;i < 10;i++) {
        scanf("%d",&a[i]);
    }

    for (j = 0;j < 9;j++) {
        for (i = 0;i < 9 - j;i++) {
            if (a[i] > a[i + 1]) {
                t = a[i];
                a[i] = a[i + 1];
                a[i + 1] = t;
            }
        }
    }

    // 打印 比较 结果
    for (i = 0;i < 10;i++) {
        printf("%d\t",&a[i]);
    }

    return 0;
}
```