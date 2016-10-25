"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var formobxNodeStore_1 = require("../../formobxNodeStore");
var React = require("react");
var Section = (function (_super) {
    __extends(Section, _super);
    function Section(props, context) {
        var _this = _super.call(this, props, context) || this;
        if (!context.parentStore) {
            throw new Error('Sections must be used inside a component decorated with formobx');
        }
        _this.store = new formobxNodeStore_1.FormobxNodeStore();
        return _this;
    }
    Section.prototype.getChildContext = function () {
        return { parentStore: this.store };
    };
    Section.prototype.componentDidMount = function () {
        this.context.parentStore.registerField(this.props.name, this.store);
    };
    Section.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return Section;
}(React.Component));
exports.Section = Section;
Section.contextTypes = {
    parentStore: React.PropTypes.object.isRequired
};
Section.childContextTypes = {
    parentStore: React.PropTypes.object
};
//# sourceMappingURL=component.js.map