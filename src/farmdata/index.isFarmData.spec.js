'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var FarmData;

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_FarmData_) {
    FarmData = _FarmData_;
  }));

  describe('Check if my farmdata created actually correct', function(){
    it('no param should be false', inject(function() {
      expect(FarmData.isFarmData()).toBe(false);
    }));

  });
});
