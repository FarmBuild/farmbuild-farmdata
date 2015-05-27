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

  // instantiate log
  var $log,
    geoJsonValidator,
    susanFarm = 'farmdata-susan.json';
  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console)
  }));

  beforeEach(inject(function (_$log_, _geoJsonValidator_) {
    $log = _$log_,
      geoJsonValidator = _geoJsonValidator_
  }))

  describe('Given calling validator.validate should return true or false', function() {
    it('geoJsonValidator should be defined', inject(function() {
      expect(geoJsonValidator).toBeDefined()
    }))

    it('Susan farm data should be valid', inject(function() {
      var loaded = fixture.load(susanFarm);
      expect(geoJsonValidator.validate(loaded)).toBeTruthy()
    }))

  })

  afterEach(function() {
    fixture.cleanup()
  });
});
