describe('farmbuild.farmdata module', function() {

  // instantiate service
  var farmdataSession, farmdata,$log,
    susanFarm = 'farmdata-susan.json';

  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console);
  }));

  beforeEach(module('farmbuild.farmdata'));

  beforeEach(inject(function (_farmdataSession_,_farmdata_, _$log_) {
    farmdataSession = _farmdataSession_;
    farmdata = _farmdata_;
    $log = _$log_;
  }));

  describe('Load flag', function(){
    it('set load flag should append ?load=true', inject(function() {
      var url = 'http://localhost:3000/static/examples/',
        location = {href:url},
        appended = {href:farmdataSession.setLoadFlag(location)}
      expect(farmdataSession.isLoadFlagSet(appended)).toBeTruthy()
    }));
    it('clear load flag should remove ?load=true', inject(function() {
      var url = 'http://localhost:3000/static/examples/?load=true',
        location = {href:url},
        cleared = {href:farmdataSession.clearLoadFlag(location)}
      $log.info('cleared: %j', cleared)
      expect(farmdataSession.isLoadFlagSet(cleared)).toBeFalsy()
    }));

  });
});
