<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .el-h1{
    font: 20px Extra large;
  }
  .el-h2{
    font: 18px large
  }
  .el-h3{
    font:16px Medium
  }
  .el-p1{
    font: 14px Base;
  }
  .el-p2{
    font: 13px Small;
  }
</style>
