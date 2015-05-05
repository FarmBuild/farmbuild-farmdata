'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var FarmData, location = {};

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_FarmData_) {
    FarmData = _FarmData_;
  }));

  describe('Load from session', function(){
    it('FarmData.isLoadFlagSet should be true with ?load=true ', inject(function() {
      location.href = 'http://localhost:8000/examples/angularjs/cows-culled/index.html?load=true';
      expect(FarmData.isLoadFlagSet(location)).toBeTruthy();
    }));
    it('FarmData.isLoadFlagSet should be true with ?load=false ', inject(function() {
      location.href = 'http://localhost:8000/examples/angularjs/cows-culled/index.html?load=false';
      expect(FarmData.isLoadFlagSet(location)).toBe(false);
    }));

  });
});
