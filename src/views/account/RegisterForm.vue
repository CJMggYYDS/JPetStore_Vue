<template>
    <div class="RegisterForm">
        <div class="register-warpper">
        <el-form
        label-position="left"
         :model="ruleForm"
         :rules="rules"
         label-width="180px"
         status-icon
         ref="ruleForm">
            <el-row :gutter="40" type="flex" justify="center">
                <el-col :span="8" class="col">
                    <h2 class="register-title">JPetStore 用户注册</h2>
                    <el-form-item style="margin-top:50px" label="用户名:" prop="username">
                        <el-input type="text" auto-complete="off" v-model="ruleForm.username"></el-input>
                    </el-form-item>

                    <el-form-item label="密码:" prop="password">
                        <el-input type="password" auto-complete="off" v-model="ruleForm.password"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码:" prop="checkPass">
                        <el-input type="password" auto-complete="off" v-model="ruleForm.checkPass"></el-input>
                    </el-form-item>

                    <el-divider>User Information</el-divider>

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

                    
                    <div id="btn">              
                        <el-col :span="12">
                            <el-button type="primary" round @click="RegisteForm('ruleForm')">注册</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="primary" round @click="ResetForm('ruleForm')">重置</el-button>
                        </el-col>
                    </div> 
                </el-col>
            </el-row>
        </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var validateUsername = (rule, value, callback) => {
            if(value==="") {
                callback(new Error("请输入用户名"));
            }
            else {
                //这里添加向后端发送请求验证用户名是否可用
                this.axios.get("/accounts/check",{
                    params: {
                        username: this.ruleForm.username
                    }
                }).then(response => {
                    //如果用户名已存在，不可用
                    if(response.data.status===0) {
                        //显示返回体中的msg信息
                        callback(new Error(response.data.msg))
                    }
                    //否则则校验通过，用户名可用
                    else {
                        callback();
                    }
                })
            }
        };

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
                username:[
                    {
                        required: true,
                        validator: validateUsername,
                        trigger:"change"
                    }
                ],
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
        //注册
        RegisteForm(formName) {  
            //注册请求
            let account = {
                username: this.ruleForm.username,
                password: this.ruleForm.password,
                email: this.ruleForm.email,
                firstName: this.ruleForm.firstName,
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
            this.axios.post("/accounts/register",account).then(response => {
                //后端返回体状态码为0，注册成功
                if(response.data.status===1){
                    this.$message.success("注册成功");
                    this.$router.push("/");
                }
                else{
                    this.$message.error("注册失败");S
                }
            })
                
          
        },
        //重置表单
        ResetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}

</script>

<style scoped>
.col {
    width: 70%;
}
.register-title {
    text-align: center;
    color: #505458;
}
.RegisterForm {
    height: 1450px;
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.register-warpper {
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
#btn{
    margin-left: 30px;
}

</style>