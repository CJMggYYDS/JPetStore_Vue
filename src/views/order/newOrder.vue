<template>
<default-layout>
  <div class="input-search">
    <input-search></input-search>
  </div>
  <el-form :disabled="committed" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
    <el-row :gutter="40" type="flex" justify="center">
      <el-col :span="10">
        <div>
          <el-divider>Payment Details</el-divider>
          <el-form-item label="Card Type" prop="cardType">
            <el-select v-model="ruleForm.cardType" placeholder="Pick a card type">
              <el-option label="Visa" value="Visa"></el-option>
              <el-option label="Mastercard" value="Mastercard"></el-option>
              <el-option label="American Express" value="American Express"></el-option>
              <el-option label="Discover" value="Discover"></el-option>
              <el-option label="JCB" value="JCB"></el-option>
              <el-option label="UnionPay" value="UnionPay"></el-option>
              <el-option label="Maestro" value="Maestro"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Card Number" prop="cardNumber">
            <el-input v-model="ruleForm.cardNumber"></el-input>
          </el-form-item>
          <el-form-item label="Expiry Date" required>
            <el-form-item prop="expiryTime">
              <el-date-picker type="month" placeholder="Pick a month" v-model="ruleForm.expiryTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form-item>
          </div>
          </el-col>
          
          <template v-if="!ruleForm.shipToDifferentAddr">
            <el-col :span="10">
           <el-divider>Billing Address</el-divider>
          <el-form-item label="First Name" prop="firstName">
            <el-input v-model="ruleForm.firstName"></el-input>
          </el-form-item>
          <el-form-item label="Last Name" prop="lastName">
            <el-input v-model="ruleForm.lastName"></el-input>
          </el-form-item>
          <el-form-item label="Address 1" prop="addr1">
            <el-input v-model="ruleForm.addr1"></el-input>
          </el-form-item>
          <el-form-item label="Address 2">
            <el-input v-model="ruleForm.addr2"></el-input>
          </el-form-item>
          <el-form-item label="City" prop="city">
            <el-input v-model="ruleForm.city"></el-input>
          </el-form-item>
          <el-form-item label="State" prop="state">
            <el-input v-model="ruleForm.state"></el-input>
          </el-form-item>
          <el-form-item label="Zip" prop="zip">
            <el-input v-model="ruleForm.zip"></el-input>
          </el-form-item>
          <el-form-item label="Country" prop="country">
            <el-input v-model="ruleForm.country"></el-input>
          </el-form-item>
        
      </el-col>
      </template>
      <template v-else>
        <el-col :span="10">
          <div>
            <el-divider>Shipping Address</el-divider>
            <el-form-item label="First Name" prop="shipFirstName">
              <el-input v-model="ruleForm.shipAddr.shipFirstName"></el-input>
            </el-form-item>
            <el-form-item label="Last Name" prop="shipLastName">
              <el-input v-model="ruleForm.shipAddr.shipLastName"></el-input>
            </el-form-item>
            <el-form-item label="Address 1" prop="shipAddr1">
              <el-input v-model="ruleForm.shipAddr.shipAddr1"></el-input>
            </el-form-item>
            <el-form-item label="Address 2">
              <el-input v-model="ruleForm.shipAddr.shipAddr2"></el-input>
            </el-form-item>
            <el-form-item label="City" prop="shipCity">
              <el-input v-model="ruleForm.shipAddr.shipCity"></el-input>
            </el-form-item>
            <el-form-item label="State" prop="shipState">
              <el-input v-model="ruleForm.shipAddr.shipState"></el-input>
            </el-form-item>
            <el-form-item label="Zip" prop="shipZip">
              <el-input v-model="ruleForm.shipAddr.shipZip"></el-input>
            </el-form-item>
            <el-form-item label="Country" prop="shipCountry">
              <el-input v-model="ruleForm.shipAddr.shipCountry"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </template>
      </el-row>
      <el-row :gutter="40" type="flex" justify="center">
        <el-form-item label="Ship to different address">
            <el-switch align="center" @change="changeRules()" v-model="ruleForm.shipToDifferentAddr"></el-switch>
        </el-form-item>
      </el-row>
    <div class="button">
      <el-button type="primary" @click="submitForm('ruleForm')">confirm</el-button>
    </div>

  </el-form>
</default-layout>
</template>

<script>

