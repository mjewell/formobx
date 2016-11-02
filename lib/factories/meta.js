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
var React = require("react");
function meta(Component) {
    return _a = (function (_super) {
            __extends(Meta, _super);
            function Meta(props, context) {
                var _this = _super.call(this, props, context) || this;
                if (!context.parentStore) {
                    throw new Error('Metas must be used inside a component decorated with formobx');
                }
                return _this;
            }
            Meta.prototype.render = function () {
                return React.createElement(Component, __assign({}, this.props, { field: this.context.parentStore }));
            };
            return Meta;
        }(React.Component)),
        _a.contextTypes = {
            parentStore: React.PropTypes.object.isRequired
        },
        _a;
    var _a;
}
exports.meta = meta;
//# sourceMappingURL=meta.js.map