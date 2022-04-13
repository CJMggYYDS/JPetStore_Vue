<template>
  <div class="container">
    <div class="block">
      <div>&nbsp;</div>
      <el-carousel height="500px">
        <el-carousel-item v-for="(category,index) in categories" :key="index">
          <h3 class="small"><img :src="getImgUrl(category.imgURL)" @click="turnToItem(category.categoryId)"></h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories:[
        {
          categoryId:'Birds',
          imgURL: 'assets/Bird.png',
        },
        {
          categoryId:'Cats',
          imgURL: 'assets/Cat.png'
        },
        {
          categoryId:'Dogs',
          imgURL: 'assets/Dog.png',
        },
        {
          categoryId:'Fish',
          imgURL: 'assets/Fish.png' ,
        },
        {
          categoryId:'Reptiles',
          imgURL: 'assets/Reptile.png' ,
        }
      ]
    }
  },
  methods: {
    getData(){
      //发送数据获取categories
       this.axios.get('').then(response =>{
          if(response.data.status ===0){
              response.data.data.forEach((category) => {
                  var temp = {
                    categoryId : category.categoryId,
                    imgURL : category.imgURL
                  }
                  this.categories.push(temp)
              });
          }
      }).catch(error =>{
          this.$message.error(response.data.msg)
      })
    },
    turnToItem(categoryId){
      this.$router.push('/item?category='+categoryId)
    },
    getImgUrl(url){
      console.log(url)
      return require("@/"+url)
    }
  },
  created() {
    this.getData()
  },
}
</script>

<style scoped>
.container{
  height: 600px;
}
.el-carousel__item h3 {
  text-align: center;
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 250px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
   background-color: #99a9bf;
}
  
.el-carousel__item:nth-child(2n+1) {
   background-color: #d3dce6;
}


img {
  width: 100%;
  height: 80%;
}
</style>