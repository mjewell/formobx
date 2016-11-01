"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stores_1 = require("../stores");
var React = require("react");
var ArrayField = (function (_super) {
    __extends(ArrayField, _super);
    function ArrayField(props, context) {
        var _this = _super.call(this, props, context) || this;
        if (!context.parentStore) {
            throw new Error('ArrayFields must be used inside a component decorated with formobx');
        }
        _this.store = new stores_1.ArrayStore();
        return _this;
    }
    ArrayField.prototype.getChildContext = function () {
        return { parentStore: this.store };
    };
    ArrayField.prototype.componentDidMount = function () {
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
    ArrayField.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return ArrayField;
}(React.Component));
exports.ArrayField = ArrayField;
ArrayField.contextTypes = {
    parentStore: React.PropTypes.object.isRequired
};
ArrayField.childContextTypes = {
    parentStore: React.PropTypes.object
};
//# sourceMappingURL=arrayField.js.map