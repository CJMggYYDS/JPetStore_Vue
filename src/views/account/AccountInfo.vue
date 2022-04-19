<template>
    <div class="accountForm">
        <div class="account-wrapper">
        <el-form
         label-position="left"
         :model="ruleForm"
         :rules="rules"
         label-width="160px"
         status-icon
         ref="ruleForm">
            <el-row :gutter="40" type="flex" justify="center">
                <el-col :span="8" class="col">
                    <h2 class="account-title">JPetStore 用户中心</h2>
                    <el-divider>Account Information</el-divider>
                    <el-form-item style="margin-top:50px" label="用户名:" prop="username">
                        <el-input type="text" auto-complete="off" v-model="ruleForm.username" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="密码:" prop="password">
                        <el-input type="password" auto-complete="off" v-model="ruleForm.password"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码:" prop="checkPass">
                        <el-input type="password" auto-complete="off" v-model="ruleForm.checkPass"></el-input>
                    </el-form-item>
                    
                    <el-divider>Your User Information</el-divider>
                    <el-form-item style="margin-top:50px" label="First name:" prop="firstName">
                        <el-input type="text" v-model="ruleForm.firstName" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="Last name:" prop="lastName">
                        <el-input type="text" v-model="ruleForm.lastName" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="Email:" prop="email">
                        <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="Phone:" prop="phone">
                        <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="Address1:" prop="addr1">
                        <el-input type="text" v-model="ruleForm.addr1" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="Address2:" prop="addr2">
                        <el-input type="text" v-model="ruleForm.addr2" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="Country:" prop="country">
                        <el-input type="text" v-model="ruleForm.country" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="City:" prop="city">
                        <el-input type="text" v-model="ruleForm.city" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="State:" prop="state">
                       <el-input type="text" v-model="ruleForm.state" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="Zip:" prop="zip">
                       <el-input type="text" v-model="ruleForm.zip" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-divider>Profile Information</el-divider>
                    <el-form-item label="Language Preference:" prop="languagePreference">
                        <el-select v-model="ruleForm.languagePreference">
                            <el-option label="中文" value="chinese"></el-option>
                            <el-option label="English" value="english"></el-option>
                            <el-option label="Japanese" value="japanese"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Favourite Category:">
                        <el-select v-model="ruleForm.favouriteCategory">
                            <el-option label="BIRDS" value="BIRDS"></el-option>
                            <el-option label="CATS" value="CATS"></el-option>
                            <el-option label="DOGS" value="DOGS"></el-option>
                            <el-option label="FISH" value="FISH"></el-option>
                            <el-option label="REPTILES" value="REPTILES"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="List and Banner:">
                        <el-col :span="12">
                            <el-checkbox v-model="ruleForm.list">Enable MyList</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="ruleForm.banner">Enable MyBanner</el-checkbox>
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" round @click="changeUserInfo()">保存设置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if(value==="") {
                callback(new Error("请输入密码"));
            }
            else{
                if(this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateFidld('checkPass');
                }
                callback();
            }
        };

        var validateCheckPass = (rule, value, callback) => {
            if(value==="") {
                callback(new Error("请再次输入密码"));
            }
            else if(value !== this.ruleForm.password) {
                callback(new Error("两次密码不一致"));
            }
            else {
                callback();
            }
        };
        return {
            ruleForm: {
                username: '',
                password: '',
                checkPass: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                addr1: '',
                addr2: '',
                country: '',
                city: '',
                state: '',
                zip: '',
                languagePreference: '',
                favouriteCategory: '',
                list: false,
                banner: false
            },
            rules: {
                password:[
                    {
                        required: true,
                        validator: validatePass,
                        trigger: "blur"
                    }
                ],
                checkPass:[
                    {
                        required: true,
                        validator: validateCheckPass,
                        trigger:"blur"
                    }
                ],
                firstName:[
                    {
                        required: true,
                        message: "Please enter your firstname",
                        trigger: "blur"
                    }
                ],
                lastName: [
                    {
                        required: true,
                        message: "Please enter your lastname",
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "Please enter your email",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "Please enter your phone",
                        trigger: "blur"
                    }
                ],
                addr1: [
                    {
                        required: true,
                        message: "Please enter your addr1",
                        trigger: "blur"
                    }
                ],
                addr2: [
                    {
                        required: true,
                        message: "Please enter your addr2",
                        trigger: "blur"
                    }
                ],
                city: [
                    {
                        required: true,
                        message: "Please enter your city",
                        trigger: "blur"
                    }
                ],
                state: [
                    {
                        required: true,
                        message: "Please enter your state",
                        trigger: "blur"
                    }
                ],
                zip: [
                    {
                        required: true,
                        message: "Please enter your zip",
                        trigger: "blur"
                    }
                ],
                country: [
                    {
                        required: true,
                        message: "Please enter your country",
                        trigger: "blur"
                    }
                ],
                languagePreference: [
                    {
                        required: true,
                        message: "Please pick your preferent language",
                        trigger: "change"
                    }
                ]
            }
        }

    },
    methods: {
        //获取用户信息
        getUserInfo() {
            let username = this.$store.state.account.username;

            this.axios.get("/accounts/"+username
            ).then(response => {
                if(response.data.status===1) {
                    let account = response.data.data;
                    
                    this.ruleForm.username = account.username;
                    this.ruleForm.password = account.password;
                    this.ruleForm.checkPass = account.password;
                    this.ruleForm.firstName = account.firstName;
                    this.ruleForm.lastName = account.lastName;
                    this.ruleForm.email = account.email;
                    this.ruleForm.phone = account.phone;
                    this.ruleForm.addr1 = account.addr1;
                    this.ruleForm.addr2 = account.addr2;
                    this.ruleForm.country = account.country;
                    this.ruleForm.city = account.city;
                    this.ruleForm.state = account.state;
                    this.ruleForm.zip = account.zip;
                    this.ruleForm.languagePreference = account.languagePreference;
                    this.ruleForm.favouriteCategory = account.favouriteCategoryId;
                    this.ruleForm.list = account.listOption;
                    this.ruleForm.banner = account.bannerOption;
                }
                else {
                    this.$message.error("获取用户信息失败");
                }
            }).catch(error => {
                this.$message.error(error);
            })
        },
        
        //修改用户信息，提交表单
        changeUserInfo(formName) {
            let account = {
                username: this.ruleForm.username,
                password: this.ruleForm.password,
                email: this.ruleForm.email,
                firstName: this.ruleForm.email,
                lastName: this.ruleForm.lastName,
                addr1: this.ruleForm.addr1,
                addr2: this.ruleForm.addr2,
                city: this.ruleForm.city,
                state: this.ruleForm.state,
                zip: this.ruleForm.zip,
                country: this.ruleForm.country,
                phone: this.ruleForm.phone,
                favouriteCategoryId: this.ruleForm.favouriteCategory,
                languagePreference: this.ruleForm.languagePreference,
                listOption: this.ruleForm.list,
                bannerOption: this.ruleForm.banner
            };
            this.axios.put('/accounts', account)
            .then(response => {
                if(response.data.status===1) {
                    this.$message.success("信息更新成功");
                }
                else {
                    this.$message.error("修改信息失败");
                }
            }).catch(error => {
                this.$message.error(error);
            })
            

        },
    },

    created() {
        this.getUserInfo()
    }
}
</script>

<style>
.account-title {
    text-align: center;
    color: #505458;
}

.col {
    width: 70%;
}

.accountForm {
    height: 1450px;
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}

.account-wrapper {
    background-color: #fff;
    width: 600px;
    height:1300px;
    border-radius: 15px;
    position: relative;
    left: 50%;
    top: 700px;
    margin-bottom: 50px;
    transform: translate(-50%,-50%);
}

</style>