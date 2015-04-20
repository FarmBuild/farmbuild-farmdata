"use strict";

angular.module("farmbuild.farmdata", []);

"use strict";

describe("farmbuild.farmdata module", function() {
    var FarmData, dataNoName;
    beforeEach(module("farmbuild.farmdata"));
    beforeEach(inject(function(_FarmData_) {
        FarmData = _FarmData_;
        dataNoName = FarmData.create("Susan's farm");
        delete dataNoName.name;
    }));
    describe("Check if my farmdata created actually correct", function() {
        it("no param should be false", inject(function() {
            expect(FarmData.isFarmData()).toBe(false);
        }));
        it("string data should be false", inject(function() {
            expect(FarmData.isFarmData('{name:"Susan farm"}')).toBe(false);
        }));
        it("no name should be false", inject(function() {
            expect(FarmData.isFarmData(dataNoName)).toBe(false);
        }));
        it("data created by create should be true", inject(function() {
            expect(FarmData.isFarmData(FarmData.create("Susan's farm"))).toBe(true);
        }));
    });
});

"use strict";

describe("farmbuild.farmdata module", function() {
    var FarmData;
    beforeEach(module("farmbuild.farmdata"));
    beforeEach(inject(function(_FarmData_) {
        FarmData = _FarmData_;
    }));
    describe("Use the API for the 1st time with the new farm data", function() {
        it("FarmData should be defined", inject(function() {
            expect(FarmData).toBeDefined();
        }));
        it("FarmData.create should create the default farmdata with name, geometry and area", inject(function() {
            var data = FarmData.create();
            expect(data).toBeDefined();
            expect(data.geometry).toBeDefined();
            expect(data.geometry.type).toBeDefined();
            expect(data.geometry.crs).toBeDefined();
            expect(data.geometry.coordinates).toBeDefined();
            expect(data.area).toBeDefined();
            expect(data.name).toEqual(FarmData.defaultValues().name);
        }));
        it("FarmData.create should create the default farmdata with the specifid name", inject(function() {
            var name = "Susan's fram", data = FarmData.create(name);
            expect(data.name).toEqual(name);
        }));
    });
});

"use strict";

angular.module("farmbuild.farmdata").factory("FarmData", function() {
    var FarmData = {}, defaults = {
        name: "My new farm",
        geometry: {
            type: "Polygon",
            crs: "EPSG:4283",
            coordinates: []
        }
    }, create = function(name) {
        return {
            version: 1,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            name: name ? name : defaults.name,
            geometry: angular.copy(defaults.geometry),
            area: 0
        };
    };
    FarmData.defaultValues = function() {
        return angular.copy(defaults);
    };
    FarmData.isFarmData = function(farmData) {
        if (!angular.isDefined(farmData)) {
            return false;
        }
        if (!angular.isObject(farmData)) {
            return false;
        }
        if (!farmData.hasOwnProperty("name")) {
            return false;
        }
        return true;
    };
    FarmData.create = function(name) {
        return create(name);
    };
    window.farmbuild.farmdata = FarmData;
    return FarmData;
});

"use strict";

angular.module("farmbuild.farmdata").run(function() {});

window.farmbuild = {
    farmdata: {}
};

angular.injector([ "ng", "farmbuild.farmdata" ]);