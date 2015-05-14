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
 * @module farmdata
 */
angular.module('farmbuild.farmdata')
  .factory('farmdata', function (farmdataSession, farmdataValidator, validations) {
    var farmdata = {session:farmdataSession, validator:farmdataValidator},
      isEmpty = validations.isEmpty,
      defaults = {
        id:'' + (new Date()).getTime(),
        name:'My new farm',
        geometry:{type: 'Polygon',crs:'EPSG:4283',coordinates:[]}
      },
      create = function(name, id) {
        return {
          version : 1.0,
          dateCreated : new Date(),
          dateLastUpdated : new Date(),
          id:(isEmpty(id)?defaults.id:id),
          name : (isEmpty(name)?defaults.name:name),
          geometry : angular.copy(defaults.geometry),
          area : 0,
          areaUnit:'hectare'
        }
      }
    ;

    farmdata.defaultValues = function() {
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
    farmdata.isFarmData = function(farmData) {
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
    farmdata.validate = function(farmData) {
      return farmdataValidator.validate(farmData);
    }

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
     * Save the specified farmData into session
     * @method load
     * @param {Object} farmData - The farmData
     * @returns {Object} the farmData
     * @public
     * @static
     */
    farmdata.save = function(farmData) {
      return farmdataSession.save(farmData).find();
    }

    window.farmbuild.farmdata = farmdata;

    return farmdata;

  });
