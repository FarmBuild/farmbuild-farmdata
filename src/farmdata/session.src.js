/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 1.0.0
 */

'use strict';

/**
 * farmDataSession class
 * @module Farmdata
 */
angular.module('farmbuild.farmdata')
  .factory('farmDataSession', function ($log, validations) {
    var farmDataSession = {},
      isDefined = validations.isDefined
      ;
    /**
     * Saves the farmData into the sessionStorage
     * @method create
     * @returns {Object} farmDataSession
     * @public
     * @static
     */
    farmDataSession.save = function(farmData) {
      $log.info('saving farmData');

      if(!isDefined(farmData)) {
        $log.error('Unable to save farmData... it is undefined');
        return farmDataSession;
      }

      sessionStorage.setItem('farmData', angular.toJson(farmData));
      return farmDataSession;
    }


    /**
     * Returns a farmData as an object from sessionStorage
     * @method create
     * @returns {Object} the farmdata, null, if not found.
     * @public
     * @static
     */
    farmDataSession.find = function() {
      return angular.fromJson(sessionStorage.getItem('farmData'));
    };


    return farmDataSession;

  });
