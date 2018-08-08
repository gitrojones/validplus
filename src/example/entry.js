import Vue from 'vue'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import test from './test.vue'

Vue.use(element)

new Vue({
  el: '#app',
  render: h => h(test)
})
