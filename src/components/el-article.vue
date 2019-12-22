<template>
  <div style="text-align: left" >
    <el-link type="success" :href="'#/index/article/'+md.id">
      <template v-for="item in md.tag">
        [{{item}}]
      </template>
      {{md.title}}
    </el-link>
    <hr>
    <div class="markdown-body" style="text-align: left;min-height: 900px" v-html="textHtml"/>
    <div style="float:right;">
      <el-button type="success" @click="handleUpdate">修改</el-button>
      <el-button type="primary" @click="handleDelete">删除</el-button>

    </div>
  </div>
</template>
<script>
    import marked from 'marked'
    import axios from 'axios'
    import cookie from 'js-cookie'
    export default {
        data(){
            return{
                md:{
                    tag:[],
                    textInfo:''
                }
            }
        },
        methods:{
            handleDelete(){
              axios.delete('app/api/v1/delete/'+this.md.id,
                  {
                      headers:{
                          "USER_ID":cookie.get('LOGIN_USER_ID'),
                          "USER_TOKEN":cookie.get('LOGIN_USER_TOKEN')
                      }
                  }).then(res=>{
                  this.$message({
                      type:'success',
                      message:"已成功删除"
                  })
                  this.$router.push({
                      path:'/index/read'
                  })
              })
            },
          handleUpdate(){
              // console.log(this.md.id)
              this.$store.commit('setOperateArticleId',this.md.id)
              this.$router.push({
                  path:'/index/update'
              })
          }
        },
        computed:{
            textHtml(){
                return marked(this.md.textInfo)
            }
        },
        mounted(){
            axios.get('app/api/v1/'+this.$route.params.id,    {
                headers:{
                    "USER_ID":cookie.get('LOGIN_USER_ID'),
                    "USER_TOKEN":cookie.get('LOGIN_USER_TOKEN')
                }
            }).then(res=>{
                if (this.md!==null){
                    this.md=res.data
                }
            }).catch(err=>{
                this.$router.push({
                    path:'/index/read'
                })
            })
        }
    }
</script>
<style scoped>
</style>
