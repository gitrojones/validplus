import { VPFieldOptions } from '@/interfaces/VPOptions';
import { VPField } from '@/Field';
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule';
import { Validatable } from './Validatable';
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle';
declare const Field_base: import("vue-class-component/lib/declarations").VueClass<Validatable>;
export declare class Field extends Field_base {
    readonly VPOptions: VPFieldOptions;
    readonly VPRules: CustomValidationRule[];
    readonly VPValid: ValidationLifecycle;
    onValidChange(isValid: boolean): void;
    mounted(): void;
    VPField: (VPField | null);
    VPFields: VPField[];
    VPOptions$: VPFieldOptions;
    VPRules$: CustomValidationRule[];
    VPValid$: ValidationLifecycle;
    VPChangeAnchor(el: HTMLElement): void;
    VPAddRule(rule: CustomValidationRule): void;
    VPGatherFields(): void;
}
export default Field;
