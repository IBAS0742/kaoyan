# 将 geos 线/面 矢量保存到 shp 文件中

需要用到的库如下

|库|作用|
|--|--|
|ogrsf_frmts|矢量读写操作|
|geos/geom.h|geos 线/面矢量操作|
|iostream|标准输入输出|
|vector.h|向量|



```c++
// 记得使用 GDALAllRegister();
// 和 GDALDestroyDriverManager();

GDALDataset * Creatshape(const char* pszFileName, OGRwkbGeometryType type) {
	GDALDriver * poOgrDriver = OGRSFDriverRegistrar::GetRegistrar()->GetDriverByName("ESRI Shapefile");

	if (poOgrDriver == NULL)
	{
		cout << "can't get driver";
		exit(1);
	}
	GDALDataset* poDstDataset = poOgrDriver->Create(pszFileName, 0, 0, 0, GDT_Unknown, NULL);
	if (poDstDataset == NULL)
	{
		cout << "can't get dataset";
		exit(1);
	}
	OGRSpatialReference* pSpecialReference = new OGRSpatialReference();
	pSpecialReference->SetWellKnownGeogCS("EPSG:4326");
	const char* layerName = "polygon";
	OGRLayer* poLayer = poDstDataset->CreateLayer(layerName, pSpecialReference, type, 0);
	if (poLayer == NULL)
	{
		cout << "can't create layer";
		GDALClose(poDstDataset);
		return false;
	}
	return poDstDataset;
}
// 保存面矢量到 shp 文件中
void SaveVPolygonToShpFile(char * polygonPath, vector<Polygon*>* polys) {
	GDALDataset * polygonDS = Creatshape(polygonPath, wkbPolygon);
	OGRLayer * polygonLay = polygonDS->GetLayer(0);
	for (unsigned int i = 0; i < polys->size(); i++) {
		Polygon * pol = polys->at(i);
		cout << "is empty = " << pol->isEmpty() << endl;
		cout << "num points = " << pol->getNumPoints() << endl;
		cout << "area = " << pol->getArea() << endl;
		cout << "length = " << pol->getLength() << endl;
		OGRFeature * poFeature = OGRFeature::CreateFeature(polygonLay->GetLayerDefn());
		if (polygonLay->CreateFeature(poFeature) != OGRERR_NONE)
		{
			cout << "faile to create [" << i << "] in polygon" << endl;
		}
		OGRPolygon * ogrPoly = new OGRPolygon();
		OGRLinearRing * MyRine = (OGRLinearRing*)OGRGeometryFactory::createGeometry(wkbLinearRing);

		CoordinateSequence* cl = pol->getCoordinates();
		for (int j = 0; j < cl->size(); j++) {
			Coordinate coord = cl->getAt(j);
			MyRine->addPoint(new OGRPoint(coord.x, coord.y));
		}
		ogrPoly->addRing(MyRine);
		poFeature->SetGeometry(ogrPoly);

		polygonLay->SetFeature(poFeature);
	}
	GDALClose(polygonDS);
}
// 保存 线矢量 到 shp 文件中
void SaveVLinestringToShpFile(char * polygonPath, const vector<const LineString *> polys) {
	GDALDataset * polygonDS = Creatshape(polygonPath, wkbLineString);
	OGRLayer * polygonLay = polygonDS->GetLayer(0);

	for (unsigned int i = 0; i < polys.size(); i++) {
		OGRFeature * poFeature = OGRFeature::CreateFeature(polygonLay->GetLayerDefn());
		if (polygonLay->CreateFeature(poFeature) != OGRERR_NONE)
		{
			cout << "faile to create [" << i << "] in polygon" << endl;
		}

		const LineString * pol = polys.at(i);
		CoordinateSequence* cl = pol->getCoordinates();
		OGRLineString * geoLineString = new OGRLineString();
		for (int j = 0; j < cl->size(); j++) {
			Coordinate coord = cl->getAt(j);
			geoLineString->addPoint(new OGRPoint(coord.x, coord.y));
		}
		poFeature->SetGeometry(geoLineString);
		polygonLay->SetFeature(poFeature);
	}
	GDALClose(polygonDS);
}
```