//http://www.biology-online.org/dictionary/Nutrient_medium
/**
 * nutrientMedium
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/farmdataPaddockValidator singleton
 * @private-module nutrientCalculator/farmdataPaddockValidator
 */
angular.module('farmbuild.farmdata')
  .factory('farmdataPaddockValidator',
  function (validations,
            $log) {
    var farmdataPaddockValidator = {},
      _isDefined = validations.isDefined,
      _isArray = validations.isArray,
      _isPositiveNumber = validations.isPositiveNumber,
      _isEmpty = validations.isEmpty;

    function _validate(paddock) {
      $log.info('validating paddock...', paddock);

      if (!_isDefined(paddock) ||
        !_isDefined(paddock.name) ||
        !_isDefined(paddock.geometry)) {
        $log.error('invalid, must have type (must pass type validate), weight (positive number) and isDry (boolean): %j', paddock);
        return false;
      }

      return true;
    };

    farmdataPaddockValidator.validate = _validate;

    farmdataPaddockValidator.validateAll = function(items) {
      if(!_isArray(items) || _isEmpty(items)) {
        return false;
      }

      var i = 0;
      for (i; i < items.length; i++) {
        var item = items[i];

        if (!_validate(item)) {
          $log.error('validator invalid at %s: %j', i, item);
          return false;
        }
      }
      return true;
    }


    return farmdataPaddockValidator;
  });