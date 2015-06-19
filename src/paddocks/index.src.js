/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria

 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

/**
 * farmdataPaddocks class
 * @private-module farmdata/farmdataPaddocks
 */
angular.module('farmbuild.farmdata')
	.factory('farmdataPaddocks',
	function ($log,
	          collections,
	          validations,
	          farmdataPaddockValidator,
	          farmdataConverter) {
		var farmdataPaddocks =
			{},
			_isDefined = validations.isDefined;

		function createName() {
			return 'Paddock ' + (new Date()).getTime();
		}

		function generateId() {
			return (new Date()).getTime();
		}

		function createPaddockFeature(geoJsonGeometry) {
			return farmdataConverter.createFeature(geoJsonGeometry, createName());
		}

		farmdataPaddocks.createPaddockFeature = createPaddockFeature;

		function createPaddock(paddockFeature, paddocksExisting, paddocksMerged) {
			var name = paddockFeature.properties.name,
				id = paddockFeature.properties._id;
			name = _isDefined(name) ? name : createName();
			id = _isDefined(id) ? id : generateId();
			if(!farmdataPaddockValidator.validateFeature(paddockFeature, paddocksExisting) || !farmdataPaddockValidator.validateFeature(paddockFeature, paddocksMerged)){
				$log.error('creating new paddock failed, paddock data is invalid', paddockFeature);
				return;
			}
			return {
				name: name,
				_id: id,
				comment: paddockFeature.properties.comment,
				type: paddockFeature.properties.type,
				area: paddockFeature.properties.area,
				group: paddockFeature.properties.group,
				geometry: farmdataConverter.convertToFarmDataGeometry(paddockFeature.geometry),
				dateLastUpdated: new Date()
			};
		}

		farmdataPaddocks.createPaddock = createPaddock;

		function findPaddock(paddock, paddocks) {
			var found;
			if (!paddock.properties._id) {
				return;
			}
			paddocks.forEach(function (p) {
				if (paddock.properties._id === p._id) {
					found = p;
				}
			});
			return found;
		}

		farmdataPaddocks.findPaddock = findPaddock;

		function updatePaddock(paddockFeature, paddocksExisting, paddocksMerged) {
			var toUpdate = angular.copy(findPaddock(paddockFeature, paddocksExisting));
			if(!farmdataPaddockValidator.validateFeature(paddockFeature, paddocksExisting) || !farmdataPaddockValidator.validateFeature(paddockFeature, paddocksMerged)){
				$log.error('updating paddock failed, paddock data is invalid', paddockFeature);
				return;
			}
			toUpdate.name = paddockFeature.properties.name;
			toUpdate.comment = paddockFeature.properties.comment;
			toUpdate.type = paddockFeature.properties.type;
			toUpdate.area = paddockFeature.properties.area;
			toUpdate.group = paddockFeature.properties.group;
			toUpdate.geometry = farmdataConverter.convertToFarmDataGeometry(paddockFeature.geometry);
			toUpdate.dateLastUpdated = new Date();
			return toUpdate;
		}

		farmdataPaddocks.updatePaddock = updatePaddock;

		function isNew(paddockFeature) {
			return !_isDefined(paddockFeature.properties._id);
		}

		function merge(paddockFeature, paddocksExisting, paddocksMerged) {
//      farmData.paddocks[i].geometry = paddockFeature.geometry;
//      delete farmData.paddocks[i].geometry.crs;

			if (isNew(paddockFeature)) {
				return createPaddock(paddockFeature, paddocksExisting, paddocksMerged);
			}

			return updatePaddock(paddockFeature, paddocksExisting, paddocksMerged)
		}

		function createPaddockGroup(name) {
			return {
				name: name,
				paddocks: []
			}
		}

		function findPaddockGroup(name, paddockGroups) {
			var found;
			paddockGroups.forEach(function (paddockGroup) {
				if (paddockGroup.name === name) {
					found = paddockGroup;
				}
			})
			return found;
		}

		farmdataPaddocks.merge = function (farmData, geoJsons) {
			var paddockFeatures = geoJsons.paddocks,
				paddocksExisting = farmData.paddocks,
				paddocksMerged = [],
				paddockGroups = [],
				failed = false;

			paddockFeatures.features.forEach(function (paddockFeature, i) {
				var merged = merge(paddockFeature, paddocksExisting, paddocksMerged);
				if(!_isDefined(merged)){
					$log.error('merging paddocks failed, paddocks data is invalid', paddockFeature, paddocksExisting);
					failed = true;
				}
				paddocksMerged.push(merged);
				if (paddockFeature.properties.group) {
					var paddockGroup = findPaddockGroup(paddockFeature.properties.group, paddockGroups);
					if (!_isDefined(paddockGroup)) {
						paddockGroup = createPaddockGroup(paddockFeature.properties.group);
						paddockGroups.push(paddockGroup);
					}
					paddockGroup.paddocks.push(paddockFeature.properties.name);
				}
			});

			farmData.paddocks = paddocksMerged;
			farmData.paddockGroups = paddockGroups;

			if(!failed) {
				return farmData;
			}

		};

//    function _add(geoJsons, geoJsonGeometry) {
//      $log.info('farmdataPaddocks.add item ...', geoJsonGeometry);
//      geoJsons.paddocks.features.push(geoJsonGeometry);
//      return geoJsons;
//    };
//
//    farmdataPaddocks.add = _add

		return farmdataPaddocks;

	});
