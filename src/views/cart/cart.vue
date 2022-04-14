<template>
<div>
  <div class="table" >
    <el-table :data="allCartItems" ref="multipleTable" @selection-change="handleSelectionChange" show-summary sum-text="Total" :summary-method="getSum">
      <el-table-column type="selection" width="70">
      </el-table-column>
      <el-table-column align="center" label="Item ID" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <el-link type="primary" @click="$router.push('/item?id='+scope.row.itemId)">{{ scope.row.itemId }}</el-link>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Product ID" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.productId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Description" width="150">
        <template slot-scope="scope">
          <span v-html="scope.row.attribute1+' '+scope.row.name" style="margin-left: 10px"></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="In Stock?" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Quantity" width="150">
        <template slot-scope="scope">
          <!-- <span style="margin-left: 10px">{{ scope.row.item.quantity }}</span> -->
          <!-- <el-input-number size="mini" v-model="scope.row.item.quantity" @change="handleChange(scope.row, scope.row.item.quantity)" :min="0"></el-input-number> -->
          <el-input-number  size="mini" v-model="scope.row.quantity" @change="handleChange(scope.row)" @blur="handleChange(row)" :min="1"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" label="List Price" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.listPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Total Cost" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.listPrice * scope.row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Action" width="100">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)"> delete </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-if="subtotal" class="button">
    <el-button :disabled="shipping"  type="primary" size="mini" @click="submitOrder()" >Proceed to Checkout</el-button>
  </div>
  </div>
</template>

<script>

export default {
  name : 'cartView',
  data() {
    return {
      shopping : [],
      //局部的一个备份
      allCartItems: [],
      // subTotal: 0
    }
  },
  computed: {
    //计算总价
    subtotal() {
       let total = 0;
      for(let item of this.allCartItems) {
      total += item.quantity * item.listPrice;
      }
      return total;
    },

      
  },
  methods: {
    //计算总价
    getSum() {
      let sums = [];
      let total = 0;
      for(let item of this.allCartItems) {
      total += item.quantity * item.listPrice;
      }
      sums[1] = 'Total : ';
      sums[7] = total;
      return sums;
    },
    getData() {
      // 得到数据
      this.axios.get('/carts/usercart',{
        params:{
          username : "1"
        }
      })
      .then(res=>{
        if(res.data.status){
          this.allCartItems = res.data.data
          this.$store.commit('getAllCartItems',this.allCartItems)
        }
        else {
            this.$message('请先登入')
            //跳转到登录页
            this.$router.push('/signin?redirect=cart')
          }
      })
      .catch(err=>{
        console.log(err)
       this.$message('请先登入')
            //跳转到登录页
            this.$router.push('/signin?redirect=cart')
      })
      
    },
   handleChange(row) {
        
         this.axios.patch('/carts/update',{
          
             itemId: row.itemId,
           quantity: row.quantity,
           username : '1',
           productId: row.productId
           
           
         })
         .then(res=>{
           if(res.data.status ==1 ){
             this.$store.commit('updateAllCartItems',this.allCartItems);
            //  this.$store.getters.allCartItems = res.data.data.cart.allCartItems;
            //  this.$$store.commit('updateCart',res.data.data.cart);
            //  this.allCartItems = res.data.data.cart.allCartItems;
            //  this.subTotal = res.data.data.cart.subTotal;
           }
           else {
             this.$message(res.data.message)
           }
         })
         .catch(err=>{
           console.log(err)
         })
     },
    submitOrder() {this.$router.push('/newOrder')
      //提交订单,并跳往newOrder页面
      this.$store.commit('getShopping',this.$store.state.shopping);
      console.log(this.$store.shopping)
      // this.axios.post('/cart/cartItems',this.shopping)
      // .then(res=>{
      //   if(res.data.status)
      //   this.$router.push('/newOrder')
      //   else{
      //     this.$message('购买失败！');
      //   }
      // })
      // .catch(error=>{
      //   console.log(error)
      //   this.$message('购买失败！')
      // })
      
    },
    handleDelete(row) {
      let item1 ;
      for(let item of this.allCartItems){
        if(item.itemId === row.itemId){
          item1 = item;
          break;
        }
      }
      this.axios.delete('/carts/delete',{
        params : {
        itemId: row.itemId,
        quantity : row.quantity,
        username : '1',
        productId: row.productId
        }
      })
      .then(res=>{
        if(res.data.status){
          this.allCartItems.splice(this.allCartItems.indexOf(item1),1);
        }
        else {
          this.$message(res.data.message)
        }
      })
      //删除
    },
    handleSelectionChange(selection) {
       this.shopping = [];
      for(let item of selection) {
        this.shopping.push(item);
      }
      this.$store.commit('getShopping',this.shopping);
      console.log(this.$store.state.shopping)
      //选择改变
    },
   
  },
  
  created() {
    this.getData();
  },
}
</script>

<style scoped>
.input-search {
  margin: 10px auto 10px auto;
}

.el-table {
  margin: 10px auto 10px auto;
  width: 1000px;
  min-height: 300px;
}

.button {
  text-align: center;
}

.el-button {
  margin: 15px auto 15px auto;
}
</style>
