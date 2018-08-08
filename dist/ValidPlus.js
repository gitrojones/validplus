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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _debug = __webpack_require__(/*! ./debug */ \"./src/debug.js\");\n\nvar _debug2 = _interopRequireDefault(_debug);\n\nvar _generateElement = __webpack_require__(/*! ./generateElement */ \"./src/generateElement.js\");\n\nvar _generateElement2 = _interopRequireDefault(_generateElement);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar VPField = function VPField(element, options) {\n  var onValidate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {\n    isValid: {\n      message: null,\n      cb: null\n    },\n    isInvalid: {\n      message: null,\n      cb: null\n    }\n  };\n\n  this.input = null;\n  this.element = element;\n  this.options = Object.assign({\n    showFieldErrors: false\n  }, options);\n  this._onValidation = onValidate;\n\n  this.messageNode = null;\n  this.messages = [];\n\n  this.getInput();\n};\n\nVPField.prototype.getInput = function () {\n  console.log('[VPField] Querying inputs');\n\n  var input = this.element.getElementsByTagName('input');\n  var select = this.element.getElementsByTagName('select');\n  var textarea = this.element.getElementsByTagName('textarea');\n\n  if (input.length > 0) console.log('[VPField] Found input', input);\n  if (select.length > 0) console.log('[VPField] Found select', select);\n  if (textarea.length > 0) console.log('[VPField] Found textarea', textarea);\n\n  this.input = [].concat(Array.from(input), Array.from(select), Array.from(textarea))[0];\n};\n\nVPField.prototype.parseInput = function () {\n  if (!(this.input instanceof Element)) {\n    throw new Error('[VPField] Input must be an instance of Element');\n  }\n\n  var attr = this.input.attributes;\n\n  return {\n    value: this.input.value,\n    checked: this.input.checked,\n    message: (attr.getNamedItem('data-error-message') || {}).value,\n    action: (attr.getNamedItem('data-callback') || {}).value,\n    type: (attr.getNamedItem('type') || {}).value,\n    name: (attr.getNamedItem('name') || {}).value,\n    rules: {\n      min: (attr.getNamedItem('min') || {}).value,\n      minLength: (attr.getNamedItem('minlength') || {}).value,\n      max: (attr.getNamedItem('max') || {}).value,\n      maxLength: (attr.getNamedItem('maxlength') || {}).value,\n      pattern: (attr.getNamedItem('pattern') || {}).value,\n      required: (attr.getNamedItem('required') || {}).specified || false\n    }\n  };\n};\n\nVPField.prototype.isValid = function () {\n  var _this = this;\n\n  var _parseInput = this.parseInput(),\n      value = _parseInput.value,\n      checked = _parseInput.checked,\n      message = _parseInput.message,\n      action = _parseInput.action,\n      type = _parseInput.type,\n      name = _parseInput.name,\n      rules = _parseInput.rules;\n\n  var errors = [];\n  if (rules.min) {\n    errors.push(+value >= +rules.min ? true : name + ' must be more than ' + rules.min + '.');\n  }\n  if (rules.max) {\n    errors.push(+value <= +rules.max ? true : name + ' must be less than ' + rules.max + '.');\n  }\n  if (rules.minLength) {\n    errors.push(value.length <= +rules.minLength ? true : name + ' must be longer than ' + rules.minLength + ' characters.');\n  }\n  if (rules.maxLength) {\n    errors.push(value.length >= +rules.maxLength ? true : name + ' must be shorter than ' + rules.maxLength + ' characters.');\n  }\n  if (rules.pattern) {\n    errors.push(new RegExp(rules.pattern).test(value) ? true : name + ' is incorrectly formatted.');\n  }\n\n  switch (type) {\n    case 'checkbox':\n      if (rules.required) {\n        errors.push(checked ? true : name + ' is required.');\n      }\n      break;\n    case 'radio':\n      // One should always be selected\n      errors.push(checked);\n      break;\n    default:\n      if (rules.required) {\n        errors.push(value.length > 0 ? true : name + ' is required.');\n      }\n  }\n\n  var isValid = errors.every(function (err) {\n    return err === true;\n  });\n  if (isValid) {\n    if (typeof this._onValidation.isValid.cb === 'function') {\n      this._onValidation.isValid.cb();\n    }\n    if (typeof this._onValidation.isValid.message === 'string') {\n      this.appendMessage(this._onValidation.isValid.message, '-isValid');\n    }\n  } else {\n    if (typeof this._onValidation.isInvalid.cb === 'function') {\n      this._onValidation.isInvalid.cb();\n    }\n\n    if (this.options.showFieldErrors) {\n      errors.filter(function (err) {\n        return typeof err === 'string';\n      }).forEach(function (err) {\n        _this.appendMessage(err, '-isError');\n      });\n    }\n\n    if (typeof this._onValidation.isInvalid.message === 'string') {\n      this.appendMessage(this._onValidation.isInvalid.message, '-isError');\n    }\n  }\n\n  return isValid;\n};\n\nVPField.prototype.clearMessages = function () {\n  undefined.element.removeChild(undefined._messageNode);\n};\n\nVPField.prototype.removeMessage = function (message) {\n  if (!(undefined._messageNode instanceof Element)) {\n    console.log('[VPField] MessageNode isn\\'t set');\n    return;\n  }\n\n  Array.from(undefined._messageNode.children).forEach(function (child) {\n    if (child.innerHTML === message) {\n      undefined._messageNode.removeChild(child);\n    }\n  });\n};\n\nVPField.prototype.appendMessage = function (message, status) {\n  var msg = (0, _generateElement2.default)(message, 'VPMessage ' + status);\n  var messages = undefined._messageNode;\n\n  if (messages === null) {\n    var _messages = (0, _generateElement2.default)('', 'VPMessages');\n    _messages.appendChild(msg);\n\n    undefined.element.appendChild(_messages);\n    undefined._messageNode = _messages;\n  } else {\n    if (Array.from(undefined._messageNode.children).every(function (m) {\n      return m.innerHTML !== msg.innerHTML;\n    })) {\n      undefined._messageNode.appendChild(msg);\n    }\n  }\n};\n\nexports.default = VPField;\n\n//# sourceURL=webpack://ValidPlus/./src/Field.js?");

