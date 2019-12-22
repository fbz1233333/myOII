import {Message} from "element-ui";
import cookie from 'js-cookie'
export default {
  state:{
    LOG_STATE:cookie.get('LOG_STATE'),
    LOGIN_USER_ID:cookie.get('LOGIN_USER_ID'),
    LOGIN_USER_NAME:cookie.get('LOGIN_USER_NAME'),
    LOGIN_USER_TOKEN:cookie.get('LOGIN_USER_TOKEN')
  },
  getters:{
    getLogState(state){
      return state.LOG_STATE
    },
    getUserId(state){
      return state.LOGIN_USER_ID
    },
    getUserInfo(state){
      return  {
        USER_ID:state.LOGIN_USER_ID,
        USER_NAME:state.LOGIN_USER_NAME,
        USER_TOKEN:state.LOGIN_USER_TOKEN,
      }
    }
  },
  mutations:{
    setLogState(state,data){
      state.LOG_STATE=data
    },
    loginSuccess(state,data){

      state.LOG_STATE='LOG_IN'
      state.LOGIN_USER_ID=data.userInfo.id
      state.LOGIN_USER_NAME=data.userInfo.name
      state.LOGIN_USER_TOKEN=data.token

      cookie.set('LOG_STATE','LOG_IN')
      cookie.set('LOGIN_USER_ID',data.userInfo.id)
      cookie.set('LOGIN_USER_NAME',data.userInfo.name)
      cookie.set('LOGIN_USER_TOKEN',data.token)
    },
    logoutSuccess(state){

      state.LOG_STATE='LOG_OUT'
      state.LOGIN_USER_ID=''
      state.LOGIN_USER_NAME=''
      state.LOGIN_USER_TOKEN=''

      cookie.set('LOG_STATE','LOG_OUT')
      cookie.remove('LOGIN_USER_ID')
      cookie.remove('LOGIN_USER_NAME')
      cookie.remove('LOGIN_USER_TOKEN')
    }
  },
  actions:{

  }
}
