'use strict';

describe('farmbuild.farmdata module', function() {

  // instantiate service
  var farmdataSession, farmdata;

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_farmdataSession_,_farmdata_) {
    farmdataSession = _farmdataSession_;
    farmdata = _farmdata_;
  }));

  describe('load an existing farmdata from session', function(){
    it('farmdataSession should be defined', inject(function() {
      expect(farmdataSession).toBeDefined();
    }));

    it('farmdataSession.find should return undefined.', inject(function() {
      sessionStorage.clear();
      var data = farmdataSession.find();
      expect(data).toBe(undefined);
    }));

    it('clear and then farmdataSession.find should return undefined.', inject(function() {
      farmdataSession.clear();
      var data = farmdataSession.find();

      expect(data).toBe(undefined);
    }));

  });

  describe('save an existing farmdata to session', function(){

    it('create, save and find should return undefined.', inject(function() {
      var name = 'My farm',
        data = farmdata.create(name);
      farmdataSession.save(data);
      var found = farmdataSession.find();
      expect(found).toBeDefined();
      expect(found.name).toBe(name);
    }));
  });

});
