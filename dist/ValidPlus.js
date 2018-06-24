(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ValidPlus"] = factory();
	else
		root["ValidPlus"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./validplus.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack://ValidPlus/./node_modules/process/browser.js?");

/***/ }),

/***/ "./src/Field.js":
/*!**********************!*\
  !*** ./src/Field.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _debug = __webpack_require__(/*! ./debug */ \"./src/debug.js\");\n\nvar _debug2 = _interopRequireDefault(_debug);\n\nvar _genError = __webpack_require__(/*! ./genError */ \"./src/genError.js\");\n\nvar _genError2 = _interopRequireDefault(_genError);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar VPField = function VPField(element, showsErrors) {\n  this.element = element;\n  this.showsErrors = showsErrors;\n\n  this.errors = {\n    _fields: [],\n    _messages: [],\n    remove: function remove(index) {\n      if (index < this._fields.length && index < this._messages.length) {\n        this._fields.splice(index, 1);\n        this._messages.splice(index, 1);\n      }\n    },\n    valid: function valid() {\n      console.log(this);\n      return this._messages.length === 0 && this._fields.length === 0;\n    },\n    message: function message(index) {\n      if (index < this._messages.length) return this._messages[index];\n      return null;\n    },\n    field: function field(index) {\n      if (index < this._fields.length) return this._fields[index];\n      return null;\n    },\n    push: function push(msg) {\n      if (typeof msg === 'string' && msg.length > 0) {\n        this._messages.push(msg);\n        this._fields.push((0, _genError2.default)(msg));\n      }\n    }\n  };\n\n  this.input = null;\n  this.getInput();\n};\n\nVPField.prototype.getInput = function () {\n  console.log('[VPField] Querying inputs');\n\n  var input = this.element.getElementsByTagName('input');\n  var select = this.element.getElementsByTagName('select');\n  var textarea = this.element.getElementsByTagName('textarea');\n\n  if (input.length > 0) console.log('[VPField] Found', input);\n  if (select.length > 0) console.log('[VPField] Found', select);\n  if (textarea.length > 0) console.log('[VPField] Found', textarea);\n\n  this.input = [].concat(Array.from(input), Array.from(select), Array.from(textarea))[0];\n};\n\nVPField.prototype.parseInput = function () {\n  if (!(this.input instanceof Element)) {\n    throw new Error('[VPField] Input must be an instance of Element');\n  }\n\n  var attr = this.input.attributes;\n\n  return {\n    value: this.input.value,\n    checked: this.input.checked,\n    message: (attr.getNamedItem('data-error-message') || {}).value,\n    type: (attr.getNamedItem('type') || {}).value,\n    name: (attr.getNamedItem('name') || {}).value,\n    rules: {\n      min: (attr.getNamedItem('min') || {}).value,\n      minLength: (attr.getNamedItem('minlength') || {}).value,\n      max: (attr.getNamedItem('max') || {}).value,\n      maxLength: (attr.getNamedItem('maxlength') || {}).value,\n      pattern: (attr.getNamedItem('pattern') || {}).value,\n      required: (attr.getNamedItem('required') || {}).specified || false\n    }\n  };\n};\n\nVPField.prototype.validate = function () {\n  var _parseInput = this.parseInput(),\n      value = _parseInput.value,\n      checked = _parseInput.checked,\n      message = _parseInput.message,\n      type = _parseInput.type,\n      name = _parseInput.name,\n      rules = _parseInput.rules;\n\n  if (rules.min) {\n    this.errors.push(+value >= +rules.min ? true : name + ' must be more than ' + rules.min + '.');\n  }\n  if (rules.max) {\n    this.errors.push(+value <= +rules.max ? true : name + ' must be less than ' + rules.max + '.');\n  }\n  if (rules.minLength) {\n    this.errors.push(value.length <= +rules.minLength ? true : name + ' must be longer than ' + rules.minLength + ' characters.');\n  }\n  if (rules.maxLength) {\n    this.errors.push(value.length >= +rules.maxLength ? true : name + ' must be shorter than ' + rules.maxLength + ' characters.');\n  }\n  if (rules.pattern) {\n    this.errors.push(new RegExp(rules.pattern).test(value) ? true : name + ' is incorrectly formatted.');\n  }\n\n  switch (type) {\n    case 'checkbox':\n      if (rules.required) {\n        this.errors.push(checked ? true : name + ' is required.');\n      }\n      break;\n    case 'radio':\n      // One should always be selected\n      this.errors.push(checked);\n      break;\n    default:\n      if (rules.required) {\n        this.errors.push(value.length > 0 ? true : name + ' is required.');\n      }\n  }\n\n  var status = this.errors.valid();\n  if (status !== true) {\n    // If message is defined, it overrides child messages, unless flagged to do otherwise\n    // TODO: Implement flag\n    if (typeof message === 'string' && message.length > 0) {}\n\n    if (this.showsErrors) this.appendError(this.status);\n  }\n\n  return status;\n};\n\nVPField.prototype.appendError = function (valid) {\n  if (valid) {}\n};\n\nexports.default = VPField;\n\n//# sourceURL=webpack://ValidPlus/./src/Field.js?");

