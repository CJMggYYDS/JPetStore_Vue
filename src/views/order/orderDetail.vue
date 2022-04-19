<template>
<div>
    <div class="form-table-container">
      <el-form :disabled="true" :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-row :gutter="40" type="flex" justify="center">
          <el-col :span="10">
            <div>
              <el-divider>Payment Details</el-divider>
              <el-form-item label="Card Type">
                <el-select v-model="orderInfo.cardType">
                  <el-option label="Visa" value="Visa"></el-option>
                  <el-option label="Mastercard" value="Mastercard"></el-option>
                  <el-option label="American Express" value="American Express"></el-option>
                  <el-option label="Discover" value="Discover"></el-option>
                  <el-option label="JCB" value="JCB"></el-option>
                  <el-option label="UnionPay" value="UnionPay"></el-option>
                  <el-option label="Maestro" value="Maestro"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Card Number">
                <el-input v-model="orderInfo.creditCard"></el-input>
              </el-form-item>
              <el-form-item label="Expiry Date">
                <el-form-item>
                  <el-date-picker type="month" v-model="orderInfo.expiryDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-form-item>
              <template v-if="!shipToDifferentAddr">
              <el-divider>Billing Address</el-divider>
              <el-form-item label="First Name">
                <el-input v-model="ruleForm.firstName"></el-input>
              </el-form-item>
              <el-form-item label="Last Name">
                <el-input v-model="ruleForm.lastName"></el-input>
              </el-form-item>
              <el-form-item label="Address 1">
                <el-input v-model="ruleForm.addr1"></el-input>
              </el-form-item>
              <el-form-item label="Address 2">
                <el-input v-model="ruleForm.addr2"></el-input>
              </el-form-item>
              <el-form-item label="City">
                <el-input v-model="ruleForm.city"></el-input>
              </el-form-item>
              <el-form-item label="State">
                <el-input v-model="ruleForm.state"></el-input>
              </el-form-item>
              <el-form-item label="Zip">
                <el-input v-model="ruleForm.zip"></el-input>
              </el-form-item>
              <el-form-item label="Country">
                <el-input v-model="ruleForm.country"></el-input>
              </el-form-item>
              </template>
              <template v-else>
        
                <el-divider>Shipping Address</el-divider>
                <el-form-item label="First Name">
                  <el-input v-model="ruleForm.shipAddr.shipFirstName"></el-input>
                </el-form-item>
                <el-form-item label="Last Name">
                  <el-input v-model="ruleForm.shipAddr.shipLastName"></el-input>
                </el-form-item>
                <el-form-item label="Address 1">
                  <el-input v-model="ruleForm.shipAddr.shipAddress1"></el-input>
                </el-form-item>
                <el-form-item label="Address 2">
                  <el-input v-model="ruleForm.shipAddr.shipAddress2"></el-input>
                </el-form-item>
                <el-form-item label="City">
                  <el-input v-model="ruleForm.shipAddr.shipCity"></el-input>
                </el-form-item>
                <el-form-item label="State">
                  <el-input v-model="ruleForm.shipAddr.shipState"></el-input>
                </el-form-item>
                <el-form-item label="Zip">
                  <el-input v-model="ruleForm.shipAddr.shipZip"></el-input>
                </el-form-item>
                <el-form-item label="Country">
                  <el-input v-model="ruleForm.shipCountry"></el-input>
                </el-form-item>
                </template>
              </div>
            </el-col>
          
        </el-row>
      </el-form>
        <el-divider>Your Pets</el-divider>
        <el-table :data="order">
          <el-table-column align="center" label="Item ID" width="180">
            <template v-slot="scope">
              <span style="margin-left: 10px">
                <el-link type="primary" @click="$router.push('/item?id='+scope.row.itemId)">{{ scope.row.itemId }}</el-link>
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Description" width="180">
            <template v-slot="scope">
              <span v-html="scope.row.addr1+' '+scope.row.name" style="margin-left: 10px"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Quantity" width="180">
            <template v-slot="scope">
              <span style="margin-left: 10px">{{ scope.row.quantity }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Price" width="180">
            <template v-slot="scope">
              <span style="margin-left: 10px">${{ scope.row.unitPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Total Cost" width="180">
            <template v-slot="scope">
              <span style="margin-left: 10px">${{ scope.row.quantity * scope.row.unitPrice }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div align = "center">
          Total: ${{ total }}
        </div>
      </div>
</div>
</template>

<script>
export default {
  name : 'orderView',
  
  data() {
    return {
      shipToDifferentAddr :this.$store.shipToDifferentAddr,
      order : this.$store.state.shopping,
      orderInfo : this.$store.state.orderInfo,
      ruleForm: {
        firstName: this.$store.state.account.firstName,
        lastName: this.$store.state.account.lastName,
        addr1: this.$store.state.account.addr1,
        addr2: this.$store.state.account.addr2,
        city: this.$store.state.account.city,
        state: this.$store.state.account.state,
        zip: this.$store.state.account.zip,
        country: this.$store.state.account.country,
        shipToDifferentAddr: this.$store.state.shipToDifferentAddr,
        shipAddr : this.$store.state.shipAddr,
      }
    }
  },
  computed:{
      total(){
          let total = 0;
            this.order.forEach(item => {
                total += item.quantity * item.unitPrice;
            });
            return total;
      }
  },
  methods: {
    getData(){
      this.axios.get('/orders/id/'+this.$route.query.id)
      .then(res=>{
        if(res.data.status){
           console.log(res.data.data)
           this.order = res.data.data;
           this.orderInfo = res.data.data[0]
          // this.ruleForm = res.data.data[0]

        }
      })
    }
  },
  created ()  {
    this.getData()
  }
  
}
</script>

<style scoped>
.form-table-container{
  margin: 50px auto 100px auto;
  width: 1000px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.el-divider {
  width: 400px;
  margin: 30px auto;
}
.el-table {
  width: 900px;
  margin: 0 auto;
  padding-bottom: 50px;
}
</style>
