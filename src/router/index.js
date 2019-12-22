import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      meta:{
        title:'首页',
        breadTag:'首页'
      },
      name: 'index',
      component: index,
      children:[
        {
          path: 'write',
          meta: {
            title: 'writing',
            breadTag: '写'
          },
          component: elWriting
        },
        {
          path:'read',
          meta:{
            title: "article",
            breadTag: '文章列表'
          },
          component: elReading
        },
        {
          path:'article/:id',
          meta:{
            title:'article',
            breadTag:'正在阅读'
          },
          component: elArticle

        },
        {
          path:'update',
          meta:{
            title:'update',
            breadTag:'修改文章'
          },
          component: elUpdate
        }
      ]
    },
    {
      path: '/',
      redirect:'/index'
    }
  ]
})
import elUpdate from '@/components/el-update'
import elArticle from '@/components/el-article'
import elReading from '@/components/el-reading'
import elWriting from '@/components/el-writing'