/***/ }),

/***/ "./src/Fieldset.js":
/*!*************************!*\
  !*** ./src/Fieldset.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Field = __webpack_require__(/*! ./Field */ \"./src/Field.js\");\n\nvar _Field2 = _interopRequireDefault(_Field);\n\nvar _debug = __webpack_require__(/*! ./debug */ \"./src/debug.js\");\n\nvar _debug2 = _interopRequireDefault(_debug);\n\nvar _generateElement = __webpack_require__(/*! ./generateElement */ \"./src/generateElement.js\");\n\nvar _generateElement2 = _interopRequireDefault(_generateElement);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Options include\n// ---------------\n// showMessage: <false> - Fieldset level error shown\n// noChildren: <false> - No children errors (field level)\n// fieldClass: 'field' - Child 'Field' className\n//\n\nvar VPFieldset = function VPFieldset(element, strategy, options) {\n  var onValidate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {\n    isValid: {\n      message: null,\n      cb: null\n    },\n    isInvalid: {\n      message: null,\n      cb: null\n    }\n  };\n\n  if (!(element instanceof Element)) {\n    throw new Error('[VPFieldset] Valid Element is required.');\n  }\n  if (typeof strategy !== 'function') {\n    throw new Error('[VPFieldset] Validation strategy passed is invalid.');\n  }\n\n  this.strategy = strategy;\n  this.element = element;\n  this._onValidation = onValidate;\n  this._fields = [];\n\n  this._messageNode = null;\n  this._messages = [];\n\n  this.options = Object.assign({\n    showMessage: false,\n    showChildren: false,\n    fieldClass: 'VPField'\n  }, options);\n\n  // this.findFields()\n};\n\nVPFieldset.prototype.isValid = function () {\n  var fieldSetStatus = this._fields.reduce(function (status, field, index) {\n    console.log('[VPFieldset] Validating field', index);\n    status.push(field.isValid());\n    return status;\n  }, []);\n\n  var isValid = this.strategy(fieldSetStatus);\n  if (isValid) {\n    if (typeof this._onValidation.isValid.cb === 'function') {\n      this._onValidation.isValid.cb();\n    }\n    if (typeof this._onValidation.isValid.message === 'string') {\n      this.appendMessage(this._onValidation.isValid.message, '-isValid');\n    }\n  } else {\n    if (typeof this._onValidation.isInvalid.cb === 'function') {\n      this._onValidation.isInvalid.cb();\n    }\n    if (typeof this._onValidation.isInvalid.message === 'string') {\n      this.appendMessage(this._onValidation.isInvalid.message, '-isError');\n    }\n  }\n\n  return isValid;\n};\n\nVPFieldset.prototype.clearMessages = function () {\n  undefined.element.removeChild(undefined._messageNode);\n};\n\nVPFieldset.prototype.removeMessage = function (message) {\n  if (!(undefined._messageNode instanceof Element)) {\n    console.log('[VPFieldset] MessageNode isn\\'t set');\n    return;\n  }\n\n  Array.from(undefined._messageNode.children).forEach(function (child) {\n    if (child.innerHTML === message) {\n      undefined._messageNode.removeChild(child);\n    }\n  });\n};\n\nVPFieldset.prototype.appendMessage = function (message, status) {\n  var msg = (0, _generateElement2.default)(message, 'VPMessage ' + status);\n  var messages = undefined._messageNode;\n\n  if (messages === null) {\n    var _messages = (0, _generateElement2.default)('', 'VPMessages');\n    _messages.appendChild(msg);\n\n    undefined.element.appendChild(_messages);\n    undefined._messageNode = _messages;\n  } else {\n    if (Array.from(undefined._messageNode.children).every(function (m) {\n      return m.innerHTML !== msg.innerHTML;\n    })) {\n      undefined._messageNode.appendChild(msg);\n    }\n  }\n};\n\nVPFieldset.prototype.removeField = function (field) {\n  if (!(field instanceof _Field2.default)) {\n    throw new Error('[VPFieldset] Field must be an instanceof VPField');\n  }\n\n  var index = this._fields.indexOf(field);\n  if (index !== -1) {\n    this._fields = this._fields.splice(index, 1);\n  }\n};\n\nVPFieldset.prototype.addNewField = function (field) {\n  if (!(field instanceof _Field2.default)) {\n    throw new Error('[VPFieldset] Field must be an instanceof VPField');\n  }\n  this._fields.push(field);\n};\n\n// TODO: Enforce onValidate structure\nVPFieldset.prototype.createNewField = function (el, options, onValidate) {\n  if (!(el instanceof Element)) {\n    throw new Error('[VPFieldset] Field Element must be a valid DOMElement.');\n  }\n\n  this._fields.push(new _Field2.default(el, options, onValidate));\n};\nVPFieldset.prototype.findFields = function () {\n  var vm = this;\n  var fields = Array.from(this.element.getElementsByClassName(this.options.fieldClass));\n  // TODO: Attribute parsing to fill in the gaps\n  this._fields = fields.map(function (field) {\n    return new _Field2.default(field, {});\n  });\n};\n\nexports.default = VPFieldset;\n\n//# sourceURL=webpack://ValidPlus/./src/Fieldset.js?");

