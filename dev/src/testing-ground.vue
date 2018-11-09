<template>
<div class="testing-ground">
  <div class="testing-ground__wrapper">
    <!-- Import components here to test -->
    <vp-fieldset>
      <span>Hello World</span>

      <vp-field id="external" :VPOptions="{ watch: false }">
        external
      </vp-field>
    </vp-fieldset>
  </div>
</div>
</template>

<script>
import fieldset from '#/components/fieldset'
import field from '#/components/field'

export default {
  data () {
    return {
      foo: 'bar'
    }
  },
  components: {
    VpFieldset: fieldset,
    VpField: field
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
