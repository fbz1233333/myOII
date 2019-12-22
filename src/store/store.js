import axios from 'axios'
import cookie from 'js-cookie'
export default {
  state:{
    breadcrumb:[],
    operateArticleId:''
  },
  getters:{
    getBreadCrumb(state){
      return state.breadcrumb
    },
    getOperateArticleId(state){
      return state.operateArticleId
    }
  },
  mutations:{
    setBreadCrumb(state,data){
      state.breadcrumb=data
    },
    setOperateArticleId(state,data){
      cookie.set('articleId',data)
      state.operateArticleId=data
    }
  },
}
