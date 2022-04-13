<template>
<<<<<<< Updated upstream
  <div>
    <MyHeader/>
      <router-view></router-view>
    <MyFooter/>
=======
  <div id="app">
   <router-view/>
>>>>>>> Stashed changes
  </div>
</template>

<script>
<<<<<<< Updated upstream
  import MyHeader from './components/my-header.vue'
  import MyFooter from './components/my-footer.vue'
  export default {
    name:'App',
    components:{
      MyFooter,
      MyHeader
=======


export default {
  
  name: 'App',
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
>>>>>>> Stashed changes
    }
  }
</script>

<style>

</style>