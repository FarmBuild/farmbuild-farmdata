'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var Farmdata;

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_Farmdata_) {
    Farmdata = _Farmdata_;
  }));

  describe('Use the API for the 1st time with the new farm data', function(){
    it('Farmdata should be defined', inject(function() {
      expect(Farmdata).toBeDefined();
    }));

    it('Farmdata.create should create the default farmdata with name, geometry and area', inject(function() {
      var data = Farmdata.create();

      expect(data).toBeDefined();
      expect(data.geometry).toBeDefined();
      expect(data.geometry.type).toBeDefined();
      expect(data.geometry.crs).toBeDefined();
      expect(data.geometry.coordinates).toBeDefined();
      expect(data.area).toBeDefined();
      expect(data.name).toEqual(Farmdata.defaultValues().name);
    }));

    it('Farmdata.create should create the default farmdata with the specifid name', inject(function() {
      var name = "Susan's fram",
        data = Farmdata.create(name);
      expect(data.name).toEqual(name);
    }));
  });
});
