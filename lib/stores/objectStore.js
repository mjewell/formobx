"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var setErrorsFor_1 = require("../services/setErrorsFor");
var setInitialValuesFor_1 = require("../services/setInitialValuesFor");
var keys = require("lodash/keys");
var mobx_1 = require("mobx");
var mapValues = require('lodash/fp/mapValues');
var mapValuesToJS = mapValues(function (f) { return f.value; });
var ObjectStore = (function () {
    function ObjectStore() {
        this.fields = mobx_1.asMap({});
        this.errors = mobx_1.observable([]);
        this.initialValues = {};
    }
    Object.defineProperty(ObjectStore.prototype, "value", {
        get: function () {
            return mapValuesToJS(this.fields.toJS());
        },
        enumerable: true,
        configurable: true
    });
    ObjectStore.prototype.registerField = function (name, field) {
        if (this.fields.has(name)) {
            throw new Error("Field with name '" + name + "' already exists on this part of the form");
        }
        if (name === '_base') {
            throw new Error("Field cannot have reserved name '_base'");
        }
        this.fields.set(name, field);
        setInitialValuesFor_1.default(field, this.initialValues[name]);
        field.parent = this;
    };
    ObjectStore.prototype.unregisterField = function (name) {
        this.fields.delete(name);
    };
    ObjectStore.prototype.setInitialValues = function (initialValues) {
        var _this = this;
        this.initialValues = initialValues || {};
        this.fields.keys().forEach(function (key) {
            setInitialValuesFor_1.default(_this.fields.get(key), _this.initialValues[key]);
        });
    };
    ObjectStore.prototype.clearErrors = function () {
        this.fields.values().forEach(function (field) { return field.clearErrors(); });
        this.errors.clear();
    };
    ObjectStore.prototype.setErrors = function (errors) {
        var _this = this;
        keys(errors).forEach(function (key) { return setErrorsFor_1.default(_this.fields.get(key), errors[key]); });
        this.errors.replace(errors._base || []);
    };
    return ObjectStore;
}());
__decorate([
    mobx_1.observable
], ObjectStore.prototype, "fields", void 0);
__decorate([
    mobx_1.computed
], ObjectStore.prototype, "value", null);
__decorate([
    mobx_1.action
], ObjectStore.prototype, "registerField", null);
__decorate([
    mobx_1.action
], ObjectStore.prototype, "unregisterField", null);
__decorate([
    mobx_1.action
], ObjectStore.prototype, "setInitialValues", null);
__decorate([
    mobx_1.action
], ObjectStore.prototype, "clearErrors", null);
__decorate([
    mobx_1.action
], ObjectStore.prototype, "setErrors", null);
exports.ObjectStore = ObjectStore;
//# sourceMappingURL=objectStore.js.map