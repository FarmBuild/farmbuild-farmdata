/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 1.0.0
 */

'use strict';

/**
 * farmdataSession class
 * @module Farmdata
 */
angular.module('farmbuild.farmdata')
  .factory('farmdataSession', function ($log, farmdataValidator, validations) {
    var farmdataSession = {},
      isDefined = validations.isDefined
      ;


    /**
     * Clear the farmData in the session
     * @method clear
     * @returns {Object} farmdataSession
     * @public
     * @static
     */
    farmdataSession.clear = function() {
      sessionStorage.clear();
      return farmdataSession;
    }

    /**
     * Saves the farmData into the sessionStorage
     * @method save
     * @returns {Object} farmdataSession
     * @public
     * @static
     */
    farmdataSession.save = function(farmData) {
      $log.info('saving farmData');

      if(!farmdataValidator.validate(farmData)) {
        $log.error('Unable to save farmData... it is invalid');
        return farmdataSession;
      }

      sessionStorage.setItem('farmData', angular.toJson(farmData));

      return farmdataSession;
    }


    /**
     * Returns a farmData as an object from sessionStorage
     * @method find
     * @returns {Object} the farmdata, undefined, if not found.
     * @public
     * @static
     */
    farmdataSession.find = function() {
      var json = sessionStorage.getItem('farmData');

      if(json === null) {
        return undefined;
      }

      return angular.fromJson(json);
    };

    /**
     * Load the specified farmData into session.
     * @method load
     * @returns {Object} the farmdata loaded in the session, undefined if it's invalid.
     * @public
     * @static
     */
    farmdataSession.load = function(farmData) {
      if(!farmdataValidator.validate(farmData)) {
        $log.error('Unable to load farmData... it is invalid');
      }

      return farmdataSession.save(farmData).find();
    };

    return farmdataSession;

  });
