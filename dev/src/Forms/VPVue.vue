<template>
    <form action="#" class="uk-form">
        <Fieldset>
            <Field>
                <label for="first-name">First name:</label>
                <input id="first-name" type="text" v-model="model.name.first" />
            </Field>

            <Field>
                <label for="last-name">Last name:</label>
                <input id="last-name" type="text" v-model="model.name.last" />
            </Field>
        </Fieldset>
    </form>
</template>

<script>
import VPVue from 'VPVue'

export default {
    props: {
        model: {
            type: Object,
            default() {
                return {
                    name: {
                        first: '',
                        last: ''
                    }
                };
            }
        }
    },
    components: {
        Field: VPVue.Field,
        Fieldset: VPVue.Fieldset
    }
}
</script>

<style lang="less" scoped>

</style>

