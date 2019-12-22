<template>
  <div class="el-class2">
    <el-menu mode="vertical" router>
      <el-menu-item index="/index/write" route="/index/write">
        <i class="el-icon-document"></i>
        <span slot="title">写作</span>
      </el-menu-item>
      <el-menu-item index="/index/read">
        <i class="el-icon-apple"></i>
        <span slot="title">文章</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped>
  .el-class2{
    background-color: dodgerblue;min-height:400px;width: 100%;margin-top: 40px;
  }
</style>
