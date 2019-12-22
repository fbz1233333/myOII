<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item,index) in navigation" :key="index" :to="item.path">
      {{item.text}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
    computed:{
        navigation(){
            return this.$store.getters.getBreadCrumb
        }
    },
    methods:{
      getNavigation(route){
          let matched=route.matched

          let breadcrumb=[]

          for(let i=0;i<matched.length;i++){
              let obj={
                  text:matched[i].meta.breadTag,
                  path:matched[i].path
              }
              breadcrumb.push(obj)
          }
          this.$store.commit('setBreadCrumb',breadcrumb)
      }
    },
    watch:{
        '$route'(val){
            this.getNavigation(val)
        }
    },
    mounted(){
        this.getNavigation(this.$route)
    }
}
</script>
<style scoped>
</style>
