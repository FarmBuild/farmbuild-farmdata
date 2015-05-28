describe('farmbuild.farmdata module', function() {
  // instantiate log
  var $log, farmdataPaddocks, farmdata, farmdataConverter;
  var crs = 'EPSG:4283';


  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console)
  }));

  beforeEach(inject(function (_$log_, _farmdataPaddocks_, _farmdata_, _farmdataConverter_) {
    $log = _$log_;
    farmdataPaddocks = _farmdataPaddocks_;
    farmdata = _farmdata_;
    farmdataConverter = _farmdataConverter_;
  }))

  function createGeometry() {
    return {"type": "Polygon",
      "coordinates": [[[16205687.520831015, -4331788.270308661],
      [16205603.152080152, -4331789.188156667],
      [16205599.164149445, -4331941.003031067],
      [16205687.01904266, -4331942.85666477],
      [16205686.7631797, -4331933.887643515],
      [16205687.520831015, -4331788.270308661]]]};
  }

  function createPaddockFeatureNew() {
    return {
      "type": "Feature",
      "geometry": {"type": "Polygon",
        "crs": {
          "type": "name",
          "properties": {
            "name": "EPSG:4283"
          }
        },
        "coordinates": [[[16205687.520831015, -4331788.270308661],
            [16205603.152080152, -4331789.188156667],
            [16205599.164149445, -4331941.003031067],
            [16205687.01904266, -4331942.85666477],
            [16205686.7631797, -4331933.887643515],
            [16205687.520831015, -4331788.270308661]]]},
      "properties": {"name": "P19"}
    };
  }

  describe('farmdataPaddocks.merge should merge the geoJson into the farmData', function() {

    it('adding a new paddock', inject(function() {
      var farmDataNew = farmdata.create(),
        geoJsonsNew = farmdataConverter.toGeoJsons(farmDataNew),
        paddockGeoJsonNew = createPaddockFeatureNew();

      expect(geoJsonsNew.paddocks).toBeDefined();
      expect(geoJsonsNew.paddocks.features).toBeDefined();
      expect(geoJsonsNew.paddocks.features.length).toBe(0);

      var geoJsonsAdded = farmdataPaddocks.add(geoJsonsNew, paddockGeoJsonNew)


      expect(geoJsonsAdded.paddocks.features.length).toBe(1)
      var toVerify = geoJsonsAdded.paddocks.features[0]
      expect(angular.equals(paddockGeoJsonNew, toVerify)).toBeTruthy()

      var farmDataAdded = farmdata.merge(farmDataNew, geoJsonsAdded);

      expect(farmDataAdded.paddocks.length).toBe(1)

    }))



  })

  afterEach(function() {
    fixture.cleanup()
  });
});
