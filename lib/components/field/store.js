"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var mobx_1 = require("mobx");
var Store = (function () {
    function Store() {
        this.errors = mobx_1.observable([]);
    }
    Object.defineProperty(Store.prototype, "asProps", {
        get: function () {
            var _this = this;
            return {
                onChange: function (e) {
                    var target = e.target;
                    _this.updateValue(target.value);
                },
                value: this.value
            };
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.updateValue = function (val) {
        this.value = val;
    };
    Store.prototype.clearErrors = function () {
        this.errors.clear();
    };
    Store.prototype.updateErrors = function (errors) {
        this.errors.replace(errors);
    };
    return Store;
}());
exports.Store = Store;
__decorate([
    mobx_1.observable
], Store.prototype, "value", void 0);
__decorate([
    mobx_1.computed
], Store.prototype, "asProps", null);
__decorate([
    mobx_1.action
], Store.prototype, "updateValue", null);
__decorate([
    mobx_1.action
], Store.prototype, "clearErrors", null);
__decorate([
    mobx_1.action
], Store.prototype, "updateErrors", null);
//# sourceMappingURL=store.js.map