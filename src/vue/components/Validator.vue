<template>
    <div class="validator">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { Component, Mixins } from 'vue-property-decorator'
import Validatable from '@/vue/mixins/Validatable'

@Component
export class VPValidator extends Mixins(Validatable) { }
export default VPValidator
</script>