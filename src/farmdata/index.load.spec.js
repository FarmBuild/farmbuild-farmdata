'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var farmData, location = {};

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_farmData_) {
    farmData = _farmData_;
  }));

  describe('Load from session', function(){
    it('farmData.isLoadFlagSet should be true with ?load=true ', inject(function() {
      location.href = 'http://localhost:8000/examples/angularjs/cows-culled/index.html?load=true';
      expect(farmData.isLoadFlagSet(location)).toBeTruthy();
    }));
    it('farmData.isLoadFlagSet should be true with ?load=false ', inject(function() {
      location.href = 'http://localhost:8000/examples/angularjs/cows-culled/index.html?load=false';
      expect(farmData.isLoadFlagSet(location)).toBe(false);
    }));

  });
});
