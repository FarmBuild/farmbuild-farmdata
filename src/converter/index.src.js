/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

angular.module('farmbuild.farmdata')
  .factory('farmdataConverter',
  function (validations,

            $log) {
    var _isDefined = validations.isDefined,
      farmdataConverter = {};

    function createFeatureCollection(geometry) {

    }

    function convertToGeoJsonGeometry(geometry, crs) {
      geometry.crs = {"type": "name", "properties": {"name": crs}};
      return geometry;
    }

    function convertToFarmDataGeometry(geometry) {
      geometry.crs = geometry.crs.properties.name;
      return geometry;
    }
    farmdataConverter.convertToFarmDataGeometry = convertToFarmDataGeometry;

    function createFeature(geoJsonGeometry, name, id) {
      return {
        "type": "Feature",
        "geometry": angular.copy(geoJsonGeometry),
        "properties": {name:name, _id: id}
      };
    }
    farmdataConverter.createFeature = createFeature;


    function toGeoJsons(farmData) {
      $log.info("Extracting farm and paddocks geometry from farmData ...");
      var copied = angular.copy(farmData)

//      if (!validator.validate(copied)) {
//        return undefined;
//      }

      var farmGeometry = copied.geometry,
        paddocks = [];

      copied.paddocks.forEach(function (paddock) {
        paddocks.push(createFeature(convertToGeoJsonGeometry(paddock.geometry, farmGeometry.crs), paddock.name, paddock._id));
      });

      return {
        farm: {
          "type": "FeatureCollection",
          "features": [createFeature(convertToGeoJsonGeometry(farmGeometry, farmGeometry.crs), copied.name)]
        },
        paddocks: {
          "type": "FeatureCollection",
          "features": paddocks
        }
      }
    };
    farmdataConverter.toGeoJsons = toGeoJsons;

//    function toFarmData(farmData, geoJsons) {
//
//      $log.info("Converting geoJsons.farm.features[0] and paddocks geojson to farmData ...");
//      var farmFeature = geoJsons.farm.features[0];
//
//      farmData.geometry = convertToFarmDataGeometry(farmFeature.geometry);
//
//      farmData = farmdataPaddocks.merge(farmData, geoJsons)
//
//      return farmData;
//    };
//    farmdataConverter.toFarmData = toFarmData;

    return farmdataConverter;

  });