import Vue from 'vue'
import TestingGround from './src/testing-ground.vue'
import 'webpack-hot-middleware/client?reload=true'

export default new Vue({
  el: '#app',
  components: {
    dev: TestingGround
  },
  render: h => {
    return h('dev', null, null)
  }
});
