"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var mobx_1 = require("mobx");
var FormobxLeafStore = (function () {
    function FormobxLeafStore() {
        this.errors = mobx_1.observable([]);
    }
    Object.defineProperty(FormobxLeafStore.prototype, "asProps", {
        get: function () {
            var _this = this;
            return {
                onChange: function (e) {
                    var target = e.target;
                    _this.setValue(target.value);
                },
                defaultValue: this.value
            };
        },
        enumerable: true,
        configurable: true
    });
    FormobxLeafStore.prototype.setInitialValues = function (initialValue) {
        if (!initialValue) {
            this.setValue('');
            return;
        }
        this.setValue(initialValue);
    };
    FormobxLeafStore.prototype.setValue = function (val) {
        this.value = val;
    };
    FormobxLeafStore.prototype.clearErrors = function () {
        this.errors.clear();
    };
    FormobxLeafStore.prototype.setErrors = function (errors) {
        this.errors.replace(errors);
    };
    return FormobxLeafStore;
}());
exports.FormobxLeafStore = FormobxLeafStore;
__decorate([
    mobx_1.observable
], FormobxLeafStore.prototype, "value", void 0);
__decorate([
    mobx_1.computed
], FormobxLeafStore.prototype, "asProps", null);
__decorate([
    mobx_1.action
], FormobxLeafStore.prototype, "setInitialValues", null);
__decorate([
    mobx_1.action
], FormobxLeafStore.prototype, "setValue", null);
__decorate([
    mobx_1.action
], FormobxLeafStore.prototype, "clearErrors", null);
__decorate([
    mobx_1.action
], FormobxLeafStore.prototype, "setErrors", null);
//# sourceMappingURL=formobxLeafStore.js.map