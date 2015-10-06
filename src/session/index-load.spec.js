'use strict';

describe('farmbuild.farmdata module', function() {

  beforeEach(function(){
    fixture.setBase('data');
  });

  // instantiate service
  var farmdataSession, farmdata,$log, farmdataPaddockGroups, farmdataPaddockTypes,
    susanFarm = 'farmdata-susan.json',
    susanFarmWithDefaults = 'farmdata-susan-with-defaults.json';

  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console);
  }));

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_farmdataSession_,_farmdata_, _farmdataPaddockGroups_, _farmdataPaddockTypes_, _$log_) {
    farmdataSession = _farmdataSession_;
    farmdata = _farmdata_;
    $log = _$log_;
    farmdataPaddockGroups = _farmdataPaddockGroups_;
    farmdataPaddockTypes = _farmdataPaddockTypes_;
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

      expect(angular.equals(loaded.id, sessioned.id)).toBeTruthy()
      expect(angular.equals(loaded.name, sessioned.name)).toBeTruthy()
      expect(angular.equals(loaded.dateCreated, sessioned.dateCreated)).toBeTruthy()
      expect(angular.equals(loaded.dateLastUpdated, sessioned.dateLastUpdated)).toBeTruthy()
      expect(angular.equals(loaded, sessioned)).toBeTruthy();
      expect(farmdataPaddockGroups.size() > 1).toBeTruthy()
      expect(farmdataPaddockTypes.size() > 1).toBeTruthy()

    }));
  });

  describe('Load an existing farmdata to session with values for paddockGroups and paddockTypes already defined in it', function(){

    it(susanFarm + ' must have been loaded and valid', inject(function() {
      farmdataSession.clear()
      expect(farmdataSession.find()).toBeUndefined()

      var loaded = fixture.load(susanFarmWithDefaults);
      $log.info('loaded: %j', loaded)

      expect(loaded).toBeDefined()
      expect(farmdata.validator.validate(loaded)).toBeTruthy()

      var sessioned = farmdataSession.load(loaded)

      $log.info('sessioned: %j', sessioned)

      expect(angular.equals(loaded.id, sessioned.id)).toBeTruthy()
      expect(angular.equals(loaded.name, sessioned.name)).toBeTruthy()
      expect(angular.equals(loaded.dateCreated, sessioned.dateCreated)).toBeTruthy()
      expect(angular.equals(loaded.dateLastUpdated, sessioned.dateLastUpdated)).toBeTruthy()
      expect(angular.equals(loaded, sessioned)).toBeTruthy()
      expect(loaded.paddockGroups.length).toEqual(farmdataPaddockGroups.size())
      expect(loaded.paddockTypes.length).toEqual(farmdataPaddockTypes.size())
    }));
  });

  afterEach(function(){
    fixture.cleanup()
  });
});
