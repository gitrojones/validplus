import Vue from 'vue'
import VPVue from 'VPVue'
import TestingGround from './src/testing-ground.vue'
import 'webpack-hot-middleware/client?reload=true'

Vue.use(VPVue);

const vue = new Vue({
  el: '#app',
  components: {
    dev: TestingGround
  },
  render: h => {
    return h('dev', null, null)
  }
})
