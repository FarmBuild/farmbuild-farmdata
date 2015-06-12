/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 1.0.0
 */

'use strict';

/**
 * farmdataPaddocks class
 * @module farmdataPaddocks
 */
angular.module('farmbuild.farmdata')
	.factory('farmdataPaddocks',
	function ($log,
	          collections,
	          validations,
	          farmdataConverter) {
		var farmdataPaddocks =
			{},
			isEmpty = validations.isEmpty,
			isDefined = validations.isDefined
			;

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

		function createPaddock(paddockFeature) {
			var name = paddockFeature.properties.name,
				id = paddockFeature.properties._id;
			name = isDefined(name) ? name : createName();
			id = isDefined(id) ? id : generateId();
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

		function updatePaddock(paddockFeature, paddocksExisting) {
			var toUpdate = angular.copy(findPaddock(paddockFeature, paddocksExisting));
			toUpdate.name = paddockFeature.properties.name;
			toUpdate.comment = paddockFeature.properties.comment;
			toUpdate.type = paddockFeature.properties.type;
			toUpdate.area = paddockFeature.properties.area;
			toUpdate.group = paddockFeature.properties.group;
			toUpdate.geometry = paddockFeature.geometry;
			toUpdate.dateLastUpdated = new Date();
			return toUpdate;
		}

		farmdataPaddocks.updatePaddock = updatePaddock;

		function isNew(paddockFeature) {
			return !isDefined(paddockFeature.properties._id);
		}

		function merge(paddockFeature, paddocksExisting) {
//      farmData.paddocks[i].geometry = paddockFeature.geometry;
//      delete farmData.paddocks[i].geometry.crs;

			if (isNew(paddockFeature)) {
				return createPaddock(paddockFeature);
			}

			return updatePaddock(paddockFeature, paddocksExisting)
		}

		function createPaddcokGroup(name) {
			return {
				name: name,
				paddocks: []
			}
		}

		function findPaddcokGroup(name, paddockGroups) {
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
				paddockGroups = [];

			paddockFeatures.features.forEach(function (paddockFeature, i) {
				paddocksMerged.push(merge(paddockFeature, paddocksExisting));
				if (paddockFeature.properties.group) {
					var paddockGroup = findPaddcokGroup(paddockFeature.properties.group, paddockGroups);
					if (!isDefined(paddockGroup)) {
						paddockGroup = createPaddcokGroup(paddockFeature.properties.group);
						paddockGroups.push(paddockGroup);
					}
					paddockGroup.paddocks.push(paddockFeature.properties.name);
				}
			});

			farmData.paddocks = paddocksMerged;
			farmData.paddockGroups = paddockGroups;

			return farmData;

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
