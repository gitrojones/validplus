# ValidPlus
Validplus is a validation enhancement library targeted at extending basic HTML DOM validation with smart features. 

## Enhancement Explanation
ValidPlus is designed to conform to the standard HTML5 validation spec for DOM Elements. This means, in cases where
Javascript is disabled, validation will continue to function based on the browsers' validation implementation.

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
### VPVue (Alpha)
VueJS Validation bindings
```
|-----------------------|
| Raw  | GZip  | Brotli |
|------|-------|--------|
| 14kb | 5.3kb | 4.7kb  |
|------|-------|--------|
```

## Test Coverage
Test coverage is an ongoing focus for this library. Pull requests must include test coverage in order to be considered.

**All existing tests must pass in order for a PR to be merged**

## Usage
```
import * as VP from 'validplus'
const Validator = new VP.Validator(<form_element>)
```

_or_

```
import { Validator, Fieldset, Field } from 'validplus'
const Validator = new Validator(<form_element>)
```

### API
See [Docs](https://gitrojones.github.io/validplus/)

### Browser Support
This library targets IE10+
