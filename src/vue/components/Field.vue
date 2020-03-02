<template>
    <div class="VPField">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Field } from '@/vue/mixins/Field'

@Component
export class VPField extends Field { }
export default VPField
</script>
