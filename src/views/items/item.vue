<template>
<div class="color">
    <div class="box">
        <ul class="pc-search-items-list">
            <li id='item' v-for="(item,i) in items " :key="i" @click='turnToDetail(item.id)' class="pc-items-item">
                <img class="pc-items-item-img img-loaded" fit='cover' :src="getImgUrl(item.imgURL)">
                <div class="pc-items-item-title pc-items-item-title-row2">
                    <span>{{item.name}}</span>
                </div>
                <div class="price-con">
                    <span class="coupon-price-title">$</span>
                    <span class="coupon-price-afterCoupon">{{item.price}}</span>
                </div>
            </li>
        </ul>
        <!-- <el-pagination @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange" 
                    :current-page="currentPage" 
                    :page-sizes="pageSizes" 
                    :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
                    :total="totalCount">
        </el-pagination> -->

    </div>
</div>
</template>

<script>
    export default {
        name:'Item',
        data() {
            return {
                //需要的数据
                items:[]
            }
        },
        components:{
        },
        methods: {
            getData(){
                if(this.$route.query.productId){
                    this.axios.get('/catalog/products/'+this.$route.query.productId+'/items'
                    ).then(response =>{
                        if(response.data.status ===1){
                            this.items.splice(0, this.items.length)
                            response.data.data.forEach((item) => {
                                var temp = {
                                    name: item.attribute1,
                                    id: item.itemId,
                                    imgURL: item.attribute2,
                                    price :item.listPrice
                                }
                                this.items.push(temp)
                            });
                        }
                    }).catch(error =>{
                        this.$message.error(error)
                    })
                }else if(this.$route.query.category){
                    this.axios.get('/catalog/'+this.$route.query.category+'/items'
                    ).then(response =>{
                        if(response.data.status ===1){
                            this.items.splice(0, this.items.length)
                            response.data.data.forEach((item) => {
                                var temp = {
                                    name: item.attribute1,
                                    id: item.itemId,
                                    imgURL: item.attribute2,
                                    price :item.listPrice
                                }
                                this.items.push(temp)
                            });
                        }
                    }).catch(error =>{
                        this.$message.error(error)
                    })
                }else if(this.$route.query.keyWord){
                     this.axios.get('/items/search',{
                       params:{
                            keyWord: this.$route.query.keyWord
                       }
                    }).then(response =>{
                        if(response.data.status ===1){
                            this.items.splice(0, this.items.length)
                            response.data.data.forEach((item) => {
                                var temp = {
                                    name: item.name,
                                    id: item.id,
                                    imgURL: item.imgURL,
                                    price :item.price
                                }
                                this.items.push(temp)
                            });
                        }
                    }).catch(error =>{
                        this.$message.error(error)
                    })
                }
            },
            turnToDetail(itemId){
                this.$router.push('/item/detail?itemId='+itemId)
            },
            getImgUrl(url){
                console.log(url)
                return require("@/"+url)
            }
        },
        created() {
            this.getData()
        },
        watch: {
            '$route'() {
                this.getData();
            }
        }
    }
</script>

<style scoped>
.color{
    background-color: #d3cfd9;
}
.box{
    width:1100px;
    height:100%;
    margin-left :130px;
    margin-top :1px
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 10em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
}

.pc-search-items-list {
    width: 1000px;
    font-size: 0px;
    /* border-top: 1px solid #f2f2f2; */
    border-left: 1px solid #f2f2f2;
    
}

.pc-search-items-list .pc-items-item {
    display:inline-block;
    width: 200px;
    height: 300px;
    box-sizing: border-box;
    display: inline-block;
    font-size: 12px;
    border: 3px solid #f2f2f2;
    /* border-top: none;
    border-left: none; */
    background: #fff;
    vertical-align: top;
    padding: 10px 20px 0;
}
.pc-search-items-list .pc-items-item-img {
    width: 180px;
    height: 180px;
}
img {
    border: 0 none;
    width: auto\9;
    height: auto;
    max-width: 100%;
    vertical-align: top;
    -ms-interpolation-mode: bicubic;
    height: 100%;
    width: 100%;
    object-fit: cover;

    object-position: center;
}
.pc-search-items-list .pc-items-item-title.pc-items-item-title-row2 {
    height: 40px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.pc-search-items-list .pc-items-item-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9b9b9b;
    line-height: 20px;
    padding-top: 10px;
}
.pc-search-items-list .price-con {
    height: 25px;
    padding: 6px 0 0;
    line-height: 1.6;
}
.pc-search-items-list .price-con .coupon-price-title {
    vertical-align: baseline;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #fd3f31;
}
.pc-search-items-list .price-con {
    height: 25px;
    padding: 6px 0 0;
    line-height: 1.6;
}
.pc-search-items-list .price-con .coupon-price-afterCoupon {
    margin-left: 4px;
    vertical-align: baseline;
    text-align: left;
    line-height: 25px;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #fd3f31;
}
#item:hover{
    border-color: orange;
}
</style>