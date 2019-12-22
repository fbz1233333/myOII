// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

// ---
import Vuex from 'vuex'
Vue.use(Vuex)
import store1 from './store/store'
import info from "./store/info";
import user from "./store/user";
const store=new Vuex.Store({
  modules:{
    store1,info,user
  }
})

//---
router.beforeEach((to,from,next)=>{
  window.document.title=to.meta.title
  next()
})

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
})
