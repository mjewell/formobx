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
var mobx_react_1 = require("mobx-react");
var react_1 = require("react");
var React = require("react");
function wrapOnSubmit(store, callback) {
    return function (e) {
        e.preventDefault();
        store.setSubmitting(true);
        store.clearErrors();
        Promise.resolve(callback(store.value))
            .catch(function (result) { return store.setErrors(result); })
            .then(function () { return store.setSubmitting(false); });
    };
}
function form(options) {
    return function (WrappedComponent) {
        var WC = mobx_react_1.observer(WrappedComponent);
        var Form = (function (_super) {
            __extends(Form, _super);
            function Form(props) {
                var _this = _super.call(this, props) || this;
                _this.store = new stores_1.FormStore(options);
                if (options.onSubmit) {
                    _this.onSubmit = wrapOnSubmit(_this.store, options.onSubmit);
                }
                return _this;
            }
            Form.prototype.getChildContext = function () {
                return { parentStore: this.store };
            };
            Form.prototype.render = function () {
                return React.createElement(WC, __assign({}, this.props, { form: this.store, onSubmit: this.onSubmit }));
            };
            return Form;
        }(react_1.Component));
        Form.childContextTypes = {
            parentStore: react_1.PropTypes.object
        };
        return Form;
    };
}
exports.form = form;
//# sourceMappingURL=form.js.map