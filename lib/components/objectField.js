"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stores_1 = require("../stores");
var React = require("react");
var ObjectField = (function (_super) {
    __extends(ObjectField, _super);
    function ObjectField(props, context) {
        var _this = _super.call(this, props, context) || this;
        if (!context.parentStore) {
            throw new Error('ObjectFields must be used inside a component decorated with formobx');
        }
        _this.store = new stores_1.ObjectStore();
        return _this;
    }
    ObjectField.prototype.getChildContext = function () {
        return { parentStore: this.store };
    };
    ObjectField.prototype.componentDidMount = function () {
        var store = this.context.parentStore;
        if (store instanceof stores_1.ArrayStore) {
            store.registerField(this.store);
        }
        else {
            if (!this.props.name) {
                throw new Error('Name is required when the parent is not an ArrayField');
            }
            store.registerField(this.props.name, this.store);
        }
    };
    ObjectField.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return ObjectField;
}(React.Component));
exports.ObjectField = ObjectField;
ObjectField.contextTypes = {
    parentStore: React.PropTypes.object.isRequired
};
ObjectField.childContextTypes = {
    parentStore: React.PropTypes.object
};
//# sourceMappingURL=objectField.js.map