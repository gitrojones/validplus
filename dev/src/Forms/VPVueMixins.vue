<template>
    <form action="#" class="uk-form" @submit="validate">
        <button class="uk-button" type="submit">Submit Form</button>
    </form>
</template>

<script>
    import VPVue from 'VPVue'
    import VPFieldset from '#/Components/Fieldset.vue'
    import VPField from '#/Components/Field.vue'

    export default {
        mixins: [VPVue.mixins.Validatable],
        methods: {
            validate() {
                Promise.resolve(this.validator.isValid())
                    .then((isValid) => {
                        this.$emit('isValid', isValid);
                    })
            }
        },
        components: {
            VPField,
            VPFieldset
        }
    };
</script>

<style lang="less" scoped>

</style>
