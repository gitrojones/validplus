/**
 * VPVue 2019-Present
 * @author: Ryann Jones<GitRojones>
 * @license: GPL 3.0
 */
import _Vue from 'vue';
import { Validatable } from './mixins/Validatable';
import { Fieldset } from './mixins/Fieldset';
import { Field } from './mixins/Field';
import { VPValidator } from './components/Validator.vue';
import { VPFieldset } from './components/Fieldset.vue';
import { VPField } from './components/Field.vue';
export declare const VPVue: {
    mixins: {
        Validatable: typeof Validatable;
        Fieldset: typeof Fieldset;
        Field: typeof Field;
    };
    Validator: typeof VPValidator;
    Fieldset: typeof VPFieldset;
    Field: typeof VPField;
    install: typeof VPVuePlugin;
};
declare function VPVuePlugin<VPVueOptions>(Vue: typeof _Vue, _options: VPVueOptions): void;
export interface VPVueOptions {
}
export default VPVue;
