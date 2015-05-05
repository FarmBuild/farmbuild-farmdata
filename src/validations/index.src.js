angular.module('farmbuild.farmdata')
  .factory('validations',
  function ($log) {

    var validations = {};

    validations.isPositiveNumberOrZero = function(value) {
      return !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) >= 0;
    };

    validations.isPositiveNumber = function(value) {
      return validations.isPositiveNumberOrZero(value) && parseFloat(value) > 0;
    };

    validations.isAlphabet =  function(value){
      var regex = /^[A-Za-z]+$/ig;
      return regex.test(value);
    };

    validations.isAlphanumeric =  function(value){
      var regex = /^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9 _]*$/ig;
      return regex.test(value);
    };

    var isEmpty = function (data) {
      if (typeof(data) == 'number' || typeof(data) == 'boolean') {
        return false;
      }
      if (typeof(data) == 'undefined' || data === null) {
        return true;
      }
      if (typeof(data.length) != 'undefined') {
        return data.length == 0;
      }
      return false;
    };

    validations.isEmpty = isEmpty;

    validations.isDefined =  angular.isDefined;
    validations.isArray =  angular.isArray;
    validations.equals = angular.equals;

    return validations;

  }
);
