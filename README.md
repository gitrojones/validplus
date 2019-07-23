# ValidPlus

Simple validation library designed to be platform agnostic. Features three levels of granularity allowing for Form-wide validation, Fieldset-wide validation and Field validation. Each level allows for onValid/onInvalid lifecycle hooks. Fields include basic support for DOM properties allowing you to couple validation as it makes sense.

Fields are designed to validate on the same HTML validation properties which allows for fallback support in the case that javascript isn't available or is blocked.

## PRs and Support
Pull requests are welcome. New functionality should be covered by tests if possible. Bug fixes are welcome but it is recommended you include a reproducible example test for the bug to speed up PRs. IE, if validation fails in a specific case, include an example test which is expected to fail on the current master and pass with the PR.

## Test Coverage
Test coverage is focused on feature coverage. In order for a feature to be merged, it must have test coverage.
**All tests must pass in order for a PR to be merged**

## Usage

```import ValidPlus from 'validplus'```

### Validator
The main validation object. Marshals validation to descendants

##### API
See `Docs`
Option classes are provided for each Layer.
`IE. (Valiator.Options, Fieldset.Options, Field.Options)`
These clases are optional, but provide support for typehinting outside of instantiation.

### Package Size
The library comes in at:
#### ValidPlus
Core validation library
```
|----------------------|
| Raw  | GZip | Brotli |
|------|------|--------|
| 58kb | 18kb | 16kb   |
|------|------|--------|
```
#### VPVue (Alpha)
VueJS Validation bindings
```
|-----------------------|
| Raw  | GZip  | Brotli |
|------|-------|--------|
| 14kb | 4.7kb | 4.2kb  |
|------|-------|--------|
```

## Notes
Required on inputs functions as usual *except* we support `required="false"` in cases where an attribute is using data-binding. If the attribute resolves to null, required is ignored.

### Browser Support
Browser support extends to IE 9 tested. Might work on earlier versions, but has not been tested.
Polyfills are included for:
  - Array.From
  - ChildNodeRemove
  - ClassList (IE 6-9)
  - Array.includes && String.includes
  - NodeList.forEach
  - Element.prepend

Further, this project depends on @babel/runtime as an external dependency as it is using plugin-transform-runtime.
