# ValidPlus
Validplus is a validation enhancement library targeted at extending basic HTML DOM validation with smart features. 

## Enhancement Explanation
ValidPlus is designed to conform to the standard HTML5 validation spec for DOM Elements. This means, in cases where
Javascript is disabled, validation will continue to function based on the browsers' validation implementation.

## Usage
__Importing (Module)__
```
import { Validator, Fieldset, Field } from 'validplus'
```
_or_
```
import * as VP from 'validplus'
```
__Importing (Browser)__
```
<script src="node_modules/validplus/dist/validplus.browser.js"> 
```
Exports `VP` to window

### Quick Usage
This usage pattern is designed to get you up and running quick without extra boilerplate.
All options are set using the handy `vp-` DOM attribute bindings.

#### Sample Form
```
<form id="sample_form" vp-find>
    <div class="VPFieldset" vp-find>
        <div class="VPField">
            <label for="sample_input">Sample Input</label>
            <input id="sample_input" type="text" placeholder="Sample" required />
        </div>
    </div>
</form>
```
#### Script
```
const Validator = new VP.Validator(document.getElementsById('sample_form'))
```

### Standard Usage
This usage pattern provides the most functionality but has additional boilerplate requirements.

#### Sample Form
```
<form id="sample_form">
    <div id="sample_fieldset" class="VPFieldset">
        <div id="sample_field" class="VPField">
            <label for="sample_input">Sample Input</label>
            <input id="sample_input" type="text" placeholder="Sample" required />
        </div>
    </div>
</form>
```

#### Script
```
// Validator
const Validator = new VP.Validator(
    document.getElementById('sample_form'), <options>)

// Fieldset
const Fieldset = new VP.Fieldset(
    document.getElementsById('sample_fieldset'), <options>)

// Field
const Field = new VP.Field(
    document.getElementsById('sample_field'), <options>)

// Associate
Fieldset.addField(Field);
Validator.addFieldset(Fieldset);
```
_or_
```
// Validator
const Validator = new VP.Validator(
    document.getElementById('sample_form'), <options>)

// Fieldset
Validator.createFieldset(
    document.getElementsById('sample_fieldset'), <options>, [

    // Field
    new VP.Field(
        document.getElementsById('sample_field'), <options>)
]);
```
_or_
```
// Validator
const Validator = new VP.Validator(
    document.getElementById('sample_form'), <options>)

// Fieldset
const Fieldset = Validator.createFieldset(
    document.getElementsById('sample_fieldset'), <options>)

// Field
Fieldset.createField(
    document.getElementsById('sample_field'), <options>)
```

### Validation
Form submit validation check
```
// Submit Event
(e) => {
    if (!Validator.isValid()) e.preventDefault();
}
```
_or_
```
// Submit Event
(e) => {
    e.preventDefault()
    Validator.isValid().then((isValid) => {
        if (isValid) e.submit()
    });
}
```
__NOTE__: When using async rules, you must interrupt form submission to await results.

### Options
#### All
+ __Lifecycle \<ValidationLifecycle>__ `vp-valid` || `vp-invalid` - Messages only
    - Lifecycle bindings to perform actions/messaging for Valid or Invalid outcomes
+ __ErrorClassName \<string>__ ("-isError") `vp-error-class`
    - Classname appended when validation is erroneous
+ __ValidClassName \<string>__ ("-isValid") `vp-valid-class`
    - Classname appended when validation is successful
+ __MessageClassName \<string>__ ("VPMessage") `vp-msg-class`
    - Classname message nodes will bear 
+ __MessageContainerClassName \<string>__ ("VPMessages") `vp-msgs-class`
    - Classname message node container will bear
+ __MessageAnchor \<HTMLElement>__ (self)
    - An alternate anchor point for message nodes
+ __MessagePOS \<"TOP"|"BOTTOM">__ ("BOTTOM") `vp-msg-top` || `vp-msg-bottom`
    - Message positioning; Determines how the messaging container is mounted to the anchor point
+ __ScrollAnchor \<HTMLElement>__ (self)
    - An anchor point to scroll to if scrolling to an instance `self.scrollTo()`
