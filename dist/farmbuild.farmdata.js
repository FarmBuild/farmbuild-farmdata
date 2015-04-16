"use strict";

angular.module("farmbuild.farmdata", []);

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
    FarmData.create = function(name) {
        return create(name);
    };
    window.farmbuild.farmdata = FarmData;
    return FarmData;
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

angular.module("farmbuild.farmdata").run(function() {});

window.farmbuild = {
    farmdata: {}
};

angular.injector([ "ng", "farmbuild.farmdata" ]);