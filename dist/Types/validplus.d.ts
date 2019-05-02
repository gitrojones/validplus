import '@lib/polyfills';
import { VPValidator as Validator } from "./src/Validator";
import { VPFieldset as Fieldset } from "./src/Fieldset";
import { VPField as Field } from "./src/Field";
/**
  * Main export
  * @param {VPValidator} Validator - ValidPlus Validator
  * @param {VPFieldset} Fieldset - ValidPlus Fieldset
  * @param {VPField} Field - ValidPlus Field
  */
export declare const ValidPlus: {
    Validator: typeof Validator;
    Fieldset: typeof Fieldset;
    Field: typeof Field;
};
export default ValidPlus;
