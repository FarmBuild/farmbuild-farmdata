describe('farmbuild.farmdata module', function() {
  //access test data under data dir
  beforeEach(function() {
    fixture.setBase('data')
  })

  // instantiate log
  var $log,
    geoJsonValidator,
    geoJsonsFile = 'geo-json-susan.json',
    geoJsonsInvalidFile = 'geo-json-invalid.json',
    geojsonhint

  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console)
  }));

  beforeEach(inject(function (_$log_, _geoJsonValidator_) {
    $log = _$log_,
    geoJsonValidator = _geoJsonValidator_
    geojsonhint = geoJsonValidator.geojsonhint
  }))

  describe('Given creating a geoJson string', function() {
    it('geojsonhint.hint should be true for getJsons', inject(function() {
      var geoJsons = fixture.load(geoJsonsFile),
      errors = geojsonhint.hint(angular.toJson(geoJsons))
      $log.info('errors %j', errors)
      expect(errors.length).toBe(1)

      errors = geojsonhint.hint(angular.toJson(geoJsons.farm))
      $log.info('errors %j', errors)
      expect(errors.length).toBe(0)

      errors = geojsonhint.hint(angular.toJson(geoJsons.paddocks))
      $log.info('errors %j', errors)
      expect(errors.length).toBe(0)
    }))

    it('geojsonhint.hint should be true for geoJsonsInvalidFile', inject(function() {
      var val = fixture.load(geoJsonsInvalidFile)

      $log.info('val.farm %j', val.farm)
      errors = geojsonhint.hint(val)
      $log.info('errors %j', errors)
      expect(errors.length).toBe(1)

      expect(geojsonhint.hint(val.farm).length).toBe(1)
      expect(geojsonhint.hint(val.paddocks).length).toBe(1)
    }))

  })

  afterEach(function() {
    fixture.cleanup()
  });
});
