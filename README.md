# ValidPlus

Simple validation library designed to be platform agnostic. Features three levels of granularity allowing for Form-wide validation, Fieldset-wide validation and Field validation. Each level allows for onValid/onInvalid lifecycle hooks. Fields include basic support for DOM properties allowing you to couple validation as it makes sense.

Fields are designed to validate on the same HTML validation properties which allows for fallback support in the case that javascript isn't available or is blocked.

## PRs and Support
Pull requests are welcome. New functionality should be covered by tests if possible. Bug fixes are welcome but it is recommended you include a reproducible example test for the bug to speed up PRs. IE, if validation fails in a specific case, include an example test which is expected to fail on the current master and pass with the PR.

## Test Coverage
Test coverage is focused on STRICT mode. LAX coverage is inferred from STRICT but not complete. Feel free to add new tests with your pull requests. **All tests must pass in order for a PR to be merged**

## Usage
This library functions in STRICT and LAX mode. Each section outlines the differences you can expect. For the most part, you can drop this library in and starting using it right away.

```import ValidPlus from 'validplus'```

### Validator
The main validation object. Marshals validation to descendants

#### STRICT
  - Children are automatically detected based on the options passed to the constructor. The preferred way to interface with STRICT mode is through the custom DOM attributes for each ValidPlus element.
  - Only Decendants of the provided form can be validated against. Default behavior is to ignore non-descendants and spit out an error.
#### LAX
  - It is your responsibility to add each fieldset to the validator. This allows for greater flexibility at the cost of boilerplate.
  - Any added fieldset is considered in the validation loop. It is your responsibility to ensure the correct state of the fieldset collection when you validate.
##### API
###### Constructor
 - Params: 
   1) Options :: Object
     Allows for customization of validation logic
     DEFAULT: {
       onValidation: {
         isValid: null,
         isInvalid: null
       },
       fieldsetClass: 'VPfieldset',
       fieldClass: 'VPfield',
       validInputs: [
        'input',
        'messagebox',
        'select'
       ]
     }
  2) Form(?) :: HTMLFormElement || String (DOM ID)
    Instantiates the Validator, placing the validator into STRICT or LAX mode based on the presence of a Form reference
###### Methods
####### isValid()
Runs validation on decendants, with results bubbling upwards. If a valdiation message or cb is provided, they are called in tandem.
####### addFieldset()

Validator can be instantiated with and without a root form element. If a Form element is provided the validator is considered to be in 'strict' mode, limiting validation to direct decendants of the Validator form element. It is recommended you utilize strict mode when it makes sense to do so, as the amount of boilerplate is reduced (By default, ValidPlus will attempt to populate your field structure).

The main validator depends on being passed a form to track on instantiation. This is the root of the validation strategy where all validation flows through. Strict matching ensures fields are only considered if they're decendants of the root form. This is the recommonded way to consume the validator. Non-strict mode allows for global validation ()

Fieldsets are defined as groups of fields. Typically following a structure like
```
.fieldset > .field + .field + .field <...>
```
where field is the logical container for your input/select field.
