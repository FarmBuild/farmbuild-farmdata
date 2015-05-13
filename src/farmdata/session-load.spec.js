'use strict';

describe('farmbuild.farmdata module', function() {

  beforeEach(function(){
    fixture.setBase('data');
  });

  // instantiate service
  var farmdataSession, farmdata,$log,
    susanFarm = 'farmdata-susan.json';

  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console);
  }));

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_farmdataSession_,_farmdata_, _$log_) {
    farmdataSession = _farmdataSession_;
    farmdata = _farmdata_;
    $log = _$log_;
  }));

  describe('Load an existing farmdata to session', function(){

    it(susanFarm + ' must have been loaded and valid', inject(function() {
      farmdataSession.clear()
      expect(farmdataSession.find()).toBeUndefined()

      var loaded = fixture.load(susanFarm);
      $log.info('loaded: %j', loaded)

      expect(loaded).toBeDefined()
      expect(farmdata.validator.validate(loaded)).toBeTruthy()

      var sessioned = farmdataSession.load(loaded)

      $log.info('sessioned: %j', sessioned)

      expect(angular.equals(loaded, sessioned)).toBeTruthy()

    }));
  });

  afterEach(function(){
    fixture.cleanup()
  });
});
