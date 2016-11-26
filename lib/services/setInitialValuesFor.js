"use strict";
var stores_1 = require("../stores");
function setInitialValuesFor(field, value) {
    if (field instanceof stores_1.ArrayStore) {
        field.setInitialValues(value);
    }
    else if (field instanceof stores_1.ObjectStore) {
        field.setInitialValues(value);
    }
    else {
        field.setInitialValues(value);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setInitialValuesFor;
;
//# sourceMappingURL=setInitialValuesFor.js.map