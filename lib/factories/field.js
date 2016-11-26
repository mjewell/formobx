"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var components_1 = require("../components");
var mobx_react_1 = require("mobx-react");
var React = require("react");
function field(FieldComponent) {
    var WrappedComponent;
    if (typeof FieldComponent !== 'string') {
        WrappedComponent = mobx_react_1.observer(FieldComponent);
    }
    var FormobxField = (function (_super) {
        __extends(FormobxField, _super);
        function FormobxField() {
            return _super.apply(this, arguments) || this;
        }
        FormobxField.prototype.render = function () {
            if (!WrappedComponent) {
                if (FieldComponent === 'input') {
                    return React.createElement("input", __assign({}, this.props, this.store.asProps));
                }
                throw new Error('Unsupported string component type');
            }
            return React.createElement(WrappedComponent, __assign({}, this.props, { field: this.store }));
        };
        return FormobxField;
    }(components_1.Field));
    return FormobxField;
}
exports.field = field;
//# sourceMappingURL=field.js.map