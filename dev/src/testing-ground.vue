<template>
<div class="testing-ground">
  <VPValidator class="testing-one" data-validator>
    <div class="testing-ground__wrapper">
      <!-- Import components here to test -->
      <VPFieldset>
        <span>Hello World</span>

        <VPField id="external" 
          :VPOptions="validationOptions"
          :VPValid="valid"
          value="foo">
          <label>Test Input</label>
          <input type="text" value="foo" required/>
        </VPField>
      </VPFieldset>

      <VPFieldset>
        <span>Should not Validate</span>

        <VPField id="external2"
          :VPOptions="validationOptions2"
          :VPValid="valid"
          value="bar">
          <label>Test Input</label>
          <input type="text" value="bar" />
        </VPField>
      </VPFieldset>
    </div>
  </VPValidator>

  <VPFieldset class="testing-two" data-fieldset>
    <VPField id="external2"
      :VPOptions="validationOptions2"
      :VPValid="valid"
      value="bar">
      <label>Test Input</label>
      <input type="text" value="bar" />
    </VPField>
  </VPFieldset>
</div>
</template>

<script>
export default {
  prop: {
    test: Boolean
  },
  data() {
    return {
      valid: {
        Invalid: {
          Message: 'Invalid!'
        },
        Valid: {
          Message: 'VALID'
        }
      },
      validationOptions: {
        // Options
      },
      validationOptions2: {
        CustomRules: [
          () => new Promise((resolve, reject) => {
            window.setTimeout(() => {
              return resolve(true)
            }, 1000)
          })
        ]
      }
    }
  }
}
</script>

<style lang="less">
* {
  box-sizing: border-box;
}

body {
  display: flex;
  min-height: 100vh;
  margin: 0;
}

.testing-ground {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  width: 100%;

  &__wrapper {
    display: flex;
    flex-flow: column;
    flex: 1 1 auto;
  }
}
</style>
