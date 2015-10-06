'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var farmdata;

  beforeEach(module('farmbuild.farmdata'));
  var $log;
  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console)
  }));

  beforeEach(inject(function (_$log_) {
    $log = _$log_
  }))

  beforeEach(inject(function (_farmdata_) {
    farmdata = _farmdata_;
  }));

  //describe('Use the API for the 1st time with the new farm data', function(){
  //  it('farmdata should be defined', inject(function() {
  //    expect(farmdata).toBeDefined();
  //  }));
  //
  //  it('farmdata.create should create the default farmdata with name, geometry and area', inject(function() {
  //    var data = farmdata.create();
  //
  //    expect(data).toBeDefined();
  //    expect(data.geometry).toBeDefined();
  //    expect(data.geometry.type).toBeDefined();
  //    expect(data.geometry.crs).toBeDefined();
  //    expect(data.geometry.crs).toBe('EPSG:4283');
  //
  //    expect(data.geometry.coordinates).toBeDefined();
  //    expect(data.area).toBeDefined();
  //    expect(data.name).toEqual(farmdata.defaultValues().name);
  //
  //    expect(data.paddocks).toBeDefined();
  //    $log.info('typeof data.paddocks %s', typeof data.paddocks)
  //    expect(Object.prototype.toString.call(data.paddocks) === '[object Array]').toBeTruthy();
  //  }));
  //
  //  it('farmdata.create should create the default farmdata with the specifid name', inject(function() {
  //    var name = "Susan's fram",
  //      data = farmdata.create(name);
  //
  //    expect(data.name).toEqual(name);
  //  }));
  //});

  describe('Use the API for the 1st time with the new farm data and default values', function(){
    it('farmdata should be defined', inject(function() {
      expect(farmdata).toBeDefined();
    }));

    it('farmdata.create should create the default farmdata with name, geometry and area', inject(function() {
      var defaults = {
          paddocks: {
            groups: [{name: 'test', paddocks: []}], types: [{name: 'test'}]
          }
        },
        name = 'parham\'s farm',
        data = farmdata.create(name, undefined, "EPSG:4283", defaults);

      expect(data).toBeDefined();
      expect(data.geometry).toBeDefined();
      expect(data.geometry.type).toBeDefined();
      expect(data.geometry.crs).toBeDefined();
      expect(data.geometry.crs).toBe('EPSG:4283');

      expect(data.geometry.coordinates).toBeDefined();
      expect(data.area).toBeDefined();
      expect(data.name).toEqual(name);

      expect(farmdata.paddockGroups.toArray()).toEqual(defaults.paddocks.groups);
      expect(farmdata.paddockTypes.toArray()).toEqual(defaults.paddocks.types);

      expect(data.paddocks).toBeDefined();
      $log.info('typeof data.paddocks %s', typeof data.paddocks)
      expect(Object.prototype.toString.call(data.paddocks) === '[object Array]').toBeTruthy();
    }));

    it('farmdata.create should create the default farmdata with the specifid name', inject(function() {
      var name = "Susan's fram",
        data = farmdata.create(name);

      expect(data.name).toEqual(name);
    }));
  });
});
