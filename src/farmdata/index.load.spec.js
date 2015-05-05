'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var farmdata, location = {};

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_farmdata_) {
    farmdata = _farmdata_;
  }));

  describe('Load from session', function(){
    it('farmdata.isLoadFlagSet should be true with ?load=true ', inject(function() {
      location.href = 'http://localhost:8000/examples/angularjs/cows-culled/index.html?load=true';
      expect(farmdata.isLoadFlagSet(location)).toBeTruthy();
    }));
    it('farmdata.isLoadFlagSet should be true with ?load=false ', inject(function() {
      location.href = 'http://localhost:8000/examples/angularjs/cows-culled/index.html?load=false';
      expect(farmdata.isLoadFlagSet(location)).toBe(false);
    }));

  });
});
