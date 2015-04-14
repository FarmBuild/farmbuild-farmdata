'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var Farmdata;

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_Farmdata_) {
    Farmdata = _Farmdata_;
  }));

  describe('farmdata factory', function(){
    it('should be defined', inject(function() {
      expect(Farmdata).toBeDefined();
    }));

//    it('Calculate MilkSold nutrient by Kg', inject(function() {
//      var nutrientByKg = MilkSold.nutrientOfMilkSoldByKg(100, 10, 90);
//      expect(nutrientByKg).toBeDefined();
//    }));

  });
});
