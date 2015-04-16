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
          area : 0 }
      }
      ;

    FarmData.defaultValues = function() {
      return angular.copy(defaults);
    }

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
