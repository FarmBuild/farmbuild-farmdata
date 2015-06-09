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
				"properties": {name: name, _id: id}
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


		function toGeoJson(farmData) {
			$log.info("Extracting farm and paddocks geometry from farmData ...");
			var copied = angular.copy(farmData)

//      if (!validator.validate(copied)) {
//        return undefined;
//      }

			var farmGeometry = copied.geometry,
				features = [];
			features.push(createFeature(convertToGeoJsonGeometry(farmGeometry, farmGeometry.crs), copied.name, copied.id));
			copied.paddocks.forEach(function (paddock) {
				features.push(createFeature(convertToGeoJsonGeometry(paddock.geometry, farmGeometry.crs), paddock.name, paddock._id));
			});

			return {
				"type": "FeatureCollection",
				"features": features
			}
		};
		farmdataConverter.toGeoJson = toGeoJson;

		function exportGeoJson(document, farmData) {
			var a = document.createElement("a"),
				name = "farmdata-" + farmData.name.replace(/\W+/g, "") + "-" + $filter("date")(new Date(), "yyyyMMddHHmmss") + ".json";
			a.id = "downloadFarmData123456";
			document.body.appendChild(a);
			angular.element(a).attr({
				download: name,
				href: "data:application/json;charset=utf8," + encodeURIComponent(JSON.stringify(toGeoJson(farmData), undefined, 2))
			})
			a.click();
		};
		farmdataConverter.exportGeoJson = exportGeoJson;

		function toKml(farmData) {
			$log.info("Extracting farm and paddocks geometry from farmData ...");
			var copied = angular.copy(farmData)

//      if (!validator.validate(copied)) {
//        return undefined;
//      }

			var farmGeometry = copied.geometry,
				features = [];

			features.push(createFeature(convertToGeoJsonGeometry(farmGeometry, farmGeometry.crs), copied.name, copied.id));
			copied.paddocks.forEach(function (paddock) {
				features.push(createFeature(convertToGeoJsonGeometry(paddock.geometry, farmGeometry.crs), paddock.name, paddock._id));
			});

			return tokml(JSON.parse(JSON.stringify(
				{
					"type": "FeatureCollection",
					"features": features
				}
			)));
		};
		farmdataConverter.toKml = toKml;

		function exportKml(document, farmData) {
			var a = document.createElement("a"),
				name = "farmdata-" + farmData.name.replace(/\W+/g, "") + "-" + $filter("date")(new Date(), "yyyyMMddHHmmss") + ".kml";
			a.id = "downloadFarmData123456";
			document.body.appendChild(a);
			angular.element(a).attr({
				download: name,
				href: "data:application/vnd.google-earth.kml+xml;charset=utf8," + toKml(farmData)
			})
			a.click();
		};
		farmdataConverter.exportKml = exportKml;

		function toFarmData(farmData, geoJsons) {

			$log.info("Converting geoJsons.farm.features[0] and paddocks geojson to farmData ...");
			var farmFeature = geoJsons.farm.features[0];

			farmData.geometry = convertToFarmDataGeometry(farmFeature.geometry);

			farmData = farmdataPaddocks.merge(farmData, geoJsons)

			return farmData;
		};
		farmdataConverter.toFarmData = toFarmData;

		return farmdataConverter;

	});
