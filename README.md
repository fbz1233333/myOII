# myoii

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# AXIOS请求
 axios.post('app/api/v2/logout',{
                     id:userId
                 },{
                   headers:{
                       "USER_ID":cookie.get('LOGIN_USER_ID'),
                       "USER_TOKEN":cookie.get('LOGIN_USER_TOKEN')
                   }
                 }).then(res=>{
                     let result=res.data.logoutResult
                     if (result==='LOGOUT_SUCCESS'){
                         this.$message({
                             type:"success",
                             message:'用户'+userName+'成功退出'
                         })
                     }
                 }).catch(error=>{
                     this.$store.dispatch('showError',error)
                 })
