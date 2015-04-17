'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var FarmData, dataNoName;

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_FarmData_) {
    FarmData = _FarmData_;

    dataNoName = FarmData.create("Susan's farm");
    delete dataNoName.name;


  }));

  describe('Check if my farmdata created actually correct', function(){
    it('no param should be false', inject(function() {
      expect(FarmData.isFarmData()).toBe(false);
    }));

    it('string data should be false', inject(function() {
      expect(FarmData.isFarmData('{name:"Susan farm"}')).toBe(false);
    }));

    it('no name should be false', inject(function() {
      expect(FarmData.isFarmData(dataNoName)).toBe(false);
    }));


    it('data created by create should be true', inject(function() {
      expect(FarmData.isFarmData(FarmData.create("Susan's farm"))).toBe(true);
    }));

  });
});
