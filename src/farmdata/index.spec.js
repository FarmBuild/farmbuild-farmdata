'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var farmData;

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_farmData_) {
    farmData = _farmData_;
  }));

  describe('Use the API for the 1st time with the new farm data', function(){
    it('farmData should be defined', inject(function() {
      expect(farmData).toBeDefined();
    }));

    it('farmData.create should create the default farmdata with name, geometry and area', inject(function() {
      var data = farmData.create();

      expect(data).toBeDefined();
      expect(data.geometry).toBeDefined();
      expect(data.geometry.type).toBeDefined();
      expect(data.geometry.crs).toBeDefined();
      expect(data.geometry.coordinates).toBeDefined();
      expect(data.area).toBeDefined();
      expect(data.name).toEqual(farmData.defaultValues().name);
    }));

    it('farmData.create should create the default farmdata with the specifid name', inject(function() {
      var name = "Susan's fram",
        data = farmData.create(name);
      expect(data.name).toEqual(name);
    }));
  });
});
