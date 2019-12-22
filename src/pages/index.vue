<template>

  <el-container>
    <el-aside width="400px">
      el-aside
    </el-aside>
    <el-container>
      <el-header height="120px">
        Header

          <el-login-tag></el-login-tag>

      </el-header>
      <el-navigation class="el-navigation">

      </el-navigation>

      <el-container style="min-height: 1200px">
        <el-aside width="300px" class="el-class1">

          <el-operate>

          </el-operate>
        </el-aside>

        <el-container class="el-class3">

          <div class="el-class4">
            <router-view/>
          </div>
        </el-container>
      </el-container>
      <el-footer height="70px">
        footer
      </el-footer>
    </el-container>
    <el-aside width="400px">

    </el-aside>
  </el-container>


</template>
<script>
    import elNavigation from '@/components/el-navigation'
    import elOperate from '@/components/el-operate'
    import elLoginTag from '@/components/el-login-tag'
    export default {
        data(){
            return{
                msg:"首页"
            }
        },
        components:{
            elNavigation,elOperate,elLoginTag
        }
    }
</script>
<style scoped>
  .el-header{
    background-color: lightgrey;
  }
  .el-aside{
    background-color: darkgreen;
  }
  .el-footer{
    background-color: lightgrey;
  }
  .el-navigation{
    background-color: #2c3e50
  }
  .el-class1{
    background-color: blue;padding: 30px
  }

  .el-class3{
    background-color: dodgerblue
  }
  .el-class4{
    background-color: beige;margin: 20px;padding:20px;width: 100%;
  }

</style>
