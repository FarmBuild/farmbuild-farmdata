'use strict';

describe('farmbuild.farmdata.paddockTypes module', function() {

  // instantiate service
  var $log;
  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console)
  }));

  var farmdataPaddockTypes, annualPasture = 'Annual Pasture', newAnnualPasture = 'Annual Pasture2', collections;

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_$log_, _farmdataPaddockTypes_, _collections_) {
    $log = _$log_;
    farmdataPaddockTypes = _farmdataPaddockTypes_;
    collections = _collections_;
  }));

  describe('paddockTypes factory', function(){
    it('paddockTypes should be defined', inject(function() {
      expect(farmdataPaddockTypes).toBeDefined();
    }));
  });


  describe('types.byName', function(){
    it('byName should find ' + annualPasture, inject(function() {
      var found = farmdataPaddockTypes.byName(annualPasture);
      expect(found.name).toEqual(annualPasture);
    }));
  });

  describe('types.add', function(){
    it('add should create ' + newAnnualPasture, inject(function() {
      var
        types = farmdataPaddockTypes.add(newAnnualPasture),
        added = collections.last(types);

      expect(added.name).toEqual(newAnnualPasture);
    }));
  });

});

