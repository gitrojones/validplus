<template>
    <div class="VPFieldset">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Fieldset from '@/vue/mixins/Fieldset'

@Component
export class VPFieldset extends Fieldset { }
export default VPFieldset
</script>