"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var childField_1 = require("../components/childField");
var stores_1 = require("../stores");
var MultiField = (function (_super) {
    __extends(MultiField, _super);
    function MultiField(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.stores = {};
        (_this.props.names || []).forEach(function (name) {
            var field = new stores_1.FieldStore();
            _this.stores[name] = new stores_1.FieldStore();
            _this.fields.push({ name: name, field: field });
        });
        return _this;
    }
    return MultiField;
}(childField_1.ChildField));
exports.MultiField = MultiField;
//# sourceMappingURL=multiField.js.map