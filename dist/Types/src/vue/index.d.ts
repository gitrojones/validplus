import { Validatable } from './mixins/Validatable';
import { Fieldset } from './mixins/Fieldset';
import { Field } from './mixins/Field';
export declare const VPVue: {
    mixins: {
        Validatable: typeof Validatable;
        Fieldset: typeof Fieldset;
        Field: typeof Field;
    };
    VPValidator: any;
    VPFieldset: any;
    VPField: any;
};
export default VPVue;
