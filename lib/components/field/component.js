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
var store_1 = require("./store");
var React = require("react");
var omit = require('lodash/fp/omit');
var exceptComponent = omit('component');
var Field = (function (_super) {
    __extends(Field, _super);
    function Field(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.store = new store_1.default();
        _this.component = props.component;
        return _this;
    }
    Field.prototype.componentDidMount = function () {
        this.context.formStore.addField(this.props.name, this.store);
    };
    Field.prototype.render = function () {
        return (React.createElement(this.component, __assign({}, exceptComponent(this.props), { field: this.store })));
    };
    return Field;
}(React.Component));
Field.contextTypes = {
    formStore: React.PropTypes.object.isRequired
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Field;
//# sourceMappingURL=component.js.map