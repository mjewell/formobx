"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var childField_1 = require("./childField");
var react_1 = require("react");
var React = require("react");
var WrapperField = (function (_super) {
    __extends(WrapperField, _super);
    function WrapperField() {
        return _super.apply(this, arguments) || this;
    }
    WrapperField.prototype.getChildContext = function () {
        return { parentStore: this.store };
    };
    WrapperField.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return WrapperField;
}(childField_1.ChildField));
WrapperField.childContextTypes = {
    parentStore: react_1.PropTypes.object
};
exports.WrapperField = WrapperField;
//# sourceMappingURL=wrapperField.js.map