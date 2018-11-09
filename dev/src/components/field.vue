<template>
<div class="test-field">
  <slot></slot>
  <input id="testField" name="test" type="text" :value="true" />
</div>
</template>

<script>
import VPVue from 'VPVue'

export default {
  props: {
  },
  mixins: [ VPVue.Field ],
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
</style>
