<template>
  <div style="text-align: left">

    <el-link href="#/index/write" type="primary">写作</el-link>
    <hr>
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
    import cookie from 'js-cookie'
    export default {

        data(){
            return{
                modal:false,
                md:{
                    textInfo:'',
                    title:'',
                    tag:'',
                }
            }
        },
        methods:{

            openModal(){
                this.modal=true
            },
            subMd(){
                axios.post('app/api/v1',this.md,    {
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
                    this.md.textInfo=''
                    this.md.title=''
                    this.md.tag=[]
                    this.modal=false

                    this.$router.push({
                        path:'/index/read'
                    })
                })
            }
        },
        components:{
            elMarkdown
        }
    }
    import elMarkdown from '@/components/el-markdown'
</script>
<style scoped>
  .el-class5{
    background-color: darkcyan;width: 100%;min-height: 100%
  }
</style>
