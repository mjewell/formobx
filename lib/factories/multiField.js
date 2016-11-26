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
function multiField(MultiFieldComponent) {
    var WrappedComponent = mobx_react_1.observer(MultiFieldComponent);
    return (function (_super) {
        __extends(FormobxMultiField, _super);
        function FormobxMultiField() {
            return _super.apply(this, arguments) || this;
        }
        FormobxMultiField.prototype.render = function () {
            return React.createElement(WrappedComponent, __assign({}, this.props, { fields: this.stores }));
        };
        return FormobxMultiField;
    }(components_1.MultiField));
}
exports.multiField = multiField;
//# sourceMappingURL=multiField.js.map