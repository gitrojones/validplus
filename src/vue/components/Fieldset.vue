<template>
    <div class="VPFieldset">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { Component, Mixins } from 'vue-property-decorator'
import Fieldset from '@/vue/mixins/Fieldset'

@Component
export class VPFieldset extends Mixins(Fieldset) { }
export default VPFieldset
</script>