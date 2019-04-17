import Vue, { VueConstructor } from 'vue';
import Fieldset from '@/vue/mixins/Fieldset';
declare const VPFieldset_base: (new (...args: any[]) => Fieldset & Vue) & VueConstructor<Vue>;
export declare class VPFieldset extends VPFieldset_base {
}
export default VPFieldset;
