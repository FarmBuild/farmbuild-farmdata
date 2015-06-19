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
			_isEmpty = validations.isEmpty;

		function _validateFeature(paddock, paddocksExisting) {
			$log.info('validating paddock...', paddock);

			if (!_isDefined(paddock) || !_isDefined(paddock.properties) || !_isDefined(paddock.properties.name) || !_isDefined(paddock.geometry)) {
				$log.error('invalid paddock, must have name and geometry: %j', paddock);
				return false;
			}

			if (!checkName(paddock.properties.name, paddock.properties._id, paddocksExisting)) {
				return false;
			}

			return true;
		};

		function _validate(paddock, paddocksExisting) {
			$log.info('validating paddock...', paddock);

			if (!_isDefined(paddock) || !_isDefined(paddock.name) || !_isDefined(paddock.geometry)) {
				$log.error('invalid paddock, must have name and geometry: %j', paddock);
				return false;
			}

			if (!checkName(paddock.name, paddock._id, paddocksExisting)) {
				return false;
			}

			return true;
		};

		function checkName(name, id, paddocksExisting) {
			$log.info('checking paddock for duplicate name...', name);
			var result = true;
			paddocksExisting.forEach(function (paddockExisting) {
				if (name === paddockExisting.name && id !== paddockExisting._id) {
					$log.error('invalid paddock, name already exist: %s, %s, %j', name, id, paddockExisting);
					result = false;
				}
			});
			return result;
		}

		farmdataPaddockValidator.validateFeature = _validateFeature;
		farmdataPaddockValidator.validate = _validate;

		farmdataPaddockValidator.validateAll = function (items) {
			if (!_isArray(items) || _isEmpty(items)) {
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