/***/ }),

/***/ "./src/Fieldset.js":
/*!*************************!*\
  !*** ./src/Fieldset.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Field = __webpack_require__(/*! ./Field */ \"./src/Field.js\");\n\nvar _Field2 = _interopRequireDefault(_Field);\n\nvar _debug = __webpack_require__(/*! ./debug */ \"./src/debug.js\");\n\nvar _debug2 = _interopRequireDefault(_debug);\n\nvar _genError = __webpack_require__(/*! ./genError */ \"./src/genError.js\");\n\nvar _genError2 = _interopRequireDefault(_genError);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Options include\n// ---------------\n// showMessage: <false> - Fieldset level error shown\n// noChildren: <false> - No children errors (field level)\n// fieldClass: 'field' - Child 'Field' className\n//\n\nvar VPFieldset = function VPFieldset(element, strategy, options) {\n  var message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;\n\n  if (!(element instanceof Element)) {\n    throw new Error('[Fieldset] Valid Element is required.');\n  }\n  if (typeof strategy !== 'function') {\n    throw new Error('[Fieldset] Validation strategy passed is invalid.');\n  }\n\n  this.strategy = strategy;\n  this.element = element;\n  this.message = message;\n  this.fields = [];\n\n  this.error = null;\n  this._isValid = true;\n\n  this.options = Object.assign({\n    showMessage: false,\n    showChildren: false,\n    fieldClass: 'field'\n  }, options, {\n    showMessage: options.showMessage === true ? typeof message === 'string' ? true : false : false\n  });\n\n  this.findFields();\n};\n\nVPFieldset.prototype.isValid = function () {\n  this.validate();\n  return this._isValid;\n};\n\nVPFieldset.prototype.validate = function () {\n  var fieldSetStatus = this.fields.reduce(function (status, field) {\n    status.push(field.validate());\n    return status;\n  }, []);\n\n  // Strategy is expected to return true or false\n  this._isValid = this.strategy(fieldSetStatus);\n  if (this.options.showMessage) this.appendError(this._isValid);\n};\n\nVPFieldset.prototype.appendError = function (valid) {\n  if (valid) {\n    if (this.error === null) return;\n\n    this.element.removeChild(this.error);\n  } else {\n    var errors = (0, _genError2.default)('', 'errors');\n    errors.appendChild((0, _genError2.default)(this.message));\n\n    this.element.appendChild(errors);\n    this.error = errors;\n  }\n};\n\nVPFieldset.prototype.findFields = function () {\n  var vm = this;\n  var fields = Array.from(this.element.getElementsByClassName(this.options.fieldClass));\n  this.fields = fields.map(function (field) {\n    return new _Field2.default(field, vm.options.showChildren);\n  });\n  console.log(fields, this.fields);\n};\n\nexports.default = VPFieldset;\n\n//# sourceURL=webpack://ValidPlus/./src/Fieldset.js?");

/***/ }),

