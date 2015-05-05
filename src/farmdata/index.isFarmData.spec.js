'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var farmData, dataNoName;

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_farmData_) {
    farmData = _farmData_;

    dataNoName = farmData.create("Susan's farm");
    delete dataNoName.name;


  }));

  describe('Check if my farmdata created actually correct', function(){
    it('no param should be false', inject(function() {
      expect(farmData.isFarmData()).toBe(false);
    }));

    it('string data should be false', inject(function() {
      expect(farmData.isFarmData('{name:"Susan farm"}')).toBe(false);
    }));

    it('no name should be false', inject(function() {
      expect(farmData.isFarmData(dataNoName)).toBe(false);
    }));


    it('data created by create should be true', inject(function() {
      expect(farmData.isFarmData(farmData.create("Susan's farm"))).toBe(true);
    }));

  });
});
