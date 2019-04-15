<template>
    <div class="validator">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Validatable from '@/vue/mixins/Validatable.js'

export default Vue.extend({
  mixins: [ Validatable ]
})
</script>