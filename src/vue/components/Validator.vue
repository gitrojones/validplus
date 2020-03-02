<template>
    <div class="validator">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Validatable from '@/vue/mixins/Validatable'

@Component
export class VPValidator extends Validatable { }
export default VPValidator
</script>