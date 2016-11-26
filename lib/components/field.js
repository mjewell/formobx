"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var childField_1 = require("../components/childField");
var stores_1 = require("../stores");
var Field = (function (_super) {
    __extends(Field, _super);
    function Field(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.store = new stores_1.FieldStore();
        _this.fields.push({
            field: _this.store,
            name: _this.props.name
        });
        return _this;
    }
    return Field;
}(childField_1.ChildField));
exports.Field = Field;
//# sourceMappingURL=field.js.map