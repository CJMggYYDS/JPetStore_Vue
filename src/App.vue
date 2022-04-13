<template>
<div>
  <MyHeader/>
    <router-view></router-view>
  <MyFooter/>
</div>
</template>

<script>
  import MyHeader from './components/my-header.vue'
  import MyFooter from './components/my-footer.vue'
  export default {
    name:'App',
    components:{
      MyFooter,
      MyHeader
    }
  }
</script>

<style>

</style>