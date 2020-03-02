<template>
    <main class="uk-container">
        <div class="uk-flex uk-width-1-1">
            <div class="uk-card uk-card-body uk-width-1-3">
                <ValidPlusForm v-model:sync="model" />
            </div>
            <hr class="uk-divider-vertical uk-height-1-1" />
            <div class="uk-card uk-card-body uk-width-1-3">
                <VPVueMixins v-model:sync="model" />
            </div>
            <hr class="uk-divider-vertical uk-height-1-1" />
            <div class="uk-card uk-card-body uk-width-1-3">
                <VPVueForm v-model:sync="model" />
            </div>
        </div>
    </main>
</template>

<script>
    import VPVue from 'VPVue'
    import VPVueForm from '#/Forms/VPVue.vue'
    import ValidPlusForm from '#/Forms/ValidPlus.vue'
    import VPVueMixinsForm from '#/Forms/VPVueMixins.vue'

    export default {
        mixins: [ VPVue.mixins.Validatable ],
        data() {
            return {
                model: {
                    name: {
                        first: '',
                        last: ''
                    },
                    contact: {
                        phone: '',
                        email: '',
                        address: {
                            city: '',
                            state: '',
                            street1: '',
                            street2: '',
                            zip: '',
                        }
                    }
                }
            }
        },
        components: {
            VPVueForm,
            ValidPlusForm,
            VPVueMixinsForm,
            VpFieldset: VPVue.Fieldset,
            VpField: VPVue.Field
        }
    }
</script>

<style lang="less">
    @import (css) "https://cdn.jsdelivr.net/npm/uikit@3.3.2/dist/css/uikit.min.css";

    * {
        box-sizing: border-box;
    }

    body {
        display: flex;
        min-height: 100vh;
        margin: 0;
    }

    .field-title {
        margin-bottom: -0.25rem;
        font-weight: 500;
    }

    .testing-ground {
        display: flex;
        flex-flow: column;
        min-height: 100vh;
        width: 100%;

        &__wrapper {
            display: flex;
            flex-flow: column;
            flex: 1 1 auto;
        }
    }
</style>
