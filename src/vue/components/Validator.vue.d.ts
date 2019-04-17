import Vue, { VueConstructor } from 'vue';
import Validatable from '@/vue/mixins/Validatable';
declare const VPValidator_base: (new (...args: any[]) => Validatable & Vue) & VueConstructor<Vue>;
export declare class VPValidator extends VPValidator_base {
}
export default VPValidator;
