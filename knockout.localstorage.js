(function (window, ko, undefined) {
   ko.extenders.persist = function(target, key) {
        var init = false;
        //return if localStorage is not defined
        if (typeof (window.localStorage) === "undefined") {
            return target;
        }
        var initialValue = target;
        // Load existing value from localStorage if set
        if (key.name && localStorage.getItem(key.name) !== null) {
            try {
                initialValue = JSON.parse(localStorage.getItem(key.name));
            } catch (e) {
            }
        }
        //determine if key is mapped to an Javascript Object or Array of Objects
        if (key.complex) {
            //If key is an Array Of Object
            if (Array.isArray(initialValue)) {
                var startObjs = [];
                //loop through array and push values into new array
                for (var gr in initialValue) {
                    startObjs.push(new key.mapObject(initialValue[gr]));
                }
                //return new array to target
                target(startObjs);
            } else {
                //check if the type is an object
                if (typeof (initialValue) == "object") {
                    //return object to target
                    target(new key.mapObject(initialValue));
                }
            }

        }
       //if array is not mapped to a Javascript Object
        else {
            //Check is Array
            if (Array.isArray(initialValue)) {
                //return array to target
                target(initialValue);
            } else {
                //check if object
                if (typeof (initialValue) == "object") {
                    //return object to target
                    target(initialValue);
                }
            }
        }
        // Subscribe to new values and add them to localStorage
        target.subscribe(function(newValue) {
            localStorage.setItem(key.name, ko.toJSON(newValue));
        });
        return target;
    };
})(window, ko);
