'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var farmdata, dataNoName,
    susanFarmJson = 'susan-farm-final-example-duplicate-name.json';

    beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_farmdata_) {
    farmdata = _farmdata_;
    dataNoName = farmdata.create("Susan's farm");
    delete dataNoName.name;


  }));

  beforeEach(function() {
    fixture.setBase('data')
  });

  beforeEach(function(){
    this.result = fixture.load(susanFarmJson);
  });

  describe('Check if my farmdata created actually correct', function(){
    it('no param should be false', inject(function() {
      expect(farmdata.isFarmData()).toBe(false);
    }));

    it('validating invalid farmData with duplicate name', inject(function() {
      expect(farmdata.isFarmData(this.result)).toBe(false);
    }));

    it('string data should be false', inject(function() {
      expect(farmdata.isFarmData('{name:"Susan farm"}')).toBe(false);
    }));

    it('no name should be false', inject(function() {
      expect(farmdata.isFarmData(dataNoName)).toBe(false);
    }));


    it('data created by create should be true', inject(function() {
      expect(farmdata.isFarmData(farmdata.create("Susan's farm"))).toBe(true);
    }));

  });

  afterEach(function() {
    fixture.cleanup()
  });

});
