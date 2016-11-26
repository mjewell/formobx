"use strict";
var stores_1 = require("../stores");
var types_1 = require("../types");
function setErrorsFor(field, error) {
    if (field) {
        if (field instanceof stores_1.ArrayStore) {
            if (types_1.isArrayErrors(error)) {
                field.setErrors(error);
            }
        }
        else if (field instanceof stores_1.ObjectStore) {
            if (types_1.isObjectErrors(error)) {
                field.setErrors(error);
            }
        }
        else {
            if (types_1.isFieldErrors(error)) {
                field.setErrors(error);
            }
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setErrorsFor;
//# sourceMappingURL=setErrorsFor.js.map