+ __ScrollOptions \<ScrollIntoViewOptions|boolean>__ ({ behavior: 'smooth' })
#### Validator
+ __FindFieldsets \<boolean>__ (false) `vp-find?`
    - Automatically parse children for Fieldsets, relying on DOM bindings for options
+ __FieldsetClass \<string>__ ("VPFieldset") `vp-find`
    - Classname signifying a fieldset element
+ __ValidateLazy \<boolean>__ (true) `vp-lazy`
    - Indicate child fieldsets should validate lazily
+ __ValidateVisible \<boolean>__ (true) `vp-visibile`
    - Indicate if validation should be enforced for non-visible fieldsets

#### Fieldset
+ __FindFields \<boolean>__ (false) `vp-find?`
    - Automatically parse children for Fields, using DOM bindings for options
+ __FieldClass \<string>__ ("VPField") `vp-find`
    - Classname signifying a field element
+ __ValidateVisible \<boolean>__ (true) `vp-visibile`
    - Indicate if validation should be enforced for non-visible fieldsets
+ __ValidationStrategy \<string|function>__ ("all") `vp-strategy`
    - Strategy to validate child fields against each other. See __Validation Option__
+ __ScrollTo \<boolean>__ (true) `vp-scroll`
    - Indicate if erroneous fieldsets should be scrolled to on error (first error)
    
#### Field
+ __Notify \<boolean>__ (true) `vp-notify`
    - Notify parent of changes, allowing siblings to validate together. 
+ __DirtyOn \<ChangeActions>__ ({ input: true }) `vp-dirty-blur`||`vp-dirty-input`||`vp-dirty-change`||`vp-dirty-mouseleave`
    - Action state required to mark a field as dirty (can validate)
+ __FormatOn \<ChangeActions>__ ({ input: true }) `vp-format-blur`||`vp-format-input`||`vp-format-change`||`vp-format-mouseleave`
    - Action state required to trigger field formatting
+ __ValidateOn \<ChangeActions>__ ({ blur: true }) `vp-blur`||`vp-input`||`vp-change`||`vp-mouseleave`
    - Action state required to trigger validation
+ __ForceRules \<boolean>__ (false)
    - Force rules defined via options to supersede DOM rules
+ __InputRules \<HTMLValidationRules>__
    - Standard HTML Validation rules to apply to the field input
+ __CustomRules \<CustomValidationRule[]>__
    - Custom Validation rules to apply. See __Custom Validation__
+ __InputFormatter \<InputFormatters>__
    - Formatters to apply to input value. See __Input Formatter__
+ __ValidateAsync \<boolean>__ (false) `vp-async`
    - Force validation to resolve async, regardless of the presence of async custom rules
+ __ValidateAsyncResolve \<boolean>__ (true) `vp-await`
    - Await validation results before allowing another validation cycle.
+ __PrimaryInput \<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>__ (auto)
    - Indicate the input we will validate against
+ __PrimaryInputIndex \<number>__ (0)
    - If multiple inputs exist within a field, indicate which should be validated against
+ __PrimaryInputType \<string>__
    - The type of input we should prioritize picking from if multiple eligible inputs of different types are found
+ __InputTypes \<string>__ ('select'|'input'|'textarea')[]
    - The node types to consider when looking for child inputs.
+ __ShowFieldRuleErrors \<boolean>__ (false)
    - Display error results for standard field rules. See __Standard Validation__
+ __ShowCustomRuleErrors \<boolean>__ (true)
    - Display custom error results for custom field rules. See __Custom Validation__
+ __ValidateLazyFieldRules \<boolean>__ (true)
    - Validate standard field rules lazily.
+ __ValidateLazyCustomRules \<boolean>__ (true)
    - Validate custom field rules lazily.
    
### Validation Lifecycle
All validatable instances can define additional lifecycle messages and hooks to fire based on the outcome of validation.

ValidationLifeycle is defined as:
```
ValidationLifecycle: {
    Valid: {
        Message: '',
        CB: [
            (instance) => {
                // Some action, such as commit to store,
                // or save to localstorage state.
            }
        ],
    },
    Invalid: {
        Message: 'Field is invalid!',
        CB: []
    }
}
```
    
