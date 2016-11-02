"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stores_1 = require("../stores");
var nodeField_1 = require("./nodeField");
var ObjectField = (function (_super) {
    __extends(ObjectField, _super);
    function ObjectField(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.store = new stores_1.ObjectStore();
        return _this;
    }
    return ObjectField;
}(nodeField_1.NodeField));
exports.ObjectField = ObjectField;
//# sourceMappingURL=objectField.js.map