/**
 * @since 0.0.1
 * @copyright 2015 State of Victoria
 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

/**
 * farmdata class
 * @module farmdata/session
 */
angular.module('farmbuild.farmdata')
  .factory('farmdataSession',
  function ($log, $filter,
            farmdataValidator,
            farmdataConverter,
            farmdataPaddocks,
            farmdataPaddockGroups,
            farmdataPaddockTypes,
            validations) {
    var farmdataSession = {},
      isDefined = validations.isDefined
      ;

    function merge(farmData, geoJsons) {
      $log.info("Merging geoJsons.farm.features[0] and paddocks geojson to farmData ...");

      var farmFeature = geoJsons.farm.features[0],
        paddocks = geoJsons.paddocks;
      farmData.geometry = farmdataConverter.convertToFarmDataGeometry(farmFeature.geometry);


      var farmDataMerged = farmdataPaddocks.merge(farmData, geoJsons);

      if(farmDataMerged) {
        return farmdataSession.update(farmDataMerged);
      }
    };
    farmdataSession.merge = merge;

    farmdataSession.clear = function() {
      sessionStorage.clear();
      return farmdataSession;
    }

    farmdataSession.save = function(farmData) {
      $log.info('saving farmData');

      if(!farmdataValidator.validate(farmData)) {
        $log.error('Unable to save farmData... it is invalid');
        return farmdataSession;
      }
      sessionStorage.setItem('farmData', angular.toJson(farmData));

      return farmdataSession;
    }

    farmdataSession.update = function(farmData) {
      $log.info('update farmData');
      farmData.dateLastUpdated = new Date();
      farmData.paddockGroups = farmdataPaddockGroups.toArray();
      farmData.paddockTypes = farmdataPaddockTypes.toArray();
      farmdataSession.save(farmData);
      return farmdataSession;
    }

    function loadDefaults(farmdata){

      if (isDefined(farmdata.paddockGroups)) {
        farmdataPaddockGroups.load(farmdata.paddockGroups);
      }

      if (isDefined(farmdata.paddockTypes)) {
        farmdataPaddockTypes.load(farmdata.paddockTypes);
      }

    }

    farmdataSession.find = function() {
      var json = sessionStorage.getItem('farmData'), farmdata;

      if(json === null) {
        return undefined;
      }

      farmdata = angular.fromJson(json);

      loadDefaults(farmdata);

      return farmdata;
    };

    farmdataSession.load = function(farmData) {
      if(!farmdataValidator.validate(farmData)) {
        $log.error('Unable to load farmData... it is invalid');
        return undefined;
      }
      loadDefaults(farmData);
      return farmdataSession.save(farmData).find();
    };

    /**
     * Exports the farmData.json with a file name: farmdata-NAME_OF_FILE-yyyyMMddHHmmss.json
     * It creates <a> element with 'download' attribute, the data is attached to href
     * and invoke click() function so the user gets the file save dialogue or something equivalent.
     * @method export
     * @param {object} document
     * @param {object} farmData
     */
    farmdataSession.export = function(document, farmData) {
      var a = document.createElement("a"),
        name = "farmdata-" + farmData.name.replace(/\W+/g, "") + "-" + $filter("date")(new Date(), "yyyyMMddHHmmss") + ".json";
      a.id = "downloadFarmData123456";
      document.body.appendChild(a);
      angular.element(a).attr({
        download: name,
        href: "data:application/json;charset=utf8," + encodeURIComponent(JSON.stringify(farmData, undefined, 2))
      })
      a.click();
    };

    farmdataSession.isLoadFlagSet = function(location) {
      var load = false;

      if(location.href.split('?').length > 1 &&
        location.href.split('?')[1].indexOf('load') === 0){
        load = (location.href.split('?')[1].split('=')[1].indexOf('true')>-1);
      }

      return load;
    }

    farmdataSession.setLoadFlag = function(location) {
      var path = farmdataSession.clearLoadFlag(location);
      return path + '?load=true';
    }

    farmdataSession.clearLoadFlag = function(location) {
      var path = location.href.toString(),
        path = path.substring(0, path.indexOf('?'));
      return path;
    }

    return farmdataSession;

  });
