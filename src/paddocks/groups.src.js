/**
 * @since 1.1.0
 * @copyright 2015 State of Victoria.

 * @author State of Victoria
 * @version 1.1.0
 */

'use strict';

/**
 * farmdata class
 * @module farmdata/paddockGroups
 */
angular.module('farmbuild.farmdata')
  .factory('farmdataPaddockGroups',
  function ($log, collections, validations, paddockGroupDefaults) {

    var paddockGroups,
      _groups = angular.copy(paddockGroupDefaults.groups),
      _isDefined = validations.isDefined, _isString = validations.isString;

    function _create(name){
      return {
        name: name,
        paddocks: []
      }
    }

    function _add(name) {
      if(!_isDefined(name) || !_isString(name)){
        $log.error('Please specify a valid name for paddock group', _isString(name));
        return;
      }

      if(_isDefined(paddockGroups.byName(name))){
        $log.error('There is a paddock group with the same name, please use another name');
        return;
      }

      return collections.add(_groups, _create(name));
    }

    function _validateGroups(paddockGroups){
      var isValid = true;
      angular.forEach(paddockGroups, function(paddockGroup){
        if(!_isDefined(paddockGroup) ||!_isDefined(paddockGroup.name) || !_isAlphanumeric(paddockGroup.name) || !_isArray(paddockGroup.paddocks)){
          isValid = false;
        }
      });
      return isValid;
    }

    paddockGroups = {
      /**
       * Adds a new Paddock group for nutrient calculation
       * @method add
       * @param {!string} name - name of new group, can only contain alphanumeric values with space, underscore or dash but no other special characters
       * @returns {object} groups
       * @public
       * @static
       */
      add: _add,
      /**
       * Returns the PaddockGroup at specified index
       * @method at
       * @returns {object} PaddockGroup
       * @public
       * @static
       */
      at: function(index) { return collections.at(_groups, index)},
      size: function() { return collections.size(_groups)},
      byName: function(name) { return collections.byProperty(_groups, 'name', name)},
      defaultTypes: function() { return angular.copy(paddockTypeDefaults.groups)},
      /**
       * Returns PaddockGroups collection as an array
       * @method toArray
       * @returns {Array} PaddockGroups
       * @public
       * @static
       */
      toArray: function() { return angular.copy(_groups) },
      /**
       * Removes the Paddock group at specified index
       * @method removeAt
       * @returns {object} PaddockGroups collection
       * @public
       * @static
       */
      removeAt: function(index) { return collections.removeAt(_groups, index)},
      last: function() { return collections.last(_groups) },
      /**
       * Loads the groups in PaddockGroups
       * @method load
       * @param PaddockGroups
       * @returns {object} fertilizersPurchased
       * @public
       * @static
       */
      load: function(PaddockGroups) {
        if(!_validateGroups()){
          $log.error('There is a problem in custom paddock group passed, please check if all paddock groups have a valid name and an array of paddocks');
          return;
        }
        _groups = PaddockGroups;
      }
    };

    return paddockGroups;
  });