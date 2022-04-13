<template>
  <div class="container">
    <my-header></my-header>
    <slot></slot>
    <el-backtop :visibility-height="10"></el-backtop>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myFooter from '../common/my-footer'
import myHeader from '../common/my-header'
export default {
  name : 'defaultView',
  components: {
    myHeader,
    myFooter
  }
} 
</script>

<style scoped>
</style>