export default{
   name : 'newOrder',
   data(){
       return {
           myOrder : null,
           committed: false,
      ruleForm: {
           cardType: '',
        cardNumber: '',
        expiryTime: '',
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
      },
      rules: {
        cardType: [{
          required: true,
          message: 'Please pick your card type',
          trigger: 'change'
        }],
        cardNumber: [{
          required: true,
          message: 'Please enter your card number',
          trigger: 'blur'
        }],
        expiryTime: [{
          type: 'date',
          required: true,
          message: 'Please pick a month',
          trigger: 'change'
        }],
        firstName: [{
          required: true,
          message: 'Please enter your firstname',
          trigger: 'blur'
        }],
        lastName: [{
          required: true,
          message: 'Please enter your lastname',
          trigger: 'blur'
        }],
        addr1: [{
          required: true,
          message: 'Please enter your address',
          trigger: 'blur'
        }],
        city: [{
          required: true,
          message: 'Please enter your city',
          trigger: 'blur'
        }],
        state: [{
          required: true,
          message: 'Please enter your state',
          trigger: 'blur'
        }],
        zip: [{
          required: true,
          message: 'Please enter your zip',
          trigger: 'blur'
        }],
        country: [{
          required: true,
          message: 'Please enter your country',
          trigger: 'blur'
        }],
        shipFirstName: [{
          required: false,
          message: 'Please enter a firstname',
          trigger: 'blur'
        }],
        shipLastName: [{
          required: false,
          message: 'Please enter a lastname',
          trigger: 'blur'
        }, ],
        shipAddr1: [{
          required: false,
          message: 'Please enter a address',
          trigger: 'blur'
        }],
        shipCity: [{
          required: false,
          message: 'Please enter a city',
          trigger: 'blur'
        }],
        shipState: [{
          required: false,
          message: 'Please enter a state',
          trigger: 'blur'
        }],
        shipZip: [{
          required: false,
          message: 'Please enter a zip',
          trigger: 'blur'
        }],
        shipCountry: [{
          required: false,
          message: 'Please enter a country',
          trigger: 'blur'
        }],
      }
    }
   },
    methods:{
       submitForm(formName) {
         console.log("11111111")
           //验证表单，发送订单请求，生成新订单
              let orderInfo = {
                   cardType: this.ruleForm.cardType,
              expiryDate: this.ruleForm.expiryTime,
              creditCard: this.ruleForm.cardNumber,
              }
              this.$store.commit('getOrderInfo',orderInfo)
              this.$store.commit('getAddr',this.ruleForm.shipAddr)
              let order = !this.ruleForm.shipToDifferentAddr ? {
              username : this.$store.state.account.username,
              cardType: this.ruleForm.cardType,
              expiryDate: this.ruleForm.expiryTime,
              creditCard: this.ruleForm.cardNumber,
              billToFirstName: this.ruleForm.firstName,
              billToLastName: this.ruleForm.lastName,
              billAddress1: this.ruleForm.addr1,
              billAddress2: this.ruleForm.addr2,
              billCity: this.ruleForm.city,
              billState: this.ruleForm.state,
              billZip: this.ruleForm.zip,
              billCountry: this.ruleForm.country,
              shipToFirstName: this.ruleForm.shipAddr.shipFirstName,
              shipToLastName: this.ruleForm.shipAddr.shipLastName,
              shipAddress1: this.ruleForm.shipAddr.shipAddr1,
              shipAddress2: this.ruleForm.shipAddr.shipAddr2,
              shipCity: this.ruleForm.shipAddr.shipCity,
              shipState: this.ruleForm.shipAddr.shipState,
              shipZip: this.ruleForm.shipAddr.shipZip,
              shipCountry: this.ruleForm.shipAddr.shipCountry,
              orderdate : new Date().getDate(),
          } : {
              username : this.$store.state.account.username,
              cardType: this.ruleForm.cardType,
              expiryDate: this.ruleForm.expiryTime,
              creditCard: this.ruleForm.cardNumber,
              billToFirstName: this.ruleForm.firstName,
              billToLastName: this.ruleForm.lastName,
              billAddress1: this.ruleForm.addr1,
              billAddress2: this.ruleForm.addr2,
              billCity: this.ruleForm.city,
              billState: this.ruleForm.state,
              billZip: this.ruleForm.zip,
              billCountry: this.ruleForm.country,
              orderdate : new Date().getDate(),
          }
          console.log(this.ruleForm.firstName)
          console.log(order)
          this.committed = true
        
          this.axios.put('/orders/Orderid',
            this.$store.state.shopping
          )
          .then(res=>{
              if(res.data.status){
                  this.axios.put('/orders/toorder',order)
                  .then(res=>{
                    if(res.data.status){
                      this.myOrder = res.data.data
                        this.$router.push('/order') 
                    }
                  })
              }})
          //  this.axios.get('/order/alipay',{
          //       outTradeNo : this.myOrder,
          //       subject : this.$store.state.account.username,
          //       totalAmount : this.$store.getters.shoppingTotal,
          //       body : new Date().toLocaleString()
             
          //  })
          //    .then(res=>{
          //       if(res.data.status){
          //         this.$message.success("Payment Redirecting"); 
          //         let htmls = res.data.data;
          //         const div = document.createElement('div');
					// 	div.innerHTML = htmls;
					// 	document.body.appendChild(div);
					// 	document.forms[0].acceptCharset = 'utf-8';
					// 	document.forms[0].submit()
          //     }
          //     else{
          //       this.$message('请先登入')
          //       //跳转到登录页
          //       this.$router.push('/signin?redirect=' )
          //     }
          // })
          // .catch(err=>{
          //      if (err.response.status == 400) {
          //       this.$message('请先登入')
          //       //跳转到登录页
          //       this.$router.push('/signin?redirect=')
          //     }
          //     window.console.error(err);
          // })
              
        
         
         
       },
       changeRules(){
           let shipToDifferentAddr = this.ruleForm.shipToDifferentAddr
    //   this.rules.shipFirstName[0].required = shipToDifferentAddr
    //   this.rules.shipLastName[0].required = shipToDifferentAddr
    //   this.rules.shipAddr1[0].required = shipToDifferentAddr
    //   this.rules.shipState[0].required = shipToDifferentAddr
    //   this.rules.shipCity[0].required = shipToDifferentAddr
    //   this.rules.shipZip[0].required = shipToDifferentAddr
    //   this.rules.shipCountry[0].required = shipToDifferentAddr
    //   this.rules.shipCountry[0].required = shipToDifferentAddr
            this.$store.shipToDifferentAddr = shipToDifferentAddr;
       }
    
    
   }
}
</script>
<style scoped>

.el-form {
  margin: 50px auto 100px auto;
  width: 1000px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.el-button {
  margin-bottom: 15px;
}

.button {
  text-align: center;
}
</style>