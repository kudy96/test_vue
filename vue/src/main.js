import Vue from 'vue';
import App from './App.vue';
import {router} from './routes/index.js';
import axios from 'axios';
import ElementUI from 'element-ui';
import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';


Vue.use(ElementUI);
Vue.use(ElementTiptapPlugin, {
  // lang: "zh",
  // spellcheck: false,
});

 
Vue.config.productionTip = false;
Vue.prototype.$http = axios;


new Vue({
  render: h => h(App),
  router
}).$mount('#app');
