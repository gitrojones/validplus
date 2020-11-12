/**
 * ValidPlus 2019-Present
 * @author: Ryann Jones<gitrojones>
 * @license: GPL 3.0
 */
import 'mdn-polyfills/Array.from';
import 'mdn-polyfills/Node.prototype.remove';
import 'mdn-polyfills/Element.prototype.classList';
import 'mdn-polyfills/Array.prototype.includes';
import 'mdn-polyfills/NodeList.prototype.forEach';
import 'mdn-polyfills/Node.prototype.prepend';
import 'mdn-polyfills/Number.isNaN';
/**
 * Main export
 * @param {VPValidator} Validator - ValidPlus Validator
 * @param {VPFieldset} Fieldset - ValidPlus Fieldset
 * @param {VPField} Field - ValidPlus Field
 */
export { VPValidator as Validator } from "./src/Validator";
export { VPFieldset as Fieldset } from "./src/Fieldset";
export { VPField as Field } from "./src/Field";
