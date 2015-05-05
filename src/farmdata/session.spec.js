'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var farmDataSession, farmData;

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_farmDataSession_,_farmData_) {
    farmDataSession = _farmDataSession_;
    farmData = _farmData_;
  }));

  describe('load an existing farmData from session', function(){
    it('farmDataSession should be defined', inject(function() {
      expect(farmDataSession).toBeDefined();
    }));

    it('farmDataSession.load should return null.', inject(function() {
      sessionStorage.setItem('farmData', null);
      var data = farmDataSession.find();
      expect(data).toBe(null);
    }));
  });

  describe('save an existing farmData to session', function(){

    it('farmDataSession.load should return undefined.', inject(function() {
      var name = 'My farm',
        data = farmData.create(name);
      farmDataSession.save(data);
      var found = farmDataSession.find();
      expect(found).toBeDefined();
    }));
  });

});
