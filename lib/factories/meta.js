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
var mobx_react_1 = require("mobx-react");
var react_1 = require("react");
var React = require("react");
function meta(MetaComponent) {
    var WrappedComponent = mobx_react_1.observer(MetaComponent);
    var FormobxMeta = (function (_super) {
        __extends(FormobxMeta, _super);
        function FormobxMeta(props, context) {
            var _this = _super.call(this, props, context) || this;
            if (!context.parentStore) {
                throw new Error('Formobx Fields must be used inside a component decorated with formobx');
            }
            return _this;
        }
        FormobxMeta.prototype.render = function () {
            return React.createElement(WrappedComponent, __assign({}, this.props, { field: this.context.parentStore }));
        };
        return FormobxMeta;
    }(react_1.Component));
    FormobxMeta.contextTypes = {
        parentStore: react_1.PropTypes.object.isRequired
    };
    return FormobxMeta;
}
exports.meta = meta;
//# sourceMappingURL=meta.js.map