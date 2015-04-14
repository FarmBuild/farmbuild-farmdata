"use strict";

angular.module("farmbuild.farmdata", []);

"use strict";

angular.module("farmbuild.farmdata").factory("Farmdata", function() {
    var Farmdata = {}, create = function(name) {
        return {
            version: 1,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            name: name ? name : "My new farm",
            geometry: {
                type: "Polygon",
                crs: "EPSG:4283",
                coordinates: []
            },
            area: 0
        };
    };
    Farmdata.create = function(name) {
        return create(name);
    };
    window.farmbuild.farmdata = Farmdata;
    return Farmdata;
});

"use strict";

describe("farmbuild.farmdata module", function() {
    var Farmdata;
    beforeEach(module("farmbuild.farmdata"));
    beforeEach(inject(function(_Farmdata_) {
        Farmdata = _Farmdata_;
    }));
    describe("farmdata factory", function() {
        it("should be defined", inject(function() {
            expect(Farmdata).toBeDefined();
        }));
    });
});

"use strict";

angular.module("farmbuild.farmdata").run(function() {});

window.farmbuild = {
    farmdata: {}
};

angular.injector([ "ng", "farmbuild.farmdata" ]);