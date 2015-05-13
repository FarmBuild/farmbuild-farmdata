'use strict';

angular.module('farmbuild.farmdata', ['farmbuild.core']);

window.farmbuild.farmdata = {};
//window.farmbuild = {
//  farmdata: {}
//};

// Init api by instantiating angular module internally, users are not tied to angular for using farmbuild.
angular.injector(['ng', 'farmbuild.farmdata']);