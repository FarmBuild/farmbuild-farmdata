//http://www.biology-online.org/dictionary/Nutrient_medium
/**
 * nutrientMedium
 * @since 0.0.1
 * @copyright 2015 State of Victoria

 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

/**
 * farmdata/geoJsonValidator singleton
 * @private-module farmdata/geoJsonValidator
 */
angular.module('farmbuild.farmdata')
  .factory('geoJsonValidator',
  function (validations,
            $log) {
    var geoJsonValidator = {geojsonhint:geojsonhint},
      _isDefined = validations.isDefined,
      _isArray = validations.isArray,
      _isPositiveNumber = validations.isPositiveNumber,
      _isEmpty = validations.isEmpty;

    if(!_isDefined(geojsonhint)) {
      throw Error('geojsonhint must be available!')
    }

    function isGeoJsons(geoJsons) {
      var errors =  geojsonhint.hint((typeof geoJsons === 'string'?geoJsons:angular.toJson(geoJsons))),
        isGeoJson = errors.length === 0;
      if(!isGeoJson) {
        $log.error('isGeoJsons errors: ', errors)
      }
      return isGeoJson;
    }

    geoJsonValidator.isGeoJsons = isGeoJsons;

    function _validate(farmData) {
      $log.info('validating farmData...', farmData);

      if (!_isDefined(farmData) ||
        !_isDefined(farmData.geometry) ||
        !_isDefined(farmData.geometry.crs) ||
        !_isDefined(farmData.paddocks)) {
        $log.error('farmData must have geometry, geometry.crs, paddocks');
        return false;
      }

      return true;
    };

    geoJsonValidator.validate = _validate;

    return geoJsonValidator;
  });