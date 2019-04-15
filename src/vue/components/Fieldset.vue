<template>
    <div class="VPFieldset">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Fieldset from '@/vue/mixins/Fieldset'

export default Vue.extend({
  mixins: [ Fieldset ]
})
</script>