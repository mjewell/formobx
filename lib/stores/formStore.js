"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var objectStore_1 = require("./objectStore");
var mobx_1 = require("mobx");
var FormStore = (function (_super) {
    __extends(FormStore, _super);
    function FormStore(options) {
        var _this = _super.call(this) || this;
        _this.submitting = false;
        _this.setInitialValues(options.initialValues);
        return _this;
    }
    FormStore.prototype.setSubmitting = function (submitting) {
        this.submitting = submitting;
    };
    return FormStore;
}(objectStore_1.ObjectStore));
__decorate([
    mobx_1.observable
], FormStore.prototype, "submitting", void 0);
__decorate([
    mobx_1.action
], FormStore.prototype, "setSubmitting", null);
exports.FormStore = FormStore;
//# sourceMappingURL=formStore.js.map