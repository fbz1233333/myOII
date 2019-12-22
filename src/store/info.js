import {Message} from "element-ui";
export default {
  state:{
  },
  getters:{

  },
  mutations:{

  },
  actions:{
    showError(context,error){
      let errors=error.response.data.errors
      for(let i=0;i<errors.length;i++){
        let message=errors[i].defaultMessage;
        setTimeout(()=>{
          Message({
            type:'error',
            message:message
          })
        })
      }
    }
  }
}
