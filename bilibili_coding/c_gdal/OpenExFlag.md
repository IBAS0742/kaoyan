# openEx 的标识说明

|标识|说明|
|--|--|
|GDAL_OF_ALL|允许使用栅格和矢量驱动程序|
|GDAL_OF_ARRAY_BLOCK_ACCESS|对缓存块使用基于数组的存储策略|
|GDAL_OF_DEFAULT_BLOCK_ACCESS|让GDAL决定是否必须对缓存块使用基于数组或基于哈希集的存储策略。|
|GDAL_OF_HASHSET_BLOCK_ACCESS|对缓存的块使用基于哈希集的存储策略|
|GDAL_OF_GNM|允许使用gnm驱动程序|
|GDAL_OF_INTERNAL|作为内部数据集打开。 此类数据集未在打开的数据集的全局列表中注册。 |
|GDAL_OF_RASTER|允许使用栅格驱动程序|
|GDAL_OF_READONLY|以只读模式打开|
|GDAL_OF_SHARED|在共享模式下打开|
|GDAL_OF_UPDATE|在更新模式下打开|
|GDAL_OF_VECTOR|允许使用向量驱动程序|
|GDAL_OF_VERBOSE_ERROR|如果打开失败，则发出错误消息|

GDAL_OF_ARRAY_BLOCK_ACCESS 和 GDAL_OF_DEFAULT_BLOCK_ACCESS 和 GDAL_OF_HASHSET_BLOCK_ACCESS 三个互斥

GDAL_OF_INTERNAL 不能和 GDAL_OF_SHARED 同时使用