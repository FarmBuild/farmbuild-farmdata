'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var FarmData;

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_FarmData_) {
    FarmData = _FarmData_;
  }));

  describe('Use the API for the 1st time with the new farm data', function(){
    it('FarmData should be defined', inject(function() {
      expect(FarmData).toBeDefined();
    }));

    it('FarmData.create should create the default farmdata with name, geometry and area', inject(function() {
      var data = FarmData.create();

      expect(data).toBeDefined();
      expect(data.geometry).toBeDefined();
      expect(data.geometry.type).toBeDefined();
      expect(data.geometry.crs).toBeDefined();
      expect(data.geometry.coordinates).toBeDefined();
      expect(data.area).toBeDefined();
      expect(data.name).toEqual(FarmData.defaultValues().name);
    }));

    it('FarmData.create should create the default farmdata with the specifid name', inject(function() {
      var name = "Susan's fram",
        data = FarmData.create(name);
      expect(data.name).toEqual(name);
    }));
  });
});
