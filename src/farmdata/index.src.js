/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 1.0.0
 */

'use strict';

/**
 * Farmdata class
 * @module Farmdata
 */
angular.module('farmbuild.farmdata')
  .factory('FarmData', function () {
    var FarmData = {},
      defaults = {name:'My new farm',
        geometry:{type: 'Polygon',crs:'EPSG:4283',coordinates:[]}
      },
      create = function(name) {
        return {
          version : 1.0,
          dateCreated : new Date(),
          dateLastUpdated : new Date(),
          name : (name?name:defaults.name),
          geometry : angular.copy(defaults.geometry),
          area : 0
        }
      }
    ;

    FarmData.defaultValues = function() {
      return angular.copy(defaults);
    }

    /**
     * Evaluates the parameter if it's a farmData instance by examining the props defined.
     * FarmData instance must be:
     *
     * @method create
     * @param {object} farmData instance
     * @returns {boolean} true if it's a farmdata object, false otherwise
     * @public
     * @static
     */
    FarmData.isFarmData = function(farmData) {
      if(!angular.isDefined(farmData)) {
        return false;
      }

      if(!angular.isObject(farmData)) {
        return false;
      }

      if(!farmData.hasOwnProperty('name')) {
        return false;
      }

      return true;
    };

    /**
     * Creates a new farmdata block as Javascript object with the specified name.
     * @method create
     * @param {string} name - The name of the farm
     * @returns {Object} the farmdata
     * @public
     * @static
     */
    FarmData.create = function(name) {
      return create(name);
    };

    window.farmbuild.farmdata = FarmData;
    return FarmData;

  });
