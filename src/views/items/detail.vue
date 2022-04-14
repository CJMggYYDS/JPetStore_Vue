<template>
    <el-row class="box">
        <el-col :span="3"><div class="grid-content bg-purple"><div>&nbsp;</div> </div></el-col>
        <el-col :span="9">
            <div class="grid-content bg-purple-light">
                <div class="focus-banner-con-wrq">
                    <el-image style='width:400px;height:290px;' fit='cover' :src="getImgUrl(item.imgURL)"></el-image>
                </div>
            </div></el-col>
        <el-col :span="8"> 
            <div class="grid-content bg-purple " style="margin-top:20px">
                <el-descriptions title="商品详细信息" :column="1" size="normal" border>
                <el-descriptions-item label="ProductId" >{{item.productId}}</el-descriptions-item>
                <el-descriptions-item label="ItemId">{{item.itemId}}</el-descriptions-item>
                <el-descriptions-item label="PetName">{{item.name}}</el-descriptions-item>
                <el-descriptions-item label="Price">${{item.price}}</el-descriptions-item>
                <el-descriptions-item label="Description">{{item.attr}}</el-descriptions-item>
                <el-descriptions-item label="Number"> 
                    <el-input-number v-model="num"  size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
                </el-descriptions-item>
                </el-descriptions>
                <el-button class="buttom" type="primary" @click="addToCart()">Add to Cart</el-button>
            </div></el-col>
        </el-row>
</template>

<script>
    export default {
        name:'Detail',
        data() {
            return {
                num:1,
                item:{
                    // productId:"AV-CB-02",
                    // itemId:this.$route.query.itemId,
                    // name:'13',
                    // price:99.00,
                    // attr:"pretty bird",
                    // imgURL: 'assets/Bird.png'
                }
            }
        },
        methods: {
            getData(){
                this.axios.get('/catalog/items/'+this.$route.query.itemId).then(response =>{
                    var dataItem = response.data.data
                    var temp ={
                        productId : dataItem.productId,
                        itemId : dataItem.itemId,
                        name : dataItem.productName,
                        attr : dataItem.attribute1,
                        price :dataItem.listPrice,
                        imgURL : dataItem.attribute2,
                    }
                    console.log("&",temp)
                    this.item = temp
                }).catch(error =>{
                    this.$message.error(error)
                })
            },
            addToCart(){
                // this.axios.post('/cart/insert',{
                //     username = this.$store.state.account.username,
                //     itemId : dataItem.itemId,
                //     quantity : dataItem.quantity,
                //     productId : dataItem.productId
                // })
                // .then(res=>{
                //     if(res.data.status)
                //     {
                //          this.$router.push('/cart')
                //     }
                // })

            },
            getImgUrl(url){
                return require("@/"+url)
            }
        },
        created(){
            this.getData()
        }
    }

</script>

<style scoped>
.box{
    height: 500px;
    background-color: #d3cfd9;
}
.image{
    border:1px solid #f2f2f2;
    width : 250px;
    height: 250px;
    margin-top: 60px;
    padding: 15px;
}

.focus-banner-con-wrq {
    margin-top: 40px;
    padding: 12px;
    padding-bottom: 0;
    background: #fff;
    background: rgba(255,255,255,.86);
    width: 400px;
    height: 300px;
    position: relative;
    box-shadow: 0 1px 3px rgb(167 167 167 / 40%);
}
.fontStyle{
    font-size:20px;
    font-weight: 600;
}
.buttom{
    margin-top:20px;
    margin-left:100px;
}


</style>