### Standard Validation
Standard validation emulates the regular validation a modern web browser will do on basic HTML inputs.

This validation includes the following properties:

+ __required__ - Value must be defined
+ __min__ - Cannot go below this value
+ __max__ - Cannot exceed this value
+ __minlength__ - Must be at least this length
+ __maxlength__ - Must be at most this length
+ __pattern__ - Must match this pattern

#### Email
Inputs of type `email` will be enforced to match a standard email format `.+@.+\..+`. If pattern is defined,
email input value will __also__ be validated against the pattern defined. Allowing for further customization
such as required domain `.+@(validplus)\.com`.

You may specify an additional message to display for this pattern failure via the `title` attribute.
```
<input type="email" pattern=".+@(validplus)\.com" title="A validplus email account is required." />
```

#### Date
Inputs of type `date` will enforce date values using the `min` and `max` attributes.
```
<input type="date" min="1970-01-01" />
```

### Custom Validation
Custom validation allows for additional validation rules using custom logic. These rules can be both
synchronous or asynchronous. 

```
CustomRules: [
    (attrs, el, input) =>
        +attrs.value % 2 === 0
            ? 'Value must be divisible by 2'
            : true
]
```
_or_
```
CustomRules: [
    async (attrs, el, input) => {
        const result = await API.post('/some/validation/check', attrs.value)

        return !result 
            ? 'Value is already in use, please try another value.' 
            : true
    }
]
```

Custom rules may return a boolean to indicate validity, or a string to provide a failure message.

__NOTE__: if using async rules and not enforcing AsyncResolved, isValid may return
a `boolean` or a `Promise<boolean>`, depending on whether the async rule is resolved or not.

### Input Formatter
Input formatters allow for formatting a value for pretty output to users. Common use cases 
include phone number masks or enforcing maximum value lengths.

```
InputFormatter: {
  pre: (value) => value.replace(/[^0-9]/g, ''),
  post: (value) => {
    const areaCode = value.substr(0, 3);
    const local = value.substr(3, 3);
    const number = value.substr(6, 4);

    let mask = '(';
    if (areaCode.length > 0) mask += areaCode;
    if (local.length > 0) mask += ') ' + local;
    if (number.length > 0) mask += '-' + number;
    return mask;
  }
}
```
_or_
```
InputFormatter: {
  pre: (value) => value.replace(/[^0-9]/g, '').substr(0, 5)
}
```

In addition to the formatter events, Input formatters are also called on validation.
It is your responsibility to prepare the value to be parsed for validation correctly (strip masks, for example).

Pre is called prior, Post is called following validation.

### Fieldset Validation Option
Fieldset validation is determined using a validation strategy for child fieldset. By default, we define four 
validation strategies which can be referenced by name.

1) `all` - All child fields must be valid
2) `some` - Some of the child fields must be valid
3) `one` - One of the child fields must be valid
4) `none` - None of the child fields can be valid

You may also optionally define your own validation strategy for complex situations.

```
(statuses, fields) => <some logic to determine validity>
```

This strategy must return true/false.

### API
See [Docs](https://gitrojones.github.io/validplus/)

### Browser Support
ValidPlus targets IE10+. 

#### Standard Version
This version targets a minimum bundle size, meaning it is the responsibility of the consuming project
to include the proper polyfills via core-js and babel.

#### Browser Version
This version exports directly to the window and is intended to be used via a script tag. This version
maximizes compatibility and includes all the necessary shims to run properly in IE10+.

__NOTE__: It is highly recommended you utilize the standard version to minimize package size

## Package Size
The library comes in at:

### ValidPlus
Core validation library
```
|----------------------|
| Raw  | GZip | Brotli |
|------|------|--------|
| 52kb | 14kb | 13kb   |
|------|------|--------|
```

Browser shimmed
```
|-----------------------|
| Raw   | GZip | Brotli |
|-------|------|--------|
| 111kb | 32kb | 28kb   |
|-------|------|--------|
```

## Test Coverage
Test coverage is an ongoing focus for this library. Pull requests must include test coverage in order to be considered.

**All existing tests must pass in order for a PR to be merged**

