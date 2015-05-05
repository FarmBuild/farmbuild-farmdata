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
  .factory('farmdataSession', function ($log, validations) {
    var farmdataSession = {},
      isDefined = validations.isDefined
      ;
    /**
     * Saves the farmData into the sessionStorage
     * @method create
     * @returns {Object} farmdataSession
     * @public
     * @static
     */
    farmdataSession.save = function(farmData) {
      $log.info('saving farmData');

      if(!isDefined(farmData)) {
        $log.error('Unable to save farmData... it is undefined');
        return farmdataSession;
      }

      sessionStorage.setItem('farmData', angular.toJson(farmData));
      return farmdataSession;
    }


    /**
     * Returns a farmData as an object from sessionStorage
     * @method create
     * @returns {Object} the farmdata, null, if not found.
     * @public
     * @static
     */
    farmdataSession.find = function() {
      return angular.fromJson(sessionStorage.getItem('farmData'));
    };


    return farmdataSession;

  });
