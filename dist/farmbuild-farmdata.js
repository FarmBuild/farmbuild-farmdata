"use strict";

angular.module("farmbuild.farmdata", []);

window.farmbuild = {
    farmdata: {}
};

"use strict";

angular.module("farmbuild.farmdata").factory("farmData", function(farmDataSession) {
    var farmData = {
        session: farmDataSession
    }, defaults = {
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
    farmData.defaultValues = function() {
        return angular.copy(defaults);
    };
    function parameterByName(search, name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    farmData.isLoadFlagSet = function(location) {
        var load = false;
        if (location.href.split("?").length > 1 && location.href.split("?")[1].indexOf("load") === 0) {
            load = location.href.split("?")[1].split("=")[1] === "true";
        }
        return load;
    };
    farmData.isFarmData = function(farmData) {
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
    farmData.create = function(name) {
        return create(name);
    };
    window.farmbuild.farmdata = farmData;
    return farmData;
});

"use strict";

angular.module("farmbuild.farmdata").factory("farmDataSession", function($log, validations) {
    var farmDataSession = {}, isDefined = validations.isDefined;
    farmDataSession.save = function(farmData) {
        $log.info("saving farmData");
        if (!isDefined(farmData)) {
            $log.error("Unable to save farmData... it is undefined");
            return farmDataSession;
        }
        sessionStorage.setItem("farmData", angular.toJson(farmData));
        return farmDataSession;
    };
    farmDataSession.find = function() {
        return angular.fromJson(sessionStorage.getItem("farmData"));
    };
    return farmDataSession;
});

"use strict";

(function(window) {
    console.log("Welcome to karmas, karma spec helper");
    if (!window) {
        console.log("window is not available...");
        window = {};
    }
    window.karmas = {};
    var karmas = window.karmas;
    karmas.logToConsole = function(moduleName) {
        beforeEach(module(moduleName, function($provide) {
            $provide.value("$log", console);
        }));
        return karmas;
    };
})(window);

angular.module("farmbuild.farmdata").factory("validations", function($log) {
    var validations = {};
    validations.isPositiveNumberOrZero = function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) >= 0;
    };
    validations.isPositiveNumber = function(value) {
        return validations.isPositiveNumberOrZero(value) && parseFloat(value) > 0;
    };
    validations.isAlphabet = function(value) {
        var regex = /^[A-Za-z]+$/gi;
        return regex.test(value);
    };
    validations.isAlphanumeric = function(value) {
        var regex = /^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9 _]*$/gi;
        return regex.test(value);
    };
    var isEmpty = function(data) {
        if (typeof data == "number" || typeof data == "boolean") {
            return false;
        }
        if (typeof data == "undefined" || data === null) {
            return true;
        }
        if (typeof data.length != "undefined") {
            return data.length == 0;
        }
        return false;
    };
    validations.isEmpty = isEmpty;
    validations.isDefined = angular.isDefined;
    validations.isArray = angular.isArray;
    validations.equals = angular.equals;
    return validations;
});