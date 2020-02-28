import Vue, { VueConstructor } from 'vue'
import { Field } from '@/vue/mixins/Field'

declare const VPField_base: (new (...args: any[]) => Field & Vue) & VueConstructor<Vue>
export declare class VPField extends VPField_base {
}

export default VPField
