# cshap 读取栅格数据

- imagePath 对应的文件在 ```实验材料\1.tif``` 中可以找到

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GDAL = OSGeo.GDAL;

namespace GdalDev
{
        class Program
        {
                static void Main(string[] args)
                {
                        string imagePath = @"C:\Users\HUZENGYUN\Desktop\1.tif";
                        // 配置，暂时不用那个 ogr，那个是矢量的
                        GdalConfiguration.ConfigureGdal();
                        GdalConfiguration.ConfigureOgr();
                        // 这个像c 那个注册
                        GDAL.Gdal.AllRegister();
                        // 只读模式打开一个图片
                        //GDAL.Dataset ds = GDAL.Gdal.Open(imagePath,GDAL.Access.GA_ReadOnly);
                        //ds.Dispose();
                        // c#的语法，等同上面
                        using (GDAL.Dataset ds = GDAL.Gdal.Open(imagePath, GDAL.Access.GA_ReadOnly))
                        {
                                // 这个序号依旧是从1开始
                                GDAL.Band band = ds.GetRasterBand(1);
                                int xsize = band.XSize;
                                int ysize = band.YSize;
                                // 我的图片是 uint8 格式的
                                int[] buf = new int[xsize];
                                for (int i = 0;i < ysize;i++)
                                {
                                        // buf 只能是 int byte short float double
                                        band.ReadRaster(0, i, xsize, 1, buf, xsize, 1, 0, 0);
                                        for (int j = 0;j < xsize;j++)
                                        {
                                                Console.Write(buf[j] + "\t");
                                        }
                                        Console.WriteLine();
                                }
                        }
                        Console.ReadKey();
                }
        }
}

```