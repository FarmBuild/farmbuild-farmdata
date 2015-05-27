/**
 * This blank test shows:
 * notice it's not 'use strict';
 * how to set $log so it ouputs to console
 * how to use the test data using fixture
 */
describe('farmbuild.farmdata module', function() {
  //access test data under data dir
  beforeEach(function() {
    fixture.setBase('data')
  })
  beforeEach(module('farmbuild.farmdata'));

  // instantiate log
  var $log,
    farmdataConverter,geoJsonValidator,
    susanFarm = 'farmdata-susan.json';
  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console)
  }));

  beforeEach(inject(function (_$log_, _farmdataConverter_, _geoJsonValidator_) {
    $log = _$log_,
    farmdataConverter = _farmdataConverter_
    geoJsonValidator = _geoJsonValidator_
  }))

  describe('Given calling validator.validate should return true or fale', function() {
    it('farmdataConverter should be defined', inject(function() {
      expect(farmdataConverter).toBeDefined()
    }))

    it('Susan farm data should be converted to valid geoJsons', inject(function() {
      var loaded = fixture.load(susanFarm),
        geoJsons = farmdataConverter.toGeoJsons(loaded);


      expect(geoJsons).toBeDefined()
      expect(geoJsons.farm).toBeDefined()
      expect(geoJsons.farm.type).toBeDefined()
      expect(geoJsons.farm.type).toBe('FeatureCollection')

      $log.info('geoJsons.farm:%j', geoJsons.farm)

      expect(geoJsonValidator.isGeoJsons(geoJsons.farm)).toBeTruthy()
      expect(geoJsons.paddocks).toBeDefined()
      expect(geoJsonValidator.isGeoJsons(geoJsons.paddocks)).toBeTruthy()
      expect(geoJsons.paddocks.features[0].properties.name).toBeDefined()

      $log.info('geoJsons:%j', geoJsons)
    }))

    it('geoJsons  should be converted to valid farmData', inject(function() {
      var loaded = fixture.load(susanFarm),
        source = angular.copy(loaded),
        geoJsons = farmdataConverter.toGeoJsons(loaded)

      $log.info('loaded:%j', source.geometry.crs)

      var converted = farmdataConverter.toFarmData(loaded, geoJsons)

      $log.info('source:%j, converted:%j', source.geometry.crs, converted.geometry.crs)

      expect(angular.equals(source.geometry.crs, loaded.geometry.crs)).toBeTruthy()
      expect(angular.equals(source.geometry, loaded.geometry)).toBeTruthy()

      $log.info('source:%j, converted:%j',
        source.paddocks[0].geometry, converted.paddocks[0].geometry)
      expect(angular.equals(source.paddocks, loaded.paddocks)).toBeTruthy()

    }))


  })

  afterEach(function() {
    fixture.cleanup()
  });
});