/***/ "./src/Validator.js":
/*!**************************!*\
  !*** ./src/Validator.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Fieldset = __webpack_require__(/*! ./Fieldset */ \"./src/Fieldset.js\");\n\nvar _Fieldset2 = _interopRequireDefault(_Fieldset);\n\nvar _debug = __webpack_require__(/*! ./debug */ \"./src/debug.js\");\n\nvar _debug2 = _interopRequireDefault(_debug);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Validator = function Validator() {\n  var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n\n  if (form === null) {\n    (0, _debug2.default)('[Validator] Non-strict fieldset matching.', 'Provide a form Element or ID to enable strict matching.');\n    this._form = null;\n    this._strict = false;\n  } else {\n    this._form = this.ElementOrID(form);\n\n    // TODO: Add strict support (can only add elements contained within the field)\n    this._strict = true;\n  }\n\n  this._strategies = {\n    'all': function all(fields) {\n      return fields.every(function (field) {\n        return field === true;\n      });\n    },\n    'some': function some(fields) {\n      return fields.some(function (field) {\n        return field === true;\n      });\n    },\n    'one': function one(fields) {\n      return fields.filter(function (field) {\n        return field === true;\n      }).length === 1;\n    }\n\n    // Fieldsets being tracked by Validator\n  };this._fieldsets = [];\n};\n\nValidator.prototype.ElementOrID = function (ElorID) {\n  if (ElorID instanceof Element) return ElorID;\n  if (typeof ElorID === 'string') {\n    var f = void 0;\n    if (this._form === null) {\n      f = document.getElementById(ElorID);\n    } else {\n      f = this._form.getElementById(ElorID);\n    }\n\n    if (f instanceof Element) return f;\n  }\n\n  return null;\n};\n\nValidator.prototype.isValid = function () {\n  return this._fieldsets.every(function (fieldset) {\n    return fieldset.isValid();\n  });\n};\n\n// TODO: Append Predefined Fields w/ CB logic\nValidator.prototype.addFieldset = function (fs, options) {\n  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n\n  var fieldset = this.ElementOrID(fs);\n  if (fieldset === null) {\n    (0, _debug2.default)('[Validator] Requires a valid fieldset HTMLElement.');\n    return false;\n  }\n\n  var strategy = this._strategies[options.strategy] || function () {\n    (0, _debug2.default)('[Validator] Invalid Validation Strategy');\n  };\n  this._fieldsets.push(new _Fieldset2.default(fieldset, strategy, options, message));\n};\n\nvar removeError = function removeError(el, errorMsg) {\n  if (!(el instanceof Element)) {\n    (0, _debug2.default)('[Validator] Element must be an HTMLElement.');\n    return;\n  }\n\n  var errors = Array.from(el.getElementsByClassName('error'));\n  errors.forEach(function (err) {\n    if (err.innerHTML === errorMsg) {\n      el.removeChild(err);\n    }\n  });\n};\n\nvar appendError = function appendError(el, msg) {\n  if (!(el instanceof Element)) {\n    (0, _debug2.default)('[Validator] Element must be an HTMLElement.');\n    return;\n  }\n\n  var error = generateError(msg);\n  var errors = el.getElementsByClassName('errors');\n\n  if (errors.length === 0) {\n    var _errors = generateError('', 'errors');\n    _errors.appendChild(error);\n    el.appendChild(_errors);\n  } else {\n    if (Array.from(errors[0].children).every(function (err) {\n      return err.innerHTML !== error.innerHTML;\n    })) {\n      errors[0].appendChild(error);\n    }\n  }\n};\n\nexports.default = Validator;\n\n//# sourceURL=webpack://ValidPlus/./src/Validator.js?");

/***/ }),

/***/ "./src/debug.js":
/*!**********************!*\
  !*** ./src/debug.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar env = ((process || {}).env || {}).NODE_ENV || 'production';\n\nexports.default = env === 'development' ? function () {\n  var _console;\n\n  for (var _len = arguments.length, msg = Array(_len), _key = 0; _key < _len; _key++) {\n    msg[_key] = arguments[_key];\n  }\n\n  return (_console = console).log.apply(_console, ['[Debug]'].concat(msg));\n} : function () {\n  return null;\n};\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack://ValidPlus/./src/debug.js?");

/***/ }),

/***/ "./src/genError.js":
/*!*************************!*\
  !*** ./src/genError.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (msg) {\n  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';\n\n  var error = document.createElement('div');\n  error.className = className;\n  error.innerHTML = msg;\n\n  return error;\n};\n\n//# sourceURL=webpack://ValidPlus/./src/genError.js?");

/***/ }),

/***/ "./validplus.js":
/*!**********************!*\
  !*** ./validplus.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Validator = __webpack_require__(/*! @/Validator */ \"./src/Validator.js\");\n\nvar _Validator2 = _interopRequireDefault(_Validator);\n\nvar _Fieldset = __webpack_require__(/*! @/Fieldset */ \"./src/Fieldset.js\");\n\nvar _Fieldset2 = _interopRequireDefault(_Fieldset);\n\nvar _Field = __webpack_require__(/*! @/Field */ \"./src/Field.js\");\n\nvar _Field2 = _interopRequireDefault(_Field);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar ValidPlus = {\n  Validator: _Validator2.default,\n  Fieldset: _Fieldset2.default,\n  Field: _Field2.default\n};\n\nexports.default = ValidPlus;\n\n//# sourceURL=webpack://ValidPlus/./validplus.js?");

/***/ })

/******/ });
});