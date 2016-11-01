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
var stores_1 = require("../stores");
var React = require("react");
function field(Component) {
    return _a = (function (_super) {
            __extends(Field, _super);
            function Field(props, context) {
                var _this = _super.call(this, props, context) || this;
                if (!context.parentStore) {
                    throw new Error('Fields must be used inside a component decorated with formobx');
                }
                _this.store = new stores_1.FieldStore();
                return _this;
            }
            Field.prototype.componentDidMount = function () {
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
            Field.prototype.render = function () {
                if (Component === 'input') {
                    return React.createElement("input", __assign({}, this.props, this.store.asProps));
                }
                return React.createElement(Component, __assign({}, this.props, { field: this.store }));
            };
            return Field;
        }(React.Component)),
        _a.contextTypes = {
            parentStore: React.PropTypes.object.isRequired
        },
        _a;
    var _a;
}
exports.field = field;
//# sourceMappingURL=field.js.map