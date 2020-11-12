module.exports=function(){"use strict";var e={1044:function(e,t,i){i.r(t),i.d(t,{VPVue:function(){return o},default:function(){return a}});const s={props:{validator:{type:Object,default(){return this.VPNewValidator&&(this.VPProvideValidator=!0),this.VPValidator}}},beforeMount(){this.VP=i(5136).ValidPlus},mounted(){this.VPNewValidator&&(this.validator.$element=this.$el,this.validator.generateMessageNode(this.$el))},provide(){let e={};return this.VPProvideValidator&&(e.VPValidator=this.validator),e},inject:{VPValidator:{default(){this.VPNewValidator=!0,console.log("[VPVue] Validator not provided, injecting new validator.");return new(i(5136).ValidPlus.Validator)({DeferredMessageAnchor:!0})}}},methods:{VPCreateField(e,t,i,s){return new this.VP.Field(e,t,i,s)},VPCreateFieldset(e,t,i,s,d){const l=this.validator.createFieldset(e,t,i,s,d);return this.VPFieldSets.push(l),l},VPChangeAnchor(e){this.validator.generateMessageNode(e)},VPisValid(){let e;e=this.VPField?this.VPField.isValid():this.VPFieldset?this.VPFieldset.isValid():this.validator.isValid();const t=e=>{this.$nextTick((()=>{e?this.$emit("isValid"):this.$emit("isInvalid")}))};return"boolean"==typeof e?(t(e),e):"function"==typeof e.then?e.then((e=>(t(e),e))):void 0}},beforeDestroy(){this.VPFieldSets.forEach((e=>{console.log("[VPVue] Cleaning up fieldsets",e),this.validator.removeFieldset(e)}))},data:()=>({VPFieldSets:[]})};const d={props:{VPOptions:{type:Object},VPValid:{type:Object},VPStrategy:{type:[Function,String]},VPFields:{type:Array}},mixins:[s],mounted(){this.VPFieldset=this.VPCreateFieldset(this.$el,this.VPStrategy$,this.VPOptions$,this.VPFields$,this.VPValid$),this.VPGatherFields()},watch:{"VPFieldset.$valid":function(e){e?this.$emit("isValid",this):this.$emit("isInvalid",this)}},data(){return{VPFieldset:null,VPStrategy$:this.VPStrategy||"all",VPFields$:this.VPFields||[],VPOptions$:this.VPOptions||{},VPValid$:this.VPValid||{Invalid:{Message:"Input is invalid"}}}},methods:{VPRemove(){this.$emit("VPRemoveFieldset",this.VPFieldset)},VPChangeAnchor(e){this.VPFieldset.generateMessageNode(e)},VPGatherFields(){Object.keys(this.$slots).forEach((e=>{this.$slots[e].forEach((e=>{e._isVue&&e.$once("VPAddField",(e=>{this.VPFieldset.addField(e)}))}))})),this.$children.forEach((e=>{e._isVue&&e.$once("VPAddField",(e=>{this.VPFieldset.addField(e)}))}))}}};const l={props:{VPOptions:{type:Object},VPRules:{type:Array},VPValid:{type:Object}},mixins:[s],watch:{"VPField.$valid":function(e){e?this.$emit("isValid",this):this.$emit("isInvalid",this)}},mounted(){this.VPField=this.VPCreateField(this.$el,this.VPOptions$,this.VPRules$,this.VPValid$),this.$nextTick((()=>{this.$emit("VPAddField",this.VPField)}))},data(){return{VPField:{},VPOptions$:this.VPOptions||{},VPRules$:this.VPRules||[],VPValid$:this.VPValid||{}}},methods:{VPRemove(){this.$emit("VPRemoveField",this.VPField)},VPChangeAnchor(e){this.VPField.generateMessageNode(e)},VPAddRule(e){"function"==typeof e?this.VPField.$options.CustomRules.push(e):console.error("[VPField] Rule must be a function that resolves to a promise")},VPGatherFields(){Object.keys(this.$slots).forEach((e=>{this.$slots[e].forEach((e=>{e._isVue&&e.$once("AddField",(function(e){this.VPFields.push(e)}))}))})),this.$children.forEach((e=>{e._isVue&&e.$once("AddField",(function(e){this.VPFields.push(e)}))}))}}};const o={Validatable:s,Fieldset:d,Field:l};var a=o},5136:function(e){e.exports=require("validplus")}},t={};function i(s){if(t[s])return t[s].exports;var d=t[s]={exports:{}};return e[s](d,d.exports,i),d.exports}return i.d=function(e,t){for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i(1044)}();
//# sourceMappingURL=vpvue.js.map