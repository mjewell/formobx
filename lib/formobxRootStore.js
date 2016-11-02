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
var formobxNodeStore_1 = require("./formobxNodeStore");
var mobx_1 = require("mobx");
var FormobxRootStore = (function (_super) {
    __extends(FormobxRootStore, _super);
    function FormobxRootStore(options) {
        var _this = _super.call(this) || this;
        _this.submitting = false;
        _this.initialValues = options.initialValues || {};
        return _this;
    }
    FormobxRootStore.prototype.setSubmitting = function (submitting) {
        this.submitting = submitting;
    };
    return FormobxRootStore;
}(formobxNodeStore_1.FormobxNodeStore));
exports.FormobxRootStore = FormobxRootStore;
__decorate([
    mobx_1.observable
], FormobxRootStore.prototype, "submitting", void 0);
__decorate([
    mobx_1.action
], FormobxRootStore.prototype, "setSubmitting", null);
//# sourceMappingURL=formobxRootStore.js.map