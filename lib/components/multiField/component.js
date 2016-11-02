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
var stores_1 = require("../../stores");
var React = require("react");
var omit = require('lodash/fp/omit');
var exceptComponent = omit('component');
var MultiField = (function (_super) {
    __extends(MultiField, _super);
    function MultiField(props, context) {
        var _this = _super.call(this, props, context) || this;
        if (!context.parentStore) {
            throw new Error('MultiFields must be used inside a component decorated with formobx');
        }
        _this.stores = {};
        (_this.props.names || []).forEach(function (name) {
            _this.stores[name] = new stores_1.FieldStore();
        });
        _this.component = props.component;
        return _this;
    }
    MultiField.prototype.componentDidMount = function () {
        var _this = this;
        var store = this.context.parentStore;
        if (store instanceof stores_1.ArrayStore) {
            (this.props.names || []).forEach(function (name) {
                store.registerField(_this.stores[name]);
            });
        }
        else {
            if (!this.props.names) {
                throw new Error('Names are required when the parent is not an ArrayField');
            }
            this.props.names.forEach(function (name) {
                store.registerField(name, _this.stores[name]);
            });
        }
    };
    MultiField.prototype.render = function () {
        return (React.createElement(this.component, __assign({}, exceptComponent(this.props), { fields: this.stores })));
    };
    return MultiField;
}(React.Component));
exports.MultiField = MultiField;
MultiField.contextTypes = {
    parentStore: React.PropTypes.object.isRequired
};
//# sourceMappingURL=component.js.map