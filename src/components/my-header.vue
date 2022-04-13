<template>
  <el-menu :default-active="$route.path" 
          class="el-menu-demo" 
          mode="horizontal" 
          @select="handleSelect"
          router>
  <el-menu-item index="/">JPetStore</el-menu-item>
  
  <el-submenu v-for="(item,i) in categories" :key ='i' :index='item.categoryId'>
    <template slot='title'>{{item.categoryId}}</template>
    <el-menu-item v-for="(product,subIndex) in item.products" :key='subIndex' :index="`/item?productId=${product.productId}`">
      {{product.productId}}</el-menu-item>
  </el-submenu>

  <el-col :span="3">
    <el-autocomplete
      style="margin-top :7px"
      prefix-icon="el-icon-search"
      class="inline-input"
      v-model="keyWord"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @keyup.enter.native="search"></el-autocomplete>
  </el-col>
  <el-col :span="2"><el-button style="margin-top :7px" type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col>
  <el-menu-item index="7">个人中心</el-menu-item>
  <el-menu-item index="8">购物车</el-menu-item>
  <el-menu-item index="9">订单管理</el-menu-item>
  <el-menu-item index="10">登入/登出</el-menu-item>
</el-menu>

</template>

<script>
    export default {
        name:'MyHearder',
        data() {
            return {
              keyWord:'',
              productList:[],
              //需要发送的数据
              categories:[
                {
                  categoryId:'Birds',
                  products:[
                    { 
                      productId:'AV-CB-01',
                      value:'鹦鹉'
                    },
                    {
                      productId:'AV-CB-02',
                      value:'燕子'
                    }]
                },
                {
                  categoryId:'Cats',
                  products:[
                    { 
                      productId:'FL-DLH-02',
                      value:'英国短尾猫'
                    },
                    {
                      productId:'FL-DSH-01',
                      value:'狸花猫'
                    }]
                },
                {
                  categoryId:'Dogs',
                  products:[
                    { 
                      productId:'K9-BD-01',
                      value:'哈士奇'
                    },
                    {
                      productId:'K9-CW-01',
                      value:'杜宾犬'
                    }]
                },
                {
                  categoryId:'Fish',
                  products:[
                    { 
                      productId:'FI-FW-01',
                      value:'天使鱼'
                    },
                    {
                      productId:'FI-FW-02',
                      value:'金鱼'
                    }]
                },
                {
                  categoryId:'Reptiles',
                  products:[
                    { 
                      productId:'RP-LI-02',
                      value:'竹叶青'
                    },
                    {
                      productId:'RP-SN-01',
                      value:'蜘蛛'
                    }]
                }
              ]
            };
        },
        methods: {
            getData(){
              this.axios.get('').then(response =>{
                  if(response.data.status ===0){
                      this.categories = response.data.data
                  }
              }).catch(error =>{
                  this.$message.error(response.data.msg)
              })
              
            },
            querySearch(queryString, cb) {
              var productList = this.productList
              this.categories.forEach(item => {
                for(var i=0;i<item.products.length;i++)
                {
                  if(productList.indexOf(item.products[i]) === -1)
                    productList.push(item.products[i])
                }
              });
              var results = queryString ? productList.filter(this.createFilter(queryString)) : productList;
               // 调用 callback 返回建议列表的数据
              cb(results);
            },
            createFilter(queryString) {
              return (item) => {
                return (item.value.toLowerCase().match(queryString.toUpperCase()))
              }
            },
            search(){
              this.$router.push('/item?keyWord='+this.keyWord)
              this.keyWord =''
            }
        },
        created() {
          this.getData()
        },
    }
</script>

<style>

</style>