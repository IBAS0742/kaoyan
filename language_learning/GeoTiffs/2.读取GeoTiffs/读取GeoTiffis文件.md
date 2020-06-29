# 读取GeoTiffis文件

```scala
import geotrellis.raster.io.geotiff.reader.GeoTiffReader
import geotrellis.raster.io.geotiff._

object ReadGeoTiffs {
  def main(args: Array[String]) = {
    val path: String = "C:\\Users\\HUZENGYUN\\Documents\\git\\临时资源\\R10m\\T40TEQ_20181221T071311_WVP_10m.tif"
    val geoTiff: SinglebandGeoTiff = GeoTiffReader.readSingleband(path)
  }
}

```

- ```import geotrellis.raster.io.geotiff.reader.GeoTiffReader``` 实现读取 ```GeoTiffs``` 的相关方法

- ```import geotrellis.raster.io.geotiff._``` 定义了 ```SinglebandGeoTiff``` 和 ```MultibandGeoTiff```

- ```val geoTiff: SinglebandGeoTiff = GeoTiffReader.readSingleband(path)``` 读取单一波段的 ```GeoTiffs``` 文件

- ```val geoTiff: MultibandGeoTiff = GeoTiffReader.readMultiband(path)``` 读取多波段的 ```GeoTiffs``` 文件

- 另外，为了保证代码的准确性，这里可以使用以下代码进行替换

```scala
//import geotrellis.raster.io.geotiff.reader.GeoTiffReader
//import geotrellis.raster.io.geotiff._
import geotrellis.raster.io.geotiff.SinglebandGeoTiff

object ReadGeoTiffs {
  def main(args: Array[String]) = {
    val path: String = "C:\\Users\\HUZENGYUN\\Documents\\git\\临时资源\\R10m\\T40TEQ_20181221T071311_WVP_10m.tif"
//    val geoTiff: SinglebandGeoTiff = GeoTiffReader.readSingleband(path)
    val geoTiff: SinglebandGeoTiff = SinglebandGeoTiff(path)
  }
}
```

- 这里使用的是 ```SinglebandGeoTiff``` 的 ```apply``` 方法

> GeoTiffs 可能需要被```解压缩```，默认会被解压缩

- 在读取压缩的 ```GeoTiffs``` 时可能需要注意

- Java 中如果读取了超过 4G 的影像，经过解压缩可能导致**程序崩溃**

```scala
// 实现解压缩
val geoTiff: SinglebandGeoTiff = GeoTiffReader.readSingleband(path,true,false)

// 同样存在以下方法 (都是解压缩的写法，分别时多条带和单条带)
val geoTiff: SinglebandGeoTiff = SinglebandGeoTiff(path,true,false)
val geoTiff: SinglebandGeoTiff = MultibandGeoTiff(path,true,false)

SinglebandGeoTiff.compressed("path/to/compressed/geotiff.tif")
MultibandGeoTiff.compressed("path/to/compressed/geotiff.tif")
```

> 流，在 ```GeoTiffReader.readSingleband``` 和 ```SinglebandGeoTiff``` 和 ```MultibandGeoTiff``` 存在的第三个函数为 ```streaming```

- 流读取时可能会更慢，虽然可以避免大文件直接读入导致程序崩溃，但是选取过大时也会导致崩溃

> 限定区域读取

```scala
val path: String = "path/to/my/geotiff.tif"
val e: Extent = Extent(0, 1, 2, 3)

// 提供一个 区域 extent

// 单条带
SinglebandGeoTiff(path, e)
// 或者
GeoTiffReader.readSingleband(path, e)

// 多条带
MultibandGeoTiff(path, e)
// 或者
GeoTiffReader.readMultiband(path, e)

// 提供一个 Some 类型的 选取 Some(Extent)

// 单条带
SinglebandGeoTiff(path, Some(e))
// 或者
GeoTiffReader.readSingleband(path, Some(e))

// 多条带
MultibandGeoTiff(path, Some(e))
// 或者
GeoTiffReader.readMultiband(path, Some(e))
```

- 如果时对使用 ```Streaming``` 读入的 ```GeoTiffs``` 文件，可以通过以下方式 ```裁切```

```scala
val path: String = "path/to/my/geotiff.tif"
val e: Extent = Extent(0, 1, 2, 3)

// 读取并使用裁切

// 单条带
SinglebandGeoTiff.streaming(path).crop(e)
// 或者
GeoTiffReader.readSingleband(path, false, true).crop(e)

// 多条带
MultibandGeoTiff.streaming(path).crop(e)
// 或者
GeoTiffReader.readMultiband(path, false, true).crop(e)

// doing the reading and cropping in two lines

// 单条带
val sgt: SinglebandGeoTiff =
    SinglebandGeoTiff.streaming(path)
    // 或者
    GeoTiffReader.readSingleband(path, false, true)
sgt.crop(e)

// 多条带
val mgt: MultibandGeoTiff =
    MultibandGeoTiff.streaming(path)
    // 或者
    GeoTiffReader.readMultiband(path, false, true)
mgt.crop(e)
```