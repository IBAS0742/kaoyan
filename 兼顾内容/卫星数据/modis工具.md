# [pyModis(Github)](https://github.com/lucadelu/pyModis)

> [官网](http://www.pymodis.org/)

```
依赖库
gdal-python
python-numpy
python-requests
python-future
wxpython

安装语句
pip install pyModis
```

- 这个代码的本质是调用 mrt 工具包或者调用 gdal ，使用时，如果用 mrt 需要事先安装 mrt

> 这个库提供了以下 七个 工具

```
modis_download.py
modis_download_from_list.py
modis_parse.py
modis_multiparse.py
modis_mosaic.py
modis_convert.py
modis_quality.py
```

```cmd
gdal_py modis_convert.py -s "(1)" -e 4326 -o C:\Users\HUZENGYUN\Desktop\mod11a2.2019.jan\test\test\out C:\Users\HUZENGYUN\Desktop\mod11a2.2019.jan\test\test\MOD11A2.A2019001.h21v03.006.2019010204852.hdf
```

# [modape(Github)](https://github.com/WFP-VAM/modape)

> [官网](https://wfp-vam.github.io/modape/)
