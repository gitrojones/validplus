!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("ValidPlus")):"function"==typeof define&&define.amd?define(["ValidPlus"],n):"object"==typeof exports?exports.VPVue=n(require("ValidPlus")):t.VPVue=n(t.ValidPlus)}(window,function(t){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=91)}([function(t,n,e){var r=e(24)("wks"),o=e(15),i=e(1).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n,e){t.exports=!e(5)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n,e){var r=e(7),o=e(34),i=e(25),u=Object.defineProperty;n.f=e(2)?Object.defineProperty:function(t,n,e){if(r(t),n=i(n,!0),r(e),o)try{return u(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n,e){var r=e(3),o=e(17);t.exports=e(2)?function(t,n,e){return r.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n,e){var r=e(8);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){var e=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=e)},function(t,n,e){var r=e(1),o=e(9),i=e(4),u=e(11),c=e(31),s=function(t,n,e){var a,f,l,p,d=t&s.F,h=t&s.G,v=t&s.S,y=t&s.P,V=t&s.B,P=h?r:v?r[n]||(r[n]={}):(r[n]||{}).prototype,m=h?o:o[n]||(o[n]={}),b=m.prototype||(m.prototype={});for(a in h&&(e=n),e)l=((f=!d&&P&&void 0!==P[a])?P:e)[a],p=V&&f?c(l,r):y&&"function"==typeof l?c(Function.call,l):l,P&&u(P,a,l,t&s.U),m[a]!=l&&i(m,a,p),y&&b[a]!=l&&(b[a]=l)};r.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,n,e){var r=e(1),o=e(4),i=e(6),u=e(15)("src"),c=Function.toString,s=(""+c).split("toString");e(9).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,e,c){var a="function"==typeof e;a&&(i(e,"name")||o(e,"name",n)),t[n]!==e&&(a&&(i(e,u)||o(e,u,t[n]?""+t[n]:s.join(String(n)))),t===r?t[n]=e:c?t[n]?t[n]=e:o(t,n,e):(delete t[n],o(t,n,e)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[u]||c.call(this)})},function(t,n,e){var r=e(35),o=e(18);t.exports=function(t){return r(o(t))}},function(t,n,e){var r=e(37),o=e(27);t.exports=Object.keys||function(t){return r(t,o)}},function(t,n,e){for(var r=e(23),o=e(13),i=e(11),u=e(1),c=e(4),s=e(16),a=e(0),f=a("iterator"),l=a("toStringTag"),p=s.Array,d={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},h=o(d),v=0;v<h.length;v++){var y,V=h[v],P=d[V],m=u[V],b=m&&m.prototype;if(b&&(b[f]||c(b,f,p),b[l]||c(b,l,V),s[V]=p,P))for(y in r)b[y]||i(b,y,r[y],!0)}},function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},function(t,n){t.exports={}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n){t.exports=!1},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n,e){var r=e(24)("keys"),o=e(15);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,n,e){var r=e(18);t.exports=function(t){return Object(r(t))}},function(t,n,e){"use strict";var r=e(33),o=e(45),i=e(16),u=e(12);t.exports=e(36)(Array,"Array",function(t,n){this._t=u(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,e=this._i++;return!t||e>=t.length?(this._t=void 0,o(1)):o(0,"keys"==n?e:"values"==n?t[e]:[e,t[e]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,n,e){var r=e(9),o=e(1),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,n){return i[t]||(i[t]=void 0!==n?n:{})})("versions",[]).push({version:r.version,mode:e(19)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,n,e){var r=e(8);t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,e){var r=e(3).f,o=e(6),i=e(0)("toStringTag");t.exports=function(t,n,e){t&&!o(t=e?t:t.prototype,i)&&r(t,i,{configurable:!0,value:n})}},function(t,n,e){"use strict";(function(t){e(14);var r=e(57),o=e.n(r);n.a={props:{validator:{type:Object,default:function(){return this.VPNewValidator&&(this.VPProvideValidator=!0),this.VPValidator}}},provide:function(){if(this.VPProvideValidator)return{VPValidator:this.validator}},inject:{VPValidator:{default:function(){return console.log("[VPVue] Validator not provided, injecting new validator."),this.VPNewValidator=!0,"server"!==t.env.VUE_ENV?new(e(57).default.Validator)({}):null}}},methods:{VPCreateField:function(t,n,e,r){return new o.a.Field(t,n,e,r)},VPCreateFieldset:function(t,n,e,r,o){var i=this.validator.createFieldset(t,n,e,r,o);return this.VPFieldSets.push(i),i},VPisValid:function(){return!!this.validator.isValid()&&(this.$emit("isValid"),!0)}},beforeDestroy:function(){var t=this;this.VPFieldSets.forEach(function(n){console.log("[VPVue] Cleaning up fieldsets",n),t.validator.removeFieldset(n)})},data:function(){return{VPFieldSets:[]}}}}).call(this,e(89))},function(t,n,e){var r=e(8),o=e(1).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,n,e){var r=e(46);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}}},function(t,n,e){var r=e(7),o=e(48),i=e(27),u=e(21)("IE_PROTO"),c=function(){},s=function(){var t,n=e(30)("iframe"),r=i.length;for(n.style.display="none",e(50).appendChild(n),n.src="javascript:",(t=n.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),s=t.F;r--;)delete s.prototype[i[r]];return s()};t.exports=Object.create||function(t,n){var e;return null!==t?(c.prototype=r(t),e=new c,c.prototype=null,e[u]=t):e=s(),void 0===n?e:o(e,n)}},function(t,n,e){var r=e(0)("unscopables"),o=Array.prototype;void 0==o[r]&&e(4)(o,r,{}),t.exports=function(t){o[r][t]=!0}},function(t,n,e){t.exports=!e(2)&&!e(5)(function(){return 7!=Object.defineProperty(e(30)("div"),"a",{get:function(){return 7}}).a})},function(t,n,e){var r=e(20);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,n,e){"use strict";var r=e(19),o=e(10),i=e(11),u=e(4),c=e(16),s=e(47),a=e(28),f=e(51),l=e(0)("iterator"),p=!([].keys&&"next"in[].keys()),d=function(){return this};t.exports=function(t,n,e,h,v,y,V){s(e,n,h);var P,m,b,x=function(t){if(!p&&t in F)return F[t];switch(t){case"keys":case"values":return function(){return new e(this,t)}}return function(){return new e(this,t)}},g=n+" Iterator",O="values"==v,S=!1,F=t.prototype,j=F[l]||F["@@iterator"]||v&&F[v],w=j||x(v),T=v?O?x("entries"):w:void 0,_="Array"==n&&F.entries||j;if(_&&(b=f(_.call(new t)))!==Object.prototype&&b.next&&(a(b,g,!0),r||"function"==typeof b[l]||u(b,l,d)),O&&j&&"values"!==j.name&&(S=!0,w=function(){return j.call(this)}),r&&!V||!p&&!S&&F[l]||u(F,l,w),c[n]=w,c[g]=d,v)if(P={values:O?w:x("values"),keys:y?w:x("keys"),entries:T},V)for(m in P)m in F||i(F,m,P[m]);else o(o.P+o.F*(p||S),n,P);return P}},function(t,n,e){var r=e(6),o=e(12),i=e(38)(!1),u=e(21)("IE_PROTO");t.exports=function(t,n){var e,c=o(t),s=0,a=[];for(e in c)e!=u&&r(c,e)&&a.push(e);for(;n.length>s;)r(c,e=n[s++])&&(~i(a,e)||a.push(e));return a}},function(t,n,e){var r=e(12),o=e(39),i=e(49);t.exports=function(t){return function(n,e,u){var c,s=r(n),a=o(s.length),f=i(u,a);if(t&&e!=e){for(;a>f;)if((c=s[f++])!=c)return!0}else for(;a>f;f++)if((t||f in s)&&s[f]===e)return t||f||0;return!t&&-1}}},function(t,n,e){var r=e(26),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},,,,,function(t,n,e){var r=e(22),o=e(13);e(56)("keys",function(){return function(t){return o(r(t))}})},function(t,n){t.exports=function(t,n){return{value:n,done:!!t}}},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n,e){"use strict";var r=e(32),o=e(17),i=e(28),u={};e(4)(u,e(0)("iterator"),function(){return this}),t.exports=function(t,n,e){t.prototype=r(u,{next:o(1,e)}),i(t,n+" Iterator")}},function(t,n,e){var r=e(3),o=e(7),i=e(13);t.exports=e(2)?Object.defineProperties:function(t,n){o(t);for(var e,u=i(n),c=u.length,s=0;c>s;)r.f(t,e=u[s++],n[e]);return t}},function(t,n,e){var r=e(26),o=Math.max,i=Math.min;t.exports=function(t,n){return(t=r(t))<0?o(t+n,0):i(t,n)}},function(t,n,e){var r=e(1).document;t.exports=r&&r.documentElement},function(t,n,e){var r=e(6),o=e(22),i=e(21)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},,,,,function(t,n,e){var r=e(10),o=e(9),i=e(5);t.exports=function(t,n){var e=(o.Object||{})[t]||Object[t],u={};u[t]=n(e),r(r.S+r.F*i(function(){e(1)}),"Object",u)}},function(n,e){n.exports=t},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,n){var e,r,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function c(t){if(e===setTimeout)return setTimeout(t,0);if((e===i||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(n){try{return e.call(null,t,0)}catch(n){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:i}catch(t){e=i}try{r="function"==typeof clearTimeout?clearTimeout:u}catch(t){r=u}}();var s,a=[],f=!1,l=-1;function p(){f&&s&&(f=!1,s.length?a=s.concat(a):l=-1,a.length&&d())}function d(){if(!f){var t=c(p);f=!0;for(var n=a.length;n;){for(s=a,a=[];++l<n;)s&&s[l].run();l=-1,n=a.length}s=null,f=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===u||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(n){try{return r.call(null,t)}catch(n){return r.call(this,t)}}}(t)}}function h(t,n){this.fun=t,this.array=n}function v(){}o.nextTick=function(t){var n=new Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)n[e-1]=arguments[e];a.push(new h(t,n)),1!==a.length||f||c(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},,function(t,n,e){"use strict";e.r(n);var r=e(29),o=(e(23),e(44),e(14),{props:{VPStrategy:[Function,String],VPOptions:Object,VPValid:Object,VPFields:{type:Array,default:function(){return[]}}},mixins:[r.a],mounted:function(){this.VPFieldset=this.VPCreateFieldset(this.$el,"all",this.VPOptions,this.VPFields,this.VPValid),this.VPGatherFields()},data:function(){return{VPFieldset:null}},methods:{VPGatherFields:function(){var t=this;Object.keys(this.$slots).forEach(function(n){t.$slots[n].forEach(function(n){n._isVue&&n.$once("VPAddField",function(n){t.VPFieldset.addField(n)})})}),this.$children.forEach(function(n){n._isVue&&n.$once("VPAddField",function(n){t.VPFieldset.addField(n)})})}}}),i={props:{VPOptions:Object,VPValid:Object},mixins:[r.a],mounted:function(){var t=this;this.VPField=this.VPCreateField(this.$el,this.VPOptions,this.VPRules,this.VPValid),this.$nextTick(function(){t.$emit("VPAddField",t.VPField)})},data:function(){return{VPField:null}},methods:{VPGatherFields:function(){var t=this;Object.keys(this.$slots).forEach(function(n){t.$slots[n].forEach(function(t){t._isVue&&t.$once("AddField",function(t){this.VPFields.push(t)})})}),this.$children.forEach(function(t){t._isVue&&t.$once("AddField",function(t){this.VPFields.push(t)})})}}},u={Validatable:r.a,FieldSet:o,Field:i};n.default=u}])});