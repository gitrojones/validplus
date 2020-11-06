import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import 'webpack-hot-middleware/client?reload=true';

import App from './app.vue';

Vue.use(SuiVue);

export default new Vue({
  el: '#app',
  name: 'ValidPlus Development',
  template: '<app></app>',
  components: {
    App
  }
});
