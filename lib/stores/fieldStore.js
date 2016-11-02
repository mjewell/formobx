"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var mobx_1 = require("mobx");
var FieldStore = (function () {
    function FieldStore() {
        this.value = '';
        this.errors = mobx_1.observable([]);
    }
    Object.defineProperty(FieldStore.prototype, "asProps", {
        get: function () {
            var _this = this;
            return {
                onChange: function (e) {
                    var target = e.target;
                    _this.setValue(target.value);
                },
                value: this.value
            };
        },
        enumerable: true,
        configurable: true
    });
    FieldStore.prototype.setInitialValues = function (initialValue) {
        if (!initialValue) {
            this.setValue('');
            return;
        }
        this.setValue(initialValue);
    };
    FieldStore.prototype.setValue = function (val) {
        this.value = val;
    };
    FieldStore.prototype.clearErrors = function () {
        this.errors.clear();
    };
    FieldStore.prototype.setErrors = function (errors) {
        this.errors.replace(errors);
    };
    return FieldStore;
}());
exports.FieldStore = FieldStore;
__decorate([
    mobx_1.observable
], FieldStore.prototype, "value", void 0);
__decorate([
    mobx_1.computed
], FieldStore.prototype, "asProps", null);
__decorate([
    mobx_1.action
], FieldStore.prototype, "setInitialValues", null);
__decorate([
    mobx_1.action
], FieldStore.prototype, "setValue", null);
__decorate([
    mobx_1.action
], FieldStore.prototype, "clearErrors", null);
__decorate([
    mobx_1.action
], FieldStore.prototype, "setErrors", null);
//# sourceMappingURL=fieldStore.js.map