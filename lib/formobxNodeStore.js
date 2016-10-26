"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var keys = require("lodash/keys");
var mobx_1 = require("mobx");
var mapValues = require('lodash/fp/mapValues');
var getValues = mapValues(function (f) { return f.value; });
var FormobxNodeStore = (function () {
    function FormobxNodeStore() {
        this.fields = mobx_1.asMap({});
        this.errors = mobx_1.observable([]);
        this.setInitialValues();
    }
    Object.defineProperty(FormobxNodeStore.prototype, "value", {
        get: function () {
            return getValues(this.fields.toJS());
        },
        enumerable: true,
        configurable: true
    });
    FormobxNodeStore.prototype.registerField = function (name, field) {
        if (this.fields.has(name)) {
            throw new Error("Field with name '" + name + "' already exists on this part of the form");
        }
        this.fields.set(name, field);
        field.setInitialValues(this.initialValues[name]);
        field.parent = this;
    };
    FormobxNodeStore.prototype.setInitialValues = function (initialValues) {
        var _this = this;
        if (!initialValues) {
            this.initialValues = {};
            return;
        }
        this.initialValues = initialValues;
        this.fields.keys().forEach(function (key) { return _this.fields.get(key).setInitialValues(initialValues[key]); });
    };
    FormobxNodeStore.prototype.clearErrors = function () {
        this.fields.values().forEach(function (field) { return field.clearErrors(); });
        this.errors.clear();
    };
    FormobxNodeStore.prototype.setErrors = function (errors) {
        this.errors.replace(errors);
    };
    FormobxNodeStore.prototype.setAllErrors = function (errors) {
        var _this = this;
        keys(errors).forEach(function (key) {
            if (_this.fields.has(key)) {
                _this.fields.get(key).setErrors(errors[key] || []);
            }
        });
        this.setErrors(errors._base || []);
    };
    return FormobxNodeStore;
}());
exports.FormobxNodeStore = FormobxNodeStore;
__decorate([
    mobx_1.observable
], FormobxNodeStore.prototype, "fields", void 0);
__decorate([
    mobx_1.computed
], FormobxNodeStore.prototype, "value", null);
__decorate([
    mobx_1.action
], FormobxNodeStore.prototype, "registerField", null);
__decorate([
    mobx_1.action
], FormobxNodeStore.prototype, "setInitialValues", null);
__decorate([
    mobx_1.action
], FormobxNodeStore.prototype, "clearErrors", null);
__decorate([
    mobx_1.action
], FormobxNodeStore.prototype, "setErrors", null);
__decorate([
    mobx_1.action
], FormobxNodeStore.prototype, "setAllErrors", null);
//# sourceMappingURL=formobxNodeStore.js.map