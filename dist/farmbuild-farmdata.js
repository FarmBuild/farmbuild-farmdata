"use strict";

angular.module("farmbuild.farmdata", [ "farmbuild.core" ]);

window.farmbuild = {
    farmdata: {}
};

"use strict";

angular.module("farmbuild.farmdata").factory("farmdata", function(farmdataSession, validations) {
    var farmdata = {
        session: farmdataSession
    }, isEmpty = validations.isEmpty, defaults = {
        id: "" + new Date().getTime(),
        name: "My new farm",
        geometry: {
            type: "Polygon",
            crs: "EPSG:4283",
            coordinates: []
        }
    }, create = function(name, id) {
        return {
            version: 1,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            id: isEmpty(id) ? defaults.id : id,
            name: isEmpty(name) ? defaults.name : name,
            geometry: angular.copy(defaults.geometry),
            area: 0,
            areaUnit: "hectare"
        };
    };
    farmdata.defaultValues = function() {
        return angular.copy(defaults);
    };
    function parameterByName(search, name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    farmdata.validate = function(farmData) {};
    farmdata.isFarmData = function(farmData) {
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
    farmdata.create = function(name) {
        return create(name);
    };
    window.farmbuild.farmdata = farmdata;
    return farmdata;
});

"use strict";

angular.module("farmbuild.farmdata").factory("farmdataSession", function($log, validations) {
    var farmdataSession = {}, isDefined = validations.isDefined;
    farmdataSession.clear = function() {
        sessionStorage.clear();
        return farmdataSession;
    };
    farmdataSession.save = function(farmData) {
        $log.info("saving farmData");
        if (!isDefined(farmData)) {
            $log.error("Unable to save farmData... it is undefined");
            return farmdataSession;
        }
        sessionStorage.setItem("farmData", angular.toJson(farmData));
        return farmdataSession;
    };
    farmdataSession.find = function() {
        var json = sessionStorage.getItem("farmData");
        if (json === null) {
            return undefined;
        }
        return angular.fromJson(json);
    };
    return farmdataSession;
});

"use strict";