/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 1.0.0
 */

'use strict';

/**
 * farmdata class
 * @module Farmdata
 */
angular.module('farmbuild.farmdata')
  .factory('farmdata', function (farmdataSession) {
    var farmdata = {session:farmdataSession},
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

    farmdata.defaultValues = function() {
      return angular.copy(defaults);
    }

    function parameterByName(search, name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    /**
     * Returns true if the location.search has ?load=true, false otherwise
     * @method create
     * @param {object} location instance
     * @returns {boolean} Returns true if the location.search has ?load=true, false otherwise
     * @public
     * @static
     */
    farmdata.isLoadFlagSet = function(location) {
      var load = false;

      if(location.href.split('?').length > 1 &&
        location.href.split('?')[1].indexOf('load') === 0){
        load = (location.href.split('?')[1].split('=')[1] === 'true');
      }

      return load;
    }

    /**
     * Evaluates the parameter if it's a farmData instance by examining the props defined.
     * farmdata instance must be:
     *
     * @method create
     * @param {object} farmData instance
     * @returns {boolean} true if it's a farmData object, false otherwise
     * @public
     * @static
     */
    farmdata.isFarmData = function(farmData) {
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
    farmdata.create = function(name) {
      return create(name);
    };

    window.farmbuild.farmdata = farmdata;
    return farmdata;

  });
