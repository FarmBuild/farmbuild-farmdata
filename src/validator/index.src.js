/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria

 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

/**
 * nutrientCalculator/farmdataValidator singleton
 * @private-module nutrientCalculator/farmdataValidator
 */
angular.module('farmbuild.core')
  .factory('farmdataValidator',
  function (validations, $log, geoJsonValidator, farmdataPaddockValidator) {

    var farmdataValidator =
      {
        isGeoJsons: geoJsonValidator.isGeoJsons
      },
      _isDefined = validations.isDefined,
      _isArray = validations.isArray,
      _isPositiveNumber = validations.isPositiveNumber,
      _isPositiveNumberOrZero = validations.isPositiveNumberOrZero,
      _isEmpty = validations.isEmpty,
      _isObject = validations.isObject,
      _isString = validations.isString,
      areaUnitDefault = 'hectare';

    function errorLog() {

    }
    function _validate(farmData) {
      var hasInvalidPaddock = false;
      $log.info('validating farmData...');

      if(!_isDefined(farmData)) {
        $log.error('farmData is undefined.');
        return false;
      }

      if(!_isObject(farmData)) {
        $log.error('farmData must be a javascript Object.');
        return false;
      }

      if(!farmData.hasOwnProperty('name') ||
        !_isString(farmData.name) ||
        _isEmpty(farmData.name) ||
        !_isDefined(farmData.area) ||
        !_isPositiveNumberOrZero(farmData.area) ||
        !angular.equals(farmData.areaUnit, areaUnitDefault)) {
        $log.error('farmData must have name, area (positve number or zero) and areaUnit (must be '+areaUnitDefault+'): %j', farmData);
        return false;
      }

      farmData.paddocks.forEach(function(paddock){
         if(!farmdataPaddockValidator.validate(paddock, farmData.paddocks)){
           $log.error('found invalid paddock in farmData', paddock);
           hasInvalidPaddock = true;
         };
      });

      if(!hasInvalidPaddock) {
        return geoJsonValidator.validate(farmData);
      } else {
        return false;
      }
    };


    farmdataValidator.validate = _validate;


    return farmdataValidator;
  });