/***/ }),

/***/ "./src/Validator.js":
/*!**************************!*\
  !*** ./src/Validator.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Fieldset = __webpack_require__(/*! ./Fieldset */ \"./src/Fieldset.js\");\n\nvar _Fieldset2 = _interopRequireDefault(_Fieldset);\n\nvar _generateElement = __webpack_require__(/*! ./generateElement */ \"./src/generateElement.js\");\n\nvar _generateElement2 = _interopRequireDefault(_generateElement);\n\nvar _debug = __webpack_require__(/*! ./debug */ \"./src/debug.js\");\n\nvar _debug2 = _interopRequireDefault(_debug);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Validator = function Validator(options) {\n  var form = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n  if (form === null) {\n    (0, _debug2.default)('[Validator] Non-strict fieldset matching.', 'Provide a form Element or ID to enable strict matching.');\n    this._form = null;\n    this._strict = false;\n\n    // Fieldsets being tracked by Validator\n    this._fieldsets = [];\n  } else {\n    this._form = ElementOrID(form);\n\n    // TODO: Add strict support (can only add elements contained within the field)\n    this._strict = true;\n\n    // TODO: Add child detection\n    this._fieldsets = []; // GetChildFieldsets\n  }\n\n  this.validationInputs = ['input', 'messagebox', 'select'];\n  if (Array.isArray(options.validationInputs)) {\n    this._options.validationInputs = this._options.validationInputs.concat(options.valiationInputs);\n  }\n\n  // TODO: Validate options\n  // TODO: Allow toggling options on whether to show messages or fire callbacks\n  this._onValidation = Object.assign({\n    isValid: {\n      cb: null,\n      message: null\n    },\n    isInvalid: {\n      cb: null,\n      message: null\n    }\n  }, options.onValidation);\n\n  this._messageNode = null;\n  this._messages = [];\n\n  this._strategies = {\n    'all': function all(fields) {\n      return fields.every(function (field) {\n        return field === true;\n      });\n    },\n    'some': function some(fields) {\n      return fields.some(function (field) {\n        return field === true;\n      });\n    },\n    'one': function one(fields) {\n      return fields.filter(function (field) {\n        return field === true;\n      }).length === 1;\n    }\n  };\n};\n\nValidator.prototype.isValid = function () {\n  var isValid = this._fieldsets.every(function (fieldset) {\n    return fieldset.isValid();\n  });\n\n  if (isValid) {\n    if (typeof this._onValidation.isValid.cb === 'function') {\n      this._onValidation.isValid.cb();\n    }\n    if (typeof this._onValidation.isValid.message === 'string') {\n      this.appendMessage(this._onValidation.isValid.message, '-isValid');\n    }\n  } else {\n    if (typeof this._onValidation.isInvalid.cb === 'function') {\n      this._onValidation.isInvalid.cb();\n    }\n    if (typeof this._onValidation.isInvalid.message === 'string') {\n      this.appendMessage(this._onValidation.isInvalid.message, '-isValid');\n    }\n  }\n\n  return isValid;\n};\n\n// TODO: Child state checks\n// TODO: Add MutationObserver on children\nValidator.prototype.addFieldset = function (fieldset) {\n  if (fieldset instanceof _Fieldset2.default) {\n    this._fieldsets.push(fieldset);\n  } else {\n    throw new Error('[Validator] Fieldset must be an instanceof VPFieldset');\n  }\n};\n\n// TODO: Remove MutationObserver on children\nValidator.prototype.removeFieldset = function (fieldset) {\n  var index = this._fieldsets.indexOf(fieldset);\n  if (index !== -1) {\n    this._fieldsets = this._fieldsets.splice(index, 1);\n  }\n};\n\n// TODO: Append Predefined Fields w/ CB logic\n// TODO: Validate onValidate structure\n// TODO: Add MutationObserver on children\nValidator.prototype.createFieldset = function (fs, options) {\n  var onValidate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {\n    isValid: {\n      cb: null,\n      message: null\n    },\n    isInvalid: {\n      cb: null,\n      message: null\n    }\n  };\n\n  var fieldset = ElementOrID(fs, this._form);\n\n  if (fieldset === null) {\n    (0, _debug2.default)('[Validator] Requires a valid fieldset HTMLElement.');\n    return false;\n  }\n\n  var strategy = this._strategies[options.strategy] || function () {\n    throw new Error('[Validator] Invalid Validation Strategy');\n  };\n\n  this._fieldsets.push(new _Fieldset2.default(fieldset, strategy, options, onValidate));\n};\n\nValidator.prototype.clearMessages = function () {\n  undefined._form.removeChild(undefined._messageNode);\n};\n\nValidator.prototype.removeMessage = function (message) {\n  if (!(undefined._messageNode instanceof Element)) {\n    console.log('[Validator] MessageNode isn\\'t set');\n    return;\n  }\n\n  Array.from(undefined._messageNode.children).forEach(function (child) {\n    if (child.innerHTML === message) {\n      undefined._messageNode.removeChild(child);\n    }\n  });\n};\n\nValidator.prototype.appendMessage = function (message, status) {\n  var msg = (0, _generateElement2.default)(message, 'VPMessage ' + status);\n  var messages = undefined._messageNode;\n\n  if (messages === null) {\n    var _messages = (0, _generateElement2.default)('', 'VPMessages');\n    _messages.appendChild(msg);\n\n    undefined._form.appendChild(_messages);\n    undefined._messageNode = _messages;\n  } else {\n    if (Array.from(undefined._messageNode.children).every(function (m) {\n      return m.innerHTML !== msg.innerHTML;\n    })) {\n      undefined._messageNode.appendChild(msg);\n    }\n  }\n};\n\n// TODO: Strict enforcement\nvar ElementOrID = function ElementOrID(ElorID) {\n  var form = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n  if (ElorID instanceof Element) return ElorID;\n  if (typeof ElorID === 'string') {\n    var f = form !== null && form instanceof Element ? form.getElemenyById(ElorID) : document.getElementById(ElorID);\n\n    if (f instanceof Element) return f;\n  }\n\n  return null;\n};\n\nexports.default = Validator;\n\n//# sourceURL=webpack://ValidPlus/./src/Validator.js?");

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

/***/ "./src/generateElement.js":
/*!********************************!*\
  !*** ./src/generateElement.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (message, className) {\n  var el = document.createElement('div');\n  el.className = className;\n  el.innerHTML = message;\n\n  return el;\n};\n\n//# sourceURL=webpack://ValidPlus/./src/generateElement.js?");

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