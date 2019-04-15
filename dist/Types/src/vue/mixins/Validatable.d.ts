import { Vue } from 'vue-property-decorator';
import { VPValidatorOptions, VPFieldsetOptions, VPFieldOptions } from '@/interfaces/VPOptions';
import { VPValidator } from '@/Validator';
import { VPFieldset } from '@/Fieldset';
import { VPField } from '@/Field';
import { ValidationLifecycle } from '@/interfaces/validation/ValidationLifecycle';
import { CustomValidationRule } from '@/interfaces/validation/CustomValidationRule';
import { ValidationStrategy } from '@/interfaces/validation/ValidationStrategy';
export declare class Validatable extends Vue {
    readonly VPOptions: (VPValidatorOptions | VPFieldsetOptions | VPFieldOptions);
    readonly validator: VPValidator;
    readonly VPValidator: VPValidator;
    VPNewValidator: (this: any) => any;
    VPProvideValidator: boolean;
    VPFieldsets: VPFieldset[];
    VPFields: VPField[];
    VPField: (VPField | null);
    VPFieldset: (VPFieldset | null);
    VP: any;
    beforeMount(): void;
    mounted(): void;
    beforeDestroy(): void;
    VPCreateField(el: HTMLElement, options: VPFieldOptions, rules: CustomValidationRule[], onValidation: ValidationLifecycle): any;
    VPCreateFieldset(el: HTMLElement, strategy: (ValidationStrategy | string), options: VPFieldsetOptions, fields: VPField[], onValidation: ValidationLifecycle): VPFieldset;
    VPChangeAnchor(el: HTMLElement): void;
    VPisValid(): boolean | Promise<boolean>;
}
export default Validatable;
