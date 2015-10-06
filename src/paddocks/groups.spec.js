'use strict';

describe('farmbuild.farmdata.paddockGroups module', function() {

  // instantiate service
  var $log;
  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console)
  }));

  var farmdataPaddockGroups, futureCrop = 'FC - Future Crop', newFutureCrop = 'FC - Future Crop2', collections;

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_$log_, _farmdataPaddockGroups_, _collections_) {
    $log = _$log_;
    farmdataPaddockGroups = _farmdataPaddockGroups_;
    collections = _collections_;
  }));

  describe('paddockTypes factory', function(){
    it('paddockTypes should be defined', inject(function() {
      expect(farmdataPaddockGroups).toBeDefined();
    }));
  });


  describe('types.byName', function(){
    it('byName should find ' + futureCrop, inject(function() {
      var found = farmdataPaddockGroups.byName(futureCrop);
      expect(found.name).toEqual(futureCrop);
    }));
  });

  describe('types.add', function(){
    it('add should create ' + newFutureCrop, inject(function() {
      var
        types = farmdataPaddockGroups.add(newFutureCrop),
        added = collections.last(types);

      expect(added.name).toEqual(newFutureCrop);
    }));
  });

});

