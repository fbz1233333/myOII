<template>

  <mavon-editor
    style="min-height: 800px"
    @change="input"
    :value="value"
    ref="md"
    @imgAdd="$imgAdd"
    @imgDel="$imgDel"
  ></mavon-editor>

</template>
<script>
export default {
    props:{
      value:{
          type:String,
          default:''
      }
    },
    methods:{
        input(value){
            this.$emit('input',value)
        },
        $imgAdd(pos,$file){
            let formData=new FormData();
            formData.append('image',$file)
            axios.post('/app/api/up',formData,    {
                headers:{
                    "USER_ID":cookie.get('LOGIN_USER_ID'),
                    "USER_TOKEN":cookie.get('LOGIN_USER_TOKEN')
                }
            }).then(res=>{
                // console.log(res.data)
                let base="app/image/"
                let url=base+res.data
                // console.log(url)
                this.$refs.md.$img2Url(pos, url);
            })

        },
        $imgDel(pos){
            //删除
            let url=pos[0]
            let fileName=url.substr(url.lastIndexOf('/')+1)
            axios.delete('app/api/delete/'+fileName,    {
                headers:{
                    "USER_ID":cookie.get('LOGIN_USER_ID'),
                    "USER_TOKEN":cookie.get('LOGIN_USER_TOKEN')
                }
            }).then(r=>{
                this.$message({
                    message: '删除了图片'+fileName,
                    type:'success'
                })
            })
        },
    }
}
import axios from 'axios'
import cookie from 'js-cookie'

</script>
<style scoped>
</style>
