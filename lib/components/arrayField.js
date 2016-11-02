"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stores_1 = require("../stores");
var nodeField_1 = require("./nodeField");
var ArrayField = (function (_super) {
    __extends(ArrayField, _super);
    function ArrayField(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.store = new stores_1.ArrayStore();
        return _this;
    }
    return ArrayField;
}(nodeField_1.NodeField));
exports.ArrayField = ArrayField;
//# sourceMappingURL=arrayField.js.map