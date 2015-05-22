/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/farmdataValidator singleton
 * @private-module nutrientCalculator/farmdataValidator
 */
angular.module('farmbuild.core')
  .factory('farmdataValidator',
  function (validations, $log) {

    var farmdataValidator = {},
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

      return true;
    };

    farmdataValidator.validate = _validate;


    return farmdataValidator;
  });