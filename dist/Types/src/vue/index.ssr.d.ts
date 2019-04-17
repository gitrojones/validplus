import _Vue from 'vue';
import { VPValidator } from '@/vue/components/Validator.vue';
import { VPFieldset } from './components/Fieldset.vue';
import { VPField } from './components/Field.vue';
declare function VPVuePlugin<VPVueOptions>(Vue: typeof _Vue, _options: VPVueOptions): void;
export interface VPVueOptions {
}
export declare const VPVue: (env: string) => {
    mixins: {
        Validatable: {};
        Fieldset: {};
        Field: {};
    };
    VPValidator: typeof VPValidator;
    VPFieldset: typeof VPFieldset;
    VPField: typeof VPField;
    install: typeof VPVuePlugin;
};
export default VPVue;
