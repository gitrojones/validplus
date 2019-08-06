import { Validatable } from './Validatable';
import { VPFieldsetOptions } from "../../interfaces/VPOptions";
import { ValidationLifecycle } from "../../interfaces/validation/ValidationLifecycle";
import { ValidationStrategy } from "../../interfaces/validation/ValidationStrategy";
import { VPField } from "../../Field";
import { VPFieldset } from "../../Fieldset";
declare const Fieldset_base: import("vue-class-component/lib/declarations").VueClass<Validatable>;
export declare class Fieldset extends Fieldset_base {
    readonly VPOptions: VPFieldsetOptions;
    readonly VPValid: ValidationLifecycle;
    readonly VPStrategy: (ValidationStrategy | string);
    readonly VPFields: VPField[];
    handleFieldsetIsValid(isValid: boolean): void;
    mounted(): void;
    VPFieldset: (VPFieldset | null);
    VPStrategy$: (ValidationStrategy | string);
    VPFields$: VPField[];
    VPOptions$: VPFieldsetOptions;
    VPValid$: ValidationLifecycle;
    VPChangeAnchor(el: HTMLElement): void;
    VPGatherFields(): void;
}
export default Fieldset;
