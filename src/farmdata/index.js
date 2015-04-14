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
  .factory('Farmdata', function () {
    var Farmdata = {},
      create = function(name) {
      return {
        version : 1.0,
        dateCreated : new Date(),
        dateLastUpdated : new Date(),
        name : (name?name:'My new farm'),
        geometry : {
          "type": "Polygon",
          "crs": "EPSG:4283",
          "coordinates": []
        },
        area : 0 }
      }
      ;

    /**
     * Creates a new farmdata block as Javascript object with the specified name.
     * @method create
     * @param {string} name - The name of the farm
     * @returns {Object} the farmdata
     * @public
     * @static
     */
    Farmdata.create = function(name) {
      return create(name);
    };

    window.farmbuild.farmdata = Farmdata;
    return Farmdata;

  });
