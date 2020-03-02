import Vue from 'vue'
import TestingGround from './src/Page.vue'
import 'webpack-hot-middleware/client?reload=true'

const vue = new Vue({
  el: '#app',
  components: {
    dev: TestingGround
  },
  render: h => {
    return h('dev', null, null)
  }
})
