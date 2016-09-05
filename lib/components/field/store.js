'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2;

var _mobx = require('mobx');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Store = (_class = function () {
  function Store() {
    _classCallCheck(this, Store);

    _initDefineProp(this, 'value', _descriptor, this);

    _initDefineProp(this, 'errors', _descriptor2, this);
  }

  _createClass(Store, [{
    key: 'updateValue',
    value: function updateValue(val) {
      this.value = val;
    }
  }, {
    key: 'clearErrors',
    value: function clearErrors() {
      this.errors.clear();
    }
  }, {
    key: 'updateErrors',
    value: function updateErrors(errors) {
      this.errors.replace(errors);
    }
  }, {
    key: 'asProps',
    get: function get() {
      var _this = this;

      return {
        defaultValue: this.value,
        onChange: function onChange(e) {
          _this.updateValue(e.target.value);
        }
      };
    }
  }]);

  return Store;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'value', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'errors', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, 'asProps', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'asProps'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateValue', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearErrors', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'clearErrors'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateErrors', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateErrors'), _class.prototype)), _class);
exports.default = Store;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Store, 'Store', 'src/components/field/store.js');
})();

;