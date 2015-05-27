describe('farmbuild.farmdata module', function() {
  // instantiate log
  var $log, farmdataPaddockValidator;
  var name = 'New Type 1';


  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console)
  }));

  beforeEach(inject(function (_$log_, _farmdataPaddockValidator_) {
    $log = _$log_;
    farmdataPaddockValidator = _farmdataPaddockValidator_;
  }))

  describe('farmdataPaddockValidator.validate should validate name, geometry, dateLastUpdated', function() {
    it('empty paddock must be invalid ', inject(function() {
      var paddock = {};
      expect(farmdataPaddockValidator.validate(paddock)).toBeFalsy()
    }))



  })

  afterEach(function() {
    fixture.cleanup()
  });
});
