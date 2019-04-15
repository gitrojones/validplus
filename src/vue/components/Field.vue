<template>
    <div class="VPField">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Field } from '@/vue/mixins/Field'
import { VPFieldOptions } from '@/interfaces/VPOptions'

@Component({
  props: {
    VPOptions: Object as () => VPFieldOptions
  }
})
export class VPField extends Vue {
  mixins: [ Field ]
})

export default VPField
</script>
