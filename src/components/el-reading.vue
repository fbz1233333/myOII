<template>
  <div style="text-align: left">
    <el-link href="#/index/read" type="primary">文章列表</el-link>
    <hr>
    <div style="padding: 10px 20px 20px 10px;">
      <div  v-for="(item,index) in articles" :key="index" >
        <el-link type="success" :href="'#/index/article/'+item.id">
            {{item.tag}}{{item.title}}
        </el-link>
        <el-link disabled style="float: right">
          {{item.createTime}}
        </el-link>
      </div>

    </div>
  </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                articles:[]
            }
        },
        mounted(){
            axios.get('app/api/v1/random',    {
                headers:{
                    "USER_ID":cookie.get('LOGIN_USER_ID'),
                    "USER_TOKEN":cookie.get('LOGIN_USER_TOKEN')
                }
            }).then(res=>{
                this.articles=res.data
                console.log(this.articles)
            })
        }
    }
    import cookie from 'js-cookie'

</script>
<style scoped>
</style>
