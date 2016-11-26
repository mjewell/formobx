"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stores_1 = require("../stores");
var React = require("react");
var ChildField = (function (_super) {
    __extends(ChildField, _super);
    function ChildField(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.fields = [];
        if (!context.parentStore) {
            throw new Error('Formobx Fields must be used inside a component decorated with formobx');
        }
        return _this;
    }
    ChildField.prototype.componentDidMount = function () {
        var parentStore = this.context.parentStore;
        if (parentStore instanceof stores_1.ArrayStore) {
            this.fields.forEach(function (data) {
                parentStore.registerField(data.field);
            });
        }
        else {
            if (this.fields.length === 0 || this.fields.some(function (data) { return !data.name; })) {
                throw new Error('All fields must have names when the parent is not an ArrayField');
            }
            this.fields.forEach(function (data) {
                parentStore.registerField(data.name, data.field);
            });
        }
    };
    ChildField.prototype.componentWillUnmount = function () {
        var parentStore = this.context.parentStore;
        if (parentStore instanceof stores_1.ArrayStore) {
            this.fields.forEach(function (data) {
                parentStore.unregisterField(data.field);
            });
        }
        else {
            if (this.fields.length === 0) {
                throw new Error('Names are required when the parent is not an ArrayField');
            }
            this.fields.forEach(function (data) {
                parentStore.unregisterField(data.name);
            });
        }
    };
    return ChildField;
}(React.Component));
ChildField.contextTypes = {
    parentStore: React.PropTypes.object.isRequired
};
exports.ChildField = ChildField;
//# sourceMappingURL=childField.js.map