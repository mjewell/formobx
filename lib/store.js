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
var getErrors = mapValues(function (f) { return f.errors; });
var Store = (function () {
    function Store(options) {
        this.submitting = false;
        this.fields = mobx_1.asMap({});
        this.errors = mobx_1.observable([]);
        this.initialValues = options.initialValues || {};
    }
    Object.defineProperty(Store.prototype, "fieldsJS", {
        get: function () {
            return this.fields.toJS();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "fieldValues", {
        get: function () {
            return getValues(this.fieldsJS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "fieldErrors", {
        get: function () {
            return getErrors(this.fieldsJS);
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.addField = function (name, field) {
        if (this.fields.has(name)) {
            throw new Error("Field with name '" + name + "' already exists on this form");
        }
        this.fields.set(name, field);
        field.updateValue(this.initialValues[name] || '');
    };
    Store.prototype.updateSubmitting = function (submitting) {
        this.submitting = submitting;
    };
    Store.prototype.clearErrors = function () {
        this.fields.values().forEach(function (field) { return field.clearErrors(); });
        this.errors.clear();
    };
    Store.prototype.updateErrors = function (errors) {
        this.errors.replace(errors);
    };
    Store.prototype.updateAllErrors = function (errors) {
        var _this = this;
        keys(errors).forEach(function (key) {
            if (_this.fields.has(key)) {
                _this.fields.get(key).updateErrors(errors[key] || []);
            }
        });
        this.updateErrors(errors._base || []);
    };
    return Store;
}());
exports.Store = Store;
__decorate([
    mobx_1.observable
], Store.prototype, "submitting", void 0);
__decorate([
    mobx_1.observable
], Store.prototype, "fields", void 0);
__decorate([
    mobx_1.computed
], Store.prototype, "fieldsJS", null);
__decorate([
    mobx_1.computed
], Store.prototype, "fieldValues", null);
__decorate([
    mobx_1.computed
], Store.prototype, "fieldErrors", null);
__decorate([
    mobx_1.action
], Store.prototype, "addField", null);
__decorate([
    mobx_1.action
], Store.prototype, "updateSubmitting", null);
__decorate([
    mobx_1.action
], Store.prototype, "clearErrors", null);
__decorate([
    mobx_1.action
], Store.prototype, "updateErrors", null);
__decorate([
    mobx_1.action
], Store.prototype, "updateAllErrors", null);
//# sourceMappingURL=store.js.map