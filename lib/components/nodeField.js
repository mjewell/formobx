"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stores_1 = require("../stores");
var React = require("react");
var NodeField = (function (_super) {
    __extends(NodeField, _super);
    function NodeField(props, context) {
        var _this = _super.call(this, props, context) || this;
        if (!context.parentStore) {
            throw new Error('Node Fields must be used inside a component decorated with formobx');
        }
        return _this;
    }
    NodeField.prototype.getChildContext = function () {
        return { parentStore: this.store };
    };
    NodeField.prototype.componentDidMount = function () {
        var parentStore = this.context.parentStore;
        if (parentStore instanceof stores_1.ArrayStore) {
            parentStore.registerField(this.store);
        }
        else {
            if (!this.props.name) {
                throw new Error('Name is required when the parent is not an ArrayField');
            }
            parentStore.registerField(this.props.name, this.store);
        }
    };
    NodeField.prototype.componentWillUnmount = function () {
        var parentStore = this.context.parentStore;
        if (parentStore instanceof stores_1.ArrayStore) {
            parentStore.unregisterField(this.store);
        }
        else {
            if (!this.props.name) {
                throw new Error('Name is required when the parent is not an ArrayField');
            }
            parentStore.unregisterField(this.props.name);
        }
    };
    NodeField.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return NodeField;
}(React.Component));
NodeField.contextTypes = {
    parentStore: React.PropTypes.object.isRequired
};
NodeField.childContextTypes = {
    parentStore: React.PropTypes.object
};
exports.NodeField = NodeField;
//# sourceMappingURL=nodeField.js.map