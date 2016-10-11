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
function wrapOnSubmit(store, callback) {
    return function (e) {
        e.preventDefault();
        store.updateSubmitting(true);
        store.clearErrors();
        Promise.resolve(callback(store.fieldValues))
            .catch(function (result) { return store.updateAllErrors(result); })
            .then(function () { return store.updateSubmitting(false); });
    };
}
function formobx(component, options) {
    return _a = (function (_super) {
            __extends(Form, _super);
            function Form(props) {
                var _this = _super.call(this, props) || this;
                _this.store = new store_1.default(options);
                _this.component = component;
                if (options.onSubmit) {
                    _this.onSubmit = wrapOnSubmit(_this.store, options.onSubmit);
                }
                return _this;
            }
            Form.prototype.getChildContext = function () {
                return { formStore: this.store };
            };
            Form.prototype.render = function () {
                return (React.createElement(this.component, __assign({}, this.props, { form: this.store, onSubmit: this.onSubmit })));
            };
            return Form;
        }(React.Component)),
        _a.childContextTypes = {
            formStore: React.PropTypes.object
        },
        _a;
    var _a;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formobx;
//# sourceMappingURL=formobx.js.map