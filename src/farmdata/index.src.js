/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria
 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

/**
 * farmdata class
 * @module farmdata
 */
angular.module('farmbuild.farmdata')
	.factory('farmdata',
	function ($log,
	          farmdataSession, farmdataValidator, farmdataPaddockGroups, farmdataPaddockTypes,
	          crsSupported, validations) {
		var farmdata =
			{
				session: farmdataSession,
				validator: farmdataValidator,
				crsSupported: crsSupported
			},
			isEmpty = validations.isEmpty,
			isDefined = validations.isDefined,
			defaults = {
				id: '' + (new Date()).getTime(),
				name: 'My new farm',
				geometry: {type: 'Polygon', crs: crsSupported[0].name, coordinates: []}
			},
			geometry = function (projectionName) {
				var g = angular.copy(defaults.geometry);
				g.crs = (!isEmpty(projectionName) ? projectionName : g.crs);
				return g;
			},
			populateOption = function (option, service) {
				if (!isDefined(option) || !isDefined(service)) {
					return;
				}
				service.load(option);
			},
			populateOptions = function (options) {
				if (!isDefined(options)) {
					return;
				}
				populateOption(options.paddockGroups, farmdataPaddockGroups);
				populateOption(options.paddockTypes, farmdataPaddockTypes);
			},
			create = function (name, id, projectionName, options) {

				populateOptions(options);

				return {
					version: 1.0,
					dateCreated: new Date(),
					dateLastUpdated: new Date(),
					id: (isEmpty(id) ? defaults.id : id),
					name: (isEmpty(name) ? defaults.name : name),
					geometry: geometry(projectionName),
					paddocks: [],
					paddockGroups: farmdataPaddockGroups.toArray(),
					paddockTypes: farmdataPaddockTypes.toArray(),
					area: 0,
					areaUnit: 'hectare'
				}
			}
			;

		farmdata.defaultValues = function () {
			return angular.copy(defaults);
		}

//    function parameterByName(search, name) {
//      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//        results = regex.exec(location.search);
//      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
//    }

		/**
		 * Evaluates the parameter if it's a farmData instance by examining the props defined.
		 * farmdata instance must be:
		 * @method isFarmData
		 * @param {object} farmData instance
		 * @returns {boolean} true if it's a farmData object, false otherwise
		 * @public
		 * @static
		 */
		farmdata.isFarmData = function (farmData) {
			return farmdataValidator.validate(farmData);
		};

		/**
		 * Evaluates the parameter if it's a farmData instance by examining the props defined.
		 * farmdata instance must be:
		 * @method validate
		 * @param {object} farmData instance
		 * @returns {boolean} true if it's a farmData object, false otherwise
		 * @public
		 * @static
		 */
		farmdata.validate = function (farmData) {
			return farmdataValidator.validate(farmData);
		}

		/**
		 * Creates a new farmdata block as Javascript object with the specified name.
		 * @method create
		 * @param {string} id - The ID of this farm in case if you manage this farm in an external system, so you can map the farmData
		 * with the external system
		 * @param {!string} name - The name of the farm
		 * @param {!string} projectionName - The projection name
		 * @param {!Object} options - an object that describes configuration for different sections. Currently you can specify and array for paddockGroups and paddockTypes
		 * @returns {Object} the farmdata object, undefined if the required fields are not provided
		 * @public
		 * @static
		 */
		farmdata.create = create;

		/**
		 * Load the specified farmData into session
		 * @method load
		 * @param {Object} farmData - The farmData
		 * @returns {Object} the farmData
		 * @public
		 * @static
		 */
		farmdata.load = farmdataSession.load;

		/**
		 * Loads the farmData from session
		 * @method find
		 * @param {Object} farmData - The farmData
		 * @returns {Object} the farmData
		 * @public
		 * @static
		 */
		farmdata.find = farmdataSession.find;

		/**
		 * Save the specified farmData into session
		 * @method save
		 * @param {Object} farmData - The farmData
		 * @returns {Object} the farmData
		 * @public
		 * @static
		 */
		farmdata.save = function (farmData) {
			return farmdataSession.save(farmData).find();
		}

		/**
		 * Save the specified farmData into session
		 * @method update
		 * @param {Object} farmData - The updated farmData
		 * @returns {Object} the farmData
		 * @public
		 * @static
		 */
		farmdata.update = function (farmData) {
			return farmdataSession.update(farmData).find();
		}

		/**
		 * Merges the geoJsons into the farmData
		 * @method merge
		 * @param {Object} farmData - The updated farmData
		 * @param {Object} geoJsons - The updated farmData
		 * @returns {Object} the farmData
		 * @public
		 * @static
		 */
		farmdata.merge = function (farmData, geoJsons) {
			var merged = farmdataSession.merge(farmData, geoJsons);
			if (merged) {
				return merged.find();
			} else {
				return farmData;
			}
		}

		/**
		 * Paddock groups collection api
		 * @property {object} Groups - Paddock groups collection
		 * @public
		 * @static
		 */
		farmdata.paddockGroups = farmdataPaddockGroups;

		/**
		 * Paddock types collection api
		 * @property {object} Types - Paddock types collection
		 * @public
		 * @static
		 */
		farmdata.paddockTypes = farmdataPaddockTypes;

		window.farmbuild.farmdata = farmdata;

		return farmdata;

	});
