<template>
  <div style="float: right;">
    <div>
      <el-link type="primary" @click="handleClick1">登录</el-link>
      <el-link type="info" @click="handleClick2">注册</el-link>
      <el-link type="success" @click="handleLogout">注销</el-link>

    </div>

    <div class="el-p2" v-if="LOG_CHECK">
      {{LOG_STATE}}
      {{LOGIN_USER_INFO}}
      <el-button type="success" @click="LOG_CHECK=false">关闭</el-button>
    </div>

    <el-dialog
      :visible.sync="show"
      width="500px"
      :show-close="false"
      style="text-align: left">
      <el-tabs v-model="activeName" type="card" style="margin-top: -30px">
        <el-tab-pane label="登录" name="login">
          <el-form
            :rules="rulesLogin"
            :model="form"
            ref="form"
            label-position="left"
            label-width="80px">

            <el-form-item label="用户名" prop="name" required>
              <el-input v-model="form.name" style="width: 215px;"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" required>
              <el-input v-model="form.password" style="width: 215px;"></el-input>
            </el-form-item>
            <el-form-item>

              <el-button type="primary" @click="submitForm('form')">登录</el-button>
              <el-button type="success" @click="show=false">取消</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form
            :rules="rulesRegister"
            :model="form2"
            ref="form2"
            label-position="left"
            label-width="80px">

            <el-form-item label="用户名" prop="name" required>
              <el-input v-model="form2.name" style="width: 215px;"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" required>
              <el-input v-model="form2.password" style="width: 215px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form2')">注册</el-button>
              <el-button type="success" @click="show=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

    </el-dialog>


  </div>
</template>
<script>
    export default {
        computed:{
            LOG_STATE(){
                return this.$store.getters.getLogState
            },
            LOGIN_USER_INFO(){
                return this.$store.getters.getUserInfo
            }
        },
        data(){
            return{
                LOG_CHECK:true,
                activeName:'login',
                show:false,
                form:{
                    name:'',
                    password:''
                },
                form2:{
                    name:'',
                    password: ''
                },
                rulesLogin:{
                    name:[
                        {
                            required:true,
                            message:'请输入用户名',
                            trigger:'blur'
                        },
                        {
                            min:3,
                            max:5,
                            message: '长度在3到5个字符',
                            trigger: 'blur'
                        }
                    ],
                    password:[
                        {
                            required:true,
                            message:'请输入密码',
                            trigger:"blur"
                        },
                        {
                            min:6,max:8,
                            message: '密码在6-8个字符之间',
                            trigger: 'blur'
                        }

                    ]
                },
                rulesRegister:{
                    name:[
                        {
                            required:true,
                            message:'请输入用户名',
                            trigger:'blur'
                        },
                        {
                            min:3,
                            max:5,
                            message: '长度在3到5个字符',
                            trigger: 'blur'
                        }
                    ],
                    password:[
                        {
                            required:true,
                            message:'请输入密码',
                            trigger:"blur"
                        },
                        {
                            min:6,max:8,
                            message: '密码在6-8个字符之间',
                            trigger: 'blur'
                        }

                    ]
                },
            }
        },
        methods:{
            handleLogout(){
                let userId=cookie.get('LOGIN_USER_ID')
                let userName=cookie.get('LOGIN_USER_NAME')
                if (userId===undefined || userId.length!==36){
                    this.$message({
                        type:'warning',
                        message:'无法退出 用户状态错误'
                    })
                }else
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
                        this.$store.commit('logoutSuccess')
                        console.log('即便是删除了cookie,state的值仍然为',this.$store.getters.getUserId)
                    }
                }).catch(error=>{
                    this.$store.dispatch('showError',error)
                })

            },
            submitForm(formName){
                this.$refs[formName].validate((valid)=>{
                    switch (formName) {

                        //注册表单
                        case 'form2':
                            if (valid){
                                axios.post('app/api/v2/register',this.form2,    {
                                    headers:{
                                        "USER_ID":cookie.get('LOGIN_USER_ID'),
                                        "USER_TOKEN":cookie.get('LOGIN_USER_TOKEN')
                                    }
                                }).then(res=>{
                                    this.$message({
                                        type:'success',
                                        message:'注册成功',
                                    })
                                    this.show=false
                                }).catch(error=>{
                                        this.$store.dispatch('showError',error)
                                })
                            }else {
                                this.$message({
                                    type:"warning",
                                    message:'表单字段还存在问题'
                                })
                                return false
                            }
                            break;

                        case 'form':
                            if (valid){
                                axios.post('app/api/v2/login',this.form,    {
                                    headers:{
                                        "USER_ID":cookie.get('LOGIN_USER_ID'),
                                        "USER_TOKEN":cookie.get('LOGIN_USER_TOKEN')
                                    }
                                }).then(res=>{
                                    let  info=res.data.loginResult
                                    if (info==="LOGIN_SUCCESS"){
                                        let userName=res.data.userInfo.name
                                        this.$message({
                                            type:'success',
                                            message:'用户 '+userName+' 欢迎您',
                                        })
                                        this.$store.commit('loginSuccess',res.data)
                                        console.log('成功添加了信息,于是state变为',this.$store.getters.getUserId)
                                        this.show=false
                                    }else if (info==='NO_SUCH_USER'){
                                        this.$message({
                                            type:'warning',
                                            message:'没有这样的用户'
                                        })
                                    }

                                }).catch(error=>{
                                    this.$store.dispatch('showError',error)
                                })
                            }else {
                                this.$message({
                                    type:"warning",
                                    message:'表单字段还存在问题'
                                })
                                return false
                            }
                            break;
                        default:break
                    }

                })
            },
            handleClick1(){
                this.activeName='login'
                this.show=true
            },
            handleClick2(){
                this.activeName='register'
                this.show=true
            },
            handleLogin(){
                console.log('login')
            },
            handleRegister(){
                console.log('register')
            }
        }
    }
    import axios from 'axios'
  import cookie from 'js-cookie'
</script>
<style scoped>
</style>
