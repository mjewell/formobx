"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var types_1 = require("../types");
var objectStore_1 = require("./objectStore");
var mobx_1 = require("mobx");
var ArrayStore = (function () {
    function ArrayStore() {
        this.fields = mobx_1.observable([]);
        this.errors = mobx_1.observable([]);
        this.setInitialValues();
    }
    Object.defineProperty(ArrayStore.prototype, "value", {
        get: function () {
            return this.fields.map(function (field) { return field.value; });
        },
        enumerable: true,
        configurable: true
    });
    ArrayStore.prototype.registerField = function (field) {
        this.fields.push(field);
        field.setInitialValues(this.initialValues[this.fields.length - 1]);
        field.parent = this;
    };
    ArrayStore.prototype.unregisterField = function (field) {
        this.fields.remove(field);
    };
    ArrayStore.prototype.setInitialValues = function (initialValues) {
        if (!initialValues) {
            this.initialValues = [];
            return;
        }
        this.initialValues = initialValues;
        this.fields.forEach(function (field, i) { return field.setInitialValues(initialValues[i]); });
    };
    ArrayStore.prototype.clearErrors = function () {
        this.fields.forEach(function (field) { return field.clearErrors(); });
        this.errors.clear();
    };
    ArrayStore.prototype.setErrors = function (errors) {
        var _this = this;
        errors.forEach(function (error, i) {
            var field = _this.fields[i];
            if (field) {
                if (field instanceof ArrayStore) {
                    if (types_1.isArrayErrors(error)) {
                        field.setErrors(error);
                    }
                }
                else if (field instanceof objectStore_1.ObjectStore) {
                    if (types_1.isObjectErrors(error)) {
                        field.setErrors(error);
                    }
                }
                else {
                    if (types_1.isFieldErrors(error)) {
                        field.setErrors(error);
                    }
                }
            }
        });
        this.errors.replace(errors._base || []);
    };
    return ArrayStore;
}());
__decorate([
    mobx_1.computed
], ArrayStore.prototype, "value", null);
__decorate([
    mobx_1.action
], ArrayStore.prototype, "registerField", null);
__decorate([
    mobx_1.action
], ArrayStore.prototype, "unregisterField", null);
__decorate([
    mobx_1.action
], ArrayStore.prototype, "setInitialValues", null);
__decorate([
    mobx_1.action
], ArrayStore.prototype, "clearErrors", null);
__decorate([
    mobx_1.action
], ArrayStore.prototype, "setErrors", null);
exports.ArrayStore = ArrayStore;
//# sourceMappingURL=arrayStore.js.map