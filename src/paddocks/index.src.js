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
            validations) {
    var farmdataPaddocks =
      {
      },
      isEmpty = validations.isEmpty
      ;

    function _create(name, gemotry) {
      return {name: name, gemotry:gemotry, dateLastUpdated:new Date()};
    }
    farmdataPaddocks.create = _create;

    function _add(feature) {


      var item = _create(type, weight, isDry);

      $log.info('farmdataPaddocks.add item ...', item);

      if (!validator.validate(item)) {
        $log.error('farmdataPaddocks.add unable to add as the validation has been failed, %j', item);
        return undefined;
      }

      return collections.add(items, item);
    };

    farmdataPaddocks.add = _add;
    
    
    return farmdataPaddocks;

  });
