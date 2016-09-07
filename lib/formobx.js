'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = formobx;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function wrapOnSubmit(store, callback) {
  return function onSubmit(e) {
    e.preventDefault();
    store.updateSubmitting(true);
    store.clearErrors();
    Promise.resolve(callback(store.fieldValues)).catch(function (result) {
      return store.updateAllErrors(result);
    }).then(function () {
      return store.updateSubmitting(false);
    });
  };
}

function formobx(component, options) {
  var Form = function (_Component) {
    _inherits(Form, _Component);

    function Form(props) {
      _classCallCheck(this, Form);

      var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

      _this.store = new _store2.default(options);
      _this.component = component;

      if (options.onSubmit) {
        _this.onSubmit = wrapOnSubmit(_this.store, options.onSubmit);
      }
      return _this;
    }

    _createClass(Form, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return { formStore: this.store };
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(this.component, _extends({}, this.props, {
          form: this.store,
          onSubmit: this.onSubmit
        }));
      }
    }]);

    return Form;
  }(_react.Component);

  Form.childContextTypes = {
    formStore: _react2.default.PropTypes.object
  };

  return Form;
}
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(wrapOnSubmit, 'wrapOnSubmit', 'src/formobx.jsx');

  __REACT_HOT_LOADER__.register(formobx, 'formobx', 'src/formobx.jsx');
})();

;