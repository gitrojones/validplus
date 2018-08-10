!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ValidPlus=t():e.ValidPlus=t()}(window,function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=12)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,s=i(9),r=(n=s)&&n.__esModule?n:{default:n};t.default={clearMessages:function(){if(this._messageNode instanceof Element)for(;this._messageNode.firstChild;)this._messageNode.removeChild(this._messageNode.firstChild)},removeMessage:function(e){var t=this;this._messageNode instanceof Element&&Array.from(this._messageNode.children).forEach(function(i){i.innerHTML===e&&t._messageNode.removeChild(i)})},addMessage:function(e){return function(t,i){var n=(0,r.default)(t,e+" "+i);if(null===this._messageNode){var s=(0,r.default)("",e+"s"),o=this.options.messageAnchor||this.element;if(!(o instanceof Element))return;switch(s.appendChild(n),this.options.messagePOS){case"top":o.prepend(s);break;case"bottom":default:o.appendChild(s)}this._messageNode=s}else Array.from(this._messageNode.children).every(function(e){return e.innerHTML!==n.innerHTML})&&this._messageNode.appendChild(n)}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={addEventListener:function(e,t){e in this.listeners||(this.listeners[e]=[]),this.listeners[e].push(t)},removeEventListener:function(e,t){if(e in this.listeners)for(var i=this.listeners[e],n=0,s=i.length;n<s;n++)if(i[n]===t)return void i.splice(n,1)},dispatchEvent:function(e,t){if(!(e.type in this.listeners))return!0;for(var i=this.listeners[e.type].slice(),n=0,s=i.length;n<s;n++)i[n].call(this,e,t);return!e.defaultPrevented}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function s(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var r=function(e){return e&&"object"===(void 0===e?"undefined":n(e))&&!Array.isArray(e)};t.default=function e(t){for(var i=arguments.length,n=Array(i>1?i-1:0),o=1;o<i;o++)n[o-1]=arguments[o];if(!n.length)return t;var a=n.shift();if(r(t)&&r(a))for(var l in a)r(a[l])?(t[l]||Object.assign(t,s({},l,{})),e(t[l],a[l])):Object.assign(t,s({},l,a[l]));return e.apply(void 0,[t].concat(n))}},function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var i=((e||{}).env||{}).NODE_ENV||"production";t.default="development"===i?function(){for(var e,t=arguments.length,i=Array(t),n=0;n<t;n++)i[n]=arguments[n];return(e=console).log.apply(e,["[Debug]"].concat(i))}:function(){return null}}).call(this,i(10))},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(i(3)),s=a(i(2)),r=a(i(1)),o=a(i(0));function a(e){return e&&e.__esModule?e:{default:e}}var l=function(e,t,i){var n=this,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};this.input=null,this.element=e,this.listeners={},this.canValidate=!0,this.options=Object.assign({formatter:{pre:null,post:null},errorClass:"-isError",messageAnchor:null,messagePOS:"bottom",showFieldErrors:!1,dirtyOnBlur:!1,validateOnBlur:!0,watch:!0},t),this._onValidation=(0,s.default)({isValid:{message:null,cb:null},isInvalid:{message:null,cb:null}},r),this._customRules=i,this._messageNode=null,this._messages=[],this._isValid=null,this._dirty=!1,this.getInput(),!0===this.options.watch&&this.input instanceof Element&&(["radio","checkbox"].includes(this.input.attributes.getNamedItem("type"))?this.input.addEventListener("change",function(){if(!1===n.options.dirtyOnBlur&&(n._dirty=!0),!0===n.canValidate&&!0===n._dirty){var e=null!==n._isValid,t=n.isValid();e&&n.dispatchEvent(new Event("onValidate",{bubbles:!1,cancelable:!1}),t)}}):this.input.addEventListener("input",function(){if(!1===n.options.dirtyOnBlur&&(n._dirty=!0),!0===n.canValidate&&!0===n._dirty){var e=null!==n._isValid,t=n.isValid();e&&n.dispatchEvent(new Event("onValidate",{bubbles:!1,cancelable:!1}),t)}}),this.input.addEventListener("blur",function(){if(n._dirty=!0,n.options.validateOnBlur){var e=n.isValid();n.dispatchEvent(new Event("onValidate",{bubbles:!1,cancelable:!1}),e)}}))};l.prototype.parseInput=function(){if(!(this.input instanceof Element))throw new Error("[VPField] Input must be an instance of Element");this.input.attributes;return{value:this.input.value,checked:this.input.checked,type:this.input.getAttribute("type"),name:this.input.getAttribute("data-name")||this.input.getAttribute("name"),rules:{min:this.input.getAttribute("min"),minLength:this.input.getAttribute("minlength"),max:this.input.getAttribute("max"),maxLength:this.input.getAttribute("maxlength"),pattern:this.input.getAttribute("pattern"),required:this.input.getAttribute("required")||!1}}},l.prototype.getInput=function(){(0,n.default)("[VPField] Querying inputs");var e=this.element.getElementsByTagName("input"),t=this.element.getElementsByTagName("select"),i=this.element.getElementsByTagName("textarea");e.length>0&&(0,n.default)("[VPField] Found input",e),t.length>0&&(0,n.default)("[VPField] Found select",t),i.length>0&&(0,n.default)("[VPField] Found textarea",i),this.input=[].concat(Array.from(e),Array.from(t),Array.from(i))[0]},l.prototype.isValid=function(){var e=this;this.canValidate=!1,"function"==typeof this.options.formatter.pre&&this.options.formatter.pre(this.input);var t=this.parseInput(),i=t.value,n=t.checked,s=(t.message,t.action,t.type),r=t.name,o=t.rules,a=[];switch("function"==typeof this._customRules?a.push(this._customRules(t,this.element,this.input)):Array.isArray(this._customRules)&&(a=a.concat(this._customRules.map(function(i){return"function"!=typeof i||i(t,e.element,e.input)}))),o.min&&a.push(+i>=+o.min||r+" must be more than "+o.min+"."),o.max&&a.push(+i<=+o.max||r+" must be less than "+o.max+"."),o.minLength&&a.push(i.length>=+o.minLength||r+" must be "+o.minLength+" characters or more."),o.maxLength&&a.push(i.length<=+o.maxLength||r+" must be "+o.maxLength+" characters or less."),o.pattern&&a.push(!!new RegExp(o.pattern).test(i)||r+" is incorrectly formatted."),s){case"checkbox":o.required&&a.push(!!n||r+" is required.");break;case"radio":a.push(n);break;default:o.required&&a.push(i.length>0||r+" is required.")}return this.clearMessages(),this._isValid=a.every(function(e){return!0===e}),"string"==typeof pre&&this.addMessage(pre,"-isInfo"),this._isValid?(this.element.classList.remove(this.options.errorClass),"function"==typeof this._onValidation.isValid.cb&&this._onValidation.isValid.cb(),"string"==typeof this._onValidation.isValid.message&&this.addMessage(this._onValidation.isValid.message,"-isValid")):(this.element.classList.add(this.options.errorClass),"function"==typeof this._onValidation.isInvalid.cb&&this._onValidation.isInvalid.cb(),this.options.showFieldErrors&&a.filter(function(e){return"string"==typeof e}).forEach(function(t){e.addMessage(t,"-isError")}),"string"==typeof this._onValidation.isInvalid.message&&this.addMessage(this._onValidation.isInvalid.message,"-isError")),"function"==typeof this.options.formatter.post&&this.options.formatter.post(this.input,i),this.canValidate=!0,this._isValid},l.prototype.listeners=null,l.prototype.addEventListener=r.default.addEventListener,l.prototype.removeEventListener=r.default.removeEventListener,l.prototype.dispatchEvent=r.default.dispatchEvent,l.prototype.clearMessages=o.default.clearMessages,l.prototype.removeMessage=o.default.removeMessage,l.prototype.addMessage=o.default.addMessage("VPMessage"),t.default=l},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=l(i(4)),s=l(i(3)),r=l(i(2)),o=l(i(1)),a=l(i(0));function l(e){return e&&e.__esModule?e:{default:e}}var u=function(e,t,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(!(e instanceof Element))throw new Error("[VPFieldset] Valid Element is required.");if("function"!=typeof t)throw new Error("[VPFieldset] Validation strategy passed is invalid.");this.strategy=t,this.element=e,this.listeners={},this.options=Object.assign({fieldClass:"VPField",errorClass:"-isError",messageAnchor:null,messagePOS:"bottom",scrollAnchor:null,scrollTo:!0,watch:!0},i),this._onValidation=(0,r.default)({isValid:{message:null,cb:null},isInvalid:{message:null,cb:null}},n),this._fields=[],this._isValid=null,this._messageNode=null,this._messages=[]};u.prototype.isValid=function(){var e=this._fields.reduce(function(e,t,i){return(0,s.default)("[VPFieldset] Validating field",i),e.push(t.isValid()),e},[]);if(this.clearMessages(),this._isValid=this.strategy(e),this._isValid)this.element.classList.remove(this.options.errorClass),"function"==typeof this._onValidation.isValid.cb&&this._onValidation.isValid.cb(),"string"==typeof this._onValidation.isValid.message&&this.addMessage(this._onValidation.isValid.message,"-isValid");else{if(this.element.classList.add(this.options.errorClass),!0===this.options.scrollTo)if(this.options.scrollAnchor instanceof Element)this.options.scrollAnchor.scrollIntoView();else this._fields.filter(function(e){return!1===e._isValid})[0].element.scrollIntoView();"function"==typeof this._onValidation.isInvalid.cb&&this._onValidation.isInvalid.cb(),"string"==typeof this._onValidation.isInvalid.message&&this.addMessage(this._onValidation.isInvalid.message,"-isError")}return this._isValid},u.prototype.removeField=function(e){if(!(e instanceof n.default))throw new Error("[VPFieldset] Field must be an instanceof VPField");var t=this._fields.indexOf(e);-1!==t&&(this._fields=this._fields.splice(t,1))},u.prototype.watchField=function(e){var t=this;if(!(e instanceof n.default))throw new Error("Field must be an instance of VPField");e.addEventListener("onValidate",function(e,i){var n=t.isValid();null!==t._isValid&&t.dispatchEvent(new Event("onValidate",{bubbles:!1,cancelable:!1}),n)})},u.prototype.addField=function(e){if(!(e instanceof n.default))throw new Error("[VPFieldset] Field must be an instanceof VPField");(0,s.default)("[VPFieldset] Adding field"),this._fields.push(e),!0===this.options.watch&&this.watchField(e)},u.prototype.createField=function(e,t,i,s){if(!(e instanceof Element))throw new Error("[VPFieldset] Field Element must be a valid DOMElement.");var r=new n.default(e,t,i,s);return this._fields.push(r),!0===this.options.watch&&this.watchField(r),r},u.prototype.findFields=function(){var e=Array.from(this.element.getElementsByClassName(this.options.fieldClass));this._fields=e.map(function(e){return new n.default(e,{})})},u.prototype.listeners=null,u.prototype.addEventListener=o.default.addEventListener,u.prototype.removeEventListener=o.default.removeEventListener,u.prototype.dispatchEvent=o.default.dispatchEvent,u.prototype.clearMessages=a.default.clearMessages,u.prototype.removeMessage=a.default.removeMessage,u.prototype.addMessage=a.default.addMessage("VPMessage"),t.default=u},function(e,t,i){"use strict";"".trim||(String.prototype.trim=function(){return this.replace(/^[s﻿]+|[s﻿]+$/g,"")}),function(e){function t(e,t){if(""===t)throw new DOMException("Failed to execute '"+e+"' on 'DOMTokenList': The token provided must not be empty.");if(-1!==(wsI=t.search(wsRE)))throw new DOMException("Failed to execute '"+e+"' on 'DOMTokenList': The token provided ('"+t[wsI]+"') contains HTML space characters, which are not valid in tokens.")}var i,n;"function"!=typeof DOMTokenList&&function(e){var i=e.document,n=e.Object,s=n.prototype.hasOwnProperty,r=n.defineProperty,o=0,a=0,l=(e.Element,/[\11\12\14\15\40]/);function u(){if(!o)throw TypeError("Illegal constructor")}function d(){var t=e.event,i=t.propertyName;if(!a&&("className"===i||"classList"===i&&!r)){var n=t.srcElement,s=n[" uCLp"],o=""+n[i],u=o.trim().split(l),d=n["classList"===i?" uCL":"classList"],c=s.length;e:for(var f=0,h=s.length=u.length,p=0;f!==h;++f){for(var m=0;m!==f;++m)if(u[m]===u[f]){p++;continue e}d[f-p]=u[f]}for(var v=h-p;v<c;++v)delete d[v];if("classList"!==i)return;a=1,n.classList=d,n.className=o,a=0,d.length=u.length-p}}function c(e){if(!(e&&"innerHTML"in e))throw TypeError("Illegal invocation");srcEle.detachEvent("onpropertychange",d),o=1;try{new u}finally{o=0}var t=protoObj.prototype,i=new protoObj;e:for(var n=e.className.trim().split(l),s=0,c=n.length,f=0;s!==c;++s){for(var h=0;h!==s;++h)if(n[h]===n[s]){f++;continue e}this[s-f]=n[s]}t.length=Len-f,t.value=e.className,t[" uCL"]=e,r?(r(e,"classList",{enumerable:1,get:function(){return i},configurable:0,set:function(n){a=1,e.className=t.value=n+="",a=0;var s=n.trim().split(l),r=t.length;e:for(var o=0,u=t.length=s.length,d=0;o!==u;++o){for(var c=0;c!==o;++c)if(s[c]===s[o]){d++;continue e}i[o-d]=s[o]}for(var f=u-d;f<r;++f)delete i[f]}}),r(e," uCLp",{enumerable:0,configurable:0,writeable:0,value:protoObj.prototype}),r(t," uCL",{enumerable:0,configurable:0,writeable:0,value:e})):(e.classList=i,e[" uCL"]=i,e[" uCLp"]=protoObj.prototype),srcEle.attachEvent("onpropertychange",d)}u.prototype.toString=u.prototype.toLocaleString=function(){return this.value},u.prototype.add=function(){e:for(var e=0,i=arguments.length,n="",s=this.uCL,r=s[" uCLp"];e!==i;++e){t("add",n=arguments[e]+"");for(var o=0,l=r.length,u=n;o!==l;++o){if(this[o]===n)continue e;u+=" "+this[o]}this[l]=n,r.length+=1,r.value=u}a=1,s.className=r.value,a=0},u.prototype.remove=function(){for(var e=0,i=arguments.length,n="",s=this.uCL,r=s[" uCLp"];e!==i;++e){t("remove",n=arguments[e]+"");for(var o=0,l=r.length,u="",d=0;o!==l;++o)d?this[o-1]=this[o]:this[o]!==n?u+=this[o]+" ":d=1;d&&(delete this[l],r.length-=1,r.value=u)}a=1,s.className=r.value,a=0},e.DOMTokenList=u;try{e.Object.defineProperty(e.Element.prototype,"classList",{enumerable:1,get:function(e){return s.call(ele,"classList")||c(this),this.classList},configurable:0,set:function(e){this.className=e}})}catch(t){e[" uCL"]=c,i.documentElement.firstChild.appendChild(i.createElement("style")).styleSheet.cssText='_*{x-uCLp:expression(!this.hasOwnProperty("classList")&&window[" uCL"](this))}[class]{x-uCLp/**/:expression(!this.hasOwnProperty("classList")&&window[" uCL"](this))}'}}(),i=e.DOMTokenList.prototype,n=e.document.createElement("div").classList,i.item||(i.item=function(e){return void 0===(t=this[e])?null:t;var t}),i.toggle&&!1===n.toggle("a",0)||(i.toggle=function(e){if(arguments.length>1)return this[arguments[1]?"add":"remove"](e),!!arguments[1];var t=this.value;return this.remove(oldToken),t===this.value&&(this.add(e),!0)}),i.replace&&"boolean"==typeof n.replace("a","b")||(i.replace=function(e,i){t("replace",e),t("replace",i);var n=this.value;return this.remove(e),this.value!==n&&(this.add(i),!0)}),i.contains||(i.contains=function(e){for(var t=0,i=this.length;t!==i;++t)if(this[t]===e)return!0;return!1}),i.forEach||(i.forEach=function(e){if(1===arguments.length)for(var t=0,i=this.length;t!==i;++t)e(this[t],t,this);else{t=0,i=this.length;for(var n=arguments[1];t!==i;++t)e.call(n,this[t],t,this)}}),i.entries||(i.entries=function(){var e=this;return{next:function(){return 0<e.length?{value:[0,e[0]],done:!1}:{done:!0}}}}),i.values||(i.values=function(){var e=this;return{next:function(){return 0<e.length?{value:e[0],done:!1}:{done:!0}}}}),i.keys||(i.keys=function(){var e=this;return{next:function(){return 0<e.length?{value:0,done:!1}:{done:!0}}}})}(window)},function(e,t,i){"use strict";[Element.prototype,Document.prototype,DocumentFragment.prototype].forEach(function(e){e.hasOwnProperty("prepend")||Object.defineProperty(e,"prepend",{configurable:!0,enumerable:!0,writable:!0,value:function(){var e=Array.prototype.slice.call(arguments),t=document.createDocumentFragment();e.forEach(function(e){var i=e instanceof Node;t.appendChild(i?e:document.createTextNode(String(e)))}),this.insertBefore(t,this.firstChild)}})})},function(e,t,i){"use strict";i(7),i(6)},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var i=document.createElement("div");return i.className=t,i.innerHTML=e,i}},function(e,t){var i,n,s=e.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function a(e){if(i===setTimeout)return setTimeout(e,0);if((i===r||!i)&&setTimeout)return i=setTimeout,setTimeout(e,0);try{return i(e,0)}catch(t){try{return i.call(null,e,0)}catch(t){return i.call(this,e,0)}}}!function(){try{i="function"==typeof setTimeout?setTimeout:r}catch(e){i=r}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(e){n=o}}();var l,u=[],d=!1,c=-1;function f(){d&&l&&(d=!1,l.length?u=l.concat(u):c=-1,u.length&&h())}function h(){if(!d){var e=a(f);d=!0;for(var t=u.length;t;){for(l=u,u=[];++c<t;)l&&l[c].run();c=-1,t=u.length}l=null,d=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}s.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)t[i-1]=arguments[i];u.push(new p(e,t)),1!==u.length||d||a(h)},p.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=m,s.addListener=m,s.once=m,s.off=m,s.removeListener=m,s.removeAllListeners=m,s.emit=m,s.prependListener=m,s.prependOnceListener=m,s.listeners=function(e){return[]},s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=l(i(5)),s=l(i(3)),r=l(i(2)),o=l(i(1)),a=l(i(0));function l(e){return e&&e.__esModule?e:{default:e}}var u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;null===t?((0,s.default)("[Validator] Non-strict fieldset matching.","Provide a form Element or ID to enable strict matching."),this._form=null,this._strict=!1,this._fieldsets=[]):(this._form=d(t),this._strict=!0,this._fieldsets=[]),this.listeners={},this.element=this._form,this.options=(0,r.default)({fieldsetClass:"VPFieldset",errorClass:"-isError",messageAnchor:null,messagePOS:"bottom",watch:!1,scrollAnchor:null,scrollTo:!0},e),this.validationInputs=["input","messagebox","select"],Array.isArray(e.validationInputs)&&(this._options.validationInputs=this._options.validationInputs.concat(e.valiationInputs)),this._onValidation=(0,r.default)({isValid:{cb:null,message:null},isInvalid:{cb:null,message:null}},e.onValidation),this._isValid=null,this._messageNode=null,this._messages=[],this._strategies={all:function(e){return e.every(function(e){return!0===e})},some:function(e){return e.some(function(e){return!0===e})},one:function(e){return 1===e.filter(function(e){return!0===e}).length}}};u.prototype.isValid=function(){if(this._isValid=this._fieldsets.every(function(e){return e.isValid()}),this._isValid)this.element instanceof Element&&this.element.classList.remove(this.options.errorClass),"function"==typeof this._onValidation.isValid.cb&&this._onValidation.isValid.cb(),"string"==typeof this._onValidation.isValid.message&&this.addMessage(this._onValidation.isValid.message,"-isValid");else{if(this.element instanceof Element&&this.element.classList.add(this.options.errorClass),!0===this.options.scrollTo)if(this.options.scrollAnchor instanceof Element)this.options.scrollAnchor.scrollIntoView();else this._fieldsets.filter(function(e){return!1===e._isValid})[0].element.scrollIntoView();"function"==typeof this._onValidation.isInvalid.cb&&this._onValidation.isInvalid.cb(),"string"==typeof this._onValidation.isInvalid.message&&this.addMessage(this._onValidation.isInvalid.message,"-isValid")}return this._isValid},u.prototype.addFieldset=function(e){if(!(e instanceof n.default))throw new Error("[Validator] Fieldset must be an instanceof VPFieldset");this._fieldsets.push(e),!0===this.options.watch&&this.watchFieldset(_fieldset)},u.prototype.watchFieldset=function(e){var t=this;e instanceof n.default&&e.addEventListener("onValidate",function(e,i){t._isValid;t.isValid()})},u.prototype.removeFieldset=function(e){var t=this._fieldsets.indexOf(e);-1!==t&&(this._fieldsets=this._fieldsets.splice(t,1))},u.prototype.createFieldset=function(e,t,i,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,a=d(e,this._form);if(null===a)return(0,s.default)("[Validator] Requires a valid fieldset HTMLElement."),!1;var l=this._strategies[t]||function(){throw new Error("[Validator] Invalid Validation Strategy")},u=new n.default(a,l,i,o);return r.forEach(function(e){u.addField(e)}),this._fieldsets.push(u),!0===this.options.watch&&this.watchFieldset(u),u},u.prototype.listeners=null,u.prototype.addEventListener=o.default.addEventListener,u.prototype.removeEventListener=o.default.removeEventListener,u.prototype.dispatchEvent=o.default.dispatchEvent,u.prototype.clearMessages=a.default.clearMessages,u.prototype.removeMessage=a.default.removeMessage,u.prototype.addMessage=a.default.addMessage("VPMessage");var d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(e instanceof Element)return e;if("string"==typeof e){var i=null!==t&&t instanceof Element?t.getElemenyById(e):document.getElementById(e);if(i instanceof Element)return i}return null};t.default=u},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(i(11)),s=o(i(5)),r=o(i(4));o(i(8));function o(e){return e&&e.__esModule?e:{default:e}}var a={Validator:n.default,Fieldset:s.default,Field:r.default};t.default=a}])});