'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var crsSupported, farmdata;

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_crsSupported_,_farmdata_) {
    crsSupported = _crsSupported_;
    farmdata = _farmdata_;
  }));

  describe('crsSupported label should be concatenated', function(){
    it('crsSupported should be defined', inject(function() {
      expect(crsSupported[0].label).toBe('GDA 94 Geographics: EPSG:4283');
    }));


  });

});
