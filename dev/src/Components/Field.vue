<template>
  <div class="test-field">
    <slot name="pre"></slot>
    <slot>
      <input :id="id"
        :name="name"
        :type="type"
        :value="value"
        required
      />
    </slot>
    <slot name="post"></slot>
  </div>
</template>

<script>
  import VPVue from "VPVue"

  export default {
    props: {
      id: {
        type: String,
        required: false,
        default() { return Math.random().toString(36).substr(2,9) }
      },
      name: {
        type: String,
        required: false,
        default() { return 'input__' + this.id; }
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    mixins: [ VPVue.mixins.Field ]
  };
</script>

<style lang="less" scoped> </style>
