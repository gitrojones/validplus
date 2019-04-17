<template>
    <div class="VPField">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { Component, Mixins } from 'vue-property-decorator'
import { Field } from '@/vue/mixins/Field'

@Component
export class VPField extends Mixins(Field) { }
export default VPField
</script>
