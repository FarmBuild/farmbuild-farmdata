describe('farmbuild.farmdata module', function () {
	// instantiate log
	var $log, farmdataPaddocks, farmdata, farmdataConverter,
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

	beforeEach(inject(function (_$log_, _farmdataPaddocks_, _farmdata_, _farmdataConverter_) {
		$log = _$log_;
		farmdataPaddocks = _farmdataPaddocks_;
		farmdata = _farmdata_;
		farmdataConverter = _farmdataConverter_;
	}))

	function createGeometry() {
		return {
			"type": "Polygon",
			"crs": {
				"type": "name",
				"properties": {
					"name": "EPSG:4283"
				}
			},
			"coordinates": [[[16205687.520831015, -4331788.270308661],
				[16205603.152080152, -4331789.188156667],
				[16205599.164149445, -4331941.003031067],
				[16205687.01904266, -4331942.85666477],
				[16205686.7631797, -4331933.887643515],
				[16205687.520831015, -4331788.270308661]]]
		};
	}

	function _add(geoJsons, geoJsonGeometry) {
		$log.info('farmdataPaddocks.add item ...', geoJsonGeometry);
		geoJsons.paddocks.features.push(geoJsonGeometry);
		return geoJsons;
	};

	describe('farmdataPaddocks.merge should merge the geoJson into the farmData', function () {
		it('adding a new paddock', inject(function () {
			var farmDataNew = farmdata.create(),
				geoJsonsNew = farmdataConverter.toGeoJsons(farmDataNew),
				paddockFeatureNew = farmdataPaddocks.createPaddockFeature(createGeometry());

			expect(geoJsonsNew.paddocks).toBeDefined();
			expect(geoJsonsNew.paddocks.features).toBeDefined();
			expect(geoJsonsNew.paddocks.features.length).toBe(0);

			geoJsonsNew.paddocks.features.push(paddockFeatureNew);
			var geoJsonsAdded = geoJsonsNew;
			expect(geoJsonsAdded.paddocks.features.length).toBe(1)
			var toVerify = geoJsonsAdded.paddocks.features[0]
			expect(angular.equals(paddockFeatureNew, toVerify)).toBeTruthy()

			var farmDataAdded = farmdata.merge(farmDataNew, geoJsonsAdded);

			expect(farmDataAdded.paddocks.length).toBe(1)
			var farmDataPaddock = farmDataAdded.paddocks[0];

			expect(farmDataPaddock.name).toBe(paddockFeatureNew.properties.name)
			expect(farmDataPaddock.geometry.coordinates.length).toBe(paddockFeatureNew.geometry.coordinates.length)
			expect(angular.equals(farmDataPaddock.geometry.coordinates, paddockFeatureNew.geometry.coordinates)).toBeTruthy()


		}))

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
			console.log(paddockToChange.geometry);
			paddockToChange.name = newName;
			paddockToChange.geometry.coordinates = newCoordinates;
			expect(paddockToChange).toBeDefined();

			var farmDataChanged = farmdata.merge(susanFarmData, geoJsons);

			var farmDataPaddock = farmDataChanged.paddocks[0];

			expect(farmDataPaddock.name).toBe(newName);
			expect(farmDataPaddock.geometry.coordinates).toEqual(newCoordinates);


		}))

	});

	afterEach(function () {
		fixture.cleanup()
	});

});
