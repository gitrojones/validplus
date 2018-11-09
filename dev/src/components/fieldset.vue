<template>
<div class="test-fieldset">
  <vp-field id="internal">
    internal
  </vp-field>

  <!-- External Fields -->
  <slot>
  </slot>
</div>
</template>

<script>
import VPVue from 'VPVue'
import VpField from './field'

export default {
  props: {
  },
  mixins: [ VPVue.FieldSet ],
  data () {
    return {
    }
  },
  components: {
    VpField
  }
}
</script>

<style lang="less" scoped>
</style>
