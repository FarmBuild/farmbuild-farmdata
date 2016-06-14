describe('farmbuild.farmdata module', function () {
	// instantiate log
	var $log, farmdataPaddocks, farmdata, farmdataConverter, paddockGroupDefaults,
		susanFarm = {
			"version": 1.0,
			"dateCreated": "2015-03-30T21:19:00",
			"dateLastUpdated": "2015-03-30T21:19:06",
			"id": "1432602446885",
			"name": "Susan's Farm",
			"area": 89.95,
			"areaUnit": "hectare",
			"geometry": {
				"type": "Polygon",
				"crs": "EPSG:4283",
				"coordinates": [
					[
						[
							145.57368096419663,
							-36.224879531701255
						],
						[
							145.5826132801325,
							-36.22488327137526
						],
						[
							145.58260951039628,
							-36.22801228957186
						],
						[
							145.57363088613704,
							-36.22803939355771
						],
						[
							145.57368096419663,
							-36.224879531701255
						]
					]
				]
			},
			"paddocks": [
				{
					"name": "DAMS",
					_id: 22,
					"geometry": {
						"type": "Polygon",
						"coordinates": [
							[
								[
									145.5826132801325,
									-36.22488327137529
								],
								[
									145.5820357180293,
									-36.224883050102875
								],
								[
									145.58218018756546,
									-36.22550501283936
								],
								[
									145.58217462979982,
									-36.225743502180904
								],
								[
									145.5820524307267,
									-36.22607136242196
								],
								[
									145.5826118583508,
									-36.2260634316565
								],
								[
									145.5826118583508,
									-36.2260634316565
								],
								[
									145.5826132801325,
									-36.22488327137529
								]
							]
						]
					}
				}]
		};
	var crs = 'EPSG:4283';


	beforeEach(module('farmbuild.farmdata', function ($provide) {
		$provide.value('$log', console)
	}));

	beforeEach(function () {
		fixture.setBase('data')
	})

	beforeEach(inject(function (_$log_, _farmdataPaddocks_, _farmdata_, _farmdataConverter_, _paddockGroupDefaults_) {
		$log = _$log_;
		farmdataPaddocks = _farmdataPaddocks_;
		farmdata = _farmdata_;
		farmdataConverter = _farmdataConverter_;
		paddockGroupDefaults = _paddockGroupDefaults_;
	}))

	function createGeometry(coordinates) {
		coordinates = (angular.isDefined(coordinates)&&angular.isArray(coordinates)?coordinates:[[[16205687.520831015, -4331788.270308661],
			[16205603.152080152, -4331789.188156667],
			[16205599.164149445, -4331941.003031067],
			[16205687.01904266, -4331942.85666477],
			[16205686.7631797, -4331933.887643515],
			[16205687.520831015, -4331788.270308661]]]);
		return {
			"type": "Polygon",
			"crs": {
				"type": "name",
				"properties": {
					"name": "EPSG:4283"
				}
			},
			"coordinates": coordinates
		};
	}

	function _add(geoJsons, geoJsonGeometry) {
		$log.info('farmdataPaddocks.add item ...', geoJsonGeometry);
		geoJsons.paddocks.features.push(geoJsonGeometry);
		return geoJsons;
	};

	describe('farmdataPaddocks.merge should merge the geoJson into the farmData', function () {
		it('adding a new paddock', inject(function () {
			var farmDataNew = farmdata.create();

			var	geoJsonsNew = farmdataConverter.toGeoJsons(farmDataNew);

			expect(geoJsonsNew.paddocks).toBeDefined();
			expect(geoJsonsNew.paddocks.features).toBeDefined();
			expect(geoJsonsNew.paddocks.features.length).toBe(0);

			//Creating 2 paddocks containing a different polygon and names
			var paddockFeatureNew = farmdataPaddocks.createPaddockFeature(createGeometry());
			paddockFeatureNew.properties.group = paddockGroupDefaults.groups[1];
			var paddockFeatureName = paddockFeatureNew.properties.name;
			var paddockFeatureNew2 = farmdataPaddocks.createPaddockFeature(createGeometry([
				[
					[16205856.306951968, -4331933.674996614],
					[16205755.568683043, -4331934.290393877],
					[16205686.7631797, -4331933.887643515],
					[16205689.872803545, -4332042.891894536],
					[16205856.96103645, -4332042.265172983],
					[16205856.306951968, -4331933.674996614]
				]
			]));
			paddockFeatureNew2.properties.group = paddockGroupDefaults.groups[1];
			var paddockFeatureName2 = paddockFeatureNew.properties.name;

			//Adding 2 paddocks
			geoJsonsNew.paddocks.features.push(paddockFeatureNew);
			geoJsonsNew.paddocks.features.push(paddockFeatureNew2);

			var geoJsonsAdded = geoJsonsNew;
			expect(geoJsonsAdded.paddocks.features.length).toBe(2);
			var toVerify = geoJsonsAdded.paddocks.features[0];
			expect(angular.equals(paddockFeatureNew, toVerify)).toBeTruthy();

			var farmDataAdded = farmdata.merge(farmDataNew, geoJsonsAdded);

			expect(farmDataAdded.paddocks.length).toBe(2);
			var farmDataPaddock = farmDataAdded.paddocks[0];

			expect(farmDataPaddock.name).toBe(paddockFeatureNew.properties.name);
			expect(farmDataPaddock.geometry.coordinates.length).toBe(paddockFeatureNew.geometry.coordinates.length);
			expect(angular.equals(farmDataPaddock.geometry.coordinates, paddockFeatureNew.geometry.coordinates)).toBeTruthy();

			//Evaluate teh group.paddocks
			expect(farmDataAdded.paddockGroups.length).toBe(18)
			var effluentGroup = farmDataAdded.paddockGroups[1];
			expect(effluentGroup.name).toBe('E - Effluent');
			expect(effluentGroup.paddocks.length).toBe(2);

			//the names exist...
			expect(effluentGroup.paddocks.indexOf(paddockFeatureName) > -1).toBeTruthy();
			expect(effluentGroup.paddocks.indexOf(paddockFeatureName2) > -1).toBeTruthy();
		}));

		it('updating existing paddock', inject(function () {
			var susanFarmData = angular.copy(susanFarm),
				geoJsons = farmdataConverter.toGeoJsons(susanFarmData),
				paddockToChange = geoJsons.paddocks.features[0], newName = 'Changed Paddock',
				newCoordinates = [
					[
						[
							145.57368096419663,
							-36.224879531701255
						],
						[
							145.5826132801325,
							-36.22488327137526
						],
						[
							145.58260951039628,
							-36.22801228957186
						],
						[
							145.57363088613704,
							-36.22803939355771
						],
						[
							145.57368096419663,
							-36.224879531701255
						]
					]
				];
			paddockToChange.properties.name = newName;
			paddockToChange.geometry.coordinates = newCoordinates;
			expect(paddockToChange).toBeDefined();

			var farmDataChanged = farmdata.merge(susanFarmData, geoJsons);

			var farmDataPaddock = farmDataChanged.paddocks[0];

			expect(farmDataPaddock.name).toBe(newName);
			expect(farmDataPaddock.geometry.coordinates).toEqual(newCoordinates);


		}))

		it('updating existing paddock with duplicate name should fail the merge operation', inject(function () {
			var susanFarmData = angular.copy(susanFarm),
				geoJsons = farmdataConverter.toGeoJsons(susanFarmData),
				paddockToChange = geoJsons.paddocks.features[0], newName = 'Changed Paddock',
				paddockFeatureNew = farmdataPaddocks.createPaddockFeature(createGeometry()),
			newCoordinates = [
					[
						[
							145.57368096419663,
							-36.224879531701255
						],
						[
							145.5826132801325,
							-36.22488327137526
						],
						[
							145.58260951039628,
							-36.22801228957186
						],
						[
							145.57363088613704,
							-36.22803939355771
						],
						[
							145.57368096419663,
							-36.224879531701255
						]
					]
				];
			paddockToChange.properties.name = newName;
			paddockFeatureNew.properties.name = newName;
			paddockToChange.geometry.coordinates = newCoordinates;
			expect(paddockToChange).toBeDefined();


			geoJsons.paddocks.features.push(paddockFeatureNew);
			expect(geoJsons.paddocks.features.length).toBe(2);
			var toVerify = geoJsons.paddocks.features[1];
			expect(angular.equals(paddockFeatureNew, toVerify)).toBeTruthy();

			//If merge fails we return the original farmData so we don't break current components.
			expect(farmdata.merge(susanFarmData, geoJsons)).toEqual(susanFarmData);
		}))

	});

	afterEach(function () {
		fixture.cleanup()
	});

});
