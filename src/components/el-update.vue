<template>
  <div class="el-class5">
    <el-markdown v-model="md.textInfo"></el-markdown>
    <div style="float: right;margin-top: 10px">
      <el-button @click="openModal" type="primary" >完成</el-button>
      <el-button @click="md.textInfo=''" type="success" >清空</el-button>
    </div>


    <el-dialog
      width="500px"
      title="补全信息"
      :visible.sync="modal"
      style="text-align: left">
      <el-form :model="md" label-width="80px" >
        <el-form-item label="标题">
          <el-input v-model="md.title" placeholder="TITLE" style="width: 215px"/>
        </el-form-item>
        <el-form-item label="TAG">
          <el-select v-model="md.tag"
            multiple
          filterable
          allow-create>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="subMd">提交</el-button>
          <el-button @click="modal=false" type="success">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
    import axios from 'axios'
    export default {

        data(){
            return{
                modal:false,
                md:{
                }
            }
        },
        methods:{
            openModal(){
                this.modal=true
            },
            subMd(){
                axios.post('app/api/v1/update',this.md,    {
                    headers:{
                        "USER_ID":cookie.get('LOGIN_USER_ID'),
                        "USER_TOKEN":cookie.get('LOGIN_USER_TOKEN')
                    }
                }).then(res=>{
                    // console.log(res.data)
                    this.$message({
                        type:'success',
                        message:'上传成功'
                    })
                    this.md.title=''
                    this.md.tag=[]
                    this.modal=false
                    this.$router.push({
                        path:'/index/article/'+this.md.id
                    })
                })
            }
        },
        mounted(){
            let articleId=cookie.get('articleId')
            axios.get('app/api/v1/'+articleId,    {
                headers:{
                    "USER_ID":cookie.get('LOGIN_USER_ID'),
                    "USER_TOKEN":cookie.get('LOGIN_USER_TOKEN')
                }
            }).then(res=>{
                // console.log(res.data)
                this.md=res.data
                // console.log(res.data[res.data.length])
                // this.$set(this.md,'tag',res.data.tag)
            })
        },
        components:{
            elMarkdown
        }
    }
    import elMarkdown from '@/components/el-markdown'
    import cookie from 'js-cookie'
</script>
<style scoped>
  .el-class5{
    width: 100%;min-height: 100%
  }
</style>
